import type { Metadata } from 'next'
import { SeoContentPage } from '@/components/seo-content-page'

const CANONICAL = 'https://hiring.productions/q/resume-red-flags'

export const metadata: Metadata = {
  title: 'What Are Red Flags on a Resume? (The Real Ones in 2026)',
  description:
    "Most lists of resume red flags are stuck in 2010. Job hopping isn't a flag anymore. Here are the things that actually make recruiters in 2026 set a resume aside — and the things they don't care about.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: 'article',
    title: 'What Are Red Flags on a Resume?',
    description:
      'The actual things that disqualify a resume in 2026 — and the outdated ones that no longer matter.',
    url: CANONICAL,
  },
}

export default function ResumeRedFlagsPage() {
  return (
    <SeoContentPage
      badge="FOR CANDIDATES"
      badgeColor="indigo"
      headline="What Are Red Flags on a Resume?"
      intro="Most online lists of resume red flags are stuck in 2010. Job hopping isn't a deal-breaker anymore. Career gaps aren't either. Here's what actually makes a modern recruiter set a resume aside — and the supposed red flags they no longer care about."
      canonicalUrl={CANONICAL}
      sections={[
        {
          heading: 'The Real Red Flags in 2026',
          body: "Inconsistency between your resume and LinkedIn — different job titles, different dates, different companies on the same role. This is the single fastest way to get passed. Recruiters always check LinkedIn. If it doesn't match, the assumption is you're hiding something. Unexplained gaps WITHIN a role (e.g., 'Senior Manager, 2020-2024' with two years of unspecified absence in the middle) are worse than gaps between roles. Job titles that don't match the responsibilities described — a 'VP of Strategy' bullet list that reads like a Manager's day-to-day signals title inflation. Quantified claims that don't add up: 'grew revenue 300%' with no scale context. Generic language that could describe anyone in any role — recruiters read it as low-effort and assume the underlying work was the same.",
        },
        {
          heading: 'The Old Red Flags That No Longer Matter',
          body: "Job hopping is largely no longer a flag in 2026. Average tenure across industries has dropped to 2.5-3 years. Several short roles in a row with logical progression looks like a career, not a problem. Career gaps for caregiving, layoffs, education, or health are extremely common post-2020 and routinely accepted with a one-line acknowledgment. Non-traditional career paths — pivots, bootcamps, self-taught — get treated as normal background for many roles. The unprofessional email address debate is over: any reasonable address works (firstname.lastname@ variants are fine). And the one-page resume rule has loosened significantly for anyone with more than 8-10 years of experience.",
        },
        {
          heading: 'The Hidden Red Flags Candidates Cause Themselves',
          body: "Lying about something easily checked — degrees, employment dates, company names. Background checks catch this and the immediate consequence is rescinded offers, sometimes mid-process. Listing 'references available upon request' — wastes a line and signals you copy-pasted a template from 2005. Including a photo (in the US — different in some other countries). Using an objective statement instead of a summary. Reusing one resume across all applications — recruiters can tell within 10 seconds whether your materials are tailored. The tells: generic title alignment, exact same bullets across multiple postings on LinkedIn, summary that doesn't reference the role you're applying for.",
        },
        {
          heading: 'What Recruiters Actually Flag Internally',
          body: "When recruiters mark a resume for further review or for the 'maybe' pile, they're usually flagging one of these: unclear ownership in bullets (did you do the work or were you on the team?), suspicious metrics (the numbers are big but the scale of the company makes them impossible), gaps between LinkedIn-stated tenure and resume-stated tenure, and AI-generated polish on what's clearly a junior-level person's resume (the gap between writing quality and actual experience reads as a tell). These aren't auto-disqualifiers but they trigger deeper probing in the interview.",
        },
        {
          heading: 'How to Audit Your Own Resume for Red Flags',
          body: "Open your LinkedIn and your resume side by side. Every job title, company, and date should match exactly. If they don't, fix the resume to match LinkedIn (changing LinkedIn after applying looks worse). Read every bullet aloud and ask: could anyone in this role have written this exact line? If yes, rewrite it with specifics that only you could write — a specific tool, a specific number, a specific company outcome. Check your most recent role for unexplained gaps in responsibilities — anything implied as continuous should actually be continuous. The five-minute audit catches 80% of the flags recruiters see.",
        },
      ]}
      faqs={[
        {
          q: 'What are the biggest red flags on a resume in 2026?',
          a: "Inconsistencies between your resume and LinkedIn, unexplained gaps within a role (not between roles), job titles that don't match the work described, suspiciously round or impossibly large metrics, and generic language that could describe anyone in any role.",
        },
        {
          q: 'Is job hopping still a red flag?',
          a: "Largely not. Average tenure has dropped to 2.5-3 years across most industries. Recruiters in 2026 are more concerned with progression and the story than with strict tenure — several short roles with clear advancement reads as a career, not a problem.",
        },
        {
          q: 'Are employment gaps red flags?',
          a: 'No, in most cases. Gaps for caregiving, layoffs, education, health, or sabbatical are common and accepted with a brief, honest explanation. The exception is unexplained gaps WITHIN a role — those signal something that needs addressing.',
        },
        {
          q: 'Does my resume need to match my LinkedIn exactly?',
          a: "Yes — every job title, company name, and date should match. Recruiters always check LinkedIn during screening. Inconsistency is the fastest way to land in the 'maybe' or 'no' pile because the assumption is you're hiding or inflating something.",
        },
        {
          q: 'Should I include references on my resume?',
          a: "No, and don't write 'references available upon request' either. It wastes a line and signals you used an outdated template. Provide references when asked, typically late in the interview process.",
        },
        {
          q: 'Is putting a photo on a resume a red flag?',
          a: 'In the US, yes — recruiters are trained to avoid photos to reduce bias risk, and including one often means your resume gets passed because the company prefers not to handle it. In many European and Asian markets, a photo is expected. Follow the convention of where you\'re applying.',
        },
        {
          q: 'What does it mean if my application gets ghosted?',
          a: "Ghosting after applying usually means one of three things: your resume didn't pass the ATS filter, it passed the ATS but didn't survive the 7-second human scan, or the role was filled or paused. It rarely means the recruiter read your full resume and disliked it — that level of attention requires passing the earlier filters first.",
        },
      ]}
      insideLook={{
        name: "Your Resume, Through a Recruiter's Eyes",
        description:
          'See the actual recruiter monologue reading your resume — including which lines pass and which trigger flags.',
        href: '/tools/resume-recruiter-eyes',
        isFree: false,
      }}
      relatedLinks={[
        { label: 'What recruiters really think', href: '/what-recruiters-really-think' },
        { label: 'How to explain a gap on your resume', href: '/q/explain-resume-gap' },
        { label: 'What is the 7-second rule on a resume?', href: '/q/7-second-rule-resume' },
        { label: 'Is my resume good?', href: '/q/is-my-resume-good' },
      ]}
    />
  )
}
