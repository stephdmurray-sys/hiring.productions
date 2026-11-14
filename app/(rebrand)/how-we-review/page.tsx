import type { Metadata } from 'next'
import { MockPage } from '@/app/(rebrand)/mock-page'
import { html } from '@/app/(rebrand)/_html/how-we-review'
import { atsScores, discovery, framework } from '@/lib/evidence'
import ats from '@/lib/scorecards/ats-small-teams.json'
import { recFramework } from '@/lib/evidence/recommend'

export const metadata: Metadata = {
  alternates: { canonical: '/how-we-review' },
  title: 'How We Review',
  description: 'Four scores, all from public data, checked every month. Exactly how our reviews work, why no one’s opinion goes into a score, and how we find new tools.',
}

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

/** The research behind the framework, and where Stephanie's judgment comes in (framework.json). */
function researchSections() {
  const rows = framework.research
    .map(
      (r) =>
        `<tr><td><b>${esc(r.finding)}</b><br><a href="${esc(r.url)}" rel="nofollow noopener" target="_blank" style="font-size:12.5px;color:#5432E0;text-decoration:underline;text-underline-offset:3px;">${esc(r.source)}</a></td><td>${esc(r.usedFor)}</td></tr>`,
    )
    .join('')
  const li = (xs: string[]) => xs.map((x) => `<li style="margin:0 0 8px 18px;">${esc(x)}</li>`).join('')
  return `
      <section id="research">
        <h2>The research behind it</h2>
        <p class="lead">We didn&rsquo;t invent a scoring system. We took what the most trusted review sites and researchers already do, kept the parts that hold up, and fixed the parts that let vendors in.</p>
        <table>
          <tr><th>What the research shows</th><th>How we use it</th></tr>
          ${rows}
        </table>
        <p class="callout"><b>What we can&rsquo;t do yet.</b> ${framework.limits.map(esc).join(' ')}</p>
      </section>

      <section id="judgment">
        <h2>Where Stephanie&rsquo;s judgment comes in</h2>
        <p class="lead">Twenty years in talent is worth a lot. It&rsquo;s worth the most where it&rsquo;s labeled and kept away from the numbers.</p>
        <style>@media(min-width:761px){#judgment .score-cards{grid-template-columns:repeat(2,minmax(0,1fr));}}</style>
        <div class="score-cards">
          <div class="scard"><h3>What she does</h3><ul style="list-style:disc;margin-top:10px;">${li(framework.judgment.does)}</ul></div>
          <div class="scard"><h3>What she never does</h3><ul style="list-style:disc;margin-top:10px;">${li(framework.judgment.never)}</ul></div>
        </div>
      </section>
`
}

/** How a recommendation is made, from lib/evidence/recommend.json, the same rules /what-should-i-use runs on. */
function recommendSection() {
  const rule = (r: string) => {
    const i = r.indexOf('. ')
    if (i !== -1) return `<tr><td><b>${esc(r.slice(0, i + 1))}</b></td><td>${esc(r.slice(i + 2))}</td></tr>`
    const c = r.indexOf(': ')
    if (c !== -1) return `<tr><td><b>${esc(r.slice(0, c))}.</b></td><td>${esc(r.charAt(c + 2).toUpperCase() + r.slice(c + 3))}</td></tr>`
    return `<tr><td colspan="2"><b>${esc(r)}</b></td></tr>`
  }
  const research = recFramework.research
    .map(
      (x) =>
        `<tr><td><b>${esc(x.title)}</b><br><a href="${esc(x.url)}" rel="nofollow noopener" target="_blank" style="font-size:12.5px;color:#5432E0;text-decoration:underline;text-underline-offset:3px;">${esc(x.source)}</a></td><td>${esc(x.finding)} ${esc(x.usedFor)}</td></tr>`,
    )
    .join('')
  return `
      <section id="recommend">
        <h2>How we pick a tool for you</h2>
        <p class="lead">${esc(recFramework.promise)} <a href="/what-should-i-use" style="text-decoration:underline;text-underline-offset:3px;font-weight:700;color:#5432E0">Try it</a>.</p>
        <table>
          <tr><th>The rule</th><th>What it means</th></tr>
          ${recFramework.rules.map(rule).join('')}
        </table>
        <table style="margin-top:24px">
          <tr><th>The research</th><th>What it shows, and how we use it</th></tr>
          ${research}
        </table>
      </section>
`
}

/** "How a tool gets on our radar", built from lib/evidence/discovery.json so the public page and /desk never disagree. */
function radarSection() {
  const rows = discovery.triggers
    .filter((t) => t.id !== 'editor-added')
    .map((t) => `<tr><td><b>${esc(t.label)}</b></td><td>${esc(t.note)}</td></tr>`)
    .join('')
  const followers = discovery.notSignals[0]
  return `
      <section id="radar">
        <h2>How we find new tools</h2>
        <p class="lead">A great tool shouldn&rsquo;t need a marketing budget to get noticed. If it shows up in any one of these places, we check it within a month: reviews counted, lists read, category recorded.</p>
        <table>
          <tr><th>If a tool is&hellip;</th><th>What happens</th></tr>
          ${rows}
        </table>
        <p class="callout"><b>Follower counts don&rsquo;t count.</b> ${esc(followers.why)}</p>
        <p style="margin-top:20px">Getting checked is not the same as getting ranked. Discovery puts a tool in the queue; only public data (user ratings, popularity, best-of lists and value) moves a score. Know a tool we missed? <a href="mailto:hello@hiring.productions?subject=A%20tool%20you%20missed" style="text-decoration:underline;text-underline-offset:3px;font-weight:700;color:#5432E0">Tell us</a>.</p>
      </section>
`
}

/** The sample review's rows: the same parts a real ATS review shows, from the live data. */
function sampleRatings(b: { user: number; market: number; value: number; overall: number }, asOf: string) {
  const row = (v: number, label: string, when: string) =>
    `<div class="rating"><span class="stars"><span class="stars-fill" style="width:${(v / 5) * 100}%"></span></span><b>${v.toFixed(v === b.value ? 1 : 2)}</b> ${label} <span class="when">${when}</span></div>`
  const d = new Date(asOf + 'T00:00:00Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
  return [
    row(b.user, 'User ratings', `checked ${d}`),
    row(b.market, 'Popularity', `checked ${d}`),
    row(b.value, 'Value', 'listed price and a free plan'),
    row(b.overall, 'Overall', 'ranked within small teams'),
  ].join('\n          ')
}

export default function Page() {
  const breezy = ats.tools.find((t) => t.name === 'Breezy HR')!
  const b = atsScores(breezy)
  const withRadar = html
    .replace('<section id="refresh">', `${radarSection()}\n      <section id="refresh">`)
    .replace('<section id="sources">', `${researchSections()}${recommendSection()}\n      <section id="sources">`)
    .replace('<a href="#scores" class="on">The four scores</a>', '<a href="#scores" class="on">The four scores</a><a href="#research">The research behind it</a><a href="#judgment">Where Stephanie comes in</a><a href="#recommend">How we pick a tool for you</a>')
    .replace('<!--SAMPLE_RATINGS-->', sampleRatings(b, breezy.sources.g2?.as_of ?? ats.as_of))
  return <MockPage html={withRadar} active="review" />
}
