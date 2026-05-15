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

/**
 * FAQ pairs used to generate FAQPage JSON-LD schema on each /rank/<role>
 * page. Google sometimes pulls these into rich-snippet result cards
 * ("People also ask"-style). The questions are real long-tail queries
 * recruiters' candidates actually search — each one is an additional
 * surface area for organic discovery.
 *
 * Per-role FAQ overrides are pulled in alongside the generic set when
 * a role has its own specific Q&A worth surfacing.
 */
export interface FaqPair {
  q: string
  a: string
}

export function defaultFaqsForRole(role: RoleConfig): FaqPair[] {
  const name = role.displayName
  const nameLower = name.toLowerCase()
  return [
    {
      q: `How do recruiters search LinkedIn for ${nameLower}s?`,
      a: `Recruiters running searches for ${nameLower}s in LinkedIn Recruiter typically type a boolean query like ${role.searchPhrase}, then layer on Skills filters and a location filter. The Keyword filter scans your entire profile for literal string matches — stop words are ignored. Profiles with the exact target title in the headline AND in the current-title field rank highest.`,
    },
    {
      q: `Why isn't my LinkedIn profile getting recruiter messages for ${nameLower} roles?`,
      a: `The three most common reasons: (1) your headline doesn't contain the literal target title in the first 60 characters that show in a recruiter's result-card view; (2) your current title is a non-employee category like "Founder" or "Consultant" which most boolean strings filter out; (3) your Skills section is missing 5-10 standalone entries recruiters explicitly filter on for this role.`,
    },
    {
      q: `How can I see exactly where I rank in LinkedIn recruiter searches?`,
      a: `Upload your LinkedIn profile PDF to hiring.productions' Recruiter Search Rank simulator. It runs the 5 boolean searches a recruiter for your target role would actually use, estimates your rank in each (calibrated to how LinkedIn's algorithm weights headline, current title, skills, About, experience, industry, location, Open-to-Work, and activity), and surfaces the 3 highest-leverage moves to climb. Free to try.`,
    },
    {
      q: `Does the "Open to Work" frame help or hurt for ${nameLower} roles?`,
      a: `Open-to-Work in "Recruiters Only" mode delivers a quiet boost in active-candidate Recruiter searches (about a 2x InMail rate per LinkedIn's own docs) without downsides. The "public green frame" version does help active-candidate searches but can quietly hurt at firms whose recruiters filter for passive candidates. For senior ${nameLower} roles where most hiring is passive sourcing, Recruiters-Only is usually the safer setting.`,
    },
    {
      q: `What's the difference between LinkedIn Recruiter and regular LinkedIn search?`,
      a: `LinkedIn Recruiter is the paid sourcing product recruiters use; it has stricter filters (Skills as hard filters, years-of-experience as a hard filter, location as a hard filter), Spotlights that pre-prioritize Open-to-Work and Active Talent candidates, and access to LinkedIn's full member graph. Regular LinkedIn search is keyword-based and limited to your network. When you optimize for recruiter visibility, you're optimizing for the Recruiter product, not consumer search.`,
    },
  ]
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
  // ============================================================
  // Expansion roles (added May 2026) — high-search-volume career
  // categories that complement the original 5. Each one targets a
  // distinct long-tail query and gives Stephanie's LinkedIn audience
  // a different landing page to link to when posting in different
  // role contexts. /rank/recruiter is intentionally meta — Stephanie's
  // own LinkedIn audience IS recruiters, so a page that lets them
  // run the simulator on themselves is high-affinity for organic
  // sharing.
  // ============================================================
  {
    slug: 'recruiter',
    displayName: 'Recruiter',
    defaultTargetRole: 'Senior Technical Recruiter at a tech company',
    question: 'Would another recruiter actually find you for a Recruiter role?',
    subhead:
      "You're on the hiring side. Now flip the lens. Upload your LinkedIn profile, see the 5 boolean searches a TA director would run for a senior recruiter — and where you actually rank.",
    searchPhrase: '("Technical Recruiter" OR "Senior Recruiter") AND (sourcing OR pipeline)',
    signals: [
      'Whether your headline contains "Recruiter" or "Technical Recruiter" as a literal phrase — TA hiring managers search exact-title strings and skip profiles that lead with "Talent Partner" or "People Connector" framing.',
      'Whether specific recruiting tools — LinkedIn Recruiter, Gem, Greenhouse, Lever, Ashby, Workday — appear as standalone Skills entries, not just inside experience bullets. TA leaders filter on these as discrete strings.',
      'Whether your About section names your function specialty (technical, executive, sales, clinical, GTM) and a domain (early-stage, growth-stage, public co.) — generalist "I love hiring great people" framing loses to a recruiter who picks a lane.',
    ],
    rankContext:
      "Recruiter search pools are smaller than engineering or product — typically 400–900 candidates per metro for senior IC recruiter roles. The first 25 results carry 80% of hiring-manager attention. Because TA leaders know the search game, they spot keyword stuffing instantly — calibration matters more than density for this role family.",
    seoTitle: 'Where do you rank when a TA director searches LinkedIn for a Recruiter? — hiring.productions',
    seoDescription:
      'For recruiters job-hunting: see the 5 boolean searches a TA director hiring senior recruiters would actually run, where you rank in each, and the 3 moves to climb. Built by an ex-Senior Director of TA. Free.',
  },
  {
    slug: 'customer-success-manager',
    displayName: 'Customer Success Manager',
    defaultTargetRole: 'Senior Customer Success Manager at a B2B SaaS',
    question: 'Would a recruiter actually find you for a Customer Success role?',
    subhead:
      'Upload your LinkedIn profile. See the 5 boolean searches a recruiter for a senior CSM role actually runs — and where you rank.',
    searchPhrase: '"Customer Success Manager" AND (B2B OR SaaS OR retention)',
    signals: [
      'Whether your headline contains "Customer Success Manager" or "Senior CSM" as a literal phrase — adjacent titles like "Account Manager" or "Client Partner" lose 40% of inbound CS search visibility.',
      'Whether the renewal/expansion/NRR vocabulary (gross retention, net retention, expansion ARR, QBRs, EBR) shows up in Skills AND in your most recent role description — recruiters filter on these as ICP signals.',
      'Whether you signal industry/customer type explicitly (mid-market SaaS, enterprise SaaS, healthcare tech, fintech) — generalist "I love helping customers succeed" framing erases the segment match that recruiters explicitly look for.',
    ],
    rankContext:
      'CSM hiring is high-volume — 1,200–2,400 candidates per metro for senior IC roles in 2026. Recruiters typically scan the first 30–50 results then re-filter. Specialization in either segment (SMB vs. mid-market vs. enterprise) or in expansion-led vs. retention-led CS is the fastest way to climb out of the generalist middle.',
    seoTitle: 'Where do you rank when a recruiter searches LinkedIn for a Customer Success Manager? — hiring.productions',
    seoDescription:
      "Upload your LinkedIn. See the 5 boolean searches a recruiter for a Senior CSM role actually runs, where you rank in each, and the moves to climb. Built by a senior TA director. Free.",
  },
  {
    slug: 'account-executive',
    displayName: 'Account Executive',
    defaultTargetRole: 'Senior Account Executive at a B2B SaaS',
    question: 'Would a recruiter actually find you for an Account Executive role?',
    subhead:
      'Upload your LinkedIn profile. See the 5 boolean searches a recruiter for an AE role actually runs — and where you rank in each.',
    searchPhrase: '"Account Executive" AND (SaaS OR mid-market OR enterprise)',
    signals: [
      'Whether your headline contains the literal title "Account Executive" plus a segment signal ("mid-market," "enterprise," "SMB") — sales recruiters filter on segment AS HARD as title.',
      'Whether quota/attainment numbers (e.g. "$1.2M ARR closed in 2025," "112% of plan," "$2.8M annual quota") appear in your most recent role description — recruiters skim the first three bullets specifically for numbers; if they see none in 6 seconds, they move on.',
      'Whether your sales motion (outbound prospecting, channel sales, expansion, land-and-expand) is named explicitly — generalist "drove revenue" claims lose to candidates who name the exact motion the hiring company runs.',
    ],
    rankContext:
      "AE hiring pools are among the largest on LinkedIn — 2,500–5,000 candidates per metro for senior roles. Recruiters use Spotlights heavily here; Open-to-Work + Active Talent profiles pre-sort to the top regardless of keyword match. Quota numbers in the role description carry near-headline weight for this role family because they're what recruiters validate first.",
    seoTitle: 'Where do you rank when a recruiter searches LinkedIn for an Account Executive? — hiring.productions',
    seoDescription:
      'Upload your LinkedIn. See the 5 boolean searches a recruiter for a Senior AE role actually runs, where you rank in each, and the moves to climb. Built by a senior TA director. Free.',
  },
  {
    slug: 'engineering-manager',
    displayName: 'Engineering Manager',
    defaultTargetRole: 'Senior Engineering Manager at a B2B SaaS',
    question: 'Would a recruiter actually find you for an Engineering Manager role?',
    subhead:
      'Upload your LinkedIn profile. See the 5 boolean searches a recruiter for an EM role actually runs — and your rank in each.',
    searchPhrase: '"Engineering Manager" AND (team OR "people management")',
    signals: [
      'Whether your headline contains "Engineering Manager" (or "Senior EM," "Director of Engineering") as a literal phrase — EM recruiters filter on title hard; "Tech Lead" or "Staff Engineer" alone misses every EM-titled search.',
      'Whether you signal both technical stack AND management scope (team size, reports, hiring) — EM searches typically AND a stack term WITH "people management" or "manager." Profiles strong on one and weak on the other fall mid-stack.',
      'Whether your most recent role description leads with management outcomes (hires made, retention numbers, on-call/incident reduction, delivery cadence) vs. IC technical work — recruiters reading the first three bullets are validating management depth, not coding range.',
    ],
    rankContext:
      "EM search pools per metro run 800–1,500 candidates for senior roles. The signal recruiters value most on the card view is team-size + tenure — they're looking for evidence you've actually managed managers (for senior EM) or managed a team of 5+ for 18+ months (for IC-EM transitions). Make those numbers scannable in your headline or first bullet.",
    seoTitle: 'Where do you rank when a recruiter searches LinkedIn for an Engineering Manager? — hiring.productions',
    seoDescription:
      "Upload your LinkedIn. See the 5 boolean searches a recruiter for a Senior EM role actually runs, where you rank in each, and the moves to climb. Built by a senior TA director. Free.",
  },
  {
    slug: 'product-marketing-manager',
    displayName: 'Product Marketing Manager',
    defaultTargetRole: 'Senior Product Marketing Manager at a B2B SaaS',
    question: 'Would a recruiter actually find you for a Product Marketing role?',
    subhead:
      'Upload your LinkedIn profile. See the 5 boolean searches a recruiter for a senior PMM role actually runs — and where you rank.',
    searchPhrase: '"Product Marketing Manager" AND (positioning OR GTM OR launch)',
    signals: [
      'Whether your headline contains the literal phrase "Product Marketing Manager" or "PMM" — recruiters search exact title and adjacent role titles ("Product Marketing Lead," "Senior PMM"). "Marketing Manager" alone misses these queries entirely.',
      'Whether you name your stage of the PMM function (positioning, launches, sales enablement, customer marketing) — recruiters filter on the function within product marketing, not just the title. A PMM strong at launches doesn\'t match a hiring need for sales enablement, and vice versa.',
      'Whether the launches you led are NAMED in your experience — "launched the Pro tier" or "led the API GA" lands differently than "drove product launches." Recruiters skim for proper nouns as proof of scope.',
    ],
    rankContext:
      "PMM hiring is medium-volume — 700–1,300 candidates per metro for senior roles. PMM is one of the most specialization-sensitive functions; recruiters often AND the title with a specific PMM sub-function. A profile that picks 1–2 sub-functions clearly will rank consistently higher than one positioned as a generalist 'product marketer who can do it all.'",
    seoTitle: 'Where do you rank when a recruiter searches LinkedIn for a Product Marketing Manager? — hiring.productions',
    seoDescription:
      "Upload your LinkedIn. See the 5 boolean searches a recruiter for a Senior PMM role actually runs, where you rank in each, and the moves to climb. Built by a senior TA director. Free.",
  },
]

export function roleBySlug(slug: string): RoleConfig | undefined {
  return RANK_ROLES.find((r) => r.slug === slug)
}
