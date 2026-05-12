import type { Metadata } from 'next'
import { SeoContentPage } from '@/components/seo-content-page'

const CANONICAL = 'https://hiring.productions/q/what-does-competitive-salary-mean'

export const metadata: Metadata = {
  title: "What 'Competitive Salary' Actually Means in a Job Posting",
  description:
    "'Competitive salary' is almost never a signal of exceptional pay. Here's what it really means, the related phrases recruiters use, and how to find the actual number before you apply.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: 'article',
    title: "What 'Competitive Salary' Actually Means in a Job Posting",
    description:
      "A recruiter's read on the most common job-post euphemisms — and how to find the real number.",
    url: CANONICAL,
  },
}

export default function WhatDoesCompetitiveSalaryMeanPage() {
  return (
    <SeoContentPage
      badge="FOR CANDIDATES"
      badgeColor="indigo"
      headline="What 'Competitive Salary' Actually Means in a Job Posting"
      intro="Job postings are full of phrases that sound like information but aren't. 'Competitive salary' is the most common one. Here's what it actually signals — and how to find the real number before you waste time on the process."
      canonicalUrl={CANONICAL}
      sections={[
        {
          heading: "What 'Competitive Salary' Actually Signals",
          body: "When a company writes 'competitive salary,' it usually means one of three things: they haven't done market research recently and assume they're competitive, they know the number is below market but believe the role or brand compensates for it, or they want to assess what you'll ask for before they commit to a number. It is almost never a signal that the compensation is exceptional. Exceptional compensation gets named.",
        },
        {
          heading: 'Other Compensation Phrases and What They Mean',
          body: "'Salary commensurate with experience' — they will pay differently for different candidates and would prefer you anchor first. 'Equity included' without a number — early-stage company or a meaningless amount. 'Total compensation package' — the base may be below market but the benefits inflate the headline. 'DOE' (depending on experience) — they have a range but won't tell you. 'Opportunity for growth' as a compensation benefit — the base is low and they're betting you'll stay for the trajectory.",
        },
        {
          heading: 'How to Find the Real Number',
          body: "Pay transparency laws now require salary ranges in California, New York, Colorado, and Washington — plus more states every year. Search for the same role posted in one of those states even if the role is remote. LinkedIn often shows salary ranges now even when the company doesn't post them. Levels.fyi, Glassdoor, and Blind all have real compensation data sorted by company and level. If you can't find any of it, ask directly in the first recruiter screen: 'Can you share the salary range for this role?' In 2026, this is a normal question. Companies that won't answer it are telling you something.",
        },
        {
          heading: 'What to Do When the Number Is Below Market',
          body: "Know your number before you apply. Not a range — a specific number you're willing to accept. If the role pays below that number, decide before you're in the process whether the other factors (brand, growth, mission, flexibility) justify the gap. Making that decision under pressure at offer stage is how people end up taking jobs they resent. If the number is below market and nothing else compensates for it, pass early. Your time has a cost too.",
        },
      ]}
      faqs={[
        {
          q: "What does 'competitive salary' mean on a job description?",
          a: "It almost always means the company hasn't named a number on purpose — either because they haven't researched market rates, they know they're below market, or they want you to anchor first. Genuinely exceptional pay gets stated explicitly.",
        },
        {
          q: 'Should I apply to jobs that only say competitive salary?',
          a: "Yes — but find the range before you invest time in the process. Check the same role posted in California, New York, Colorado, or Washington (where ranges are legally required). Ask in the first recruiter screen. Don't get to offer stage without knowing.",
        },
        {
          q: "What's the difference between competitive salary and DOE?",
          a: "'Competitive salary' implies a market-rate offer. 'DOE' (depending on experience) signals an actual range that varies by candidate level. Both mean the same thing in practice: the company won't commit to a number in the posting.",
        },
        {
          q: 'Is it OK to ask about salary in the first interview?',
          a: "In 2026, yes — it's the standard expectation. Phrasing matters: 'Can you share the range for this role?' lands cleaner than 'how much does this pay?' Companies that refuse to answer this in the first screen are signaling something about how they'll negotiate later.",
        },
        {
          q: 'How do I find salary ranges when none are listed?',
          a: "Check Levels.fyi (especially for tech), Glassdoor's company-specific pages, LinkedIn's salary insights, Blind for senior roles, and pay-transparency-required postings in NY/CA/CO/WA. Most companies post the same role in multiple states — the version with the legally required range will reveal the number.",
        },
      ]}
      insideLook={{
        name: 'What This Company Feels Like to Work At',
        description:
          "Get the inside details on company culture, growth, and what it's like to work there — before you consider the offer.",
        href: '/tools/culture-decoder',
        isFree: false,
      }}
      relatedLinks={[
        { label: 'What This Job Actually Is', href: '/tools/what-this-job-is' },
        { label: 'What This Company Feels Like to Work At', href: '/tools/culture-decoder' },
        { label: 'Why am I not getting responses?', href: '/q/why-am-i-not-getting-responses' },
      ]}
    />
  )
}
