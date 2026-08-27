export type TemplateCategory = 'resume' | 'cover-letter'
export type TemplateFont = 'serif' | 'sans'
export type TemplateHeader = 'left' | 'centered' | 'band' | 'corporate'

export interface TemplateStyle {
  /** Colour of the name / primary heading. */
  headline: string
  /** Accent colour used for rules, chips and highlights. */
  accent: string
  /** Page background. */
  bg: string
  /** Secondary / body text colour. */
  body: string
  /** For band headers, the colour of text sitting on the dark band. */
  onBand?: string
}

export interface Template {
  id: string
  name: string
  description: string
  category: TemplateCategory
  /** Short marketing tag shown on the card. */
  tag: string
  font: TemplateFont
  header: TemplateHeader
  uppercaseName?: boolean
  letterspacedName?: boolean
  style: TemplateStyle
  /**
   * Premium templates stay locked until bought. A purchase is a one-time
   * unlock — the template is yours forever and never re-charges.
   */
  premium?: boolean
}

/** Flat one-time price to unlock any single premium template. */
export const TEMPLATE_PRICE_USD = 1

/**
 * Premium templates the account has already bought. Purchases are permanent,
 * so these render unlocked alongside the free set.
 */
export const OWNED_TEMPLATE_IDS: readonly string[] = ['tech']

/**
 * Visual identities mirror the @react-pdf/renderer templates shipped with the
 * app so the on-screen cards read as faithful previews of the exported PDF.
 */
export const RESUME_TEMPLATES: Template[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean single-column layout with a confident blue accent.',
    category: 'resume',
    tag: 'Most popular',
    font: 'sans',
    header: 'left',
    style: { headline: '#0f172a', accent: '#3b82f6', bg: '#ffffff', body: '#475569' },
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Timeless serif résumé with centered heading and dotted contacts.',
    category: 'resume',
    tag: 'Timeless',
    font: 'serif',
    header: 'left',
    uppercaseName: true,
    style: { headline: '#00194b', accent: '#6b7280', bg: '#ffffff', body: '#2d3542' },
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Airy, understated typography with generous whitespace.',
    category: 'resume',
    tag: 'Minimal',
    font: 'sans',
    header: 'centered',
    uppercaseName: true,
    letterspacedName: true,
    style: { headline: '#171717', accent: '#a3a3a3', bg: '#ffffff', body: '#525252' },
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Navy header band with gold accents for senior roles.',
    category: 'resume',
    tag: 'Leadership',
    font: 'serif',
    header: 'band',
    uppercaseName: true,
    premium: true,
    style: { headline: '#1e3a5f', accent: '#b8860b', bg: '#ffffff', body: '#374151', onBand: '#ffffff' },
  },
  {
    id: 'tech',
    name: 'Tech',
    description: 'Developer-focused design with a fresh teal system.',
    category: 'resume',
    tag: 'Engineering',
    font: 'sans',
    header: 'left',
    premium: true,
    style: { headline: '#0a0a0a', accent: '#00d4aa', bg: '#ffffff', body: '#333333' },
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Refined centered layout on warm paper with gold detailing.',
    category: 'resume',
    tag: 'Refined',
    font: 'sans',
    header: 'centered',
    uppercaseName: true,
    letterspacedName: true,
    premium: true,
    style: { headline: '#2c2c2c', accent: '#c9a962', bg: '#fdfcfb', body: '#555555' },
  },
  {
    id: 'bold',
    name: 'Bold',
    description: 'High-impact dark header with a vivid coral accent.',
    category: 'resume',
    tag: 'Standout',
    font: 'sans',
    header: 'band',
    uppercaseName: true,
    premium: true,
    style: { headline: '#1a1a2e', accent: '#e94560', bg: '#ffffff', body: '#444444', onBand: '#ffffff' },
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Structured business style with navy section markers.',
    category: 'resume',
    tag: 'Professional',
    font: 'sans',
    header: 'corporate',
    premium: true,
    style: { headline: '#003366', accent: '#003366', bg: '#ffffff', body: '#333333' },
  },
  {
    id: 'academic',
    name: 'Academic',
    description: 'Formal scholarly CV set in classic Times typography.',
    category: 'resume',
    tag: 'Scholarly',
    font: 'serif',
    header: 'centered',
    premium: true,
    style: { headline: '#1a1a1a', accent: '#333333', bg: '#ffffff', body: '#333333' },
  },
]

export const COVER_LETTER_TEMPLATES: Template[] = [
  {
    id: 'modern-letter',
    name: 'Modern Letter',
    description: 'Matching cover letter with a crisp blue heading rule.',
    category: 'cover-letter',
    tag: 'Most popular',
    font: 'sans',
    header: 'left',
    style: { headline: '#0f172a', accent: '#3b82f6', bg: '#ffffff', body: '#475569' },
  },
  {
    id: 'classic-letter',
    name: 'Classic Letter',
    description: 'Traditional serif letter with formal salutation blocks.',
    category: 'cover-letter',
    tag: 'Timeless',
    font: 'serif',
    header: 'left',
    uppercaseName: true,
    style: { headline: '#00194b', accent: '#6b7280', bg: '#ffffff', body: '#2d3542' },
  },
  {
    id: 'minimal-letter',
    name: 'Minimal Letter',
    description: 'Whitespace-forward letter that lets the words breathe.',
    category: 'cover-letter',
    tag: 'Minimal',
    font: 'sans',
    header: 'centered',
    uppercaseName: true,
    letterspacedName: true,
    style: { headline: '#171717', accent: '#a3a3a3', bg: '#ffffff', body: '#525252' },
  },
  {
    id: 'executive-letter',
    name: 'Executive Letter',
    description: 'Navy banner letter that pairs with the Executive résumé.',
    category: 'cover-letter',
    tag: 'Leadership',
    font: 'serif',
    header: 'band',
    uppercaseName: true,
    premium: true,
    style: { headline: '#1e3a5f', accent: '#b8860b', bg: '#ffffff', body: '#374151', onBand: '#ffffff' },
  },
  {
    id: 'elegant-letter',
    name: 'Elegant Letter',
    description: 'Warm paper letter with delicate gold rules.',
    category: 'cover-letter',
    tag: 'Refined',
    font: 'sans',
    header: 'centered',
    uppercaseName: true,
    letterspacedName: true,
    premium: true,
    style: { headline: '#2c2c2c', accent: '#c9a962', bg: '#fdfcfb', body: '#555555' },
  },
  {
    id: 'bold-letter',
    name: 'Bold Letter',
    description: 'Dark banner letter with a striking coral signature line.',
    category: 'cover-letter',
    tag: 'Standout',
    font: 'sans',
    header: 'band',
    uppercaseName: true,
    premium: true,
    style: { headline: '#1a1a2e', accent: '#e94560', bg: '#ffffff', body: '#444444', onBand: '#ffffff' },
  },
]

export const ALL_TEMPLATES: Template[] = [...RESUME_TEMPLATES, ...COVER_LETTER_TEMPLATES]

/** The template pre-selected as "in use" for each document type. */
export const DEFAULT_SELECTION: Record<TemplateCategory, string> = {
  resume: 'modern',
  'cover-letter': 'modern-letter',
}
