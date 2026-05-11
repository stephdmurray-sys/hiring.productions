'use client'

import { useEffect, useState } from 'react'

/**
 * Rotates through an ordered list of "stage" strings while a request is in
 * flight, so a 30-45s tool run feels like a theatrical sequence instead of a
 * dead spinner. Advances every `intervalMs` and freezes on the final stage
 * (so a long run never falls off the script — it just sits on the last beat).
 *
 * Usage:
 *   const stage = useStageRotation([
 *     'Lights up. Reading your profile…',
 *     'Casting the searches a recruiter would run…',
 *     'Running the boolean strings…',
 *   ], loading)
 *
 *   <button>{loading ? stage : 'Show me where I rank'}</button>
 */
export function useStageRotation(
  stages: readonly string[],
  running: boolean,
  intervalMs = 3500,
): string {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!running) {
      setIndex(0)
      return
    }
    if (stages.length <= 1) return

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1 < stages.length ? i + 1 : i))
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [running, stages.length, intervalMs])

  return stages[index] ?? ''
}
