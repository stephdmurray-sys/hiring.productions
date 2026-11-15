'use client'

import { useEffect, useRef, useState, useTransition, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'

/**
 * A GET form that updates the page as people choose. Without JavaScript it
 * submits normally. With it, each committed change (a click, or leaving a
 * text field) rewrites the address, so the result is always a shareable
 * link. Keys in `multi` (checkbox groups) are joined with commas.
 */
export function AutoForm({
  action,
  multi = [],
  limits = {},
  className,
  children,
}: {
  action: string
  multi?: string[]
  /** Most boxes that may be ticked in a group, e.g. { c: 6 }. A tick past it is undone on the spot. */
  limits?: Record<string, number>
  className?: string
  children: ReactNode
}) {
  const multiKey = multi.join(',')
  const limitKey = JSON.stringify(limits)
  const router = useRouter()
  const ref = useRef<HTMLFormElement>(null)
  const [js, setJs] = useState(false)
  const [pending, start] = useTransition()

  useEffect(() => {
    setJs(true)
    const form = ref.current
    if (!form) return
    // The native change event fires on a click for boxes and on leaving a text field, never on every keystroke.
    const max: Record<string, number> = JSON.parse(limitKey)
    const onChange = (e?: Event) => {
      const t = e?.target as HTMLInputElement | undefined
      if (t && t.type === 'checkbox' && t.checked && max[t.name]) {
        const ticked = form.querySelectorAll(`input[type=checkbox][name="${t.name}"]:checked`).length
        if (ticked > max[t.name]) {
          t.checked = false
          return
        }
      }
      const data = new FormData(form)
      const q = new URLSearchParams()
      for (const [k, v] of data.entries()) {
        const value = String(v).trim()
        if (!value || multiKey.split(',').includes(k)) continue
        q.set(k, value)
      }
      for (const k of multiKey.split(',').filter(Boolean)) {
        const all = data.getAll(k).map(String).filter(Boolean)
        if (all.length) q.set(k, all.join(','))
      }
      const qs = q.toString()
      start(() => router.replace(qs ? `${action}?${qs}` : action, { scroll: false }))
    }
    // Typing in a text field updates the result after a short pause, so the
    // address (and anything read from it, like an email ask) keeps up.
    let timer: ReturnType<typeof setTimeout> | undefined
    const onInput = (e: Event) => {
      const t = e.target as HTMLInputElement
      if (t.type !== 'text' && t.type !== 'search') return
      clearTimeout(timer)
      timer = setTimeout(() => onChange(), 450)
    }
    // Enter in a text field updates in place instead of reloading the page.
    const onSubmit = (e: Event) => {
      e.preventDefault()
      clearTimeout(timer)
      onChange()
    }
    form.addEventListener('change', onChange)
    form.addEventListener('input', onInput)
    form.addEventListener('submit', onSubmit)
    return () => {
      clearTimeout(timer)
      form.removeEventListener('change', onChange)
      form.removeEventListener('input', onInput)
      form.removeEventListener('submit', onSubmit)
    }
  }, [action, multiKey, limitKey, router])

  return (
    <form ref={ref} action={action} method="get" className={className} data-js={js ? '' : undefined} data-pending={pending ? '' : undefined}>
      {children}
    </form>
  )
}

/** Opens the browser's print dialog; the page's print styles keep only the scorecard. */
export function PrintButton({ label }: { label: string }) {
  const [ready, setReady] = useState(false)
  useEffect(() => setReady(true), [])
  if (!ready) return null
  return (
    <button type="button" className="btn btn-coral" onClick={() => window.print()}>
      {label}
    </button>
  )
}
