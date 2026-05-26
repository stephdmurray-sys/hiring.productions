/**
 * Candidate scenes — the three named phases of an active job search.
 *
 * Restructured 2026-05-25 to map cleanly to actual visitor states:
 *   1. Actively applying (most common, includes silence + story translation)
 *   2. Has an interview coming up
 *   3. Has an offer in hand
 *
 * The previous structure ("The Silence / The Interview / The Story") mixed
 * pain-type and journey-phase, which forced a stalled visitor to pick "no
 * one is responding to me" even if they had just started. The new structure
 * is linear: networking → interview → offer. Story-translation tools
 * (gap, pivot, layoff, new grad) live INSIDE The Networking because
 * storytelling IS the networking challenge — how do you tell your story
 * to recruiters reading you cold.
 *
 * Shared between the homepage Start Here board, /tools page, onboarding
 * scene picker, and the post-signup dashboard. All four surfaces show the
 * same three buckets with the same framing.
 *
 * IDs are intentionally aligned with Supabase profiles.current_scene
 * values ('networking' | 'interview' | 'offer') so the dashboard can
 * directly look up the current moment by scene without a mapping.
 */

export interface Moment {
  id: string
  /** Big primary title (e.g. "The Networking"). */
  title: string
  /** Small italic subtitle in the visitor's own voice. */
  quote: string
  /** One-sentence framing on the detail view / tools page. */
  sub: string
  /** Three or four short concept-bullets shown on the homepage card so
   *  visitors see what's inside before clicking. Each ~3-6 words. */
  bullets: string[]
  /** Catalog tool names in display order. First = "start here". */
  toolNames: string[]
}

export const MOMENTS: Moment[] = [
  {
    id: 'networking',
    title: 'The Networking',
    quote: "I'm actively applying",
    sub: "You're sending applications, building your pipeline, or stuck in the silence. Whether you just started or it's been months, start with the things that get you found and read.",
    bullets: [
      'Where you rank in real recruiter searches',
      'The keywords missing from your resume',
      'Your full LinkedIn, rewritten',
      'Your story translated (gap, pivot, layoff, new grad)',
    ],
    toolNames: [
      'What Words Are Recruiters Searching For?',
      'Where Do You Rank in a Recruiter Search?',
      'Your LinkedIn, Rewritten',
      'What’s Breaking Your Job Search',
      'How to Explain My Employment Gap',
      'Your Career Pivot, Translated',
      'Your New Grad Resume',
    ],
  },
  {
    id: 'interview',
    title: 'The Interview',
    quote: 'I have one coming up',
    sub: 'Research the company before you go in. Decode the questions they’ll ask. Rehearse against their real rubric.',
    bullets: [
      'Decode the questions they’ll ask',
      'Rehearse against the real rubric',
      'How you actually come across',
    ],
    toolNames: [
      'What This Company Feels Like to Work At',
      'What They’re Really Asking',
      'The Rehearsal Room',
      'How You Actually Come Across',
      'Questions This Resume Invites',
    ],
  },
  {
    id: 'offer',
    title: 'The Offer',
    quote: 'I have an offer, now what?',
    sub: 'Read what’s actually on the table. Then negotiate without leaving money behind.',
    bullets: [
      'The exact opening line to use',
      'What to say when they ask for your number',
      'How to read a comp package',
    ],
    toolNames: [
      'How to Negotiate This Offer',
    ],
  },
]
