'use client'

import { useEffect, useRef, useState, useTransition, type ChangeEvent, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'

/**
 * The recommender's form. Without JavaScript it is a plain GET form: pick,
 * press the button, get the answer page. With JavaScript every choice
 * updates the address and the answer in place, so changing a limit shows
 * its effect at once. The address is always the shareable answer.
 */
export function RecForm({ action, children }: { action: string; children: ReactNode }) {
  const router = useRouter()
  const ref = useRef<HTMLFormElement>(null)
  const [js, setJs] = useState(false)
  const [pending, start] = useTransition()

  useEffect(() => setJs(true), [])

  function onChange(e: ChangeEvent<HTMLFormElement>) {
    const form = ref.current
    if (!form) return
    const target = e.target as unknown as HTMLInputElement
    const data = new FormData(form)
    const q = new URLSearchParams()
    // Switching sides starts over: the other side asks different questions.
    if (target.name === 'side') q.set('side', target.value)
    else {
      for (const [k, v] of data.entries()) if (k !== 'must') q.set(k, String(v))
      const must = data.getAll('must').map(String)
      if (must.length) q.set('must', must.join(','))
    }
    // A new side starts the guided questions: go there and bring the first question on screen.
    if (target.name === 'side') {
      start(() => router.push(`${action}?${q.toString()}#questions`))
      return
    }
    start(() => router.replace(`${action}?${q.toString()}`, { scroll: false }))
  }

  return (
    <form ref={ref} action={`${action}#questions`} method="get" className="rec-form" data-js={js ? '' : undefined} data-pending={pending ? '' : undefined} onChange={onChange}>
      {children}
    </form>
  )
}

/**
 * "Share this answer": the phone's own share menu where there is one,
 * otherwise copies the link. Hidden until the page is interactive, since
 * it does nothing without JavaScript.
 */
export function CopyLink({ url, title }: { url: string; title: string }) {
  const [ready, setReady] = useState(false)
  const [done, setDone] = useState(false)
  useEffect(() => setReady(true), [])
  if (!ready) return null
  return (
    <button
      type="button"
      className="rec-copy"
      onClick={async () => {
        const nav = navigator as Navigator & { share?: (d: { title: string; url: string }) => Promise<void> }
        const touch = window.matchMedia('(pointer: coarse)').matches
        try {
          if (nav.share && touch) {
            await nav.share({ title, url })
            return
          }
          await navigator.clipboard.writeText(url)
          setDone(true)
          setTimeout(() => setDone(false), 2400)
        } catch {
          setDone(false)
        }
      }}
    >
      {done ? (
        'Link copied'
      ) : (
        <>
          Share this answer <span className="arr">&rarr;</span>
        </>
      )}
    </button>
  )
}

/**
 * When an answer first appears (a finished set of questions, or a shared
 * link), bring it into view if it's below the fold. Later changes to the
 * limits update it in place without moving the page.
 */
export function ScrollToAnswer() {
  useEffect(() => {
    const el = document.getElementById('answer')
    if (!el) return
    const top = el.getBoundingClientRect().top
    if (top > window.innerHeight - 120) {
      const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
    }
  }, [])
  return null
}
