import { FREE_TOOL_CARDS, type FreeToolCard } from '@/lib/free-tools'

/**
 * Shared content for the homepage facelift mockups (Stephanie, Nov 16, 2026: she liked a ChatGPT
 * layout's hero, the two "I'm building my career / my team" cards and the row of challenges under
 * it, and hated how AI-generated it looked). Every question, page and line here is already on the
 * site; nothing is invented. Not linked from the site, and /mockups is kept out of search.
 */

const pick = (side: 'seekers' | 'hiring', ids: string[]) => ids.map((id) => FREE_TOOL_CARDS[side].find((c) => c.id === id)!) as FreeToolCard[]

/** Three questions per side, so the two sides stay even. */
export const STUCK = {
  seekers: pick('seekers', ['screening', 'real-job', 'proof']),
  hiring: pick('hiring', ['real-candidate', 'proof-hiring', 'whole-stack']),
}

export const HERO = {
  h1: 'Hiring is a production.',
  /** Stephanie, Nov 16, 2026: it's about tools that help job seekers and hiring teams, not showing what the other side does. */
  dek: 'Free tools for job seekers and hiring teams, and straight answers on which paid tools are worth it.',
  /** Four, so the list stays even. Each is true of the site today. */
  trust: ['Nobody pays to be featured.', 'Every number is sourced and dated.', 'Free tools for both sides of the table.', 'Made by Stephanie Murray, 20 years in talent.'],
  seekers: { k: 'For job seekers', title: ['I’m building my ', 'career.', ''], line: 'Free tools to get past the screening software and walk into interviews ready.', cta: 'Help me choose', href: '/what-should-i-use?side=seekers#questions' },
  hiring: { k: 'For hiring teams', title: ['I’m building my ', 'team.', ''], line: 'Free tools to spot fake candidates and ask every candidate the same questions.', cta: 'Help me choose', href: '/what-should-i-use?side=hiring#questions' },
}

/** Two per side. Titles and lines from the pages themselves. */
export const NOW_PLAYING: { side: 'seekers' | 'hiring'; icon: FreeToolCard['icon']; title: string; line: string; href: string }[] = [
  { side: 'seekers', icon: 'screen', title: 'What does the screening software do to my resume?', line: 'Less than you’ve been told. What happens after you click apply, sourced line by line.', href: '/how-ats-actually-works' },
  { side: 'seekers', icon: 'proof', title: 'How do I prove what I’m like to work with?', line: 'Proof from the people who have worked with you, and from the work itself.', href: '/show-how-you-work' },
  { side: 'hiring', icon: 'list', title: 'Which fraud tools should we know?', line: 'The tools that catch fake candidates, at each stage of hiring.', href: '/guides/hiring-fraud-tools' },
  { side: 'hiring', icon: 'proof', title: 'See how someone works before the first interview.', line: 'Read what the people who have worked with a candidate already know.', href: '/what-should-i-use?side=hiring&problem=see-how-they-work' },
]

export const sideName = (s: 'seekers' | 'hiring') => (s === 'seekers' ? 'For job seekers' : 'For hiring teams')
export const sideShort = (s: 'seekers' | 'hiring') => (s === 'seekers' ? 'Job seekers' : 'Hiring teams')
