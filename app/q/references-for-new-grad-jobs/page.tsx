import type { Metadata } from 'next'
import { SeoContentPage } from '@/components/seo-content-page'

const CANONICAL = 'https://hiring.productions/q/references-for-new-grad-jobs'

export const metadata: Metadata = {
  title: 'References for New Grad Jobs in 2026 — Who to Ask + What Actually Works',
  description:
    "What new grads should use for references in 2026: who to ask, how to ask, why 'references available upon request' is dead, and the modern way to actually show what people said about working with you.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: 'article',
    title: 'References for new grad jobs in 2026',
    description:
      'Who to ask, what to capture, and why a portable receipt page now beats a list of names recruiters never call.',
    url: CANONICAL,
  },
}

export default function ReferencesNewGradPage() {
  return (
    <SeoContentPage
      badge="FOR NEW GRADS"
      badgeColor="indigo"
      headline="References for new grad jobs — who to ask + what actually works"
      intro="Most new grads list two references and hope. The 2026 reality: recruiters rarely call references for entry-level roles unless the candidate is already a finalist — and at that point, the names you listed barely matter. What matters is what people who’ve actually seen you work have ALREADY said about you, in their own words, captured somewhere a hiring team can read in 30 seconds."
      canonicalUrl={CANONICAL}
      sections={[
        {
          heading: 'Why the old way is broken',
          body: '"References available upon request" was useful when hiring teams had time to call three names and verify a candidate. They don’t anymore. For most entry-level roles, references get checked AFTER the offer is verbal — meaning they don’t help you get the interview, the second round, or the offer in the first place. The names on your reference list aren’t pulling weight; they’re a formality at the end of a process that already decided.',
        },
        {
          heading: 'Who you should actually be capturing references from',
          body: 'Professors who taught you in small classes (the ones who know how you think under pressure). Internship managers (even if your internship was only 10 weeks). Group project teammates from upper-level courses where you actually shipped something. Campus-job supervisors — the dining hall manager, the writing center director, the research assistant lead. Club advisors. Volunteer coordinators. Anyone who watched you do work and can speak to a specific moment. Aim for 10–15 of these — not the 2-3 senior names everyone else has.',
        },
        {
          heading: 'How to ask without it being weird',
          body: 'Ask while the work is fresh — at the end of the semester, the project, the internship. Be specific about what you want them to speak to: "I’m starting a RepVera page and I’d love to capture something about [the specific work I did]. Could you write a couple of sentences on what stood out, what we built, or how I handled the [specific moment]?" Most people will say yes — they remembered you, and they want to help. The ones who hedge weren’t going to be useful references anyway.',
        },
        {
          heading: 'What a strong new-grad reference actually sounds like',
          body: '"She caught a data error in our second week that would have cost us $14K. Most interns wouldn’t have raised it." That’s a reference. It’s specific, it’s unfakeable, it shows judgment and initiative — exactly what hiring teams screen for in new grads. Compare to: "Stephanie was a strong intern. She was reliable, hard-working, and a pleasure to work with." That second one is the kind of reference 99% of new grads have. It’s instantly forgettable. The specific moment is what people remember.',
        },
        {
          heading: 'Why "references available upon request" is dead space on a resume',
          body: 'Every resume has it. It signals nothing. It takes up the bottom line of a one-page resume where you could put a portfolio link, a project URL, or a link to your RepVera page where 12 receipts already exist. The phrase made sense in 1995 when resumes were faxed and references were assumed. In 2026 it’s the equivalent of telling a hiring team "I’m ordinary in the exact same way every other candidate is ordinary." Replace it with proof.',
        },
        {
          heading: 'RepVera — the modern answer for new grad references',
          body: 'RepVera is where you capture and own the receipts of how people described working with you. Real words from professors, managers, teammates, advisors — saved in your account, visible to anyone you point at your RepVera page. Free to start. For a new grad with no employment history, this is the asset that closes the gap. Hiring teams clicking through to your RepVera see actual humans saying actual things — not a list of names they’d have to chase. It’s the difference between "trust me on this" and "see for yourself."',
        },
        {
          heading: 'What to do this week',
          body: 'One: open RepVera and start your page (free). Two: list 10–15 people who’ve seen you work and write one short request to each, naming the specific moment you want them to speak to. Three: as receipts come in, put your RepVera URL in your LinkedIn About section, at the bottom of your resume (in place of "references available upon request"), and in your cover letter signature. Hiring teams click through. The candidates who do this in October are showing receipts in February when everyone else is still hoping.',
        },
      ]}
      faqs={[
        {
          q: 'Do new grads need references on resumes in 2026?',
          a: 'No — "references available upon request" is dead space. Replace it with a link to a portfolio, project, or a RepVera page where you’ve already captured what people said about working with you. The candidates getting calls have proof of work or proof of voice visible upfront, not promised at the end.',
        },
        {
          q: 'Who should new grads ask for references?',
          a: 'Professors from small classes, internship managers, project teammates, campus-job supervisors, club advisors, volunteer coordinators. The most useful references are the people who saw specific moments of how you work — not the most senior names you can find. 10–15 of those beats 2 generic ones.',
        },
        {
          q: 'How many references should a new grad have?',
          a: '10–15 captured receipts is the realistic target for the modern job search. Old advice said 2–3. The reason it’s changed: most hiring teams never call references anymore for entry-level. They want to SEE words other people used about you, in their own voice. More receipts = more chances one of them resonates with the role.',
        },
        {
          q: 'What’s the difference between a reference and a RepVera receipt?',
          a: 'A reference is a name a recruiter has to call. A receipt is the actual words a person already said about working with you, saved in your account and visible whenever you choose. References require initiative from the recruiter. Receipts do the work for you before they pick up the phone.',
        },
        {
          q: 'Can professors actually write professional references?',
          a: 'Yes — and for new grads they’re often the strongest references, because they saw you over months under real intellectual pressure. A professor who can say "she rewrote her thesis from scratch in the last two weeks when her data fell apart, and the final version was stronger than the original" is a more useful reference than a senior executive who barely interacted with you during a summer internship.',
        },
        {
          q: 'Should I list references on a separate sheet?',
          a: 'Not anymore. Put a RepVera page URL in your LinkedIn About section, at the bottom of your resume, and in your cover letter signature. Hiring teams click through. The separate sheet went out with faxed resumes.',
        },
        {
          q: 'How do I ask a professor for a reference without it being awkward?',
          a: '"I’m starting a RepVera page where I’m capturing what people I’ve worked with say about how I work. I’d love to include something from you about [specific work / specific moment]. Would you have a few minutes to send me a couple of sentences? No rush." That’s it. Most professors will say yes.',
        },
      ]}
      insideLook={{
        name: 'See your LinkedIn through a recruiter’s eyes',
        description:
          'Upload your profile, see where you rank when a recruiter searches for an entry-level role in your field, and the 3 moves to climb. Free.',
        href: '/tools/recruiter-search-rank',
        isFree: true,
      }}
      relatedLinks={[
        { label: 'Start your RepVera (free)', href: 'https://www.repvera.com' },
        { label: 'How to stand out as a new grad', href: '/q/how-to-stand-out-as-a-new-grad' },
        { label: 'How to get hired as a new grad', href: '/q/how-to-get-hired-as-new-grad' },
        { label: 'New grad hub', href: '/for-new-grads' },
      ]}
    />
  )
}
