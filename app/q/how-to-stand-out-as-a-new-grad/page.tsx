import type { Metadata } from 'next'
import { SeoContentPage } from '@/components/seo-content-page'

const CANONICAL = 'https://hiring.productions/q/how-to-stand-out-as-a-new-grad'

export const metadata: Metadata = {
  title: 'How to Stand Out as a New Grad in 2026 (When Everyone Has the Same Resume)',
  description:
    'The actual recruiter-side answer to standing out as a new grad: it isn’t a flashier headline or another certification. It’s evidence of how you actually work — and the new way to capture it.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: 'article',
    title: 'How to Stand Out as a New Grad in 2026',
    description:
      'When every entry-level resume looks the same, the candidates who get the call have one thing in common — and it isn’t the resume.',
    url: CANONICAL,
  },
}

export default function StandOutNewGradPage() {
  return (
    <SeoContentPage
      badge="FOR NEW GRADS"
      badgeColor="indigo"
      headline="How to stand out as a new grad with no experience"
      intro="The honest recruiter-side answer: you don’t stand out by polishing your resume harder. Everyone is doing that. You stand out by showing evidence of how you actually work — what people who’ve seen you in a class project, an internship, a campus job, or a volunteer role say about you. That evidence is what every senior candidate has and most new grads have no way to capture."
      canonicalUrl={CANONICAL}
      sections={[
        {
          heading: 'The trap every new-grad resume falls into',
          body: 'Every new-grad resume reads the same: education at the top, a few internships described with corporate-flavored bullets, a "Skills" section listing programs anyone can list, and "References available upon request" at the bottom. Recruiters skim thousands of these. The candidates who get the call have something the resume can’t show — proof of how they actually show up, in words other people used. That used to mean a long employment history. For new grads it means somewhere recruiters can SEE the receipts of how you’ve worked with the people who already know you.',
        },
        {
          heading: 'What recruiters actually want from new grads',
          body: 'Recruiters know you don’t have ten years of experience. They’re not looking for that. They’re looking for SIGNALS that you can do the work and won’t be a hiring mistake. The strongest signals: did people you’ve worked with — professors, internship managers, group project teammates, your boss at the campus job — say specific things about how you operate? Did you ship something tangible (a project, a paper, an event, a side business)? Can you tell a five-minute story about something you built with detail? Those three signals beat a longer skills section every time.',
        },
        {
          heading: 'The reference problem nobody talks about',
          body: 'Most new grads have great references — they just can’t prove it. The professor who said "Stephanie is the most rigorous research student I’ve had in five years" said it in an email you no longer have access to. The internship manager who said "she ran our entire onboarding process by week three" said it on Slack at a company that locked your account when you left. The reference exists. The receipt doesn’t. So at the moment you most need it — applying for your first real role — you’re back to "references available upon request," which every other new grad also has.',
        },
        {
          heading: 'How RepVera fixes this for new grads',
          body: 'RepVera is the new way to capture what people who’ve worked with you actually said — and own it forever. Real receipts from real people: emails, Slack messages, performance feedback, peer recognition, notes from professors and managers. Saved by you, in your account, portable across every company you ever apply to. When hiring teams click through to your RepVera page, they’re not seeing "references available upon request" — they’re seeing the actual words from the actual humans who’ve seen you work. For a new grad with no employment history but plenty of people who could vouch, RepVera is the asset everyone else doesn’t have yet.',
        },
        {
          heading: 'What to do this week (concrete)',
          body: 'Three things, in order. (1) List every person who’s seen you work: professors, internship managers, group project teammates, campus-job supervisors, advisors, volunteer coordinators. Aim for 10–15 people. (2) Start a free RepVera and send the receipt-request link to that list — most will respond within a few days, and what they write becomes searchable proof. (3) When you apply for roles, link your RepVera in your LinkedIn About section and at the bottom of your resume. Recruiters click through. The difference between "references available upon request" and "see what 12 people who’ve worked with me actually said" is the difference between a generic application and a memorable one.',
        },
        {
          heading: 'Why this works in 2026 specifically',
          body: 'AI made every resume sound the same. Tailored bullets, polished About sections, keyword-optimized headlines — everyone has them now, including candidates who can’t actually do the work. The signal recruiters are starting to look for is proof that no AI could generate: the small, weird, specific words that real humans use when they describe working with someone. "She caught a billing error that saved us $14K in week three." "He sat with my anxious patients for 20 minutes when our PA was double-booked." Those lines are unfakeable. RepVera is built around capturing them. The new grads who start collecting their receipts NOW have a compounding asset by graduation; the ones who don’t will look like everyone else in the queue.',
        },
      ]}
      faqs={[
        {
          q: 'How do you stand out as a new grad with no work experience?',
          a: 'Not by polishing your resume harder — everyone is doing that. Stand out by capturing proof of how you actually work in the words of people who’ve seen you do it: professors, internship managers, project teammates, advisors. A page recruiters can click to see real receipts beats "references available upon request" every time.',
        },
        {
          q: 'What’s the difference between a reference and a RepVera receipt?',
          a: 'A reference is a contact a recruiter has to call. A RepVera receipt is the actual words a person already said about working with you — captured, saved, and visible to anyone you point at your page. References require initiative from the recruiter. Receipts do the work for you, before they ever pick up the phone.',
        },
        {
          q: 'Who should write references for me as a new grad?',
          a: 'Professors who taught you in small classes, internship managers, group project teammates who actually saw you work, campus-job supervisors, volunteer coordinators, club advisors. The most useful references aren’t the most senior people — they’re the people who can speak to specific moments of how you operated. 10–15 of these beats 2 generic ones from senior people.',
        },
        {
          q: 'Should new grads put "References available upon request" on resumes in 2026?',
          a: 'No — it’s dead space. Every resume has it; it signals nothing. Replace it with a link to your RepVera page (or a portfolio link if you’re in design / engineering). Anything that shows proof of work or proof of how you’re described by others is worth more than a line that promises references will exist when asked.',
        },
        {
          q: 'How do I get a professor or manager to write something about me?',
          a: 'Ask while it’s fresh — at the end of the semester, project, or internship. Be specific: "I’m starting a RepVera page and I’d love to capture something you said in our final review. Could you send me a few sentences on [specific work you did]?" Most people will say yes. The ones who don’t weren’t going to be useful references anyway.',
        },
        {
          q: 'How is this different from LinkedIn recommendations?',
          a: 'LinkedIn recommendations live on a platform someone else owns. If your account is hacked, suspended, or you change careers and the platform changes, that proof is gone. RepVera receipts live in your account, portable forever. They’re also more visible to recruiters — a recommendation buried in a LinkedIn sidebar competes for attention. A RepVera page is the page.',
        },
        {
          q: 'Does this actually work for entry-level candidates?',
          a: 'Yes — especially because new grads are who need it most. Senior candidates have a track record on a resume; new grads don’t. Receipts close that gap. Hiring teams will read 30 seconds of a real teammate saying "she ran our entire onboarding by week three" over 30 seconds of a polished resume bullet every time.',
        },
      ]}
      insideLook={{
        name: 'See how a recruiter actually scans new-grad profiles',
        description:
          'Upload your LinkedIn or resume and see the 5 boolean searches a recruiter for an entry-level role would actually run — plus where you rank in each. Free to try.',
        href: '/tools/recruiter-search-rank',
        isFree: true,
      }}
      relatedLinks={[
        { label: 'New grad hub — full playbook', href: '/for-new-grads' },
        { label: 'How to get hired as a new grad', href: '/q/how-to-get-hired-as-new-grad' },
        { label: 'References for new grad jobs', href: '/q/references-for-new-grad-jobs' },
        { label: 'What recruiters actually look for in new grads', href: '/q/what-recruiters-look-for-in-new-grads' },
      ]}
    />
  )
}
