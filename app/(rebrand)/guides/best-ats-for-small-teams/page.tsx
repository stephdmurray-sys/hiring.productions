import type { Metadata } from 'next'
import { NextStep } from '@/app/(rebrand)/_components/next-step'
import { labelGoLinks } from '@/lib/money'
import { MockPage } from '@/app/(rebrand)/mock-page'
import { html } from '@/app/(rebrand)/_html/guide-ats'
import ats from '@/lib/scorecards/ats-small-teams.json'
import { atsLeaders, atsScores, type AtsTool } from '@/lib/evidence'
import { JsonLd, graph, atsRankingLd, atsToolsLd } from '@/app/(rebrand)/_components/structured'

export const metadata: Metadata = {
  alternates: { canonical: '/guides/best-ats-for-small-teams' },
  title: 'The Best Applicant Tracking Systems of 2026, Ranked by Team Size',
  description:
    'The best ATS for small, growing, and scaling teams, ranked by team size on public data: user ratings, popularity and whether the price is listed.',
}

/**
 * The approved page design lives in _html/guide-ats.ts, but every score on
 * it is rebuilt here from the data (atsScores), so the standings, the picks
 * and the review score rows can never drift from the homepage scoreboard.
 * Scores are public data only: users, market and value.
 */

const SEG_OF: Record<string, 'small' | 'growing' | 'scaling'> = {
  'Small teams pick': 'small',
  'Growing teams pick': 'growing',
  'Scaling teams pick': 'scaling',
}
const SEG_NAME: Record<string, string> = { small: 'Small teams', growing: 'Growing teams', scaling: 'Scaling teams' }

const byName = Object.fromEntries(ats.tools.map((t) => [t.name, t])) as Record<string, AtsTool>
const slugOf = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

function strip(s: string) {
  return s.replace(/<[^>]+>/g, '').replace(/&[a-z]+;|&#\d+;/g, '').replace(/[†*]/g, '').trim()
}

function rankIn(segment: string): AtsTool[] {
  return ats.tools.filter((t) => t.segment === segment).sort((a, b) => atsScores(b).overall - atsScores(a).overall)
}

function rebuildTables(src: string): string {
  return src.replace(/<div class="tscroll"><table>([\s\S]*?)<\/table>/g, (whole, inner: string) => {
    if (!inner.includes('Practitioner')) return whole
    const rows = inner.split('<tr>').slice(2)
    const parsed = rows
      .map((r) => {
        const cells = [...r.matchAll(/<td>([\s\S]*?)<\/td>/g)].map((m) => m[1])
        const name = strip(cells[1]?.match(/<b>([\s\S]*?)<\/b>/)?.[1] ?? '')
        return { name, cells, t: byName[name] }
      })
      .filter((r) => r.t)
      .sort((a, b) => atsScores(b.t).overall - atsScores(a.t).overall)
    const head =
      '<tr><th>#</th><th>Tool</th><th>Best for</th><th>Starting price</th><th>Free option</th><th>Review growth /yr</th><th>Popularity</th><th>Users</th><th>Value</th><th>Overall</th></tr>'
    const body = parsed
      .map((r, i) => {
        const s = atsScores(r.t)
        return `<tr id="ats-${slugOf(r.name)}"><td>${i + 1}</td><td>${r.cells[1].replace(/<b>([\s\S]*?)<\/b>/, `<a href="/reviews/ats/${slugOf(r.name)}" style="color:inherit;text-decoration:underline;text-underline-offset:3px;"><b>$1</b></a>`)}</td><td>${r.cells[2]}</td><td>${r.cells[3]}</td><td>${r.cells[4]}</td><td>${r.cells[5]}</td><td>${s.market.toFixed(2)}</td><td>${s.user.toFixed(2)}</td><td>${s.value.toFixed(2)}</td><td><span class="tscore">${s.overall.toFixed(2)}</span></td></tr>`
      })
      .join('\n      ')
    return `<div class="tscroll"><table>\n      ${head}\n      ${body}\n    </table>`
  })
}

function rebuildPicks(src: string): string {
  const leaders = atsLeaders()
  return src.replace(
    /<div class="pick winner">\s*<span class="pick-flag">((?:Small|Growing|Scaling) teams pick)<\/span>[\s\S]*?<\/a>\s*<\/div>/g,
    (whole, flag: string) => {
      const leader = byName[leaders[SEG_OF[flag]]]
      if (!leader || whole.includes(`<span class="pick-name">${leader.name}</span>`)) return whole
      const s = atsScores(leader)
      return `<div class="pick winner">
        <span class="pick-flag">${flag}</span>
        <div class="pick-id">
          <span class="favicon"><img src="https://www.google.com/s2/favicons?domain=${leader.domain}&sz=64" width="22" height="22" alt=""></span>
          <span class="pick-name">${leader.name}</span>
        </div>
        <p class="pick-best">Top score for ${SEG_NAME[SEG_OF[flag]].toLowerCase()} on the data: users ${s.user.toFixed(2)}, and a published price (${leader.sources.pricing}).</p>
        <a href="/go/${slugOf(leader.name)}" class="visit">Visit ${leader.name} &#8599;</a>
      </div>`
    },
  )
}

function rebuildReviews(src: string): string {
  return src.replace(/<div class="review">[\s\S]*?<div class="verdict">/g, (block) => {
    const name = strip(block.match(/<span class="review-name">([\s\S]*?)<\/span>/)?.[1] ?? '')
    const t = byName[name]
    if (!t) return block
    const s = atsScores(t)
    const rank = rankIn(t.segment).findIndex((x) => x.name === t.name) + 1
    return block
      .replace(/<span class="review-rank">#\d+ &middot; ([^<]+)<\/span>/, `<span class="review-rank">#${rank} &middot; $1</span>`)
      .replace(/<span class="sc"><span class="st">[^<]*<\/span> <b>[\d.]+<\/b> Market<\/span>/, `<span class="sc"><b>${s.market.toFixed(2)}</b> Popularity</span>`)
      .replace(/<span class="sc"><span class="st">[^<]*<\/span> <b>[\d.]+<\/b> User<\/span>/, `<span class="sc"><b>${s.user.toFixed(2)}</b> Users</span>`)
      .replace(/<span class="sc"><span class="st">[^<]*<\/span> <b>[\d.]+<\/b> Practitioner<\/span>/, `<span class="sc"><b>${s.value.toFixed(2)}</b> Value</span><span class="sc"><b>${s.overall.toFixed(2)}</b> Overall</span>`)
  })
}

function rebuildFootnote(src: string): string {
  // One short line under the tables; the method lives on How we review.
  return src.replace(
    /<p style="text-align:center;color:var\(--gray-lt\);font-size:12px;line-height:1.6;margin-top:16px;">Data as of August 22, 2026, next check December 2026\.[\s\S]*?<\/p>/,
    '<p style="text-align:center;color:var(--gray-lt);font-size:12px;line-height:1.6;margin-top:16px;">Data as of August 22, 2026, next check December 2026. Ranked within each team size. <a href="/how-we-review" style="color:var(--purple);font-weight:600;">How scores work</a></p>',
  ).replace(
    'Market and User scores are computed from sourced public data',
    'Every score is computed from sourced public data',
  ).replace(
    '*Practitioner and Overall scores are in final review.',
    'Overall blends user ratings (50%), popularity (about 31%) and value (about 19%; a listed price scores higher than quote-only). We don&rsquo;t track independent ATS best-of lists yet, so those three share that weight. No one&rsquo;s opinion goes into a score.',
  )
}

/** Each team-size tier gets an anchor, so links can land on the right standings. */
function tierAnchors(src: string): string {
  return src
    .replace(';">Small teams: under 20 hires a year</h3>', ';" id="tier-small">Small teams: under 20 hires a year</h3>')
    .replace(';">Growing teams: 20 to 50 hires a year</h3>', ';" id="tier-growing">Growing teams: 20 to 50 hires a year</h3>')
    .replace(';">Scaling teams: 50+ hires a year</h3>', ';" id="tier-scaling">Scaling teams: 50+ hires a year</h3>')
}

/** Videos play inline on this page: no related videos from other channels, no redirect. */
function inlineVideos(src: string): string {
  return src.replace(
    /<iframe src="https:\/\/www\.youtube-nocookie\.com\/embed\/([A-Za-z0-9_-]{11})"([^>]*)><\/iframe>/g,
    (_m, id: string, rest: string) =>
      `<iframe src="https://www.youtube-nocookie.com/embed/${id}?rel=0&playsinline=1&modestbranding=1"${rest.replace(' allowfullscreen', '')} allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
  )
}

export default function Page() {
  const out = tierAnchors(inlineVideos(rebuildFootnote(rebuildReviews(rebuildPicks(rebuildTables(html))))))
  return (
    <>
      <JsonLd data={graph(atsRankingLd(), ...atsToolsLd())} />
      <MockPage html={labelGoLinks(out)} active="hiring" after={<NextStep side="hiring" line="Still deciding? Answer a few questions about your team and get your best match." button="Help me choose" href="/what-should-i-use?side=hiring#questions" />} />
    </>
  )
}
