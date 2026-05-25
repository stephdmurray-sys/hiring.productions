/**
 * Single source of truth for the tools catalog.
 *
 * Every page that lists tools should pull from here so the brand-name,
 * plain-English subtitle, free/Pro tier, and audience stay consistent
 * across homepage, /tools, /membership, /pricing, and tool-gate.
 */

export type ToolTier = 'free' | 'pro' | 'soon'
export type ToolAudience = 'candidate' | 'hiring'
export type ToolStage =
  | 'before-you-apply'
  | 'when-you-apply'
  | 'when-you-interview'
  | 'when-you-get-an-offer'
  | 'when-its-not-working'
  | 'before-you-post'
  | 'while-you-source'
  | 'while-you-interview'
  | 'when-you-extend'

/** Color theme used to give visual variety to the catalog grid */
export type ToolTheme =
  | 'indigo' // resume / AI tools — brand home base
  | 'blue' // LinkedIn tools — professional / familiar
  | 'coral' // interview / heat
  | 'emerald' // money / offer
  | 'magenta' // diagnostic / strategy / pressure
  | 'amber' // hiring team

/** Icon names — must match a lucide-react icon */
export type ToolIcon =
  | 'Eye'
  | 'Search'
  | 'Edit3'
  | 'MessageSquare'
  | 'HelpCircle'
  | 'Sparkles'
  | 'FileText'
  | 'Hash'
  | 'DollarSign'
  | 'AlertCircle'
  | 'Filter'
  | 'Target'
  | 'Building2'
  | 'MessageCircle'
  | 'BarChart3'
  | 'UserCheck'
  | 'Send'
  | 'CheckSquare'
  | 'Mic'
  | 'Mail'
  | 'Map'
  | 'Calendar'
  | 'Star'

export interface CatalogTool {
  /** Brand-voice name (the question or hook) */
  name: string
  /** Plain-English label so a new visitor instantly knows what it does */
  subtitle: string
  /** One short, scannable description in brand voice */
  desc: string
  /** Tier */
  tier: ToolTier
  /** Audience */
  audience: ToolAudience
  /** Stage in the candidate / hiring journey */
  stage: ToolStage
  /** Internal route or external URL */
  href: string
  /** Outcome-oriented CTA verb for the card */
  cta: string
  /** Visual preview type — drives the card illustration (legacy, optional) */
  preview: PreviewKind
  /** Color theme — drives card background tint, glow, and accent */
  theme: ToolTheme
  /** Big "wow" line shown prominently on featured cards */
  hook: string
  /** Lucide icon name for the card header */
  icon: ToolIcon
  /** Concrete one-line preview of what the tool actually returns.
   *  Surfaced on every ToolCard as a small accent line so visitors
   *  see WHAT they'll get back, not just what the tool DOES.
   *  Optional — tools without it gracefully omit the line. */
  getBack?: string
}

/**
 * Preview shape names. Each one maps to a small CSS-rendered illustration
 * that hints at what the tool's output looks like — much more useful than
 * a generic icon, no image assets required.
 */
export type PreviewKind =
  | 'recruiter-monologue'
  | 'boolean-string'
  | 'linkedin-rewrite'
  | 'interview-question'
  | 'question-decode'
  | 'jd-decode'
  | 'ai-score'
  | 'keyword-gap'
  | 'negotiation-script'
  | 'search-diagnosis'
  | 'culture-decode'
  | 'pitch-rewrite'
  | 'platform-rank'
  | 'ats-score'
  | 'jd-seo-score'
  | 'jd-mirror'
  | 'ai-candidate-flag'
  | 'evaluation-rubric'
  | 'interviewer-prep'
  | 'sourcing-string'
  | 'outreach-message'
  | 'process-audit'
  | 'day-one-plan'
  | 'offer-read'
  | 'gap-explainer'
  | 'new-grad-resume'
  | 'career-pivot'
  | 'scam-flags'
  | 'ghost-diagnosis'
  | 'chance-meter'

// =====================================================================
// CANDIDATE TOOLS
// =====================================================================

export const CATALOG: CatalogTool[] = [
  // --- FREE candidate tools (lead magnets / SEO entry points) -----------
  {
    name: 'Does My Resume Read as AI?',
    subtitle: 'AI Resume Detector',
    desc: 'See exactly which lines on your resume look AI-generated to a recruiter — and what to rewrite in your own voice.',
    tier: 'free',
    audience: 'candidate',
    stage: 'when-you-apply',
    href: '/resume',
    cta: 'Run my resume',
    preview: 'ai-score',
    theme: 'indigo',
    hook: '49% of recruiters auto-reject AI resumes.',
    icon: 'Sparkles',
    getBack: 'The exact lines that read AI-generated to a recruiter — and what to rewrite.',
  },
  {
    name: 'What This Job Actually Is',
    subtitle: 'Job Description Decoder',
    desc: 'Paste any job description. Get the recruiter’s read on what the role really means, the unstated requirements, and an honest verdict on whether to apply.',
    tier: 'free',
    audience: 'candidate',
    stage: 'before-you-apply',
    href: '/tools/what-this-job-is',
    cta: 'Decode the JD',
    preview: 'jd-decode',
    theme: 'magenta',
    hook: '“fast-paced” → understaffed.',
    icon: 'FileText',
    getBack: 'What the role really is. The unstated requirements. An honest verdict on whether to apply.',
  },
  {
    name: 'What Words Are Recruiters Searching For?',
    subtitle: 'Resume Keyword Scanner',
    desc: 'Paste your resume + a job description. See the exact keywords recruiters are searching for that aren’t on your page — and where to add them.',
    tier: 'free',
    audience: 'candidate',
    stage: 'when-you-apply',
    href: '/tools/keyword-gap',
    cta: 'Scan my resume',
    preview: 'keyword-gap',
    theme: 'indigo',
    hook: 'The 6 words missing from your resume.',
    icon: 'Hash',
    getBack: 'The exact keywords recruiters search for that aren’t on your resume — and where to add them.',
  },
  {
    name: 'How to Negotiate This Offer',
    subtitle: 'Salary Negotiation Script Builder',
    desc: 'Bring your offer + market data points. Get the exact script — opening line, response to “best offer,” the number to ask for.',
    tier: 'free',
    audience: 'candidate',
    stage: 'when-you-get-an-offer',
    href: '/tools/what-youre-worth',
    cta: 'Build my script',
    preview: 'negotiation-script',
    theme: 'emerald',
    hook: 'The exact words to ask for more.',
    icon: 'DollarSign',
    getBack: 'The opening line. The response to “best offer.” The exact number to ask for.',
  },
  {
    name: 'What’s Breaking Your Job Search',
    subtitle: 'Job Search Diagnostic',
    desc: 'Tell us about your search. Get one specific diagnosis from real recruiting practice — not five maybes — and the single 48-hour fix to start with.',
    tier: 'free',
    audience: 'candidate',
    stage: 'when-its-not-working',
    href: '/tools/whats-breaking-search',
    cta: 'Diagnose my search',
    preview: 'search-diagnosis',
    theme: 'magenta',
    hook: 'One diagnosis. One 48-hour fix.',
    icon: 'AlertCircle',
    getBack: 'One specific diagnosis from real recruiting practice — plus the single 48-hour fix to start with.',
  },
  {
    name: 'How to Explain My Employment Gap',
    subtitle: 'Employment Gap Explainer',
    desc: 'Tell us when the gap happened and what you were actually doing. Get three honest scripts — resume one-liner, cover letter version, interview answer — written in your voice.',
    tier: 'free',
    audience: 'candidate',
    stage: 'when-its-not-working',
    href: '/tools/explain-my-gap',
    cta: 'Build my scripts',
    preview: 'gap-explainer',
    theme: 'magenta',
    hook: 'Three ways to tell it true.',
    icon: 'MessageCircle',
  },
  {
    name: 'Your New Grad Resume',
    subtitle: 'New Grad Resume Builder',
    desc: 'For when you have no traditional experience. Section-by-section guidance plus real example bullets adapted to your degree, projects, and target role.',
    tier: 'free',
    audience: 'candidate',
    stage: 'when-you-apply',
    href: '/tools/new-grad-resume',
    cta: 'Build my resume',
    preview: 'new-grad-resume',
    theme: 'emerald',
    hook: 'What hiring managers want from new grads.',
    icon: 'FileText',
  },
  {
    name: 'Your Career Pivot, Translated',
    subtitle: 'Career Change Resume Translator',
    desc: 'Paste your bullets from your old field plus your target role. Get rewritten bullets that translate your transferable skills into the language of the new industry.',
    tier: 'free',
    audience: 'candidate',
    stage: 'before-you-apply',
    href: '/tools/career-pivot',
    cta: 'Translate my experience',
    preview: 'career-pivot',
    theme: 'blue',
    hook: 'Your past isn’t a liability. It’s positioning.',
    icon: 'Edit3',
  },
  {
    name: 'Is This Job Posting a Scam?',
    subtitle: 'Scam Posting Detector',
    desc: 'Paste any suspicious posting. Get a verdict, the specific red flags, the green flags that suggest it’s real, and exactly what to do next.',
    tier: 'free',
    audience: 'candidate',
    stage: 'before-you-apply',
    href: '/tools/scam-check',
    cta: 'Check this posting',
    preview: 'scam-flags',
    theme: 'coral',
    hook: 'Real jobs don’t text you on Telegram.',
    icon: 'AlertCircle',
  },
  {
    name: 'Have I Been Ghosted?',
    subtitle: 'Recruiter Silence Decoder',
    desc: 'Tell us where you are in their process and how long it’s been. Get an honest read on whether you’re ghosted, what’s actually happening on their side, and the follow-up to send.',
    tier: 'free',
    audience: 'candidate',
    stage: 'when-its-not-working',
    href: '/tools/ghosted',
    cta: 'Decode the silence',
    preview: 'ghost-diagnosis',
    theme: 'magenta',
    hook: 'Silence isn’t always rejection. Sometimes it’s bureaucracy.',
    icon: 'Mail',
  },

  // --- PRO 5 (the flagship Recruiter Insights) --------------------------
  {
    name: 'Through a Recruiter’s Eyes',
    subtitle: 'Recruiter Resume Read',
    desc: 'Hear what a recruiter actually thinks of your resume in the first six seconds. Line by line. The call they make at 0:06.',
    tier: 'pro',
    audience: 'candidate',
    stage: 'when-you-apply',
    href: '/tools/resume-recruiter-eyes',
    cta: 'Hear the read',
    preview: 'recruiter-monologue',
    theme: 'indigo',
    hook: '6 seconds. Out loud.',
    icon: 'Eye',
    getBack: 'The recruiter’s internal monologue in the first six seconds. Three lines that would screen you in.',
  },
  {
    name: 'Would a Recruiter Even Find You?',
    subtitle: 'LinkedIn Boolean Visibility Check',
    desc: 'The exact boolean string a recruiter pastes into LinkedIn Recruiter to find candidates like you — and the precise reason your profile doesn’t surface.',
    tier: 'pro',
    audience: 'candidate',
    stage: 'before-you-apply',
    href: '/tools/recruiter-find-you',
    cta: 'Test my visibility',
    preview: 'boolean-string',
    theme: 'blue',
    hook: 'The boolean string that finds — or hides — you.',
    icon: 'Search',
  },
  {
    name: 'Where Do You Rank in a Recruiter Search?',
    subtitle: 'LinkedIn Recruiter Search Ranking Simulator',
    desc: 'Drop your LinkedIn profile PDF. See the 5 boolean searches a recruiter would actually run for your target role — and your estimated rank in each. Plus the 3 highest-leverage moves to climb, ranked by impact across all five.',
    tier: 'pro',
    audience: 'candidate',
    stage: 'before-you-apply',
    href: '/tools/recruiter-search-rank',
    cta: 'Run my visibility check',
    preview: 'boolean-string',
    theme: 'blue',
    hook: '5 recruiter searches. Your rank in each one.',
    icon: 'Search',
    getBack: 'The 5 boolean searches a recruiter would run. Your rank in each. The 3 moves that climb the most positions.',
  },
  {
    name: 'What Are My Chances?',
    subtitle: 'Application Odds Calculator',
    desc: 'Drop your resume. Paste the job. See the honest percentage chance you’d get an interview — calibrated against how recruiters actually screen this exact stack — and the 3 highest-impact lifts that would move it.',
    tier: 'pro',
    audience: 'candidate',
    stage: 'when-you-apply',
    href: '/tools/what-are-my-chances',
    cta: 'See my chances',
    preview: 'chance-meter',
    theme: 'indigo',
    hook: 'The honest percentage. Before you apply.',
    icon: 'BarChart3',
    getBack: 'Your honest % chance of an interview. The 3 highest-impact lifts that move it.',
  },
  {
    name: 'Questions This Resume Invites',
    subtitle: 'Resume → Interview Question Map',
    desc: 'Paste a resume — yours or a candidate’s. Get the 8 questions an interviewer will probe on, what each is testing for, and the answer pattern that lands.',
    tier: 'pro',
    audience: 'candidate',
    stage: 'when-you-interview',
    href: '/tools/questions-this-resume-invites',
    cta: 'Map the questions',
    preview: 'interview-question',
    theme: 'magenta',
    hook: 'Eight questions. Eight signals. One resume.',
    icon: 'HelpCircle',
    getBack: 'Eight resume-specific interview questions, what each is testing for, and the strong-answer pattern for each.',
  },
  {
    name: 'Your LinkedIn — Rewritten',
    subtitle: 'Full LinkedIn Profile Rewrite',
    desc: 'Three headline options. A full About rewrite. Every recent role rewritten for impact. Tuned to the searches that matter.',
    tier: 'pro',
    audience: 'candidate',
    stage: 'before-you-apply',
    href: '/tools/linkedin-rewrite',
    cta: 'Rewrite mine',
    preview: 'linkedin-rewrite',
    theme: 'blue',
    hook: 'Headline. About. Roles. Rewritten.',
    icon: 'Edit3',
    getBack: 'Three headline options. A full About rewrite. Every recent role — sharpened for the searches that matter.',
  },
  {
    name: 'The Rehearsal Room',
    subtitle: 'AI Interview Question Generator',
    desc: 'Ten interview questions calibrated to your target role. What the interviewer is really assessing. The line that lands the answer.',
    tier: 'pro',
    audience: 'candidate',
    stage: 'when-you-interview',
    href: '/tools/rehearsal-room',
    cta: 'Generate my prep',
    preview: 'interview-question',
    theme: 'coral',
    hook: '10 questions. Calibrated to you.',
    icon: 'Mic',
    getBack: 'Ten interview questions calibrated to your role + level. What each is testing for. The answer that lands.',
  },
  {
    name: 'What They’re Really Asking',
    subtitle: 'Interview Question Decoder',
    desc: 'Decode any interview question. The competency the interviewer is actually assessing. The trap most candidates fall into. The opening line that signals you understood.',
    tier: 'pro',
    audience: 'candidate',
    stage: 'when-you-interview',
    href: '/tools/what-theyre-asking',
    cta: 'Decode it',
    preview: 'question-decode',
    theme: 'coral',
    hook: 'The real question underneath the question.',
    icon: 'HelpCircle',
    getBack: 'Each interview question decoded — what they’re really asking, the weak answer, the answer that lands.',
  },

  // --- PRO extras (also included with membership) ----------------------
  {
    name: 'Would Your Resume Even Make It Through?',
    subtitle: 'ATS Screening Check',
    desc: 'See if your resume passes the automated screen — what the ATS catches, what it misses, and three specific fixes to make it through.',
    tier: 'pro',
    audience: 'candidate',
    stage: 'when-you-apply',
    href: '/tools/ats-reality',
    cta: 'Run the check',
    preview: 'ats-score',
    theme: 'indigo',
    hook: 'Pass the bots. Reach the human.',
    icon: 'Filter',
  },
  {
    name: 'Where You Actually Have a Shot at Interviews',
    subtitle: 'Platform Response Rate Analyzer',
    desc: 'Real data on which job platforms get responses for candidates like you. A platform strategy instead of spray-and-pray.',
    tier: 'pro',
    audience: 'candidate',
    stage: 'when-you-apply',
    href: '/tools/where-you-have-a-shot',
    cta: 'Show me where',
    preview: 'platform-rank',
    theme: 'magenta',
    hook: 'Stop spraying. Start landing.',
    icon: 'Target',
  },
  {
    name: 'What This Company Feels Like to Work At',
    subtitle: 'Culture Decoder',
    desc: 'Paste any company’s About page or careers copy. Get a plain-English read on what their culture actually means in practice — who thrives, who leaves.',
    tier: 'pro',
    audience: 'candidate',
    stage: 'before-you-apply',
    href: '/tools/culture-decoder',
    cta: 'Decode the culture',
    preview: 'culture-decode',
    theme: 'magenta',
    hook: '“family” → late-night Slack.',
    icon: 'Building2',
  },
  {
    name: 'How You Actually Come Across',
    subtitle: '“Tell Me About Yourself” Rewrite',
    desc: 'Write how you’d describe yourself. Get an honest assessment of how it lands plus three rewrites — interview, networking, LinkedIn DM.',
    tier: 'pro',
    audience: 'candidate',
    stage: 'when-you-interview',
    href: '/tools/how-you-come-across',
    cta: 'Rewrite my pitch',
    preview: 'pitch-rewrite',
    theme: 'coral',
    hook: 'Three rewrites. Same you. Sharper.',
    icon: 'MessageCircle',
  },

  // =====================================================================
  // HIRING TEAM TOOLS
  // =====================================================================

  // --- FREE for hiring teams ------------------------------------------
  // JD SEO Scorecard is marked 'soon' until a real Next page is built —
  // the legacy public/jd-seo-score.html was deleted because it still
  // used the killed "Inside Looks" product name. Catalog entry stays so
  // the hiring-team waitlist surface knows it's coming.
  {
    name: 'Is Your Job Even Being Seen?',
    subtitle: 'JD SEO Scorecard',
    desc: 'Score your job description across every major platform candidates actually use. See exactly why your posting isn’t performing.',
    tier: 'soon',
    audience: 'hiring',
    stage: 'before-you-post',
    href: '/tools',
    cta: 'On the way',
    preview: 'jd-seo-score',
    theme: 'amber',
    hook: 'Score your JD across every platform.',
    icon: 'BarChart3',
  },

  // --- PRO for hiring teams (placeholders; mark as "soon" if not built)
  {
    name: 'Your Job Post, Through Candidate Eyes',
    subtitle: 'JD Reverse-Read',
    desc: 'See your job description the way a strong candidate reads it — and exactly why they click away.',
    tier: 'pro',
    audience: 'hiring',
    stage: 'before-you-post',
    href: '/tools/jd-candidate-eyes',
    cta: 'Read it through candidate eyes',
    preview: 'jd-mirror',
    theme: 'amber',
    hook: 'See why strong candidates click away.',
    icon: 'Eye',
  },
  {
    name: 'Is This Even a Real Candidate?',
    subtitle: 'AI Application Detector',
    desc: 'Paste any application. See whether it’s human-authored or AI-generated, and exactly what flagged it.',
    tier: 'pro',
    audience: 'hiring',
    stage: 'while-you-source',
    href: '/tools/real-candidate',
    cta: 'Run the check',
    preview: 'ai-candidate-flag',
    theme: 'coral',
    hook: 'Human, or AI? Know in seconds.',
    icon: 'UserCheck',
  },
  {
    name: 'The Search String That Finds Your Candidate',
    subtitle: 'Boolean Search Builder for Recruiters',
    desc: 'Generate the exact boolean string to paste into LinkedIn Recruiter, Indeed, and Google to surface your ideal hire.',
    tier: 'pro',
    audience: 'hiring',
    stage: 'while-you-source',
    href: '/tools/boolean-builder',
    cta: 'Build my search strings',
    preview: 'sourcing-string',
    theme: 'amber',
    hook: 'Boolean ready to paste.',
    icon: 'Search',
  },
  {
    name: 'How to Reach Out Without Being Ignored',
    subtitle: 'Candidate Outreach Composer',
    desc: 'Messages that actually get responses — not the templated openers everyone archives.',
    tier: 'pro',
    audience: 'hiring',
    stage: 'while-you-source',
    href: '/tools/candidate-outreach',
    cta: 'Write the message',
    preview: 'outreach-message',
    theme: 'amber',
    hook: 'Messages they actually open.',
    icon: 'Send',
  },
  {
    name: 'Triage 200 Applicants in 30 Seconds',
    subtitle: 'Applicant Triage Heatmap',
    desc: 'Paste a JD and up to 10 candidate resumes. Get a ranked shortlist with AI-likelihood flags, top-3 reasons per candidate, and a clean interview/maybe/reject call.',
    tier: 'pro',
    audience: 'hiring',
    stage: 'while-you-source',
    href: '/tools/applicant-triage',
    cta: 'Triage my queue',
    preview: 'platform-rank',
    theme: 'coral',
    hook: 'From 200 applications to 12 interviews.',
    icon: 'BarChart3',
  },
  {
    name: 'What Range Do I Have to Post?',
    subtitle: 'Pay Range Compliance Generator',
    desc: 'Tell us the role and the states it covers. Get a defensible posted range, the per-state compliance notes, and copy-paste disclosure language for each jurisdiction.',
    tier: 'pro',
    audience: 'hiring',
    stage: 'before-you-post',
    href: '/tools/pay-range-compliance',
    cta: 'Build my pay disclosure',
    preview: 'jd-seo-score',
    theme: 'emerald',
    hook: '17 states require it. Get it right once.',
    icon: 'DollarSign',
  },
  {
    name: 'Win Them Against the Big-Name Offer',
    subtitle: 'Offer Pitch Builder',
    desc: 'They have a competing offer from a name brand. You can\'t match the comp. Build the pitch that wins them anyway — scope, autonomy, equity, the call that closes the deal.',
    tier: 'pro',
    audience: 'hiring',
    stage: 'when-you-extend',
    href: '/tools/offer-pitch',
    cta: 'Build my offer pitch',
    preview: 'negotiation-script',
    theme: 'emerald',
    hook: 'Beat the brand-name offer without matching comp.',
    icon: 'Star',
  },
  {
    name: 'Is Your AI Hiring Vendor Going to Get You Sued?',
    subtitle: 'AI Hiring Vendor Compliance Scanner',
    desc: 'NYC Local Law 144 enforcement is live. CA/NJ/IL legislation is in flight. Get a plain-English risk readout on any AI hiring vendor you use, with the exact questions to ask them before you renew.',
    tier: 'pro',
    audience: 'hiring',
    stage: 'while-you-source',
    href: '/tools/ai-vendor-compliance',
    cta: 'Scan my vendor',
    preview: 'ats-score',
    theme: 'coral',
    hook: 'The bias audit clock is running.',
    icon: 'AlertCircle',
  },
  {
    name: 'The Rejection Email That Doesn\'t Burn the Bridge',
    subtitle: 'Stage-Aware Rejection Email Writer',
    desc: 'Drop in the candidate context and what stage they reached. Get a stage-appropriate rejection — short, specific, kind, signed. Auto-reject through final round.',
    tier: 'pro',
    audience: 'hiring',
    stage: 'while-you-interview',
    href: '/tools/rejection-email',
    cta: 'Write the rejection',
    preview: 'outreach-message',
    theme: 'amber',
    hook: 'No more ghosting. No more burning bridges.',
    icon: 'Mail',
  },
  {
    name: 'What You’re Actually Evaluating',
    subtitle: 'Structured Interview Scorecard',
    desc: 'A structured scorecard that reduces gut-feel decisions and surfaces what actually matters for the role.',
    tier: 'pro',
    audience: 'hiring',
    stage: 'while-you-interview',
    href: '/tools/what-youre-evaluating',
    cta: 'Build the scorecard',
    preview: 'evaluation-rubric',
    theme: 'amber',
    hook: 'Replace gut-feel with signal.',
    icon: 'CheckSquare',
  },
  {
    name: 'Are Your Interviewers Even Ready?',
    subtitle: 'Interviewer Prep Guide',
    desc: 'A prep guide that stops you losing your best candidates to bad interviewers.',
    tier: 'pro',
    audience: 'hiring',
    stage: 'while-you-interview',
    href: '/tools/interviewers-ready',
    cta: 'Build the prep guide',
    preview: 'interviewer-prep',
    theme: 'amber',
    hook: 'Stop losing best candidates to bad interviews.',
    icon: 'MessageSquare',
  },
  {
    name: 'How Your Offer Actually Lands',
    subtitle: 'Offer Letter Reverse-Read',
    desc: 'See how your offer letter reads to a candidate with two competing offers on the table.',
    tier: 'soon',
    audience: 'hiring',
    stage: 'when-you-extend',
    href: '/tools/offer-lands',
    cta: 'Coming soon',
    preview: 'offer-read',
    theme: 'emerald',
    hook: 'How your offer reads against two others.',
    icon: 'Mail',
  },
  {
    name: 'Your Hiring Process, From the Outside',
    subtitle: 'Candidate Experience Audit',
    desc: 'Every step of your process through a candidate’s eyes — where strong ones drop out, and why.',
    tier: 'soon',
    audience: 'hiring',
    stage: 'while-you-interview',
    href: '/tools/hiring-process-outside',
    cta: 'Coming soon',
    preview: 'process-audit',
    theme: 'amber',
    hook: 'Where the strong ones drop out.',
    icon: 'Map',
  },
  {
    name: 'What Day One Actually Looks Like',
    subtitle: 'Onboarding Plan Reverse-Read',
    desc: 'See your onboarding the way a new hire experiences it — and where they form an early opinion that sticks.',
    tier: 'soon',
    audience: 'hiring',
    stage: 'when-you-extend',
    href: '/tools/day-one',
    cta: 'Coming soon',
    preview: 'day-one-plan',
    theme: 'amber',
    hook: 'The early read that sticks.',
    icon: 'Calendar',
  },
]

// Convenience filters
export const FREE_TOOLS = CATALOG.filter((t) => t.tier === 'free')
export const PRO_TOOLS = CATALOG.filter((t) => t.tier === 'pro')
export const SOON_TOOLS = CATALOG.filter((t) => t.tier === 'soon')
export const CANDIDATE_TOOLS = CATALOG.filter((t) => t.audience === 'candidate')
export const HIRING_TOOLS = CATALOG.filter((t) => t.audience === 'hiring')

/** The 5 flagship Pro tools (the ones featured in the upsell card) */
export const FLAGSHIP_PRO = [
  'Through a Recruiter’s Eyes',
  'Would a Recruiter Even Find You?',
  'Your LinkedIn — Rewritten',
  'The Rehearsal Room',
  'What They’re Really Asking',
] as const
