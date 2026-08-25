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
  {
    id: 'backend-engineer',
    name: 'Marcus Chen',
    title: 'Backend Engineer',
    initials: 'MC',
    email: 'marcus.chen@bidgram.com',
    phone: '+1 (206) 555-0137',
    address: 'Seattle, WA',
    rate: 52,
    starred: true,
    inUse: false,
    using: 29,
    experience: [{ company: 'Amazon', period: '2019 – Present' }, { company: 'Twilio', period: '2017 – 2019' }],
    education: { school: 'University of Washington', degree: 'B.S. Computer Science', period: '2013–2017' },
    daily: [4, 6, 5, 8, 7, 2, 1],
  },
  {
    id: 'growth-marketer',
    name: 'Sofia Rivera',
    title: 'Growth Marketing Manager',
    initials: 'SR',
    email: 'sofia.rivera@bidgram.com',
    phone: '+1 (305) 555-0194',
    address: 'Miami, FL',
    rate: 34,
    starred: false,
    inUse: true,
    using: 38,
    experience: [{ company: 'Canva', period: '2021 – Present' }, { company: 'Mailchimp', period: '2018 – 2021' }],
    education: { school: 'University of Florida', degree: 'B.A. Marketing', period: '2014–2018' },
    daily: [5, 7, 4, 6, 8, 3, 2],
  },
  {
    id: 'mobile-developer',
    name: 'Ethan Brooks',
    title: 'iOS Developer',
    initials: 'EB',
    email: 'ethan.brooks@bidgram.com',
    phone: '+1 (512) 555-0162',
    address: 'Austin, TX',
    rate: 48,
    starred: false,
    inUse: false,
    using: 17,
    experience: [{ company: 'Rover', period: '2020 – Present' }],
    education: { school: 'Georgia Tech', degree: 'B.S. Computer Engineering', period: '2016–2020' },
    daily: [2, 4, 3, 5, 4, 1, 2],
  },
  {
    id: 'brand-strategist',
    name: 'Aisha Patel',
    title: 'Brand Strategist',
    initials: 'AP',
    email: 'aisha.patel@bidgram.com',
    phone: '+1 (718) 555-0129',
    address: 'Brooklyn, NY',
    rate: 42,
    starred: true,
    inUse: true,
    using: 44,
    experience: [{ company: 'Pentagram', period: '2022 – Present' }, { company: 'IDEO', period: '2019 – 2022' }],
    education: { school: 'Parsons', degree: 'BFA Communication Design', period: '2015–2019' },
    daily: [7, 8, 6, 7, 9, 4, 3],
  },
  {
    id: 'data-analyst',
    name: 'Liam Okafor',
    title: 'Data Analyst',
    initials: 'LO',
    email: 'liam.okafor@bidgram.com',
    phone: '+1 (617) 555-0175',
    address: 'Boston, MA',
    rate: 31,
    starred: false,
    inUse: false,
    using: 23,
    experience: [{ company: 'Wayfair', period: '2021 – Present' }],
    education: { school: 'Northeastern University', degree: 'B.S. Data Science', period: '2017–2021' },
    daily: [3, 4, 5, 3, 6, 2, 1],
  },
  {
    id: 'technical-writer',
    name: 'Grace Kim',
    title: 'Technical Writer',
    initials: 'GK',
    email: 'grace.kim@bidgram.com',
    phone: '+1 (503) 555-0108',
    address: 'Portland, OR',
    rate: 27,
    starred: false,
    inUse: false,
    using: 14,
    experience: [{ company: 'Atlassian', period: '2020 – Present' }],
    education: { school: 'University of Oregon', degree: 'B.A. Journalism', period: '2016–2020' },
    daily: [2, 3, 2, 4, 3, 1, 1],
  },
  {
    id: 'fullstack-builder',
    name: 'Diego Santos',
    title: 'Full-Stack Developer',
    initials: 'DS',
    email: 'diego.santos@bidgram.com',
    phone: '+1 (213) 555-0156',
    address: 'Los Angeles, CA',
    rate: 40,
    starred: true,
    inUse: true,
    using: 51,
    experience: [{ company: 'Netflix', period: '2021 – Present' }, { company: 'Lyft', period: '2018 – 2021' }],
    education: { school: 'UCLA', degree: 'B.S. Computer Science', period: '2014–2018' },
    daily: [9, 7, 8, 10, 8, 5, 4],
  },
]

export function weekTotal(profile: Profile) {
  return profile.daily.reduce((sum, value) => sum + value, 0)
}

export function totalApplications(list: Profile[] = profiles) {
  return list.reduce((sum, profile) => sum + profile.using, 0)
}
