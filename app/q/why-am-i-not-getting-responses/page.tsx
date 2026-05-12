import type { Metadata } from 'next'
import { SeoContentPage } from '@/components/seo-content-page'

const CANONICAL = 'https://hiring.productions/q/why-am-i-not-getting-responses'

export const metadata: Metadata = {
  title: "Why You're Not Getting Responses to Job Applications (2026)",
  description:
    'No callbacks, no rejections, just silence. The recruiter-side read on what is actually filtering your applications — ATS, platform, or differentiation — and how to tell which.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: 'article',
    title: "Why You're Not Getting Responses to Job Applications in 2026",
    description:
      'The four real reasons applications go dark — and the diagnostic to figure out which one is yours.',
    url: CANONICAL,
  },
}

export default function WhyAmINotGettingResponsesPage() {
  return (
    <SeoContentPage
      badge="FOR CANDIDATES"
      badgeColor="indigo"
      headline="Why You're Not Getting Responses to Job Applications in 2026"
      intro="You're applying. Nothing is coming back. Not a rejection, not a request for a call. Just silence. Here's what's actually happening — and which specific problem you're dealing with."
      canonicalUrl={CANONICAL}
      sections={[
        {
          heading: "Problem 1: Your Resume Isn't Making It Through ATS",
          body: "Over 90% of large employers use automated screening. If your resume doesn't match the keywords in the job description, it gets filtered out before a human sees it. This is the most common reason for silence — not that recruiters read your resume and passed, but that your resume never reached a human. The fix: run your resume against the job description before applying. Look for exact phrase matches, not concept matches. 'Talent acquisition' and 'recruiting' are not the same to an ATS.",
        },
        {
          heading: "Problem 2: You're Applying to the Wrong Places",
          body: "Not all job boards are equal for all roles. LinkedIn dominates volume but the response rate is brutal for high-supply roles. Indeed's response rate varies wildly by industry. Google Jobs is underused for the volume it surfaces. Company career sites consistently outperform aggregators for response rate because applying there signals you actually want THAT company. If you're spray-applying to the same three platforms everyone uses, you're competing with the most volume for the least responsive channels.",
        },
        {
          heading: "Problem 3: Your Application Looks Like Everyone Else's",
          body: "In 2026, most resumes look similar. Most cover letters sound similar. Most LinkedIn profiles say similar things. Hiring managers are reading 200 versions of the same professional narrative. If your application doesn't have something specific and differentiated — a number, a company name, a piece of work, a reference to something real — it blends into the pile. Not because you're unqualified. Because you look exactly like the qualified person next to you.",
        },
        {
          heading: 'Problem 4: Your Search Strategy Is Broken',
          body: "Volume is not a strategy. Sending 100 applications a month to roles that sort-of fit is less effective than sending 20 applications to roles that specifically fit, with materials tailored to each one. The candidates who get responses fastest are almost never the ones applying to the most jobs. They're the ones who are precise about what they're going for and specific in how they present themselves for that thing.",
        },
        {
          heading: 'How to Diagnose Your Specific Problem',
          body: 'The fastest way to figure out which problem you have is to look at your pattern. Getting no responses at all — likely an ATS or platform problem. Getting responses then silence — likely a resume or targeting problem. Getting calls but no second interviews — a different problem entirely. The diagnosis changes the fix. The worst thing you can do is work harder at the wrong solution.',
        },
      ]}
      faqs={[
        {
          q: "Why am I not getting any responses to my applications?",
          a: "The most common reason is ATS filtering — your resume doesn't match the job description's keywords closely enough to reach a human. The second most common is platform — you're applying through the highest-volume, lowest-response channels. Run your resume against a specific JD before assuming the problem is your qualifications.",
        },
        {
          q: 'How many applications should I send per week?',
          a: '15-25 tailored applications outperforms 100 spray applications, every time. The candidates who get hired fastest are usually applying to fewer roles with materials specifically rewritten for each one. Volume without targeting just guarantees you look generic.',
        },
        {
          q: 'How long should it take to hear back from an application?',
          a: "For a real opportunity where your application landed in a human's queue, expect 5-10 business days for an initial response. After two weeks of silence on a posting that's still active, the realistic answer is that you didn't make the screening cut — even if no rejection went out.",
        },
        {
          q: 'Is LinkedIn or Indeed better for getting responses?',
          a: "Neither, in 2026. The highest-response channel for most roles is the company's own career site, because applying there signals genuine interest. LinkedIn and Indeed are useful for finding the roles, but applying directly to the company's site afterward typically gets a better response rate.",
        },
        {
          q: 'Should I follow up after applying with no response?',
          a: 'Yes, but only once, and only to a specific person — the hiring manager or the recruiter listed on the posting. A one-paragraph note 7-10 days after applying that says something specific about why this role and this company is more effective than a generic check-in. Most candidates never follow up. The ones who do, well, stand out.',
        },
      ]}
      insideLook={{
        name: 'Where You Actually Have a Shot at Interviews',
        description:
          'See which roles and companies are actually looking for your background — before you waste time applying.',
        href: '/tools/where-you-have-a-shot',
        isFree: false,
      }}
      relatedLinks={[
        { label: 'How to beat an ATS', href: '/q/how-to-beat-ats' },
        { label: 'Is my resume good?', href: '/q/is-my-resume-good' },
        { label: 'What is the 7-second rule on a resume?', href: '/q/7-second-rule-resume' },
      ]}
    />
  )
}
