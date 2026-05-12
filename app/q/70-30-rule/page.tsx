import type { Metadata } from 'next'
import { SeoContentPage } from '@/components/seo-content-page'

const CANONICAL = 'https://hiring.productions/q/70-30-rule'

export const metadata: Metadata = {
  title: 'What Is the 70/30 Rule in Hiring? (Recruiter Reality Check)',
  description:
    "The 70/30 rule shows up in three different versions online. One is real recruiting practice. Two are internet noise. Here's how to tell them apart and what to do with the real one.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: 'article',
    title: 'What Is the 70/30 Rule in Hiring?',
    description:
      'Three versions of the 70/30 rule, which one recruiters actually use, and what it means for your application.',
    url: CANONICAL,
  },
}

export default function SeventyThirtyRulePage() {
  return (
    <SeoContentPage
      badge="FOR CANDIDATES"
      badgeColor="indigo"
      headline="What Is the 70/30 Rule in Hiring?"
      intro="Three different things get called the 70/30 rule online. One is a real recruiting practice. Two are TikTok inventions. Knowing the difference changes how you decide whether to apply — and whether you'll get past the screen."
      canonicalUrl={CANONICAL}
      sections={[
        {
          heading: "The Real 70/30 Rule (What Recruiters Actually Use)",
          body: "Inside hiring teams, '70/30' usually refers to how a job description should be read: about 70% of the listed requirements are must-haves, and 30% are nice-to-haves. The recruiter's actual screening behavior reflects this. They look for candidates who hit at least 70% of the must-haves — strong matches on the core responsibilities and required experience. The 30% nice-to-haves are tiebreakers, not gatekeepers. This is why women routinely don't apply when they only hit 60% of a JD's listed items (which is actually fine), and why men often apply at 40% (which is usually too low). The 70% target is closer to reality than either of those.",
        },
        {
          heading: 'The 70/30 Rule About Applying Versus Networking',
          body: "Another version floating around says you should spend 70% of your job search on networking and 30% on applications. There's truth to the underlying idea — referred candidates are 4x more likely to be hired than cold applicants — but the 70/30 split is made up. Different stages of a search need different ratios. Early in a search when you're scoping the market, applications dominate. Mid-search when you've identified target companies, networking takes over. Late in a search when you have momentum, you do both. Treating it as a fixed split misses how real searches actually progress.",
        },
        {
          heading: 'The 70/30 Rule About Resume Content',
          body: "A third version says 70% of your resume should be accomplishments and 30% responsibilities. This one is just wrong as stated. A good resume is closer to 90/10 accomplishments-to-responsibilities — every bullet should describe an outcome, not a job description. Listing what your role was responsible for tells a recruiter nothing because every person in that role had the same responsibilities. What you actually accomplished, in numbers and specifics, is what differentiates you. If 30% of your resume is restating your job title in narrative form, cut it.",
        },
        {
          heading: 'What to Actually Do With the Real Version',
          body: "When you're reading a job description, treat the requirements as a 70/30 split. Identify what's clearly must-have (specific years of experience, specific tools, specific industries, anything in the 'requirements' or 'qualifications' section near the top) versus nice-to-have (anything in 'preferred' or 'bonus' sections, secondary tools, adjacent industries). Apply if you hit 70% of the must-haves with confidence. Below that, you'll struggle to make the case in the interview. Above 90%, you may be overqualified and risk being seen as a flight risk. The sweet spot is 70-85%.",
        },
        {
          heading: 'Why This Matters for Your Search',
          body: 'The candidates who waste the most time in their search are the ones applying everywhere — both far below the 70% threshold (where they have no shot) and far above it (where the company assumes they will leave for something better). Tightening your application list to the 70-85% range concentrates your time on roles you can credibly land. Combined with materials that mirror the JD language, this typically doubles or triples response rates compared to spray-and-pray.',
        },
      ]}
      faqs={[
        {
          q: 'What is the 70/30 rule in hiring?',
          a: "The version recruiters actually use describes a job description as roughly 70% must-haves and 30% nice-to-haves. Candidates who hit 70%+ of the must-haves get serious consideration; below that, the gap is usually too big to close in an interview.",
        },
        {
          q: 'Should I apply to a job if I only meet 70% of the requirements?',
          a: "Yes — that's the sweet spot. Applying at 100% means you're likely overqualified and at risk of being passed over as a flight risk. Applying at 50% means you can't credibly make the case for the gap. 70-85% is where most successful hires actually land.",
        },
        {
          q: "What's the difference between must-haves and nice-to-haves on a job description?",
          a: "Must-haves typically appear in the 'Requirements' or 'Qualifications' section near the top of a JD, often phrased as 'must have' or 'required.' Nice-to-haves appear in 'Preferred,' 'Bonus,' or 'Plus' sections. If something appears in both sections of similar postings across multiple companies, it's a must-have for that role type even if any single posting frames it as preferred.",
        },
        {
          q: 'Is the 70/30 rule about resume accomplishments true?',
          a: "Not really — a good resume is closer to 90% accomplishments and 10% (or less) responsibilities. Bullets that describe what you accomplished with specific numbers consistently outperform bullets that restate your job description. If 30% of your resume reads like a duty list, you're underselling yourself.",
        },
        {
          q: 'Where did the 70/30 rule originate?',
          a: "The hiring/JD version has been used informally inside recruiting teams for decades — it's not from a single named source. The 'apply at 70%' framing got popularized by Hewlett Packard's internal hiring data in the 2010s, which found a gendered gap in application thresholds. The networking and resume versions of the rule are more recent and largely TikTok-driven.",
        },
      ]}
      insideLook={{
        name: 'What This Job Actually Is',
        description:
          "Paste any job description. Get the recruiter's read on what's must-have vs. nice-to-have, the unstated requirements, and an honest verdict on whether you should apply.",
        href: '/tools/what-this-job-is',
        isFree: true,
      }}
      relatedLinks={[
        { label: "Why am I not getting responses?", href: '/q/why-am-i-not-getting-responses' },
        { label: 'How to beat an ATS', href: '/q/how-to-beat-ats' },
        { label: 'What recruiters really think', href: '/what-recruiters-really-think' },
      ]}
    />
  )
}
