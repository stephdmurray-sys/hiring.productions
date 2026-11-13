import type { Metadata } from 'next'
import { MockPage } from '@/app/(rebrand)/mock-page'
import { html } from '@/app/(rebrand)/_html/how-we-review'
import { atsScores, discovery, framework } from '@/lib/evidence'
import ats from '@/lib/scorecards/ats-small-teams.json'

export const metadata: Metadata = {
  alternates: { canonical: '/how-we-review' },
  title: 'How We Review',
  description: 'Four scores, all public data, re-read every month. Exactly how our reviews work, why no personal opinion is an input, and how a tool gets on our radar.',
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

/** "How a tool gets on our radar", built from lib/evidence/discovery.json so the public page and /desk never disagree. */
function radarSection() {
  const rows = discovery.triggers
    .filter((t) => t.id !== 'editor-added')
    .map((t) => `<tr><td><b>${esc(t.label)}</b></td><td>${esc(t.note)}</td></tr>`)
    .join('')
  const followers = discovery.notSignals[0]
  return `
      <section id="radar">
        <h2>How a tool gets on our radar</h2>
        <p class="lead">A great tool shouldn&rsquo;t need a marketing budget to get noticed. If it shows up in any one of these places, we check it within a month: reviews counted, lists read, category recorded.</p>
        <table>
          <tr><th>If a tool is&hellip;</th><th>What happens</th></tr>
          ${rows}
        </table>
        <p class="callout"><b>Follower counts don&rsquo;t count.</b> ${esc(followers.why)}</p>
        <p style="margin-top:20px">Getting checked is not the same as getting ranked. Discovery puts a tool in the queue; only public data (users, market, critics and value) moves a score. Know a tool we missed? <a href="mailto:hello@hiring.productions?subject=A%20tool%20you%20missed" style="text-decoration:underline;text-underline-offset:3px;font-weight:700;color:#5432E0">Tell us</a>.</p>
      </section>
`
}

export default function Page() {
  const breezy = ats.tools.find((t) => t.name === 'Breezy HR')!
  const b = atsScores(breezy)
  const withRadar = html
    .replace('<section id="refresh">', `${radarSection()}\n      <section id="refresh">`)
    .replace('<section id="sources">', `${researchSections()}\n      <section id="sources">`)
    .replace('<a href="#scores" class="on">The four scores</a>', '<a href="#scores" class="on">The four scores</a><a href="#research">The research behind it</a><a href="#judgment">Where Stephanie comes in</a>')
    .replace(
      /<div class="rating"><span class="stars">[\s\S]*?Practitioner Score <span class="when">in final review<\/span><\/div>/,
      `<div class="rating"><span class="stars"><span class="stars-fill" style="width:${(b.value / 5) * 100}%"></span></span><b>${b.value.toFixed(1)}</b> Value Score <span class="when">published price and a free tier</span></div>`,
    )
  return <MockPage html={withRadar} active="review" />
}
