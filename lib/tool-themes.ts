import type { CatalogTool, ToolTheme as LegacyToolTheme } from '@/lib/tools-catalog'

/**
 * The site has TWO visual themes — not six. The brand thesis is bilateral
 * (candidate ↔ hiring team), so the visual system mirrors it: indigo for the
 * candidate side, coral for the hiring side. Lavender is the ambient accent
 * across both. The indigo→coral gradient is reserved for flagship Pro tools
 * (and the global primary CTAs / closing-section moments documented in BRAND.md).
 *
 * The old six-theme palette (indigo / blue / coral / emerald / magenta / amber)
 * has been retired. Decorative color drifts the brand; semantic color carries it.
 */

export type ThemeKey = 'candidate' | 'hiring'

export interface Theme {
  /** Brand color for this audience (indigo or coral) */
  primary: string
  /** Softer same-family accent — readable on dark surfaces */
  accent: string
  /** Card top-band background — a radial of the primary at low opacity */
  previewBg: string
  /** Default border color */
  border: string
  /** Hover border color */
  borderHover: string
  /** Hover shadow */
  glow: string
  /** Subtitle / eyebrow text color */
  eyebrow: string
  /** Side label that prints above each card */
  label: string
}

export const THEMES: Record<ThemeKey, Theme> = {
  candidate: {
    primary: '#6C47FF',
    accent: '#A78BFA',
    previewBg:
      'radial-gradient(ellipse at top, rgba(108,71,255,0.18) 0%, rgba(108,71,255,0.04) 60%, transparent 100%), #0F0E18',
    border: 'rgba(108,71,255,0.22)',
    borderHover: 'rgba(108,71,255,0.55)',
    glow: '0 24px 60px rgba(108,71,255,0.30)',
    eyebrow: '#A78BFA',
    label: 'Candidate',
  },
  hiring: {
    primary: '#FF4F6A',
    accent: '#FF8FA3',
    previewBg:
      'radial-gradient(ellipse at top, rgba(255,79,106,0.20) 0%, rgba(255,79,106,0.04) 60%, transparent 100%), #1A0E15',
    border: 'rgba(255,79,106,0.22)',
    borderHover: 'rgba(255,79,106,0.55)',
    glow: '0 24px 60px rgba(255,79,106,0.28)',
    eyebrow: '#FF8FA3',
    label: 'Hiring Team',
  },
}

/**
 * Brand "moment" gradient — indigo → coral. Used on:
 *  - Primary CTAs (Get Full Access, Run yours, etc.)
 *  - Flagship Pro tool flourishes (top-bar accent + icon background)
 *  - Hero headline color spans
 *  - The closing CTA section
 *
 * Reserve for moments. Restraint makes them feel like something.
 */
export const BRAND_GRADIENT = 'linear-gradient(135deg, #6C47FF 0%, #FF4F6A 100%)'

/**
 * Derive a tool's visual theme from its audience. The legacy `theme` field on
 * each catalog entry is retained for backwards compatibility but ignored —
 * audience is the single source of truth.
 */
export function getTheme(tool: Pick<CatalogTool, 'audience'>): Theme {
  return tool.audience === 'hiring' ? THEMES.hiring : THEMES.candidate
}

// ---------------------------------------------------------------------------
// Backwards-compat: old code still imports legacy theme keys ('indigo', etc.)
// via the catalog entries. Map each legacy theme to the closest new theme so
// nothing breaks while the catalog cleans itself up over time.
// ---------------------------------------------------------------------------

const LEGACY_TO_NEW: Record<LegacyToolTheme, ThemeKey> = {
  indigo: 'candidate',
  blue: 'candidate',
  coral: 'candidate',
  emerald: 'candidate',
  magenta: 'candidate',
  amber: 'hiring',
}

/** @deprecated Use `getTheme(tool)` instead — relies on the legacy theme key. */
export function legacyThemeToTheme(legacy: LegacyToolTheme): Theme {
  return THEMES[LEGACY_TO_NEW[legacy] ?? 'candidate']
}
