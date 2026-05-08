'use client'

import { SeoContentPage } from '@/components/seo-content-page'

export default function WhatDoesCompetitiveSalaryMeanPage() {
  return (
    <SeoContentPage
      badge="FOR CANDIDATES"
      badgeColor="indigo"
      headline="What 'Competitive Salary' Actually Means in a Job Posting"
      intro="Job postings are full of phrases that sound like information but aren't. 'Competitive salary' is the most common one. Here's what it actually signals — and how to find the real number before you waste time on the process."
      sections={[
        {
          heading: "What 'Competitive Salary' Actually Signals",
          body: "When a company writes 'competitive salary,' it usually means one of three things: they haven't done market research recently and assume they're competitive, they know the number is below market but believe the role or brand compensates for it, or they want to assess what you'll ask for before they commit to a number. It is almost never a signal that the compensation is exceptional. Exceptional compensation gets named."
        },
        {
          heading: "Other Compensation Phrases and What They Mean",
          body: "'Salary commensurate with experience' — they will pay differently for different candidates and would prefer you anchor first. 'Equity included' without a number — early-stage company or a meaningless amount. 'Total compensation package' — the base may be below market but the benefits inflate the headline. 'DOE' (depending on experience) — they have a range but won't tell you. 'Opportunity for growth' as a compensation benefit — the base is low and they're betting you'll stay for the trajectory."
        },
        {
          heading: "How to Find the Real Number",
          body: "Pay transparency laws now require salary ranges in California, New York, Colorado, and Washington — plus more states every year. Search for the same role posted in one of those states even if the role is remote. LinkedIn often shows salary ranges now even when the company doesn't post them. Levels.fyi, Glassdoor, and Blind all have real compensation data sorted by company and level. If you can't find any of it, ask directly in the first recruiter screen: 'Can you share the salary range for this role?' In 2026, this is a normal question. Companies that won't answer it are telling you something."
        },
        {
          heading: "What to Do When the Number Is Below Market",
          body: "Know your number before you apply. Not a range — a specific number you're willing to accept. If the role pays below that number, decide before you're in the process whether the other factors (brand, growth, mission, flexibility) justify the gap. Making that decision under pressure at offer stage is how people end up taking jobs they resent. If the number is below market and nothing else compensates for it, pass early. Your time has a cost too."
        }
      ]}
      insideLook={{
        name: "What This Company Feels Like to Work At",
        description: "Get the inside details on company culture, growth, and what it's like to work there — before you consider the offer.",
        href: "/tools/culture-decoder",
        isFree: false
      }}
      relatedLinks={[
        { label: "What This Job Actually Is", href: "/tools/what-this-job-is" },
        { label: "What This Company Feels Like to Work At", href: "/tools/culture-decoder" }
      ]}
    />
  )
}
