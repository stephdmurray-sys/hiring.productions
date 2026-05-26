import type { Metadata } from 'next'
import { SeoContentPage } from '@/components/seo-content-page'

const CANONICAL =
  'https://hiring.productions/q/can-recruiters-find-me-on-linkedin'

export const metadata: Metadata = {
  title: 'Can Recruiters Find Me on LinkedIn? (Senior Recruiter Answer)',
  description:
    "How LinkedIn Recruiter search actually works, which profile fields matter most, and how to test if you would surface for your target role. From a 20-year talent acquisition leader who has run thousands of these searches.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: 'article',
    title: 'Can recruiters find me on LinkedIn?',
    description:
      "The fields that actually matter when a recruiter pastes a boolean string into LinkedIn Recruiter. From someone who has run thousands of these searches.",
    url: CANONICAL,
  },
}

export default function CanRecruitersFindMeOnLinkedInPage() {
  return (
    <SeoContentPage
      badge="ASKED OF A RECRUITER"
      badgeColor="indigo"
      headline="Can recruiters find me on LinkedIn?"
      intro="Not the way you think. Recruiters don't scroll your profile and decide. They paste a boolean search string into LinkedIn Recruiter, see a ranked list of 200+ profiles, and decide in 2 seconds per profile whether to click yours. Whether you surface in that list, and where you rank in it, comes down to about seven specific fields that LinkedIn weights heavily. Almost everything else on your profile is decoration for the click-through moment, not the discovery moment."
      canonicalUrl={CANONICAL}
      sections={[
        {
          heading: 'How recruiters actually search (it is not browsing)',
          body: "When a recruiter uses LinkedIn Recruiter (the paid sourcing product, separate from regular LinkedIn), they construct a boolean query that looks something like: ('Product Manager' OR 'PM' OR 'Senior Product Manager') AND (B2B OR SaaS) AND (fintech OR healthtech) NOT (founder OR consulting). They add filters: location, years of experience, current company size, function. LinkedIn returns a ranked list. The recruiter starts at rank 1 and works down until they find 8 to 12 candidates worth contacting. Most never scroll past page 3. If you rank 60th, you are functionally invisible.",
        },
        {
          heading: 'The seven fields that decide whether you surface',
          body: "LinkedIn Recruiter weights these fields, roughly in this order: (1) current job title, by far the heaviest signal, (2) headline, almost as heavy and the one most candidates underuse, (3) About section, lightly weighted but read for context once you are clicked, (4) Skills section, used for exact-match filtering, (5) recent role descriptions, weighted lower than current title but factored, (6) location and Open-to-Work signal, used as filters not ranking, (7) activity level (recent posts, comments, profile updates), which influences the 'recently active' boost. Everything else (school, certifications, recommendations) matters for the click-through decision, not the surfacing decision.",
        },
        {
          heading: "Why your current title is doing 60% of the work",
          body: "If your current title does not contain the role the recruiter is searching for, you do not surface. Period. Recruiters paste exact strings: 'Product Manager' AND 'Senior'. If your title says 'Lead PM, Growth' or 'Senior Product Owner' or 'Founder, building a product' or just 'Senior Manager,' the search will skip you. The fix is rarely lying about your title. It is making sure your title contains the language of the role you want to be found for, even if your company uses non-standard internal titles. LinkedIn lets you edit your headline freely. Use it to surface the standard title underneath your company's actual one.",
        },
        {
          heading: 'The headline trick most candidates miss',
          body: "Your headline (the 220-character line under your name) gets indexed for search but is NOT your title. Most candidates use it for self-description ('Passionate product leader building delightful experiences') which contains zero search-matchable terms. Recruiters never search for 'passionate' or 'delightful.' They search for 'Senior Product Manager, B2B SaaS, fintech.' If those words are in your headline, you surface. If they are not, you do not. The headline should read like a self-targeted boolean string: role + level + industry + 1-2 must-have specifics. That is the single highest-leverage change you can make to be found.",
        },
        {
          heading: "Skills are filter gates, not ranking factors",
          body: 'LinkedIn lets recruiters filter by Skills. When a recruiter checks the "Python" or "Salesforce Admin" or "Series A fundraising" filter, they are doing exact-match filtering, not fuzzy match. If you have built a career around Salesforce administration but never added "Salesforce Admin" to your Skills section, you get filtered OUT before ranking even matters. Audit your Skills section against the actual filters a recruiter for your target role would check. LinkedIn caps you at 50 skills. Use them. The top 3 to 5 are the ones LinkedIn surfaces prominently; make sure those are the searchable terms recruiters actually filter on.',
        },
        {
          heading: 'Recency, activity, and the "Open to Work" indicator',
          body: "LinkedIn Recruiter boosts profiles that have been recently active (posted, commented, updated in the last 30 days) and profiles with the Open-to-Work setting on. For most senior candidates, the recruiters-only Open-to-Work mode (invisible to your boss, visible to recruiters using Recruiter) gives you the visibility lift without the downside. A profile that has been static for 18 months ranks below otherwise-identical profiles that were updated last week. The fix is one small update per month, not a full rewrite.",
        },
        {
          heading: 'Location and the radius trap',
          body: "Recruiters set a location filter on most searches. The default radius in LinkedIn Recruiter is 25 miles. If your profile location is the suburb you actually live in (rather than the metro), you may surface for searches centered on your suburb but get filtered out of searches centered on the city 30 miles away. The fix: use the metro area, not the specific suburb. Your profile location should match what most recruiters typing the search would enter as the location filter. For remote-friendly searches, set your location to a major metro and turn on the 'Open to remote' option separately.",
        },
        {
          heading: 'How to test whether you actually surface',
          body: "You cannot search LinkedIn Recruiter directly without a paid license, but the Recruiter Search Rank tool on hiring.productions runs the five boolean searches a recruiter for your target role would actually use (calibrated against the LinkedIn Recruiter algorithm) and shows you your estimated rank in each, plus the three highest-impact moves to climb. It is the closest thing to seeing yourself the way recruiters see you. Free to try.",
        },
      ]}
      faqs={[
        {
          q: 'How do recruiters find people on LinkedIn?',
          a: "Recruiters use LinkedIn Recruiter (the paid sourcing product), not regular LinkedIn. They construct boolean search strings and apply filters for location, function, years of experience, and skills. LinkedIn returns a ranked list of profiles. The recruiter works down from rank 1, usually contacting 8 to 12 candidates per search. The decision of who surfaces (and in what rank order) is driven by your current title, headline, skills, location, and activity level, not by how interesting your profile is to read.",
        },
        {
          q: 'What is the most important LinkedIn field for being found by recruiters?',
          a: "Your current job title carries the heaviest weight in LinkedIn Recruiter search, by a wide margin. If your title does not contain the role the recruiter is searching for, you do not surface. Your headline is the second-most weighted field and the one most candidates underuse. The two together do roughly 80% of the work of being discoverable. Skills, About section, and recent activity are tiebreakers and click-through factors.",
        },
        {
          q: 'Should I include keywords in my LinkedIn headline?',
          a: "Yes, and they should be the words a recruiter for your target role would actually type. Headlines like 'Passionate product leader' or 'Driven sales professional' contain zero search-matchable terms. A recruiter searching for you would type role + level + industry + a must-have specific. Mirror that pattern in your headline. Example: 'Senior Product Manager, B2B SaaS. 0-to-1 marketplace experience, fintech and healthtech.' Searchable, specific, and still readable.",
        },
        {
          q: 'How can I tell if recruiters are seeing my LinkedIn profile?',
          a: "LinkedIn gives you a 'Who viewed your profile' metric, but for free accounts it is anonymized and limited. The signal that actually matters is incoming recruiter InMail and connection requests from recruiters. If you are getting fewer than 1 to 2 per month and want to be hired, recruiters are not finding you, regardless of what your profile-view count looks like. The honest diagnostic is to test whether you surface in the searches a recruiter for your role would actually run.",
        },
        {
          q: 'Does Open to Work help recruiters find me on LinkedIn?',
          a: "Yes. Per LinkedIn's own published data, profiles with the Open-to-Work signal on get roughly 2x more recruiter InMail. The recruiters-only mode (invisible on your profile photo, visible only to recruiters using LinkedIn Recruiter) gives you the visibility lift without making your job search public. For most senior candidates, this is the better mode. The public green-frame mode is fine for new grads, actively unemployed candidates with time pressure, or high-volume function roles where the passive-search penalty does not apply.",
        },
        {
          q: 'How important is my LinkedIn profile photo for being found?',
          a: "For surfacing in a recruiter search, the photo does not matter. LinkedIn Recruiter does not weight profile photos in ranking. For the click-through decision (whether the recruiter clicks your profile once you have surfaced), the photo matters significantly. Profiles without a photo get clicked 14x less, per LinkedIn data. A professional, recent, well-lit photo is table stakes for being taken seriously once you do surface.",
        },
        {
          q: 'What if my actual job title is non-standard or company-specific?',
          a: "Many companies use idiosyncratic internal titles (Chief of Staff, Member of Technical Staff, Growth Lead, Engineer III) that recruiters do not search for directly. The fix is to use your LinkedIn headline to surface the standard title equivalent. Your job title can stay as your company titles it. Your headline can read: 'Engineer III at [Company]. Senior Software Engineer, distributed systems, Go and Rust.' Now recruiters searching for 'Senior Software Engineer' find you, even though your title says something else.",
        },
        {
          q: 'How often should I update my LinkedIn profile to stay surfaced?',
          a: "Once a month is enough to ride the recency boost. The update does not need to be substantive. Adding a skill, editing a bullet, posting once, or commenting on three industry posts is sufficient to keep the 'recently active' signal warm. LinkedIn Recruiter has a built-in filter for recently active profiles, and recruiters frequently apply it because they want responsive candidates, not ghost profiles.",
        },
      ]}
      insideLook={{
        name: 'Where Do You Rank in a Recruiter Search?',
        description:
          "Upload your LinkedIn profile PDF. The simulator runs five boolean searches a recruiter for your target role would actually use, factoring in the LinkedIn Recruiter algorithm. See your estimated rank in each. Plus the three highest-leverage moves to climb. Free to try.",
        href: '/tools/recruiter-search-rank',
        isFree: true,
      }}
      relatedLinks={[
        { label: 'What do recruiters actually search for on LinkedIn?', href: '/q/what-do-recruiters-actually-search-for-on-linkedin' },
        { label: 'Open to Work without looking desperate', href: '/q/open-to-work-without-looking-desperate' },
        { label: 'How to use the LinkedIn alumni tool', href: '/q/how-to-use-linkedin-alumni-tool' },
        { label: 'Would a Recruiter Even Find You: the diagnostic', href: '/tools/recruiter-find-you' },
      ]}
    />
  )
}
