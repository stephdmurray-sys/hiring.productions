/**
 * RepVera links and the shared-ownership disclosure, in one place.
 *
 * hiring.productions and RepVera share an owner. RepVera never appears in a
 * score, ranking, recommendation or "best" list (GROWTH.md, and the FTC's
 * rule at 16 CFR 465.6). Where it may appear, every link is tagged with the
 * page it came from, so RepVera can see which pages start relationships.
 */

export const REPVERA_URL = 'https://www.repvera.com'

/** A RepVera link tagged with where on hiring.productions it was clicked. */
export function repveraLink(campaign: string): string {
  const q = new URLSearchParams({ utm_source: 'hiring.productions', utm_medium: 'referral', utm_campaign: campaign })
  return `${REPVERA_URL}/?${q.toString()}`
}

/** Shown at every email ask and in the footer. */
export const OWNERSHIP_DISCLOSURE = 'hiring.productions is made by the team behind RepVera. We never share your email with any vendor.'

/**
 * What RepVera is, in Stephanie's words (Nov 14, 2026): hiring teams ask for a candidate's RepVera early in the
 * process, anywhere from application through interviews depending on the team, to see verified experiences of what
 * someone is like to work with; candidates share theirs too. It is not a late-stage reference check.
 */
export const REPVERA_WHAT =
  "Hiring teams ask for a candidate's RepVera early in the process, from application through interviews, to see verified experiences of what someone is like to work with. Candidates share theirs too."

/** The closing line from RepVera's own approved copy (mis-hire calculator spec), used verbatim. */
export const REPVERA_TEAMS_LINE =
  'You can verify what someone can do. The harder question is how they actually show up, and that is where mis-hires are made.'
