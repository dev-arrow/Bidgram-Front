'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_STORAGE_KEY,
  getDictionary,
  isLocaleId,
  type Dictionary,
  type LocaleId,
} from '@/lib/i18n'

type LanguageContextValue = {
  locale: LocaleId
  setLocale: (next: LocaleId) => void
  t: Dictionary
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleId>(DEFAULT_LOCALE)

  // Restore the saved choice after mount so the server and client markup match.
  useEffect(() => {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY)
    if (isLocaleId(stored)) setLocaleState(stored)
  }, [])

  // Keep <html lang> honest for screen readers and translation tooling.
  useEffect(() => {
    const entry = LOCALES.find((item) => item.id === locale)
    if (entry) document.documentElement.lang = entry.htmlLang
  }, [locale])

  const setLocale = useCallback((next: LocaleId) => {
    setLocaleState(next)
    window.localStorage.setItem(LOCALE_STORAGE_KEY, next)
  }, [])

  const value = useMemo<LanguageContextValue>(
    () => ({ locale, setLocale, t: getDictionary(locale) }),
    [locale, setLocale],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used inside a LanguageProvider')
  }
  return context
}
