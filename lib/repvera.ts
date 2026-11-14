/**
 * RepVera links, lines and the shared-ownership disclosure, in one place.
 *
 * Stephanie Murray makes hiring.productions and also built RepVera. Since
 * Nov 14, 2026 RepVera is listed in its own category, verified professional
 * reputation, with no score and no rank, and Stephanie's note that she
 * built it (copy in lib/evidence/guided.ts, from her handoff).
 * It is never scored or ranked, and neither is any tool it competes with
 * (the FTC's rule at 16 CFR 465.6). Every link is tagged with the page it
 * came from, so RepVera can see which pages start relationships.
 */

export const REPVERA_URL = 'https://www.repvera.com'

/** A RepVera link tagged with where on hiring.productions it was clicked. */
export function repveraLink(campaign: string): string {
  const q = new URLSearchParams({ utm_source: 'hiring.productions', utm_medium: 'referral', utm_campaign: campaign })
  return `${REPVERA_URL}/?${q.toString()}`
}

/** Shown at every email ask and in the footer. */
export const OWNERSHIP_DISCLOSURE = 'Made by Stephanie Murray, who also built RepVera. We never share your email with any vendor.'

/**
 * What RepVera is, in Stephanie's words (Nov 14, 2026): hiring teams ask for a candidate's RepVera early in the
 * process, anywhere from application through interviews depending on the team, to see verified experiences of what
 * someone is like to work with; candidates share theirs too. It is not a late-stage reference check.
 */
export const REPVERA_WHAT =
  "Hiring teams ask for a candidate's RepVera early in the process, from application through interviews, to see verified experiences of what someone is like to work with. Candidates share theirs too."

/** The closing line from RepVera's own approved copy (mis-hire calculator spec), used verbatim. */
export const REPVERA_TEAMS_LINE =
  'You can verify what someone can do. The harder question is how they show up, and that is where mis-hires are made.'

/** RepVera's category on this site. It has no scores and no rankings. */
export const REPVERA_CATEGORY = 'Verified professional reputation'

/** The label on every RepVera note and listing, in Stephanie's voice. */
export const REPVERA_NOTE_LABEL = 'From Stephanie, who built RepVera'

