import Image from 'next/image'
import followData from '@/lib/evidence/follow.json'

/**
 * Who to follow, set like a cast list: one row of cards per audience, each
 * card led by the person's face. Stephanie's editorial list: never scored,
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
  .cast-row + .cast-row{margin-top:72px;}
  .cast-head{display:flex;align-items:baseline;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-top:40px;padding-bottom:14px;border-bottom:3px solid var(--indigo);}
  .cast-row.hiring .cast-head{border-bottom-color:var(--coral);}
  .cast-head h3{display:flex;align-items:center;font-size:clamp(24px,2.6vw,30px);font-weight:900;letter-spacing:-0.02em;}
  .cast-head p{font-size:16px;color:var(--ink-2);}
  .cast-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;margin-top:28px;}
  .cast-card{display:flex;flex-direction:column;background:var(--surface);border:1px solid var(--rule);border-radius:var(--r-lg);overflow:hidden;}
  .cast-photo{position:relative;aspect-ratio:4/3;background:var(--indigo);overflow:hidden;}
  .cast-row.hiring .cast-photo{background:var(--coral);}
  .cast-photo img{object-fit:cover;object-position:50% 22%;}
  .cast-initials{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:64px;letter-spacing:-0.02em;color:#fff;}
  .cast-row.hiring .cast-initials{color:var(--coral-deep);}
  .cast-body{display:flex;flex-direction:column;gap:6px;padding:18px 20px 20px;flex:1;}
  .cast-vibe{font-size:13.5px;font-weight:800;color:var(--indigo-text);}
  .cast-vibe.funny,.cast-vibe.both{color:var(--coral-text);}
  .cast-body h4{font-size:21px;font-weight:900;letter-spacing:-0.01em;line-height:1.2;}
  .cast-known{font-size:14.5px;font-weight:700;color:var(--ink-3);}
  .cast-why{font-size:15px;color:var(--ink-2);line-height:1.5;margin-top:2px;}
  .cast-links{display:flex;flex-wrap:wrap;gap:4px 16px;margin-top:auto;padding-top:12px;font-size:14px;}
  .cast-links a{font-weight:800;color:var(--ink);text-decoration:underline;text-decoration-color:var(--rule-2);text-underline-offset:3px;}
  .cast-links a:hover{text-decoration-color:var(--ink);}
  .follow-note{font-size:14.5px;color:var(--ink-3);margin-top:28px;max-width:860px;}
  .follow-note a{color:var(--indigo-text);font-weight:700;text-decoration:underline;text-underline-offset:3px;}
  @media(max-width:1000px){.cast-grid{grid-template-columns:repeat(2,minmax(0,1fr));}}
  @media(max-width:620px){
    .cast-grid{grid-template-columns:1fr;gap:14px;}
    .cast-card{flex-direction:row;}
    .cast-photo{flex:0 0 112px;aspect-ratio:auto;min-height:150px;}
    .cast-initials{font-size:34px;}
    .cast-body{padding:14px 16px;}
    .cast-body h4{font-size:18px;}
  }
`

function initials(name: string) {
  const parts = name.replace(/ and .*/, '').replace(/[^A-Za-z .']/g, '').split(/\s+/)
  return (parts[0][0] + (parts[parts.length - 1]?.[0] ?? '')).toUpperCase()
}

function Card({ p }: { p: Person }) {
  return (
    <article className="cast-card">
      <div className="cast-photo">
        {p.photo ? (
          <Image src={p.photo} alt={p.name} fill sizes="(max-width: 620px) 112px, (max-width: 1000px) 50vw, 380px" />
        ) : (
          <span className="cast-initials" aria-hidden="true">
            {initials(p.name)}
          </span>
        )}
      </div>
      <div className="cast-body">
        <span className={`cast-vibe ${p.vibe}`}>{VIBE[p.vibe]}</span>
        <h4>{p.name}</h4>
        <span className="cast-known">{p.known}</span>
        <p className="cast-why">{p.why}</p>
        <span className="cast-links">
          {p.links.map((l) => (
            <a key={l.url} href={l.url} target="_blank" rel="noopener">
              {l.label} &#8599;
            </a>
          ))}
        </span>
      </div>
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
                <span className={r.side === 'seekers' ? 'dot-seekers' : 'dot-hiring'} />
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
        Stephanie&rsquo;s picks: never paid for, and chosen for being funny or genuinely useful, not for follower counts. Following someone
        doesn&rsquo;t change any tool&rsquo;s score. Know someone who belongs here?{' '}
        <a href="mailto:hello@hiring.productions?subject=Who%20to%20follow">Tell us</a>.
      </p>
    </>
  )
}
