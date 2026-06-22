import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'

const CANONICAL = 'https://hiring.productions/about/stephanie'

/**
 * /about/stephanie — Stephanie Murray founder bio page.
 *
 * Built 5/26 after the Transform Award strategic audit. The page does
 * three jobs at once:
 *
 *   1. Search results for "Stephanie Murray hiring" should land here,
 *      not on LinkedIn or the Transform article. Owns the founder
 *      identity on our own domain.
 *   2. Backlink magnet. When podcast hosts, journalists, or speaking-
 *      gig organizers Google her, this is the page they share when
 *      introducing her. Each share = a real referral signal.
 *   3. Closing argument for both audiences. Hiring teams considering
 *      working with her see the full credentials. Job seekers
 *      considering the tools see the recruiter is real.
 *
 * Built around the actual Transform Award piece content (sourceable,
 * public, verifiable). No fabricated stats. Direct quotes from the
 * award piece are pulled in with attribution.
 *
 * Layout intentionally simple: hero, story sections, two-CTA close.
 * No flashy chrome, no decorative graphics. The credentials are the
 * design.
 */

export const metadata: Metadata = {
  title: 'Stephanie Murray: Senior Director of TA, Transform Award Winner',
  description:
    'Stephanie Murray built the Brightside Talent Collective, scaling clinician hiring from 19 to over 1,500 and winning the 2025 Transform Award for Talent Strategy of the Year. Now coaching candidates and small hiring teams.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: 'profile',
    title: 'Stephanie Murray: Senior Director of TA, Transform Award Winner',
    description:
      'The recruiter behind hiring.productions. 2025 Transform Award winner. Built the Brightside Talent Collective.',
    url: CANONICAL,
  },
}

/**
 * Person + Organization JSON-LD so Google reads this as an authoritative
 * founder profile, not just a marketing page. Pulls in the Transform
 * Award + Brightside affiliation + the hiring.productions org link.
 */
const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Stephanie Murray',
  jobTitle: 'Senior Director of Talent Acquisition, Brightside Health',
  description:
    'Senior Director of Talent Acquisition at Brightside Health and founder of hiring.productions. 2025 Transform Award winner for Talent Strategy of the Year. Built the Brightside Talent Collective, scaling clinician hiring from 19 to over 1,500.',
  url: CANONICAL,
  award:
    '2025 Transform Award, Talent Strategy of the Year (Brightside Talent Collective)',
  worksFor: [
    {
      '@type': 'Organization',
      name: 'Brightside Health',
      url: 'https://brightside.com',
    },
    {
      '@type': 'Organization',
      name: 'hiring.productions',
      url: 'https://hiring.productions',
    },
  ],
  sameAs: [
    'https://www.linkedin.com/in/stephaniedmurray/',
    'https://transform.us/articles/brightside-health-transform-award-talent-strategy/',
  ],
}

export default function StephanieMurrayAboutPage() {
  return (
    <main style={{ background: '#FAF8F3', color: '#1A1A22', minHeight: '100vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_SCHEMA) }}
      />
      <Navigation variant="light" />

      {/* Hero. Photo on the left at desktop, stacked on mobile. Award
          credential leads everything; H1 is the name + role. */}
      <section
        style={{
          padding: 'clamp(80px, 10vw, 128px) 24px clamp(48px, 6vw, 72px)',
        }}
      >
        <div
          style={{
            maxWidth: 1080,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'minmax(180px, 240px) 1fr',
            gap: 'clamp(28px, 5vw, 64px)',
            alignItems: 'start',
          }}
        >
          {/* Photo */}
          <div
            style={{
              width: '100%',
              aspectRatio: '1 / 1',
              position: 'relative',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '4px solid #ECECF2',
              background: '#FAFAFB',
            }}
          >
            <Image
              src="/images/stephanie-murray.jpg"
              alt="Stephanie Murray, Senior Director of Talent Acquisition at Brightside Health and founder of hiring.productions"
              fill
              sizes="240px"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>

          <div>
            <div
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: 13,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#C73E5A',
                marginBottom: 16,
              }}
            >
              2025 Transform Award · Talent Strategy of the Year
            </div>
            <h1
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(44px, 6.5vw, 76px)',
                letterSpacing: '-0.028em',
                lineHeight: 1.02,
                color: '#1A1A22',
                margin: '0 0 18px',
              }}
            >
              Stephanie Murray.
              <br />
              <span style={{ color: '#5A4FE0' }}>20 years inside hiring.</span>
            </h1>
            <p
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: 'clamp(17px, 1.9vw, 20px)',
                color: '#1A1A22',
                lineHeight: 1.55,
                margin: 0,
                maxWidth: 640,
                fontWeight: 500,
              }}
            >
              Senior Director of Talent Acquisition at Brightside Health.
              Founder of hiring.productions. The recruiter who built the
              Brightside Talent Collective, then opened the playbook to
              everyone.
            </p>
          </div>
        </div>
      </section>

      {/* The Brightside Talent Collective story */}
      <section
        style={{
          padding: 'clamp(56px, 7vw, 88px) 24px',
          background: '#FFFFFF',
          borderTop: '1px solid #ECECF2',
          borderBottom: '1px solid #ECECF2',
        }}
      >
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: 12,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#5A4FE0',
              marginBottom: 16,
              textAlign: 'center',
            }}
          >
            The methodology that won the award
          </div>
          <h2
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(40px, 6vw, 64px)',
              letterSpacing: '-0.024em',
              lineHeight: 1.04,
              color: '#1A1A22',
              margin: '0 0 36px',
              textAlign: 'center',
            }}
          >
            The Brightside Talent Collective.
          </h2>

          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: 17,
              color: '#1A1A22',
              lineHeight: 1.65,
              margin: '0 0 18px',
            }}
          >
            When Stephanie joined Brightside Health as employee #19, the
            company was a small mental-health startup with an outsized
            ambition: provide remote psychiatric care at scale. Scale
            meant clinicians. Lots of them. Across every state. In a
            market where qualified clinicians had their pick of employers
            and most were burned out from traditional health systems.
          </p>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: 17,
              color: '#1A1A22',
              lineHeight: 1.65,
              margin: '0 0 18px',
            }}
          >
            The conventional answer would have been to spin up a
            transactional sourcing function: post jobs, screen applicants,
            run interviews, send offers. Stephanie did something
            different. She built a relationship-first community called
            the{' '}
            <strong style={{ fontWeight: 800 }}>
              Brightside Talent Collective
            </strong>{' '}
            : a curated network of clinicians who connected with
            Brightside long before they were ready to apply, through
            meet-and-greet events, mission-aligned content, and
            intentional human moments designed for a fully remote
            workforce.
          </p>

          <blockquote
            style={{
              borderLeft: '3px solid #6C47FF',
              paddingLeft: 18,
              margin: '32px 0',
              fontFamily: "'Figtree', sans-serif",
              fontStyle: 'italic',
              fontWeight: 500,
              fontSize: 19,
              lineHeight: 1.55,
              color: '#1A1A22',
            }}
          >
            &ldquo;Our culture thrives when we lead with empathy, clear
            communication, and a sense of belonging from the very first
            interaction.&rdquo;
            <span
              style={{
                display: 'block',
                marginTop: 10,
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: 12.5,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#8B8AA0',
              }}
            >
              Stephanie Murray, Transform Award winner profile
            </span>
          </blockquote>

          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: 17,
              color: '#1A1A22',
              lineHeight: 1.65,
              margin: '0 0 18px',
            }}
          >
            The results were exactly what you would expect when hiring
            stops being a transaction and starts being a relationship.
            Time-to-hire dropped to 15 days. Onboarding times were cut by
            more than half. Brightside scaled from 19 employees to over
            1,500 clinicians nationwide. And in 2025, Transform named
            the methodology the Talent Strategy of the Year.
          </p>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: 17,
              color: '#1A1A22',
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            Stephanie&rsquo;s argument inside the company, and the
            argument the award validated, was simple: candidates and
            employees increasingly expect experiences that support their
            individual needs, not just efficient processes.
            Relationship-building, creativity, and human-centered
            practices can drive powerful outcomes, even when the entire
            process is remote.
          </p>
        </div>
      </section>

      {/* Why hiring.productions */}
      <section
        style={{
          padding: 'clamp(56px, 7vw, 88px) 24px',
        }}
      >
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: 12,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#5A4FE0',
              marginBottom: 16,
              textAlign: 'center',
            }}
          >
            Why hiring.productions
          </div>
          <h2
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(40px, 6vw, 64px)',
              letterSpacing: '-0.024em',
              lineHeight: 1.04,
              color: '#1A1A22',
              margin: '0 0 32px',
              textAlign: 'center',
            }}
          >
            The same playbook, opened up.
          </h2>

          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: 17,
              color: '#1A1A22',
              lineHeight: 1.65,
              margin: '0 0 18px',
            }}
          >
            After 20 years inside hiring, Stephanie kept seeing the same
            two patterns on the outside. Job seekers were exhausted by
            advice from people who had never actually sat in a recruiter
            seat, much less led a team that hired thousands of people.
            And small hiring teams without a TA function were building
            their entire hiring strategy from generic blog posts that
            recycled the same five tips.
          </p>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: 17,
              color: '#1A1A22',
              lineHeight: 1.65,
              margin: '0 0 18px',
            }}
          >
            Hiring.productions is the operationalization of the Brightside
            Talent Collective methodology for both sides. For candidates:
            recruiter-side tools that show how the other side actually
            screens, sources, and decides. For small hiring teams: the
            same relationship-first playbook that scaled Brightside,
            adapted for companies that do not have a senior TA leader
            on staff.
          </p>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: 17,
              color: '#1A1A22',
              lineHeight: 1.65,
              margin: 0,
              fontWeight: 600,
            }}
          >
            Both sides of the table. Same system. Built by someone who
            has been in the room for two decades.
          </p>
        </div>
      </section>

      {/* Credentials at a glance */}
      <section
        style={{
          padding: 'clamp(40px, 5vw, 64px) 24px',
          background: '#FFFFFF',
          borderTop: '1px solid #ECECF2',
        }}
      >
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
              gap: 16,
            }}
          >
            {[
              {
                stat: '1,500+',
                label: 'Clinicians hired at Brightside Health',
              },
              { stat: '15 days', label: 'Reduced clinician time-to-hire to' },
              { stat: '50%+', label: 'Cut in onboarding times' },
              {
                stat: '2025',
                label: 'Transform Award, Talent Strategy of the Year',
              },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  padding: '24px 22px',
                  background: '#FAF8F3',
                  border: '1px solid #ECECF2',
                  borderRadius: 14,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 900,
                    fontSize: 32,
                    letterSpacing: '-0.02em',
                    color: '#5A4FE0',
                    lineHeight: 1,
                    marginBottom: 8,
                  }}
                >
                  {item.stat}
                </div>
                <div
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 500,
                    fontSize: 14,
                    color: '#5A5A6E',
                    lineHeight: 1.5,
                  }}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dual CTA close */}
      <section
        style={{
          padding: 'clamp(64px, 8vw, 112px) 24px',
        }}
      >
        <div
          style={{
            maxWidth: 880,
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(40px, 6vw, 64px)',
              letterSpacing: '-0.024em',
              lineHeight: 1.04,
              color: '#1A1A22',
              margin: '0 0 16px',
            }}
          >
            Work with Stephanie, or try what she built.
          </h2>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: 17,
              color: '#5A5A6E',
              lineHeight: 1.6,
              maxWidth: 580,
              margin: '0 auto 36px',
            }}
          >
            Two paths in. Hiring teams without a TA function get the
            playbook directly. Job seekers get the recruiter-side tools
            that show how hiring actually works.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
              gap: 14,
              maxWidth: 600,
              margin: '0 auto',
            }}
          >
            <Link
              href="/for-companies"
              style={{
                background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                color: '#FFFFFF',
                padding: '17px 24px',
                borderRadius: 12,
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: 17,
                textDecoration: 'none',
                display: 'inline-block',
                boxShadow: '0 14px 32px rgba(108,71,255,0.22)',
              }}
            >
              Work with Stephanie →
            </Link>
            <Link
              href="/sign-in"
              style={{
                background: '#FFFFFF',
                color: '#1A1A22',
                padding: '17px 24px',
                borderRadius: 12,
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: 17,
                textDecoration: 'none',
                display: 'inline-block',
                border: '1.5px solid rgba(108,71,255,0.35)',
              }}
            >
              Try the tools she built →
            </Link>
          </div>

          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: 13.5,
              color: '#8B8AA0',
              marginTop: 28,
              lineHeight: 1.55,
            }}
          >
            Read the original Transform Award profile{' '}
            <a
              href="https://transform.us/articles/brightside-health-transform-award-talent-strategy/"
              target="_blank"
              rel="noopener"
              style={{ color: '#5A4FE0', fontWeight: 700, textDecoration: 'none' }}
            >
              here →
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
