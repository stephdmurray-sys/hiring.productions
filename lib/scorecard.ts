import data from '@/lib/tools/scorecard.json'

/**
 * One place that decides what a scorecard contains, shared by the page,
 * the email and the PDF and Excel files, so they can never disagree.
 * Everything is rebuilt from scorecard.json by id: nothing a visitor sends
 * is printed except the role title, which is cleaned and capped.
 */

export const SCORECARD_PATH = '/interview-scorecard'
export const SCORECARD_MAX = 6
export const SCORECARD_SITE = 'https://hiring.productions'

export type Competency = (typeof data.competencies)[number]
export const scorecardData = data

/** Trim, collapse whitespace, drop control characters, cap at 80. */
export function cleanRole(raw: string | null | undefined): string {
  return (raw ?? '')
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 80)
}

/** Known ids only, first occurrence kept, in the order given, at most six. */
export function pickCompetencies(raw: string[] | string | null | undefined): { chosen: Competency[]; tooMany: boolean } {
  const list = (Array.isArray(raw) ? raw.join(',') : raw ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  const ids = Array.from(new Set(list)).filter((id) => data.competencies.some((c) => c.id === id))
  return {
    chosen: ids.slice(0, SCORECARD_MAX).map((id) => data.competencies.find((c) => c.id === id) as Competency),
    tooMany: ids.length > SCORECARD_MAX,
  }
}

/** The shareable link for a scorecard. */
export function scorecardUrl(role: string, chosen: Competency[]): string {
  const q = new URLSearchParams()
  if (role) q.set('role', role)
  if (chosen.length) q.set('c', chosen.map((c) => c.id).join(','))
  const qs = q.toString()
  return `${SCORECARD_SITE}${SCORECARD_PATH}${qs ? `?${qs}` : ''}`
}

/** The heading a scorecard carries everywhere. */
export function scorecardTitle(role: string): string {
  return role ? `${role}: interview scorecard` : 'Interview scorecard'
}

/** A safe file name: "interview-scorecard-account-executive.pdf". */
export function scorecardFileName(role: string, ext: 'pdf' | 'xlsx'): string {
  const slug = role
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  // Cut long titles at a word break, never mid-word.
  const short = slug.length <= 40 ? slug : slug.slice(0, 41).replace(/-[^-]*$/, '')
  return `interview-scorecard${short ? `-${short}` : ''}.${ext}`
}
