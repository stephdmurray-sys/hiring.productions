import type { Metadata } from 'next'
import { SeoContentPage } from '@/components/seo-content-page'

const CANONICAL = 'https://hiring.productions/q/open-to-work-without-looking-desperate'

export const metadata: Metadata = {
  title: 'How to Use "Open to Work" Without Looking Desperate (Recruiter Answer)',
  description:
    'The "Open to Work" green frame helps in some recruiter searches and hurts in others. Here\'s the specific setting that gets you found without the downside — from a senior TA director.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: 'article',
    title: 'How to use Open to Work without looking desperate',
    description:
      'The specific Open-to-Work setting that boosts recruiter visibility without the public-frame penalty most candidates don\'t know about.',
    url: CANONICAL,
  },
}

export default function OpenToWorkPage() {
  return (
    <SeoContentPage
      badge="ASKED OF A RECRUITER"
      badgeColor="indigo"
      headline='How to use "Open to Work" without looking desperate'
      intro="There are TWO Open to Work modes on LinkedIn. Most candidates only know about the public green-frame version — which does help some recruiter searches but quietly hurts you in others. The recruiters-only mode does the work without the downside. Here's how each one actually changes what recruiters see, and which to pick for your situation."
      canonicalUrl={CANONICAL}
      sections={[
        {
          heading: 'The two settings most candidates conflate',
          body: 'LinkedIn lets you signal Open to Work two ways. (1) Public — the green "Open to Work" frame on your profile photo, visible to literally everyone, including your current employer, coworkers, and competitors. (2) Recruiters-only — invisible on your profile photo but visible to recruiters using LinkedIn Recruiter (the paid sourcing product). Most candidates don\'t realize these are separate settings, and the difference matters a lot.',
        },
        {
          heading: 'What the public green frame actually does',
          body: 'In active-candidate searches (recruiters explicitly looking for job seekers), the green frame boosts your visibility — about a 2x lift in InMail rate per LinkedIn\'s own published data. But in passive-candidate searches (recruiters sourcing for senior or hard-to-fill roles, which is most senior hiring), the green frame can quietly DOWNRANK your profile. The reason: passive-candidate searches at many firms explicitly filter out anyone signaling "actively job-seeking" because they\'re trying to source candidates who aren\'t in the active pool. For most senior roles, this means the green frame helps you in the wrong searches and hurts you in the right ones.',
        },
        {
          heading: "What the recruiters-only mode does",
          body: "Recruiters-only mode gives you the visibility boost in active-candidate Recruiter searches WITHOUT the downside in passive-candidate searches. Recruiters using the paid LinkedIn Recruiter product see an indicator on your profile that you're open; everyone else (including your current boss) sees nothing changed on your profile. For most candidates, this is the better setting almost all the time.",
        },
        {
          heading: 'When the public green frame still wins',
          body: 'Three situations. (1) You\'re a new grad or early-career and most recruiters sourcing you are in the active-candidate mode anyway — the green frame\'s visibility lift outweighs the passive-search penalty. (2) You\'re actively unemployed and time-to-offer matters more than long-term positioning — the green frame compresses the timeline. (3) You work in a function where every search is active (high-volume sales, contract recruiting, gig roles) — the passive-search penalty doesn\'t really apply.',
        },
        {
          heading: 'When the recruiters-only mode wins (most senior candidates)',
          body: 'Three situations. (1) You\'re employed and looking quietly — recruiters-only is the only setting that protects your current job. (2) You\'re a senior IC or manager — most sourcing for senior roles is passive, so the public frame would hurt more than help. (3) You\'re changing functions or industries — your visibility in passive searches matters because you\'re trying to be sourced by hiring teams who weren\'t already looking for someone like you.',
        },
        {
          heading: 'How to set this up correctly',
          body: 'On LinkedIn, click Open to → "Finding a new job." In the settings, choose the role types and locations you want, then look for the "Choose who sees you\'re open" toggle. Set it to "Recruiters only" rather than "All LinkedIn members." Save. That\'s it. The setting is invisible on your profile photo and visible only to recruiters running searches in LinkedIn Recruiter. You can change it any time.',
        },
        {
          heading: "What 'desperate' actually looks like to a recruiter",
          body: `Honestly: the Open to Work frame itself isn't the desperation signal. Recruiters know lots of strong people are open. The actual desperation signals are different and worse. (1) Aggressive InMail follow-ups when the recruiter hasn't responded — once is fine, twice is pushy, three times reads as panicked. (2) "I'll take anything" framing in your headline or About — kills senior search consideration. (3) Connecting with every recruiter and immediately asking about jobs — most recruiters block this within a week. (4) A LinkedIn About that opens with "Currently seeking opportunities to leverage my passion for…" — every desperate generic candidate uses this opener. Avoid these, and the Open to Work setting itself does no damage.`,
        },
        {
          heading: "Want to see how recruiters actually see you?",
          body: "The Recruiter Search Rank simulator on hiring.productions runs the 5 boolean searches a recruiter for your target role would actually use, factoring in your Open-to-Work setting and activity level, and shows you where you rank in each. Free to try. You can see directly whether your current setting is hurting or helping for the searches you want to surface in.",
        },
      ]}
      faqs={[
        {
          q: 'Does the Open to Work frame on LinkedIn make you look desperate?',
          a: "Less than candidates think. Recruiters know lots of strong people are open. The frame's real effect is on search visibility — it boosts you in active-candidate searches and can hurt you in passive-candidate searches. The actual desperation signals are different (pushy InMail follow-ups, generic \"seeking opportunities\" headlines, blanket recruiter connection requests).",
        },
        {
          q: 'Should I use the public Open to Work frame or recruiters-only?',
          a: "For most senior candidates and anyone employed: recruiters-only. It gives you the recruiter-search visibility lift without the passive-candidate-search penalty. For new grads, actively unemployed candidates with time pressure, or high-volume function roles: the public green frame is fine.",
        },
        {
          q: "How do I turn on 'Open to Work' recruiters-only mode?",
          a: 'On your LinkedIn profile, click "Open to" → "Finding a new job." Fill in the role and location preferences. Look for "Choose who sees you\'re open" and select "Recruiters only." Your profile photo stays unchanged; the setting is only visible to recruiters using LinkedIn Recruiter.',
        },
        {
          q: 'Will my current employer see if I turn on Open to Work?',
          a: 'In recruiters-only mode: no. LinkedIn does not show anything on your profile to your coworkers or boss; only recruiters using LinkedIn Recruiter (the paid sourcing product) see an indicator. In public green-frame mode: yes — everyone sees the frame on your profile photo.',
        },
        {
          q: 'Does Open to Work actually help you get hired faster?',
          a: "Per LinkedIn's own published data, profiles with Open to Work signal turned on get roughly 2x more InMails from recruiters. The lift is largest for active-candidate searches. Whether it speeds up your search depends on whether the recruiters you want to hear from are running active-candidate searches (likely yes for entry/mid-level) or passive-candidate searches (likely for senior).",
        },
        {
          q: 'Can recruiters tell if you have Open to Work on?',
          a: 'Recruiters using LinkedIn Recruiter can — they see a clear indicator on your profile in their search results. Regular LinkedIn users only see the public green frame if you have that mode turned on. Recruiters in Recruiter Lite or free LinkedIn sourcing don\'t see the signal the same way.',
        },
        {
          q: 'What about #OpenToWork as a hashtag — does that help?',
          a: "Marginally. The hashtag is a discoverability signal but it\'s less algorithmically weighted than the actual Open-to-Work setting. If you want the visibility, turn on the setting (recruiters-only or public) — that\'s the load-bearing signal. The hashtag is supplementary.",
        },
      ]}
      insideLook={{
        name: "See if your Open to Work setting is helping or hurting",
        description:
          "Upload your LinkedIn profile. The simulator runs 5 real recruiter boolean searches and factors in your Open-to-Work setting + activity level. See where you actually rank. Free to try.",
        href: "/tools/recruiter-search-rank",
        isFree: true,
      }}
      relatedLinks={[
        { label: 'How recruiters search LinkedIn for senior candidates', href: '/rank/recruiter' },
        { label: 'Why am I not getting responses?', href: '/q/why-am-i-not-getting-responses' },
        { label: 'How to beat an ATS', href: '/q/how-to-beat-ats' },
        { label: 'Get found by recruiters', href: '/get-found' },
      ]}
    />
  )
}
