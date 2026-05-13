'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * Persist tool form state to localStorage so visitors don't lose work
 * when they hit a paywall, navigate to /pricing, sign in, or accidentally
 * close the tab.
 *
 * Pattern follows industry standard (Typeform / Stripe Atlas / Notion):
 * autosave on every change, restore on mount, clear after successful
 * submission.
 *
 * Usage:
 *
 *   const [fields, setField, clearDraft] = useToolDraft('rejection-email', {
 *     stage: '',
 *     candidateContext: '',
 *     yourTone: 'direct',
 *   })
 *
 *   // In JSX:
 *   <input value={fields.stage} onChange={e => setField('stage', e.target.value)} />
 *
 *   // After successful submission:
 *   clearDraft()
 *
 * Each tool gets its own draft slot keyed by toolId. Drafts are
 * scoped to the browser — different devices won't share them, which
 * is the expected behavior (form drafts are not synced contacts).
 */
export function useToolDraft<T extends Record<string, string>>(
  toolId: string,
  initial: T,
): [T, <K extends keyof T>(key: K, value: T[K]) => void, () => void] {
  const storageKey = `hp:draft:${toolId}`

  // Lazy initializer reads from localStorage on first render so the
  // user sees their draft immediately — no flash of empty state.
  const [fields, setFields] = useState<T>(() => {
    if (typeof window === 'undefined') return initial
    try {
      const raw = window.localStorage.getItem(storageKey)
      if (!raw) return initial
      const parsed = JSON.parse(raw) as Partial<T>
      // Merge restored values over the initial defaults so new fields
      // added to the form schema later don't show up undefined.
      return { ...initial, ...parsed }
    } catch {
      return initial
    }
  })

  // Debounced write so we're not hammering localStorage on every keystroke.
  // 400ms is the sweet spot — fast enough to feel like real-time, slow
  // enough that rapid typing doesn't generate 50 writes.
  const writeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (writeTimer.current) clearTimeout(writeTimer.current)
    writeTimer.current = setTimeout(() => {
      try {
        const hasAnyContent = Object.values(fields).some((v) => String(v).trim())
        if (hasAnyContent) {
          window.localStorage.setItem(storageKey, JSON.stringify(fields))
        } else {
          // All fields empty — clear the draft slot so we don't leave
          // stale empty drafts cluttering localStorage.
          window.localStorage.removeItem(storageKey)
        }
      } catch {
        // Quota exceeded, private browsing, etc. — silent failure is
        // fine; the form still works, the user just won't get the
        // restore-on-reload benefit.
      }
    }, 400)
    return () => {
      if (writeTimer.current) clearTimeout(writeTimer.current)
    }
  }, [fields, storageKey])

  const setField = useCallback(
    <K extends keyof T>(key: K, value: T[K]) => {
      setFields((prev) => ({ ...prev, [key]: value }))
    },
    [],
  )

  const clearDraft = useCallback(() => {
    setFields(initial)
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(storageKey)
      } catch {
        // see above
      }
    }
    // initial is stable per-mount; intentionally omitting from deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey])

  return [fields, setField, clearDraft]
}
