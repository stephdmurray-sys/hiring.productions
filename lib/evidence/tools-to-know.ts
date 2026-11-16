/**
 * Tools to know (Nov 16, 2026 value audit): the top options in categories we
 * can't score yet, so no picker answer or free tool page ends with nothing to
 * use. Plain facts only, each from the tool's own page or a public listing,
 * read on the date given. No scores: a tool needs 25 public reviews before
 * the site scores it, and review counts here are shown only as read.
 * Every `go` id needs a destination in app/go/[partner]/route.ts.
 * Research notes: scratchpad research-a/b/c (Nov 16, 2026).
 */
export interface KnowTool {
  /** /go/{id} */
  go: string
  name: string
  domain: string
  /** A short tag under the name, like "Free, from the US Department of Labor". */
  tag?: string
  line: string
  /** What's free, as the tool's own page says it. Left out where the page doesn't say. */
  free?: string
  paid?: string
  /** Public reviews, platform by platform, as read. */
  reviews?: string
  /** Button text when "Go to {name}" doesn't read right (a help page, a directory). */
  cta?: string
  /** A catch from the tool's own pages: billing, refunds, privacy. */
  watch?: string
  src: { label: string; url: string; date: string }
}

export interface KnowSet {
  /** The kit heading on a picker answer. */
  k: string
  /** One line under the heading. */
  note?: string
  tools: KnowTool[]
}

const READ = 'read November 16, 2026'

/** Free career exploration, for "I'm not sure what to apply for". */
const CAREERS: KnowTool[] = [
  {
    go: 'my-next-move',
    name: 'O*NET Interest Profiler',
    domain: 'mynextmove.org',
    tag: 'Free, from the US Department of Labor',
    line: '30 questions about the work you like, linked to more than 900 careers with their tasks, skills and pay. Takes about 10 to 20 minutes.',
    free: 'All of it.',
    src: { label: 'O*NET Resource Center', url: 'https://www.onetcenter.org/IP.html', date: READ },
  },
  {
    go: 'my-next-move-vets',
    name: 'My Next Move for Veterans',
    domain: 'mynextmove.org',
    tag: 'Free, from the US Department of Labor',
    line: 'Enter your military job, and it suggests civilian careers with similar work.',
    src: { label: 'My Next Move for Veterans', url: 'https://www.mynextmove.org/vets/', date: READ },
  },
  {
    go: 'truity-career',
    name: 'Truity Career Personality Profiler',
    domain: 'truity.com',
    line: 'A 94-question career test that takes about 10 to 15 minutes.',
    free: 'Your basic results, and you don’t need to give an email.',
    paid: 'A full report for a fee. The price isn’t shown on the test page.',
    src: { label: 'Truity', url: 'https://www.truity.com/test/career-personality-profiler-test', date: READ },
  },
]

/**
 * Practice answering out loud, for "I get nervous". Live "stealth" answer tools
 * (Final Round AI, Interview Sidekick) are left out on purpose: they're built to
 * feed answers during a real interview, which the fraud tools page treats as a
 * threat. Google Interview Warmup now redirects to an article (retired).
 */
const PRACTICE: KnowTool[] = [
  {
    go: 'huru',
    name: 'Huru',
    domain: 'huru.ai',
    line: 'Answer real interview questions out loud on video, or talk with an AI interviewer, and get a score on every answer.',
    free: 'Every feature, for job seekers.',
    reviews: 'Apple App Store: 4.6 out of 5 from 107 ratings. Chrome extension: 3.6 out of 5 from 17 ratings.',
    watch: 'The app links the audio and video you record to you.',
    src: { label: 'Huru', url: 'https://huru.ai/', date: READ },
  },
  {
    go: 'yoodli',
    name: 'Yoodli',
    domain: 'yoodli.ai',
    line: 'Practice interview answers out loud with an AI coach that gives you feedback.',
    free: '5 practice sessions, for good.',
    paid: 'Pro is $8 a month, billed annually, with up to 10 sessions a week.',
    watch: 'On the free and Pro plans, your sessions may be used to improve the product, and there are no refunds when you cancel.',
    src: { label: 'Yoodli pricing', url: 'https://yoodli.ai/pricing', date: READ },
  },
  {
    go: 'big-interview',
    name: 'Big Interview',
    domain: 'biginterview.com',
    line: 'A structured interview course with practice tools.',
    paid: '$39 for 30 days, $99 for 3 months, or $299 once for lifetime access, with a full refund if you don’t see results within 30 days.',
    watch: 'No free plan, and plans renew until you cancel in your account.',
    src: { label: 'Big Interview pricing', url: 'https://www.biginterview.com/pricing/personal', date: READ },
  },
]

/** Mock interviews with real people, for final rounds. */
const MOCKS: KnowTool[] = [
  {
    go: 'aced-practice',
    name: 'Aced Practice',
    domain: 'aced.io',
    tag: 'What Pramp became. Mostly tech, plus behavioral and product sessions',
    line: 'Mock interviews with another person, taking turns as interviewer and candidate.',
    free: 'Monthly credits for peer mock interviews.',
    paid: 'Membership adds unlimited mock interviews and AI feedback. The price isn’t on a page we could read.',
    watch: 'Membership renews automatically. Refunds are within 5 days of purchase.',
    src: { label: 'Aced', url: 'https://www.aced.io/practice', date: READ },
  },
  {
    go: 'interviewing-io',
    name: 'interviewing.io',
    domain: 'interviewing.io',
    tag: 'Engineers only',
    line: 'Mock interviews on coding, algorithms and systems design, by voice with no video.',
    free: 'An AI interviewer.',
    paid: 'From $179 per interview with a person, with a full refund if you’re unhappy.',
    src: { label: 'interviewing.io FAQ', url: 'https://interviewing.io/faq', date: READ },
  },
]

/** Free ways to check a posting, a recruiter or a company. */
export const JOB_CHECKS: KnowTool[] = [
  {
    go: 'bbb-scam-tracker',
    name: 'BBB Scam Tracker',
    domain: 'bbb.org',
    line: 'Search reported scams by the phone number, website, email or business name in the posting. BBB reviews each report before it’s published.',
    src: { label: 'BBB Scam Tracker', url: 'https://www.bbb.org/scamtracker', date: READ },
  },
  {
    go: 'linkedin-job-verification',
    name: 'LinkedIn’s verification badge',
    domain: 'linkedin.com',
    cta: 'Read LinkedIn’s help page',
    line: 'A badge on a job post means the company page is verified and the person who posted it has verified they work there. Not every job has one yet, and a missing badge doesn’t mean it’s fake.',
    src: { label: 'LinkedIn Help', url: 'https://www.linkedin.com/help/linkedin/answer/a1492056', date: READ },
  },
  {
    go: 'icann-lookup',
    name: 'ICANN Lookup',
    domain: 'icann.org',
    line: 'Look up the registration data for the domain in a recruiter’s email address or the company’s website. Some personal details may be hidden for privacy.',
    free: 'A free public service since 2013.',
    src: { label: 'ICANN', url: 'https://www.icann.org/en/blogs/details/updated-lookup-tool-for-domain-name-registration-data-now-available-29-7-2019-en', date: READ },
  },
  {
    go: 'nass-business-registries',
    name: 'State business registries',
    domain: 'nass.org',
    cta: 'Find your state’s registry',
    line: 'Pick the state, then search its business registry to see whether the company is registered there.',
    src: { label: 'National Association of Secretaries of State', url: 'https://www.nass.org/business-services/corporate-registration', date: READ },
  },
]

/** Sourcing, for "the right people aren't applying". */
const SOURCING: KnowTool[] = [
  {
    go: 'linkedin-free-job-post',
    name: 'LinkedIn free job post',
    domain: 'linkedin.com',
    line: 'Post one job for free. It shows in LinkedIn search results and to your connections.',
    free: 'One open job post at a time.',
    paid: 'Promote it on a daily budget you set: $10 a day for 30 days costs $300 or less.',
    src: { label: 'LinkedIn Hiring Pro pricing', url: 'https://business.linkedin.com/hire/hiring-pro/pricing', date: READ },
  },
  {
    go: 'linkedin-recruiter-lite',
    name: 'LinkedIn Recruiter Lite',
    domain: 'linkedin.com',
    tag: 'For a few hires a year',
    line: 'Search LinkedIn for people who haven’t applied and message them, with 30 InMail messages a month across your first, second and third degree network.',
    free: 'A free trial.',
    paid: 'LinkedIn’s page doesn’t show the price.',
    src: { label: 'LinkedIn Recruiter Lite', url: 'https://business.linkedin.com/hire/recruiter-lite', date: READ },
  },
  {
    go: 'gem',
    name: 'Gem',
    domain: 'gem.com',
    line: 'AI sourcing across more than 800 million profiles.',
    free: 'Under 30 employees: six months free, then 50% off a paid plan.',
    paid: '30 to 100 employees get reduced rates without a sales call. Larger teams get custom pricing.',
    src: { label: 'Gem pricing', url: 'https://www.gem.com/pricing', date: READ },
  },
  {
    go: 'hireez',
    name: 'hireEZ',
    domain: 'hireez.com',
    line: 'Finds candidates’ emails, phone numbers and social links from their profiles.',
    reviews: 'Chrome extension: 4.4 out of 5 from 69 ratings.',
    src: { label: 'Chrome Web Store', url: 'https://chromewebstore.google.com/detail/hireez-for-chrome-find-an/jeablngoapekimaeoeclgcefdcpjhjcg', date: READ },
  },
]

/** Interview consistency, for "every interviewer asks something different" and the scorecard page. */
export const INTERVIEW_CONSISTENCY: KnowTool[] = [
  {
    go: 'ashby',
    name: 'Ashby',
    domain: 'ashbyhq.com',
    tag: 'Built into the applicant tracking system',
    line: 'Interview plans for each stage, with set instructions for interviewers and the same feedback form for every candidate.',
    free: 'Its AI notetaker comes with 500 interviews to try at no extra cost.',
    paid: '$400 a month for up to 100 employees, 10% off with an annual plan.',
    src: { label: 'Ashby pricing', url: 'https://www.ashbyhq.com/pricing', date: READ },
  },
  {
    go: 'greenhouse',
    name: 'Greenhouse',
    domain: 'greenhouse.com',
    tag: 'Built into the applicant tracking system',
    line: 'Structured interview kits and scorecards, plus an AI notetaker, in its Core plan.',
    paid: 'Quote only.',
    src: { label: 'Greenhouse pricing', url: 'https://www.greenhouse.com/pricing', date: READ },
  },
  {
    go: 'metaview',
    name: 'Metaview',
    domain: 'metaview.ai',
    line: 'Takes interview notes and fills in the scorecard in your applicant tracking system.',
    free: 'You can start for free.',
    reviews: 'Chrome extension: 5 out of 5 from 22 ratings.',
    src: { label: 'Chrome Web Store', url: 'https://chromewebstore.google.com/detail/metaview/aomhdoacekemkclcefjpplppefjfnlka', date: READ },
  },
  {
    go: 'brighthire',
    name: 'BrightHire',
    domain: 'brighthire.com',
    tag: 'Now part of Zoom',
    line: 'AI interview notes you can move into your scorecard in one click.',
    reviews: 'Chrome extension: 4.5 out of 5 from 8 ratings.',
    src: { label: 'Chrome Web Store', url: 'https://chromewebstore.google.com/detail/brighthire/mbokiighkhdopgedihndpibkincpcgan', date: READ },
  },
]

/**
 * Other ways to see how someone works, beside RepVera (Stephanie, Nov 16, 2026: "ok add the tools").
 * Review counts from Capterra; Capterra's own price fields are left out where they disagree with the vendor.
 * SkillSurvey couldn't be checked (its site redirects to icims.com, which is blocked).
 */
export const SEE_HOW: KnowSet[] = [
  {
    k: 'Skills tests and work samples',
    note: 'See them do a sample of the work before you meet.',
    tools: [
      {
        go: 'testgorilla',
        name: 'TestGorilla',
        domain: 'testgorilla.com',
        line: 'Skills tests to screen candidates before you meet them.',
        free: '10 credits a month and 5 essential skills tests, with unlimited use.',
        paid: 'Core from $215 a month, billed annually.',
        reviews: 'Capterra: 4.1 out of 5 from 267 reviews.',
        watch: 'Fees aren’t refundable, credits expire at the end of the term, and plans renew automatically.',
        src: { label: 'TestGorilla pricing and terms', url: 'https://www.testgorilla.com/pricing/', date: READ },
      },
      {
        go: 'codesignal',
        name: 'CodeSignal',
        domain: 'codesignal.com',
        tag: 'For engineering roles',
        line: 'Coding assessments. Its Build plan is made for small teams making their first technical hires.',
        paid: '$79 a month billed annually, or $99 billed monthly.',
        reviews: 'Capterra: 4.6 out of 5 from 49 reviews.',
        watch: 'No free trial, and extra credits cost $20 each.',
        src: { label: 'CodeSignal pricing', url: 'https://codesignal.com/pricing/', date: READ },
      },
      {
        go: 'vervoe',
        name: 'Vervoe',
        domain: 'vervoe.com',
        tag: 'Built for higher-volume hiring',
        line: 'Skills assessments that show how candidates do real work.',
        paid: 'Quote only.',
        reviews: 'Capterra: 4.5 out of 5 from 66 reviews.',
        src: { label: 'Vervoe pricing', url: 'https://vervoe.com/pricing/', date: READ },
      },
    ],
  },
  {
    k: 'Reference check tools',
    note: 'Structured surveys sent to the references a candidate names.',
    tools: [
      {
        go: 'crosschq',
        name: 'Crosschq',
        domain: 'crosschq.com',
        line: 'Structured reference checks, with more than 135 role-specific survey templates.',
        paid: 'Quote only.',
        reviews: 'Capterra: 4.9 out of 5 from 15 reviews.',
        src: { label: 'Crosschq', url: 'https://www.crosschq.com/platform/reference-checks', date: READ },
      },
      {
        go: 'checkster',
        name: 'Checkster by Harver',
        domain: 'harver.com',
        line: 'The candidate enters their references, and each one gets a short survey they can finish in about 2 minutes on a phone.',
        paid: 'Quote only.',
        src: { label: 'Harver', url: 'https://harver.com/software/reference-checking/', date: READ },
      },
    ],
  },
]

/** Background checks before an offer, with the federal steps. */
export const BACKGROUND_CHECKS: KnowTool[] = [
  {
    go: 'checkr',
    name: 'Checkr',
    domain: 'checkr.com',
    line: 'Background checks you order one report at a time, from a basic criminal search up to county, state and federal searches.',
    paid: 'From $29.99, $59.99 or $94.99 a report, by package.',
    reviews: 'Capterra: 4.5 out of 5 from 308 reviews.',
    watch: 'Court and database fees can be added, passed through at cost.',
    src: { label: 'Checkr pricing', url: 'https://checkr.com/pricing', date: READ },
  },
  {
    go: 'goodhire',
    name: 'GoodHire',
    domain: 'goodhire.com',
    tag: 'A Checkr company, with the same package prices',
    line: 'Background checks in three packages: Basic, Essential and Complete.',
    paid: 'From $29.99, $59.99 or $94.99 a check.',
    reviews: 'Capterra: 4.8 out of 5 from 117 reviews.',
    watch: 'Third-party fees may apply.',
    src: { label: 'GoodHire pricing', url: 'https://www.goodhire.com/pricing/', date: READ },
  },
  {
    go: 'hireright',
    name: 'HireRight',
    domain: 'hireright.com',
    line: 'Background screening with a focus on compliance.',
    paid: 'Quote only.',
    reviews: 'Capterra: 3.8 out of 5 from 23 reviews.',
    src: { label: 'HireRight pricing', url: 'https://www.hireright.com/pricing', date: READ },
  },
]

/** Recruiter training, from our own training guide (data verified on each provider's page, Aug 23, 2026). */
const GUIDE = { label: 'Our recruiter training guide', url: '/guides/best-recruiter-training', date: 'checked August 23, 2026' }
const TRAINING: KnowTool[] = [
  {
    go: 'airs',
    name: 'AIRS Recruiter Academy',
    domain: 'airsdirectory.com',
    tag: 'Recruiter training pick',
    line: 'The industry-standard credential set since 1997, now owned by ADP: 16 certifications, with SHRM and HRCI credits included.',
    paid: 'OnDemand $1,995, Premium $2,495, or single certifications from $895.',
    src: GUIDE,
  },
  {
    go: 'sourcecon',
    name: 'SourceCon Academy',
    domain: 'eretraining.com',
    tag: 'Sourcing pick',
    line: 'The deepest pure-sourcing curriculum, from the community that invented the discipline.',
    free: 'A 5-day free trial.',
    paid: '$995 a year, or $495 for one quarter.',
    src: GUIDE,
  },
  {
    go: 'socialtalent',
    name: 'SocialTalent',
    domain: 'socialtalent.com',
    line: 'Self-paced training built for corporate recruiting teams learning together.',
    paid: 'From €1,095 for teams.',
    src: GUIDE,
  },
  {
    go: 'skillpanel',
    name: 'SkillPanel Tech Recruitment Certification',
    domain: 'skillpanel.com',
    line: 'A self-paced foundation in tech recruiting.',
    free: 'All of it.',
    src: GUIDE,
  },
]

/** By picker problem id. */
export { PRACTICE, MOCKS }

export const TOOLS_TO_KNOW: Record<string, KnowSet> = {
  'what-to-apply-for': {
    k: 'Free tools to find roles that fit',
    note: 'They match what you like doing to real jobs, so you have a short list to try. Each one is free to start.',
    tools: CAREERS,
  },
  'interview-practice': {
    k: 'Practice tools to know',
    note: 'Too few public reviews to score most of them yet. Here’s what each one does, what’s free and the catch, from their own pages.',
    tools: PRACTICE,
  },
  'interviews-stall': {
    k: 'Mock interviews to know',
    note: 'Practice with a person, or out loud with feedback. Here’s what each one does and what’s free, from their own pages.',
    tools: [...MOCKS, PRACTICE[0]],
  },
  training: {
    k: 'The top programs from our training guide',
    note: 'Ranked in the guide by our practitioner score. Here’s what each costs, from their own pages.',
    tools: TRAINING,
  },
  'cant-find-people': {
    k: 'Sourcing tools to know',
    note: 'Too few public reviews to score any of them yet. Here’s what each one does and what’s free, from their own pages.',
    tools: SOURCING,
  },
  'interviews-inconsistent': {
    k: 'Tools to know',
    note: 'Too few public reviews to score these yet. Two are built into an applicant tracking system, and two take notes in the one you have.',
    tools: INTERVIEW_CONSISTENCY,
  },
}
