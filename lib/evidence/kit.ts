/**
 * The short kit every picker answer is built from (Stephanie's update,
 * Nov 14, 2026). The recommender decides the tools; this file holds the
 * fixed lines around them, keyed by problem id (recommend.json).
 *
 * Copy here is Stephanie's, word for word. Two slots stay empty until she
 * supplies them: who to follow on each answer (only the fraud answers have
 * a match so far) and what the other side sees, which is in her voice and
 * is never written for her.
 */

/** "What a tool won't do": one sentence per answer (section B of her update). */
export const WONT_DO: Record<string, string> = {
  // Job seekers
  'no-callbacks': 'A checker can get your resume read, but it can’t make you a fit for a job you aren’t qualified for.',
  rewriting: 'A builder handles the layout and wording, but you still have to supply what you did and what came of it.',
  'losing-track': 'A tracker keeps the list, but following up is still on you.',
  'interview-practice': 'Practice tools help you get comfortable, but they can’t tell you what one specific interviewer cares about.',
  'interviews-stall': 'No tool fixes this on its own, so ask a recruiter or a friend who hires to run a mock interview and tell you the truth.',
  // "I don't know which jobs to go after" has a line ("No tool can decide what you want, but these help you see what's out there."),
  // but the site has no job-search tools on file for "these" to point to, so it stays off until there are some.
  // Hiring teams
  spreadsheets: 'A tracking system keeps every candidate in one place, but it won’t speed up a slow decision.',
  'too-many-applicants': 'Screening tools sort the pile, but someone still has to decide what good looks like for the role.',
  'fake-candidates': 'No single tool catches everything, so use more than one check.',
  'cant-find-people': 'Sourcing tools find people, but they can’t make the job or the pay more appealing.',
  'interviews-inconsistent': 'A scorecard gets everyone asking the same things, but people still have to use it.',
  training: 'Training teaches the skills, but managers have to make room to practice them.',
}

export interface FreeTool {
  title: string
  detail: string
  href: string
}

/** The site's own free tools, named the way the Guides page names them. */
export const FREE_TOOLS = {
  costCalculator: {
    title: 'What will your search cost?',
    detail: 'Every resume tool sorted by the cheapest way to pay for your timeline.',
    href: '/guides/best-resume-tools#cost',
  },
  scorecard: {
    title: 'Interview scorecard builder',
    detail: 'The same questions for every candidate, sent as a PDF and a spreadsheet.',
    href: '/interview-scorecard',
  },
  costPerHire: {
    title: 'What does a hire cost?',
    detail: 'Cost per hire the way SHRM counts it, next to SHRM’s 2025 medians.',
    href: '/hiring-costs',
  },
  redFlags: {
    title: 'Is this even a real candidate?',
    detail: 'The FBI’s red flags for fake candidates, as a checklist for interviewers.',
    href: '/is-this-a-real-candidate',
  },
  interviewPractice: {
    title: 'What will they ask me in the interview?',
    detail: 'Practice the questions structured interviews use, and what a strong answer shows.',
    href: '/interview-practice',
  },
} satisfies Record<string, FreeTool>

/** "Free from us": the site's own free tool, where one fits the answer. */
export const FREE_FROM_US: Record<string, FreeTool> = {
  // Resume answers: the cost calculator
  'no-callbacks': FREE_TOOLS.costCalculator,
  rewriting: FREE_TOOLS.costCalculator,
  'losing-track': FREE_TOOLS.costCalculator,
  // Interview answers: the site's free interview practice
  'interview-practice': FREE_TOOLS.interviewPractice,
  'interviews-stall': FREE_TOOLS.interviewPractice,
  // Every interviewer asks something different: the scorecard builder
  'interviews-inconsistent': FREE_TOOLS.scorecard,
  // Hiring answers about cost or volume: the cost per hire tool
  spreadsheets: FREE_TOOLS.costPerHire,
  'too-many-applicants': FREE_TOOLS.costPerHire,
  // Fraud answers: the red flags checklist
  'fake-candidates': FREE_TOOLS.redFlags,
}

/** "Who to follow on this": up to two people from Who to follow (follow.json ids). Only the fraud answers have a match so far. */
export const FOLLOW_ON: Record<string, string[]> = {
  'fake-candidates': ['stacy-zapar'],
}

/** "What the other side sees": one or two sentences in Stephanie's voice. Empty until she supplies them; the slot stays hidden. */
export const OTHER_SIDE_SEES: Record<string, string> = {}

/** The labels an alternative can carry. Exactly one each. */
export type AlsoLabel = 'Best free option' | 'Most complete' | 'Stephanie’s pick'

/** The picker's intro line, used everywhere the picker is introduced. */
export const PICKER_INTRO = 'Pick what you’re dealing with. We’ll show you the best match and a couple of alternatives, and tell you what we ruled out.'
