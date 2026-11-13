import type { Metadata } from 'next'
import { MockPage } from '@/app/(rebrand)/mock-page'
import { html } from '@/app/(rebrand)/_html/how-we-review'
import { atsScores, discovery } from '@/lib/evidence'
import ats from '@/lib/scorecards/ats-small-teams.json'

export const metadata: Metadata = {
  alternates: { canonical: '/how-we-review' },
  title: 'How We Review',
  description: 'Four scores, all public data, re-read every month. Exactly how our reviews work, why no personal opinion is an input, and how a tool gets on our radar.',
}

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
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
    .replace(
      /<div class="rating"><span class="stars">[\s\S]*?Practitioner Score <span class="when">in final review<\/span><\/div>/,
      `<div class="rating"><span class="stars"><span class="stars-fill" style="width:${(b.value / 5) * 100}%"></span></span><b>${b.value.toFixed(1)}</b> Value Score <span class="when">published price and a free tier</span></div>`,
    )
  return <MockPage html={withRadar} active="review" />
}
