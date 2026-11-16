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
  'choosing-ats': 'A tracking system keeps every candidate in one place, but it won’t speed up a slow decision.',
  'too-many-applicants': 'Screening tools sort the stack of applicants, but someone still has to decide what good looks like for the role.',
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
    detail: 'The FBI’s red flags for fake candidates, and the tools that catch them at each stage.',
    href: '/is-this-a-real-candidate',
  },
  interviewPractice: {
    title: 'What will they ask me in the interview?',
    detail: 'Practice the questions structured interviews use, and what a strong answer shows.',
    href: '/interview-practice',
  },
  // The job seeker free tools built from the site's own data (Nov 15, 2026)
  freeSearch: {
    title: 'The $0 job search',
    detail: 'The resume tools with a real free version, what free gets you, and the free tools on this site.',
    href: '/free-job-search',
  },
  screening: {
    title: 'What does the screening software do to my resume?',
    detail: 'What happens after you click apply, step by step, from the systems’ own help pages.',
    href: '/how-ats-actually-works',
  },
  listCheck: {
    title: 'Is this best-of list paid for?',
    detail: 'Who wrote the list you’re reading, and the four checks to run on any list.',
    href: '/is-this-list-paid-for',
  },
  proofKit: {
    title: 'How do I show employers how I work before the interview?',
    detail: 'Proof from the people who have worked with you and from your work, in three steps.',
    href: '/show-how-you-work',
  },
  realJob: {
    title: 'Is this job even real?',
    detail: 'The signs to check before you send a resume or anything else.',
    href: '/is-this-a-real-job',
  },
  // The stack builder (Nov 15, 2026): every part of a search or a hiring setup, priced from what is on file.
  stackSeekers: {
    title: 'What will your job search cost?',
    detail: 'Click tools into your stack and see the total, the cost if you forget to cancel, and the $0 version.',
    href: '/build-your-stack',
  },
  stackHiring: {
    title: 'What will your hiring tools cost?',
    detail: 'Click tools into your hiring stack and see the year’s cost for your team size.',
    href: '/build-your-stack/hiring',
  },
  screeningHiring: {
    title: 'Is software screening them out?',
    detail: 'How your own knockout rules screen people out, and what to change so the right people end up in your stack of applicants.',
    href: '/how-ats-actually-works#hiring',
  },
  // Value propositions, both sides (Nov 15, 2026)
  valueProp: {
    title: 'What’s my professional value proposition?',
    detail: 'Finish “I’m known for…” with what people say about working with you, and say it easily when someone asks.',
    href: '/professional-value-proposition',
  },
  evp: {
    title: 'What’s our employer value proposition?',
    detail: 'Finish “Our team is known for…” with what your team says, and say it the same way at every step.',
    href: '/employer-value-proposition',
  },
  portfolio: {
    title: 'Portfolio sites to know',
    detail: 'Where to show your work, sorted by the kind of work you do. Most have a free plan.',
    href: '/guides/portfolio-sites',
  },
} satisfies Record<string, FreeTool>

/** "Free from us": the site's own free tool, where one fits the answer. */
export const FREE_FROM_US: Record<string, FreeTool> = {
  // Resume answers: the stack builder, priced for their timeline
  'no-callbacks': FREE_TOOLS.stackSeekers,
  rewriting: FREE_TOOLS.stackSeekers,
  'losing-track': FREE_TOOLS.stackSeekers,
  // Interview answers: the site's free interview practice
  'interview-practice': FREE_TOOLS.interviewPractice,
  // They pick someone else after good interviews: say why you, in one line
  'interviews-stall': FREE_TOOLS.valueProp,
  // Every interviewer asks something different: the scorecard builder
  'interviews-inconsistent': FREE_TOOLS.scorecard,
  // Hiring answers about cost or volume: the cost per hire tool
  spreadsheets: FREE_TOOLS.costPerHire,
  'choosing-ats': FREE_TOOLS.stackHiring,
  // Buried in applicants: the knockout rules that decide who's in the stack of applicants (Nov 16, 2026 audit)
  'too-many-applicants': FREE_TOOLS.screeningHiring,
  // The right people aren't applying: why someone would take this job
  'cant-find-people': FREE_TOOLS.evp,
  // Fraud answers: the red flags checklist
  'fake-candidates': FREE_TOOLS.redFlags,
}

/** "Who to follow on this": up to two people from Who to follow (follow.json ids). Only the fraud answers have a match so far. */
export const FOLLOW_ON: Record<string, string[]> = {
  'fake-candidates': ['stacy-zapar'],
}

/** "What the other side sees": one or two sentences in Stephanie's voice. Empty until she supplies them; the slot stays hidden. */
export const OTHER_SIDE_SEES: Record<string, string> = {}

/**
 * The labels an alternative can carry. Exactly one each. "Backup" (Nov 15, 2026) only appears when none
 * of Stephanie's three labels qualifies, so every answer with a best match also has one alternative.
 */
export type AlsoLabel = 'Best free option' | 'Most complete' | 'Stephanie’s pick' | 'Backup'

/** "Your next step": one concrete action right above the best match's button, by problem. {name} is the best match. */
export const NEXT_STEP: Record<string, { free: string; paid: string }> = {
  'no-callbacks': {
    free: 'Open {name}’s free version and check your resume against the next job you want, before you apply.',
    paid: 'Open {name} and check your resume against the next job you want, before you apply.',
  },
  rewriting: {
    free: 'Start your rewrite in {name}’s free version, with its plainest template.',
    paid: 'Start your rewrite in {name}, with its plainest template.',
  },
  'losing-track': {
    free: 'Open {name}’s free version and add every application you’ve sent so far, with the date you applied.',
    paid: 'Open {name} and add every application you’ve sent so far, with the date you applied.',
  },
  spreadsheets: {
    free: 'Start {name}’s free plan with one open role and move one week of candidates into it.',
    paid: 'Book a demo of {name} with one of your real open roles, and ask for the price in writing first.',
  },
  'choosing-ats': {
    free: 'Start {name}’s free plan with one open role, and run it next to what you use today for a week.',
    paid: 'Book a demo of {name} with one of your real open roles, and ask for the price in writing first.',
  },
  'too-many-applicants': {
    free: 'Start {name}’s free plan with your busiest open role.',
    paid: 'Book a demo of {name} with your busiest open role, and ask for the price in writing first.',
  },
}

/** The picker's intro line, used everywhere the picker is introduced. */
export const PICKER_INTRO = 'Pick what you’re dealing with. We’ll show you the best match and a couple of alternatives, and tell you what we ruled out.'
