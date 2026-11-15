/**
 * Brand tokens for the rebrand pages. The approved mockups were drawn in
 * Poppins/Open Sans and violet; BRAND.md sets Figtree, electric indigo
 * (candidate side) and hot coral (hiring side). Figtree is loaded once by
 * the root layout, so "inherit" picks it up everywhere.
 */
export const BRAND_SWAPS: [RegExp, string][] = [
  [/'Poppins',\s*sans-serif/g, 'inherit'],
  [/'Open Sans',\s*sans-serif/g, 'inherit'],
  [/#6D28D9/gi, '#6C47FF'],
  [/#5B21B6/gi, '#5A36E8'],
  [/#7C3AED/gi, '#7B5BFF'],
  [/rgba\(109,\s*40,\s*217,/g, 'rgba(108,71,255,'],
]

export function brand(source: string): string {
  let out = source
  for (const [re, to] of BRAND_SWAPS) out = out.replace(re, to)
  return out
}

/** Side colors: indigo is the job seeker's side, coral the hiring team's. */
export const SIDE = {
  seekers: { color: '#6C47FF', soft: '#EEEAFF' },
  hiring: { color: '#FF4F6A', soft: '#FFE9ED' },
} as const
