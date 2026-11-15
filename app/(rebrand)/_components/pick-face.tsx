import Image from 'next/image'
import { VERDICTS, type Verdict } from '@/lib/picks'

/**
 * Stephanie's verdict face: her cutout in a colored circle with an ink
 * outline and hard shadow, a dot grid and a zigzag at the corners, and a
 * tilted sticker with the verdict. Small sizes drop the shapes and the
 * sticker and keep the face. Styles: pickFaceCss (pick-face-css.ts).
 */
export function PickFace({ verdict, size = 120, sticker = true, shapes = true }: { verdict: Verdict; size?: number; sticker?: boolean; shapes?: boolean }) {
  const v = VERDICTS[verdict]
  return (
    <span className={`pf pf-${verdict}`} style={{ width: size, height: size }} role="img" aria-label={`Stephanie's pick: ${v.label}`}>
      {shapes && <span className="pf-dots" aria-hidden="true" />}
      <span className="pf-circle">
        <Image src={v.face} alt="" width={size * 2} height={size * 2} sizes={`${size}px`} />
      </span>
      {shapes && (
        <svg className="pf-zig" viewBox="0 0 124 30" aria-hidden="true">
          <polyline points="4,24 20,6 36,24 52,6 68,24 84,6 100,24 116,6" />
        </svg>
      )}
      {sticker && (
        <span className="pf-sticker" aria-hidden="true">
          {v.label}
        </span>
      )}
    </span>
  )
}

/** The small inline mark beside a "Stephanie's pick" label: her face and the verdict. */
export function PickMark({ verdict }: { verdict: Verdict }) {
  const v = VERDICTS[verdict]
  return (
    <span className={`pm pm-${verdict}`}>
      <span className="pm-face">
        <Image src={v.face} alt="" width={64} height={64} sizes="32px" />
      </span>
      <span className="pm-label">{v.label}</span>
    </span>
  )
}
