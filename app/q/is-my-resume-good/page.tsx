import type { Metadata } from 'next'
import { SeoContentPage } from '@/components/seo-content-page'

const CANONICAL = 'https://hiring.productions/q/is-my-resume-good'

export const metadata: Metadata = {
  title: 'Is My Resume Good? (How a Recruiter Actually Decides)',
  description:
    "There is no universally 'good' resume — only resumes that match specific roles. Here are the four checks a senior recruiter runs on yours, and how to tell which one you're failing.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: 'article',
    title: 'Is My Resume Good?',
    description:
      "A recruiter's four-part read on whether your resume is working — and the specific signal each check fails on.",
    url: CANONICAL,
  },
}

export default function IsMyResumeGoodPage() {
  return (
    <SeoContentPage
      badge="FOR CANDIDATES"
      badgeColor="indigo"
      headline="Is My Resume Good?"
      intro="There is no universally good resume. A resume is good for a specific role at a specific company. The honest answer to 'is my resume good' is: it depends on what you're applying for and how well it speaks to that. Here are the four checks that actually matter — and which one you're failing if you're not getting responses."
      canonicalUrl={CANONICAL}
      sections={[
        {
          heading: 'Check 1: Does It Pass the ATS?',
          body: "Over 90% of large employers use automated screening. If your resume isn't formatted in a single column with plain-text section headers, if you're using tables or text boxes, or if you've used different vocabulary than the job description — your resume may not be reaching a human at all. This is the most common failure point and the easiest to fix. Run your resume through an ATS checker against a real job description. If your match score is below 70%, the resume isn't 'bad,' it's just not aligned with that specific role. Fix the keyword overlap first.",
        },
        {
          heading: 'Check 2: Does It Pass the 7-Second Scan?',
          body: "Once a resume reaches a human, the first scan takes about 7 seconds. The recruiter is looking at the top third — most recent title and company, headline, first 2-3 bullets of the most recent role. If those don't immediately signal 'this person matches the role we're hiring for,' the resume gets passed. Read just the top third of your resume. If a stranger couldn't tell within 7 seconds what role you'd be qualified for, that's what's wrong. Not the work history below it. The top third.",
        },
        {
          heading: 'Check 3: Do the Bullets Show Outcomes, Not Responsibilities?',
          body: "Most resumes fail here. They list what the role was responsible for instead of what the person actually accomplished. 'Responsible for managing a team of engineers' tells a recruiter nothing — every person in that role had that responsibility. 'Grew the team from 4 to 11 in 18 months while keeping retention at 92%' tells them exactly what you did at what scale. Every bullet should answer a recruiter's silent question: 'What did YOU specifically do here, and how big was the result?' If a bullet describes the job title rather than your work, rewrite it or cut it.",
        },
        {
          heading: 'Check 4: Is It Specific Enough to Be Memorable?',
          body: "After scanning 200 resumes, recruiters remember the ones with concrete specifics — a tool by name, a number with scale context, a small detail that only someone who lived the work would include. They forget the ones with generic professional language. Look at your resume and find the most specific line. Is it specific enough that no AI could have generated it? If your most specific line is still vague ('drove significant revenue growth'), the rest is probably blending in. Specificity is what makes a recruiter say 'this is interesting' instead of 'this looks fine.'",
        },
        {
          heading: 'How to Know Which Check You Are Failing',
          body: "Look at your response pattern. No responses at all on any application — you're probably failing Check 1 (ATS). Some responses but no recruiter calls — you're failing Check 2 (the 7-second scan). Recruiter calls but no second interviews — you're failing Check 3 or 4 (the deeper read). The fix changes based on the failure. ATS issues are formatting and keywords. Scan issues are about what's in the top third. Deeper-read issues are about specificity and outcomes. Treating all of it as 'my resume isn't good' wastes effort on the wrong fix.",
        },
        {
          heading: 'The Honest Test',
          body: "Show your resume to a senior person in the field you're applying to — not a generalist career coach, not a friend, not ChatGPT. Someone who would be your peer or your hiring manager. Ask one question: 'Looking only at this, would you call me about a role in your team?' If yes, with a reason — your resume is good for that field. If yes but vague — your resume is acceptable but not differentiated. If no, ask why. Their answer is more useful than any rubric.",
        },
      ]}
      faqs={[
        {
          q: 'How do I know if my resume is good?',
          a: "A resume is good if it passes four specific checks: ATS parsing, the 7-second human scan, outcome-focused bullets, and specificity that makes it memorable. Failing one of these checks shows up as a specific symptom — no responses at all, responses but no calls, or calls but no second interviews.",
        },
        {
          q: 'What does a good resume look like in 2026?',
          a: "Clean single-column format, plain-text section headers, no tables or graphics, language that mirrors the JD you're applying to, every bullet describing an outcome with a number, and a top third that immediately signals what role you're qualified for. One page if you have under 10 years of experience, two pages if more.",
        },
        {
          q: 'Should I have someone review my resume?',
          a: 'Yes, but pick the right reviewer. A senior person in the field you\'re applying to is the most useful reviewer — they can tell you whether you\'d catch their eye. Generic career coaches and friends give friendly feedback but often miss the field-specific signals that actually matter.',
        },
        {
          q: 'How do I check if my resume is good for ATS?',
          a: "Run it through a third-party ATS scoring tool against a specific job description. Match scores above 75% are competitive; 60-75% need work on keyword alignment; below 60% likely won't pass to a human reviewer. The number itself is rough, but the missing-keyword report is what to act on.",
        },
        {
          q: 'What makes a resume bad?',
          a: 'Mismatch with the JD vocabulary, generic bullets that describe job titles instead of outcomes, broken formatting that breaks ATS parsing, a top third that doesn\'t signal what role you\'re qualified for, and language so vague that any candidate could have written it. Each of these has a specific fix.',
        },
        {
          q: 'How many revisions should my resume go through?',
          a: 'Three rounds of meaningful revision is typical — a structural pass (does this match the role?), a content pass (are the bullets specific and outcome-focused?), and a polish pass (does it scan cleanly in 7 seconds?). Beyond that you\'re usually rearranging the same problems, not solving them.',
        },
        {
          q: 'Is one resume enough or do I need multiple?',
          a: "You need one base resume and then variations tailored to each role you apply to. The variations don't need to be rewrites — usually 3-5 bullet swaps and headline adjustments are enough to mirror the specific JD. One-resume-for-everything is the most common reason qualified candidates get filtered out.",
        },
      ]}
      insideLook={{
        name: 'Does My Resume Read as AI?',
        description:
          "Run your resume through the same first-pass scan a recruiter uses. See which lines pass and which get skipped — free, no account.",
        href: '/resume',
        isFree: true,
      }}
      relatedLinks={[
        { label: 'What recruiters really think', href: '/what-recruiters-really-think' },
        { label: 'What is the 7-second rule on a resume?', href: '/q/7-second-rule-resume' },
        { label: 'What are red flags on a resume?', href: '/q/resume-red-flags' },
        { label: 'How to beat an ATS', href: '/q/how-to-beat-ats' },
        { label: 'How to tell if a resume is AI-written', href: '/q/how-to-tell-if-resume-is-ai' },
      ]}
    />
  )
}
