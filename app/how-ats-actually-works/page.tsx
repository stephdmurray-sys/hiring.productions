'use client'

import { SeoContentPage } from '@/components/seo-content-page'

export default function HowATSActuallyWorksPage() {
  return (
    <SeoContentPage
      badge="FOR CANDIDATES"
      badgeColor="indigo"
      headline="How ATS Actually Works — And Why Your Resume Disappears"
      intro="You hit Apply. Your resume vanishes into the void. No response. No rejection. Just silence. Here's what's actually happening — and why most candidates never find out."
      sections={[
        {
          heading: "What ATS Actually Is",
          body: "An Applicant Tracking System is software that companies use to collect, sort, and filter job applications before a human sees them. Over 90% of large employers use one. When you apply online, your resume goes into the ATS first — not into a recruiter's inbox. The system parses your resume, extracts information, and scores it against the job requirements. If your score is too low, you never make it to the next stage. A human never reads your application. You get no notification. You just wait."
        },
        {
          heading: "What ATS Is Actually Looking For",
          body: "Every ATS is configured differently, but they're all looking for the same basic signals: keyword match between your resume and the job description, job titles that align with what they're searching for, tenure and employment gaps, education credentials if specified as required, and formatting that the system can actually parse — which means no tables, no columns, no headers and footers, no graphics. The single most important factor is keyword matching. If the job description says 'talent acquisition' and your resume says 'recruiting,' you might score lower than someone who used the exact same phrase."
        },
        {
          heading: "What Kills Your Application Before Anyone Reads It",
          body: "Three things cause immediate ATS failure more than anything else: First, formatting that can't be parsed — two-column layouts, text boxes, tables, and fancy headers look great to humans but break ATS parsing. Second, using different language than the job description — ATS systems match words, not concepts. Third, missing exact keywords — if the job requires 'Greenhouse' experience and you write 'ATS experience,' it doesn't count. The fix is simpler than most people think: a clean single-column format, language that mirrors the job description, and specific tool and platform names spelled exactly as written in the posting."
        },
        {
          heading: "The One Thing Most Candidates Get Wrong",
          body: "Most candidates optimize their resume for the human reader. They write for clarity, narrative flow, and personality. These are all good instincts — for the 30% of companies that don't use ATS heavily. For the other 70%, you need to pass the robot first before a human ever decides whether they like how you've told your story. The candidates who get responses consistently do both: they write a clean, ATS-parseable document with precise keyword matching, and they make it genuinely compelling once a human opens it. That's not a contradiction. It's the game."
        }
      ]}
      insideLook={{
        name: "Would Your Resume Even Make It Through?",
        description: "Get your ATS score, missing keywords, and top 3 fixes before your next application.",
        href: "/tools/ats-reality",
        isFree: false
      }}
      relatedLinks={[
        { label: "Your Resume, Through a Recruiter's Eyes", href: "/tools/resume-recruiter-eyes" },
        { label: "What This Job Actually Is", href: "/tools/what-this-job-is" }
      ]}
    />
  )
}
