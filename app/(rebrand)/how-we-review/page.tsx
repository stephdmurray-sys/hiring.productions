import type { Metadata } from 'next'
import { MockPage } from '@/app/(rebrand)/mock-page'
import { html } from '@/app/(rebrand)/_html/how-we-review'
import { discovery } from '@/lib/evidence'

export const metadata: Metadata = {
  alternates: { canonical: '/how-we-review' },
  title: 'How We Review',
  description: 'Three scores, three sources, refreshed on a schedule. Exactly how our hiring software reviews work, and how a tool gets on our radar.',
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
        <p style="margin-top:20px">Getting checked is not the same as getting ranked. Discovery puts a tool in the queue; only citable reviews, market data and a recruiter&rsquo;s read move a score. Know a tool we missed? <a href="mailto:hello@hiring.productions?subject=A%20tool%20you%20missed" style="text-decoration:underline;text-underline-offset:3px;font-weight:700;color:#5432E0">Tell us</a>.</p>
      </section>
`
}

export default function Page() {
  const withRadar = html.replace('<section id="refresh">', `${radarSection()}\n      <section id="refresh">`)
  return <MockPage html={withRadar} active="review" />
}
