import type { ReactNode } from 'react'

/**
 * Staging renderer for the rebrand preview. Each page injects the exact
 * approved mockup HTML (ported from the Desktop mockups) so what
 * Stephanie reviews on the preview URL is pixel-identical to what she
 * approved. Replaced with real components at launch.
 */
const FONTS =
  "<style>@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Open+Sans:wght@400;600;700&display=swap');</style>"

export function MockPage({ html }: { html: string }): ReactNode {
  return <div dangerouslySetInnerHTML={{ __html: FONTS + html }} />
}
