import type { ToolTheme } from '@/lib/tools-catalog'

/**
 * Six color themes mapped to tool function. Used to give the catalog
 * grid visual variety so the eye has somewhere to land — instead of
 * 24 monochrome cards.
 */

export interface Theme {
  /** Most-saturated brand color for accents, glows, gradients */
  primary: string
  /** Slightly lighter / softer version for body text accents */
  accent: string
  /** Very subtle background tint for the card */
  tintBg: string
  /** Card border in default state */
  border: string
  /** Card border on hover */
  borderHover: string
  /** Soft outer glow for hover and featured */
  glow: string
  /** Eyebrow color for section labels using this theme */
  eyebrow: string
  /** Background for the preview area at top of card */
  previewBg: string
  /** Human-readable label for the theme (debug) */
  label: string
}

export const THEMES: Record<ToolTheme, Theme> = {
  indigo: {
    primary: '#6C47FF',
    accent: '#A78BFA',
    tintBg: 'linear-gradient(160deg, #16131F 0%, #1A1626 100%)',
    border: 'rgba(108,71,255,0.22)',
    borderHover: 'rgba(108,71,255,0.55)',
    glow: '0 24px 60px rgba(108,71,255,0.30)',
    eyebrow: '#A78BFA',
    previewBg:
      'radial-gradient(ellipse at top, rgba(108,71,255,0.18) 0%, rgba(108,71,255,0.04) 60%, transparent 100%), #0F0E18',
    label: 'Indigo · Resume / AI',
  },
  blue: {
    primary: '#4F8EFF',
    accent: '#7BA8FF',
    tintBg: 'linear-gradient(160deg, #0F1424 0%, #131A2D 100%)',
    border: 'rgba(79,142,255,0.22)',
    borderHover: 'rgba(79,142,255,0.55)',
    glow: '0 24px 60px rgba(79,142,255,0.28)',
    eyebrow: '#7BA8FF',
    previewBg:
      'radial-gradient(ellipse at top, rgba(79,142,255,0.20) 0%, rgba(79,142,255,0.04) 60%, transparent 100%), #0B1124',
    label: 'Blue · LinkedIn',
  },
  coral: {
    primary: '#FF4F6A',
    accent: '#FF8FA3',
    tintBg: 'linear-gradient(160deg, #1F1218 0%, #25151D 100%)',
    border: 'rgba(255,79,106,0.22)',
    borderHover: 'rgba(255,79,106,0.55)',
    glow: '0 24px 60px rgba(255,79,106,0.28)',
    eyebrow: '#FF8FA3',
    previewBg:
      'radial-gradient(ellipse at top, rgba(255,79,106,0.20) 0%, rgba(255,79,106,0.04) 60%, transparent 100%), #1A0E15',
    label: 'Coral · Interview / Heat',
  },
  emerald: {
    primary: '#5EE6A8',
    accent: '#A3F0CD',
    tintBg: 'linear-gradient(160deg, #0E1F1A 0%, #102521 100%)',
    border: 'rgba(94,230,168,0.22)',
    borderHover: 'rgba(94,230,168,0.55)',
    glow: '0 24px 60px rgba(94,230,168,0.25)',
    eyebrow: '#5EE6A8',
    previewBg:
      'radial-gradient(ellipse at top, rgba(94,230,168,0.18) 0%, rgba(94,230,168,0.04) 60%, transparent 100%), #0A1A16',
    label: 'Emerald · Money / Offer',
  },
  magenta: {
    primary: '#FF77B0',
    accent: '#FFA0CB',
    tintBg: 'linear-gradient(160deg, #1F1320 0%, #261627 100%)',
    border: 'rgba(255,119,176,0.22)',
    borderHover: 'rgba(255,119,176,0.55)',
    glow: '0 24px 60px rgba(255,119,176,0.28)',
    eyebrow: '#FFA0CB',
    previewBg:
      'radial-gradient(ellipse at top, rgba(255,119,176,0.20) 0%, rgba(255,119,176,0.04) 60%, transparent 100%), #1B0F1B',
    label: 'Magenta · Diagnostic / Strategy',
  },
  amber: {
    primary: '#FFB347',
    accent: '#FFC97A',
    tintBg: 'linear-gradient(160deg, #1F1810 0%, #251D14 100%)',
    border: 'rgba(255,179,71,0.22)',
    borderHover: 'rgba(255,179,71,0.55)',
    glow: '0 24px 60px rgba(255,179,71,0.25)',
    eyebrow: '#FFC97A',
    previewBg:
      'radial-gradient(ellipse at top, rgba(255,179,71,0.18) 0%, rgba(255,179,71,0.04) 60%, transparent 100%), #1A140C',
    label: 'Amber · Hiring Team',
  },
}
