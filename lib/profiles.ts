export type Experience = {
  company: string
  period: string
}

export type Education = {
  school: string
  degree: string
  period: string
}

export type Profile = {
  id: string
  name: string
  title: string
  initials: string
  email: string
  phone: string
  address: string
  rate: number
  starred: boolean
  inUse: boolean
  using: number
  experience: Experience[]
  education: Education
  /** Applications bid per day, oldest first (Mon → Sun). */
  daily: number[]
}

export const WEEK_DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'] as const
export const WEEK_DAYS_LONG = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const

export const profiles: Profile[] = [
  {
    id: 'senior-react-dev',
    name: 'Alex Morgan',
    title: 'Senior React Developer',
    initials: 'AM',
    email: 'alex.morgan@bidgram.com',
    phone: '+1 (415) 555-0142',
    address: 'San Francisco, CA',
    rate: 45,
    starred: true,
    inUse: true,
    using: 34,
    experience: [
      { company: 'Vercel', period: '2022 – Present' },
      { company: 'Stripe', period: '2019 – 2022' },
    ],
    education: {
      school: 'MIT',
      degree: 'B.S. Computer Science',
      period: '2015–2019',
    },
    daily: [6, 4, 7, 5, 8, 3, 2],
  },
  {
    id: 'ui-ux-specialist',
    name: 'Priya Shah',
    title: 'Product Designer',
    initials: 'PS',
    email: 'priya.shah@bidgram.com',
    phone: '+1 (212) 555-0188',
    address: 'New York, NY',
    rate: 38,
    starred: false,
    inUse: false,
    using: 21,
    experience: [
      { company: 'Figma', period: '2021 – Present' },
      { company: 'Airbnb', period: '2018 – 2021' },
    ],
    education: {
      school: 'RISD',
      degree: 'BFA Graphic Design',
      period: '2014–2018',
    },
    daily: [3, 5, 2, 4, 6, 3, 1],
  },
  {
    id: 'budget-copywriter',
    name: 'Noah Williams',
    title: 'Content Writer',
    initials: 'NW',
    email: 'noah.williams@bidgram.com',
    phone: '+1 (312) 555-0116',
    address: 'Chicago, IL',
    rate: 18,
    starred: false,
    inUse: true,
    using: 47,
    experience: [{ company: 'HubSpot', period: '2020 – Present' }],
    education: {
      school: 'NYU',
      degree: 'B.A. English',
      period: '2016–2020',
    },
    daily: [8, 6, 9, 7, 10, 4, 3],
  },
]

export function weekTotal(profile: Profile) {
  return profile.daily.reduce((sum, value) => sum + value, 0)
}

export function totalApplications(list: Profile[] = profiles) {
  return list.reduce((sum, profile) => sum + profile.using, 0)
}
