import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { RANK_ROLES, roleBySlug, defaultFaqsForRole } from '@/lib/rank-roles'
import { Search, ListOrdered, TrendingUp, Wrench } from 'lucide-react'

/**
 * Static role-specific landing pages at /rank/[role]. Each one is a
 * tighter, more searchable version of the homepage — same wedge tool
 * underneath, but the H1 and copy are calibrated to the exact thing a
 * candidate in that role types into Google. We pre-render all five at
 * build time so they're statically served and indexable.
 *
 * Why this matters for the discovery problem: Google Search Console
 * showed only 3 of 61 pages indexed. Each role page targets a distinct
 * long-tail query ("where do I rank linkedin product manager",
 * "linkedin recruiter search software engineer", etc.) and routes
 * straight into the simulator with the targetRole field pre-filled via
 * the ?role= URL param.
 */

export function generateStaticParams() {
  return RANK_ROLES.map((r) => ({ role: r.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ role: string }>
}): Promise<Metadata> {
  const { role } = await params
  const config = roleBySlug(role)
  if (!config) return {}
  const canonical = `https://hiring.productions/rank/${config.slug}`
  return {
    title: config.seoTitle,
    description: config.seoDescription,
    alternates: { canonical },
    openGraph: {
      title: config.seoTitle,
      description: config.seoDescription,
      url: canonical,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: config.seoTitle,
      description: config.seoDescription,
    },
  }
}

export default async function RoleRankPage({
  params,
}: {
  params: Promise<{ role: string }>
}) {
  const { role } = await params
  const config = roleBySlug(role)
  if (!config) notFound()

  const simulatorHref = `/tools/recruiter-search-rank?role=${encodeURIComponent(
    config.defaultTargetRole,
  )}`

  // FAQ schema (JSON-LD) — Google sometimes pulls this into rich-snippet
  // "People also ask" result cards. Each Q&A is a real long-tail query
  // candidates in this role search for; the answer is calibrated to what
  // the wedge tool actually delivers, so the schema doubles as a preview
  // of the value behind the click.
  const faqs = defaultFaqsForRole(config)
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  }

  return (
    <main style={{ background: '#0F0F12', color: '#F2F0FF' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navigation variant="dark" />

      {/* ───────────────────── HERO ───────────────────── */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: '#0F0F12',
          padding: 'clamp(80px, 12vh, 120px) clamp(20px, 5vw, 40px) clamp(56px, 8vh, 90px)',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 700px 520px at 80% 8%, rgba(108,71,255,0.22) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 500px 400px at 12% 92%, rgba(255,79,106,0.14) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'relative',
            maxWidth: 880,
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 14px',
              background: 'rgba(167,139,250,0.10)',
              border: '1px solid rgba(167,139,250,0.28)',
              borderRadius: 100,
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#A78BFA',
              marginBottom: 26,
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#5EE6A8',
              }}
            />
            FOR {config.displayName.toUpperCase()}S · FREE TO TRY
          </div>

          {/* H1 */}
          <h1
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(36px, 5.5vw, 64px)',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: '#F2F0FF',
              marginBottom: 22,
            }}
          >
            {config.question.split(config.displayName).map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {config.displayName}
                  </span>
                )}
              </span>
            ))}
          </h1>

          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '18px',
              lineHeight: 1.6,
              color: '#9D9CB3',
              maxWidth: 640,
              margin: '0 auto 40px',
            }}
          >
            {config.subhead}
          </p>

          <Link
            href={simulatorHref}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
              color: 'white',
              padding: '17px 38px',
              borderRadius: 12,
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: '16px',
              textDecoration: 'none',
              boxShadow: '0 18px 50px rgba(108,71,255,0.32)',
            }}
          >
            <Search size={18} />
            Show me where I rank
          </Link>

          <div
            style={{
              marginTop: 30,
              fontFamily: "'Figtree', sans-serif",
              fontSize: '13px',
              color: '#8B8AA0',
            }}
          >
            No account to start · 2 free runs/day · Built by a senior TA director
          </div>
        </div>
      </section>

      {/* ───────────── WHAT LINKEDIN ACTUALLY WEIGHTS ───────────── */}
      <section
        style={{
          background: '#1A1A22',
          borderTop: '1px solid rgba(108,71,255,0.18)',
          borderBottom: '1px solid rgba(108,71,255,0.18)',
          padding: 'clamp(56px, 8vw, 90px) clamp(20px, 5vw, 40px)',
        }}
      >
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#A78BFA',
              textAlign: 'center',
              marginBottom: 18,
            }}
          >
            What LinkedIn weighs for {config.displayName}s
          </div>
          <h2
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(26px, 3.6vw, 38px)',
              letterSpacing: '-0.02em',
              color: '#F2F0FF',
              textAlign: 'center',
              lineHeight: 1.15,
              marginBottom: 36,
            }}
          >
            The 3 signals that decide your rank.
          </h2>

          <div style={{ display: 'grid', gap: 16 }}>
            {config.signals.map((signal, idx) => (
              <div
                key={idx}
                style={{
                  background: '#0F0F12',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 14,
                  padding: '20px 22px',
                  display: 'flex',
                  gap: 16,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'rgba(108,71,255,0.14)',
                    color: '#A78BFA',
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 800,
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {idx + 1}
                </div>
                <div
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontSize: '15px',
                    color: '#F2F0FF',
                    lineHeight: 1.6,
                  }}
                >
                  {signal}
                </div>
              </div>
            ))}
          </div>

          {/* Rank context — long-tail SEO content */}
          <div
            style={{
              marginTop: 32,
              padding: '20px 22px',
              background: 'rgba(108,71,255,0.06)',
              border: '1px solid rgba(108,71,255,0.18)',
              borderRadius: 14,
            }}
          >
            <div
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: '12px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#A78BFA',
                marginBottom: 8,
              }}
            >
              What &ldquo;good rank&rdquo; means for {config.displayName}s
            </div>
            <div
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: '15px',
                color: '#F2F0FF',
                lineHeight: 1.65,
              }}
            >
              {config.rankContext}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── WHAT YOU GET BACK ───────────── */}
      <section
        style={{
          background: '#0F0F12',
          padding: 'clamp(56px, 8vw, 90px) clamp(20px, 5vw, 40px)',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#A78BFA',
              textAlign: 'center',
              marginBottom: 18,
            }}
          >
            What the simulator returns
          </div>
          <h2
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(26px, 3.6vw, 38px)',
              letterSpacing: '-0.02em',
              color: '#F2F0FF',
              textAlign: 'center',
              lineHeight: 1.15,
              marginBottom: 36,
            }}
          >
            Not advice. Your actual ranking.
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
              gap: 18,
            }}
          >
            {[
              {
                icon: Search,
                title: 'The 5 actual searches',
                body: `Boolean strings a recruiter sourcing ${config.displayName.toLowerCase()}s would type into LinkedIn Recruiter. Calibrated to this role specifically.`,
              },
              {
                icon: ListOrdered,
                title: 'Your rank in each',
                body: 'Estimated position out of the candidate pool LinkedIn surfaces. Calibrated to how the algorithm weights signals for this role.',
              },
              {
                icon: TrendingUp,
                title: '3 moves to climb',
                body: 'Ranked by total impact across every search. The single change that lifts you the most appears first.',
              },
              {
                icon: Wrench,
                title: 'Exact text replacements',
                body: 'Current line vs. recommended rewrite. Copy-paste ready. No generic "consider adding keywords" advice.',
              },
            ].map((card) => (
              <div
                key={card.title}
                style={{
                  background: '#1A1A22',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 14,
                  padding: 22,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: 'rgba(108,71,255,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 12,
                  }}
                >
                  <card.icon size={18} color="#A78BFA" strokeWidth={2} />
                </div>
                <div
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 800,
                    fontSize: '15.5px',
                    color: '#F2F0FF',
                    marginBottom: 8,
                  }}
                >
                  {card.title}
                </div>
                <div
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontSize: '13.5px',
                    color: '#9D9CB3',
                    lineHeight: 1.55,
                  }}
                >
                  {card.body}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link
              href={simulatorHref}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                color: 'white',
                padding: '16px 36px',
                borderRadius: 12,
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: '16px',
                textDecoration: 'none',
                boxShadow: '0 16px 40px rgba(108,71,255,0.28)',
              }}
            >
              <Search size={17} />
              Run mine — free
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────── CREDIBILITY + MEMBERSHIP TAG ───────────── */}
      <section
        style={{
          background: '#1A1A22',
          padding: 'clamp(56px, 8vw, 80px) clamp(20px, 5vw, 40px)',
        }}
      >
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <h2
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(26px, 3.6vw, 36px)',
              letterSpacing: '-0.02em',
              color: '#F2F0FF',
              lineHeight: 1.2,
              marginBottom: 18,
            }}
          >
            Built by a recruiter, not a resume tool company.
          </h2>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '16px',
              color: '#9D9CB3',
              lineHeight: 1.7,
              marginBottom: 28,
            }}
          >
            Stephanie Murray spent 20 years in talent acquisition — most recently as Senior
            Director of TA at Brightside Health. The searches you&apos;ll see are the same ones she
            ran on LinkedIn Recruiter every day to fill {config.displayName.toLowerCase()} roles.
            The simulator is part of the whole production — every Recruiter Insight on the site is
            built from real recruiting practice. unlocks all of it, both sides of the
            table.
          </p>
          <div
            style={{
              display: 'inline-flex',
              gap: 14,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Link
              href="/membership"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                border: '1.5px solid rgba(167,139,250,0.4)',
                background: 'transparent',
                color: '#A78BFA',
                padding: '13px 26px',
                borderRadius: 10,
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 700,
                fontSize: '15px',
                textDecoration: 'none',
              }}
            >
              See the whole production. →
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────── FAQ ─────────────
         Rendered visibly because Google rewards content+schema
         alignment. Each question is a long-tail query candidates
         in this role search for. The same Q&A is also in the
         FAQPage JSON-LD at the top of the document for rich-snippet
         eligibility in search results.
      */}
      <section
        style={{
          background: '#0F0F12',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: 'clamp(56px, 8vw, 90px) clamp(20px, 5vw, 40px)',
        }}
      >
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#A78BFA',
              textAlign: 'center',
              marginBottom: 18,
            }}
          >
            Questions {config.displayName.toLowerCase()}s ask
          </div>
          <h2
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(26px, 3.6vw, 36px)',
              letterSpacing: '-0.02em',
              color: '#F2F0FF',
              textAlign: 'center',
              lineHeight: 1.15,
              marginBottom: 32,
            }}
          >
            How LinkedIn Recruiter actually finds {config.displayName.toLowerCase()}s.
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqs.map((f, idx) => (
              <details
                key={idx}
                style={{
                  background: '#14141B',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 12,
                  padding: '16px 20px',
                }}
              >
                <summary
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 800,
                    fontSize: 15.5,
                    color: '#F2F0FF',
                    cursor: 'pointer',
                    listStyle: 'none',
                    lineHeight: 1.4,
                  }}
                >
                  {f.q}
                </summary>
                <div
                  style={{
                    marginTop: 12,
                    fontFamily: "'Figtree', sans-serif",
                    fontSize: 14.5,
                    color: '#9D9CB3',
                    lineHeight: 1.65,
                  }}
                >
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
