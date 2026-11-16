/**
 * Stephanie Murray's real RepVera profile, as shown in her own screenshot
 * (public/repvera/profile-overview.webp, shared Nov 15, 2026). Used to show how
 * a RepVera profile fills in as receipts arrive, with no invented quotes or
 * people: every word and count here is on her profile. Bar widths in
 * "Strongest patterns" follow the bars on the profile; no numbers are shown.
 * The notes in `rules` are RepVera's own notes on the same profile.
 */
export const REPVERA_EXAMPLE = {
  name: 'Stephanie Murray',
  headline: 'Talent Leader',
  bio: 'I’m obsessed with helping people save their recognition and positive feedback so others truly know what it’s like to work with them.',
  photo: '/people/stephanie-solid.webp',
  profileUrl: 'https://www.repvera.com/u/stephaniemurray',
  profilePath: 'repvera.com/u/stephaniemurray',
  asOf: 'November 15, 2026',
  tabs: ['Overview', 'Receipts', 'Work', 'Impact', 'Over time', 'Companies'],
  knownFor: 'building strong relationships',
  who: [
    ['Peers', 14],
    ['Direct reports', 4],
    ['Clients', 3],
    ['Vendors', 2],
    ['Managers', 2],
    ['Mentors', 1],
    ['Candidates', 1],
    ['Others', 11],
  ] as [string, number][],
  /** The summary, word for word; [[double brackets]] are the phrases the profile sets in bold. */
  summary:
    'Managers said it. Peers said it. Clients said it. Stephanie Murray consistently [[builds strong relationships]] across the behavioral health industry, leveraging her expertise to open doors and connect people with opportunities. She [[innovates processes]], always seeking improvement and better experiences for employees and organizations. The pattern holds across every relationship type and every context.',
  words: ['Passionate', 'Helpful', 'Connector', 'Driven', 'Inspirational', 'Innovative', 'Leader', 'Knowledgeable', 'Professional', 'Enthusiastic'],
  patterns: [
    ['Builds relationships', 100],
    ['Mentors others', 84],
    ['Innovates processes', 66],
    ['Communicates effectively', 60],
    ['Brings energy', 52],
  ] as [string, number][],
  traits: [
    { name: 'Conscientiousness', marks: 3, detail: '6 people · 3 relationship types · 6 orgs' },
    { name: 'Integrity', marks: 2, detail: '2 people · 1 relationship type · 2 orgs. Both from peers: needs a second relationship type.' },
    { name: 'Prosocial impact', marks: 3, detail: '5 people · 4 relationship types · 6 orgs' },
    { name: 'Coachability', marks: 0, detail: 'No receipt describes this yet. It fits when one describes you taking feedback on board.' },
  ],
  values: ['Mentorship', 'Honesty', 'Transparency', 'Integrity'],
  said: 'Managers said it. Peers said it. Clients said it.',
  finding: 'Stephanie builds strong relationships across various sectors. She brings energy and creativity to her work, enhancing team dynamics and problem-solving.',
  rules: {
    verbatim: 'Verbatim words, never paraphrased.',
    apart: 'None of these contributors saw one another’s answers.',
    marks: 'Three marks means the evidence converged across relationship types and organizations. Two means it’s emerging. No marks means no receipt describes it yet.',
    values: 'Selected by Stephanie. A filled check marks a value echoed in receipts.',
  },
}

export const repveraReceipts = () => REPVERA_EXAMPLE.who.reduce((n, [, c]) => n + c, 0)
