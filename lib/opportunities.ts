/**
 * Open consulting engagements shown on /consider-me.
 *
 * Each entry drives three surfaces:
 *   - the role card on /consider-me (links to the role page)
 *   - the dedicated role page at /consider-me/{slug} with its own
 *     shareable URL, metadata, and application form
 *   - the application payload (title tags the submission, questions
 *     render as required textareas on the form)
 *
 * Add an entry to post a role. Remove it to close the role: the card
 * disappears and the role page 404s.
 */

export interface OpportunitySection {
  heading: string
  body?: string
  bullets?: string[]
}

export interface Opportunity {
  slug: string
  title: string
  meta: string
  client: string
  sections: OpportunitySection[]
  /** Role specific screening questions, rendered as required textareas. */
  questions: string[]
}

export const OPPORTUNITIES: Opportunity[] = [
  {
    slug: 'clinical-talent-assessment-consultant',
    title: 'Clinical Talent Assessment Consultant',
    meta: 'Contract. Remote. Short term, project based.',
    client:
      'A growing outpatient psychiatry practice in the Greater Houston area. Client named once you are engaged.',
    sections: [
      {
        heading: 'The role',
        body: 'Our client is expanding their physician team and needs a highly experienced clinical talent leader to help assess psychiatrist candidates during an active hiring push. This is a focused, high trust engagement. You bring the seasoned eye they do not have in house, and you give them the confidence to move quickly on the right people.',
      },
      {
        heading: 'What you will do',
        bullets: [
          'Conduct one hour interviews with psychiatrist candidates',
          'Assess clinical fit, communication, and how each candidate is likely to show up in practice',
          'Deliver a brief written summary after each interview with your impressions and a clear recommendation',
        ],
      },
      {
        heading: 'Who we are looking for',
        bullets: [
          'Deep talent acquisition or talent assessment experience, ideally in healthcare or clinical hiring',
          'Comfortable evaluating physician or provider candidates. Psychiatry or behavioral health a plus',
          'Strong judgment, and the ability to turn one conversation into a crisp, decision ready write up',
          'Available to begin the week of July 28 or August 3',
        ],
      },
      {
        heading: 'Details',
        bullets: [
          'Contract, paid per interview or per project. Rate discussed on intro call',
          'Candidate interviews expected to begin next week or the week after',
          'Flexible scheduling around candidate availability',
        ],
      },
      {
        heading: 'To be considered',
        body: 'Use the application below. Tell us about your clinical hiring background and include your verified RepVera profile so we can see how the people who have worked with you describe you.',
      },
    ],
    questions: [
      'Describe your experience interviewing and qualifying psychiatrists for outpatient roles. Settings, volume, and how you judge clinical fit.',
    ],
  },
]

export function getOpportunity(slug: string): Opportunity | undefined {
  return OPPORTUNITIES.find((o) => o.slug === slug)
}
