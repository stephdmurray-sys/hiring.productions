'use client'

import { useEffect, useState, type ReactNode } from 'react'

/**
 * Client pieces of the picker: counting starts, finishes and RepVera
 * visits (once per visit to each screen), the "Did this help you decide?"
 * question, and tracked links. Everything posts to /api/track, which keeps
 * no personal data. If the post fails, nothing on the page changes.
 */

type Payload = { event: string; side?: string; problem?: string; step?: string; answer?: string; text?: string }

function send(p: Payload) {
  try {
    const body = JSON.stringify(p)
    if (navigator.sendBeacon) navigator.sendBeacon('/api/track', new Blob([body], { type: 'application/json' }))
    else void fetch('/api/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true })
  } catch {
    // counting is never allowed to break the page
  }
}

/** Sends one event the first time this screen is seen in this browser tab. */
export function TrackOnce(p: Payload) {
  useEffect(() => {
    const key = `hp:${p.event}:${p.side ?? ''}:${p.problem ?? ''}`
    try {
      if (sessionStorage.getItem(key)) return
      sessionStorage.setItem(key, '1')
    } catch {
      // private mode: count anyway
    }
    send(p)
  }, [p.event, p.side, p.problem, p.step]) // eslint-disable-line react-hooks/exhaustive-deps
  return null
}

export function TrackedLink({ href, className, event, side, children }: { href: string; className?: string; event: string; side?: string; children: ReactNode }) {
  return (
    <a href={href} className={className} rel="noopener" onClick={() => send({ event, side })}>
      {children}
    </a>
  )
}

const CHOICES = [
  { id: 'yes', label: 'Yes' },
  { id: 'partly', label: 'Partly' },
  { id: 'no', label: 'No' },
] as const

export function PickerFeedback({ side, problem }: { side: string; problem: string }) {
  const [picked, setPicked] = useState<string | null>(null)
  return (
    <div className="rec-help" role="group" aria-labelledby={`help-${problem}`}>
      <p className="rec-help-q" id={`help-${problem}`}>
        Did this help you decide?
      </p>
      {picked ? (
        <p className="rec-help-done" role="status">
          Thanks for telling us.
        </p>
      ) : (
        <div className="rec-help-opts">
          {CHOICES.map((c) => (
            <button
              key={c.id}
              type="button"
              className="rec-help-btn"
              onClick={() => {
                setPicked(c.id)
                send({ event: 'picker_feedback', side, problem, answer: c.id })
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * For a page the picker can end on (the fraud short list): when the visitor
 * arrived from the picker (?from=picker), count the finish and ask "Did this
 * help you decide?". Anyone else sees nothing, and the page stays static.
 */
export function PickerArrival({ side, problem }: { side: string; problem: string }) {
  const [fromPicker, setFromPicker] = useState(false)
  useEffect(() => {
    try {
      setFromPicker(new URLSearchParams(window.location.search).get('from') === 'picker')
    } catch {
      // no picker question, nothing breaks
    }
  }, [])
  if (!fromPicker) return null
  return (
    <>
      <TrackOnce event="picker_finish" side={side} problem={problem} />
      <PickerFeedback side={side} problem={problem} />
    </>
  )
}

/**
 * "Not on the list? Tell us what you're dealing with": a few words, kept with no name, email or link, so
 * Stephanie can see what the picker doesn't cover yet (/admin). Hidden until the page is interactive.
 */
export function PickerSuggest({ side }: { side: string }) {
  const [ready, setReady] = useState(false)
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const [sent, setSent] = useState(false)
  useEffect(() => setReady(true), [])
  if (!ready) return null
  if (sent) return <p className="g-sug-done" role="status">Thanks. It helps us decide what to cover next.</p>
  if (!open)
    return (
      <button type="button" className="g-sug-open" onClick={() => setOpen(true)}>
        Not on the list? Tell us what you&rsquo;re dealing with
      </button>
    )
  return (
    <form
      className="g-sug"
      onSubmit={(e) => {
        e.preventDefault()
        if (text.trim().length < 3) return
        send({ event: 'picker_suggest', side, text: text.trim() })
        setSent(true)
      }}
    >
      <label htmlFor={`sug-${side}`}>What are you dealing with?</label>
      <span className="g-sug-row">
        <input id={`sug-${side}`} type="text" maxLength={200} value={text} onChange={(e) => setText(e.target.value)} placeholder="A few words. Please leave out names and emails." autoFocus />
        <button type="submit">Send</button>
      </span>
    </form>
  )
}
