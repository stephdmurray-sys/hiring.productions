import type { Metadata } from 'next'
import { PICKER_INTRO } from '@/lib/evidence/kit'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { homeCss } from '@/app/(rebrand)/home-css'

/**
 * /guides: every guide and free tool on one page, for the "Guides" link in
 * the topic navigation. Grouped by who it's for, so either side finds its
 * own list in one look.
 */

export const metadata: Metadata = {
  title: 'Guides and Free Tools for Job Seekers and Hiring Teams',
  description:
    'Every guide and free tool on hiring.productions: resume tools, interview practice, applicant tracking systems, recruiter training, interview scorecards, cost per hire and spotting fake candidates.',
  alternates: { canonical: '/guides' },
}

type Item = { href: string; title: string; detail: string; kind: string }

const SEEKERS: Item[] = [
  { href: '/guides/best-resume-tools', kind: 'Guide', title: 'The best resume tools', detail: 'Builders and ATS checkers ranked on public reviews and real prices.' },
  { href: '/what-should-i-use?side=seekers#questions', kind: 'Free tool', title: 'What should I use?', detail: PICKER_INTRO },
  { href: '/build-your-stack', kind: 'Free tool', title: 'What will your job search cost?', detail: 'Click tools into your stack and see the total, the cost if you forget to cancel, and the $0 version.' },
  { href: '/pricing-traps', kind: 'Pricing check', title: 'Which resume tools keep charging you?', detail: 'Every resume tool by what the first year costs if you forget to cancel, and which bill every 4 weeks.' },
  { href: '/free-job-search', kind: 'Free list', title: 'The $0 job search', detail: 'The resume tools with a real free version, what free gets you, and the free tools on this site.' },
  { href: '/how-ats-actually-works', kind: 'Explainer', title: 'What does the screening software do to my resume?', detail: 'Where the 75% rejection figure came from, the knockout questions that can reject you on their own, and what to do at each step.' },
  { href: '/show-how-you-work', kind: 'Free checklist', title: 'How do I show employers how I work before the interview?', detail: 'Proof from the people who have worked with you and from your work, in three steps.' },
  { href: '/is-this-list-paid-for', kind: 'Free check', title: 'Is this best-of list paid for?', detail: 'Who wrote the list you’re reading, and the four checks to run on any list.' },
  { href: '/interview-practice', kind: 'Free tool', title: 'What will they ask me in the interview?', detail: 'Practice the questions structured interviews use, and what a strong answer shows.' },
  { href: '/guides/portfolio-sites', kind: 'Short list', title: 'Portfolio sites to know', detail: 'Where to show your work, sorted by the kind of work you do. No scores yet.' },
  { href: '/is-this-a-real-job', kind: 'Free checklist', title: 'Is this job even real?', detail: 'The signs to check before you send a resume or anything else.' },
  { href: '/guides/best-resume-tools#cost', kind: 'Free tool', title: 'What will one tool cost?', detail: 'Every resume tool sorted by the cheapest way to pay for your timeline.' },
  { href: '/compare', kind: 'Comparisons', title: 'Down to two?', detail: 'Any two resume tools side by side.' },
]

const HIRING: Item[] = [
  { href: '/guides/best-ats-for-small-teams', kind: 'Guide', title: 'Applicant tracking systems by team size', detail: 'Small, growing and scaling teams, each with their own rankings.' },
  { href: '/guides/best-recruiter-training', kind: 'Guide', title: 'Recruiter training and certifications', detail: 'From sourcing and closing to SHRM and HRCI exam prep.' },
  { href: '/what-should-i-use?side=hiring#questions', kind: 'Free tool', title: 'What should we use?', detail: PICKER_INTRO },
  { href: '/build-your-stack/hiring', kind: 'Free tool', title: 'What will your hiring tools cost?', detail: 'Click tools into your hiring stack and see the year’s cost for your team size.' },
  { href: '/interview-scorecard', kind: 'Free tool', title: 'Interview scorecard builder', detail: 'The same questions for every candidate, sent as a PDF and a spreadsheet.' },
  { href: '/hiring-costs', kind: 'Free tool', title: 'What does a hire cost?', detail: 'Cost per hire the way SHRM counts it, next to SHRM’s 2025 medians.' },
  { href: '/guides/hiring-fraud-tools', kind: 'Short list', title: 'Fraud tools to know', detail: 'Fraud detection companies, sorted by where the fraud shows up. No scores yet.' },
  { href: '/is-this-a-real-candidate', kind: 'Free checklist', title: 'Is this even a real candidate?', detail: 'The FBI’s red flags for fake candidates, as a checklist for interviewers.' },
  { href: '/hiring-stack', kind: 'Free, from Stephanie', title: 'What should our whole hiring stack be?', detail: 'Tell Stephanie about your team and get a named set of tools back by email.' },
  { href: '/compare', kind: 'Comparisons', title: 'Down to two?', detail: 'Any two applicant tracking systems for the same team size, side by side.' },
]

const ALSO: Item[] = [
  { href: '/reviews', kind: 'Reviews', title: 'Every tool, reviewed', detail: 'One page per tool: is it worth it, what it costs, and what to use instead.' },
  { href: '/on-the-rise', kind: 'Watch list', title: 'On the rise', detail: 'New tools we’re watching until they have enough reviews for a score.' },
  { href: '/who-to-follow', kind: 'People', title: 'Who to follow', detail: 'The people worth following in recruiting, HR and the job search.' },
]

function List({ items, side }: { items: Item[]; side?: 'seekers' | 'hiring' }) {
  return (
    <div className="guides">
      {items.map((g) => (
        <a className="guide" href={g.href} key={g.href + g.title}>
          <span className="guide-side">
            <span>
              {side ? <span className={`pill pill-sm pill-${side}`}>{g.kind}</span> : <span className="mono">{g.kind}</span>}
            </span>
          </span>
          <span>
            <b>{g.title}</b>
            <span className="guide-d">{g.detail}</span>
          </span>
          <span />
        </a>
      ))}
    </div>
  )
}

export default function GuidesIndex() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + homeCss }} />
      <SiteNav active="guides" />
      <header className="ph">
        <div className="wrap">
          <p className="crumbs">
            <a href="/">Home</a> / Guides
          </p>
          <h1 className="display">Guides and free tools</h1>
          <p className="dek">Everything on the site, sorted by who it&rsquo;s for. Every tool here is free, and nothing you type is kept unless you ask us to email it.</p>
        </div>
      </header>

      <section className="wrap sec-tight" id="job-seekers">
        <h2>For job seekers</h2>
        <List items={SEEKERS} side="seekers" />
        <p style={{ marginTop: 20, fontSize: 17 }}>
          <a className="tl" href="/for-job-seekers">
            Everything for job seekers on one page
          </a>
        </p>
      </section>

      <section className="wrap sec" id="hiring-teams">
        <h2>For hiring teams</h2>
        <List items={HIRING} side="hiring" />
        <p style={{ marginTop: 20, fontSize: 17 }}>
          <a className="tl" href="/for-hiring-teams">
            Everything for hiring teams on one page
          </a>
        </p>
      </section>

      <section className="wrap sec" id="also" style={{ paddingBottom: 'clamp(96px,11vw,150px)' }}>
        <h2>For both</h2>
        <List items={ALSO} />
      </section>
      <SiteFooter />
    </>
  )
}
