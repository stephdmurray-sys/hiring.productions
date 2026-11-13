# DESIGN.md: the review site's design system

Applies to the review site (the `app/(rebrand)/` pages). Read it before building or restyling any page. It exists because sites drift back to generic, AI-looking defaults unless the decisions are written down. Tokens and components live in `app/(rebrand)/_components/site-css.ts` and `site-chrome.tsx`.

## The idea

hiring.productions is an evidence desk: it reads public evidence and prints its receipts. So pages look like a well-made report or ledger, not a SaaS template. Paper and ink, hairline rules, real tables, dates and figures set like receipts, and the brand colors used as marks.

## Tokens

| Token | Value | Use |
|---|---|---|
| Paper | `#FAF8F3` | Page background everywhere |
| Surface | `#FFFFFF` | Receipts, form fields, boxed notes |
| Ink | `#1A1A22` | Text, rules, buttons |
| Ink 2 / Ink 3 | `#4A4A5A` / `#77778A` | Body copy / captions and footnotes |
| Rule | `#E3DED2` | Hairlines between rows |
| Indigo | `#6C47FF` (text `#5432E0`) | Job seeker side: a dot, a link, a "breaks from the pack" call |
| Coral | `#FF4F6A` (text `#C42E48`) | Hiring side dot, billing traps, warnings |
| Green | `#1F8A55` | Success states only |
| Type | Figtree (from the root layout) | Everything. Headlines 800 weight, tracking no tighter than -0.025em |
| Figures | system monospace | Datelines, "checked" stamps, receipt footers. Small and sparing |
| Radius | 3px | Buttons and inputs. Everything else is square |

## Components

- **Page header:** breadcrumb, a big headline, a dek, a monospace dateline, and a 2px ink rule under it. No dark band.
- **Ledger table:** a 2px ink rule on top, a 1px ink rule under the header, hairlines between rows, tabular figures.
- **Rows:** a hairline-separated list (title on the left, detail on the right) in place of card grids.
- **Receipt:** a flat white slip with a 1px ink border and dashed separators, used to show real evidence (homepage, hub heroes).
- **Buttons:** one per moment, rectangular, solid ink. Everything else is an underlined text link.
- **Stance:** words, not badges. "Agrees with the field" in ink, "Breaks from the pack" in indigo, "Too little evidence" in gray italic.
- **Side marks:** a 9px dot, indigo for job seekers and coral for hiring teams. Never a fill or a gradient.

## Banned: the common tells of AI-generated sites

Checked against current practitioner checklists (Nov 2026). Do not add:

- Gradients of any kind, purple-to-pink above all, and gradient text
- Glows, radial blobs, dark hero bands with neon accents
- Glass or backdrop blur
- Small uppercase letter-spaced "eyebrow" labels above headings or cards
- Pill-shaped badges, chips and buttons
- Big rounded cards (12px+ radius), drop shadows, cards inside cards
- Hover lifts, scale-on-hover, pulsing "live" dots
- Tilted or floating card stacks in a hero
- A row of big stat numbers; "01 / 02 / 03" step cards
- Three equal cards in a row as the default layout
- Icons or logos in rounded tiles above every heading
- Stock or placeholder people photos
- The second AI wave too: cream backgrounds with serif display headlines and terracotta accents

## Copy tells to avoid

- "X, not Y" or "not just X, but Y" as a rhetorical move. Fine when it states a fact ("priced per posting, not per seat").
- Lists of three by default. Use two or four, or a sentence.
- Plus the house rules in CLAUDE.md: no em dashes, no emojis, no unsourced numbers.
