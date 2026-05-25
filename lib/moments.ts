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
  /** Three short concept-bullets shown on the homepage card so visitors
   *  see what's inside before clicking. Each ~3-6 words. */
  bullets: string[]
  /** Catalog tool names in display order. First = "start here". */
  toolNames: string[]
}

export const MOMENTS: Moment[] = [
  {
    id: 'no-responses',
    title: 'The Silence',
    quote: 'no one is responding to me',
    sub: 'You’ve applied and the silence is the worst part. Start with the keyword scan — that’s where the screen breaks first.',
    bullets: [
      'Where you rank in real recruiter searches',
      'The keywords missing from your resume',
      'Your full LinkedIn — rewritten',
    ],
    toolNames: [
      'What Words Are Recruiters Searching For?',
      'Where Do You Rank in a Recruiter Search?',
      'Your LinkedIn — Rewritten',
    ],
  },
  {
    id: 'interview-prep',
    title: 'The Interview',
    quote: 'I have an interview — or an offer — coming up',
    sub: 'Research the company before you go in. Decode the questions they’ll ask. Rehearse against their real rubric. Then negotiate when the offer lands.',
    bullets: [
      'Decode the questions they’ll ask',
      'Rehearse against the real rubric',
      'The script to negotiate the offer',
    ],
    toolNames: [
      'What This Company Feels Like to Work At',
      'What They’re Really Asking',
      'The Rehearsal Room',
      'How You Actually Come Across',
      'How to Negotiate This Offer',
    ],
  },
  {
    id: 'story',
    title: 'The Story',
    quote: 'gap, pivot, layoff, or new grad',
    sub: 'The unusual story is the asset, not the liability — when you tell it the way someone who reads resumes for a living would.',
    bullets: [
      'Tell the gap honestly',
      'Translate the pivot',
      'Diagnose what’s breaking',
    ],
    toolNames: [
      'How to Explain My Employment Gap',
      'Your Career Pivot, Translated',
      'What’s Breaking Your Job Search',
      'Your New Grad Resume',
    ],
  },
]
