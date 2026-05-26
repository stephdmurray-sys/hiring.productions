import type { Metadata } from 'next'
import { SeoContentPage } from '@/components/seo-content-page'

const CANONICAL =
  'https://hiring.productions/q/what-do-recruiters-actually-search-for-on-linkedin'

export const metadata: Metadata = {
  title: 'What Do Recruiters Actually Search for on LinkedIn? (Senior Recruiter Answer)',
  description:
    "The boolean strings, the filters, and the exclusions a working recruiter actually uses in LinkedIn Recruiter. Not generic optimization tips, the actual syntax and decision tree behind a sourcing search.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: 'article',
    title: 'What do recruiters actually search for on LinkedIn?',
    description:
      "The boolean strings, the filters, and the exclusions a working recruiter actually uses. The actual syntax behind a sourcing search.",
    url: CANONICAL,
  },
}

export default function WhatDoRecruitersSearchForPage() {
  return (
    <SeoContentPage
      badge="ASKED OF A RECRUITER"
      badgeColor="indigo"
      headline="What do recruiters actually search for on LinkedIn?"
      intro="Working recruiters use LinkedIn Recruiter (the paid sourcing product), not regular LinkedIn search. They paste boolean strings, layer in filters, and exclude entire categories of candidates the search would otherwise surface. The actual syntax is more specific than candidates think, and the exclusion filters are the part nobody talks about. Here is what a real sourcing search looks like, line by line."
      canonicalUrl={CANONICAL}
      sections={[
        {
          heading: 'What a real boolean search actually looks like',
          body: "Here is a real sourcing query for a Senior Product Manager role at a fintech Series B startup: (\"Senior Product Manager\" OR \"Sr. PM\" OR \"Sr Product Manager\" OR \"Lead Product Manager\") AND (fintech OR \"financial services\" OR payments OR \"open banking\") AND (B2B OR SaaS OR \"enterprise software\") NOT (founder OR consultant OR \"consulting\" OR \"head of product\" OR VP). Notice three things: synonyms for the title get OR'd together, the industry terms are also OR'd, and there is an exclusion list at the end NOT'ing out categories the recruiter has decided not to source from. Most candidates think about how to match the inclusions. The exclusions are where many qualified people quietly get filtered out before the search even returns results.",
        },
        {
          heading: 'The five filters that get applied on top of the boolean',
          body: 'LinkedIn Recruiter lets sourcers layer filters on top of the boolean string. The five most common: (1) Location, with a default 25-mile radius around a city or zip, (2) Years of experience, set as a range like 5-9 years total experience, (3) Current company size (1-10, 11-50, 51-200, 201-500, 501-1000, 1001-5000, 5001-10000, 10001+), (4) Function (Engineering, Product, Sales, Marketing, Operations, etc.), (5) Open to new opportunities (the Open-to-Work indicator). Candidates who pass the boolean but fail any of these filters never appear in the results. The filters are why "I match all the keywords but never hear back" happens.',
        },
        {
          heading: 'The exclusion filters nobody talks about',
          body: 'Recruiters routinely exclude categories that match the inclusions on paper. The most common exclusions: candidates with a current title containing "Founder," "Co-founder," or "Owner" (assumed flight risk or not actually looking for an IC role), candidates whose most recent stint at any company is under 12 months (job hopping signal), candidates whose current company is a known competitor on a do-not-poach list, candidates whose profile has not been updated in 18+ months (assumed dormant), and candidates outside the location filter even by 1 mile. None of these exclusions are visible to the candidate. They look identical to "not finding the role" from your end.',
        },
        {
          heading: 'Skills filters are exact-match',
          body: 'When a recruiter checks a Skills filter (say, "Salesforce Administration" or "Python" or "Series A fundraising"), LinkedIn applies exact-match filtering against the Skills section of each profile. Fuzzy match does not happen. If your career is built on Salesforce administration but your Skills section says "Salesforce" instead of "Salesforce Administration," you get filtered out of every search that uses the latter as a Skills gate. The fix is auditing your Skills section against the exact filters a recruiter for your target role would check, then adding the exact-match versions. LinkedIn caps you at 50. Use them.',
        },
        {
          heading: 'The years-of-experience filter quirk',
          body: 'LinkedIn calculates years of experience from your earliest dated role. If your LinkedIn includes your high school job at a coffee shop (2003-2005), LinkedIn thinks you have 23 years of experience, which throws you out of every "5-9 years experience" search even if your real career started in 2015. The fix is removing early-career, unrelated roles from your LinkedIn entirely (you can keep them on your resume if relevant; LinkedIn does not need them). Match the years-of-experience signal to your actual career arc, not to a complete employment history.',
        },
        {
          heading: 'The "recently active" filter changes who surfaces',
          body: 'A common toggle in LinkedIn Recruiter is "Active recently" or "Active within the last 30 days." When this is on, profiles that have not been updated, posted, or commented in 30+ days drop entirely out of results, regardless of how well they match the boolean. Recruiters apply this filter when they want responsive candidates, not dormant profiles. A profile that is perfect on paper but has been static for 6 months becomes invisible the moment the recruiter checks this box. The fix is one small update per month, which is enough to keep the signal warm.',
        },
        {
          heading: "What recruiters look at after you surface",
          body: "Once you surface in the ranked list, the recruiter has about 2 seconds per profile to decide whether to click. The fields that drive that click decision (not the surfacing decision) are: profile photo present and professional, headline that reads as the recruiter expected from your title, current company name that the recruiter recognizes or that has obvious signal (Series B, public, well-known), and outcome language in the current role's first bullet. Profiles get skipped at the click stage for missing photos, headlines that read as generic self-description, and unclear current-role context.",
        },
        {
          heading: "Want to see the actual searches a recruiter would run for your role?",
          body: "The Recruiter Search Rank tool on hiring.productions runs the five boolean searches a recruiter for your target role would actually use, factoring in real LinkedIn Recruiter syntax including the exclusion filters most candidates do not know about. It shows you your estimated rank in each search and the three highest-leverage moves to climb. The simulator is calibrated against actual recruiting practice, not generic LinkedIn optimization advice. Free to try.",
        },
      ]}
      faqs={[
        {
          q: 'What boolean strings do recruiters actually use on LinkedIn?',
          a: 'A real boolean string includes title synonyms OR-d together, industry or domain terms OR-d, and an exclusion list NOT-d. Example for a Senior Product Manager at a B2B SaaS fintech: ("Senior Product Manager" OR "Sr. PM" OR "Lead Product Manager") AND (fintech OR "financial services") AND (B2B OR SaaS) NOT (founder OR consultant OR VP). The exclusion list at the end is the part most candidates do not realize exists, and it routinely filters out qualified people who match all the inclusions.',
        },
        {
          q: 'What filters do recruiters apply on LinkedIn Recruiter?',
          a: 'The five most common filters layered on top of the boolean string: location with a default 25-mile radius, years of experience as a range, current company size in bracketed bands, function (Engineering, Product, Sales, etc.), and Open-to-Work status. Recruiters also frequently apply a "recently active" filter to exclude dormant profiles. Candidates who match the boolean but fail any of these filters never appear in the results, which explains a lot of the "I match the keywords but never get contacted" gap.',
        },
        {
          q: 'How do recruiters search for senior candidates on LinkedIn?',
          a: 'Senior-role searches usually use passive-candidate mode: the recruiter is trying to source candidates who are NOT obviously looking. They build boolean strings that emphasize specific scope language (team size, ARR responsibility, P&L, multi-region), filter for years of experience in a tight band (often 8 to 15 years), and frequently exclude candidates with the Open-to-Work public frame on because the search is specifically looking for currently-employed senior people. The dynamics for senior search are different from active-candidate search, which is why advice tuned to one often misses for the other.',
        },
        {
          q: 'Do recruiters use exact-match or fuzzy match in LinkedIn search?',
          a: 'Boolean string matching is fuzzy at the keyword level: LinkedIn will match "Product Manager" against profiles that have "Product Mgr" or "PM" if the surrounding context fits. But Skills filters are strict exact-match. If a recruiter checks the "Salesforce Administration" Skills filter, you must have that exact skill listed in your Skills section to pass. Fuzzy match does not happen at the filter level. This is the most common reason qualified candidates get filtered out invisibly.',
        },
        {
          q: 'What is the most common LinkedIn search mistake recruiters make?',
          a: 'Over-narrow exclusions. A recruiter sets up a search to exclude founders, consultants, and anyone whose current company is not a household name, then wonders why the pool is small. The exclusions filter out a lot of qualified candidates with non-traditional paths. From the candidate side, this is why your career arc may legitimately match the role but your profile never surfaces. The fix on your end is making sure your LinkedIn headline includes the standard role language, not just your company\'s internal title or your personal positioning.',
        },
        {
          q: 'Why do I not surface for searches for my own job title?',
          a: "Three common reasons. First, your job title field uses your company's internal title (Senior Member of Technical Staff, Growth Lead, Chief of Staff) rather than the standard industry equivalent, so recruiters searching for the standard title do not match. Second, your LinkedIn location is set to a suburb instead of the metro, so location-radius filters miss you. Third, your profile has not been updated in 18+ months and is being filtered out by the recently-active toggle. The fix for all three is on your end and takes about 15 minutes.",
        },
        {
          q: 'How do recruiters narrow down 200 candidates to a shortlist?',
          a: 'After the boolean returns its ranked list, the recruiter starts at rank 1 and works down. For each profile, about 2 seconds: scan the headline, the current company, the current role first bullet, and the photo. Profiles that pass that scan get a closer 30-second look at scope language, tenure pattern, and any obvious red flags. Profiles that pass that get added to the shortlist. Most recruiters stop sourcing once they have 8 to 12 strong candidates, which usually happens before they get past the first 60 profiles in the ranked list.',
        },
        {
          q: 'How can I see what recruiters would see when they search for my role?',
          a: 'You cannot use LinkedIn Recruiter directly without a paid license. The Recruiter Search Rank tool on hiring.productions runs the five boolean searches a recruiter for your target role would actually use (calibrated against real LinkedIn Recruiter syntax including exclusions) and shows you your estimated rank in each. It is the closest thing to seeing yourself the way recruiters see you in their sourcing tool.',
        },
      ]}
      insideLook={{
        name: 'Where Do You Rank in a Recruiter Search?',
        description:
          "Upload your LinkedIn profile PDF. The simulator runs five boolean searches a recruiter for your target role would actually use, including the exclusion filters most candidates do not know about. See your estimated rank in each. Plus the three highest-leverage moves to climb. Free to try.",
        href: '/tools/recruiter-search-rank',
        isFree: true,
      }}
      relatedLinks={[
        { label: 'Can recruiters find me on LinkedIn?', href: '/q/can-recruiters-find-me-on-linkedin' },
        { label: 'Open to Work without looking desperate', href: '/q/open-to-work-without-looking-desperate' },
        { label: 'How to use the LinkedIn alumni tool', href: '/q/how-to-use-linkedin-alumni-tool' },
        { label: 'Would a Recruiter Even Find You: the diagnostic', href: '/tools/recruiter-find-you' },
      ]}
    />
  )
}
