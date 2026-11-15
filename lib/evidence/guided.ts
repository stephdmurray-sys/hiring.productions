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

/** RepVera's answer, one per side. The only tool that is recommended without a score. */
export const REPVERA_PROBLEM: Record<Side, { id: string; label: string }> = {
  seekers: { id: 'resume-looks-the-same', label: 'My resume looks like everyone else’s' },
  hiring: { id: 'resumes-look-the-same', label: 'Every resume looks the same now' },
}

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
        ],
        extra: { label: 'Something else: I’m losing track of my applications', to: { problem: 'losing-track' } },
        back: null,
      },
      {
        id: 'q2a',
        depth: 2,
        question: 'Which is closer?',
        options: [
          { label: 'I’m not sure what to apply for', to: { problem: 'what-to-apply-for' } },
          { label: 'I apply and hear nothing back', to: { step: 'q3' } },
        ],
        back: 'q1',
      },
      {
        id: 'q3',
        depth: 3,
        question: 'What about your resume?',
        options: [
          { label: 'It needs a rewrite', to: { problem: 'rewriting' } },
          { label: 'It’s decent, but I don’t know if it gets past the screening software', to: { problem: 'no-callbacks' } },
          { label: 'It’s fine. It just looks like everyone else’s', to: { problem: REPVERA_PROBLEM.seekers.id } },
        ],
        back: 'q2a',
      },
      {
        id: 'q2b',
        depth: 2,
        question: 'How do the interviews go?',
        options: [
          { label: 'I get nervous or lose my train of thought', to: { problem: 'interview-practice' } },
          { label: 'They go well, and then they pick someone else', to: { problem: 'interviews-stall' } },
        ],
        back: 'q1',
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
        ],
        back: null,
      },
      {
        id: 'q2a',
        depth: 2,
        question: 'Which is closer?',
        options: [
          { label: 'We don’t have a real system. It’s spreadsheets and email', to: { problem: 'spreadsheets' } },
          { label: 'The right people aren’t applying', to: { problem: 'cant-find-people' } },
        ],
        back: 'q1',
      },
      {
        id: 'q2b',
        depth: 2,
        question: 'Which is closer?',
        options: [
          { label: 'There are too many to get through', to: { problem: 'too-many-applicants' } },
          { label: 'Some of them aren’t real', to: { step: 'fraud' } },
          { label: 'Every resume looks the same now', to: { problem: REPVERA_PROBLEM.hiring.id } },
        ],
        back: 'q1',
      },
      {
        id: 'q2c',
        depth: 2,
        question: 'Which is closer?',
        options: [
          { label: 'Every interviewer asks something different', to: { problem: 'interviews-inconsistent' } },
          { label: 'Our recruiters need training', to: { problem: 'training' } },
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
          { label: 'Someone else showed up to the interview, or the answers are coming from a tool', to: { href: `${FRAUD_PAGE}?from=picker#interviews` } },
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
  return !!side && problem === REPVERA_PROBLEM[side].id
}

/** The two RepVera answers. Copy is final (handoff, Nov 14, 2026). */
export const REPVERA_ANSWER: Record<
  Side,
  { heading: string; opening: string; label: string; name: string; lines: string[]; note: string; button: string; url: string; back: string }
> = {
  seekers: {
    heading: 'My resume looks like everyone else’s',
    opening: 'Most resumes are polished now, so a better one won’t set you apart. What will is hearing from the people who have worked with you.',
    label: 'Stephanie built this one',
    name: 'RepVera',
    lines: [
      'A resume shows what you’ve done. RepVera shows what you’re like to work with.',
      'You send a personal link to people you’ve worked with, like managers, teammates and clients. Each of them writes a short receipt about what it was like to work with you, and it’s verified through their work email. Your profile goes out with your application, so your reputation shows up before you do. It’s free to start.',
    ],
    note: 'Full disclosure: I built RepVera, so I don’t give it a score. Take a look and decide for yourself.',
    button: 'See a real RepVera profile',
    url: 'https://www.repvera.com/u/stephaniemurray',
    back: 'q3',
  },
  hiring: {
    heading: 'Every resume looks the same now',
    opening: 'When every resume is polished, it stops telling you who is good to work with. You can ask candidates for something that does.',
    label: 'Stephanie built this one',
    name: 'RepVera',
    lines: [
      'A resume shows what someone has done. RepVera shows what they’re like to work with.',
      'Ask candidates for their RepVera along with their resume. You see how someone works, in the words of people who have worked with them, before the first interview. You spend less time and money on interviews that go nowhere, and the ones you do hold are more useful because you already know what to ask about.',
    ],
    note: 'Full disclosure: I built RepVera, so I don’t give it a score. Take a look and decide for yourself.',
    button: 'See a real RepVera profile',
    url: 'https://www.repvera.com/u/stephaniemurray',
    back: 'q2b',
  },
}

/** The fraud common question: its old answer page now points to the fraud short list's applicant tracking section. */
export const FRAUD_QUESTION = { question: 'Which applicant tracking systems flag fake candidates?', href: `${FRAUD_PAGE}#ats` }

/** The job seeker common question about fake postings (Stephanie's update, Nov 14, 2026). */
export const REAL_JOB_QUESTION = { question: 'How do I know a job posting is real?', href: '/is-this-a-real-job' }

/** The two new "Common questions, answered" entries, each linking to RepVera's answer for its side. */
export const REPVERA_QUESTIONS: Record<Side, string> = {
  seekers: 'How do I stand out when every resume looks the same?',
  hiring: 'How do we tell candidates apart when every resume looks the same?',
}
