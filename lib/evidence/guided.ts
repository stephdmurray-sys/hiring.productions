import { problemsFor } from './recommend'

/**
 * The guided path for "What should I use?" (Stephanie's handoff, Nov 14,
 * 2026: "hiring.productions guided picker"). Copy is final; do not edit it
 * here without her. After a side is chosen, one question per screen; each
 * answer is a link, so every step works without scripts and has its own
 * address. No one taps more than three times. The last tap lands on the
 * same answer pages the picker always used, or on the RepVera answer for
 * that side, which skips the budget and timeline step.
 */

export type Side = 'seekers' | 'hiring'

/** A step on the path, a problem's answer, or a page of its own (the fraud answers land on the fraud tools page). */
export type GuidedTarget = { step: string } | { problem: string } | { href: string }

/** The fraud short list. Each answer to "Where are you seeing it?" lands on its section. */
export const FRAUD_PAGE = '/guides/hiring-fraud-tools'
export const FRAUD_PROBLEM = 'fake-candidates'


export interface GuidedOption {
  label: string
  to: GuidedTarget
}

export interface GuidedStep {
  id: string
  /** Position on the path (1-based), for the progress dots. */
  depth: number
  question: string
  options: GuidedOption[]
  /** A small link under the cards, e.g. "Something else: ..." */
  extra?: GuidedOption
  /** Where "Back" goes: another step, or null for the side choice. */
  back: string | null
}

/**
 * RepVera's answer, one per side. The only tool that is recommended without a score.
 * Stephanie, Nov 15, 2026: on both sides the way in is what people want, never a problem assigned
 * to them. Job seekers want to prove how they work; hiring teams want to know how someone works
 * before they interview or hire (her line). The old ids still open the same answers.
 */
export const REPVERA_PROBLEM: Record<Side, { id: string; label: string }> = {
  seekers: { id: 'prove-how-i-work', label: 'I want to prove how I work' },
  hiring: { id: 'see-how-they-work', label: 'We want to know how someone works before we interview or hire' },
}
const REPVERA_ALIASES: Record<Side, string[]> = { seekers: ['resume-looks-the-same'], hiring: ['resumes-look-the-same'] }

export const GUIDED: Record<Side, { steps: GuidedStep[]; depth: number }> = {
  seekers: {
    depth: 3,
    steps: [
      {
        id: 'q1',
        depth: 1,
        question: 'Are you getting interviews?',
        options: [
          { label: 'Not really', to: { step: 'q2a' } },
          { label: 'Yes, but no offers', to: { step: 'q2b' } },
          // Nov 15, 2026: people at the start of a search had no answer to "Are you getting interviews?"
          { label: 'I haven’t started applying yet', to: { step: 'q2c' } },
          // Nov 15, 2026: a card of its own, so both sides of the homepage picker have four.
          { label: 'I’m losing track of my applications', to: { problem: 'losing-track' } },
        ],
        back: null,
      },
      {
        id: 'q2c',
        depth: 2,
        question: 'Where do you want to start?',
        options: [
          { label: 'Getting my resume ready', to: { problem: 'rewriting' } },
          { label: 'Doing it without spending money', to: { href: '/free-job-search' } },
          { label: 'Showing employers how I work', to: { problem: REPVERA_PROBLEM.seekers.id } },
          { label: 'Figuring out what to apply for', to: { problem: 'what-to-apply-for' } },
        ],
        back: 'q1',
      },
      {
        id: 'q2a',
        depth: 2,
        question: 'Which sounds like you?',
        options: [
          { label: 'I’m not sure what to apply for', to: { problem: 'what-to-apply-for' } },
          { label: 'I apply and hear nothing back', to: { step: 'q3' } },
        ],
        back: 'q1',
      },
      {
        id: 'q3',
        depth: 3,
        question: 'How’s your resume?',
        options: [
          { label: 'It needs a rewrite', to: { problem: 'rewriting' } },
          { label: 'It’s fine, but I don’t know if it gets past the screening software', to: { problem: 'no-callbacks' } },
          { label: 'It’s good. I want something that shows how I work, too', to: { problem: REPVERA_PROBLEM.seekers.id } },
        ],
        back: 'q2a',
      },
      {
        id: 'q2b',
        depth: 2,
        question: 'How do the interviews go?',
        options: [
          { label: 'I get nervous or lose my train of thought', to: { problem: 'interview-practice' } },
          { label: 'I can’t explain why they should pick me', to: { href: '/professional-value-proposition' } },
          { label: 'They go well, and then they pick someone else', to: { step: 'q3b' } },
        ],
        back: 'q1',
      },
      {
        // By the last round everyone interviewed well: what's left is practice, or proof of how you work.
        id: 'q3b',
        depth: 3,
        question: 'What would help you get the offer?',
        options: [
          { label: 'Better answers in the final interview', to: { problem: 'interviews-stall' } },
          { label: 'People I’ve worked with backing me up', to: { problem: REPVERA_PROBLEM.seekers.id } },
          // Stephanie, Nov 16, 2026: proof of work too, which RepVera can verify through the people who saw it.
          { label: 'Showing my work, like a portfolio', to: { href: `/what-should-i-use?side=seekers&problem=${REPVERA_PROBLEM.seekers.id}&from=q3b#work` } },
        ],
        back: 'q2b',
      },
    ],
  },
  hiring: {
    depth: 3,
    steps: [
      {
        id: 'q1',
        depth: 1,
        question: 'Where does hiring go wrong for you?',
        options: [
          { label: 'Finding people', to: { step: 'q2a' } },
          { label: 'Sorting through applicants', to: { step: 'q2b' } },
          { label: 'Our interviews and our team', to: { step: 'q2c' } },
          // Nov 15, 2026: the most common reason a hiring team shops, straight to its answer
          { label: 'Choosing or switching our applicant tracking system', to: { problem: 'choosing-ats' } },
        ],
        back: null,
      },
      {
        id: 'q2a',
        depth: 2,
        question: 'Which sounds like your team?',
        options: [
          { label: 'We don’t have a real system. It’s spreadsheets and email', to: { problem: 'spreadsheets' } },
          { label: 'The right people aren’t applying', to: { problem: 'cant-find-people' } },
          { label: 'Good people don’t see why they’d want to work here', to: { href: '/employer-value-proposition' } },
        ],
        back: 'q1',
      },
      {
        id: 'q2b',
        depth: 2,
        question: 'Which sounds like your team?',
        options: [
          { label: 'There are too many to get through', to: { problem: 'too-many-applicants' } },
          { label: 'Some of them aren’t real', to: { step: 'fraud' } },
          { label: REPVERA_PROBLEM.hiring.label, to: { problem: REPVERA_PROBLEM.hiring.id } },
        ],
        back: 'q1',
      },
      {
        id: 'q2c',
        depth: 2,
        question: 'Which sounds like your team?',
        options: [
          { label: 'Every interviewer asks something different', to: { problem: 'interviews-inconsistent' } },
          { label: 'Our recruiters need training', to: { problem: 'training' } },
          { label: REPVERA_PROBLEM.hiring.label, to: { problem: REPVERA_PROBLEM.hiring.id } },
        ],
        back: 'q1',
      },
      {
        // Stephanie's update, Nov 14, 2026: the fraud path asks one question, skips team size and budget, and lands on the fraud short list.
        id: 'fraud',
        depth: 3,
        question: 'Where are you seeing it?',
        options: [
          { label: 'Fake applicants are flooding our roles', to: { href: `${FRAUD_PAGE}?from=picker#applicants` } },
          { label: 'Someone else showed up to the interview, or they’re reading answers off AI', to: { href: `${FRAUD_PAGE}?from=picker#interviews` } },
          { label: 'We need to know this person is who they say they are', to: { href: `${FRAUD_PAGE}?from=picker#identity` } },
          { label: 'We want to hear from people who have worked with them', to: { href: `${FRAUD_PAGE}?from=picker#worked-with` } },
        ],
        back: 'q2b',
      },
    ],
  },
}

export function guidedStep(side: Side, id: string | undefined): GuidedStep {
  const steps = GUIDED[side].steps
  return steps.find((s) => s.id === id) ?? steps[0]
}

/** Which guided step leads to this problem, so "Back" from an answer returns to it. */
export function stepFor(side: Side, problem: string): string | null {
  if (side === 'hiring' && problem === FRAUD_PROBLEM) return 'q2b'
  for (const s of GUIDED[side].steps) {
    if (s.options.some((o) => 'problem' in o.to && o.to.problem === problem)) return s.id
    if (s.extra && 'problem' in s.extra.to && s.extra.to.problem === problem) return s.id
  }
  return null
}

/** The whole list: every problem for the side, plus RepVera's. */
export function wholeList(side: Side): { id: string; label: string }[] {
  return [...problemsFor(side).map((p) => ({ id: p.id, label: p.label })), REPVERA_PROBLEM[side]]
}

export function isRepveraProblem(side: Side | null, problem: string | undefined): side is Side {
  return !!side && !!problem && (problem === REPVERA_PROBLEM[side].id || REPVERA_ALIASES[side].includes(problem))
}

/** True when this id is a step on the side's path (so a "from" in a link can be trusted for Back). */
export function isStep(side: Side, id: string | undefined): id is string {
  return !!id && GUIDED[side].steps.some((s) => s.id === id)
}

/** The two RepVera answers. Copy is final (handoff, Nov 14, 2026). */
export const REPVERA_ANSWER: Record<
  Side,
  {
    heading: string
    opening: string
    label: string
    name: string
    lines: string[]
    /** A hiring team's quote set right after the lines (lib/repvera-quotes.ts). */
    leadQuote?: string
    quotesK: string
    quoteIds: string[]
    /** A second group of quotes after the first (job seekers: what a hiring team said). */
    afterK?: string
    afterIds?: string[]
    note: string
    cta: { k?: string; text?: string; button: string; url: string; under?: string; event: 'repvera_call_click' | 'repvera_profile_click' }
    second: { text: string; url: string }
    back: string
  }
> = {
  seekers: {
    heading: 'Let how you work arrive before you do.',
    opening: 'Send proof with your application. It can come from the people who have worked with you, and from the work itself.',
    label: 'Stephanie built this one',
    name: 'RepVera',
    lines: [
      'A resume shows what you’ve done. RepVera shows what you’re like to work with.',
      'You send a personal link to people you’ve worked with, like managers, teammates and clients. Each of them writes a short receipt about what it was like to work with you, and it’s verified through their work email. Your profile goes out with your application, so your reputation shows up before you do. It’s free to start.',
    ],
    quotesK: 'What people who have one say',
    quoteIds: ['marissa', 'tai', 'ingrid', 'rimshah'],
    afterK: 'What a hiring team said after reading one',
    afterIds: ['james'],
    note: 'Full disclosure: I built RepVera, so I don’t give it a score. Take a look and decide for yourself.',
    cta: { button: 'Start your RepVera', url: 'https://www.repvera.com/?utm_source=hiring.productions&utm_medium=referral&utm_campaign=picker_seekers', event: 'repvera_profile_click' },
    second: { text: 'See a real RepVera profile first', url: 'https://www.repvera.com/u/stephaniemurray' },
    back: 'q3',
  },
  // Stephanie's card, word for word (Nov 15, 2026).
  hiring: {
    heading: 'See how someone works before the first interview.',
    opening: 'The people who have worked with a candidate already know what they are like to work with. You can read it with the resume, and some candidates already put it at the top of theirs.',
    label: 'Stephanie built this one',
    name: 'RepVera',
    lines: [
      'A resume shows what someone has done. RepVera shows what they’re like to work with.',
      'Ask candidates for their RepVera along with their resume. You read what the people who have worked with them say, in their own words, and you walk into the interview already knowing what to ask about.',
    ],
    leadQuote: 'james',
    quotesK: 'What candidates say about having one',
    quoteIds: ['marissa', 'tai', 'ingrid'],
    note: 'Disclosure: I built RepVera, so I don’t give it a score.',
    cta: {
      k: 'Have a role open right now? Try it on that one.',
      text: 'I’ll set it up with you and show you what a profile looks like for a role like yours. It starts with one conversation with me, and it is free to try.',
      button: 'Talk to Stephanie about one role',
      url: 'https://calendly.com/stephaniewithrepvera/30min',
      under: 'No slides. You talk to the person who built it, after twenty years in recruiting.',
      event: 'repvera_call_click',
    },
    second: { text: 'See a real RepVera profile first', url: 'https://www.repvera.com/u/stephaniemurray' },
    back: 'q2b',
  },
}

/**
 * The job seeker proof answer, around RepVera's card (Stephanie, Nov 15, 2026): proof of how you
 * work comes from two places, the people who have worked with you and the work itself. Most jobs
 * have no work to post, so RepVera comes first; anyone who makes things people can see also gets
 * portfolio sites (lib/evidence/shortlists.ts), and everyone gets where to put the link.
 */
export const PROOF = {
  people: 'From the people who have worked with you',
  /** Above the large profile on the job seeker answer, as on the value proposition page. */
  profileK: 'Watch a real profile fill in',
  work: 'From the work itself',
  workLead: 'If people can see what you make, like designs, writing or code, a portfolio puts it one click from your resume.',
  noWork: 'No work samples? Your RepVera is proof on its own.',
  /** Stephanie, Nov 16, 2026: RepVera can show the work too, verified by the people who saw it. */
  repveraWork: 'Your RepVera can hold your work too, verified by the people who saw it.',
  /** Above the example Work tab, and the line under it (Stephanie, Nov 16, 2026). */
  workTabK: 'What witnessed work looks like',
  workTabNote: 'An example Work tab, with names and details changed.',
  email: { text: 'Get these steps as a checklist by email', href: '/show-how-you-work#email' },
  more: { text: 'Portfolio sites to know, sorted by the kind of work', href: '/guides/portfolio-sites' },
  where: {
    k: 'Where to put the link',
    text: 'At the top of your resume next to your email, and in the Featured section of your LinkedIn profile, so it’s there wherever a recruiter finds you.',
  },
}

/**
 * The hiring side's practical step after RepVera's card: when to ask candidates for it.
 * Stephanie, Nov 16, 2026: never on the application form or in the job post. "You ask for it
 * when you need trust in people sooner. Before the first screen, after the first interview
 * before you send to a hiring manager."
 */
export const ASK_FOR_IT = {
  k: 'When to ask for it',
  lead: 'When you need to trust people sooner.',
  text: 'Ask for it when you need to trust people sooner: before the first screen, or after the first interview, before you send them to the hiring manager.',
  steps: ['Before the first screen', 'After the first interview, before you send them to the hiring manager'],
}

/**
 * The hiring answer around a large profile (Stephanie, Nov 16, 2026: "the profile being larger"
 * and make it clear enough that hiring teams grab it). The two cards read straight off the
 * example profile (lib/repvera-example.ts): one trait people confirmed, one nobody has described yet,
 * and what to ask about each, so "you walk into the interview already knowing what to ask about"
 * (her card) is shown, not told.
 */
export const HIRING_READ = {
  profileK: 'What lands with the resume',
  askK: 'Walk in knowing what to ask',
  askLead: 'The profile shows what people have confirmed and what nobody has described yet, so you know where to dig.',
  confirmed: { tag: 'Confirmed', trait: 'Conscientiousness', ask: 'Ask for one example, and listen for what the people behind the profile described.' },
  open: { tag: 'Nobody has described it yet', trait: 'Coachability', ask: 'Ask: “Tell me about a time you took feedback on board.”' },
}

/** Free tools to go straight to, one row per side, under the first question on the homepage. */


/** The fraud common question: its old answer page now points to the fraud short list's applicant tracking section. */
export const FRAUD_QUESTION = { question: 'Which applicant tracking systems flag fake candidates?', href: `${FRAUD_PAGE}#ats` }

/** The job seeker common question about fake postings (Stephanie's update, Nov 14, 2026). */
export const REAL_JOB_QUESTION = { question: 'How do I know a job posting is real?', href: '/is-this-a-real-job' }

/** The two new "Common questions, answered" entries, each linking to RepVera's answer for its side. */
export const REPVERA_QUESTIONS: Record<Side, string> = {
  seekers: 'How do I show employers how I work before the interview?',
  hiring: 'How do we see how someone works before we interview them?',
}
