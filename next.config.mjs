// This version of hiring.productions charges nothing (Stephanie, Nov 14, 2026).
// The old paid product (Pro, pricing, sign-in, the AI tools behind the Pro
// wall, and the recruiter answers built on that template) is retired from
// the site. Its code stays in the repo. Every old address goes to its
// closest free page instead of a 404. Temporary (307) so a later version
// can bring pages back. Kept live on purpose: /consider-me (consulting
// roles), /admin, /privacy, /terms.
const SEEKERS = '/for-job-seekers'
const HIRING = '/for-hiring-teams'
const RESUME_GUIDE = '/guides/best-resume-tools'
const map = {
  // the paid product and accounts
  '/pricing': '/',
  '/pro': '/',
  '/membership': '/',
  '/sign-in': '/',
  '/onboarding': '/',
  '/dashboard': '/',
  // old landing pages
  '/for-candidates': SEEKERS,
  '/for-companies': HIRING,
  '/for-small-teams': HIRING,
  '/for-new-grads': SEEKERS,
  '/after-layoff': SEEKERS,
  '/career-changers': SEEKERS,
  '/returning-to-work': SEEKERS,
  '/stand-out': SEEKERS,
  '/linkedin-guide': SEEKERS,
  '/what-recruiters-really-think': RESUME_GUIDE,
  '/resume': RESUME_GUIDE,
  '/answers': '/what-should-i-use',
  // job seeker AI tools
  '/tools/rehearsal-room': '/interview-practice',
  '/tools/what-theyre-asking': '/interview-practice',
  '/tools/how-you-come-across': '/interview-practice',
  '/tools/ats-reality': RESUME_GUIDE,
  '/tools/keyword-gap': RESUME_GUIDE,
  '/tools/resume-recruiter-eyes': RESUME_GUIDE,
  '/tools/questions-this-resume-invites': RESUME_GUIDE,
  '/tools/new-grad-resume': RESUME_GUIDE,
  '/tools/explain-my-gap': RESUME_GUIDE,
  '/tools/career-pivot': RESUME_GUIDE,
  '/tools/whats-breaking-search': '/what-should-i-use?side=seekers',
  '/tools/what-are-my-chances': '/what-should-i-use?side=seekers',
  '/tools/where-you-have-a-shot': '/what-should-i-use?side=seekers',
  '/tools/recruiter-find-you': SEEKERS,
  '/tools/recruiter-search-rank': SEEKERS,
  '/tools/linkedin-rewrite': SEEKERS,
  '/tools/ghosted': SEEKERS,
  '/tools/scam-check': SEEKERS,
  '/tools/what-youre-worth': SEEKERS,
  '/tools/offer-lands': SEEKERS,
  '/tools/day-one': SEEKERS,
  '/tools/culture-decoder': SEEKERS,
  '/tools/what-this-job-is': SEEKERS,
  // hiring team AI tools
  '/tools/real-candidate': '/is-this-a-real-candidate',
  '/tools/interviewers-ready': '/interview-scorecard',
  '/tools/what-youre-evaluating': '/interview-scorecard',
  '/tools/mis-hire-calculator': '/hiring-costs',
  '/tools/jd-candidate-eyes': HIRING,
  '/tools/candidate-outreach': HIRING,
  '/tools/boolean-builder': HIRING,
  '/tools/applicant-triage': HIRING,
  '/tools/rejection-email': HIRING,
  '/tools/offer-pitch': HIRING,
  '/tools/pay-range-compliance': HIRING,
  '/tools/ai-vendor-compliance': HIRING,
  '/tools/hiring-process-outside': HIRING,
  // recruiter answers on the old template
  '/q/why-am-i-not-getting-responses': '/what-should-i-use?side=seekers&problem=no-callbacks',
  '/q/how-to-beat-ats': RESUME_GUIDE,
  '/q/is-my-resume-good': RESUME_GUIDE,
  '/q/7-second-rule-resume': RESUME_GUIDE,
  '/q/resume-red-flags': RESUME_GUIDE,
  '/q/how-to-tell-if-resume-is-ai': RESUME_GUIDE,
  '/q/explain-resume-gap': RESUME_GUIDE,
  '/q/how-recruiters-spot-ai-cover-letters': RESUME_GUIDE,
  '/q/what-does-culture-fit-actually-mean': '/interview-practice',
}
const RETIRED = Object.entries(map).map(([source, destination]) => ({ source, destination, permanent: false }))
// Renamed pages keep their old address working for good (308).
const RENAMED = [
  { source: '/consulting', destination: '/hiring-stack', permanent: true },
  // The fake candidates answer became a short list (Nov 14, 2026): its section on applicant tracking systems answers the old question.
  { source: '/what-should-i-use/stop-fake-candidates', destination: '/guides/hiring-fraud-tools#ats', permanent: true },
]
// Addresses people type or guess (journey pass, Nov 15, 2026): each goes to the page they're looking for, never a 404.
const GUESSES = [
  ['/about', '/about/stephanie'],
  ['/stephanie', '/about/stephanie'],
  ['/contact', '/about/stephanie'],
  ['/blog', '/guides'],
  ['/free-tools', '/guides'],
  ['/search', '/guides'],
  ['/faq', '/how-we-review'],
  ['/methodology', '/how-we-review'],
  ['/how-it-works', '/how-we-review'],
  ['/calculator', '/guides/best-resume-tools#cost'],
  ['/cost-calculator', '/guides/best-resume-tools#cost'],
  ['/resume-cost-calculator', '/guides/best-resume-tools#cost'],
  ['/resume-builders', '/guides/best-resume-tools'],
  ['/resume-checkers', '/guides/best-resume-tools#rankings'],
  ['/resume-tools', '/guides/best-resume-tools'],
  ['/guides/resume-tools', '/guides/best-resume-tools'],
  ['/rankings', '/guides/best-resume-tools#rankings'],
  ['/scoreboard', '/#scoreboard'],
  ['/ats', '/guides/best-ats-for-small-teams'],
  ['/applicant-tracking-systems', '/guides/best-ats-for-small-teams'],
  ['/guides/best-ats', '/guides/best-ats-for-small-teams'],
  ['/reviews/ats', '/reviews'],
  ['/recommend', '/what-should-i-use'],
  ['/picker', '/what-should-i-use'],
  ['/job-seekers', '/for-job-seekers'],
  ['/seekers', '/for-job-seekers'],
  ['/candidates', '/for-job-seekers'],
  ['/hiring-teams', '/for-hiring-teams'],
  ['/hiring', '/for-hiring-teams'],
  ['/employers', '/for-hiring-teams'],
  ['/login', '/'],
  ['/signup', '/'],
  ['/newsletter', '/what-should-i-use#signup'],
  ['/disclosure', '/advertiser-disclosure'],
  ['/vendors', '/for-vendors'],
  ['/portfolio', '/guides/portfolio-sites'],
  ['/fraud', '/guides/hiring-fraud-tools'],
  ['/fake-candidates', '/guides/hiring-fraud-tools'],
  ['/job-scams', '/is-this-a-real-job'],
  ['/fake-jobs', '/is-this-a-real-job'],
  ['/scorecard', '/interview-scorecard'],
  ['/cost-per-hire', '/hiring-costs'],
  ['/interview', '/interview-practice'],
  ['/follow', '/who-to-follow'],
  ['/free', '/free-job-search'],
  ['/proof', '/show-how-you-work'],
].map(([source, destination]) => ({ source, destination, permanent: false }))

// Whole sections: anything left under these goes to the closest hub.
const RETIRED_PREFIXES = [
  { source: '/membership/:path*', destination: '/', permanent: false },
  { source: '/pro/:path*', destination: '/', permanent: false },
  { source: '/auth/:path*', destination: '/', permanent: false },
  { source: '/dashboard/:path*', destination: '/', permanent: false },
  { source: '/rank/:path*', destination: SEEKERS, permanent: false },
  { source: '/q/:path*', destination: SEEKERS, permanent: false },
  // One or more segments: /tools itself is the free tools page (Nov 15, 2026).
  { source: '/tools/:path+', destination: '/what-should-i-use', permanent: false },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // unpdf bundles a precompiled pdfjs build and works on Node + Edge +
  // Cloudflare Workers without a separate worker file. No external-package
  // hint required — kept clean to avoid bundling surprises.

  // Permanent 308 redirects for retired URLs. /membership was renamed
  // to /pro on 5/26 because "membership" no longer describes the offer
  // (we sell Pro, an upgrade tier, not a club). Any existing link
  // anywhere (search results, old emails, bookmarks, Stripe legacy
  // sessions, social posts) lands on /pro instead of 404'ing.
  async redirects() {
    return [...RENAMED, ...GUESSES, ...RETIRED, ...RETIRED_PREFIXES]
  },
}

export default nextConfig
