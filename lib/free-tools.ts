/**
 * Every free tool on hiring.productions, for the /tools page, the homepage
 * free tools band and the menu. One list, so a new tool shows up everywhere
 * at once and no page hardcodes a count.
 *
 * The two sides are mirrored row by row (Stephanie, Nov 15, 2026: even
 * options, both sides of the table). The first four rows are in the order the
 * research supports (real or fake, what to ask, screening software, cost);
 * the homepage shows those four. "get" is what a visitor walks away with, and
 * each one is something the page really gives: a checklist, an email, a file.
 */

export type FreeToolIcon =
  | 'real'
  | 'ask'
  | 'screen'
  | 'bill'
  | 'free'
  | 'repeat'
  | 'proof'
  | 'list'
  | 'scorecard'
  | 'calculator'
  | 'shield'
  | 'layers'
  | 'value'

export interface FreeToolCard {
  id: string
  side: 'seekers' | 'hiring'
  /** The question the visitor is already asking. */
  title: string
  /** What the tool does, in one line. */
  what: string
  /** What they walk away with. */
  get: string
  href: string
  icon: FreeToolIcon
}

export const FREE_TOOL_CARDS: Record<'seekers' | 'hiring', FreeToolCard[]> = {
  seekers: [
    {
      id: 'real-job',
      side: 'seekers',
      title: 'Is this job even real?',
      what: 'The signs of a fake posting or a fake recruiter, and where to report one.',
      get: 'A checklist',
      href: '/is-this-a-real-job',
      icon: 'real',
    },
    {
      id: 'practice',
      side: 'seekers',
      title: 'What will they ask me?',
      what: 'The questions structured interviews use for your job, the follow-ups, and what a strong answer shows.',
      get: 'Your questions by email',
      href: '/interview-practice',
      icon: 'ask',
    },
    {
      id: 'screening',
      side: 'seekers',
      title: 'Is software screening me out?',
      what: 'What happens after you click apply, step by step, and the questions that can reject you on their own.',
      get: 'What to do at each step',
      href: '/how-ats-actually-works',
      icon: 'screen',
    },
    {
      id: 'stack',
      side: 'seekers',
      title: 'What will my search cost?',
      what: 'Click tools into your stack and see the real total, the $0 version and the day each plan renews.',
      get: 'Cancel reminders',
      href: '/build-your-stack',
      icon: 'bill',
    },
    {
      id: 'value-prop',
      side: 'seekers',
      title: 'What’s my professional value proposition?',
      what: 'Finish “I’m known for…” with what people say about working with you, and say it easily when someone asks.',
      get: 'Your line, ready to say',
      href: '/professional-value-proposition',
      icon: 'value',
    },
    {
      id: 'free-search',
      side: 'seekers',
      title: 'Which resume tools are really free?',
      what: 'The resume tools with a free version you can keep using, and what free gets you.',
      get: 'The free plans, side by side',
      href: '/free-job-search',
      icon: 'free',
    },
    {
      id: 'traps',
      side: 'seekers',
      title: 'Which tools keep charging me?',
      what: 'Every resume tool by what the first year costs if you forget to cancel.',
      get: 'The 4-week billers, named',
      href: '/pricing-traps',
      icon: 'repeat',
    },
    {
      id: 'proof',
      side: 'seekers',
      title: 'How do I show how I work?',
      what: 'Proof from people who have worked with you and from your work, before the interview.',
      get: 'A checklist by email',
      href: '/show-how-you-work',
      icon: 'proof',
    },
    {
      id: 'list-check',
      side: 'seekers',
      title: 'Is this best-of list paid for?',
      what: 'The four checks to run on any list, and what we found on every list we track.',
      get: 'Four checks',
      href: '/is-this-list-paid-for',
      icon: 'list',
    },
  ],
  hiring: [
    {
      id: 'real-candidate',
      side: 'hiring',
      title: 'Is this candidate even real?',
      what: 'The FBI’s red flags for fake candidates, as a checklist for interviewers.',
      get: 'A checklist',
      href: '/is-this-a-real-candidate',
      icon: 'shield',
    },
    {
      id: 'scorecard',
      side: 'hiring',
      title: 'What should we ask them?',
      what: 'A structured interview scorecard for any role: the same questions for everyone and a 1 to 5 scale.',
      get: 'A PDF and a spreadsheet',
      href: '/interview-scorecard',
      icon: 'scorecard',
    },
    {
      id: 'screening-hiring',
      side: 'hiring',
      title: 'Is software screening them out?',
      what: 'How your own knockout rules screen out people you’d hire, and what to change.',
      get: 'A checklist',
      href: '/how-ats-actually-works#hiring',
      icon: 'screen',
    },
    {
      id: 'stack-hiring',
      side: 'hiring',
      title: 'What will our tools cost?',
      what: 'Click tools into your hiring stack and see the year’s cost for your team size, and per hire.',
      get: 'A yearly bill',
      href: '/build-your-stack/hiring',
      icon: 'bill',
    },
    {
      id: 'evp',
      side: 'hiring',
      title: 'What’s our employer value proposition?',
      what: 'Finish “Our team is known for…” with what your team says, and say it the same way at every step.',
      get: 'Your team’s line, ready to say',
      href: '/employer-value-proposition',
      icon: 'value',
    },
    {
      id: 'hire-cost',
      side: 'hiring',
      title: 'What does a hire really cost?',
      what: 'Cost per hire the way SHRM counts it, next to SHRM’s 2025 medians.',
      get: 'Your number by email',
      href: '/hiring-costs',
      icon: 'calculator',
    },
    {
      id: 'fraud-tools',
      side: 'hiring',
      title: 'Which fraud tools should we know?',
      what: 'Hiring fraud companies, sorted by where the fraud shows up. No scores yet.',
      get: 'A short list',
      href: '/guides/hiring-fraud-tools',
      icon: 'list',
    },
    {
      id: 'proof-hiring',
      side: 'hiring',
      title: 'How do we see how they work?',
      what: 'Hear from people who have worked with a candidate, before the first interview.',
      get: 'Where to ask for it',
      href: '/what-should-i-use?side=hiring&problem=see-how-they-work',
      icon: 'proof',
    },
    {
      id: 'whole-stack',
      side: 'hiring',
      title: 'What should our whole stack be?',
      what: 'Tell Stephanie how you hire and get back the tools she would run for your team.',
      get: 'A free recommendation',
      href: '/hiring-stack',
      icon: 'layers',
    },
  ],
}

export const freeToolCount = () => FREE_TOOL_CARDS.seekers.length + FREE_TOOL_CARDS.hiring.length
