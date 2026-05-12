import type { Metadata } from 'next'
import { SeoContentPage } from '@/components/seo-content-page'

const CANONICAL = 'https://hiring.productions/q/explain-resume-gap'

export const metadata: Metadata = {
  title: 'How to Explain a Gap on Your Resume (Honest Scripts That Work)',
  description:
    "Most gap-explanation advice tells you to hide or minimize. Recruiters in 2026 actually prefer honesty. Here are the exact scripts that work for layoffs, caregiving, health, and pivots.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: 'article',
    title: 'How to Explain a Gap on Your Resume',
    description:
      "The recruiter's read on how to handle career gaps honestly — without making them the center of your story.",
    url: CANONICAL,
  },
}

export default function ExplainResumeGapPage() {
  return (
    <SeoContentPage
      badge="FOR CANDIDATES"
      badgeColor="indigo"
      headline="How to Explain a Gap on Your Resume"
      intro="Career gaps used to be a big deal. In 2026, after layoffs touched nearly every industry and caregiving became more visible, they're routinely accepted with a brief, honest explanation. The goal is to acknowledge and redirect — not to elaborate."
      canonicalUrl={CANONICAL}
      sections={[
        {
          heading: "Why Gaps Don't Disqualify You Anymore",
          body: "Three things shifted between 2020 and 2026: mass tech layoffs normalized involuntary gaps, the pandemic surfaced caregiving and health as legitimate career interruptions, and the broader workforce trend toward sabbaticals and pivots made non-linear careers visible. Recruiters who treated gaps as flags in 2018 simply don't anymore — there's too much real talent that has them. What does still flag is dishonesty, vagueness, or trying to hide a gap that's obvious on the timeline. Acknowledge it, name what you were doing in two sentences, and move on.",
        },
        {
          heading: 'The Three-Part Honest Script',
          body: "Every effective gap explanation has three parts: what happened (one sentence, factual), what you did during it (one sentence, productive without overselling), and where you are now (one sentence, forward-looking). Example for a layoff: 'My role was eliminated when the company restructured in 2024. I spent the time consulting on two product launches and earning my PMP. I'm ready to come back to a full-time role at a mid-market SaaS company.' That's it. Total: 35 words. Done.",
        },
        {
          heading: 'The Scripts That Actually Work by Gap Type',
          body: "Layoff: 'Position was eliminated in [month/year]. [What you did during]. Ready to return now.' Caregiving: 'Took time to care for a family member. That responsibility has resolved and I'm ready to come back full-time.' Health: 'Health issue I addressed in 2024. Fully resolved. Returning to work now.' Pivot: 'Stepped back to retool for [target field]. Completed [specific credential/project]. Now applying that work to roles like this one.' Burnout: '[Year] was a planned reset after [X years] of intensive work in [field]. I used the time intentionally. I'm coming back with clear focus on [the kind of work you want now].' Notice what these have in common: short, specific, no apology, no overexplanation, ends pointed at the role.",
        },
        {
          heading: 'Where to Put the Explanation',
          body: "On the resume itself, you don't always need a separate explanation — a clean reverse-chronological timeline with the gap visible is fine for most gaps under 12 months. For longer gaps, add a brief line in the role section: 'Career break — [reason], [year-year].' In a cover letter, you can mention the gap in one sentence in the second paragraph, framed as context for why you're ready now. In an interview, expect the question and prepare the three-part script. Practice it until it's two sentences max and feels neutral when you say it. The energy you bring to the explanation matters more than the words.",
        },
        {
          heading: "What Not to Do",
          body: "Don't lie about the dates. Recruiters cross-check resume dates against LinkedIn against background checks. Don't fill the gap with fake 'consulting' if you weren't actually consulting — recruiters ask for specifics and the lack of any client or project name reads obvious. Don't apologize or get defensive — the more you justify, the more it sounds like there's something to justify. Don't make the gap the center of your story — frame your career narrative around your work, with the gap as one factual line. Don't volunteer extra information beyond the three-part script unless you're asked.",
        },
      ]}
      faqs={[
        {
          q: 'Do I need to explain a gap on my resume?',
          a: 'For gaps under 6 months, usually no — a clean timeline is sufficient. For longer gaps, a brief one-line acknowledgment on the resume plus a prepared two-sentence answer for interviews is the standard. Trying to hide the gap is worse than naming it.',
        },
        {
          q: 'How do I explain a 1-year gap on my resume?',
          a: "Three parts: what happened, what you did during, where you are now. 'My role was eliminated in early 2024. I used the time to complete my [credential] and consult on two projects. I'm ready to return to a full-time role.' Keep it to 30-40 words.",
        },
        {
          q: 'Should I explain a gap in my cover letter?',
          a: 'Optional, and brief if you do. One sentence in the second paragraph is enough — something like \'After a planned career break in 2024 to address a family responsibility, I\'m returning with renewed focus on [the work].\' Don\'t devote the whole cover letter to the gap.',
        },
        {
          q: 'Is a 2-year gap a red flag in 2026?',
          a: "Not by itself. Two-year gaps for layoffs, caregiving, health, education, or planned sabbaticals are common and accepted. What matters is having a clear, honest, brief explanation and showing you've used the time productively where you can.",
        },
        {
          q: 'How do I explain a gap if I was unemployed and just looking for work?',
          a: "Honest is fine: 'I was looking for the right next role.' If the gap is long (12+ months), pair it with what you did during — courses, side projects, volunteering, freelancing, even reading-and-reflection. The goal is to show you weren't passive, not to invent a job you didn't have.",
        },
        {
          q: 'Should I put the reason for the gap on my resume?',
          a: "For gaps over 6-12 months, yes — a one-line acknowledgment: 'Career break — caregiving, 2023-2024' or 'Sabbatical — completed Project Management Professional certification, 2024.' That's enough to remove the question mark without making the gap a focal point.",
        },
      ]}
      insideLook={{
        name: 'How to Explain My Employment Gap',
        description:
          "Tell us when and why. Get three honest scripts — resume one-liner, cover letter version, interview answer — written in your voice. Free.",
        href: '/tools/explain-my-gap',
        isFree: true,
      }}
      relatedLinks={[
        { label: 'What are red flags on a resume?', href: '/q/resume-red-flags' },
        { label: 'What recruiters really think', href: '/what-recruiters-really-think' },
        { label: "Why am I not getting responses?", href: '/q/why-am-i-not-getting-responses' },
      ]}
    />
  )
}
