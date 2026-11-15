'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { VERDICTS, type Verdict } from '@/lib/picks'

/**
 * Stephanie's face loop (her design, Nov 15, 2026): the three faces take
 * turns in one circle, each popping up as the circle changes color, every
 * 0.8 seconds. Holds on the first face for reduced motion.
 */
const ORDER: { v: Verdict; fill: string; zig: string }[] = [
  { v: 'love', fill: 'var(--indigo)', zig: 'var(--coral)' },
  { v: 'worth', fill: 'var(--coral)', zig: 'var(--indigo)' },
  { v: 'solid', fill: 'var(--indigo-tint)', zig: 'var(--indigo)' },
]

export function FaceLoop({ size = 160, seconds = 0.8, label = 'Stephanie Murray' }: { size?: number; seconds?: number; label?: string }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    let still = false
    try {
      still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    } catch {}
    if (still) return
    const t = setInterval(() => setI((x) => (x + 1) % ORDER.length), seconds * 1000)
    return () => clearInterval(t)
  }, [seconds])
  const cur = ORDER[i]
  return (
    <span className="pf pf-loop" style={{ width: size, height: size }} role="img" aria-label={label}>
      <span className="pf-dots" aria-hidden="true" />
      <span className="pf-circle" style={{ background: cur.fill }}>
        {ORDER.map((o, n) => (
          <Image key={o.v} className={n === i ? 'pf-on' : 'pf-off'} src={VERDICTS[o.v].face} alt="" width={size * 2} height={size * 2} sizes={`${size}px`} priority={n === 0} />
        ))}
      </span>
      <svg className="pf-zig" viewBox="0 0 124 30" aria-hidden="true" style={{ color: cur.zig }}>
        <polyline points="4,24 20,6 36,24 52,6 68,24 84,6 100,24 116,6" />
      </svg>
    </span>
  )
}
