import type { Metadata } from 'next'
import { SeoContentPage } from '@/components/seo-content-page'

const CANONICAL = 'https://hiring.productions/q/7-second-rule-resume'

export const metadata: Metadata = {
  title: 'What Is the 7-Second Rule on a Resume? (A Recruiter Answers)',
  description:
    'The 7-second rule is real — but most of what gets said about it is wrong. The actual recruiter behavior, what they scan for, and how to survive the first pass.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: 'article',
    title: 'What Is the 7-Second Rule on a Resume?',
    description:
      "The recruiter-side read on the 7-second rule: what's true, what's TikTok mythology, and how to optimize for it.",
    url: CANONICAL,
  },
}

export default function SevenSecondRulePage() {
  return (
    <SeoContentPage
      badge="FOR CANDIDATES"
      badgeColor="indigo"
      headline="What Is the 7-Second Rule on a Resume?"
      intro="The 7-second rule says a recruiter spends about seven seconds on your resume before deciding to keep reading or move on. It is mostly true, frequently misunderstood, and changes how you should write — but probably not the way the internet says."
      canonicalUrl={CANONICAL}
      sections={[
        {
          heading: 'What the 7-Second Rule Actually Means',
          body: "The 7-second figure comes from a 2018 eye-tracking study by Ladders that measured how long recruiters spent on resumes before making an initial pass/keep-reading decision. The study itself is real. The way it gets used online is mostly not. The 7 seconds is the initial SCAN — the moment where a recruiter decides whether your resume earns a deeper read. If your resume passes the scan, the same recruiter will spend 30-60 more seconds on it, and possibly several minutes if you make their shortlist. The misunderstanding is treating 7 seconds as the entire decision window. It's the threshold.",
        },
        {
          heading: 'What a Recruiter Actually Scans in Those 7 Seconds',
          body: "Four things, roughly in this order: the most recent job title and company name (do they have the level and the kind of company we want?), the years in role (are they job hoppers or steady?), the headline or summary if one exists (do they self-identify as the thing we're hiring for?), and the bullets under their most recent role (did they do work that resembles what we need?). Everything else — earlier roles, education, skills section — is for the deeper read if the scan passes. If the scan fails, none of those sections will save you.",
        },
        {
          heading: 'How to Optimize for the First 7 Seconds',
          body: "Lead with what the recruiter is looking for, in the language they're looking for. If they're hiring a Senior PM, your most recent title needs to read Senior PM (or a clear parallel like 'Lead Product Manager'). If the JD emphasizes B2B SaaS, your most recent company description should make it obvious you've worked in B2B SaaS. Your most recent role's first 2-3 bullets should mirror the most critical responsibilities in the JD, written with specific numbers. Skip the objective statement entirely — recruiters have not read those for 15 years. Skip the long paragraph about how passionate you are — they'll find out in the interview.",
        },
        {
          heading: "What This Rule Doesn't Mean",
          body: 'It does not mean recruiters are lazy. It means they have a queue. It does not mean your career story is unimportant — it means you need to earn the right to tell it. It does not mean shorter resumes are always better — a thoughtful two-pager that passes the scan beats a forced one-pager that buries the relevant work. And it does not mean ATS optimization replaces the human read. The scan happens AFTER the resume gets past the ATS. You have to win both.',
        },
        {
          heading: 'The Real Question to Ask Yourself',
          body: "Look at the top third of your resume — name, headline if any, most recent role title and company, first 2-3 bullets. That is what the recruiter is reading in 7 seconds. Ask one question: if someone who knew nothing about you saw only this, would they think you can do the job they're hiring for? If the answer is no, that is what to fix first. Not the wording in your 2017 role. Not the skills list. The top third. The rest only matters if the top earns it.",
        },
      ]}
      faqs={[
        {
          q: 'Is the 7-second rule on resumes real?',
          a: "The 7-second figure comes from a 2018 eye-tracking study of recruiter behavior. The initial scan is real and is roughly that long. What gets distorted online is treating it as the whole decision — it's actually the threshold for whether your resume earns a deeper read.",
        },
        {
          q: 'What does a recruiter look at in 7 seconds?',
          a: "Most recent job title, most recent company, years in that role, and the first 2-3 bullets of the most recent role. If anything in that top third doesn't immediately signal 'this person matches what we're hiring for,' the resume gets passed.",
        },
        {
          q: 'How can I make my resume pass the 7-second scan?',
          a: "Front-load your most relevant work in the top third of the resume. Make sure your most recent job title aligns with the role you're applying for. Lead with bullets that mirror the most important JD responsibilities — with specific numbers, not vague responsibilities.",
        },
        {
          q: 'Does the 7-second rule apply to all jobs?',
          a: "It applies most strictly to high-volume corporate roles where recruiters screen 50-200 resumes per posting. For executive search, technical specialty roles, and small-company hiring where each application gets manual review, the scan time is longer — but the principle is the same: the top of your resume gets disproportionate attention.",
        },
        {
          q: 'Should I use a resume summary to beat the 7-second rule?',
          a: "A short, specific summary can help — but only if it's tailored to the role and dense with concrete information. Generic summaries like 'results-driven professional with a passion for excellence' actively hurt you. A 2-line summary that names your specialty, scale, and the kind of company you've worked at can earn the deeper read.",
        },
        {
          q: 'Is the 6-second rule different from the 7-second rule?',
          a: 'Different studies have produced slightly different numbers — Ladders measured 7.4 seconds in 2018, earlier studies measured 6 seconds, some recent eye-tracking has gone as low as 5. The exact number is less important than the principle: the initial scan is brief, and only resumes that pass it get the deeper read.',
        },
      ]}
      insideLook={{
        name: 'Does My Resume Read as AI?',
        description:
          "Run your resume through a recruiter's first-pass scan. See which lines pass the 7-second test and which get skipped.",
        href: '/resume',
        isFree: true,
      }}
      relatedLinks={[
        { label: 'What recruiters really think reading your resume', href: '/what-recruiters-really-think' },
        { label: 'What are red flags on a resume?', href: '/q/resume-red-flags' },
        { label: 'Is my resume good?', href: '/q/is-my-resume-good' },
        { label: 'How to beat an ATS', href: '/q/how-to-beat-ats' },
      ]}
    />
  )
}
