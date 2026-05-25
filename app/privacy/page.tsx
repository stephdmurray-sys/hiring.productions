import type { Metadata } from 'next'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Privacy',
  description:
    'How hiring.productions handles your data — the short version while our formal policy is in review.',
  alternates: { canonical: 'https://hiring.productions/privacy' },
  robots: { index: false, follow: true },
}

export default function PrivacyPage() {
  return (
    <main style={{ background: '#FAF8F3', color: '#1A1A22', minHeight: '100vh' }}>
      <Navigation variant="light" />

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
          ◆ PRIVACY
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
          The short version, while the formal policy is in review.
        </h1>
        <p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: '17px',
            color: '#5A5A6E',
            lineHeight: 1.7,
            marginBottom: '28px',
          }}
        >
          A formal, lawyer-reviewed privacy policy will live on this page before
          hiring.productions runs paid advertising. Until then, here is plainly
          how your data is handled today — written in the same voice as the rest
          of the site.
        </p>

        <Section title="What we collect">
          <p>
            When you use the free tools, we collect only the inputs you paste —
            your resume, the job description, the questions you ask. Each
            request goes to our AI provider to generate the response, then we
            forget it. Inputs aren&apos;t logged to our database for later use
            unless you become a member and explicitly save them.
          </p>
          <p>
            When you become a member, Stripe handles the payment — we never see
            or store your card number. Stripe gives us your email, first name,
            last name, and the role you selected at checkout. That&apos;s the
            account.
          </p>
        </Section>

        <Section title="What we use it for">
          <p>
            Your name and email exist so we can verify your membership when you
            sign in from another device, send you renewal receipts via Stripe,
            and (someday, with explicit opt-in) tell you about new tools. We do
            not sell or rent your data. We do not share it with advertisers. We
            do not track you across the internet.
          </p>
        </Section>

        <Section title="Cookies / tracking">
          <p>
            The site uses Vercel Analytics for first-party pageview counts — no
            cookies, no cross-site tracking. Vercel Speed Insights captures
            anonymous performance metrics (page load time, layout shift) so we
            can make the site fast. That&apos;s it. There&apos;s no Google
            Analytics, no Meta pixel, no LinkedIn tag.
          </p>
        </Section>

        <Section title="Your rights">
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
            and ask: to see what we have on you, to delete it, to export it, or
            to correct it. We will, within seven days.
          </p>
        </Section>

        <Section title="When this changes">
          <p>
            Before any paid advertising launches and before we add tracking that
            does require disclosure, this page will be replaced with the formal
            policy. We&apos;ll update the &quot;Last updated&quot; date below
            and link to a diff. We will not quietly broaden what we collect.
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
          color: '#5A5A6E',
          lineHeight: 1.7,
        }}
      >
        {children}
      </div>
    </div>
  )
}
