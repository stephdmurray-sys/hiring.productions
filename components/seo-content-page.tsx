'use client'

import Link from 'next/link'
import { Navigation } from './navigation'
import { Footer } from './footer'
import { Lock } from 'lucide-react'

interface Section {
  heading: string
  body: string
}

interface InsideLook {
  name: string
  description: string
  href: string
  isFree?: boolean
}

interface RelatedLink {
  label: string
  href: string
}

/**
 * Question-answer pair surfaced both visually (an FAQ block at the bottom)
 * and as FAQPage JSON-LD schema. The schema is what triggers Google's
 * rich-snippet "People also ask" treatment — the single biggest SEO lever
 * for question-targeted content.
 */
export interface FaqItem {
  q: string
  a: string
}

interface SeoContentPageProps {
  badge: string
  badgeColor: 'indigo' | 'coral'
  /** The H1 — should literally match the search query users will type. */
  headline: string
  /**
   * Short direct-answer paragraph. Google often pulls this as the Featured
   * Snippet — keep it 40–60 words, no hedging, lead with the answer.
   */
  intro: string
  sections: Section[]
  insideLook: InsideLook
  relatedLinks?: RelatedLink[]
  /**
   * Question-answer pairs. When provided, renders a visible FAQ block AND
   * emits FAQPage JSON-LD for rich snippets. Aim for 5–8 high-quality Q&A
   * pairs per page; the answers can repeat / restate content from the
   * sections above (Google rewards consistency between visible and
   * structured content).
   */
  faqs?: FaqItem[]
  /**
   * Absolute URL for canonical + Article schema. e.g. "https://hiring.productions/q/7-second-rule"
   */
  canonicalUrl?: string
}

export function SeoContentPage({
  badge,
  badgeColor,
  headline,
  intro,
  sections,
  insideLook,
  relatedLinks,
  faqs,
  canonicalUrl,
}: SeoContentPageProps) {
  const badgeBgColor = badgeColor === 'indigo' ? '#6C47FF' : '#FF4F6A'

  // JSON-LD bundles: FAQPage (for rich snippets) + Article (E-E-A-T
  // signal, attaches Stephanie's authority to every question page).
  const ldGraph: Record<string, unknown>[] = []
  if (faqs && faqs.length > 0) {
    ldGraph.push({
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.a,
        },
      })),
    })
  }
  if (canonicalUrl) {
    ldGraph.push({
      '@type': 'Article',
      headline,
      description: intro,
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
      author: { '@id': 'https://hiring.productions/#person' },
      publisher: { '@id': 'https://hiring.productions/#organization' },
    })
  }
  const ld = ldGraph.length
    ? { '@context': 'https://schema.org', '@graph': ldGraph }
    : null

  return (
    <div style={{ background: '#FAF8F3', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {ld && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      )}
      <Navigation />

      <main style={{ flex: 1 }}>
        {/* Hero Section */}
        <section
          style={{
            background: '#FAF8F3',
            padding: '80px 40px 60px',
            maxWidth: '760px',
            margin: '0 auto',
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: 'inline-block',
              background: badgeBgColor,
              color: '#1A1A22',
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 700,
              fontSize: '11px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '6px 14px',
              borderRadius: '20px',
            }}
          >
            {badge}
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(32px, 4.5vw, 52px)',
              letterSpacing: '-0.02em',
              color: '#1A1A22',
              marginTop: '16px',
              lineHeight: 1.2,
            }}
          >
            {headline}
          </h1>

          {/* Intro */}
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 400,
              fontSize: '18px',
              color: '#8B8AA0',
              lineHeight: 1.75,
              marginTop: '20px',
            }}
          >
            {intro}
          </p>
        </section>

        {/* Content Sections */}
        <section
          style={{
            maxWidth: '760px',
            margin: '0 auto',
            padding: '0 40px',
          }}
        >
          {sections.map((section, idx) => (
            <div key={idx} style={{ marginTop: idx === 0 ? '56px' : '56px' }}>
              <h2
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 800,
                  fontSize: '22px',
                  color: '#1A1A22',
                  marginBottom: '16px',
                  borderLeft: '3px solid #6C47FF',
                  paddingLeft: '16px',
                }}
              >
                {section.heading}
              </h2>
              <p
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 400,
                  fontSize: '16px',
                  color: '#8B8AA0',
                  lineHeight: 1.85,
                }}
              >
                {section.body}
              </p>
            </div>
          ))}
        </section>

        {/* Recruiter Insight CTA Block */}
        <section
          style={{
            marginTop: '64px',
            padding: '0 40px',
            marginBottom: '80px',
          }}
        >
          <div
            style={{
              maxWidth: '760px',
              margin: '0 auto',
              background: '#1A1A22',
              border: '1px solid rgba(108,71,255,0.3)',
              borderRadius: '16px',
              padding: '36px',
            }}
          >
            {/* Label */}
            <div
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 700,
                fontSize: '11px',
                color: '#A78BFA',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              The Recruiter Insight
            </div>

            {/* Title */}
            <h3
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: '22px',
                color: '#1A1A22',
                marginTop: '12px',
              }}
            >
              {insideLook.name}
            </h3>

            {/* Description */}
            <p
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 400,
                fontSize: '15px',
                color: '#8B8AA0',
                marginTop: '8px',
              }}
            >
              {insideLook.description}
            </p>

            {/* Status Badge */}
            {insideLook.isFree ? (
              <div
                style={{
                  display: 'inline-block',
                  background: 'rgba(34, 197, 94, 0.1)',
                  color: '#22C55E',
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 700,
                  fontSize: '12px',
                  padding: '6px 12px',
                  borderRadius: '16px',
                  marginTop: '16px',
                }}
              >
                Free — No account needed
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 400,
                  fontSize: '14px',
                  color: '#8B8AA0',
                  marginTop: '16px',
                }}
              >
                <Lock size={16} />
                Pro — Included in membership
              </div>
            )}

            {/* Primary Button */}
            <Link
              href={insideLook.href}
              style={{
                display: 'inline-block',
                marginTop: '20px',
                padding: '12px 24px',
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: '14px',
                background: 'linear-gradient(135deg, #6C47FF 0%, #FF4F6A 100%)',
                color: '#1A1A22',
                textDecoration: 'none',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
              }}
            >
              Get the Recruiter Insight →
            </Link>

            {/* RepVera CTA */}
            <div
              style={{
                marginTop: '24px',
                paddingTop: '24px',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 400,
                fontSize: '13px',
                color: '#8B8AA0',
              }}
            >
              Want hiring teams to see the real you?{' '}
              <a
                href="https://www.repvera.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #6C47FF 0%, #FF4F6A 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textDecoration: 'none',
                }}
              >
                Start your RepVera — free →
              </a>
            </div>
          </div>
        </section>

        {/* Visible FAQ block — matches the JSON-LD schema so Google sees the
            same Q&A pairs in two places. Standard rich-snippet pattern. */}
        {faqs && faqs.length > 0 && (
          <section
            style={{
              maxWidth: '760px',
              margin: '0 auto',
              padding: '0 40px 64px',
            }}
          >
            <div
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 700,
                fontSize: '11px',
                color: '#A78BFA',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '20px',
              }}
            >
              People Also Ask
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {faqs.map((f, idx) => (
                <details
                  key={idx}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid rgba(167,139,250,0.18)',
                    borderRadius: '12px',
                    padding: '18px 22px',
                  }}
                >
                  <summary
                    style={{
                      fontFamily: "'Figtree', sans-serif",
                      fontWeight: 800,
                      fontSize: '16px',
                      color: '#1A1A22',
                      cursor: 'pointer',
                      listStyle: 'none',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {f.q}
                  </summary>
                  <p
                    style={{
                      fontFamily: "'Figtree', sans-serif",
                      fontWeight: 400,
                      fontSize: '15px',
                      color: '#9D9CB3',
                      lineHeight: 1.75,
                      marginTop: '12px',
                      marginBottom: 0,
                    }}
                  >
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Related Links */}
        {relatedLinks && relatedLinks.length > 0 && (
          <section
            style={{
              maxWidth: '760px',
              margin: '0 auto',
              padding: '0 40px 80px',
            }}
          >
            <div
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 700,
                fontSize: '11px',
                color: '#8B8AA0',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '16px',
              }}
            >
              Related Recruiter Insights
            </div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              {relatedLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 600,
                    fontSize: '13px',
                    color: '#8B8AA0',
                    border: '1px solid #ECECF2',
                    borderRadius: '20px',
                    padding: '8px 16px',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLElement
                    target.style.borderColor = 'rgba(108,71,255,0.4)'
                    target.style.color = '#A78BFA'
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLElement
                    target.style.borderColor = '#ECECF2'
                    target.style.color = '#8B8AA0'
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
