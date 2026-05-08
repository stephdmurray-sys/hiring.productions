'use client'

import { SeoContentPage } from '@/components/seo-content-page'

export default function WhyAmINotGettingResponsesPage() {
  return (
    <SeoContentPage
      badge="FOR CANDIDATES"
      badgeColor="indigo"
      headline="Why You're Not Getting Responses to Job Applications in 2026"
      intro="You're applying. Nothing is coming back. Not a rejection, not a request for a call. Just silence. Here's what's actually happening — and which specific problem you're dealing with."
      sections={[
        {
          heading: "Problem 1: Your Resume Isn't Making It Through ATS",
          body: "Over 90% of large employers use automated screening. If your resume doesn't match the keywords in the job description, it gets filtered out before a human sees it. This is the most common reason for silence — not that recruiters read your resume and passed, but that your resume never reached a human. The fix: run your resume against the job description before applying. Look for exact phrase matches, not concept matches. 'Talent acquisition' and 'recruiting' are not the same to an ATS."
        },
        {
          heading: "Problem 2: You're Applying to the Wrong Places",
          body: "Not all job boards are equal for all roles. LinkedIn has a 3.1% response rate for most applications. Indeed's response rate varies wildly by role. Google Jobs has an 11.3% response rate because fewer people know to use it. If you're spray-applying to the same three platforms everyone uses, you're competing with the most volume for the least responsive channels. Where you apply matters as much as how you apply."
        },
        {
          heading: "Problem 3: Your Application Looks Like Everyone Else's",
          body: "In 2026, most resumes look similar. Most cover letters sound similar. Most LinkedIn profiles say similar things. Hiring managers are reading 200 versions of the same professional narrative. If your application doesn't have something specific and differentiated — a number, a company name, a piece of work, a reference to something real — it blends into the pile. Not because you're unqualified. Because you look exactly like the qualified person next to you."
        },
        {
          heading: "Problem 4: Your Search Strategy Is Broken",
          body: "Volume is not a strategy. Sending 100 applications a month to roles that sort-of fit is less effective than sending 20 applications to roles that specifically fit, with materials tailored to each one. The candidates who get responses fastest are almost never the ones applying to the most jobs. They're the ones who are precise about what they're going for and specific in how they present themselves for that thing."
        },
        {
          heading: "How to Diagnose Your Specific Problem",
          body: "The fastest way to figure out which problem you have is to look at your pattern. Getting no responses at all — likely an ATS or platform problem. Getting responses then silence — likely a resume or targeting problem. Getting calls but no second interviews — a different problem entirely. The diagnosis changes the fix. The worst thing you can do is work harder at the wrong solution."
        }
      ]}
      insideLook={{
        name: "Where You Actually Have a Shot",
        description: "See which roles and companies are actually looking for your background — before you waste time applying.",
        href: "/tools/where-you-have-a-shot",
        isFree: false
      }}
      relatedLinks={[
        { label: "Would You Even Make It Through?", href: "/tools/ats-reality" },
        { label: "Where You Actually Have a Shot", href: "/tools/where-you-have-a-shot" }
      ]}
    />
  )
}
