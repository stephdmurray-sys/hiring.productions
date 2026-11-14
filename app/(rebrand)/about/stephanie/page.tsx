import type { Metadata } from 'next'
import Image from 'next/image'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { JsonLd, graph, SITE } from '@/app/(rebrand)/_components/structured'
import { framework } from '@/lib/evidence'
import { repveraLink } from '@/lib/repvera'

/**
 * /about/stephanie: the founder page, in the review site's design.
 *
 * Every number here is from the Transform Awards winner spotlight
 * (May 19, 2025), read on the live page Nov 14, 2026. The old page's
 * "19 employees to 1,500+ clinicians" line isn't in that profile, so it
 * stays off until Stephanie gives a public source.
 *
 * Her voice rule from the first version still holds: Brightside gets one
 * credential-level mention, never in a title, never as a named method.
 *
 * First person since Nov 14, 2026 (she is the face of the site). The
 * "why I built it" paragraph is a draft for Stephanie to edit; it states
 * no fact beyond what the site itself does.
 */

const CANONICAL = `${SITE}/about/stephanie`
const LINKEDIN = 'https://www.linkedin.com/in/stephaniemurray11/'
const TRANSFORM = {
  name: 'Transform Awards Winner Spotlight, May 19, 2025',
  url: 'https://www.transform.us/articles/brightside-health-transform-award-talent-strategy/',
}

export const metadata: Metadata = {
  title: 'Stephanie Murray: 20 Years in Talent, 2025 Transform Award for Talent Strategy',
  description:
    'Stephanie Murray founded hiring.productions after 20 years in talent. Her team cut clinician time-to-hire to 15 days and onboarding times by more than half, and won Talent Strategy of the Year at the 2025 Transform Awards.',
  alternates: { canonical: '/about/stephanie' },
  openGraph: {
    type: 'profile',
    title: 'Stephanie Murray: 20 years in talent',
    description: 'The recruiter behind hiring.productions. Her team won Talent Strategy of the Year at the 2025 Transform Awards.',
    url: CANONICAL,
  },
}

const css = `
  .ab-hero{display:grid;grid-template-columns:auto minmax(0,1fr);gap:clamp(28px,4vw,56px);align-items:center;}
  .ab-photo{width:clamp(140px,18vw,220px);aspect-ratio:1;border-radius:50%;overflow:hidden;position:relative;}
  .ab-photo img{object-fit:cover;}
  .ab-hero h1 span{display:block;color:var(--indigo-text);}
  .ab-result{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);gap:clamp(32px,5vw,72px);align-items:end;margin-top:40px;}
  .ab-big{font-weight:900;font-size:clamp(76px,9.5vw,136px);line-height:.9;letter-spacing:-0.045em;color:var(--ink);white-space:nowrap;}
  .ab-big small{white-space:normal;}
  .ab-big small{display:block;font-size:clamp(17px,1.6vw,19px);font-weight:700;letter-spacing:0;line-height:1.45;color:var(--ink-2);margin-top:18px;max-width:340px;}
  .ab-story p{font-size:clamp(18px,1.7vw,20px);line-height:1.6;color:var(--ink-2);}
  .ab-story p + p{margin-top:18px;}
  .ab-story b{color:var(--ink);}
  .ab-src{display:inline-block;margin-top:22px;font-size:14px;color:var(--ink-3);text-decoration:underline;text-underline-offset:3px;}
  .ab-quote{max-width:900px;}
  .ab-quote p{font-weight:900;font-size:clamp(32px,4.4vw,52px);line-height:1.12;letter-spacing:-0.025em;color:var(--ink);}
  .ab-quote .ab-cite{margin-top:20px;font-size:15px;font-weight:400;letter-spacing:0;line-height:1.5;color:var(--ink-3);}
  .ab-quote .ab-cite a{text-decoration:underline;text-underline-offset:3px;}
  .ab-rules{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(28px,4vw,56px);margin-top:36px;}
  .ab-rules h3{font-size:22px;font-weight:800;padding-bottom:10px;border-bottom:2px solid var(--ink);}
  .ab-rules li{padding:14px 0;border-bottom:1px solid var(--rule);font-size:18px;line-height:1.5;color:var(--ink-2);list-style:none;}
  .ab-close{text-align:left;padding-bottom:clamp(96px,11vw,150px);}
  .ab-close .btn{margin-top:28px;}
  .ab-close .footnote a{font-weight:700;}
  @media(max-width:760px){
    .ab-hero{grid-template-columns:1fr;}
    .ab-result,.ab-rules{grid-template-columns:1fr;}
  }
`

export default function AboutStephaniePage() {
  const ld = graph({
    '@type': 'ProfilePage',
    '@id': `${CANONICAL}#page`,
    url: CANONICAL,
    name: 'Stephanie Murray',
    mainEntity: {
      '@type': 'Person',
      '@id': `${SITE}/#person`,
      name: 'Stephanie Murray',
      url: CANONICAL,
      image: `${SITE}/images/stephanie-murray.jpg`,
      jobTitle: 'Founder, hiring.productions',
      worksFor: { '@id': `${SITE}/#organization` },
      founder: { '@id': `${SITE}/#organization` },
      description:
        'Founder of hiring.productions, 20 years in talent. Her talent team cut clinician time-to-hire to 15 days and onboarding times by more than half, and won Talent Strategy of the Year at the 2025 Transform Awards.',
      award: '2025 Transform Awards, Team Magnet: Talent Strategy of the Year (with her team)',
      sameAs: [LINKEDIN],
    },
  })

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + css }} />
      <JsonLd data={ld} />
      <SiteNav />

      <header className="ph">
        <div className="wrap">
          <p className="crumbs">
            <a href="/">Home</a> / About Stephanie
          </p>
          <div className="ab-hero">
            <div className="ab-photo">
              <Image src="/images/stephanie-murray.jpg" alt="Stephanie Murray" fill sizes="220px" priority />
            </div>
            <div>
              <h1 className="display">
                I&rsquo;m Stephanie Murray.{' '}
                <span>20 years inside hiring.</span>
              </h1>
              <p className="dek">
                I built hiring.productions so job seekers and hiring teams can see which tools are worth paying for. Before this, I was Senior
                Director of Talent Acquisition at Brightside Health. I also built RepVera, which you&rsquo;ll find listed here without a score.
              </p>
              <p className="dateline">
                <a href={LINKEDIN} rel="noopener" target="_blank">
                  LinkedIn
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="wrap sec" id="why">
        <h2>Why I built it</h2>
        <div className="ab-story" style={{ maxWidth: 760, marginTop: 24 }}>
          <p>
            People on both sides of hiring kept asking me the same question: which of these tools is worth paying for? Too many of the answers
            online were rankings someone had paid to be in. So I built a place that scores the tools on public data, puts a date on every
            score, and doesn&rsquo;t let anyone pay to be featured.
          </p>
        </div>
      </section>

      <section className="wrap sec" id="results">
        <h2>We hired before the job opened.</h2>
        <div className="ab-result">
          <p className="ab-big">
            15 days
            <small>Average clinician time-to-hire, after my team cut 4 days in one quarter.</small>
          </p>
          <div className="ab-story">
            <p>
              Demand for clinicians was high, and hiring and credentialing took too long. So my team stopped waiting for openings. We built a
              community of clinicians before roles opened, with meet-and-greets, useful content and steady follow-up.
            </p>
            <p>
              <b>Onboarding times fell by more than half.</b> In 2025 my team won Talent Strategy of the Year at the Transform Awards.
            </p>
            <a className="ab-src" href={TRANSFORM.url} rel="nofollow noopener" target="_blank">
              Source: {TRANSFORM.name}
            </a>
          </div>
        </div>
      </section>

      <section className="wrap sec" id="advice">
        <blockquote className="ab-quote">
          <p>&ldquo;Don&rsquo;t wait until you have a job opening to start building relationships.&rdquo;</p>
          <p className="ab-cite">
            From my interview with{' '}
            <a href={TRANSFORM.url} rel="nofollow noopener" target="_blank">
              Transform
            </a>
            , May 2025
          </p>
        </blockquote>
      </section>

      <section className="wrap sec" id="judgment">
        <h2>My opinions stay out of the scores.</h2>
        <p className="lead">
          When something on this site is my opinion, it&rsquo;s labeled as mine, and it has no effect on any score. Every score is built
          from dated public data.
        </p>
        <div className="ab-rules">
          <div>
            <h3>What I do</h3>
            <ul>
              {framework.judgment.does.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>What I never do</h3>
            <ul>
              {framework.judgment.never.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="footnote">
          I also built{' '}
          <a href={repveraLink('about')} rel="noopener">
            RepVera
          </a>
          , a record of what someone is like to work with, in the words of people who have worked with them. It&rsquo;s listed on this site
          without a score, because I don&rsquo;t score my own tool. <a href="/how-we-review#judgment">How I keep them apart</a>
        </p>
      </section>

      <section className="wrap sec ab-close" id="start">
        <h2>Start with the question you already have.</h2>
        <p className="lead">
          Tell me what&rsquo;s going wrong and what you can spend, and I&rsquo;ll recommend one tool and a backup and show you why.
        </p>
        <a className="btn btn-indigo" href="/what-should-i-use">
          What should I use?
        </a>
      </section>

      <SiteFooter />
    </>
  )
}
