import type { Metadata } from 'next'
import { SeoContentPage } from '@/components/seo-content-page'

const CANONICAL = 'https://hiring.productions/q/what-recruiters-look-for-in-new-grads'

export const metadata: Metadata = {
  title: 'What Recruiters Actually Look for in New Grads (2026, from a Senior TA Director)',
  description:
    'Written by a senior recruiter with 20 years filling senior and entry-level roles. The specific signals a recruiter for an entry-level role actually scans for — and what they ignore.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: 'article',
    title: 'What recruiters actually look for in new grads',
    description:
      'The 5 specific signals a recruiter for an entry-level role scans for in the first 8 seconds — and what gets your profile skipped.',
    url: CANONICAL,
  },
}

export default function WhatRecruitersLookForNewGradsPage() {
  return (
    <SeoContentPage
      badge="FOR NEW GRADS"
      badgeColor="indigo"
      headline="What recruiters actually look for in new grads"
      intro="Twenty years on the recruiter side — most recently as Senior Director of TA at Brightside Health. New-grad screening isn’t mysterious. It’s a fast scan for five specific signals, in a specific order. Polish doesn’t pass the filter. These five do."
      canonicalUrl={CANONICAL}
      sections={[
        {
          heading: 'The first 8 seconds — what the recruiter actually scans for',
          body: 'New-grad resume scanning in 2026 takes 6–10 seconds the first time through. The recruiter is looking for five things, in order: (1) does the candidate target the role I’m hiring for, or are they spray-applying? (2) is there evidence of any work — internship, project, paper, leadership role — that maps to what we actually do here? (3) is there a specific number, name, or detail anywhere that suggests real depth? (4) is there a signal of seriousness — a portfolio, a GitHub, a RepVera page, a research site? (5) does the resume read as fundamentally human, or as ChatGPT-polished into the same shape as 200 others I’ve already seen this week?',
        },
        {
          heading: 'Signal 1: Targeting',
          body: 'A new-grad resume that doesn’t target a specific role family is dead on arrival. "I’m a hard-working recent graduate seeking opportunities" tells a recruiter you’re applying to everything, which means you weren’t careful about applying to this one. Lead the resume — and your headline on LinkedIn — with the role you actually want. If you want to be a financial analyst, the headline says "Financial Analyst," not "Recent Graduate Open to Opportunities." Targeting beats credentials at the entry-level scan.',
        },
        {
          heading: 'Signal 2: Evidence of work',
          body: 'Recruiters look for at least one thing on the resume that proves you’ve actually done work, not just been near it. A 10-week internship described with a specific outcome ("rebuilt the onboarding checklist; new-hire ramp time dropped from 6 weeks to 4"). A class project that shipped (a website, a research paper, a published article, a Kaggle submission). A campus job with a concrete responsibility ("ran the dining hall cash inventory; reduced shrink from 3.1% to 0.8% over the semester"). One specific item with a real number beats five generic bullets.',
        },
        {
          heading: 'Signal 3: Specifics that suggest depth',
          body: 'Generic resumes get binned because they could describe any new grad. Specifics signal depth: name the dataset you analyzed, the tool you actually used, the dollar amount you saved, the team size you led, the conference you presented at, the framework you built the project in. Recruiters know AI can write a polished resume; what AI can’t produce is the small weird detail only someone who lived the work would include. Lean into those.',
        },
        {
          heading: 'Signal 4: Proof of seriousness',
          body: 'For new grads especially, a link to something that demonstrates effort outside the resume is differential. A portfolio site for designers and writers. A GitHub for engineers. A research page for grad students. A RepVera page for everyone — the receipts of how people described working with you. Hiring teams click on these about 60% of the time when present and 0% of the time when absent. The bar isn’t producing a Pulitzer Prize portfolio — it’s having something that proves you’re serious enough to set one up.',
        },
        {
          heading: 'Signal 5: Doesn’t read as AI',
          body: 'In 2026 every recruiter has read a thousand ChatGPT-polished resumes. We can spot them in three seconds. Uniform bullet length, alliterative phrasing, suspiciously even keyword density, weirdly round numbers — those are the tells. The resumes that pass the AI-detection read have variation: bullets of different lengths, weird specific numbers (not "increased by 50%" but "from 312 to 489 monthly users"), and the kind of awkward small detail nobody would invent. Real beats polished every time at this stage.',
        },
        {
          heading: 'What recruiters IGNORE on a new-grad resume',
          body: 'A "Skills" section that lists every program you’ve ever opened. References available upon request. Objective statements ("Seeking an opportunity to leverage my passion for…"). Hobbies that don’t signal anything specific. Three different fonts to "look creative." A photo. Long descriptions of clubs you joined but didn’t do anything in. Course names without the actual work you did in them. Each of these eats line space that should be doing work for you.',
        },
        {
          heading: 'How to see your current signal yourself',
          body: 'The Recruiter Search Rank simulator on hiring.productions runs the 5 boolean searches a recruiter for your target entry-level role would actually use, estimates where you rank in each, and surfaces the 3 highest-leverage moves. Free to try. It’s built from real recruiter sourcing practice, calibrated to how LinkedIn’s algorithm actually weights signals. Worth running before your next round of applications — most new grads find they’re in the 70–150 rank range when recruiters scroll the first 30 results.',
        },
      ]}
      faqs={[
        {
          q: 'What do recruiters actually look for in new grads?',
          a: 'Five things, in order: role targeting, evidence of any real work (internship/project/research), specifics that suggest depth (real numbers, real tools, real names), proof of seriousness (a portfolio or RepVera page link), and a resume that doesn’t read as AI-polished. The whole scan takes 6–10 seconds. Polish doesn’t pass — these five do.',
        },
        {
          q: 'How do recruiters screen entry-level resumes so fast?',
          a: 'Pattern-matching, not reading. After the first hundred entry-level resumes for a role, the recruiter knows exactly what they’re looking for and can scan a new resume in under 10 seconds. The fast scan is for the five signals above; anything that lacks at least 3 of them gets binned.',
        },
        {
          q: 'Do recruiters care about GPA for new grads?',
          a: 'For most non-elite roles: only if it’s 3.5 or above. Below that, leave it off. For top consulting/banking/tech: it depends on the firm but the bar is usually 3.7+ to be a signal. For everything else, GPA is far less important than evidence of work and role targeting.',
        },
        {
          q: 'Is it OK to use AI on a new-grad resume?',
          a: 'For polish? Yes, but lightly. For drafting? Risky — most AI drafts produce uniform bullet length and alliterative phrasing that recruiters now spot in seconds. Use AI to tighten your draft, but keep specific numbers, weird small details, and varied bullet length. The resume should read like you wrote it.',
        },
        {
          q: 'What’s the most common mistake new grads make on resumes?',
          a: 'Writing the same resume for every role. A generic "recent graduate seeking opportunities" resume gets the same 0% reply rate at every company. Targeting a specific role family — financial analyst, customer success, ops associate — even with the same underlying experience, materially changes response rates.',
        },
        {
          q: 'How do I show real work as a new grad with only one internship?',
          a: 'Describe the internship with specifics: a real outcome, a real number, a real person you worked with, a real moment of decision. Add class projects, research, campus jobs, freelance work, volunteer leadership — anything where you actually did something and produced a result. The resume isn’t a job history; it’s evidence of work.',
        },
        {
          q: 'Does a portfolio or RepVera page actually matter?',
          a: 'Yes — when present, hiring teams click on these about 60% of the time. When absent, candidates rely entirely on the resume reading well. A portfolio link or RepVera page (for receipts of how people described working with you) is one of the highest-ROI things a new grad can set up, and most don’t.',
        },
      ]}
      insideLook={{
        name: 'Run your profile through the recruiter-search simulator',
        description:
          'Upload your LinkedIn PDF. See the 5 boolean searches a recruiter sourcing your target role actually runs, where you rank in each, and the 3 highest-impact moves to climb. Free to try. Built by a senior TA director.',
        href: '/tools/recruiter-search-rank',
        isFree: true,
      }}
      relatedLinks={[
        { label: 'How to stand out as a new grad', href: '/q/how-to-stand-out-as-a-new-grad' },
        { label: 'References for new grad jobs', href: '/q/references-for-new-grad-jobs' },
        { label: 'How to get hired as a new grad', href: '/q/how-to-get-hired-as-new-grad' },
        { label: 'How to beat an ATS', href: '/q/how-to-beat-ats' },
        { label: 'Is my resume good?', href: '/q/is-my-resume-good' },
      ]}
    />
  )
}
