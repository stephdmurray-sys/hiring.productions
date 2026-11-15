'use client'

import { useMemo, useState } from 'react'

/**
 * The value proposition builder (Stephanie, Nov 15, 2026): what you do, what
 * changes because of you, and the words other people use about working with
 * you, turned into one line four ways. The job seeker version builds a
 * professional value proposition; the hiring version builds an employer value
 * proposition from what the team says about working there.
 * Everything runs in the browser. Nothing typed is saved or sent anywhere.
 * Styles: value-prop-css.ts.
 */

type Side = 'seekers' | 'hiring'

const STOP = new Set(
  `a an the and or but nor so yet for of in on at by to from with without within into onto over under up down out off about above below across after before during since until while because though although if then than as is am are was were be been being do does did doing done have has had having will would could should can may might must shall it its it's this that these those there here where when what which who whom whose why how all any both each few more most other some such no not only own same too very just also even ever never always often really quite rather still already again once every much many lot lots one two three first last next new old i me my mine myself we us our ours you your yours he him his she her hers they them their theirs i'm i've i'd you're we're they're he's she's it’s let lets get gets got getting make makes made making go goes went going come came see saw seen know knew known think thought say said says tell told give gave take took put use used using want wanted need needed like liked work worked working works job jobs role roles team teams company companies people person someone something anyone everyone everything anything nothing time times year years day days way ways thing things part well good great best better able sure felt feel feels really truly definitely absolutely always`
    .split(/\s+/)
    .filter(Boolean),
)

/** Words people use for strengths, nudged up when they show up. */
const STRENGTH = new Set(
  `calm clear creative reliable organized organised thoughtful strategic curious kind honest direct collaborative detailed patient positive leader mentor fast dependable proactive resourceful empathetic generous trusted steady sharp funny humble driven responsive flexible adaptable innovative analytical communicator listener supportive accountable consistent transparent candid prepared insightful passionate pragmatic decisive fair warm energetic focused rigorous meticulous inclusive approachable diplomatic resilient grounded`
    .split(/\s+/)
    .filter(Boolean),
)

interface Found {
  word: string
  lines: number
  count: number
}

/** The words that repeat across what people said, most repeated first. Names are left out. */
function findWords(text: string): Found[] {
  const lines = text
    .split(/\n+|(?<=[.!?])\s+/)
    .map((l) => l.trim())
    .filter(Boolean)
  const stats = new Map<string, { lines: Set<number>; count: number; proper: number }>()
  lines.forEach((line, li) => {
    const tokens = line.match(/[A-Za-z][A-Za-z'’-]+/g) ?? []
    tokens.forEach((raw, ti) => {
      let w = raw.toLowerCase().replace(/’/g, "'").replace(/'s$/, '').replace(/-+$/, '')
      if (w.length < 3 || STOP.has(w)) return
      const s = stats.get(w) ?? { lines: new Set<number>(), count: 0, proper: 0 }
      s.lines.add(li)
      s.count++
      if (ti > 0 && /^[A-Z]/.test(raw)) s.proper++
      stats.set(w, s)
    })
  })
  return [...stats.entries()]
    .filter(([, s]) => s.proper / s.count < 0.5)
    .map(([word, s]) => ({ word, lines: s.lines.size, count: s.count, score: s.lines.size * 3 + s.count + (STRENGTH.has(word) ? 2 : 0) }))
    .sort((a, b) => b.score - a.score || a.word.localeCompare(b.word))
    .slice(0, 10)
    .map(({ word, lines, count }) => ({ word, lines, count }))
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const clean = (s: string) => s.trim().replace(/[.\s]+$/, '')
const article = (s: string) => (/^[aeiou]/i.test(s) ? 'an' : 'a')
const lowerFirst = (s: string) => (/^[A-Z][a-z]/.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s)
const and = (w: string[]) => (w.length > 1 ? `${w.slice(0, -1).join(', ')} and ${w[w.length - 1]}` : w[0] ?? '')

const COPY: Record<Side, { role: [string, string]; change: [string, string]; said: [string, string]; empty: string }> = {
  seekers: {
    role: ['What do you do?', 'Marketing manager'],
    change: ['Finish the sentence: I’m a {role} who…', 'turns messy launches into pipeline'],
    said: ['What do people say it’s like to work with you?', 'Paste a few lines, one per line: LinkedIn recommendations, review comments, thank-you notes, your RepVera receipts.'],
    empty: 'Paste a few lines above, and the words people repeat show up here.',
  },
  hiring: {
    role: ['What’s the role?', 'Senior data analyst'],
    change: ['Finish the sentence: In this job, you’ll…', 'build our first forecasting model'],
    said: ['What does your team say it’s like to work here?', 'Paste a few lines, one per line: team shout-outs, stay interview notes, what people wrote in reviews.'],
    empty: 'Paste a few lines above, and the words your team repeats show up here.',
  },
}

export function ValuePropBuilder({ side, noWords }: { side: Side; noWords?: { text: string; href: string; label: string } }) {
  const c = COPY[side]
  const [role, setRole] = useState('')
  const [change, setChange] = useState('')
  const [said, setSaid] = useState('')
  const [picked, setPicked] = useState<string[] | null>(null)
  const [copied, setCopied] = useState<number | null>(null)

  const found = useMemo(() => findWords(said), [said])
  const words = (picked ?? found.slice(0, 2).map((f) => f.word)).filter((w) => found.some((f) => f.word === w))

  const r = clean(role) || (side === 'seekers' ? '[your job]' : '[the role]')
  const x = lowerFirst(clean(change)) || (side === 'seekers' ? '[what changes because of you]' : '[what they’ll do]')
  const w = words.length ? words : ['[their words]']
  const rl = lowerFirst(r)

  const outputs: { where: string; note: string; text: string }[] =
    side === 'seekers'
      ? [
          { where: 'Top of your resume', note: 'Right under your name, where the first read starts.', text: `${cap(r)} who ${x}. In colleagues’ words: ${w.join(', ')}.` },
          { where: 'LinkedIn headline', note: 'The line people see next to your name.', text: `${cap(r)} | ${cap(x)} | ${w.map(cap).join(' · ')}` },
          { where: '“Tell me about yourself”', note: 'Open with it, then give one example that proves it.', text: `I’m ${article(rl)} ${rl} who ${x}. The people I’ve worked with keep using the same words for me: ${and(w)}.` },
          { where: 'Cover letter or recruiter message', note: 'Make it the first line.', text: `I’m ${article(rl)} ${rl} who ${x}, and the people I’ve worked with describe me as ${and(w)}.` },
        ]
      : [
          { where: 'First line of the job post', note: 'The first thing a candidate reads.', text: `As our ${rl}, you’ll ${x}. Our team’s words for working here: ${w.join(', ')}.` },
          { where: 'Recruiter message', note: 'Lead with it in the first message.', text: `I’m hiring ${article(rl)} ${rl} to ${x}. Our team’s words for working here: ${w.join(', ')}. Open to a quick call?` },
          { where: '“Why should I take this job?”', note: 'Have it ready for the end of the interview.', text: `You’ll ${x}, with a team whose words for working here are ${and(w)}.` },
          { where: 'The offer call', note: 'Say it again when you make the offer.', text: `You’d join as our ${rl} to ${x}, on a team that describes working here as ${and(w)}.` },
        ]

  const toggle = (word: string) => {
    const cur = picked ?? found.slice(0, 2).map((f) => f.word)
    const next = cur.includes(word) ? cur.filter((x) => x !== word) : [...cur, word].slice(-2)
    setPicked(next)
  }

  const copy = async (i: number, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // Clipboard can be blocked; the text is on screen to copy by hand.
    }
    setCopied(i)
    window.setTimeout(() => setCopied((n) => (n === i ? null : n)), 1600)
  }

  return (
    <div className={`vp vp-${side}`}>
      <div className="vp-in">
        <label className="vp-step">
          <span className="vp-n" aria-hidden="true">
            1
          </span>
          <span className="vp-q">{c.role[0]}</span>
          <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder={c.role[1]} maxLength={60} autoComplete="organization-title" />
        </label>
        <label className="vp-step">
          <span className="vp-n" aria-hidden="true">
            2
          </span>
          <span className="vp-q">{c.change[0].replace('a {role}', clean(role) ? `${article(rl)} ${rl}` : 'a [your job]')}</span>
          <input type="text" value={change} onChange={(e) => setChange(e.target.value)} placeholder={c.change[1]} maxLength={110} />
        </label>
        <label className="vp-step">
          <span className="vp-n" aria-hidden="true">
            3
          </span>
          <span className="vp-q">{c.said[0]}</span>
          <textarea value={said} onChange={(e) => (setSaid(e.target.value), setPicked(null))} placeholder={c.said[1]} rows={5} maxLength={4000} />
        </label>
        <div className="vp-words" aria-live="polite">
          <p className="vp-k">{found.length ? 'The words they use most. Pick up to two.' : c.empty}</p>
          {found.length > 0 && (
            <div className="vp-chips">
              {found.map((f) => (
                <button type="button" key={f.word} className="vp-chip" aria-pressed={words.includes(f.word)} onClick={() => toggle(f.word)}>
                  {f.word}
                  {f.lines > 1 && <span className="vp-times">×{f.lines}</span>}
                </button>
              ))}
            </div>
          )}
          {!found.length && noWords && (
            <p className="vp-none">
              {noWords.text}{' '}
              <a className="tl" href={noWords.href}>
                {noWords.label}
              </a>
            </p>
          )}
        </div>
        <p className="vp-private">It runs in your browser. Nothing you type is saved or sent.</p>
      </div>

      <div className="vp-out">
        <p className="vp-out-k">Your line, four ways</p>
        <div className="vp-cards">
          {outputs.map((o, i) => (
            <div className="vp-card" key={o.where}>
              <p className="vp-where">{o.where}</p>
              <p className="vp-text">{o.text}</p>
              <p className="vp-note">{o.note}</p>
              <button type="button" className="vp-copy" onClick={() => copy(i, o.text)}>
                {copied === i ? 'Copied' : 'Copy'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
