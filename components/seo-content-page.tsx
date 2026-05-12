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

interface SeoContentPageProps {
  badge: string
  badgeColor: 'indigo' | 'coral'
  headline: string
  intro: string
  sections: Section[]
  insideLook: InsideLook
  relatedLinks?: RelatedLink[]
}

export function SeoContentPage({
  badge,
  badgeColor,
  headline,
  intro,
  sections,
  insideLook,
  relatedLinks,
}: SeoContentPageProps) {
  const badgeBgColor = badgeColor === 'indigo' ? '#6C47FF' : '#FF4F6A'

  return (
    <div style={{ background: '#0F0F12', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navigation />

      <main style={{ flex: 1 }}>
        {/* Hero Section */}
        <section
          style={{
            background: '#0F0F12',
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
              color: '#F2F0FF',
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
              color: '#F2F0FF',
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
                  color: '#F2F0FF',
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
                color: '#F2F0FF',
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
                color: '#F2F0FF',
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
                    border: '1px solid rgba(255,255,255,0.08)',
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
                    target.style.borderColor = 'rgba(255,255,255,0.08)'
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
