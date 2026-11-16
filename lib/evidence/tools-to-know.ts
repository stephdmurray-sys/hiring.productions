/**
 * Tools to know (Nov 16, 2026 value audit): the top options in categories we
 * can't score yet, so no picker answer or free tool page ends with nothing to
 * use. Plain facts only, each from the tool's own page or a public review
 * platform, with the source and the date it was read. No scores: a tool needs
 * 25 public reviews before the site scores it. Every `go` id needs a
 * destination in app/go/[partner]/route.ts.
 */
export interface KnowTool {
  /** /go/{id} */
  go: string
  name: string
  domain: string
  /** A short tag under the name, like "Free, from the US Department of Labor". */
  tag?: string
  line: string
  free: string
  paid?: string
  /** Public reviews, platform by platform, as read. */
  reviews?: string
  src: { label: string; url: string; date: string }
}

export interface KnowSet {
  /** The kit heading on a picker answer. */
  k: string
  /** One line under the heading. */
  note?: string
  tools: KnowTool[]
}

/** By picker problem id. Filled from the audit research. */
export const TOOLS_TO_KNOW: Record<string, KnowSet> = {}
