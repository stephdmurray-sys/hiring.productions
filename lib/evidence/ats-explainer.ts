/**
 * Sources for /how-ats-actually-works (rebuilt Nov 15, 2026). Every line on
 * that page that states a fact comes from here, and every entry was read on
 * the source page itself on Nov 15, 2026 (quotes copied, not paraphrased into
 * something stronger). The Ladders and Harvard Business School findings live
 * in recommend.json, where the picker already uses them.
 *
 * Read on the page's own terms:
 * - Enhancv sells a resume builder, and its study is 25 interviews. The page
 *   says both.
 * - Columns and tables: the evidence disagrees. Greenhouse lists both as
 *   causes of a partial read; RChilli (a parser) says tables are fine; The
 *   Conversation's authors say modern systems read both. The page says so.
 */

export interface Source {
  source: string
  date: string
  url: string
}

const S = <T extends Source>(s: T) => s

export const CHECKED = '2026-11-15'

/** Where the 75% figure came from. */
export const MYTH = {
  claim: 'of resumes are rejected by software before a person sees them',
  origin: S({
    source: 'The Conversation, by researchers at Mount Royal University and the University of Calgary',
    date: 'July 5, 2026',
    url: 'https://theconversation.com/what-everyone-gets-wrong-about-the-modern-job-search-and-what-actually-works-285582',
    // "The statistic originated from a 2012 sales pitch by Preptel, a resume optimization company that went out of business the following year. No methodology was ever published"
  }),
  traced: S({
    source: 'Christine Assaf, HRTact',
    date: 'October 5, 2020',
    url: 'https://hrtact.com/2020/10/05/your-job-application-was-rejected-by-a-human-not-a-computer/',
    // "Preptel ... went out of business in August 2013" / "there's no concrete source data, or research to even back up the statement"
  }),
  survey: S({
    source: 'Enhancv, 25 interviews with US recruiters, September to October 2025',
    date: 'November 3, 2025',
    url: 'https://enhancv.com/blog/does-ats-reject-resumes/',
    // "Of those recruiters, 23 (92%) said their systems do not auto-reject resumes for formatting, content, or design."
    // "Only 2 of 25 recruiters (8%) said their ATS automatically rejects applicants for reasons other than knockout questions."
  }),
  rules: S({
    source: 'Greenhouse, What really happens after you apply',
    date: 'January 8, 2025',
    url: 'https://my.greenhouse.com/blogs/what-really-happens-after-you-apply-for-a-job',
    // "these filters are set and controlled directly by recruiters" / "Over 50% of roles are set to send you an email if your application is auto-rejected."
  }),
}

/** Knockout questions, with an example each from a system's own help page. */
export const KNOCKOUTS: { kind: string; example: string; from: Source; answer: string }[] = [
  {
    kind: 'Work authorization and sponsorship',
    example: 'Are you legally allowed to work in this country?',
    from: MYTH.rules,
    answer: 'Answer for the country the job is in. If a question asks about sponsorship now or in the future, count the future.',
  },
  {
    kind: 'Where you live',
    example: 'Are you based in the UK?',
    from: S({ source: 'Workable Help, Auto-disqualify candidates', date: 'read November 15, 2026', url: 'https://help.workable.com/hc/en-us/articles/115012238688-Auto-disqualify-candidates-using-application-form-questions' }),
    answer: 'Answer for where you live today. If the job is remote, check which states or countries it covers before you apply.',
  },
  {
    kind: 'Relocation',
    example: 'Are you willing to relocate?',
    from: S({ source: 'Greenhouse Support, Auto-Reject for prospect post', date: 'read November 15, 2026', url: 'https://support.greenhouse.io/hc/en-us/articles/360029081512-Auto-Reject-for-prospect-post' }),
    answer: 'Say yes only if you would move for this job. A no ends the application in systems set up this way.',
  },
  {
    kind: 'Licenses and certifications',
    example: 'Do you have a Class A Commercial Driver’s License?',
    from: S({ source: 'Greenhouse Support, Auto-reject', date: 'read November 15, 2026', url: 'https://support.greenhouse.io/hc/en-us/articles/360000653472-Auto-reject' }),
    answer: 'Yes means you hold it today. If yours is in progress, answer no and put the date you expect it on your resume.',
  },
  {
    kind: 'Years of experience',
    example: 'A certain number of years of experience',
    from: S({ source: 'Lever, ATS myths', date: 'updated October 15, 2026', url: 'https://www.lever.co/blog/applicant-tracking-system-myths-debunked' }),
    answer: 'Count the years you did that work at any job, the way the posting describes it. Don’t round up.',
  },
]

/** The help pages showing employers set these rules up. */
export const KNOCKOUT_DOCS: Source[] = [
  { source: 'Greenhouse Support', date: 'read November 15, 2026', url: 'https://support.greenhouse.io/hc/en-us/articles/203105595-Application-rules-overview' },
  { source: 'Workable Help', date: 'read November 15, 2026', url: KNOCKOUTS[1].from.url },
  { source: 'Ashby Knowledge Base', date: 'read November 15, 2026', url: 'https://docs.ashbyhq.com/auto-reject-applications' },
  { source: 'Workday Admin Guide', date: 'read November 15, 2026', url: 'https://doc.workday.com/admin-guide/en-us/human-capital-management/recruiting/candidates/prospect-and-candidate-management/uwd1485375819245.html' },
]

/** Workable: "the candidate does not know that they have been disqualified". */
export const SILENT = KNOCKOUT_DOCS[1]

/** What causes a partial read, and the fix. */
const GH_PARSE = S({ source: 'Greenhouse Support, Unsuccessful resume parse', date: 'updated March 2, 2026', url: 'https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse' })
const RCHILLI = S({ source: 'RChilli, a resume parser', date: 'updated August 30, 2024', url: 'https://www.rchilli.com/blog/tips-for-creating-perfect-resumes' })
const UGA = S({ source: 'University of Georgia Career Center', date: 'updated April 2, 2024', url: 'https://career.uga.edu/news/beating_the_robots' })

export const PARSING: { breaks: string; fix: string; note?: string; from: Source[] }[] = [
  {
    breaks: 'Your name and contact details in the page header, footer or a text box',
    fix: 'Put them in the body of the page, as the first lines.',
    from: [GH_PARSE, RCHILLI],
  },
  {
    breaks: 'A scan or a photo of your resume',
    fix: 'Export it straight from Word or Google Docs, as a .docx or a PDF.',
    from: [GH_PARSE, RCHILLI],
  },
  {
    breaks: 'Two columns',
    fix: 'One column, top to bottom.',
    from: [GH_PARSE, UGA],
  },
  {
    breaks: 'Tables',
    fix: 'Plain lines for each job and its dates.',
    note: 'Systems disagree here: RChilli says tables read fine, and Greenhouse lists them as a cause of a partial read.',
    from: [GH_PARSE, RCHILLI],
  },
  {
    breaks: 'Section names you made up, like “Academic Achievements” for your education',
    fix: 'Use the names everyone uses: Experience, Education, Skills, Certifications.',
    from: [UGA],
  },
]

export const PARSE_RESULT = GH_PARSE // "a partial resume parse that will need to be manually corrected and verified"

/** Some researchers say newer systems read columns and tables. */
export const PARSE_COUNTER = MYTH.origin // "modern ATS can extract information from common resume layouts, including columns or tables"

/** Volume, search and sort. */
export const QUEUE = {
  perJob: { now: 95, then: 28, thenYear: 2021 },
  volume: S({
    source: 'Greenhouse customer data from August 2025, in Recruiters are overloaded',
    date: 'October 2, 2025',
    url: 'https://www.greenhouse.com/blog/hiring-pipeline-overload',
  }),
  search: S({
    source: 'Greenhouse Support, Search resumes for keywords',
    date: 'read November 15, 2026',
    url: 'https://support.greenhouse.io/hc/en-us/articles/115004600186-Search-resumes-for-keywords',
  }),
  sort: S({
    source: 'Greenhouse Support, Talent Matching',
    date: 'read November 15, 2026',
    url: 'https://support.greenhouse.io/hc/en-us/articles/41396009937307-Talent-Matching',
    // "Candidates are grouped by match score and ordered by application date within each group." / "It does not automatically advance or reject candidates."
  }),
  stop: {
    quote: 'If we find strong candidates there, we’ll probably start interviewing before we even look at the rest.',
    who: 'A recruiter in consumer goods, interviewed by Enhancv',
    from: MYTH.survey,
  },
}

/** Free checkers that aren't in our rankings, from their own pages, read Nov 15, 2026. */
export const NO_ACCOUNT_CHECKERS: { id: string; name: string; domain: string; url: string; free: string; from: Source }[] = [
  {
    id: 'tripleten',
    name: 'TripleTen ATS resume checker',
    domain: 'tripleten.com',
    url: 'https://tripleten.com/tools/ats-resume-checker/',
    free: 'Paste a job listing and your resume to get a score with matched and missing keywords. No account, and your resume is read in your browser.',
    from: { source: 'TripleTen', date: 'read November 15, 2026', url: 'https://tripleten.com/tools/ats-resume-checker/' },
  },
  {
    id: 'hackajob',
    name: 'hackajob resume checker',
    domain: 'hackajob.com',
    url: 'https://resume-checker.tools.hackajob.com/',
    free: 'Upload a PDF or Word file for a score against any job. No sign-up, and the file is discarded after the check.',
    from: { source: 'hackajob', date: 'updated October 23, 2026', url: 'https://resume-checker.tools.hackajob.com/' },
  },
]

export const SKILLSYNCER = {
  id: 'skillsyncer',
  name: 'SkillSyncer',
  domain: 'skillsyncer.com',
  url: 'https://skillsyncer.com/',
  free: '2 job match scans a week, free with an account.',
  paid: 'Premium is $14.95 a month, or $34.86 a quarter.',
  from: { source: 'SkillSyncer pricing page', date: 'read November 15, 2026', url: 'https://skillsyncer.com/pricing' },
}

/** Every source on the page, for the structured data. */
export function allSources(): Source[] {
  const seen = new Map<string, Source>()
  const add = (s: Source) => seen.set(s.url, s)
  ;[MYTH.origin, MYTH.traced, MYTH.survey, MYTH.rules, ...KNOCKOUT_DOCS, ...KNOCKOUTS.map((k) => k.from), ...PARSING.flatMap((p) => p.from), QUEUE.volume, QUEUE.search, QUEUE.sort, SKILLSYNCER.from, ...NO_ACCOUNT_CHECKERS.map((c) => c.from)].forEach(add)
  return [...seen.values()]
}
