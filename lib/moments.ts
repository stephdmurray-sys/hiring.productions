/**
 * Candidate moments — the four named situations a job seeker can be
 * in, each routing to a specific ordered sequence of catalog tools.
 *
 * Shared between the homepage Start Here board and the /tools page
 * so both surfaces stay in sync. The order matters — the FIRST tool
 * in each moment is the "start here" entry point (low-friction by
 * design); the deeper tools follow once the visitor has had a taste.
 */

export interface Moment {
  id: string
  /** Big primary title (e.g. "The Silence"). */
  title: string
  /** Small italic subtitle in the visitor's own voice. */
  quote: string
  /** One-sentence framing on the detail view / tools page. */
  sub: string
  /** Catalog tool names in display order. First = "start here". */
  toolNames: string[]
}

export const MOMENTS: Moment[] = [
  {
    id: 'no-responses',
    title: 'The Silence',
    quote: 'no one is responding to me',
    sub: 'You’ve applied and the silence is the worst part. Start with the keyword scan — that’s where the screen breaks first.',
    toolNames: [
      'What Words Are Recruiters Searching For?',
      'Where Do You Rank in a Recruiter Search?',
      'Your LinkedIn — Rewritten',
    ],
  },
  {
    id: 'interview-prep',
    title: 'The Interview',
    quote: 'I have an interview coming up',
    sub: 'See the questions they’re really asking. Run a rehearsal that matches their actual rubric. Nail the opening line.',
    toolNames: [
      'What They’re Really Asking',
      'The Rehearsal Room',
      'How You Actually Come Across',
    ],
  },
  {
    id: 'got-offer',
    title: 'The Offer',
    quote: 'I just got an offer',
    sub: 'See what’s actually negotiable, get the exact script to ask for more, and read the company before you sign.',
    toolNames: [
      'How to Negotiate This Offer',
      'What This Company Feels Like to Work At',
    ],
  },
  {
    id: 'situation',
    title: 'The Situation',
    quote: 'gap, pivot, layoff, or new grad',
    sub: 'Specific tools for specific situations. Tell it true, the way someone who reads resumes for a living would.',
    toolNames: [
      'How to Explain My Employment Gap',
      'Your Career Pivot, Translated',
      'What’s Breaking Your Job Search',
      'Your New Grad Resume',
    ],
  },
]
