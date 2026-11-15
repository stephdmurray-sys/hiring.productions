/**
 * Short lists: categories too new to score. No scores, a few tools, a
 * reason for each, and a date. Each one says so at the top of the page,
 * and a category moves to scored rankings once there is enough public data
 * (How we review, "Short lists").
 *
 * The first is Fraud tools to know (Stephanie's copy, Nov 14, 2026, word
 * for word). Official sites were confirmed Nov 14, 2026 from each
 * company's own pages (search results on its own domain; several sites
 * block automated fetches, so none was fetched past a block). Every vendor
 * link goes through /go/{id} so clicks are counted and the money line can
 * say what we earn (lib/money.ts). Add a new short list here, give it a page
 * that renders <ShortListPage list={...} />, and link it from Guides.
 */
import type { FreeTool } from './kit'
import { FREE_TOOLS } from './kit'

export interface ShortTool {
  /** The /go/{id} partner id; null for a tool linked directly (RepVera). */
  go: string | null
  name: string
  domain: string
  label?: string
  /** A small tag above the name where a list mixes kinds of work (the proof answer). */
  kind?: string
  line: string
  /** RepVera only: Stephanie's note, and a link instead of the vendor button. */
  note?: string
  link?: { text: string; url: string }
}

export interface ShortSection {
  /** The anchor the picker lands on. */
  id: string
  heading: string
  sub?: string
  tools: ShortTool[]
  /** "Also in this space": named, linked, no line. */
  also?: { go: string; name: string }[]
  /** A section with no tools, only a line (e.g. what your applicant tracking system already does). */
  text?: { before: string; links?: { text: string; href: string }[]; after: string }
}

export interface ShortList {
  path: string
  side: 'seekers' | 'hiring'
  title: string
  metaTitle: string
  description: string
  intro: string
  checked: string
  sections: ShortSection[]
  /** Who to follow on this (follow.json ids); left out when there's no match yet. */
  follow?: string[]
  free?: FreeTool
  /** The picker problem that ends on this page, so a visitor from the picker gets "Did this help you decide?". */
  pickerProblem?: string
}

export const FRAUD_TOOLS: ShortList = {
  path: '/guides/hiring-fraud-tools',
  side: 'hiring',
  title: 'Fraud tools to know',
  metaTitle: 'Fraud Tools to Know: Hiring Fraud Detection, Sorted by Where It Shows Up',
  description:
    'Fake candidates get caught in stages, so one tool won’t cover it. The hiring fraud companies to know, sorted by where the fraud shows up. No scores yet, and nobody pays to be featured.',
  intro:
    'Fake candidates get caught in stages, so one tool won’t cover it. This page sorts the companies by where the fraud shows up. There are no scores here yet, because there is no public data worth scoring. The accuracy numbers in this category come from the vendors themselves. We’ll add scores when that changes.',
  checked: '2026-11-14',
  sections: [
    {
      id: 'applicants',
      heading: 'Fake applicants are flooding our roles',
      sub: 'Catch it at the application, before anyone spends time on it.',
      tools: [
        {
          go: 'tofu',
          name: 'Tofu',
          domain: 'hiretofu.com',
          label: 'Stephanie’s pick',
          line: 'Scans every applicant the moment they apply and flags made-up identities, hidden locations and fraud rings before a recruiter opens the resume. Works inside more than thirty applicant tracking systems, including Greenhouse, Lever, Ashby and Workday. Pricing is by sales call.',
        },
      ],
    },
    {
      id: 'interviews',
      heading: 'Someone else showed up to the interview, or the answers are coming from a tool',
      sub: 'Catch it during the interview.',
      tools: [
        { go: 'sherlock-ai', name: 'Sherlock AI', domain: 'withsherlock.ai', line: 'Watches live interviews for hidden assistant tools, stand-ins and deepfakes.' },
        {
          go: 'polygraf-ai',
          name: 'Polygraf AI',
          domain: 'polygraf.ai',
          line: 'Detects named interview assistant tools such as Cluely and Interview Coder. It’s a broad security company, and interviews are one of its uses.',
        },
        { go: 'pindrop', name: 'Pindrop Pulse', domain: 'pindrop.com', line: 'Deepfake voice and video detection that plugs into interview platforms such as HireVue and BrightHire.' },
        { go: 'brighthire', name: 'BrightHire with Zoom', domain: 'brighthire.com', line: 'Fraud and deepfake signals inside the Zoom interview itself. Launched June 2026.' },
      ],
      also: [
        { go: 'fabric', name: 'Fabric' },
        { go: 'getreal-security', name: 'GetReal Security' },
      ],
    },
    {
      id: 'identity',
      heading: 'We need to know this person is who they say they are',
      sub: 'Verify identity before the offer.',
      tools: [
        { go: 'persona', name: 'Persona', domain: 'withpersona.com', line: 'Identity checks that connect to Ashby, Greenhouse and Workday.' },
        { go: 'clear', name: 'CLEAR', domain: 'clearme.com', line: 'Identity verification built into Greenhouse.' },
      ],
      also: [
        { go: 'iproov', name: 'iProov' },
        { go: 'proof', name: 'Proof' },
      ],
    },
    {
      id: 'worked-with',
      heading: 'We want to hear from people who have worked with them',
      sub: 'The other tools check that a person is real. This shows what they’re like to work with.',
      tools: [
        {
          go: null,
          name: 'RepVera',
          domain: 'repvera.com',
          label: 'Stephanie built this one',
          line: 'Ask candidates for their RepVera along with their resume. You see how someone works, in the words of people who have worked with them, each one verified through a work email.',
          note: 'Full disclosure: I built RepVera, so I don’t give it a score. Take a look and decide for yourself.',
          link: { text: 'See a real RepVera profile', url: 'https://www.repvera.com/u/stephaniemurray' },
        },
      ],
    },
    {
      id: 'ats',
      heading: 'Already in your applicant tracking system',
      tools: [],
      text: {
        before: '',
        links: [
          { text: 'Greenhouse', href: '/reviews/ats/greenhouse' },
          { text: 'Ashby', href: '/reviews/ats/ashby' },
        ],
        after: ' have fraud flags built in. Turn them on, and treat them as the starting point.',
      },
    },
  ],
  follow: ['stacy-zapar'],
  free: FREE_TOOLS.redFlags,
  pickerProblem: 'fake-candidates',
}

/**
 * Portfolio sites to know (Nov 15, 2026), the job seeker short list behind the proof answer.
 * Lines are drafts built only from facts on each company's own pages (help, pricing and product
 * pages, read from search results on their own domains; direct fetches were blocked). Paid prices
 * are left out until they're read on the live pricing pages. The last section is for the most
 * common case: work nobody can post, where the proof is what the people who worked with you saw.
 */
export const PORTFOLIO_SITES: ShortList = {
  path: '/guides/portfolio-sites',
  side: 'seekers',
  title: 'Portfolio sites to know',
  metaTitle: 'Portfolio Sites to Know: Where to Show Your Work, by the Kind of Work You Do',
  description:
    'Where to show your work so a hiring manager sees it before the first call, sorted by the kind of work you do, and what to use when your work is not something you can post. No scores yet.',
  intro:
    'A portfolio puts your work in front of a hiring manager before the first call. These sites are sorted by the kind of work you do, and the last section is for work you can’t post. We don’t score portfolio sites yet, so this is a short list with no scores.',
  checked: '2026-11-15',
  sections: [
    {
      id: 'design',
      heading: 'I design, draw or take photos',
      sub: 'Visual work is easiest to judge when people can see it.',
      tools: [
        {
          go: 'behance',
          name: 'Behance',
          domain: 'behance.net',
          line: 'Adobe’s portfolio site. The free version has no limit on how many projects you post, and a Hire Me button shows recruiters you’re open to full-time or freelance work.',
        },
        { go: 'dribbble', name: 'Dribbble', domain: 'dribbble.com', line: 'A portfolio site for product and visual designers. The free plan lets you post your work and get work inquiries.' },
      ],
      also: [{ go: 'adobe-portfolio', name: 'Adobe Portfolio' }],
    },
    {
      id: 'writing',
      heading: 'I write',
      sub: 'Clips and samples in one place, so nobody has to search for them.',
      tools: [
        { go: 'journo-portfolio', name: 'Journo Portfolio', domain: 'journoportfolio.com', line: 'A portfolio site for writers. The free plan is a one-page portfolio with up to 10 pieces.' },
        { go: 'muck-rack', name: 'Muck Rack', domain: 'muckrack.com', line: 'For journalists, who never pay. It finds your newly published articles and adds them to your profile.' },
      ],
      also: [{ go: 'clippings-me', name: 'Clippings.me' }],
    },
    {
      id: 'code',
      heading: 'I write code',
      sub: 'Let them read the code itself.',
      tools: [
        {
          go: 'github-pages',
          name: 'GitHub',
          domain: 'github.com',
          line: 'Public repositories show your code. GitHub Pages turns one into a free personal site, one per account, and it works with your own domain.',
        },
      ],
    },
    {
      id: 'one-page',
      heading: 'I want one simple page for any job',
      sub: 'Your best work, a short intro and a way to reach you, on one link.',
      tools: [
        { go: 'carrd', name: 'Carrd', domain: 'carrd.co', line: 'One-page sites. The Basic plan is free and gives you three sites.' },
        { go: 'canva', name: 'Canva', domain: 'canva.com', line: 'Start from a portfolio template and publish it free on a Canva address. Your own domain needs Canva Pro.' },
        { go: 'notion', name: 'Notion', domain: 'notion.com', line: 'Publish a Notion page as a site, free on a notion.site address. Your own domain costs extra.' },
      ],
      also: [
        { go: 'wix', name: 'Wix' },
        { go: 'squarespace', name: 'Squarespace' },
        { go: 'contra', name: 'Contra' },
      ],
    },
    {
      id: 'worked-with',
      heading: 'My work isn’t something I can post',
      sub: 'Sales, operations, nursing, support, recruiting and most other jobs. The proof is what the people who worked with you saw.',
      tools: [
        {
          go: null,
          name: 'RepVera',
          domain: 'repvera.com',
          label: 'Stephanie built this one',
          line: 'You send a personal link to people you’ve worked with, like managers, teammates and clients. Each of them writes a short receipt about what it was like to work with you, and it’s verified through their work email.',
          note: 'Full disclosure: I built RepVera, so I don’t give it a score. Take a look and decide for yourself.',
          link: { text: 'See a real RepVera profile', url: 'https://www.repvera.com/u/stephaniemurray' },
        },
      ],
    },
    {
      id: 'where',
      heading: 'Where to put the link',
      tools: [],
      text: {
        before: '',
        after: 'At the top of your resume next to your email, and in the Featured section of your LinkedIn profile, so it’s there wherever a recruiter finds you.',
      },
    },
  ],
}

/** The portfolio sites a job seeker sees inside the proof answer: one for each kind of work. */
export const PORTFOLIO_PICKS: ShortTool[] = (
  [
    ['behance', 'For design'],
    ['journo-portfolio', 'For writing'],
    ['github-pages', 'For code'],
    ['carrd', 'For any job'],
  ] as const
).map(([go, kind]) => ({ ...PORTFOLIO_SITES.sections.flatMap((s) => s.tools).find((t) => t.go === go)!, kind }))
