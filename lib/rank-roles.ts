/**
 * Role-specific SEO landing-page configs.
 *
 * Each entry below produces a static page at /rank/<slug> that's a
 * tighter, more searchable version of the homepage — same wedge tool,
 * but the H1 is the exact question a candidate in that role would
 * Google. The keyword targets are reverse-engineered from the queries
 * recruiters actually run for these roles on LinkedIn Recruiter, so
 * each page is BOTH the SEO hook and an honest preview of what the
 * tool will produce when the user runs it.
 *
 * Pages are pre-rendered at build time via generateStaticParams in
 * /app/rank/[role]/page.tsx, get added to the sitemap, and pre-fill
 * the targetRole field on the simulator via ?role= so a Google
 * visitor lands → clicks once → runs.
 */

export interface RoleConfig {
  /** URL slug under /rank/ */
  slug: string
  /** Display name, capitalized as-it-appears in headlines */
  displayName: string
  /** Default targetRole value pre-filled on the simulator */
  defaultTargetRole: string
  /** Lead question — the H1 */
  question: string
  /** One-sentence subhead that puts the role in context */
  subhead: string
  /** The actual phrase recruiters search for in this category */
  searchPhrase: string
  /** 3 role-specific signals LinkedIn weights for this search */
  signals: string[]
  /** What "good rank" vs "bad rank" looks like for this role */
  rankContext: string
  /** SEO <title> */
  seoTitle: string
  /** SEO <meta description> */
  seoDescription: string
}

export const RANK_ROLES: RoleConfig[] = [
  {
    slug: 'product-manager',
    displayName: 'Product Manager',
    defaultTargetRole: 'Senior Product Manager at a B2B SaaS',
    question: 'Would a recruiter actually find you for a Product Manager role?',
    subhead:
      'Upload your LinkedIn profile. See the 5 boolean searches a recruiter for a PM role actually runs — and your estimated rank in each.',
    searchPhrase: '"Product Manager" AND SaaS',
    signals: [
      'Whether your headline contains the literal phrase "Product Manager" (recruiters search exact titles, not synonyms — "Senior PM" alone misses the most common queries).',
      'Whether your current title at your most recent role reads "Product Manager," "Senior Product Manager," or "Lead PM" — vs. "Founder," "Consultant," or a custom title that drops you out of standard searches entirely.',
      'Whether your Skills section literally lists the tools and frameworks recruiters filter on — SQL, Mixpanel, Amplitude, Figma, Jira, A/B testing, roadmap — vs. only mentioning them buried in bullets.',
    ],
    rankContext:
      'For PM roles, recruiters in 2026 are searching pools of 800–1,500 candidates per metro. A strong rank is top-30. Below #80 you are functionally invisible — recruiters rarely scroll past the first three result pages.',
    seoTitle: 'Where do you rank when a recruiter searches LinkedIn for a Product Manager? — hiring.productions',
    seoDescription:
      'Upload your LinkedIn. See the 5 boolean searches a recruiter for a Product Manager role actually runs, where you rank in each, and the 3 moves to climb. Built by a senior TA director. Free.',
  },
  {
    slug: 'software-engineer',
    displayName: 'Software Engineer',
    defaultTargetRole: 'Senior Software Engineer at a B2B SaaS',
    question: 'Would a recruiter actually find you for a Software Engineer role?',
    subhead:
      'Upload your LinkedIn profile. See the 5 boolean searches a recruiter sourcing engineers actually runs — and your estimated rank in each.',
    searchPhrase: '"Software Engineer" AND (Go OR Python OR TypeScript)',
    signals: [
      'Whether your stack appears as literal strings in Skills (TypeScript, Python, Go, Rust, Kubernetes) — recruiters filter Skills exactly, so a profile that buries the stack in bullets matches nothing.',
      'Seniority signaling — "Senior" or "Staff" in your title vs. just "Software Engineer," which gets lumped into the mid-level pool and downranked for senior reqs.',
      'Domain keywords (distributed systems, ML infrastructure, payments, low-latency) — engineering recruiters often filter on a domain term ON TOP of language filters to find the right fit. Domain has to appear in your headline or About to count.',
    ],
    rankContext:
      'Engineering search pools are large — 2,000–5,000 candidates per major metro. Recruiters look at the top 20–40 results in a search and then refine. Below rank #50 you are essentially never seen, no matter how strong your background is.',
    seoTitle: 'Where do you rank when a recruiter searches LinkedIn for a Software Engineer? — hiring.productions',
    seoDescription:
      'Upload your LinkedIn. See the 5 boolean searches a recruiter for a Software Engineer role actually runs, where you rank in each, and the exact moves to climb. Built by a senior TA director. Free.',
  },
  {
    slug: 'designer',
    displayName: 'Designer',
    defaultTargetRole: 'Senior Product Designer at a B2B SaaS',
    question: 'Would a recruiter actually find you for a Design role?',
    subhead:
      'Upload your LinkedIn profile. See the 5 boolean searches a recruiter for a design role actually runs — and your estimated rank in each.',
    searchPhrase: '"Product Designer" AND (Figma OR "design systems")',
    signals: [
      'Whether your title is "Product Designer," "UX Designer," or "Senior Designer" — most recruiters filter on the literal title. "Multidisciplinary creative" or "Design Lead" without the discipline word loses 60-80% of inbound search visibility.',
      'Whether Figma, design systems, prototyping, and your specialty (B2B, consumer, mobile, etc.) appear as Skills, not just inside experience bullets.',
      'Whether your About section names a specific design problem you have shipped through (onboarding, search, dashboards, checkout) — design recruiters increasingly filter on problem-space keywords on top of tool keywords.',
    ],
    rankContext:
      'Design search pools per metro run smaller than engineering — 600–1,200 candidates. The first 25 results carry 80% of recruiter attention. Below #60 your profile is essentially never opened.',
    seoTitle: 'Where do you rank when a recruiter searches LinkedIn for a Designer? — hiring.productions',
    seoDescription:
      'Upload your LinkedIn. See the 5 boolean searches a recruiter for a Product Designer role actually runs, where you rank in each, and the moves to climb. Built by a senior TA director. Free.',
  },
  {
    slug: 'marketer',
    displayName: 'Marketer',
    defaultTargetRole: 'Senior Marketing Manager at a B2B SaaS',
    question: 'Would a recruiter actually find you for a Marketing role?',
    subhead:
      'Upload your LinkedIn profile. See the 5 boolean searches a recruiter for a marketing role actually runs — and your estimated rank in each.',
    searchPhrase: '"Growth Marketing" AND B2B AND SaaS',
    signals: [
      'Whether your headline contains a specific marketing function — "Growth Marketing," "Demand Generation," "Product Marketing," "Content Strategy" — vs. the catch-all "Marketing Manager," which dilutes you against thousands of competitors.',
      'Whether B2B vs. B2C is explicit in your profile. Marketing recruiters filter on this hard. A B2B SaaS marketing role won\'t surface a profile that reads as consumer.',
      'Whether your Skills include the specific channels and tools recruiters search on — HubSpot, Marketo, Salesforce, paid social, SEO, content — as discrete entries, not just mentioned in role descriptions.',
    ],
    rankContext:
      'Marketing search pools are crowded — 1,000–2,500 candidates per metro for senior roles. Specialization shows up in your rank quickly: a generalist "marketing leader" profile typically lands #80–#150. A specialist profile with the right Skills and headline can land #15–#40.',
    seoTitle: 'Where do you rank when a recruiter searches LinkedIn for a Marketer? — hiring.productions',
    seoDescription:
      'Upload your LinkedIn. See the 5 boolean searches a recruiter for a marketing role actually runs, where you rank in each, and the moves to climb. Built by a senior TA director. Free.',
  },
  {
    slug: 'data-analyst',
    displayName: 'Data Analyst',
    defaultTargetRole: 'Senior Data Analyst at a B2B SaaS',
    question: 'Would a recruiter actually find you for a Data role?',
    subhead:
      'Upload your LinkedIn profile. See the 5 boolean searches a recruiter for a data role actually runs — and your estimated rank in each.',
    searchPhrase: '"Data Analyst" AND SQL AND (Tableau OR Looker)',
    signals: [
      'Whether SQL, Python, dbt, Snowflake, Tableau, Looker appear in your Skills as exact entries — data recruiters filter Skills as hard requirements, not preferences.',
      'Whether your title is "Data Analyst," "Senior Data Analyst," or "Analytics Engineer" — adjacent titles like "Business Intelligence Lead" or "Insights Manager" miss the most common queries by ~40%.',
      'Whether your About or recent role mentions the domain you work in (revenue, marketing, product, finance) — recruiters often pair the tooling filter with a domain term, and the domain has to be visible in the right field.',
    ],
    rankContext:
      'Data role search pools are growing fast — 800–1,800 candidates per metro for analyst roles, smaller for engineering-side data roles. Recruiters look at the first 30 results most carefully. Profiles missing the standard tooling vocabulary land #100+ even when the actual experience is strong.',
    seoTitle: 'Where do you rank when a recruiter searches LinkedIn for a Data Analyst? — hiring.productions',
    seoDescription:
      'Upload your LinkedIn. See the 5 boolean searches a recruiter for a Data Analyst role actually runs, where you rank in each, and the moves to climb. Built by a senior TA director. Free.',
  },
]

export function roleBySlug(slug: string): RoleConfig | undefined {
  return RANK_ROLES.find((r) => r.slug === slug)
}
