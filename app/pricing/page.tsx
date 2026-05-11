import type { Metadata } from 'next'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Check, X } from 'lucide-react'
import { StripeCheckoutButton } from '@/components/stripe-checkout-button'
import { CATALOG } from '@/lib/tools-catalog'

const FREE_CANDIDATE_TOOLS = CATALOG.filter(
  (t) => t.audience === 'candidate' && t.tier === 'free',
).map((t) => t.name)

export const metadata: Metadata = {
  title: 'Pricing — $20/year vs. $600+/year',
  description:
    'Free forever for every candidate-side tool. $20/year for the five flagship inside looks. Compare to Jobscan ($599.40/year), Resume Worded ($408/year), Cultivated Culture ($297 one-time + ongoing).',
  alternates: { canonical: 'https://hiring.productions/pricing' },
}

type Cell = boolean | string

interface Row {
  label: string
  group: 'free' | 'pro' | 'addon'
  hp: Cell
  teal: Cell
  jobscan: Cell
  resumeWorded: Cell
  cultivated: Cell
}

const ROWS: Row[] = [
  // FREE TOOLS — what hiring.productions includes free
  { label: 'Resume "is this AI?" check', group: 'free', hp: true, teal: false, jobscan: false, resumeWorded: false, cultivated: 'Add-on' },
  { label: 'Job description decoder ("what this role really is")', group: 'free', hp: true, teal: false, jobscan: false, resumeWorded: false, cultivated: false },
  { label: 'Salary negotiation script (using your data)', group: 'free', hp: true, teal: false, jobscan: false, resumeWorded: false, cultivated: 'Course only' },
  { label: 'Stuck-search diagnostic', group: 'free', hp: true, teal: false, jobscan: false, resumeWorded: false, cultivated: false },

  // PRO TOOLS — the 5 flagship inside looks
  { label: 'Recruiter\'s actual internal monologue on your resume', group: 'pro', hp: true, teal: 'Score only', jobscan: 'Score only', resumeWorded: 'Score only', cultivated: 'Coaching $$$' },
  { label: 'Boolean string a recruiter uses to find you', group: 'pro', hp: true, teal: false, jobscan: false, resumeWorded: false, cultivated: false },
  { label: 'Full LinkedIn rewrite (headline, About, every role)', group: 'pro', hp: true, teal: 'Builder only', jobscan: 'LinkedIn Score', resumeWorded: 'LinkedIn Review', cultivated: 'Course only' },
  { label: '10 interview questions calibrated to your role + scripts', group: 'pro', hp: true, teal: false, jobscan: false, resumeWorded: false, cultivated: 'Course only' },
  { label: 'Decoder for what each interview question is really asking', group: 'pro', hp: true, teal: false, jobscan: false, resumeWorded: false, cultivated: false },

  // ADDITIONAL THINGS THEY CHARGE FOR
  { label: 'Both sides — bilateral hiring tools', group: 'addon', hp: true, teal: false, jobscan: false, resumeWorded: false, cultivated: false },
  { label: 'Designed by recruiters who actually do the work', group: 'addon', hp: true, teal: 'Algorithmic', jobscan: 'Algorithmic', resumeWorded: 'Algorithmic', cultivated: true },
  { label: 'Real annual price (no weekly/monthly trap)', group: 'addon', hp: '$20/year', teal: '$676/yr ($13/wk)', jobscan: '$599.40/yr', resumeWorded: '$408/yr', cultivated: '$297 + courses' },
]

function CellContent({ value }: { value: Cell }) {
  if (value === true) {
    return <Check size={18} color="#22C55E" strokeWidth={3} />
  }
  if (value === false) {
    return <X size={18} color="#FF4F6A" strokeWidth={3} />
  }
  return (
    <span
      style={{
        fontFamily: "'Figtree', sans-serif",
        fontWeight: 600,
        fontSize: '12.5px',
        color: '#A78BFA',
      }}
    >
      {value}
    </span>
  )
}

export default function PricingPage() {
  return (
    <main style={{ background: '#0F0F12', color: '#F2F0FF', minHeight: '100vh' }}>
      <Navigation variant="dark" />

      {/* HERO */}
      <section
        style={{
          padding: '90px 24px 60px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 700px 500px at 50% 0%, rgba(108,71,255,0.18) 0%, transparent 60%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '780px', margin: '0 auto' }}>
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 700,
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#A78BFA',
              marginBottom: '24px',
            }}
          >
            PRICING
          </div>

          <h1
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(40px, 5.5vw, 64px)',
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
              color: '#F2F0FF',
              margin: '0 0 20px',
            }}
          >
            $20 a year. The whole production.
          </h1>

          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 400,
              fontSize: '18px',
              lineHeight: 1.6,
              color: '#8B8AA0',
              maxWidth: '620px',
              margin: '0 auto 12px',
            }}
          >
            Jobscan tells you if your resume passes the ATS. We tell you what the recruiter thinks
            when it does — and the four other reads that decide whether you get the call, ace the
            interview, and land the offer.
          </p>

          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 700,
              fontSize: '16px',
              background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: '8px 0 0',
            }}
          >
            $1.67 a month. Less than Jobscan charges for one day.
          </p>
        </div>
      </section>

      {/* PRICING TIERS */}
      <section style={{ padding: '0 24px 60px' }}>
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {/* FREE */}
          <div
            style={{
              background: '#14141B',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px',
              padding: '32px',
            }}
          >
            <div
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 700,
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#22C55E',
                marginBottom: '12px',
              }}
            >
              Free Forever
            </div>
            <div
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 900,
                fontSize: '40px',
                color: '#F2F0FF',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                marginBottom: '4px',
              }}
            >
              $0
            </div>
            <div
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: '13px',
                color: '#8B8AA0',
                marginBottom: '24px',
              }}
            >
              No account. No card. Use them all.
            </div>

            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {FREE_CANDIDATE_TOOLS.map((t) => (
                <li
                  key={t}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 500,
                    fontSize: '14px',
                    color: '#F2F0FF',
                  }}
                >
                  <Check size={16} color="#22C55E" strokeWidth={3} />
                  {t}
                </li>
              ))}
            </ul>

            <Link
              href="/tools"
              style={{
                display: 'block',
                marginTop: '28px',
                padding: '14px',
                background: 'transparent',
                border: '1.5px solid rgba(167,139,250,0.4)',
                borderRadius: '10px',
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 700,
                fontSize: '14px',
                color: '#A78BFA',
                textAlign: 'center',
                textDecoration: 'none',
              }}
            >
              Browse free tools →
            </Link>
          </div>

          {/* PRO — featured */}
          <div
            style={{
              background: '#14141B',
              border: '2px solid rgba(108,71,255,0.5)',
              borderRadius: '20px',
              padding: '32px',
              boxShadow: '0 30px 100px rgba(108,71,255,0.20)',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                color: 'white',
                padding: '5px 14px',
                borderRadius: '100px',
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: '10.5px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              The Whole Production
            </div>

            <div
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 700,
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#A78BFA',
                marginBottom: '12px',
                marginTop: '8px',
              }}
            >
              Pro · 5 Inside Looks
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
              <div
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 900,
                  fontSize: '40px',
                  color: '#F2F0FF',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}
              >
                $20
              </div>
              <div
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 600,
                  fontSize: '15px',
                  color: '#8B8AA0',
                }}
              >
                / year
              </div>
            </div>
            <div
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: '13px',
                color: '#8B8AA0',
                marginBottom: '24px',
              }}
            >
              $1.67/month, billed annually. Cancel anytime.
            </div>

            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {[
                'Through a Recruiter\'s Eyes',
                'Find You on LinkedIn (boolean)',
                'Your LinkedIn — Rewritten',
                'The Rehearsal Room',
                'What They\'re Really Asking',
                'Plus every free tool, unlimited',
              ].map((t) => (
                <li
                  key={t}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 500,
                    fontSize: '14px',
                    color: '#F2F0FF',
                  }}
                >
                  <Check size={16} color="#A78BFA" strokeWidth={3} />
                  {t}
                </li>
              ))}
            </ul>

            <StripeCheckoutButton
              style={{
                display: 'block',
                width: '100%',
                marginTop: '28px',
                padding: '15px',
                background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                border: 'none',
                borderRadius: '10px',
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: '15px',
                color: 'white',
                cursor: 'pointer',
                textAlign: 'center',
                boxShadow: '0 12px 30px rgba(108,71,255,0.30)',
              }}
            >
              Get Full Access — $20/year
            </StripeCheckoutButton>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section style={{ padding: '60px 24px 100px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 700,
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#FF4F6A',
                marginBottom: '14px',
              }}
            >
              VS. THE COMPETITION
            </div>
            <h2
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(28px, 3.5vw, 42px)',
                letterSpacing: '-0.02em',
                color: '#F2F0FF',
                margin: '0 0 14px',
                lineHeight: 1.15,
              }}
            >
              What you actually get for the money.
            </h2>
            <p
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: '15px',
                color: '#8B8AA0',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: 1.6,
              }}
            >
              Most career tools charge monthly for one mechanical thing. We charge $20 a year for
              the whole arc — resume to offer.
            </p>
          </div>

          {/* Table */}
          <div
            style={{
              background: '#14141B',
              border: '1px solid rgba(108,71,255,0.20)',
              borderRadius: '16px',
              overflow: 'hidden',
              overflowX: 'auto',
            }}
          >
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontFamily: "'Figtree', sans-serif",
                minWidth: '700px',
              }}
            >
              <thead>
                <tr style={{ background: 'rgba(108,71,255,0.08)' }}>
                  <th
                    style={{
                      textAlign: 'left',
                      padding: '18px 20px',
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: '#8B8AA0',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                      width: '40%',
                    }}
                  >
                    What you get
                  </th>
                  <th
                    style={{
                      padding: '18px 12px',
                      textAlign: 'center',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                      background: 'rgba(108,71,255,0.10)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: 800,
                        color: '#F2F0FF',
                        marginBottom: '2px',
                      }}
                    >
                      hiring.productions
                    </div>
                    <div style={{ fontSize: '11px', color: '#A78BFA', fontWeight: 600 }}>
                      $20 / year
                    </div>
                  </th>
                  <th
                    style={{
                      padding: '18px 12px',
                      textAlign: 'center',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#C9C7DA', marginBottom: '2px' }}>
                      Teal+
                    </div>
                    <div style={{ fontSize: '11px', color: '#6B6A82', fontWeight: 500 }}>
                      $13/wk = $676/yr
                    </div>
                  </th>
                  <th
                    style={{
                      padding: '18px 12px',
                      textAlign: 'center',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#C9C7DA', marginBottom: '2px' }}>
                      Jobscan
                    </div>
                    <div style={{ fontSize: '11px', color: '#6B6A82', fontWeight: 500 }}>
                      $49.95/mo
                    </div>
                  </th>
                  <th
                    style={{
                      padding: '18px 12px',
                      textAlign: 'center',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#C9C7DA', marginBottom: '2px' }}>
                      Resume Worded
                    </div>
                    <div style={{ fontSize: '11px', color: '#6B6A82', fontWeight: 500 }}>
                      $34/mo
                    </div>
                  </th>
                  <th
                    style={{
                      padding: '18px 12px',
                      textAlign: 'center',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#C9C7DA', marginBottom: '2px' }}>
                      Cultivated Culture
                    </div>
                    <div style={{ fontSize: '11px', color: '#6B6A82', fontWeight: 500 }}>
                      $297+
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, idx) => {
                  const showGroupLabel =
                    idx === 0 || ROWS[idx - 1].group !== row.group
                  const groupLabel =
                    row.group === 'free'
                      ? 'Free tools'
                      : row.group === 'pro'
                      ? 'The five inside looks'
                      : 'The fundamentals'
                  return (
                    <>
                      {showGroupLabel && (
                        <tr key={`group-${idx}`}>
                          <td
                            colSpan={6}
                            style={{
                              padding: '18px 20px 8px',
                              fontFamily: "'Figtree', sans-serif",
                              fontSize: '11px',
                              fontWeight: 800,
                              letterSpacing: '0.12em',
                              textTransform: 'uppercase',
                              color: row.group === 'pro' ? '#A78BFA' : row.group === 'free' ? '#22C55E' : '#FF4F6A',
                              background: 'transparent',
                            }}
                          >
                            {groupLabel}
                          </td>
                        </tr>
                      )}
                      <tr key={idx} style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                        <td
                          style={{
                            padding: '14px 20px',
                            fontSize: '14px',
                            fontWeight: 500,
                            color: '#F2F0FF',
                            lineHeight: 1.45,
                          }}
                        >
                          {row.label}
                        </td>
                        <td
                          style={{
                            padding: '14px 12px',
                            textAlign: 'center',
                            background: 'rgba(108,71,255,0.05)',
                          }}
                        >
                          <CellContent value={row.hp} />
                        </td>
                        <td style={{ padding: '14px 12px', textAlign: 'center' }}>
                          <CellContent value={row.teal} />
                        </td>
                        <td style={{ padding: '14px 12px', textAlign: 'center' }}>
                          <CellContent value={row.jobscan} />
                        </td>
                        <td style={{ padding: '14px 12px', textAlign: 'center' }}>
                          <CellContent value={row.resumeWorded} />
                        </td>
                        <td style={{ padding: '14px 12px', textAlign: 'center' }}>
                          <CellContent value={row.cultivated} />
                        </td>
                      </tr>
                    </>
                  )
                })}
              </tbody>
            </table>
          </div>

          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '12px',
              color: '#6B6A82',
              textAlign: 'center',
              marginTop: '20px',
              lineHeight: 1.6,
            }}
          >
            Competitor pricing as of {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}, monthly tiers. Annual equivalents shown for comparison.
          </p>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section style={{ padding: '60px 24px 100px', background: '#0F0F12' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <h2
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(28px, 4vw, 44px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              color: '#F2F0FF',
              margin: '0 0 16px',
            }}
          >
            Spend $20 once. Stop guessing for a year.
          </h2>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '16px',
              color: '#8B8AA0',
              lineHeight: 1.6,
              margin: '0 0 32px',
            }}
          >
            The cheapest career tool that gives you the recruiter&apos;s actual read, the boolean
            that finds you, the LinkedIn that lands, the interview prep that wins, and the question
            decoder that closes.
          </p>

          <StripeCheckoutButton
            style={{
              display: 'inline-block',
              padding: '16px 36px',
              background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
              border: 'none',
              borderRadius: '12px',
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: '16px',
              color: 'white',
              cursor: 'pointer',
              boxShadow: '0 12px 30px rgba(108,71,255,0.30)',
            }}
          >
            Get Full Access — $20/year
          </StripeCheckoutButton>

          <div style={{ marginTop: '14px' }}>
            <Link
              href="/tools"
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: '13px',
                fontWeight: 600,
                color: '#A78BFA',
                textDecoration: 'none',
              }}
            >
              Or try the free tools first →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
