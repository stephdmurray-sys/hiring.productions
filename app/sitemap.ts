import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://hiring.productions'
  const pages = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/for-candidates', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/for-companies', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/tools', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/membership', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/stand-out', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/consulting', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/get-found', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/linkedin-guide', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/resume', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/jd-seo-score', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/tools/resume-recruiter-eyes', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/tools/what-this-job-is', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/tools/ats-reality', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/tools/where-you-have-a-shot', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/tools/culture-decoder', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/tools/what-theyre-asking', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/tools/how-you-come-across', priority: 0.8, changeFrequency: 'monthly' as const },
    // SEO Content Pages
    { path: '/how-ats-actually-works', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/what-recruiters-really-think', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/q/why-am-i-not-getting-responses', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/q/what-does-competitive-salary-mean', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/q/how-to-tell-if-resume-is-ai', priority: 0.85, changeFrequency: 'monthly' as const },
  ]

  return pages.map(page => ({
    url: `${base}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}
