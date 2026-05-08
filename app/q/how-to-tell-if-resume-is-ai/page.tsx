'use client'

import { SeoContentPage } from '@/components/seo-content-page'

export default function HowToTellIfResumeIsAIPage() {
  return (
    <SeoContentPage
      badge="FOR HIRING TEAMS"
      badgeColor="coral"
      headline="How to Tell If a Resume Is AI-Written in 2026"
      intro="AI-generated resumes are now a significant portion of applications at most companies. Some are harmless polish. Others are wholesale fabrications. Here's how to tell the difference — and what to do about each."
      sections={[
        {
          heading: "The Patterns That Reveal AI Generation",
          body: "AI-written resumes have specific tells that become obvious once you know what to look for. Uniform bullet length — every bullet is 1.5-2 lines, no variation. Alliterative or structurally parallel phrasing — 'Developed, deployed, and drove results through data-driven decisions.' Generic superlatives without specifics — 'exceptional,' 'outstanding,' 'world-class' applied to ordinary responsibilities. Perfect keyword density — every keyword from the job description appears exactly, which no real human would achieve naturally. Suspiciously clean formatting — no personality, no variation, no human irregularity anywhere in the document."
        },
        {
          heading: "AI-Polished vs. AI-Generated — The Distinction Matters",
          body: "Most candidates are using AI to improve their resumes, not fabricate them. AI-polished resumes have human bones with AI structure — the experience is real, the numbers are real, the voice has been smoothed out. AI-generated resumes have no underlying human content — the experience may be exaggerated or invented, the numbers are suspiciously round, and there is no specificity that would require the person to have actually done the work. The first group deserves a fair evaluation. The second is a different problem — potential misrepresentation that affects your hiring decision and potentially your legal exposure."
        },
        {
          heading: "How to Probe in the Interview",
          body: "The fastest way to verify a suspected AI resume is to ask specific questions the resume can't answer for them. 'Walk me through exactly what you did in week one of that project.' 'What was the specific number before you implemented that change and how did you measure it?' 'Who did you work with most closely on that initiative and what was their role?' Real experience produces specific, immediate, somewhat messy answers. AI-generated experience produces smooth, complete, suspiciously well-structured answers that somehow never include the names of actual people or specific systems."
        },
        {
          heading: "What to Do When You Find One",
          body: "A resume that shows AI signals doesn't automatically mean the candidate is unqualified. It might mean they don't know how to represent themselves on paper, which is a different problem than being unqualified for the role. The interview is where you find out. What AI detection tells you is where to probe harder — not whether to automatically pass. The exception is clear fabrication: experience that doesn't align with LinkedIn, dates that don't match, companies that don't exist, metrics that are mathematically impossible. That's a different conversation."
        }
      ]}
      insideLook={{
        name: "Your Resume, Through a Recruiter's Eyes",
        description: "See the internal monologue of a recruiter reading your resume in the first 6 seconds.",
        href: "/tools/resume-recruiter-eyes",
        isFree: false
      }}
      relatedLinks={[
        { label: "Your Resume, Through a Recruiter's Eyes", href: "/tools/resume-recruiter-eyes" },
        { label: "What Your Culture Really Is", href: "/tools/culture-decoder" }
      ]}
    />
  )
}
