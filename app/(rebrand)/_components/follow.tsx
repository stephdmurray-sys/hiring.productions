import Image from 'next/image'
import followData from '@/lib/evidence/follow.json'

/**
 * Who to follow, set like a cast list: one row of compact cards per
 * audience, five across on wide screens, each with the person's face in a
 * circle in the corner. Stephanie's editorial list: never scored,
 * never paid for, no follower counts. Photos are each person's own public
 * profile picture, saved locally (see follow.json); without a confirmed photo
 * the card shows initials in the side's color.
 */

type Side = 'seekers' | 'hiring'
type Vibe = 'funny' | 'helpful' | 'both'
interface Person {
  id: string
  name: string
  known: string
  side: Side
  vibe: Vibe
  why: string
  photo: string | null
  /** A plain disclosure shown on the card, e.g. who they work for when we rate that company. */
  note?: string
  links: { label: string; url: string }[]
}
interface Row {
  side: Side
  title: string
  lead: string
}

const people = followData.people as Person[]
const rows = followData.rows as Row[]
export const followApproved = followData.approved

const VIBE: Record<Vibe, string> = { funny: 'Funny', helpful: 'Seriously helpful', both: 'Funny and useful' }

export const followCss = `
  .cast-row + .cast-row{margin-top:64px;}
  .cast-head{display:flex;align-items:baseline;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-top:40px;padding-bottom:14px;border-bottom:3px solid var(--indigo);}
  .cast-row.hiring .cast-head{border-bottom-color:var(--coral);}
  .cast-head h3{display:flex;align-items:center;flex-wrap:wrap;gap:14px;font-size:clamp(24px,2.6vw,30px);font-weight:900;letter-spacing:-0.02em;}
  .cast-head p{font-size:16px;color:var(--ink-2);}
  .cast-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:16px;margin-top:24px;}
  .cast-card{display:flex;flex-direction:column;gap:4px;background:var(--surface);border:1px solid var(--rule);border-radius:var(--r-lg);padding:16px 16px 14px;}
  .cast-top{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:8px;}
  .cast-face{position:relative;flex:0 0 auto;width:56px;height:56px;border-radius:50%;overflow:hidden;background:var(--indigo);box-shadow:0 0 0 2px var(--surface),0 0 0 4px var(--indigo);}
  .cast-row.hiring .cast-face{background:var(--coral);box-shadow:0 0 0 2px var(--surface),0 0 0 4px var(--coral);}
  .cast-face img{object-fit:cover;object-position:50% 25%;}
  .cast-initials{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:20px;color:#fff;}
  .cast-row.hiring .cast-initials{color:var(--coral-deep);}
  .cast-vibe{font-size:12px;font-weight:800;line-height:1.3;text-align:right;color:var(--indigo-text);}
  .cast-vibe.funny,.cast-vibe.both{color:var(--coral-text);}
  .cast-card h4{font-size:17px;font-weight:900;letter-spacing:-0.01em;line-height:1.2;}
  .cast-known{font-size:13px;font-weight:700;color:var(--ink-3);line-height:1.35;}
  .cast-why{font-size:14px;color:var(--ink-2);line-height:1.45;margin-top:4px;}
  .cast-note{font-size:12.5px;color:var(--ink-3);line-height:1.4;margin-top:4px;}
  .cast-links{display:flex;flex-wrap:wrap;gap:2px 12px;margin-top:auto;padding-top:10px;font-size:13px;}
  .cast-links a{font-weight:800;color:var(--ink);text-decoration:underline;text-decoration-color:var(--rule-2);text-underline-offset:3px;white-space:nowrap;}
  .cast-links a:hover{text-decoration-color:var(--ink);}
  .follow-note{font-size:14.5px;color:var(--ink-3);margin-top:28px;max-width:860px;}
  .follow-note a{color:var(--indigo-text);font-weight:700;text-decoration:underline;text-underline-offset:3px;}
  @media(max-width:1180px){.cast-grid{grid-template-columns:repeat(4,minmax(0,1fr));}}
  @media(max-width:940px){.cast-grid{grid-template-columns:repeat(3,minmax(0,1fr));}}
  @media(max-width:700px){.cast-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;}.cast-card{padding:14px 14px 12px;}}
  @media(max-width:440px){.cast-grid{grid-template-columns:1fr;}}
`

function initials(name: string) {
  const parts = name.replace(/ and .*/, '').replace(/[^A-Za-z .']/g, '').split(/\s+/)
  return (parts[0][0] + (parts[parts.length - 1]?.[0] ?? '')).toUpperCase()
}

function Card({ p }: { p: Person }) {
  return (
    <article className="cast-card">
      <div className="cast-top">
        <span className="cast-face">
          {p.photo ? (
            <Image src={p.photo} alt={p.name} fill sizes="56px" />
          ) : (
            <span className="cast-initials" aria-hidden="true">
              {initials(p.name)}
            </span>
          )}
        </span>
        <span className={`cast-vibe ${p.vibe}`}>{VIBE[p.vibe]}</span>
      </div>
      <h4>{p.name}</h4>
      <span className="cast-known">{p.known}</span>
      <p className="cast-why">{p.why}</p>
      {p.note && <p className="cast-note">{p.note}</p>}
      <span className="cast-links">
        {p.links.map((l) => (
          <a key={l.url} href={l.url} target="_blank" rel="noopener" aria-label={`${p.name} on ${l.label}`}>
            {l.label} &#8599;
          </a>
        ))}
      </span>
    </article>
  )
}

export function WhoToFollow({ side }: { side?: Side }) {
  return (
    <>
      {rows
        .filter((r) => !side || r.side === side)
        .map((r) => (
          <div className={`cast-row ${r.side}`} key={r.side}>
            <div className="cast-head">
              <h3>
                <span className={`pill pill-${r.side}`}>{r.side === 'seekers' ? 'For job seekers' : 'For hiring teams'}</span>
                {r.title}
              </h3>
              <p>{r.lead}</p>
            </div>
            <div className="cast-grid">
              {people
                .filter((p) => p.side === r.side)
                .map((p) => (
                  <Card p={p} key={p.id} />
                ))}
            </div>
          </div>
        ))}
      <p className="follow-note">
        Stephanie picks these people because they&rsquo;re useful or funny. Nobody paid to be here, and follower counts don&rsquo;t matter. Following someone
        doesn&rsquo;t change any tool&rsquo;s score. Know someone who belongs here?{' '}
        <a href="mailto:hello@hiring.productions?subject=Who%20to%20follow">Tell us</a>.
      </p>
    </>
  )
}
