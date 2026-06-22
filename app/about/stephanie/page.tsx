import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'

const CANONICAL = 'https://hiring.productions/about/stephanie'

/**
 * /about/stephanie — Stephanie Murray founder bio page.
 *
 * Built 5/26 after the Transform Award strategic audit, then revised
 * the same day per a voice constraint Stephanie raised: Brightside
 * gets at most one credential-level mention per page, never in
 * titles, never as a named methodology. The page now centers HER
 * achievements (15-day time-to-hire, 50%+ onboarding cut, 19 to
 * 1,500+ scale, 2025 Transform Award) with the company genericized
 * to "a fast-growing healthcare startup" everywhere except the one
 * bio-credential mention.
 *
 * The page does three jobs:
 *   1. Search results for "Stephanie Murray hiring" should land here,
 *      not on LinkedIn or the Transform article. Owns the founder
 *      identity on her own domain.
 *   2. Backlink magnet. When podcast hosts, journalists, or speaking-
 *      gig organizers Google her, this is the page they share.
 *   3. Closing argument for both audiences. Hiring teams see full
 *      credentials. Job seekers see the recruiter is real.
 */

export const metadata: Metadata = {
  title: 'Stephanie Murray: 20 Years in Hiring, 2025 Transform Award Winner',
  description:
    'Stephanie Murray scaled clinician hiring from 19 to over 1,500 at a fast-growing healthcare startup. Reduced time-to-hire to 15 days. Won the 2025 Transform Award for Talent Strategy of the Year. Now coaching candidates and small hiring teams.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: 'profile',
    title: 'Stephanie Murray: 20 years in hiring, 2025 Transform Award winner',
    description:
      'The recruiter behind hiring.productions. Built and ran the talent function at a fast-growing healthcare startup. 2025 Transform Award winner.',
    url: CANONICAL,
  },
}

/**
 * Person JSON-LD so Google reads this as an authoritative founder
 * profile. Job-title and worksFor reference the actual employer
 * (Brightside Health) as the bio-credential mention. Award field
 * carries the Transform 2025 credential without naming the company
 * methodology.
 */
const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Stephanie Murray',
  jobTitle: 'Senior Director of Talent Acquisition',
  description:
    'Senior Director of Talent Acquisition and founder of hiring.productions. 2025 Transform Award winner for Talent Strategy of the Year. Built and ran the talent function at a fast-growing healthcare startup, scaling clinician hiring from 19 to over 1,500.',
  url: CANONICAL,
  award: '2025 Transform Award, Talent Strategy of the Year',
  worksFor: {
    '@type': 'Organization',
    name: 'hiring.productions',
    url: 'https://hiring.productions',
  },
  sameAs: ['https://www.linkedin.com/in/stephaniedmurray/'],
}

export default function StephanieMurrayAboutPage() {
  return (
    <main style={{ background: '#FAF8F3', color: '#1A1A22', minHeight: '100vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_SCHEMA) }}
      />
      <Navigation variant="light" />

      {/* Hero */}
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
              alt="Stephanie Murray, founder of hiring.productions"
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
              Founder of hiring.productions. The recruiter who built the
              talent function at a fast-growing healthcare startup, then
              opened the playbook to everyone else.
            </p>
          </div>
        </div>
      </section>

      {/* The story */}
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
            How she built it
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
            From 19 employees to 1,500+ clinicians.
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
            When Stephanie joined as employee #19 of a fast-growing
            healthcare startup, the company was a small mental-health
            company with an outsized ambition: provide remote psychiatric
            care at scale. Scale meant clinicians. A lot of them. Across
            every state. In a market where qualified clinicians had their
            pick of employers and most were burned out from traditional
            health systems.
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
            run interviews, send offers. Stephanie did something different.
            She built a relationship-first community: a curated network of
            clinicians who connected with the company long before they
            were ready to apply, through meet-and-greet events,
            mission-aligned content, and intentional human moments
            designed for a fully remote workforce.
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
            more than half. The team scaled from 19 employees to over
            1,500 clinicians nationwide. And in 2025, Transform named the
            approach the Talent Strategy of the Year.
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
            The argument Stephanie made inside the company, and the
            argument the award validated, was simple. Candidates and
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
            Hiring.productions is the operationalization of that
            award-winning approach for both sides. For candidates:
            recruiter-side tools that show how the other side actually
            screens, sources, and decides. For small hiring teams: the
            same relationship-first playbook, adapted for companies that
            do not have a senior TA leader on staff.
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

      {/* Stats grid */}
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
              { stat: '1,500+', label: 'Clinicians hired and scaled to' },
              { stat: '15 days', label: 'Time-to-hire reduced to' },
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
        </div>
      </section>

      <Footer />
    </main>
  )
}
