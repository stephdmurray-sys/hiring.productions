/**
 * The stack builder's data: every tool a visitor can click into a job
 * search or hiring stack, with what it costs, built only from what is on
 * file (resume-guide.json plans, the ATS scorecard prices, the short lists).
 *
 * Resume tools carry the cheapest way to pay for 1 to 12 months and what the
 * first year costs if you then forget to cancel, worked out here on the
 * server, so the page does no pricing math of its own. Applicant tracking
 * systems carry their cheapest published plan, and the page multiplies by
 * seats. Anything without a published price on file says so and is never
 * added to a total. RepVera is listed, linked to repvera.com and never scored.
 */
import { cheapestCover, forgetCost, plansFor, resumeTools, atsScores, hiringPick, type ToolEvidence } from '@/lib/evidence'
import recData from '@/lib/evidence/recommend.json'
import ats from '@/lib/scorecards/ats-small-teams.json'
import { FRAUD_TOOLS, PORTFOLIO_PICKS } from '@/lib/evidence/shortlists'
import { freeOnly, trapHref, trapTools } from '@/lib/pricing-traps'
import { repveraLink } from '@/lib/repvera'
import { keepLast } from '@/lib/site-line'

export type Lane = 'seekers' | 'hiring'

export interface StackTool {
  id: string
  name: string
  domain: string
  /** Our page for it (a review, a guide) or, for RepVera and our own free tools, where it lives. */
  href: string
  hrefLabel: string
  /** The overall score out of 5, when it has one. */
  score: number | null
  /** A short tag under the name: a rank, "On this site", "Built by Stephanie, never scored". */
  tag: string
  /** full: a free version you can keep using. limited: free with limits. none: paid only. site: free on hiring.productions. unknown: no price on file. */
  free: 'full' | 'limited' | 'none' | 'site' | 'unknown'
  /** What the free version gets you, in the tool's own terms from our review. */
  freeLine: string
  /**
   * Resume tools: the cheapest way to pay for m months (index m - 1), the first year if you then forget to cancel,
   * and how many days that payment covers before it renews (null: paid once, never renews).
   */
  paid?: { cost: number[]; forget: number[]; steps: string[][]; renewsAfter: (number | null)[] }
  /** Applicant tracking systems: the cheapest published plan. */
  plan?: { amount: number; per: 'user-month' | 'month' | 'year'; currency: string; note: string; maxEmployees?: number; freeTier?: string }
  quote?: boolean
  renews4w?: boolean
  trap?: string
  /** The slots this tool also does, so one tool can fill several and is paid for once. */
  covers: string[]
  /** RepVera, portfolio sites and vendors we link out to. */
  external?: boolean
}

export interface StackSlot {
  id: string
  title: string
  why: string
  options: string[]
}

export interface StackLane {
  lane: Lane
  slots: StackSlot[]
  tools: Record<string, StackTool>
  /** One-click starting points. */
  starters: { id: string; label: string; picks: Record<string, string>; paid: string[] }[]
  /** Applicant tracking: seat and company size choices, from the picker's own options. */
  seats?: { label: string; value: number }[]
  employees?: { label: string; value: number }[]
  /** Hires a year, for the cost per hire line: the visitor's own number. */
  hires?: number[]
}

const caps = (recData.seekers as unknown as { capabilities: Record<string, string[]> }).capabilities

function seekerTool(t: ToolEvidence, traps: Set<string>): StackTool {
  const covers = (['resume', 'check', 'track'] as const).filter((slot) => caps[slot === 'resume' ? 'builder' : slot === 'check' ? 'checker' : 'tracker']?.includes(t.id))
  const months = Array.from({ length: 12 }, (_, i) => (i + 1) * 30)
  const covered = months.map((d) => cheapestCover(t.id, d))
  return {
    id: t.id,
    name: t.name,
    domain: t.domain,
    href: `/reviews/${t.id}`,
    hrefLabel: `Is ${t.name} worth it?`,
    score: t.overall,
    tag: t.overall !== null && t.rank !== null ? `#${t.rank} ${t.segment === 'checker' ? 'checker' : 'builder'}` : 'Not scored yet',
    free: t.freeLevel,
    freeLine: t.freeLevel === 'none' ? keepLast(t.freeAnswer) : keepLast(freeOnly(t.freeAnswer)),
    paid: covered[0]
      ? {
          cost: covered.map((c) => c!.total),
          forget: months.map((d) => forgetCost(t.id, d)!),
          steps: covered.map((c) => c!.steps),
          renewsAfter: covered.map((c) => {
            const plans = plansFor(t.id)
            const bought = c!.steps.map((label) => plans.find((p) => p.label === label)!)
            return bought.some((p) => p.once) ? null : bought.reduce((a, p) => a + p.days, 0)
          }),
        }
      : undefined,
    renews4w: !!t.yearCost?.renewsEvery4Weeks,
    trap: traps.has(t.id) ? trapHref(t.id) : undefined,
    covers,
  }
}

export function seekerLane(): StackLane {
  const all = resumeTools().all
  const traps = new Set(trapTools().map((t) => t.id))
  const tools: Record<string, StackTool> = {}
  for (const t of all) tools[t.id] = seekerTool(t, traps)
  const byScore = (ids: string[]) => [...ids].sort((a, b) => (tools[b].score ?? 0) - (tools[a].score ?? 0))
  tools['repvera'] = {
    id: 'repvera',
    name: 'RepVera',
    domain: 'repvera.com',
    href: repveraLink('stack_builder'),
    hrefLabel: 'See RepVera',
    score: null,
    tag: 'Built by Stephanie, never scored',
    free: 'unknown',
    freeLine: keepLast('Receipts from people who have worked with you, each one verified through a work email.'),
    covers: ['proof'],
    external: true,
  }
  for (const p of PORTFOLIO_PICKS) {
    tools[p.go!] = {
      id: p.go!,
      name: p.name,
      domain: p.domain,
      href: '/guides/portfolio-sites',
      hrefLabel: 'Portfolio sites to know',
      score: null,
      tag: p.kind ?? 'Portfolio',
      free: 'unknown',
      freeLine: keepLast(p.line),
      covers: ['proof'],
      external: true,
    }
  }
  tools['practice'] = {
    id: 'practice',
    name: 'Interview practice',
    domain: 'hiring.productions',
    href: '/interview-practice',
    hrefLabel: 'Start practicing',
    score: null,
    tag: 'Free on this site',
    free: 'site',
    freeLine: keepLast('The questions structured interviews use, the follow-ups you will hear, and what a strong answer shows.'),
    covers: ['practice'],
  }
  const ids = all.map((t) => t.id)
  const slots: StackSlot[] = [
    { id: 'resume', title: 'Build the resume', why: 'The one document every application starts with.', options: byScore(ids.filter((id) => tools[id].covers.includes('resume'))) },
    { id: 'check', title: 'Check it against each job post', why: 'Compare your resume with the posting before you send it.', options: byScore(ids.filter((id) => tools[id].covers.includes('check'))) },
    { id: 'track', title: 'Keep track of every application', why: 'Every job, contact and follow-up in one place.', options: byScore(ids.filter((id) => tools[id].covers.includes('track'))) },
    { id: 'proof', title: 'Show how you work before the interview', why: 'Receipts from people who have worked with you, or the work itself.', options: ['repvera', ...PORTFOLIO_PICKS.map((p) => p.go!)] },
    { id: 'practice', title: 'Practice the interview', why: 'Know the questions before they ask them.', options: ['practice'] },
  ]
  // Starting points: the top-rated tool in each slot on its paid plan, and the best free version in each.
  const top: Record<string, string> = {}
  const free: Record<string, string> = {}
  for (const s of slots.slice(0, 3)) {
    top[s.id] = s.options[0]
    free[s.id] = s.options.find((id) => tools[id].free === 'full') ?? s.options[0]
  }
  return {
    lane: 'seekers',
    slots,
    tools,
    starters: [
      { id: 'free', label: 'Start with the $0 stack', picks: { ...free, practice: 'practice' }, paid: [] },
      { id: 'top', label: 'Start with the top-rated tools, paid', picks: { ...top, practice: 'practice' }, paid: [...new Set(Object.values(top))].filter((id) => tools[id].paid) },
    ],
  }
}

type Price = { amount?: number; per?: 'user-month' | 'month' | 'year'; currency?: string; note?: string; maxEmployees?: number; free?: string; quote?: boolean }

const atsSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export function hiringLane(): StackLane {
  const prices = (recData.hiring as unknown as { prices: Record<string, Price> }).prices
  const capability = (recData.hiring as unknown as { capabilities: Record<string, Record<string, { what: string }>> }).capabilities
  const fraudBuiltIn = capability['fraud-detection'] ?? {}
  const tools: Record<string, StackTool> = {}
  const ranked = [...ats.tools].sort((a, b) => atsScores(b as never).overall - atsScores(a as never).overall)
  ranked.forEach((t, i) => {
    const p = prices[t.name] ?? { quote: true }
    const id = atsSlug(t.name)
    tools[id] = {
      id,
      name: t.name,
      domain: t.domain,
      href: `/reviews/ats/${id}`,
      hrefLabel: `Is ${t.name} worth it?`,
      score: atsScores(t as never).overall,
      tag: `#${i + 1} applicant tracking system`,
      free: p.free ? 'limited' : p.quote ? 'unknown' : 'none',
      freeLine: p.free ? keepLast(`Free plan: ${p.free}.`) : p.quote ? keepLast('Quote only: no published price.') : 'No free plan.',
      plan:
        p.amount !== undefined && p.per
          ? { amount: p.amount, per: p.per, currency: p.currency ?? 'USD', note: p.note ?? '', maxEmployees: p.maxEmployees, freeTier: p.free }
          : undefined,
      quote: !!p.quote,
      covers: fraudBuiltIn[t.name] ? ['ats', 'fraud'] : ['ats'],
    }
  })
  const site = (id: string, name: string, href: string, label: string, line: string, covers: string[]): StackTool => ({
    id,
    name,
    domain: 'hiring.productions',
    href,
    hrefLabel: label,
    score: null,
    tag: 'Free on this site',
    free: 'site',
    freeLine: keepLast(line),
    covers,
  })
  tools['scorecard'] = site('scorecard', 'Interview scorecard', '/interview-scorecard', 'Build a scorecard', 'The same questions for every candidate, with probes and a 1 to 5 scale, sent as a PDF and a spreadsheet.', ['interview'])
  tools['red-flags'] = site('red-flags', 'Fake candidate checklist', '/is-this-a-real-candidate', 'See the red flags', 'The FBI’s red flags for fake candidates, as a checklist for interviewers.', ['fraud'])
  tools['cost-per-hire'] = site('cost-per-hire', 'Cost per hire calculator', '/hiring-costs', 'Work out your number', 'Cost per hire the way SHRM counts it, next to SHRM’s 2025 medians.', ['cost'])
  const fraudVendors = FRAUD_TOOLS.sections.filter((s) => s.id !== 'worked-with' && s.id !== 'ats').flatMap((s) => s.tools).filter((x) => x.go)
  for (const f of fraudVendors) {
    tools[f.go!] = {
      id: f.go!,
      name: f.name,
      domain: f.domain,
      href: `/guides/hiring-fraud-tools`,
      hrefLabel: 'Fraud tools to know',
      score: null,
      tag: 'Short list, no score yet',
      free: 'unknown',
      freeLine: keepLast(f.line),
      covers: ['fraud'],
      external: true,
    }
  }
  tools[hiringPick.id] = {
    id: hiringPick.id,
    name: hiringPick.name,
    domain: hiringPick.domain,
    href: '/on-the-rise',
    hrefLabel: 'Why it’s her pick',
    score: null,
    tag: 'Stephanie’s pick',
    free: 'unknown',
    freeLine: keepLast(`${hiringPick.line} ${hiringPick.facts}.`),
    covers: ['source'],
    external: true,
  }
  tools['repvera'] = {
    id: 'repvera',
    name: 'RepVera',
    domain: 'repvera.com',
    href: repveraLink('stack_builder_hiring'),
    hrefLabel: 'See RepVera',
    score: null,
    tag: 'Built by Stephanie, never scored',
    free: 'unknown',
    freeLine: keepLast('Ask for a candidate’s RepVera with the resume: verified experiences of what someone is like to work with.'),
    covers: ['proof'],
    external: true,
  }
  const atsIds = ranked.map((t) => atsSlug(t.name))
  const slots: StackSlot[] = [
    { id: 'ats', title: 'Track every applicant in one place', why: 'Your applicant tracking system: postings, applicants and interview stages.', options: atsIds },
    { id: 'interview', title: 'Ask every candidate the same questions', why: 'A structured interview, so candidates are compared on the same things.', options: ['scorecard'] },
    { id: 'fraud', title: 'Catch fake candidates', why: 'Start with the FBI’s red flags, and add a tool if fake applicants keep getting through.', options: ['red-flags', ...fraudVendors.map((f) => f.go!)] },
    { id: 'source', title: 'Find people who aren’t applying', why: 'Go find the people who would fit, and reach out first.', options: [hiringPick.id] },
    { id: 'proof', title: 'See how they work before you interview', why: 'Hear from people who have worked with the candidate, early.', options: ['repvera'] },
    { id: 'cost', title: 'Know what each hire costs', why: 'The number your budget conversations start from.', options: ['cost-per-hire'] },
  ]
  const freeAts = atsIds.find((id) => tools[id].plan?.freeTier) ?? atsIds[0]
  const limits = recData.hiring.limits as { id: string; options: { label: string; value: number | null }[] }[]
  const opts = (id: string) => (limits.find((l) => l.id === id)?.options ?? []).filter((o) => o.value !== null) as { label: string; value: number }[]
  return {
    lane: 'hiring',
    slots,
    tools,
    starters: [
      { id: 'free', label: 'Start with the $0 stack', picks: { ats: freeAts, interview: 'scorecard', fraud: 'red-flags', cost: 'cost-per-hire' }, paid: [] },
      { id: 'top', label: 'Start with the top-rated system', picks: { ats: atsIds[0], interview: 'scorecard', fraud: 'red-flags', cost: 'cost-per-hire' }, paid: [atsIds[0]] },
    ],
    seats: opts('seats'),
    employees: opts('employees'),
    hires: [5, 10, 20, 50, 100],
  }
}
