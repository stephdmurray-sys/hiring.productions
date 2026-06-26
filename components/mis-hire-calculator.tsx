'use client'

import { useState } from 'react'

/**
 * True Cost of a Mis-Hire calculator.
 *
 * RepVera-branded free top-of-funnel insight for talent leaders.
 * Math is SHRM/DOL only; no fabricated stats. Result shows as a
 * range (not a single fake-precise number). Closes with a soft
 * RepVera CTA, never overclaiming.
 *
 * Spec source: /Users/stephaniemurray/Desktop/RepVera-MisHire-
 * Calculator-SPEC.md. Visual reference: the working standalone
 * HTML in the same folder.
 *
 * Voice rules (RepVera, not hiring.productions):
 *   - No em or en dashes anywhere a visitor can read.
 *   - Banned words: feedback, signal, testimonial, endorsement,
 *     insights, AI summary. Calling this a "free tool" is fine;
 *     RepVera itself is never "a tool."
 *   - RepVera vocabulary if referenced: Receipts, Verified Profile,
 *     Verified Record, Contributors.
 *   - Closing line is verbatim from the spec.
 *
 * Logo: the prototype uses a CSS-text wordmark. Production should
 * swap in the real RepVera logo (RepVera_main_logo_png.png). Until
 * the file lands in /public/images, the wordmark is the placeholder.
 */

type RoleLevel = 'entry' | 'mid' | 'exec'

const ranges: Record<
  RoleLevel,
  { lo: number; hi: number; label: string }
> = {
  entry: {
    lo: 0.5,
    hi: 0.75,
    label:
      'SHRM puts an entry or hourly mis-hire at 50 to 75 percent of salary.',
  },
  mid: {
    lo: 1.0,
    hi: 1.5,
    label: 'SHRM puts a mid-level mis-hire at 100 to 150 percent of salary.',
  },
  exec: {
    lo: 2.0,
    hi: 2.13,
    label:
      'SHRM puts an executive mis-hire at 200 to 213 percent of salary.',
  },
}

function money(n: number): string {
  const rounded = Math.round(n / 1000) * 1000
  return '$' + rounded.toLocaleString('en-US')
}

export default function MisHireCalculator() {
  const [role, setRole] = useState<RoleLevel>('mid')
  const [salary, setSalary] = useState<number>(120000)
  const [hires, setHires] = useState<number>(4)
  const [rate, setRate] = useState<number>(20)

  const r = ranges[role]
  const lo = salary * r.lo
  const hi = salary * r.hi
  const mid = (salary * (r.lo + r.hi)) / 2
  const annual = hires * (rate / 100) * mid

  return (
    <div
      style={{
        fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        color: '#1A1A1A',
        background: '#FAFAFB',
        padding: '24px',
        lineHeight: 1.5,
      }}
    >
      {/* Font loader: RepVera marketing system uses DM Sans for UI
          and Lora italic for the editorial closing line. */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Lora:ital,wght@1,400;1,500&display=swap');
        .mhc-cta:hover { background: #4A47D9 !important; }
        .mhc-input:focus, .mhc-select:focus { outline: none; border-color: #5955F2 !important; }
        @media (max-width: 560px) {
          .mhc-card { padding: 26px 20px !important; }
          .mhc-row { grid-template-columns: 1fr !important; }
          .mhc-h1 { font-size: 24px !important; }
        }
      `}</style>

      <div
        className="mhc-card"
        style={{
          maxWidth: 540,
          margin: '0 auto',
          background: '#FFFFFF',
          border: '1px solid #E8E5FD',
          borderRadius: 20,
          padding: '34px 32px',
          boxShadow: '0 18px 50px -28px rgba(89,85,242,0.35)',
        }}
      >
        {/* Brand row. CSS-text wordmark is the prototype placeholder.
            Swap in the real RepVera logo image in production. */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 22,
          }}
        >
          <span style={{ fontSize: 19, letterSpacing: '-0.01em' }}>
            <span style={{ fontWeight: 400, color: '#5955F2' }}>Rep</span>
            <span style={{ fontWeight: 700, color: '#5955F2' }}>Vera</span>
          </span>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#888888',
            }}
          >
            Free Tool
          </span>
        </div>

        <h1
          className="mhc-h1"
          style={{
            fontSize: 27,
            fontWeight: 600,
            letterSpacing: '-0.02em',
            lineHeight: 1.12,
            marginBottom: 8,
          }}
        >
          The true cost of a mis-hire
        </h1>
        <p
          style={{
            fontSize: 15,
            color: '#4A4A4A',
            marginBottom: 26,
            lineHeight: 1.55,
          }}
        >
          Most hires you regret could do the job. They fail on how they work
          with people, the part the interview never sees. Here is what that
          costs, using SHRM and Department of Labor benchmarks.
        </p>

        {/* Role level */}
        <div style={{ marginBottom: 18 }}>
          <label
            htmlFor="mhc-role"
            style={{
              display: 'block',
              fontSize: 13,
              fontWeight: 600,
              color: '#4A4A4A',
              marginBottom: 7,
            }}
          >
            Role level
          </label>
          <select
            id="mhc-role"
            className="mhc-select"
            value={role}
            onChange={(e) => setRole(e.target.value as RoleLevel)}
            style={{
              width: '100%',
              padding: '12px 13px',
              fontFamily: 'inherit',
              fontSize: 15,
              color: '#1A1A1A',
              border: '1px solid #DDD',
              borderRadius: 9,
              background: '#FFFFFF',
              transition: 'border-color 0.15s',
            }}
          >
            <option value="entry">Entry or hourly</option>
            <option value="mid">Mid-level, technical, or manager</option>
            <option value="exec">Executive or leadership</option>
          </select>
        </div>

        {/* Salary + hires row */}
        <div
          className="mhc-row"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 14,
          }}
        >
          <div style={{ marginBottom: 18 }}>
            <label
              htmlFor="mhc-salary"
              style={{
                display: 'block',
                fontSize: 13,
                fontWeight: 600,
                color: '#4A4A4A',
                marginBottom: 7,
              }}
            >
              Annual salary ($)
            </label>
            <input
              id="mhc-salary"
              type="number"
              className="mhc-input"
              value={salary}
              min={0}
              step={1000}
              onChange={(e) => setSalary(parseFloat(e.target.value) || 0)}
              style={{
                width: '100%',
                padding: '12px 13px',
                fontFamily: 'inherit',
                fontSize: 15,
                color: '#1A1A1A',
                border: '1px solid #DDD',
                borderRadius: 9,
                background: '#FFFFFF',
                transition: 'border-color 0.15s',
              }}
            />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label
              htmlFor="mhc-hires"
              style={{
                display: 'block',
                fontSize: 13,
                fontWeight: 600,
                color: '#4A4A4A',
                marginBottom: 7,
              }}
            >
              Hires like this per year
            </label>
            <input
              id="mhc-hires"
              type="number"
              className="mhc-input"
              value={hires}
              min={1}
              step={1}
              onChange={(e) => setHires(parseFloat(e.target.value) || 0)}
              style={{
                width: '100%',
                padding: '12px 13px',
                fontFamily: 'inherit',
                fontSize: 15,
                color: '#1A1A1A',
                border: '1px solid #DDD',
                borderRadius: 9,
                background: '#FFFFFF',
                transition: 'border-color 0.15s',
              }}
            />
          </div>
        </div>

        {/* Mis-hire rate slider */}
        <div style={{ marginBottom: 18 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: 7,
            }}
          >
            <label
              htmlFor="mhc-rate"
              style={{ fontSize: 13, fontWeight: 600, color: '#4A4A4A' }}
            >
              Assumed mis-hire rate
            </label>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#5955F2' }}>
              {rate}%
            </span>
          </div>
          <input
            id="mhc-rate"
            type="range"
            min={10}
            max={50}
            step={5}
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value))}
            style={{
              width: '100%',
              accentColor: '#5955F2',
            }}
          />
          <div
            style={{
              fontSize: 12,
              color: '#888888',
              marginTop: 6,
              lineHeight: 1.45,
            }}
          >
            You set this. For context, studies find 46 to 89 percent of new
            hires do not last 18 months, and almost none fail on technical
            ability.
          </div>
        </div>

        {/* Result panel */}
        <div
          style={{
            marginTop: 24,
            padding: 22,
            borderRadius: 14,
            background: '#F5F4FF',
            border: '1px solid #E8E5FD',
          }}
        >
          <div style={{ marginBottom: 18 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#4A4A4A',
                marginBottom: 5,
              }}
            >
              Cost of a single mis-hire at this level
            </div>
            <div
              style={{
                fontSize: 34,
                fontWeight: 600,
                letterSpacing: '-0.03em',
                color: '#5955F2',
                lineHeight: 1.05,
              }}
            >
              {money(lo)} to {money(hi)}
            </div>
            <div
              style={{
                fontSize: 13,
                color: '#888888',
                marginTop: 5,
                lineHeight: 1.45,
              }}
            >
              {r.label}
            </div>
          </div>
          <div
            style={{ height: 1, background: '#E8E5FD', margin: '18px 0' }}
          />
          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#4A4A4A',
                marginBottom: 5,
              }}
            >
              Your estimated exposure per year
            </div>
            <div
              style={{
                fontSize: 34,
                fontWeight: 600,
                letterSpacing: '-0.03em',
                color: '#5955F2',
                lineHeight: 1.05,
              }}
            >
              {money(annual)}
            </div>
            <div
              style={{
                fontSize: 13,
                color: '#888888',
                marginTop: 5,
                lineHeight: 1.45,
              }}
            >
              Assuming {hires} {hires === 1 ? 'hire' : 'hires'} like this a
              year and a {rate}% mis-hire rate.
            </div>
          </div>
        </div>

        {/* Closing editorial line + soft CTA. Closing line is verbatim
            from the spec and locks in the competence-vs-character idea
            without overclaiming. */}
        <p
          style={{
            fontFamily: "'Lora', serif",
            fontStyle: 'italic',
            fontSize: 17,
            lineHeight: 1.5,
            color: '#1A1A1A',
            margin: '26px 0 8px',
          }}
        >
          You can verify what someone can do. The harder question is how they
          actually show up, and that is where mis-hires are made.
        </p>
        <a
          href="https://repvera.com"
          target="_blank"
          rel="noopener"
          className="mhc-cta"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            marginTop: 8,
            background: '#5955F2',
            color: '#FFFFFF',
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: 15,
            padding: '11px 22px',
            borderRadius: 8,
            transition: 'background 0.15s',
          }}
        >
          See how RepVera helps &rarr;
        </a>

        {/* Methodology disclosure. Cited so a CHRO can verify. */}
        <details
          style={{
            marginTop: 24,
            paddingTop: 18,
            borderTop: '1px solid #F0F0F0',
          }}
        >
          <summary
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: '#888888',
              cursor: 'pointer',
            }}
          >
            How this is calculated
          </summary>
          <p
            style={{
              fontSize: 12.5,
              color: '#888888',
              lineHeight: 1.6,
              marginTop: 12,
            }}
          >
            Cost of a single mis-hire is the role salary multiplied by
            SHRM&rsquo;s cost-of-bad-hire range: 50 to 75 percent for entry
            and hourly roles, 100 to 150 percent for mid-level, technical,
            and manager roles, and 200 to 213 percent for executives. The
            U.S. Department of Labor&rsquo;s more conservative floor is
            about 30 percent of first-year earnings. Annual exposure
            multiplies the midpoint of that range by the number of hires
            you make at this level and the mis-hire rate you set. Sources:
            SHRM Talent Acquisition Benchmarking, U.S. Department of Labor,
            and Leadership IQ on new-hire failure. These are estimates to
            size the problem, not a quote.
          </p>
        </details>
      </div>
    </div>
  )
}
