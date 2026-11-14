/**
 * The one plain sentence that says what the site is. Used for search
 * results, link previews, the share image and the footer, so it changes
 * in one place. Replaced "Both sides of hiring. Finally in the open." on
 * Nov 14, 2026: a slogan doesn't tell a stranger what the site is.
 */
export const SITE_LINE = 'Hiring tools ranked for job seekers and hiring teams. Nobody pays to be featured.'

/** Joins the last two words with a no-break space, so a block never ends on one word alone (Stephanie's rule). */
export const keepLast = (s: string) => s.replace(/ (\S+)\s*$/, ' $1')
