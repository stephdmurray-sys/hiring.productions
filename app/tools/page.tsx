import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { NextStep } from '@/app/(rebrand)/_components/next-step'
import { FreeToolsMirror, freeToolsCss } from '@/app/(rebrand)/_components/free-tools'
import { JsonLd, graph, SITE } from '@/app/(rebrand)/_components/structured'
import { Dots, Zigzag, retroCss } from '@/app/(rebrand)/_components/retro'
import { FREE_TOOL_CARDS, freeToolCount } from '@/lib/free-tools'

/**
 * /tools: every free tool, both sides of the table, mirrored row by row.
 * Replaced the old Pro tools catalog on Nov 15, 2026 (this version charges
 * nothing). The list itself is lib/free-tools.ts.
 */

export default function ToolsPage() {
  const all = [...FREE_TOOL_CARDS.seekers, ...FREE_TOOL_CARDS.hiring]
  const ld = graph({
    '@type': 'ItemList',
    '@id': `${SITE}/tools#list`,
    name: 'Free tools for job seekers and hiring teams',
    itemListElement: all.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.title, url: `${SITE}${t.href}` })),
  })
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + retroCss + freeToolsCss + css }} />
      <JsonLd data={ld} />
      <SiteNav active="tools" />
      <header className="ph tl-hero">
        <div className="wrap">
          <p className="crumbs">
            <a href="/">Home</a> / Free tools
          </p>
          <p className="tl-sticker">{`${freeToolCount()} free tools`}</p>
          <h1 className="display">Free tools for both sides of the&nbsp;table</h1>
          <p className="dek">Every one is free, with no sign-up. Each row asks the same question from both sides, so pick your side and go.</p>
          <p className="tl-jump">
            <a className="btn" href="#for-job-seekers">
              I&rsquo;m a job seeker
            </a>
            <a className="btn" href="#for-hiring-teams">
              I&rsquo;m hiring
            </a>
          </p>
        </div>
      </header>

      <section className="wrap sec tl-sec" aria-label="Every free tool">
        <Dots className="tl-dots" />
        <Zigzag className="tl-zig" />
        <FreeToolsMirror />
      </section>

      <NextStep side="both" line="Not sure which one you need? Answer a few questions and get your best match." button="Help me choose" href="/what-should-i-use#questions" />
      <SiteFooter />
    </>
  )
}

const css = `
  .tl-sticker{display:inline-block;margin:6px 0 18px;padding:9px 14px 8px;font-weight:900;font-size:14px;line-height:1;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap;background:var(--coral);color:var(--ink) !important;border:3px solid var(--ink);border-radius:10px;box-shadow:4px 4px 0 var(--ink);transform:rotate(-4deg);}
  .tl-jump{display:flex;flex-wrap:wrap;gap:14px;margin-top:30px;}
  .tl-sec{position:relative;}
  .tl-dots{position:absolute;top:24px;right:2%;color:var(--lavender);}
  .tl-zig{position:absolute;bottom:40px;left:-10px;color:var(--coral);}
  @media(max-width:760px){.tl-dots,.tl-zig{display:none;}}
`
