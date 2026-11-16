'use client'

import { useMemo, useState } from 'react'

/**
 * The value proposition builder (Stephanie, Nov 15, 2026). The point is being
 * able to talk about yourself easily: "I'm known for..." It starts with what
 * other people say about working with you, so the line is theirs and saying it
 * doesn't feel like bragging. Out comes one line to say out loud, and how it
 * sounds at the moments people freeze ("Tell me about yourself", "What would
 * your last manager say about you?", "So, what do you do?").
 * The hiring version is the same idea for a team: "Our team is known for..."
 * Nothing here tells anyone what to put at the top of a resume.
 * Everything runs in the browser. Nothing typed is saved or sent anywhere.
 * Styles: value-prop-css.ts.
 */

type Side = 'seekers' | 'hiring'

const STOP = new Set(
  `a an the and or but nor so yet for of in on at by to from with without within into onto over under up down out off about above below across after before during since until while because though although if then than as is am are was were be been being do does did doing done have has had having will would could should can may might must shall it its it's this that these those there here where when what which who whom whose why how all any both each few more most other some such no not only own same too very just also even ever never always often really quite rather still already again once every much many lot lots one two three first last next new old i me my mine myself we us our ours you your yours he him his she her hers they them their theirs i'm i've i'd you're we're they're he's she's it’s let lets get gets got getting make makes made making go goes went going come came see saw seen know knew known think thought say said says tell told give gave take took put use used using want wanted need needed like liked work worked working works job jobs role roles team teams company companies people person someone something anyone everyone everything anything nothing time times year years day days way ways thing things part well good great best better able sure felt feel feels really truly definitely absolutely always`
    .split(/\s+/)
    .filter(Boolean),
)

/** Describing words people use about someone they've worked with. */
const STRENGTH = new Set(
  `calm clear creative reliable organized organised thoughtful strategic curious kind honest direct collaborative detailed patient positive fast dependable proactive resourceful empathetic generous trusted steady sharp funny humble driven responsive flexible adaptable innovative analytical supportive accountable consistent transparent candid prepared insightful passionate pragmatic decisive fair warm energetic focused rigorous meticulous inclusive approachable diplomatic resilient grounded`
    .split(/\s+/)
    .filter(Boolean),
)

/** Words for the kind of person someone is to work with ("a great listener"). */
const PERSON = new Set(`leader mentor communicator listener teammate partner connector coach advocate champion collaborator organizer planner thinker problem-solver`.split(/\s+/))

const isDescribing = (w: string) => STRENGTH.has(w) || /(ful|ive|ous|able|ible|ic|ent|ant)$/.test(w)

interface Found {
  word: string
  lines: number
}

/** The words that repeat across what people said, describing words first. Names are left out. */
function findWords(text: string): Found[] {
  const lines = text
    .split(/\n+|(?<=[.!?])\s+/)
    .map((l) => l.trim())
    .filter(Boolean)
  const stats = new Map<string, { lines: Set<number>; count: number; proper: number }>()
  lines.forEach((line, li) => {
    const tokens = line.match(/[A-Za-z][A-Za-z'’-]+/g) ?? []
    tokens.forEach((raw, ti) => {
      const w = raw.toLowerCase().replace(/’/g, "'").replace(/'s$/, '').replace(/-+$/, '')
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
    .map(([word, s]) => ({ word, lines: s.lines.size, score: s.lines.size * 3 + s.count + (isDescribing(word) || PERSON.has(word) ? 3 : 0) }))
    .sort((a, b) => b.score - a.score || a.word.localeCompare(b.word))
    .slice(0, 10)
    .map(({ word, lines }) => ({ word, lines }))
}

const SHRM_LINKEDIN = 'https://www.shrm.org/mena/topics-tools/news/organizational-employee-development/how-to-write-seo-enhanced-linkedin-profile'

const clean = (s: string) => s.trim().replace(/[.\s]+$/, '')
const article = (s: string) => (/^[aeiou]/i.test(s) ? 'an' : 'a')
const lowerFirst = (s: string) => (/^[A-Z][a-z]/.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s)
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const and = (w: string[]) => (w.length > 1 ? `${w.slice(0, -1).join(', ')} and ${w[w.length - 1]}` : (w[0] ?? ''))

/** Picked words as the end of "known for…": "being calm and organized", "being a great listener". */
function knownFrom(words: string[]): string {
  if (!words.length) return ''
  const parts = words.map((w) => (PERSON.has(w) ? `${article(w)} ${w}` : w))
  return words.every((w) => isDescribing(w) || PERSON.has(w)) ? `being ${and(parts)}` : and(parts)
}

const COPY: Record<
  Side,
  { said: [string, string]; empty: string; known: [string, string]; so: [string, string]; role: [string, string]; start: string; main: string }
> = {
  seekers: {
    said: ['What do people say it’s like to work with you?', 'Paste a few lines, one per line: LinkedIn recommendations, review comments, thank-you notes, your RepVera receipts.'],
    empty: 'Paste a few lines above, and the words people repeat show up here.',
    known: ['Finish the sentence: I’m known for…', 'being calm when plans change'],
    so: ['What changes because of it? Finish: …so', 'launches still land on time'],
    role: ['What do you do?', 'Marketing manager'],
    start: 'I’m known for',
    main: 'Say it out loud a few times, until it sounds like you.',
  },
  hiring: {
    said: ['What does your team say it’s like to work here?', 'Paste a few lines, one per line: team shout-outs, stay interview notes, what people wrote in reviews.'],
    empty: 'Paste a few lines above, and the words your team repeats show up here.',
    known: ['Finish the sentence: Our team is known for…', 'being supportive and flexible'],
    so: ['What does that mean for the person who joins? Finish: …so', 'you’re never stuck waiting on an answer'],
    role: ['What’s the role?', 'Senior data analyst'],
    start: 'Our team is known for',
    main: 'Say it the same way at every step, from the job post to the offer.',
  },
}

export function ValuePropBuilder({
  side,
  noWords,
  proof,
}: {
  side: Side
  noWords?: { text: string; href: string; label: string }
  /** Under the line: it's your word until receipts back it up. */
  proof?: { text: string; href: string; label: string }
}) {
  const c = COPY[side]
  const [said, setSaid] = useState('')
  const [picked, setPicked] = useState<string[] | null>(null)
  const [known, setKnown] = useState('')
  const [knownEdited, setKnownEdited] = useState(false)
  const [so, setSo] = useState('')
  const [role, setRole] = useState('')
  const [copied, setCopied] = useState<number | null>(null)

  const found = useMemo(() => findWords(said), [said])
  const words = (picked ?? found.slice(0, 2).map((f) => f.word)).filter((w) => found.some((f) => f.word === w))
  const knownValue = knownEdited ? known : knownFrom(words)

  const k = lowerFirst(clean(knownValue).replace(/^(i[’']m |our team is )?known for /i, '')) || '[what people say]'
  const s = lowerFirst(clean(so).replace(/^so,? /i, '')) || '[what changes because of it]'
  const r = lowerFirst(clean(role)) || (side === 'seekers' ? '[your job]' : '[the role]')
  const a = article(r)

  const mainLine = side === 'seekers' ? `I’m known for ${k}, so ${s}.` : `Our team is known for ${k}, so ${s}.`

  // The moments people freeze. Each says the same thing in the way that moment needs.
  const moments: { where: string; note: string; text: string; src?: { label: string; url: string } }[] =
    side === 'seekers'
      ? [
          { where: '“Tell me about yourself”', note: 'Then tell one time it happened.', text: `I’m ${a} ${r}. The people I’ve worked with know me for ${k}, so ${s}.` },
          { where: '“What would your last manager say about you?”', note: 'You’re repeating what they said, so it doesn’t feel like bragging.', text: `They’d say I’m known for ${k}. It’s why ${s}.` },
          { where: '“So, what do you do?”', note: 'For networking and coffee chats. Short on purpose.', text: `I’m ${a} ${r}, and I’m known for ${k}.` },
          {
            where: 'First line of your LinkedIn About or a cover letter',
            note: 'The About section is the place to be more personal.',
            text: `I’m ${a} ${r} known for ${k}, so ${s}.`,
            src: { label: 'SHRM', url: SHRM_LINKEDIN },
          },
        ]
      : [
          { where: '“What’s it like to work there?”', note: 'For the first call, or whenever a candidate asks.', text: `People here would tell you we’re known for ${k}, so ${s}.` },
          { where: '“Why should I take this job?”', note: 'Have it ready for the end of the interview.', text: `You’d join a team known for ${k}, so ${s}.` },
          { where: 'Your first message to a candidate', note: 'Lead with it.', text: `I’m hiring ${a} ${r}. Our team is known for ${k}, so ${s}. Open to a quick call?` },
          { where: 'First line of the job post', note: 'The first thing a candidate reads.', text: `As our ${r}, you’ll join a team known for ${k}, so ${s}.` },
        ]

  const toggle = (word: string) => {
    const cur = picked ?? found.slice(0, 2).map((f) => f.word)
    const next = cur.includes(word) ? cur.filter((x) => x !== word) : [...cur, word].slice(-2)
    setPicked(next)
    setKnownEdited(false)
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
          <span className="vp-q">{c.said[0]}</span>
          <textarea
            value={said}
            onChange={(e) => {
              setSaid(e.target.value)
              setPicked(null)
            }}
            placeholder={c.said[1]}
            rows={5}
            maxLength={4000}
          />
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
        <label className="vp-step">
          <span className="vp-n" aria-hidden="true">
            2
          </span>
          <span className="vp-q">{c.known[0]}</span>
          <span className="vp-lead-in">
            <span className="vp-lead-k">{c.start}</span>
            <input
              type="text"
              value={knownValue}
              onChange={(e) => {
                setKnown(e.target.value)
                setKnownEdited(true)
              }}
              placeholder={c.known[1]}
              maxLength={120}
            />
          </span>
          <span className="vp-hint">
            {knownEdited && words.length ? (
              <button type="button" className="vp-reset" onClick={() => setKnownEdited(false)}>
                Start over from their words
              </button>
            ) : (
              'Their words fill this in. Change anything until it sounds like you.'
            )}
          </span>
        </label>
        <label className="vp-step">
          <span className="vp-n" aria-hidden="true">
            3
          </span>
          <span className="vp-q">{c.so[0]}</span>
          <span className="vp-lead-in">
            <span className="vp-lead-k">so</span>
            <input type="text" value={so} onChange={(e) => setSo(e.target.value)} placeholder={c.so[1]} maxLength={110} />
          </span>
        </label>
        <label className="vp-step">
          <span className="vp-n" aria-hidden="true">
            4
          </span>
          <span className="vp-q">{c.role[0]}</span>
          <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder={c.role[1]} maxLength={60} />
        </label>
        <p className="vp-private">It runs in your browser. Nothing you type is saved or sent.</p>
      </div>

      <div className="vp-out">
        <div className="vp-main">
          <p className="vp-where">{side === 'seekers' ? 'Your line' : 'Your team’s line'}</p>
          <p className="vp-main-text">{mainLine}</p>
          <p className="vp-note">{c.main}</p>
          {proof && (
            <p className="vp-proof">
              {proof.text}{' '}
              <a className="tl" href={proof.href}>
                {proof.label} <span className="arr">&darr;</span>
              </a>
            </p>
          )}
          <button type="button" className="vp-copy" onClick={() => copy(-1, mainLine)}>
            {copied === -1 ? 'Copied' : 'Copy'}
          </button>
        </div>
        <p className="vp-out-k">{side === 'seekers' ? 'How it sounds when someone asks' : 'How it sounds at each step'}</p>
        <div className="vp-cards">
          {moments.map((o, i) => (
            <div className="vp-card" key={o.where}>
              <p className="vp-where">{o.where}</p>
              <p className="vp-text">{o.text}</p>
              <p className="vp-note">
                {o.note}
                {o.src && (
                  <>
                    {' '}
                    <a href={o.src.url} rel="nofollow noopener" target="_blank">
                      Source: {o.src.label}
                    </a>
                  </>
                )}
              </p>
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
