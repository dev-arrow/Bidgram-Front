export type PromptId = 'resume' | 'cover-letter' | 'qa'

/** Which prompt body is active: the shipped default, or the user's saved edit. */
export type PromptMode = 'default' | 'custom'

export type PromptDefinition = {
  id: PromptId
  title: string
  /** One-line summary of what this prompt produces. */
  description: string
  /** Short label for the artifact the AI generates. */
  output: string
  /** Placeholders Bidgram substitutes at generation time. */
  variables: readonly string[]
  defaultPrompt: string
}

/** Placeholders available to every prompt. */
const SHARED_VARIABLES = [
  '{{job_title}}',
  '{{company}}',
  '{{job_description}}',
  '{{profile_name}}',
] as const

export const PROMPT_DEFINITIONS: readonly PromptDefinition[] = [
  {
    id: 'resume',
    title: 'Resume Prompt',
    description:
      'Rewrites your base resume so the strongest, most relevant experience lines up with each job posting.',
    output: 'Tailored resume',
    variables: [...SHARED_VARIABLES, '{{base_resume}}', '{{years_experience}}'],
    defaultPrompt: `You are an expert technical recruiter and resume writer.

Rewrite the candidate's resume so it targets the role below without inventing anything.

ROLE
Title: {{job_title}}
Company: {{company}}
Description: {{job_description}}

CANDIDATE
Profile: {{profile_name}}
Experience: {{years_experience}} years
Base resume: {{base_resume}}

RULES
1. Never fabricate employers, dates, titles, degrees, or metrics. Use only facts present in the base resume.
2. Reorder and rewrite bullets so the most relevant experience appears first.
3. Mirror the exact keywords and tooling named in the job description wherever they are truthfully supported.
4. Start every bullet with a strong past-tense verb and quantify the outcome when a number exists.
5. Keep each bullet to a single line of at most 24 words.
6. Preserve the original section order: Summary, Experience, Skills, Education.
7. Return plain text only. No markdown, no commentary, no preamble.`,
  },
  {
    id: 'cover-letter',
    title: 'Cover Letter Prompt',
    description:
      'Writes a short, specific cover letter that connects your track record to what the posting actually asks for.',
    output: 'Cover letter',
    variables: [...SHARED_VARIABLES, '{{hiring_manager}}', '{{top_achievement}}'],
    defaultPrompt: `You are writing a cover letter on behalf of the candidate.

ROLE
Title: {{job_title}}
Company: {{company}}
Description: {{job_description}}

CANDIDATE
Profile: {{profile_name}}
Signature achievement: {{top_achievement}}
Addressed to: {{hiring_manager}}

RULES
1. Exactly four paragraphs, 180 words maximum in total.
2. Paragraph 1: name the role and one concrete, specific reason for interest in {{company}}. No flattery.
3. Paragraph 2: tie {{top_achievement}} directly to the posting's single most important requirement.
4. Paragraph 3: address the closest gap honestly and show the adjacent experience that covers it.
5. Paragraph 4: one-sentence close with a clear call to action.
6. Write plainly. Never use "passionate", "dynamic", "synergy", "leverage", or "I am writing to apply".
7. Use "Dear {{hiring_manager}}," when a name exists, otherwise "Dear Hiring Team,".
8. Return plain text only.`,
  },
  {
    id: 'qa',
    title: 'QA Prompt',
    description:
      'Answers the screening questions on application forms in your voice, consistently and within the length limits.',
    output: 'Screening answers',
    variables: [...SHARED_VARIABLES, '{{question}}', '{{max_length}}'],
    defaultPrompt: `You answer employer screening questions as the candidate, in first person.

ROLE
Title: {{job_title}}
Company: {{company}}
Description: {{job_description}}

QUESTION
{{question}}
Answer limit: {{max_length}} characters

RULES
1. Answer only what was asked. No greeting, no sign-off, no restating the question.
2. Ground every claim in the candidate's profile ({{profile_name}}). If the profile lacks the information, answer with the closest true adjacent experience instead of inventing detail.
3. For yes/no questions, lead with "Yes" or "No", then one sentence of justification.
4. For salary questions, give the candidate's stated range and note it is negotiable.
5. For "why this company" questions, cite one specific detail from the job description.
6. Never exceed {{max_length}} characters.
7. Return plain text only.`,
  },
] as const
