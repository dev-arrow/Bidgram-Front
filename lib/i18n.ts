/**
 * Interface language options and the shared UI strings that follow them.
 *
 * This covers the persistent chrome (sidebar / mobile nav / page headers) so
 * switching the language in Settings visibly changes the app rather than only
 * storing a preference.
 */

export const LOCALES = [
  { id: 'en', label: 'English', nativeLabel: 'English', htmlLang: 'en' },
  { id: 'es', label: 'Spanish', nativeLabel: 'Español', htmlLang: 'es' },
  { id: 'de', label: 'German', nativeLabel: 'Deutsch', htmlLang: 'de' },
  { id: 'fr', label: 'French', nativeLabel: 'Français', htmlLang: 'fr' },
  { id: 'pt', label: 'Portuguese', nativeLabel: 'Português', htmlLang: 'pt' },
] as const

export type LocaleId = (typeof LOCALES)[number]['id']

export const DEFAULT_LOCALE: LocaleId = 'en'

/** Key used to remember the choice between visits. */
export const LOCALE_STORAGE_KEY = 'bidgram.language'

export type Dictionary = {
  /** Navigation labels, keyed by route href. */
  nav: Record<string, string>
  navGroupWorkspace: string
  navGroupAccount: string
  balance: string
  topUp: string
  settingsLanguage: string
  settingsLanguageTitle: string
  settingsLanguageDescription: string
  settingsLanguageHint: string
  interfaceLanguage: string
}

const en: Dictionary = {
  nav: {
    '/': 'Dashboard',
    '/profile': 'Profile',
    '/prompt': 'Prompt',
    '/templates': 'Templates',
    '/application-review': 'Application review',
    '/billing': 'Billing',
    '/feedback': 'Feedback',
    '/setting': 'Settings',
  },
  navGroupWorkspace: 'Workspace',
  navGroupAccount: 'Account',
  balance: 'Balance',
  topUp: 'Top up',
  settingsLanguage: 'Language',
  settingsLanguageTitle: 'Language',
  settingsLanguageDescription: 'The language Bidgram uses across the interface.',
  settingsLanguageHint:
    'Changes apply immediately and are remembered on this device.',
  interfaceLanguage: 'Interface language',
}

const es: Dictionary = {
  nav: {
    '/': 'Panel',
    '/profile': 'Perfil',
    '/prompt': 'Instrucciones',
    '/templates': 'Plantillas',
    '/application-review': 'Revisión de solicitudes',
    '/billing': 'Facturación',
    '/feedback': 'Comentarios',
    '/setting': 'Ajustes',
  },
  navGroupWorkspace: 'Espacio de trabajo',
  navGroupAccount: 'Cuenta',
  balance: 'Saldo',
  topUp: 'Recargar',
  settingsLanguage: 'Idioma',
  settingsLanguageTitle: 'Idioma',
  settingsLanguageDescription: 'El idioma que Bidgram usa en toda la interfaz.',
  settingsLanguageHint:
    'Los cambios se aplican de inmediato y se recuerdan en este dispositivo.',
  interfaceLanguage: 'Idioma de la interfaz',
}

const de: Dictionary = {
  nav: {
    '/': 'Übersicht',
    '/profile': 'Profil',
    '/prompt': 'Prompt',
    '/templates': 'Vorlagen',
    '/application-review': 'Bewerbungsprüfung',
    '/billing': 'Abrechnung',
    '/feedback': 'Feedback',
    '/setting': 'Einstellungen',
  },
  navGroupWorkspace: 'Arbeitsbereich',
  navGroupAccount: 'Konto',
  balance: 'Guthaben',
  topUp: 'Aufladen',
  settingsLanguage: 'Sprache',
  settingsLanguageTitle: 'Sprache',
  settingsLanguageDescription:
    'Die Sprache, die Bidgram in der gesamten Oberfläche verwendet.',
  settingsLanguageHint:
    'Änderungen gelten sofort und werden auf diesem Gerät gespeichert.',
  interfaceLanguage: 'Oberflächensprache',
}

const fr: Dictionary = {
  nav: {
    '/': 'Tableau de bord',
    '/profile': 'Profil',
    '/prompt': 'Prompt',
    '/templates': 'Modèles',
    '/application-review': 'Revue des candidatures',
    '/billing': 'Facturation',
    '/feedback': 'Retours',
    '/setting': 'Paramètres',
  },
  navGroupWorkspace: 'Espace de travail',
  navGroupAccount: 'Compte',
  balance: 'Solde',
  topUp: 'Recharger',
  settingsLanguage: 'Langue',
  settingsLanguageTitle: 'Langue',
  settingsLanguageDescription:
    "La langue utilisée par Bidgram dans toute l'interface.",
  settingsLanguageHint:
    "Les changements s'appliquent immédiatement et sont mémorisés sur cet appareil.",
  interfaceLanguage: "Langue de l'interface",
}

const pt: Dictionary = {
  nav: {
    '/': 'Painel',
    '/profile': 'Perfil',
    '/prompt': 'Prompt',
    '/templates': 'Modelos',
    '/application-review': 'Revisão de candidaturas',
    '/billing': 'Faturamento',
    '/feedback': 'Feedback',
    '/setting': 'Configurações',
  },
  navGroupWorkspace: 'Área de trabalho',
  navGroupAccount: 'Conta',
  balance: 'Saldo',
  topUp: 'Adicionar saldo',
  settingsLanguage: 'Idioma',
  settingsLanguageTitle: 'Idioma',
  settingsLanguageDescription: 'O idioma que a Bidgram usa em toda a interface.',
  settingsLanguageHint:
    'As alterações são aplicadas imediatamente e ficam salvas neste dispositivo.',
  interfaceLanguage: 'Idioma da interface',
}

export const DICTIONARIES: Record<LocaleId, Dictionary> = { en, es, de, fr, pt }

export function getDictionary(locale: LocaleId): Dictionary {
  return DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE]
}

export function isLocaleId(value: unknown): value is LocaleId {
  return typeof value === 'string' && value in DICTIONARIES
}
