import followData from '@/lib/evidence/follow.json'

/**
 * Who to follow. Stephanie's editorial list: never scored, never paid for,
 * no follower counts. Set as two ruled lists (job seekers, hiring teams);
 * "both" people appear on both sides.
 */

type Side = 'seekers' | 'hiring' | 'both'
type Vibe = 'funny' | 'helpful' | 'both'
interface Person {
  name: string
  known: string
  side: Side
  vibe: Vibe
  why: string
  links: { label: string; url: string }[]
}

const people = followData.people as Person[]
export const followApproved = followData.approved

const VIBE: Record<Vibe, string> = { funny: 'Funny', helpful: 'Seriously helpful', both: 'Funny and useful' }

export const followCss = `
  .follow{display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-top:40px;}
  .follow.single{grid-template-columns:1fr;max-width:820px;}
  .follow-col h3{display:flex;align-items:center;gap:10px;font-size:22px;font-weight:900;letter-spacing:-0.01em;padding-bottom:12px;border-bottom:3px solid var(--indigo);}
  .follow-col.hiring h3{border-bottom-color:var(--coral);}
  .fp{display:grid;grid-template-columns:44px minmax(0,1fr);gap:14px;padding:18px 0;border-bottom:1px solid var(--rule);}
  .fp-mark{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:17px;color:#fff;background:var(--indigo);}
  .follow-col.hiring .fp-mark{background:var(--coral);color:var(--coral-deep);}
  .fp-mark.funny{background:var(--ink);color:#FFE15C;}
  .fp-name{font-size:18px;font-weight:800;line-height:1.25;}
  .fp-name span{font-weight:400;color:var(--ink-3);font-size:15px;}
  .fp-vibe{font-size:13.5px;font-weight:800;color:var(--indigo-text);}
  .fp-vibe.funny,.fp-vibe.both{color:var(--coral-text);}
  .fp p{font-size:15.5px;color:var(--ink-2);margin-top:4px;line-height:1.5;}
  .fp-links{display:flex;flex-wrap:wrap;gap:4px 16px;margin-top:8px;font-size:14px;}
  .fp-links a{font-weight:700;color:var(--ink);text-decoration:underline;text-decoration-color:var(--rule-2);text-underline-offset:3px;}
  .fp-links a:hover{text-decoration-color:var(--ink);}
  .follow-note{font-size:14.5px;color:var(--ink-3);margin-top:24px;max-width:860px;}
  .follow-note a{color:var(--indigo-text);font-weight:700;text-decoration:underline;text-underline-offset:3px;}
  @media(max-width:860px){.follow{grid-template-columns:1fr;gap:32px;}}
`

function initials(name: string) {
  const parts = name.replace(/ and .*/, '').split(/\s+/)
  return (parts[0][0] + (parts[1]?.[0] ?? '')).toUpperCase()
}

function Column({ side, title }: { side: 'seekers' | 'hiring'; title: string }) {
  const list = [...people.filter((p) => p.side === side), ...people.filter((p) => p.side === 'both')]
  return (
    <div className={`follow-col ${side}`}>
      <h3>
        <span className={side === 'seekers' ? 'dot-seekers' : 'dot-hiring'} />
        {title}
      </h3>
      {list.map((p) => (
        <div className="fp" key={p.name}>
          <span className={`fp-mark${p.vibe === 'funny' ? ' funny' : ''}`} aria-hidden="true">
            {initials(p.name)}
          </span>
          <div>
            <div className="fp-name">
              {p.name} <span>{p.known}</span>
            </div>
            <span className={`fp-vibe ${p.vibe}`}>{VIBE[p.vibe]}</span>
            <p>{p.why}</p>
            <span className="fp-links">
              {p.links.map((l) => (
                <a key={l.url} href={l.url} target="_blank" rel="noopener">
                  {l.label} &#8599;
                </a>
              ))}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export function WhoToFollow({ side }: { side?: 'seekers' | 'hiring' }) {
  return (
    <>
      <div className={`follow${side ? ' single' : ''}`}>
        {(!side || side === 'seekers') && <Column side="seekers" title="For job seekers" />}
        {(!side || side === 'hiring') && <Column side="hiring" title="For hiring teams" />}
      </div>
      <p className="follow-note">
        Stephanie&rsquo;s picks: never paid for, and chosen for being funny or genuinely useful, not for follower counts. Following someone
        doesn&rsquo;t change any tool&rsquo;s score. Know someone who belongs here?{' '}
        <a href="mailto:hello@hiring.productions?subject=Who%20to%20follow">Tell us</a>.
      </p>
    </>
  )
}
