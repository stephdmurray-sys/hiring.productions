import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { OPPORTUNITIES } from '@/lib/opportunities'

/**
 * /consider-me — index of open consulting engagements for recruiters
 * and talent assessors.
 *
 * Every engagement gets its own shareable page at /consider-me/{slug}
 * with the full posting and its application form. This index just
 * routes people there. No blanket bench form: applications are per
 * role, on the role page.
 */

const STEPS = [
  {
    num: '01',
    title: 'Tell us who you are',
    body: 'Name, specialty, availability. Two minutes, one application.',
  },
  {
    num: '02',
    title: 'Bring your receipts',
    body: 'Share your verified RepVera profile: portable proof of how others experience working with you, including recognition you already have. Build one free at repvera.com.',
  },
  {
    num: '03',
    title: 'We move quickly',
    body: 'Your application goes straight to Stephanie. If it fits the engagement, you hear back fast.',
  },
]

export default function ConsiderMeIndexPage() {
  return (
    <div style={{ background: '#FAF8F3', color: '#1A1A22', minHeight: '100vh' }}>
      <Navigation variant="light" />

      {/* Hero */}
      <section
        style={{
          padding: 'clamp(72px, 10vw, 128px) 24px clamp(48px, 6vw, 72px)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#A78BFA',
              margin: '0 0 16px',
            }}
          >
            For recruiters and talent assessors
          </p>
          <h1
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(40px, 6.5vw, 72px)',
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
              margin: '0 0 22px',
            }}
          >
            Get pulled in when
            <br />
            the work comes.
          </h1>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: 'clamp(16px, 1.8vw, 19px)',
              lineHeight: 1.6,
              color: '#5A5A6E',
              maxWidth: 620,
              margin: '0 auto',
            }}
          >
            Hiring.Productions brings vetted talent people into fast, high trust
            client projects. Interview assessments, search, advisory. Every
            application is for a specific open engagement.
          </p>
        </div>
      </section>

      {/* Open engagements */}
      <section
        id="opportunities"
        style={{ padding: '0 24px clamp(48px, 6vw, 80px)', scrollMarginTop: 90 }}
      >
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#A78BFA',
              textAlign: 'center',
              margin: '0 0 20px',
            }}
          >
            Open engagements
          </p>

          {OPPORTUNITIES.length === 0 && (
            <p
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: 16,
                color: '#5A5A6E',
                textAlign: 'center',
                background: '#FFFFFF',
                border: '1px solid #ECECF2',
                borderRadius: 16,
                padding: '32px 24px',
              }}
            >
              Nothing open right now. Check back soon, new engagements post
              here first.
            </p>
          )}

          {OPPORTUNITIES.map((opp) => (
            <Link
              key={opp.slug}
              href={`/consider-me/${opp.slug}`}
              style={{
                display: 'block',
                background: '#FFFFFF',
                border: '1.5px solid rgba(108,71,255,0.30)',
                borderRadius: 20,
                padding: 'clamp(24px, 3.5vw, 32px)',
                marginBottom: 16,
                textDecoration: 'none',
                boxShadow: '0 18px 44px -30px rgba(108,71,255,0.35)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 16,
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 7,
                      fontFamily: "'Figtree', sans-serif",
                      fontWeight: 700,
                      fontSize: 12,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: '#0F7A4F',
                      marginBottom: 10,
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: '#0F7A4F',
                        display: 'inline-block',
                      }}
                    />
                    Open now
                  </span>
                  <span
                    style={{
                      display: 'block',
                      fontFamily: "'Figtree', sans-serif",
                      fontWeight: 900,
                      fontSize: 'clamp(22px, 3vw, 28px)',
                      letterSpacing: '-0.015em',
                      color: '#1A1A22',
                      marginBottom: 6,
                    }}
                  >
                    {opp.title}
                  </span>
                  <span
                    style={{
                      display: 'block',
                      fontFamily: "'Figtree', sans-serif",
                      fontSize: 14.5,
                      color: '#5A5A6E',
                    }}
                  >
                    {opp.meta}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 800,
                    fontSize: 15,
                    color: '#6C47FF',
                    whiteSpace: 'nowrap',
                  }}
                >
                  View role and apply
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '0 24px clamp(80px, 10vw, 128px)' }}>
        <div
          style={{
            maxWidth: 980,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 16,
          }}
        >
          {STEPS.map((s) => (
            <div
              key={s.num}
              style={{
                background: '#FFFFFF',
                border: '1px solid #ECECF2',
                borderRadius: 16,
                padding: '28px 26px',
              }}
            >
              <p
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: '0.08em',
                  color: '#A78BFA',
                  margin: '0 0 10px',
                }}
              >
                {s.num}
              </p>
              <h2
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 800,
                  fontSize: 22,
                  letterSpacing: '-0.01em',
                  margin: '0 0 8px',
                }}
              >
                {s.title}
              </h2>
              <p
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: 15,
                  lineHeight: 1.55,
                  color: '#5A5A6E',
                  margin: 0,
                }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
