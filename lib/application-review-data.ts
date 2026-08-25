/**
 * Mock data for the Application Review workspace.
 *
 * Each application carries the full artifact set produced during an automated
 * bid: the job description (JD), the tailored resume used to apply, the cover
 * letter, the answered application questions (QA), and the screenshots captured
 * while the form was submitted.
 */

import { profiles } from './profiles'

const REFERENCE_DATE = new Date('2026-08-24')

export type ReviewProfile = {
  id: string
  name: string
  initials: string
  role: string
  color: string
}

export type JobDescription = {
  location: string
  employmentType: string
  visaSponsorship: string
  jobLink: string
  expirationDate: string
  requiredSkills: string[]
  bonusSkills: string[]
  aboutCompany: string
  aboutRole: string
  responsibilities: string[]
  requirements: string[]
  niceToHave: string[]
  benefits: string[]
}

export type ResumeExperience = {
  role: string
  company: string
  duration: string
  bullets: string[]
}

export type ResumeData = {
  template: string
  fullName: string
  title: string
  email: string
  phone: string
  location: string
  linkedin?: string
  summary: string
  skills: string[]
  experience: ResumeExperience[]
  education: { degree: string; school: string; year: string }[]
}

export type QAItem = {
  question: string
  answer: string
  type?: 'text' | 'select' | 'long'
}

export type Screenshot = {
  title: string
  url: string
  caption: string
  capturedAt: string
}

export type Application = {
  id: number
  profileId: string
  bidderName: string
  company: string
  title: string
  status: 'Qualified' | 'Disqualified'
  stage: string
  posted: string
  applied: string
  date: string
  type: string
  location: string
  color: string
  accent: string
  score: string
  salary?: string
  jd: JobDescription
  resume: ResumeData
  coverLetter: string[]
  qa: QAItem[]
  screenshots: Screenshot[]
}

/**
 * Review profiles are sourced directly from the Bidgram profiles used across
 * the app (see `lib/profiles.ts`), so the profile selector here always matches
 * the profiles configured on the Profile page. A profile is the account that
 * ran the bid — distinct from the applicant name captured on each application.
 */
const profileColors: Record<string, string> = {
  'senior-react-dev': 'bg-violet-600',
  'ui-ux-specialist': 'bg-primary',
  'budget-copywriter': 'bg-amber-600',
  }

export const reviewProfiles: ReviewProfile[] = profiles.map((profile) => ({
  id: profile.id,
  name: profile.name,
  initials: profile.initials,
  role: profile.title,
  color: profileColors[profile.id] ?? 'bg-slate-700',
}))

/* ------------------------------------------------------------------ */
/* Gary Gribble — sourced from his uploaded resume (Gary_Gribble.docx) */
/* ------------------------------------------------------------------ */

const garyResume: ResumeData = {
  template: 'Corporate',
  fullName: 'Gary Gribble',
  title: 'Principal Cloud DevOps Engineer',
  email: 'garygribble1211.dev@outlook.com',
  phone: '+1 (210) 756 2160',
  location: 'Crowell, TX',
  linkedin: 'linkedin.com/in/garygribble',
  summary:
    'Cloud engineering leader with 10 years of experience architecting and automating secure, scalable infrastructure across healthcare and technology sectors. Demonstrated track record of driving cloud adoption through Infrastructure as Code, establishing repeatable security controls in collaboration with SecOps, and building comprehensive monitoring capabilities that maximize system availability.',
  skills: [
    'AWS', 'GCP', 'Terraform', 'Kubernetes', 'Docker', 'CI/CD', 'GitHub Actions',
    'Infrastructure as Code', 'IAM', 'Cloud Monitoring', 'Network Security', 'SecOps',
    'Serverless', 'High Availability', 'Disaster Recovery', 'Python', 'Bash', 'Linux',
  ],
  experience: [
    {
      role: 'Staff Cloud Engineer',
      company: 'Augmedix',
      duration: '03/2022 – 05/2026',
      bullets: [
        'Configured and deployed multi-region VPC environments and cloud instances for healthcare data workloads, translating Cloud Architect designs into production-ready infrastructure that met strict compliance requirements.',
        'Established cost-minimization capabilities including instance scheduling and self-provisioning workflows, reducing monthly cloud spend to a predictable budget model.',
        'Authored and maintained standards for consumption of IaaS, PaaS, and SaaS through Infrastructure as Code, ensuring all provisioning followed repeatable, auditable patterns.',
        'Partnered with SecOps to embed network security policy into deployment pipelines, eliminating manual firewall rule configuration entirely.',
      ],
    },
    {
      role: 'Senior Cloud Engineer',
      company: 'Plasma',
      duration: '09/2018 – 02/2022',
      bullets: [
        'Provisioned cloud services including server instances, storage, reporting, and monitoring across a growing fintech platform processing sensitive transaction data.',
        'Collaborated with SecOps to establish security controls meeting CISO policy, reducing audit findings from 12 per quarter to zero.',
        'Built automated monitoring capabilities to maximize availability, cutting mean time to resolution from 45 minutes to under 15 minutes.',
      ],
    },
    {
      role: 'Cloud Engineer',
      company: 'Everlywell',
      duration: '01/2014 – 08/2018',
      bullets: [
        'Configured and deployed cloud instances and storage solutions supporting diagnostic lab workflows, ensuring high availability for patient-facing applications.',
        'Improved uptime from 99.5% to 99.9% by rapidly diagnosing and resolving system availability issues across a multi-vendor technology stack.',
        'Implemented role-based access controls aligned with IAM requirements and HIPAA compliance standards.',
      ],
    },
  ],
  education: [
    { degree: 'Bachelor of Science in Computer Science', school: 'University of Houston', year: '2010 – 2014' },
  ],
}

/* ---------------------------------- */
/* Job descriptions                   */
/* ---------------------------------- */

const epamDevOpsJD: JobDescription = {
  location: 'United States',
  employmentType: 'Full Time',
  visaSponsorship: 'Likely Sponsor Visa',
  jobLink: 'https://careers.epam.com/jobs/senior-devops-engineer',
  expirationDate: 'Sep 20, 2026',
  requiredSkills: [
    'AWS', 'Terraform', 'Kubernetes', 'CI/CD pipelines', 'Bash', 'Observability',
    'Troubleshooting', 'Distributed Systems', 'Messaging Systems', 'Databases', 'Storage',
  ],
  bonusSkills: [
    'AWS Elastic Kubernetes Service', 'AWS Lambda', 'Amazon API Gateway', 'AWS Aurora',
    'Amazon RDS', 'Amazon S3', 'Amazon CloudFront', 'Amazon CloudWatch', 'Amazon OpenSearch',
    'Fluentbit', 'OpenTelemetry', 'Azure DevOps', 'ArgoCD', 'Python', 'PowerShell',
  ],
  aboutCompany:
    'EPAM Systems is a leading global product development and digital platform engineering services company founded in 1993, with over 10,000 employees serving multiple industries such as big data, AI and enterprise software.',
  aboutRole:
    "The Senior DevOps Engineer will join EPAM's shared DevOps team supporting a Medtech project, responsible for building and maintaining AWS cloud infrastructure, Kubernetes environments, Terraform automation, CI/CD pipelines, GitOps deployments, observability and cloud security to enable reliable software delivery.",
  responsibilities: [
    'Automate SDLC processes, including infrastructure provisioning, environment deployment, and CI/CD pipeline automation',
    'Design, deploy, and maintain AWS cloud infrastructure using a wide range of services',
    'Manage and operate Kubernetes clusters to ensure reliability and scalability',
    'Build and maintain infrastructure-as-code with Terraform',
    'Develop and support fully automated CI/CD pipelines using Azure DevOps',
    'Implement GitOps-based application deployments with ArgoCD',
    'Ensure observability and troubleshoot issues across distributed systems',
    'Collaborate with engineering teams to enable reliable and efficient delivery processes',
    'Maintain security, networking, and access management across cloud environments',
  ],
  requirements: [
    '3+ years of experience in a DevOps or similar engineering role',
    'Proficiency in Amazon Web Services (AWS) and its core cloud offerings',
    'Expertise in Terraform for infrastructure-as-code',
    'Skills in Kubernetes operation, deployment, and cluster fundamentals',
    'Background in building and maintaining CI/CD pipelines',
    'Competency in scripting with Bash',
    'Capability to ensure observability and troubleshoot distributed systems',
    'Understanding of messaging, databases, storage, and security supporting services',
    'Strong communication skills and fluent English',
  ],
  niceToHave: [
    'Familiarity with AWS services such as EKS, Lambda, and API Gateway',
    'Knowledge of AWS Aurora, RDS, and S3',
    'Skills in Amazon CloudFront, CloudWatch, and OpenSearch',
    'Expertise in observability tools, including Fluent Bit, OpenTelemetry, and Amazon Managed Prometheus/Grafana',
    'Proficiency in Azure DevOps, ArgoCD, Python, and PowerShell',
  ],
  benefits: [
    'International projects with top brands',
    'Work with global teams of highly skilled, diverse peers',
    'Healthcare benefits',
    'Employee financial programs',
    'Paid time off and sick leave',
    'Upskilling, reskilling and certification courses',
    'Unlimited access to the LinkedIn Learning library and 22,000+ courses',
    'Global career opportunities',
    'Volunteer and community involvement opportunities',
    'EPAM Employee Groups',
    'Award-winning culture recognized by Glassdoor, Newsweek and LinkedIn',
  ],
}

const lmiCloudJD: JobDescription = {
  location: 'Remote — United States',
  employmentType: 'Contract (W2)',
  visaSponsorship: 'No Sponsorship',
  jobLink: 'https://careers.lmi.org/jobs/cloud-engineer',
  expirationDate: 'Sep 5, 2026',
  requiredSkills: [
    'Google Cloud Platform', 'AWS', 'Microsoft Azure', 'GKE', 'Cloud Run', 'BigQuery',
    'IAM', 'GitLab CI/CD', 'Linux', 'Cloud Architecture',
  ],
  bonusSkills: [
    'FedRAMP', 'FISMA', 'DevSecOps', 'High Availability', 'Disaster Recovery',
    'Security Clearance', 'Cross-Domain Solutions', 'Multi-Cloud', 'Pub/Sub', 'Dataflow',
  ],
  aboutCompany:
    'LMI is a new breed of digital solutions provider dedicated to accelerating government impact with innovation and speed. Headquartered in Tysons, Virginia, LMI serves the defense, space, healthcare, and energy sectors, bringing commercial-grade platforms and mission-ready AI to federal agencies at commercial speed.',
  aboutRole:
    'LMI is seeking a Cloud Engineer to support our LIGER platform to meet specific customer needs, evaluating cloud-based technical solutions and monitoring the design and engineering of infrastructure and applications in secure gov-cloud environments.',
  responsibilities: [
    'Evaluate cloud-based technical solutions and designs in accordance with client requirements',
    'Provide expertise to monitor the design and engineering of infrastructure and applications to the cloud',
    'Ensure all vendor cloud solutions comply with industry and Government-mandated security protocols',
    'Administer and monitor IL4/IL5/IL6 cloud accounts and performance levels',
    'Develop High Availability and Disaster Recovery processes per government and industry guidelines',
    'Help establish DevSecOps pipelines within the Gov-Cloud framework',
    'Design and deploy solutions within Google Cloud Platform environments, including project/org structure, IAM, and networking',
    'Build and manage containerized workloads using GKE or Cloud Run',
  ],
  requirements: [
    "Bachelor's degree in a related technical discipline",
    'Hands-on experience with Google Cloud Platform (preferred) or AWS/Azure',
    'Certification in one or more cloud platforms (AWS, Azure, or GCP)',
    'Experience maintaining hybrid cloud solutions',
    'Experience using GitLab for CI/CD and automated deployments',
    'Strong familiarity using Linux toolsets to support and analyze network topics',
    'Experience with Agile development methodologies',
  ],
  niceToHave: [
    "Master's degree in a related technical discipline",
    'Active Secret or Top Secret security clearance',
    'AWS Certified Solutions Architect Professional',
    'Experience working in IL6 or equivalent secure environments',
    'Experience with FedRAMP-certified providers and FISMA requirements',
    'Multi-cloud architecture experience (AWS + Google Cloud Platform)',
  ],
  benefits: [
    'Target salary range $122,210 – $200,000',
    'Mission-driven federal projects',
    'Fully remote work arrangement',
    'Access to emerging technologies and prototypes',
    'Collaborative, agile team culture',
  ],
}

const figmaDesignJD: JobDescription = {
  location: 'San Francisco, CA (Hybrid)',
  employmentType: 'Full Time',
  visaSponsorship: 'Case by Case',
  jobLink: 'https://figma.com/careers/senior-product-designer',
  expirationDate: 'Sep 12, 2026',
  requiredSkills: [
    'Product Design', 'Figma', 'Design Systems', 'Prototyping', 'User Research',
    'Interaction Design', 'Wireframing', 'Accessibility',
  ],
  bonusSkills: ['Motion Design', 'Front-End (React)', 'Data Visualization', 'Design Tokens'],
  aboutCompany:
    'Figma helps teams design, prototype, and build products together in the browser. Our tools power design at companies of every size, and we are on a mission to make design accessible to everyone.',
  aboutRole:
    'We are looking for a Senior Product Designer to own end-to-end design for a core surface area, partnering closely with engineering and product to ship polished, accessible experiences.',
  responsibilities: [
    'Own end-to-end design for a core product surface, from discovery to ship',
    'Contribute to and evolve the shared design system',
    'Run user research and translate insights into product decisions',
    'Partner with engineering to ensure high-fidelity implementation',
  ],
  requirements: [
    '5+ years of product design experience for software products',
    'Strong portfolio demonstrating shipped, complex work',
    'Fluency in Figma and modern design-system practices',
    'Excellent communication and cross-functional collaboration skills',
  ],
  niceToHave: [
    'Experience designing developer or creative tools',
    'Familiarity with front-end development',
    'Motion and prototyping expertise',
  ],
  benefits: ['Competitive equity', 'Comprehensive health coverage', 'Learning stipend', 'Flexible time off'],
}

/* ---------------------------------- */
/* Resumes for the other bidders      */
/* ---------------------------------- */

const sarahResume: ResumeData = {
  template: 'Modern',
  fullName: 'Sarah Chen',
  title: 'Senior Product Designer',
  email: 'sarah.chen@bidgram.com',
  phone: '+1 (212) 555-0188',
  location: 'New York, NY',
  linkedin: 'linkedin.com/in/sarahchen',
  summary:
    'Product designer with 7 years of experience shipping end-to-end experiences for design and creative tools. Focused on design systems, accessibility, and turning research into decisions.',
  skills: ['Product Design', 'Figma', 'Design Systems', 'Prototyping', 'User Research', 'Accessibility', 'Motion Design'],
  experience: [
    {
      role: 'Senior Product Designer',
      company: 'Figma',
      duration: '2021 – Present',
      bullets: [
        'Owned end-to-end design for the FigJam templates surface, growing weekly template usage by 3x.',
        'Established shared component and token standards adopted across four product teams.',
      ],
    },
    {
      role: 'Product Designer',
      company: 'Airbnb',
      duration: '2018 – 2021',
      bullets: [
        'Led the redesign of the host onboarding flow, improving completion by 22%.',
        'Partnered with research to run generative and evaluative studies each quarter.',
      ],
    },
  ],
  education: [{ degree: 'BFA Graphic Design', school: 'Rhode Island School of Design', year: '2014 – 2018' }],
}

const michaelResume: ResumeData = {
  template: 'Tech',
  fullName: 'Michael Ross',
  title: 'Data Engineer',
  email: 'michael.ross@bidgram.com',
  phone: '+1 (312) 555-0116',
  location: 'Chicago, IL',
  linkedin: 'linkedin.com/in/michaelross',
  summary:
    'Data engineer with 6 years of experience building reliable batch and streaming pipelines on modern cloud data stacks. Comfortable owning ingestion, transformation, and warehouse modeling end to end.',
  skills: ['Python', 'SQL', 'Snowflake', 'dbt', 'Airflow', 'Spark', 'Kafka', 'AWS'],
  experience: [
    {
      role: 'Data Engineer',
      company: 'Snowflake',
      duration: '2020 – Present',
      bullets: [
        'Built and maintained streaming ingestion pipelines processing 2B+ events per day.',
        'Modeled the core analytics warehouse in dbt, cutting report build times by 40%.',
      ],
    },
    {
      role: 'Analytics Engineer',
      company: 'Grubhub',
      duration: '2018 – 2020',
      bullets: ['Migrated legacy ETL jobs to Airflow, improving pipeline reliability to 99.8%.'],
    },
  ],
  education: [{ degree: 'B.S. Computer Science', school: 'University of Illinois', year: '2013 – 2017' }],
}

/* ---------------------------------- */
/* QA (answered application forms)    */
/* ---------------------------------- */

const garyEpamQA: QAItem[] = [
  { question: 'Name', answer: 'Gary' },
  { question: 'Surname', answer: 'Gribble' },
  { question: 'Email', answer: 'garygribble1211.dev@outlook.com' },
  { question: 'Mobile phone number', answer: '+1 2107562160' },
  { question: 'Current country', answer: 'United States of America', type: 'select' },
  { question: 'State', answer: 'Texas', type: 'select' },
  { question: 'Current city', answer: 'Crowell' },
  { question: 'ZIP code', answer: '79227' },
  { question: 'Preferred work countries', answer: 'United States of America', type: 'select' },
  { question: 'Primary skill', answer: 'Amazon Web Services', type: 'select' },
  { question: 'Years of relevant experience', answer: '8' },
  { question: 'Notice period', answer: 'Available now', type: 'select' },
  {
    question: 'Why are you interested in this role?',
    answer:
      'I have spent the last decade automating secure, scalable cloud infrastructure and I am excited to bring that experience to a Medtech-focused DevOps team where reliability and compliance matter most.',
    type: 'long',
  },
]

const garyLmiQA: QAItem[] = [
  { question: 'Name', answer: 'Gary' },
  { question: 'Surname', answer: 'Gribble' },
  { question: 'Email', answer: 'garygribble1211.dev@outlook.com' },
  { question: 'Mobile phone number', answer: '+1 2107562160' },
  { question: 'Current country', answer: 'United States of America', type: 'select' },
  { question: 'Are you authorized to work in the US?', answer: 'Yes', type: 'select' },
  { question: 'Do you require sponsorship now or in the future?', answer: 'No', type: 'select' },
  { question: 'Active security clearance', answer: 'None — able to obtain', type: 'select' },
  { question: 'Primary cloud platform', answer: 'Google Cloud Platform', type: 'select' },
  { question: 'Years of relevant experience', answer: '10' },
  { question: 'Notice period', answer: 'Available now', type: 'select' },
  { question: 'Desired annual compensation', answer: '$180,000' },
]

const sarahQA: QAItem[] = [
  { question: 'Name', answer: 'Sarah' },
  { question: 'Surname', answer: 'Chen' },
  { question: 'Email', answer: 'sarah.chen@bidgram.com' },
  { question: 'Mobile phone number', answer: '+1 2125550188' },
  { question: 'Current city', answer: 'New York' },
  { question: 'Portfolio URL', answer: 'sarahchen.design' },
  { question: 'Years of relevant experience', answer: '7' },
  { question: 'Preferred work location', answer: 'Hybrid', type: 'select' },
  { question: 'Notice period', answer: 'Two weeks', type: 'select' },
]

const michaelQA: QAItem[] = [
  { question: 'Name', answer: 'Michael' },
  { question: 'Surname', answer: 'Ross' },
  { question: 'Email', answer: 'michael.ross@bidgram.com' },
  { question: 'Mobile phone number', answer: '+1 3125550116' },
  { question: 'Current city', answer: 'Chicago' },
  { question: 'Primary skill', answer: 'Data Engineering', type: 'select' },
  { question: 'Years of relevant experience', answer: '6' },
  { question: 'Notice period', answer: 'One month', type: 'select' },
]

/* ---------------------------------- */
/* Cover letters                      */
/* ---------------------------------- */

const garyEpamCover = [
  'Dear EPAM Hiring Team,',
  "I am writing to express my strong interest in the Senior DevOps Engineer role supporting your Medtech project. With ten years of experience architecting and automating secure cloud infrastructure across healthcare and technology, I am confident I can help your shared DevOps team deliver reliable software at scale.",
  'In my current role at Augmedix, I have translated architecture designs into production-ready, compliance-driven infrastructure using Terraform and Infrastructure as Code, embedded network security policy directly into deployment pipelines with SecOps, and built monitoring that maximizes availability across a multi-vendor stack. These directly map to your needs around AWS infrastructure, Kubernetes operations, CI/CD automation, and observability.',
  'I would welcome the opportunity to bring my automation-first mindset and healthcare compliance experience to EPAM. Thank you for your consideration.',
  'Sincerely,\nGary Gribble',
]

const garyLmiCover = [
  'Dear LMI Hiring Team,',
  'I am excited to apply for the Cloud Engineer position supporting the LIGER platform. My decade of experience building secure, automated infrastructure — including hands-on work with GCP, AWS, and hybrid environments — aligns closely with the demands of regulated, mission-critical gov-cloud work.',
  'I have established DevSecOps guardrails that reduced audit findings to zero, developed High Availability and Disaster Recovery processes, and automated identity and access management to meet strict policy requirements. I am comfortable operating independently in secure environments and coordinating across cybersecurity and infrastructure teams.',
  'I would be glad to support your customer mission and am ready to pursue the clearance requirements this role entails. Thank you for your time.',
  'Sincerely,\nGary Gribble',
]

const sarahCover = [
  'Dear Figma Design Team,',
  'As a longtime user and admirer of Figma, I am thrilled to apply for the Senior Product Designer role. I have spent seven years shipping end-to-end experiences for creative and collaboration tools, and I care deeply about accessible, systemized design.',
  'Most recently I owned the FigJam templates surface, tripling weekly usage while establishing shared component and token standards across four teams. I would love to bring that same rigor and craft to your team.',
  'Sincerely,\nSarah Chen',
]

const michaelCover = [
  'Dear Hiring Team,',
  'I am applying for the Data Engineer role with enthusiasm for building reliable, scalable data platforms. Over six years I have owned ingestion, transformation, and warehouse modeling for high-volume event streams.',
  'At Snowflake I built streaming pipelines handling more than two billion events per day and modeled the core analytics warehouse in dbt, cutting report build times by 40%. I would welcome the chance to bring that impact to your team.',
  'Sincerely,\nMichael Ross',
]

/* ---------------------------------- */
/* Screenshots (application capture)  */
/* ---------------------------------- */

function captureFlow(host: string, path: string, day: string): Screenshot[] {
  return [
    {
      title: 'Application form',
      url: `${host}${path}`,
      caption: 'Candidate details auto-filled from the selected profile.',
      capturedAt: `${day} · 10:24 AM`,
    },
    {
      title: 'Questions & preferences',
      url: `${host}${path}#questions`,
      caption: 'Screening questions answered using saved application defaults.',
      capturedAt: `${day} · 10:24 AM`,
    },
    {
      title: 'Resume upload',
      url: `${host}${path}#documents`,
      caption: 'Tailored resume and cover letter attached to the submission.',
      capturedAt: `${day} · 10:25 AM`,
    },
    {
      title: 'Submission confirmation',
      url: `${host}${path}#success`,
      caption: 'Confirmation page captured as proof the application was received.',
      capturedAt: `${day} · 10:25 AM`,
    },
  ]
}

/* ---------------------------------- */
/* Applications                       */
/* ---------------------------------- */

const seedApplications: Application[] = [
  {
    id: 1,
    profileId: 'senior-react-dev',
    bidderName: 'Gary Gribble',
    company: 'EPAM Systems',
    title: 'Senior DevOps Engineer',
    status: 'Qualified',
    stage: 'Manually Completed',
    posted: '20 hours ago',
    applied: '2 hours ago',
    date: 'Today',
    type: 'Dev',
    location: 'United States',
    color: 'bg-slate-900',
    accent: 'border-primary/25 bg-primary/[0.025]',
    score: '92%',
    salary: '$140k – $180k',
    jd: epamDevOpsJD,
    resume: garyResume,
    coverLetter: garyEpamCover,
    qa: garyEpamQA,
    screenshots: captureFlow('careers.epam.com', '/jobs/senior-devops-engineer', 'Today'),
  },
  {
    id: 2,
    profileId: 'senior-react-dev',
    bidderName: 'Gary Gribble',
    company: 'LMI Government Consulting',
    title: 'Cloud Engineer',
    status: 'Qualified',
    stage: 'Auto Applied',
    posted: '15 days ago',
    applied: '12 days ago',
    date: 'Yesterday',
    type: 'Cloud',
    location: 'Remote — US',
    color: 'bg-slate-900',
    accent: '',
    score: '88%',
    salary: '$122k – $200k',
    jd: lmiCloudJD,
    resume: garyResume,
    coverLetter: garyLmiCover,
    qa: garyLmiQA,
    screenshots: captureFlow('dice.com', '/job-detail/2026-14189', 'Yesterday'),
  },
  {
    id: 3,
    profileId: 'ui-ux-specialist',
    bidderName: 'Sarah Chen',
    company: 'Figma',
    title: 'Senior Product Designer',
    status: 'Qualified',
    stage: 'Auto Applied',
    posted: '3 days ago',
    applied: '1 day ago',
    date: 'Aug 21, 2026',
    type: 'Design',
    location: 'San Francisco, CA',
    color: 'bg-primary',
    accent: '',
    score: '84%',
    salary: '$150k – $195k',
    jd: figmaDesignJD,
    resume: sarahResume,
    coverLetter: sarahCover,
    qa: sarahQA,
    screenshots: captureFlow('figma.com', '/careers/senior-product-designer', 'Aug 21, 2026'),
  },
  {
    id: 4,
    profileId: 'budget-copywriter',
    bidderName: 'Michael Ross',
    company: 'Snowflake',
    title: 'Data Engineer',
    status: 'Disqualified',
    stage: 'Not Applied',
    posted: '1 month ago',
    applied: '3 weeks ago',
    date: 'Jul 24, 2026',
    type: 'Data',
    location: 'United States',
    color: 'bg-slate-600',
    accent: '',
    score: '58%',
    salary: '$130k – $170k',
    jd: figmaDesignJD,
    resume: michaelResume,
    coverLetter: michaelCover,
    qa: michaelQA,
    screenshots: captureFlow('careers.snowflake.com', '/data-engineer', 'Jul 24, 2026'),
  },
]

const applicationTitles = [
  'Senior Frontend Engineer',
  'Product Designer',
  'Content Marketing Specialist',
  'Backend Platform Engineer',
  'Growth Marketing Lead',
  'iOS Software Engineer',
  'Brand Design Consultant',
  'Business Intelligence Analyst',
  'Technical Documentation Writer',
  'Full-Stack Product Engineer',
]

const applicationCompanies = [
  'Linear',
  'Notion',
  'Webflow',
  'Ramp',
  'Lattice',
  'Vercel',
  'Dropbox',
  'Datadog',
  'Atlassian',
  'Loom',
]

const profileApplicationCounts = new Map<string, number>()
for (const application of seedApplications) {
  profileApplicationCounts.set(application.profileId, (profileApplicationCounts.get(application.profileId) ?? 0) + 1)
}

const generatedApplications: Application[] = profiles.flatMap((profile, profileIndex) => {
  const existingCount = profileApplicationCounts.get(profile.id) ?? 0
  const needed = Math.max(0, 3 - existingCount)
  const template = seedApplications[profileIndex % seedApplications.length]

  return Array.from({ length: needed }, (_, applicationIndex) => {
    const id = 100 + profileIndex * 10 + applicationIndex
    const dayOffset = (profileIndex + applicationIndex) % 7
    const date = new Date(REFERENCE_DATE.getTime() - dayOffset * 24 * 60 * 60 * 1000)
    const dateLabel = dayOffset === 0 ? 'Today' : dayOffset === 1 ? 'Yesterday' : date.toISOString().slice(0, 10)

    return {
      ...template,
      id,
      profileId: profile.id,
      bidderName: profile.name,
      company: applicationCompanies[(profileIndex + applicationIndex) % applicationCompanies.length],
      title: applicationTitles[profileIndex],
      status: applicationIndex === 2 ? 'Disqualified' : 'Qualified',
      stage: applicationIndex === 2 ? 'Not Applied' : applicationIndex === 1 ? 'Manually Completed' : 'Auto Applied',
      posted: `${Math.max(1, dayOffset + 1)} days ago`,
      applied: dayOffset === 0 ? '1 hour ago' : `${dayOffset} days ago`,
      date: dateLabel,
      score: `${78 + ((profileIndex * 3 + applicationIndex * 4) % 18)}%`,
      screenshots: captureFlow('jobs.bidgram-demo.com', `/roles/${profile.id}-${applicationIndex + 1}`, dateLabel),
    }
  })
})

export const applications: Application[] = [...seedApplications, ...generatedApplications]

export const reviewTabs = [
  { value: 'jd', label: 'JD' },
  { value: 'resume', label: 'Resume', badge: 'Tailored' },
  { value: 'cover', label: 'Cover Letter' },
  { value: 'qa', label: 'QA' },
  { value: 'screens', label: 'Screenshots' },
] as const

export type ReviewTab = (typeof reviewTabs)[number]['value']
