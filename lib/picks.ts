/**
 * Stephanie's verdict faces (her design, Nov 15, 2026: "add-on options to
 * sprinkle across areas where I call out great tools"). Three faces, each
 * with its own circle color and sticker. They appear only beside tools she
 * calls out as her pick, never beside RepVera, and a verdict never changes
 * a score.
 *
 * PICK_VERDICT is which face each pick gets. Huntr is Love it (Stephanie,
 * Nov 16, 2026: "I love Huntr. It's my up and coming fav."). FlowCV is no
 * longer a pick. The others are drafts until Stephanie confirms them.
 */
export type Verdict = 'solid' | 'worth' | 'love'

export const VERDICTS: Record<Verdict, { label: string; face: string; alt: string }> = {
  solid: { label: 'Solid pick', face: '/people/stephanie-solid.webp', alt: 'Stephanie Murray smiling' },
  worth: { label: 'Worth it', face: '/people/stephanie-worth.webp', alt: 'Stephanie Murray with a big grin' },
  love: { label: 'Love it', face: '/people/stephanie-love.webp', alt: 'Stephanie Murray laughing' },
}

export const PICK_VERDICT: Record<string, Verdict> = {
  huntr: 'love',
  juicebox: 'solid',
  tofu: 'worth',
}

export const verdictFor = (toolId: string): Verdict => PICK_VERDICT[toolId] ?? 'solid'
