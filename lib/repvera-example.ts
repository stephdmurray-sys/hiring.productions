/**
 * Stephanie Murray's real RepVera profile, as shown in her own screenshot
 * (public/repvera/profile-overview.webp, shared Nov 15, 2026). Used to show how
 * a RepVera profile fills in as receipts arrive, with no invented quotes or
 * people: every word and count here is on her profile. Bar widths in
 * "Strongest patterns" follow the bars on the profile; no numbers are shown.
 * The rules quoted in `rules` are RepVera's own notes on the same profile.
 */
export const REPVERA_EXAMPLE = {
  name: 'Stephanie Murray',
  headline: 'Talent Leader',
  photo: '/people/stephanie-solid.webp',
  profileUrl: 'https://www.repvera.com/u/stephaniemurray',
  asOf: 'November 15, 2026',
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
    { name: 'Prosocial impact', marks: 3, detail: '5 people · 4 relationship types · 6 orgs' },
    { name: 'Integrity', marks: 2, detail: '2 people, both peers: needs a second relationship type' },
  ],
  said: 'Managers said it. Peers said it. Clients said it.',
  finding: 'Stephanie builds strong relationships across various sectors. She brings energy and creativity to her work, enhancing team dynamics and problem-solving.',
  rules: {
    verbatim: 'Verbatim words, never paraphrased.',
    apart: 'None of these contributors saw one another’s answers.',
    marks: 'Three marks means the evidence converged across relationship types and organizations. Two means it’s emerging.',
  },
}

export const repveraReceipts = () => REPVERA_EXAMPLE.who.reduce((n, [, c]) => n + c, 0)
