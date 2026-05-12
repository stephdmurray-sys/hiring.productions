import { MetadataRoute } from 'next'
import { CATALOG } from '@/lib/tools-catalog'

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
    { path: '/sign-in', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/stand-out', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/consulting', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/get-found', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/linkedin-guide', priority: 0.8, changeFrequency: 'monthly' },
    // Audience hubs — high-intent candidate-moment landing pages
    { path: '/for-new-grads', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/after-layoff', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/career-changers', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/returning-to-work', priority: 0.85, changeFrequency: 'monthly' },
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
  ]

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
  const merged = [...staticPages, ...toolPages.filter((p) => !seen.has(p.path))]

  return merged.map((page) => ({
    url: `${base}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}
