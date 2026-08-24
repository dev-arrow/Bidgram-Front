import { profiles, type Profile } from '@/lib/profiles'

export const workLocationTypes = ['Onsite', 'Hybrid', 'Remote'] as const

export const countries = [
  'United States',
  'Canada',
  'United Kingdom',
  'Ireland',
  'Germany',
  'France',
  'Spain',
  'Portugal',
  'Netherlands',
  'Belgium',
  'Switzerland',
  'Sweden',
  'Norway',
  'Denmark',
  'Poland',
  'Italy',
  'Australia',
  'New Zealand',
  'India',
  'Singapore',
  'Japan',
  'South Korea',
  'Brazil',
  'Mexico',
  'Argentina',
  'South Africa',
  'United Arab Emirates',
]

export const timezones = [
  'UTC-08:00 Pacific Time',
  'UTC-07:00 Mountain Time',
  'UTC-06:00 Central Time',
  'UTC-05:00 Eastern Time',
  'UTC+00:00 GMT / London',
  'UTC+01:00 Central European Time',
  'UTC+02:00 Eastern European Time',
  'UTC+05:30 India Standard Time',
  'UTC+08:00 China / Singapore',
  'UTC+09:00 Japan / Korea',
  'UTC+10:00 Australian Eastern Time',
]

export const genders = ['Male', 'Female', 'Non-binary', 'Prefer not to say']

export const ethnicities = [
  'Asian',
  'Black or African American',
  'Hispanic or Latino',
  'Middle Eastern or North African',
  'Native American or Alaska Native',
  'Native Hawaiian or Pacific Islander',
  'White',
  'Two or more races',
  'Prefer not to say',
]

export const disabilityStatuses = [
  'Yes, I have a disability',
  'No, I do not have a disability',
  'Prefer not to say',
]

export const veteranStatuses = [
  'I am a veteran',
  'I am not a veteran',
  'Prefer not to say',
]

export const yesNoPreferNot = ['Yes', 'No', 'Prefer not to say']

export const noticePeriods = [
  'Immediately',
  '1 week',
  '2 weeks',
  '1 month',
  '2 months',
  '3 months or more',
]

export const travelAvailabilities = [
  'No travel',
  'Up to 25%',
  'Up to 50%',
  'Up to 75%',
  'Willing to travel anytime',
]

export const accommodationOptions = [
  'No accommodations needed',
  'Accommodations may be needed',
  'Prefer to discuss',
]

export const hearAboutUsOptions = [
  'LinkedIn',
  'Google search',
  'Referral from a friend',
  'Job board',
  'Social media',
  'Event or conference',
  'Other',
]

export const reasonsForLeaving = [
  'Career growth',
  'Relocation',
  'Company restructuring',
  'Better compensation',
  'Contract ended',
  'Seeking new challenges',
  'Other',
]

export const criteriaOptions = [
  'No criteria set',
  'Required',
  'Not required',
  'Willing to obtain',
]

export const languageProficiencies = [
  'Basic',
  'Conversational',
  'Professional',
  'Fluent',
  'Native',
]

export const currentYear = new Date().getFullYear()

export const birthYears = Array.from({ length: 60 }, (_, i) =>
  String(currentYear - 16 - i),
)

// ----- Repeatable item factories -----

export type ExperienceItem = {
  id: string
  company: string
  positionTitle: string
  location: string
  startDate: string
  endDate: string
  currentlyHere: boolean
  reasonForLeaving: string
  achievements: string[]
}

export type EducationItem = {
  id: string
  university: string
  degree: string
  major: string
  location: string
  startDate: string
  endDate: string
  currentlyEnrolled: boolean
}

export type CertificationItem = {
  id: string
  name: string
  issuer: string
  issueDate: string
  credentialUrl: string
}

export type LanguageItem = {
  id: string
  language: string
  proficiency: string
}

export type ReferenceItem = {
  id: string
  name: string
  relationship: string
  email: string
  phone: string
}

export function uid() {
  return Math.random().toString(36).slice(2, 10)
}

export function emptyExperience(): ExperienceItem {
  return {
    id: uid(),
    company: '',
    positionTitle: '',
    location: '',
    startDate: '',
    endDate: '',
    currentlyHere: false,
    reasonForLeaving: '',
    achievements: [],
  }
}

export function emptyEducation(): EducationItem {
  return {
    id: uid(),
    university: '',
    degree: '',
    major: '',
    location: '',
    startDate: '',
    endDate: '',
    currentlyEnrolled: false,
  }
}

export function emptyCertification(): CertificationItem {
  return { id: uid(), name: '', issuer: '', issueDate: '', credentialUrl: '' }
}

export function emptyLanguage(): LanguageItem {
  return { id: uid(), language: '', proficiency: '' }
}

export function emptyReference(): ReferenceItem {
  return { id: uid(), name: '', relationship: '', email: '', phone: '' }
}

export function getProfileById(id: string): Profile | undefined {
  return profiles.find((profile) => profile.id === id)
}
