import { atsProfiles } from '@/lib/ats-profiles'
import { MetadataRoute } from 'next'
import { resumeTools } from '@/lib/evidence'
import { situations } from '@/lib/evidence/recommend'
import { comparePairs } from '@/lib/compare'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://hiring.productions'

  type Entry = {
    path: string
    priority: number
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  }

  // This version charges nothing: the old paid product's pages are
  // retired (see next.config.mjs redirects) and left out of the sitemap.
  const staticPages: Entry[] = [
    { path: '', priority: 1, changeFrequency: 'weekly' },
    { path: '/consulting', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/about/stephanie', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/advertiser-disclosure', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/for-vendors', priority: 0.6, changeFrequency: 'monthly' },
  ]

  // tool pages answer the searches people make right before they pay
  // ("is X worth it", "is X free", "X alternatives"), and they change
  // every month with the evidence refresh.
  const reviewPages: Entry[] = [
    { path: '/for-job-seekers', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/for-hiring-teams', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/guides/best-resume-tools', priority: 0.95, changeFrequency: 'monthly' },
    { path: '/guides/best-ats-for-small-teams', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/guides/best-recruiter-training', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/how-we-review', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/reviews', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/who-to-follow', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/on-the-rise', priority: 0.8, changeFrequency: 'monthly' },
    // The recommender and the permanent answer pages for common situations
    { path: '/what-should-i-use', priority: 0.95, changeFrequency: 'monthly' },
    // Free tools for hiring teams, built on published standards (OPM, SHRM, FBI)
    { path: '/interview-scorecard', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/interview-practice', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/hiring-costs', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/is-this-a-real-candidate', priority: 0.9, changeFrequency: 'monthly' },
    ...situations().map((x) => ({ path: `/what-should-i-use/${x.slug}`, priority: 0.85, changeFrequency: 'monthly' as const })),
    ...resumeTools().all.map((t) => ({ path: `/reviews/${t.id}`, priority: 0.85, changeFrequency: 'monthly' as const })),
    ...atsProfiles().map((p) => ({ path: `/reviews/ats/${p.slug}`, priority: 0.85, changeFrequency: 'monthly' as const })),
    { path: '/compare', priority: 0.8, changeFrequency: 'monthly' },
    ...comparePairs().map((p) => ({ path: `/compare/${p.slug}`, priority: 0.8, changeFrequency: 'monthly' as const })),
  ]

  const seen = new Set(staticPages.map((p) => p.path))
  const merged = [...staticPages, ...reviewPages.filter((p) => !seen.has(p.path))]

  return merged.map((page) => ({
    url: `${base}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}
