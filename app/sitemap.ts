import { MetadataRoute } from 'next'
import { CATALOG } from '@/lib/tools-catalog'
import { RANK_ROLES } from '@/lib/rank-roles'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://hiring.productions'

  type Entry = {
    path: string
    priority: number
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  }

  const staticPages: Entry[] = [
    { path: '', priority: 1, changeFrequency: 'weekly' },
    { path: '/for-candidates', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/for-companies', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/tools', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/pricing', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/membership', priority: 0.9, changeFrequency: 'monthly' },
    // /sign-in intentionally NOT in the sitemap. It carries
    // robots: { index: false } via app/sign-in/layout.tsx because
    // a sign-in page has no public search value. Listing it in the
    // sitemap while noindex'ing it creates a "Excluded by noindex"
    // warning in Google Search Console for a conflict that should
    // not exist. Same reasoning applies to /dashboard, /onboarding,
    // /admin, and /auth/verify, all of which are intentionally
    // omitted from this list.
    { path: '/stand-out', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/consulting', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/linkedin-guide', priority: 0.8, changeFrequency: 'monthly' },
    // Audience hubs — high-intent candidate-moment landing pages
    { path: '/for-new-grads', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/after-layoff', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/career-changers', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/returning-to-work', priority: 0.85, changeFrequency: 'monthly' },
    // Hiring-side audience hub — small teams hiring without a TA function
    { path: '/for-small-teams', priority: 0.85, changeFrequency: 'monthly' },
    // SEO content pages — topic-level pillars
    { path: '/how-ats-actually-works', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/what-recruiters-really-think', priority: 0.85, changeFrequency: 'monthly' },
    // /answers hub page — links to every /q/ page
    { path: '/answers', priority: 0.9, changeFrequency: 'weekly' },
    // /q/ question-targeted pages (AlsoAsked-driven, FAQ schema'd)
    { path: '/q/why-am-i-not-getting-responses', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/q/what-does-competitive-salary-mean', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/q/how-to-tell-if-resume-is-ai', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/q/7-second-rule-resume', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/q/70-30-rule', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/q/how-to-beat-ats', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/q/resume-red-flags', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/q/explain-resume-gap', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/q/how-to-get-hired-as-new-grad', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/q/is-my-resume-good', priority: 0.85, changeFrequency: 'monthly' },
    // New-grad expansion cluster (May 2026) — three pages targeting
    // high-intent, lower-competition queries with RepVera positioned
    // as the modern answer for new grads who have references-worthy
    // people in their lives but no formal employment history to
    // surface them through.
    { path: '/q/how-to-stand-out-as-a-new-grad', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/q/references-for-new-grad-jobs', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/q/what-recruiters-look-for-in-new-grads', priority: 0.85, changeFrequency: 'monthly' },
    // Underserved high-intent cluster (May 2026) — three low-competition
    // queries the brand has direct authority to own. /are-references
    // doubles as the highest-leverage RepVera lead-in on the site.
    { path: '/q/are-references-on-a-resume-still-relevant', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/q/open-to-work-without-looking-desperate', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/q/how-recruiters-spot-ai-cover-letters', priority: 0.85, changeFrequency: 'monthly' },
    // Round 3 of the SEO cluster (May 2026) — RepVera comparison page,
    // a high-volume recruiter-authority answer, and a tactical alumni-
    // tool walkthrough that pairs with the wedge tool naturally.
    { path: '/q/references-vs-linkedin-recommendations', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/q/what-does-culture-fit-actually-mean', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/q/how-to-use-linkedin-alumni-tool', priority: 0.85, changeFrequency: 'monthly' },
    // Round 4 of the SEO cluster (May 2026, post-GSC audit) — three
    // high-volume, low-competition queries the site has direct tool
    // matches for. Each routes into a Pro Recruiter Insight or the
    // free Have I Been Ghosted? diagnostic.
    { path: '/q/am-i-being-ghosted-by-a-recruiter', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/q/can-recruiters-find-me-on-linkedin', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/q/what-do-recruiters-actually-search-for-on-linkedin', priority: 0.85, changeFrequency: 'monthly' },
  ]

  // /rank/[role] SEO landing pages — one per RoleConfig in lib/rank-roles.
  // High priority because these are the dedicated SEO front doors to the
  // wedge tool; each one targets a distinct long-tail query.
  const rankPages: Entry[] = RANK_ROLES.map((r) => ({
    path: `/rank/${r.slug}`,
    priority: 0.9,
    changeFrequency: 'monthly' as const,
  }))

  // Every shipped tool page (free + pro), sourced from the catalog so the
  // sitemap can't drift behind the catalog as tools are added or renamed.
  // External hrefs and soon-tier tools are excluded.
  const toolPages: Entry[] = CATALOG
    .filter(
      (t) =>
        t.tier !== 'soon' &&
        t.href.startsWith('/') &&
        !t.href.startsWith('http'),
    )
    .map((t) => ({
      path: t.href,
      priority: t.tier === 'pro' ? 0.85 : 0.8,
      changeFrequency: 'monthly' as const,
    }))

  // De-dupe: a few catalog hrefs (/resume, /jd-seo-score) collide with
  // staticPages entries, and the homepage already covers root.
  const seen = new Set(staticPages.map((p) => p.path))
  const merged = [
    ...staticPages,
    ...rankPages,
    ...toolPages.filter((p) => !seen.has(p.path)),
  ]

  return merged.map((page) => ({
    url: `${base}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}
