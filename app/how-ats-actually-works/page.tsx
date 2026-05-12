import type { Metadata } from 'next'
import { SeoContentPage } from '@/components/seo-content-page'

const CANONICAL = 'https://hiring.productions/how-ats-actually-works'

export const metadata: Metadata = {
  title: 'How ATS Actually Works — And Why Your Resume Disappears',
  description:
    "Over 90% of large employers run resumes through an ATS first. Here's what the system actually checks, why most applications never reach a human, and how to pass.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: 'article',
    title: 'How ATS Actually Works — And Why Your Resume Disappears',
    description:
      'The recruiter-side read on what ATS systems actually check, and the formatting + keyword fixes that get you past the filter.',
    url: CANONICAL,
  },
}

export default function HowATSActuallyWorksPage() {
  return (
    <SeoContentPage
      badge="FOR CANDIDATES"
      badgeColor="indigo"
      headline="How ATS Actually Works — And Why Your Resume Disappears"
      intro="You hit Apply. Your resume vanishes into the void. No response. No rejection. Just silence. Here's what's actually happening — and why most candidates never find out."
      canonicalUrl={CANONICAL}
      sections={[
        {
          heading: 'What ATS Actually Is',
          body: "An Applicant Tracking System is software that companies use to collect, sort, and filter job applications before a human sees them. Over 90% of large employers use one. When you apply online, your resume goes into the ATS first — not into a recruiter's inbox. The system parses your resume, extracts information, and scores it against the job requirements. If your score is too low, you never make it to the next stage. A human never reads your application. You get no notification. You just wait.",
        },
        {
          heading: 'What ATS Is Actually Looking For',
          body: "Every ATS is configured differently, but they're all looking for the same basic signals: keyword match between your resume and the job description, job titles that align with what they're searching for, tenure and employment gaps, education credentials if specified as required, and formatting that the system can actually parse — which means no tables, no columns, no headers and footers, no graphics. The single most important factor is keyword matching. If the job description says 'talent acquisition' and your resume says 'recruiting,' you might score lower than someone who used the exact same phrase.",
        },
        {
          heading: 'What Kills Your Application Before Anyone Reads It',
          body: "Three things cause immediate ATS failure more than anything else: First, formatting that can't be parsed — two-column layouts, text boxes, tables, and fancy headers look great to humans but break ATS parsing. Second, using different language than the job description — ATS systems match words, not concepts. Third, missing exact keywords — if the job requires 'Greenhouse' experience and you write 'ATS experience,' it doesn't count. The fix is simpler than most people think: a clean single-column format, language that mirrors the job description, and specific tool and platform names spelled exactly as written in the posting.",
        },
        {
          heading: 'The One Thing Most Candidates Get Wrong',
          body: "Most candidates optimize their resume for the human reader. They write for clarity, narrative flow, and personality. These are all good instincts — for the 30% of companies that don't use ATS heavily. For the other 70%, you need to pass the robot first before a human ever decides whether they like how you've told your story. The candidates who get responses consistently do both: they write a clean, ATS-parseable document with precise keyword matching, and they make it genuinely compelling once a human opens it. That's not a contradiction. It's the game.",
        },
      ]}
      faqs={[
        {
          q: 'Do all companies use an ATS?',
          a: 'Most do. Over 90% of Fortune 500 companies and the majority of mid-market employers run an ATS. Some startups under 50 employees and a few very specific industries (creative agencies, executive search) still review resumes manually, but assume yours will hit an ATS first.',
        },
        {
          q: 'What ATS score is considered good?',
          a: "ATS systems don't all use the same scoring model — Workday, Greenhouse, Lever, and Taleo each work differently. As a rough benchmark, third-party ATS scoring tools usually flag 75%+ as competitive, 60-75% as needing work, and under 60% as unlikely to reach a human reviewer.",
        },
        {
          q: 'Does formatting really matter for ATS?',
          a: 'Yes, enormously. Two-column layouts, text boxes, tables, headers/footers, and graphics break ATS parsing — meaning the system reads your resume as garbled text and scores accordingly. A clean single-column document in a standard font (Calibri, Arial, Times) with section headers as plain text consistently outperforms anything fancier.',
        },
        {
          q: 'Should I copy keywords from the job description exactly?',
          a: "Yes, when the language fits naturally. ATS systems match on exact strings, not concepts. If the JD says 'talent acquisition' and you've been doing exactly that work, write 'talent acquisition' — not 'recruiting,' not 'hiring management.' Stuffing irrelevant keywords backfires once a human reads it, but mirroring the JD's actual vocabulary is the single highest-leverage move.",
        },
        {
          q: 'Can I see my ATS score before I apply?',
          a: "Not directly — companies don't expose their internal scoring. But you can run your resume against the job description with a third-party tool to estimate the match. Hiring.productions' ATS Reality Check shows what the system likely sees, which keywords are missing, and the three specific fixes to make before you hit Apply.",
        },
      ]}
      insideLook={{
        name: 'Would Your Resume Even Make It Through?',
        description:
          'Get your ATS score, missing keywords, and top 3 fixes before your next application.',
        href: '/tools/ats-reality',
        isFree: false,
      }}
      relatedLinks={[
        { label: 'How to beat an ATS', href: '/q/how-to-beat-ats' },
        { label: 'What are red flags on a resume?', href: '/q/resume-red-flags' },
        { label: "Why am I not getting responses?", href: '/q/why-am-i-not-getting-responses' },
      ]}
    />
  )
}
