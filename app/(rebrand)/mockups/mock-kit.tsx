/**
 * Shared pieces for the design-direction mockups (/mockups). These pages
 * are for the founder to choose a direction; they are not linked from the
 * site and are marked noindex.
 */
import ats from '@/lib/scorecards/ats-small-teams.json'
import { benchmarks, guide, resumeTools, risingPick, videos } from '@/lib/evidence'

export const PUBLISHER_DOMAINS: Record<string, string> = {
  Zapier: 'zapier.com',
  Geekflare: 'geekflare.com',
  'Fast Company': 'fastcompany.com',
  SkillScouter: 'skillscouter.com',
  'Forbes Vetted': 'forbes.com',
  'Forbes Advisor': 'forbes.com',
  TechRadar: 'techradar.com',
  'The Muse': 'themuse.com',
  Money: 'money.com',
  MakeUseOf: 'makeuseof.com',
  FlexJobs: 'flexjobs.com',
  Monster: 'monster.com',
  Indeed: 'indeed.com',
}

/**
 * A logo tile. The real logo loads in the visitor's browser; underneath it
 * sits a lettermark so the tile still reads if an image is blocked.
 */
export function Logo({ domain, name, size = 44, round = false }: { domain: string; name: string; size?: number; round?: boolean }) {
  return (
    <span
      className={`mlogo${round ? ' mlogo-round' : ''}`}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.42) }}
      title={name}
    >
      <span className="mlogo-letter" aria-hidden="true">
        {name.charAt(0)}
      </span>
      <img src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`} alt="" loading="lazy" />
    </span>
  )
}

export const logoCss = `
  .mlogo{position:relative;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;background:#fff;border:1px solid rgba(20,16,40,0.10);border-radius:10px;overflow:hidden;}
  .mlogo-round{border-radius:50%;}
  .mlogo-letter{font-weight:800;color:#3A3550;line-height:1;}
  .mlogo img{position:absolute;inset:16%;width:68%;height:68%;object-fit:contain;background:#fff;}
`

export function mockData() {
  const { all } = resumeTools()
  const byId = Object.fromEntries(all.map((t) => [t.id, t]))
  const atsByName = Object.fromEntries(ats.tools.map((t) => [t.name, t]))
  const counting = benchmarks.filter((l) => l.status === 'counts')
  const featured = videos.filter((v) => v.featured)
  return {
    all,
    byId,
    ats,
    atsByName,
    counting,
    benchmarks,
    featured,
    guide,
    rising: byId[risingPick.tool],
    risingPick,
    seekerPicks: [...guide.picks.map((p) => ({ t: byId[p.tool], label: p.label })), { t: byId[risingPick.tool], label: "Stephanie's up-and-coming pick" }],
    atsPicks: [
      { t: atsByName['Manatal'], label: 'Small teams pick', line: 'Serious features at $15 per user, with no recruiter required.' },
      { t: atsByName['Pinpoint'], label: 'Growing teams pick', line: 'Highest user scores of all 14 systems we rank.' },
      { t: atsByName['Ashby'], label: 'Scaling teams pick', line: 'What the strongest scaling recruiting teams run.' },
    ],
  }
}

export function money(n: number) {
  return n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}`
}

export const MOCK_LINES: Record<string, string> = {
  teal: 'Checker, builder and job tracker in one, on a free tier that is a real product.',
  kickresume: '$96 a year is the whole price, and students get six months free.',
  flowcv: 'The only builder here that hands you a clean PDF for nothing.',
}

export function MockBanner({ letter, name }: { letter: string; name: string }) {
  return (
    <div className="mock-banner">
      Mockup {letter}: {name}. <a href="/mockups">All three directions</a>
    </div>
  )
}

export const bannerCss = `
  .mock-banner{background:#FFF6D6;color:#5A4500;font-size:13.5px;text-align:center;padding:8px 16px;border-bottom:1px solid #F0DE9C;}
  .mock-banner a{color:#5A4500;font-weight:700;text-decoration:underline;}
`
