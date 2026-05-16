import type { Metadata } from 'next'
import { SeoContentPage } from '@/components/seo-content-page'

const CANONICAL = 'https://hiring.productions/q/how-to-use-linkedin-alumni-tool'

export const metadata: Metadata = {
  title: 'How to Use the LinkedIn Alumni Tool to Find Jobs (2026 Recruiter Guide)',
  description:
    "The LinkedIn Alumni tool is one of the most underused features for job seekers. Specific walkthrough — what it shows, how to filter, and how to actually reach out without being annoying.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: 'article',
    title: 'How to use the LinkedIn Alumni tool to find jobs',
    description:
      'Step-by-step from a senior recruiter — the alumni tool that surfaces second-degree connections through your college, and how to actually use it.',
    url: CANONICAL,
  },
}

export default function LinkedInAlumniToolPage() {
  return (
    <SeoContentPage
      badge="ASKED OF A RECRUITER"
      badgeColor="indigo"
      headline="How to use the LinkedIn Alumni tool to find jobs"
      intro="The LinkedIn Alumni tool is the single most underused feature for job seekers — it surfaces every person from your college who works at any company, in any city, in any function, all at once. A warm intro from a fellow alum gets you past the resume pile entirely. Here's exactly how to use it, who to message, and how to ask without being the candidate alumni dread hearing from."
      canonicalUrl={CANONICAL}
      sections={[
        {
          heading: 'Where to find the Alumni tool (most people miss it)',
          body: "On LinkedIn, navigate to your college or university's page (search for it in the top search bar and click through). Once on the school page, look for the 'Alumni' tab in the navigation. That's the tool. It shows you every LinkedIn member who lists your school in their education section — usually thousands of people, sortable and filterable. You don't need to be currently enrolled. You don't need to know any of them. The tool works for any degree, any year, any program.",
        },
        {
          heading: "The four filters that change everything",
          body: "(1) Where they live — filter to the metros where you want to work. (2) Where they work — filter to specific target companies. This is the most useful filter for job search. Type the company name and you'll see every alum at that company. (3) What they do — filter by function (Marketing, Engineering, Operations, etc.). (4) What they studied — narrow to alumni in your specific major or degree program for stronger affinity. Combine the filters: 'My major + my target company' often surfaces 3-10 alums you can reach out to with a real basis for the connection.",
        },
        {
          heading: 'Who to actually reach out to (and who to skip)',
          body: "Best targets: alums 3-10 years ahead of you in the same function or company. Senior enough to know what they're talking about, junior enough to remember being new and to actually respond. Skip targets: alums in C-suite roles (they won't respond), alums you have no functional overlap with (no shared frame), and alums in unrelated industries (won't help with your specific job search). The sweet spot is the alum who graduated 3-8 years ago, works at a company you want to work at, in a role you're targeting. That person remembers being you and will usually respond.",
        },
        {
          heading: 'How to message them — the format that gets responses',
          body: 'The format alumni dread: "Hi! I noticed we went to the same school. I\'d love to connect and learn from your career path. Do you have 15 minutes for a quick call?" Alumni get 30+ of these a week and ignore most. The format that works: be specific about what you\'re trying to decide. "Hi [Name] — fellow [School] grad, also [your major]. I\'m trying to decide between [specific direction A] and [specific direction B] for the work I want to do. You took option [A/B] — what would you recommend? Happy to ask in writing if easier than a call." That message gets responses because it asks a specific answerable question and gives them an easy way to help.',
        },
        {
          heading: "What to ask once they respond",
          body: "Don't ask for a job. Ask for a specific decision-help question that gives you insight you couldn't get anywhere else. Good questions: 'What's the biggest thing you wish you'd known about working at [company] before joining?' 'How did you actually get the role you have now — was the application the path, or was it a referral or internal move?' 'For someone trying to break into [function] in [year], what would you focus on?' Bad questions: 'Can I have a referral?' 'Can you forward my resume?' 'Are there any openings?' The bad versions front-load the ask; the good versions earn the offer of help, which often comes unprompted.",
        },
        {
          heading: "Why this works mechanically",
          body: "Three reasons. (1) Alumni feel a small but real obligation to help fellow alums — it's one of the few remaining warm signals on LinkedIn. (2) A warm alum intro at a company often skips your resume past the recruiter screen entirely — companies process referred candidates faster and more favorably. (3) Alumni in roles you want have specific information you can't get from any blog post or job description: what the actual work is like, who you'd report to, what the hiring process really screens for. That intel changes which roles you apply to and how you tailor materials.",
        },
        {
          heading: 'Common mistakes that kill the alumni outreach channel',
          body: "(1) Mass-messaging the same template to 40 alums in a week. They notice and they tell each other. (2) Asking for a referral on the first message before establishing any rapport — desperate signal, kills the response. (3) Following up aggressively when someone doesn't respond. Once is fine, twice is pushy, three times reads as panicked. (4) Treating the alumni conversation as transactional. The alums who help most are the ones who feel like they're helping someone interesting, not someone executing a tactic. Show actual curiosity.",
        },
        {
          heading: 'How alumni outreach pairs with the rest of your job search',
          body: "Alumni outreach is the FASTEST referral source for most candidates — 3-10 alums per target company, each with a 30-50% response rate if you message well, each with the potential to move your application to the top of the pile. Pair it with: optimizing your LinkedIn profile so when the alum looks you up they see a serious candidate (run the Recruiter Search Rank simulator to see how recruiters at their company will see you); and a strong RepVera page so when they decide whether to refer you, they have receipts to look at. The alumni tool is the discovery; the rest of your materials are what they actually pass along.",
        },
      ]}
      faqs={[
        {
          q: 'What is the LinkedIn Alumni tool and how do I find it?',
          a: "It's a hidden feature on every college and university LinkedIn page that surfaces every LinkedIn member who lists that school in their education section. Find your school's LinkedIn page (search in the top bar), click through, and look for the 'Alumni' tab. Filter by location, employer, function, or field of study to find specific alums to reach out to.",
        },
        {
          q: 'Is it OK to message strangers through the LinkedIn Alumni tool?',
          a: "Yes — that's literally what the tool is for. Alumni expect cold messages from fellow grads at a much higher rate than from generic LinkedIn users. The key is messaging well: be specific about what you're trying to decide, ask a real question, don't lead with a request for a referral. Done right, response rates run 30-50%.",
        },
        {
          q: 'What\'s the best message to send an alum on LinkedIn?',
          a: 'Be specific: "Fellow [School] grad, also [your major]. I\'m trying to decide between [specific option A] and [specific option B] for the work I want to do. You took option A — what would you recommend?" Specific question = specific answer. Generic "would love 15 minutes" = ignored. Most alums get 30+ generic requests a week.',
        },
        {
          q: 'How many alums should I message per week?',
          a: "5-10 thoughtful, specific messages per week consistently outperforms 30+ template messages. Quality of message > volume. The alums you want to reach are saturated with mass-outreach attempts; the ones that stand out are the messages that prove the sender actually thought about who they were writing to.",
        },
        {
          q: 'Will an alum referral actually help me get hired?',
          a: 'Yes — measurably. Companies prioritize referred candidates: faster screening, higher response rates, often a separate referral lane. An alum referral at a target company is typically the single highest-leverage thing a job seeker can produce. Worth significant effort to land even one good one per company you actually want to work at.',
        },
        {
          q: 'What if no alums from my school work at my target companies?',
          a: 'Widen the net. Search by company AND function, not by company alone — alums in your function who don\'t work at your target company can still introduce you to people in their network who do. Or filter by city and look for alums in adjacent companies in the same industry; lateral introductions work too.',
        },
        {
          q: 'How long should I wait if an alum doesn\'t respond?',
          a: 'One follow-up message after 10-14 days is fine. Beyond that, move on — they\'re not going to respond. Following up three times reads as panicked and gets you blocked. Most alums who respond do so within the first 48 hours; the ones who haven\'t answered in two weeks usually never will.',
        },
      ]}
      insideLook={{
        name: 'See how recruiters at your target companies see you',
        description:
          "Before you reach out to an alum, make sure your LinkedIn shows up. Upload your profile, see the 5 boolean searches recruiters at your target role actually run, and where you rank. Free.",
        href: '/tools/recruiter-search-rank',
        isFree: true,
      }}
      relatedLinks={[
        { label: 'How recruiters search LinkedIn for senior candidates', href: '/rank/recruiter' },
        { label: 'How to get hired as a new grad', href: '/q/how-to-get-hired-as-new-grad' },
        { label: 'How to stand out as a new grad', href: '/q/how-to-stand-out-as-a-new-grad' },
        { label: 'How to use Open to Work without looking desperate', href: '/q/open-to-work-without-looking-desperate' },
      ]}
    />
  )
}
