'use client'

import { useEffect } from 'react'

/**
 * Opens a collapsed <details> when a link points at it, so "See the
 * evidence" links land on an open evidence file instead of a closed row.
 */
export function HashOpener({ prefix }: { prefix: string }) {
  useEffect(() => {
    const open = () => {
      const id = decodeURIComponent(window.location.hash.slice(1))
      if (!id.startsWith(prefix)) return
      const el = document.getElementById(id)
      if (el instanceof HTMLDetailsElement) {
        el.open = true
        el.scrollIntoView({ block: 'start' })
      }
    }
    open()
    window.addEventListener('hashchange', open)
    return () => window.removeEventListener('hashchange', open)
  }, [prefix])
  return null
}
