import type { Metadata } from 'next'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Terms',
  description:
    'The short version of how hiring.productions works while the formal terms are in review.',
  alternates: { canonical: 'https://hiring.productions/terms' },
  robots: { index: false, follow: true },
}

export default function TermsPage() {
  return (
    <main style={{ background: '#FAF8F3', color: '#1A1A22', minHeight: '100vh' }}>
      <Navigation variant="dark" />

      <section
        style={{
          maxWidth: '720px',
          margin: '0 auto',
          padding: '80px 24px 100px',
        }}
      >
        <div
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#A78BFA',
            marginBottom: '16px',
          }}
        >
          ◆ TERMS
        </div>
        <h1
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 900,
            letterSpacing: '-0.025em',
            lineHeight: 1.05,
            color: '#1A1A22',
            margin: '0 0 24px',
          }}
        >
          What you can expect, what we ask in return.
        </h1>
        <p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: '17px',
            color: '#9D9CB3',
            lineHeight: 1.7,
            marginBottom: '28px',
          }}
        >
          Formal, lawyer-reviewed terms will live on this page before
          hiring.productions runs paid advertising. Until then, this is the
          plain-language agreement between you and us.
        </p>

        <Section title="What we promise">
          <p>
            The free tools stay free. The Pro tools cost $14.99/month or $99/year — billed
            once, cancel anytime through the Stripe portal, and the access
            stops at the end of your current term. We will not raise the price
            on existing members without 60 days&apos; notice.
          </p>
          <p>
            The AI-generated output is advice, not a guarantee. We&apos;re
            putting recruiter expertise into the system prompts so the output
            is as good as it gets, but we can&apos;t promise it will get you a
            job. No one can.
          </p>
        </Section>

        <Section title="What we ask">
          <p>
            Don&apos;t scrape or resell the outputs. Don&apos;t use the tools
            to generate content that misrepresents who you are or what
            you&apos;ve done — the tools are sharpest when they&apos;re working
            on real material. Don&apos;t try to break the gates programmatically
            — if a tool says Pro, it&apos;s Pro.
          </p>
          <p>
            Be honest in the inputs. The career-change tool, the gap explainer,
            the visibility simulator — all of them produce sharper output when
            you put your real situation in. Fabricated inputs give you AI-flavored
            outputs that won&apos;t survive a real interview.
          </p>
        </Section>

        <Section title="Refunds">
          <p>
            Email{' '}
            <a
              href="https://www.linkedin.com/in/stephaniemurray11/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#A78BFA' }}
            >
              Stephanie on LinkedIn
            </a>{' '}
            within 14 days of purchase and you&apos;ll get a refund, no
            questions asked. After 14 days, we&apos;ll work with you in good
            faith — most refund requests are because something didn&apos;t
            work, which we want to fix.
          </p>
        </Section>

        <Section title="The fine print, briefly">
          <p>
            We can update these terms — when we do, the &quot;Last updated&quot;
            date below changes and material changes get an email to members.
            The site is provided as-is; we&apos;re a small team and can&apos;t
            promise zero downtime. Any disputes get handled in good faith
            first, then under the laws of Washington State (US).
          </p>
        </Section>

        <p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: '13px',
            color: '#6B6A82',
            marginTop: '48px',
          }}
        >
          Last updated 2026-05-12. Questions?{' '}
          <a
            href="https://www.linkedin.com/in/stephaniemurray11/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#A78BFA' }}
          >
            Reach out via LinkedIn
          </a>
          .
        </p>

        <div style={{ marginTop: '40px' }}>
          <Link
            href="/"
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '14px',
              fontWeight: 700,
              color: '#A78BFA',
              textDecoration: 'none',
            }}
          >
            ← Back to hiring.productions
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h2
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontSize: '20px',
          fontWeight: 800,
          letterSpacing: '-0.015em',
          color: '#1A1A22',
          margin: '0 0 12px',
        }}
      >
        {title}
      </h2>
      <div
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontSize: '15px',
          color: '#C9C7DA',
          lineHeight: 1.7,
        }}
      >
        {children}
      </div>
    </div>
  )
}
