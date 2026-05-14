'use client'

import { useEffect, useState } from 'react'

/**
 * /admin — minimal live dashboard for the operational state of
 * hiring.productions. Reads from /api/admin/stats with the same
 * token, renders a CTO-shaped at-a-glance view.
 *
 * Design intent:
 *   - One screen, no tabs, no filters beyond the time-window selector
 *   - Reads ?token=... from the URL so it works as a one-tap bookmark
 *   - Token is also stored in localStorage so reloads keep it
 *   - Plain dark theme matching the rest of the site
 *
 * NOT linked from anywhere in the public site — only reachable by
 * typing /admin into the URL. Server-side endpoint refuses requests
 * without the matching ADMIN_TOKEN, so even if someone finds this
 * page they can't read data without the token.
 */
export default function AdminPage() {
  const [token, setToken] = useState('')
  const [days, setDays] = useState(7)
  const [data, setData] = useState<Stats | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Boot: read token from URL or localStorage, kick off a fetch if we have one.
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Belt-and-suspenders on top of robots.txt — inject a robots meta
    // so even if the disallow rule is ignored, no search engine indexes
    // the page. The /api/admin/stats endpoint also refuses unauthed
    // requests, so this is purely defense-in-depth.
    if (!document.querySelector('meta[name="robots"]')) {
      const meta = document.createElement('meta')
      meta.name = 'robots'
      meta.content = 'noindex, nofollow'
      document.head.appendChild(meta)
    }

    const params = new URLSearchParams(window.location.search)
    const urlTok = params.get('token') ?? ''
    const stored = window.localStorage.getItem('hp_admin_token') ?? ''
    const initial = urlTok || stored
    if (initial) {
      window.localStorage.setItem('hp_admin_token', initial)
      setToken(initial)
    }
  }, [])

  useEffect(() => {
    if (!token) return
    void fetchStats(token, days)
  }, [token, days])

  const fetchStats = async (tok: string, d: number) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/admin/stats?token=${encodeURIComponent(tok)}&days=${d}`)
      if (!res.ok) {
        setError(res.status === 401 ? 'Bad token.' : `Stats endpoint returned ${res.status}.`)
        setData(null)
        return
      }
      const json = (await res.json()) as Stats
      setData(json)
    } catch {
      setError('Network error — try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main
      style={{
        background: '#0F0F12',
        color: '#F2F0FF',
        minHeight: '100vh',
        padding: '40px 28px 80px',
        fontFamily: "'Figtree', sans-serif",
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <header style={{ marginBottom: 36 }}>
          <div
            style={{
              fontWeight: 800,
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#A78BFA',
              marginBottom: 6,
            }}
          >
            hiring.productions · ops dashboard
          </div>
          <h1
            style={{
              fontWeight: 900,
              fontSize: 'clamp(28px, 4vw, 38px)',
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            Funnel state, last {days} {days === 1 ? 'day' : 'days'}
          </h1>
        </header>

        {!token && (
          <TokenPrompt
            onSubmit={(t) => {
              if (typeof window !== 'undefined') {
                window.localStorage.setItem('hp_admin_token', t)
              }
              setToken(t)
            }}
          />
        )}

        {token && (
          <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
            {[1, 7, 14, 30].map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                style={{
                  padding: '8px 14px',
                  borderRadius: 100,
                  border:
                    d === days
                      ? '1.5px solid rgba(167,139,250,0.55)'
                      : '1px solid rgba(255,255,255,0.10)',
                  background: d === days ? 'rgba(108,71,255,0.18)' : 'rgba(255,255,255,0.03)',
                  color: d === days ? '#F2F0FF' : '#9D9CB3',
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                {d}d
              </button>
            ))}
            <button
              onClick={() => fetchStats(token, days)}
              disabled={loading}
              style={{
                padding: '8px 14px',
                borderRadius: 100,
                border: '1px solid rgba(255,255,255,0.10)',
                background: 'rgba(255,255,255,0.03)',
                color: '#9D9CB3',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              {loading ? 'Refreshing…' : 'Refresh'}
            </button>
          </div>
        )}

        {error && (
          <div
            style={{
              padding: '12px 14px',
              background: 'rgba(255,79,106,0.08)',
              border: '1px solid rgba(255,79,106,0.25)',
              borderRadius: 8,
              color: '#FF8FA3',
              fontSize: 14,
              marginBottom: 24,
            }}
          >
            {error}
          </div>
        )}

        {data && <StatsView data={data} />}
      </div>
    </main>
  )
}

function TokenPrompt({ onSubmit }: { onSubmit: (t: string) => void }) {
  const [value, setValue] = useState('')
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (value.trim()) onSubmit(value.trim())
      }}
      style={{
        background: '#14141B',
        border: '1px solid rgba(108,71,255,0.30)',
        borderRadius: 14,
        padding: 24,
        maxWidth: 440,
      }}
    >
      <label
        style={{
          display: 'block',
          fontWeight: 800,
          fontSize: 13,
          marginBottom: 10,
          color: '#F2F0FF',
        }}
      >
        Admin token
      </label>
      <input
        type="password"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Paste the ADMIN_TOKEN from Vercel env"
        style={{
          width: '100%',
          padding: '12px 14px',
          background: '#0F0F12',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 8,
          color: '#F2F0FF',
          fontSize: 14,
          fontFamily: 'inherit',
          marginBottom: 14,
          boxSizing: 'border-box',
        }}
      />
      <button
        type="submit"
        style={{
          padding: '11px 22px',
          background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
          color: 'white',
          border: 'none',
          borderRadius: 8,
          fontWeight: 800,
          fontSize: 14,
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        Unlock dashboard →
      </button>
      <div style={{ fontSize: 12, color: '#8B8AA0', marginTop: 12, lineHeight: 1.5 }}>
        The token also works as a URL param:{' '}
        <code style={{ color: '#A78BFA' }}>/admin?token=...</code>
      </div>
    </form>
  )
}

interface Stats {
  periodDays: number
  generatedAt: string
  eventCount: number
  visitors: {
    uniqueInWindow: number
    today: number
    yesterday: number
    pageViews: number
    pagesPerVisitor: number | null
  }
  uniquesByDay: Record<string, number>
  topPages: [string, number][]
  byType: Record<string, number>
  byDay: Record<string, Record<string, number>>
  byTool: Record<string, number>
  byBlockReason: Record<string, number>
  funnel: {
    toolAttempts: number
    toolSuccesses: number
    toolBlocked: number
    emailCaptures: number
    checkoutStarts: number
    paymentSuccesses: number
    conversionRates: {
      attemptToSuccess: number | null
      toolToEmail: number | null
      toolToCheckout: number | null
      checkoutToPayment: number | null
      toolToPayment: number | null
    }
  }
  costCents: number
  costDollars: string
  recentEvents: Array<{
    type: string
    ts: string
    toolId?: string
    tier?: string
    reason?: string
    source?: string
    costCents?: number
  }>
}

function StatsView({ data }: { data: Stats }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Visitors — the headline metric */}
      <Section title="Visitors">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
          <FunnelCard label="Today" value={data.visitors.today} accent="#5EE6A8" />
          <FunnelCard label="Yesterday" value={data.visitors.yesterday} />
          <FunnelCard label={`Last ${data.periodDays}d unique`} value={data.visitors.uniqueInWindow} />
          <FunnelCard label="Total page views" value={data.visitors.pageViews} />
          <FunnelCard
            label="Pages / visitor"
            value={data.visitors.pagesPerVisitor ?? 0}
            accent="#A78BFA"
          />
        </div>
      </Section>

      {/* Top pages */}
      <Section title="Most-visited pages">
        <SimpleTable
          rows={data.topPages.map(([path, count]) => [path, count.toString()])}
          headers={['Path', 'Views']}
        />
      </Section>

      {/* Funnel */}
      <Section title="Funnel">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
          <FunnelCard label="Tool attempts" value={data.funnel.toolAttempts} />
          <FunnelCard label="Tool successes" value={data.funnel.toolSuccesses} />
          <FunnelCard label="Email captures" value={data.funnel.emailCaptures} />
          <FunnelCard label="Checkout starts" value={data.funnel.checkoutStarts} />
          <FunnelCard label="Payments" value={data.funnel.paymentSuccesses} accent="#5EE6A8" />
        </div>
        <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          <RateCard label="Attempt → Success" pct={data.funnel.conversionRates.attemptToSuccess} />
          <RateCard label="Tool → Email" pct={data.funnel.conversionRates.toolToEmail} />
          <RateCard label="Tool → Checkout" pct={data.funnel.conversionRates.toolToCheckout} />
          <RateCard label="Checkout → Payment" pct={data.funnel.conversionRates.checkoutToPayment} />
          <RateCard label="Tool → Payment" pct={data.funnel.conversionRates.toolToPayment} accent="#5EE6A8" />
        </div>
      </Section>

      {/* Spend */}
      <Section title={`Anthropic spend (${data.periodDays}d window)`}>
        <div
          style={{
            fontWeight: 900,
            fontSize: 'clamp(32px, 5vw, 44px)',
            background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.02em',
          }}
        >
          ${data.costDollars}
        </div>
        <div style={{ color: '#9D9CB3', fontSize: 13.5 }}>
          Across {data.funnel.toolSuccesses.toLocaleString()} tool runs · avg{' '}
          {data.funnel.toolSuccesses > 0
            ? `$${(data.costCents / data.funnel.toolSuccesses / 100).toFixed(4)}`
            : '—'}{' '}
          per run
        </div>
      </Section>

      {/* By tool */}
      <Section title="Tool runs by tool">
        <SimpleTable
          rows={Object.entries(data.byTool)
            .sort((a, b) => b[1] - a[1])
            .map(([k, v]) => [k, v.toString()])}
          headers={['Tool', 'Runs']}
        />
      </Section>

      {/* Blocked reasons */}
      {Object.keys(data.byBlockReason).length > 0 && (
        <Section title="Why runs got blocked">
          <SimpleTable
            rows={Object.entries(data.byBlockReason).map(([k, v]) => [k, v.toString()])}
            headers={['Reason', 'Count']}
          />
        </Section>
      )}

      {/* By day */}
      <Section title="Daily timeline">
        <SimpleTable
          rows={Object.entries(data.byDay)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([day, types]) => [
              day,
              (data.uniquesByDay[day] ?? 0).toString(),
              (types.page_view ?? 0).toString(),
              (types.tool_run_success ?? 0).toString(),
              (types.email_capture ?? 0).toString(),
              (types.checkout_start ?? 0).toString(),
              (types.payment_success ?? 0).toString(),
            ])}
          headers={['Day', 'Visitors', 'Pageviews', 'Tool ✓', 'Email', 'Checkout', 'Pay']}
        />
      </Section>

      {/* Recent events */}
      <Section title="Last 20 events">
        <SimpleTable
          rows={data.recentEvents.map((e) => [
            new Date(e.ts).toLocaleString(),
            e.type,
            e.toolId ?? '—',
            e.tier ?? '—',
            e.reason ?? e.source ?? '—',
            e.costCents != null ? `${e.costCents}¢` : '—',
          ])}
          headers={['When', 'Type', 'Tool', 'Tier', 'Reason / Source', 'Cost']}
        />
      </Section>

      <div style={{ color: '#8B8AA0', fontSize: 12, marginTop: 12 }}>
        Generated {data.generatedAt} · {data.eventCount.toLocaleString()} events in window
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section
      style={{
        background: '#14141B',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 14,
        padding: 24,
      }}
    >
      <h2
        style={{
          fontWeight: 800,
          fontSize: 11,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#A78BFA',
          margin: '0 0 16px 0',
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  )
}

function FunnelCard({ label, value, accent = '#F2F0FF' }: { label: string; value: number; accent?: string }) {
  return (
    <div
      style={{
        background: '#0F0F12',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 10,
        padding: '14px 16px',
      }}
    >
      <div style={{ fontSize: 12, color: '#8B8AA0', marginBottom: 6 }}>{label}</div>
      <div style={{ fontWeight: 900, fontSize: 26, color: accent, letterSpacing: '-0.01em' }}>
        {value.toLocaleString()}
      </div>
    </div>
  )
}

function RateCard({ label, pct, accent = '#A78BFA' }: { label: string; pct: number | null; accent?: string }) {
  return (
    <div
      style={{
        background: '#0F0F12',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 10,
        padding: '12px 14px',
      }}
    >
      <div style={{ fontSize: 11.5, color: '#8B8AA0', marginBottom: 4 }}>{label}</div>
      <div style={{ fontWeight: 800, fontSize: 17, color: accent }}>{pct == null ? '—' : `${pct}%`}</div>
    </div>
  )
}

function SimpleTable({ rows, headers }: { rows: string[][]; headers: string[] }) {
  if (rows.length === 0) {
    return <div style={{ color: '#8B8AA0', fontSize: 13 }}>No data in this window.</div>
  }
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                style={{
                  textAlign: 'left',
                  padding: '8px 10px',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  color: '#8B8AA0',
                  fontWeight: 700,
                  fontSize: 11.5,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((cell, j) => (
                <td
                  key={j}
                  style={{
                    padding: '8px 10px',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    color: '#F2F0FF',
                    fontFamily:
                      j === 0
                        ? 'inherit'
                        : '"SF Mono", "Roboto Mono", "Menlo", "Consolas", ui-monospace, monospace',
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
