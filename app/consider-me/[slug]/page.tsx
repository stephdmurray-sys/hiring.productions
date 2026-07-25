import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { ConsiderMeForm } from '@/components/consider-me-form'
import { OPPORTUNITIES, getOpportunity } from '@/lib/opportunities'

/**
 * Dedicated page for one open engagement: /consider-me/{slug}.
 *
 * This is the URL Stephanie shares when posting a role. Full posting
 * up top, the application form below, everything scoped to this one
 * engagement. Closing the role (removing it from lib/opportunities)
 * 404s this page automatically.
 */

export function generateStaticParams() {
  return OPPORTUNITIES.map((o) => ({ slug: o.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const opp = getOpportunity(slug)
  if (!opp) return {}
  const description = opp.sections.find((s) => s.body)?.body?.slice(0, 200) ?? opp.meta
  return {
    title: `${opp.title} | Consider Me`,
    description,
    alternates: {
      canonical: `https://hiring.productions/consider-me/${opp.slug}`,
    },
    openGraph: {
      title: opp.title,
      description: opp.meta,
      url: `https://hiring.productions/consider-me/${opp.slug}`,
    },
  }
}

export default async function OpportunityPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const opp = getOpportunity(slug)
  if (!opp) notFound()

  return (
    <div style={{ background: '#FAF8F3', color: '#1A1A22', minHeight: '100vh' }}>
      <Navigation variant="light" />

      {/* Posting */}
      <section style={{ padding: 'clamp(56px, 8vw, 96px) 24px clamp(40px, 5vw, 64px)' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <Link
            href="/consider-me"
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 700,
              fontSize: 13.5,
              color: '#6C47FF',
              textDecoration: 'none',
            }}
          >
            All open engagements
          </Link>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#A78BFA',
              margin: '26px 0 12px',
            }}
          >
            Open engagement
          </p>
          <h1
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(34px, 5vw, 54px)',
              letterSpacing: '-0.025em',
              lineHeight: 1.08,
              margin: '0 0 12px',
            }}
          >
            {opp.title}
          </h1>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: 16,
              color: '#5A5A6E',
              margin: '0 0 22px',
            }}
          >
            {opp.meta}
          </p>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: 14.5,
              lineHeight: 1.55,
              color: '#5A5A6E',
              background: 'rgba(108,71,255,0.06)',
              borderRadius: 10,
              padding: '12px 16px',
              margin: '0 0 32px',
            }}
          >
            <strong style={{ color: '#1A1A22' }}>Client:</strong> {opp.client}
          </p>

          {opp.sections.map((s) => (
            <div key={s.heading} style={{ marginBottom: 24 }}>
              <h2
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 800,
                  fontSize: 19,
                  margin: '0 0 8px',
                }}
              >
                {s.heading}
              </h2>
              {s.body && (
                <p
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontSize: 15.5,
                    lineHeight: 1.65,
                    color: '#5A5A6E',
                    margin: 0,
                  }}
                >
                  {s.body}
                </p>
              )}
              {s.bullets && (
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      style={{
                        fontFamily: "'Figtree', sans-serif",
                        fontSize: 15.5,
                        lineHeight: 1.65,
                        color: '#5A5A6E',
                        marginBottom: 6,
                      }}
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <a
            href="#apply"
            style={{
              display: 'inline-block',
              marginTop: 8,
              background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
              borderRadius: 10,
              padding: '14px 28px',
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: 15,
              color: '#FFFFFF',
              textDecoration: 'none',
              boxShadow: '0 12px 28px rgba(108,71,255,0.22)',
            }}
          >
            Apply now
          </a>
        </div>
      </section>

      {/* RepVera callout */}
      <section style={{ padding: '0 24px clamp(48px, 6vw, 72px)' }}>
        <div
          style={{
            maxWidth: 780,
            margin: '0 auto',
            background: '#FFFFFF',
            border: '1.5px solid rgba(108,71,255,0.30)',
            borderRadius: 20,
            padding: 'clamp(28px, 4vw, 44px)',
            boxShadow: '0 18px 44px -30px rgba(108,71,255,0.35)',
          }}
        >
          <h2
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(24px, 3vw, 30px)',
              letterSpacing: '-0.02em',
              margin: '0 0 14px',
            }}
          >
            Why we ask for a RepVera, not references.
          </h2>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: 16,
              lineHeight: 1.65,
              color: '#5A5A6E',
              margin: '0 0 10px',
            }}
          >
            When a client needs someone next week, there is no time to chase
            reference calls. So instead of a list of names, send your receipts.
          </p>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: 16,
              lineHeight: 1.65,
              color: '#5A5A6E',
              margin: '0 0 24px',
            }}
          >
            To reduce time to trust, we leverage RepVera for verified proof of
            how others experience working with you. Create your profile, paste
            the link in your application, then send your collection link to the
            people who can vouch for you. Your profile updates automatically as
            they respond. It is free and takes a few minutes.
          </p>
          <a
            href="https://repvera.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#FF4F6A',
              color: '#FFFFFF',
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: 15,
              padding: '13px 26px',
              borderRadius: 10,
              textDecoration: 'none',
              boxShadow: '0 12px 28px rgba(255,79,106,0.25)',
            }}
          >
            Create your free RepVera
          </a>
        </div>
      </section>

      {/* Application */}
      <section
        id="apply"
        style={{ padding: '0 24px clamp(80px, 10vw, 128px)', scrollMarginTop: 90 }}
      >
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <ConsiderMeForm opportunity={opp} />
        </div>
      </section>

      <Footer />
    </div>
  )
}
