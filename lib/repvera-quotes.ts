/**
 * Quotes about RepVera, word for word from Stephanie's two sheets (RepVera
 * Pilot Attestations and RepVera Professional Stories, read Nov 15, 2026).
 * Each person gave consent for marketing use and chose what may appear:
 * name, title, company, headshot, or anonymous. Everyone also asked to
 * review their quote first, so `approved` stays false until Stephanie says
 * that person signed off. Unapproved quotes show on preview builds (for her
 * review) and never on the production site.
 *
 * Positioning (Stephanie, Nov 15, 2026): RepVera isn't reference checking,
 * but it is a better version of what references were. An occasional
 * comparison to references is fine.
 */
export interface RepveraQuote {
  id: string
  text: string
  /** Shown only where the person allowed their name. */
  name: string | null
  /** Title, and company where allowed. */
  title: string | null
  /** A line about how they used it (Stephanie's wording). */
  context?: string
  /** Headshot, only where the person allowed it. */
  photo: string | null
  /** True when they used RepVera in the free pilot for hiring teams (a connection the FTC wants disclosed). */
  pilot?: boolean
  approved: boolean
}

export const REPVERA_QUOTES: Record<string, RepveraQuote> = {
  james: {
    id: 'james',
    text: 'It was very helpful to see how a candidate was described by their peers, and stack that up against our expectations for the role.',
    name: 'James Burke',
    title: 'Co-Founder, South Shore Analytics',
    context: 'He read a profile before an interview.',
    photo: null,
    pilot: true,
    approved: false,
  },
  marissa: {
    id: 'marissa',
    text: 'I have gained way more confidence while participating in interviews.',
    name: 'Marissa Creamer',
    title: 'Clinical Talent Executive',
    photo: '/people/marissa-creamer.webp',
    approved: false,
  },
  tai: {
    id: 'tai',
    text: 'I like how easy it is to give somebody a snapshot of what it’s like to work with me.',
    name: 'Tai Freligh',
    title: 'Senior Marketing Manager and Editorial Director',
    photo: '/people/tai-freligh.webp',
    approved: false,
  },
  ingrid: {
    id: 'ingrid',
    text: 'A recruiter was curious about the link I attached to my resume.',
    name: null,
    title: 'Director of Revenue Cycle Management',
    photo: null,
    approved: false,
  },
  rimshah: {
    id: 'rimshah',
    text: 'I was able to get a consulting client out of it.',
    name: null,
    title: null,
    photo: null,
    approved: false,
  },
}

/** A quote can show once its person approved it, or on any build that isn't the production site. */
export function quoteVisible(q: RepveraQuote): boolean {
  return q.approved || process.env.VERCEL_ENV !== 'production'
}

export const quotes = (ids: string[]) => ids.map((id) => REPVERA_QUOTES[id]).filter((q) => q && quoteVisible(q))

/** Stephanie's booking link for a one-role pilot conversation. */
export const REPVERA_CALL_URL = 'https://calendly.com/stephaniewithrepvera/30min'
