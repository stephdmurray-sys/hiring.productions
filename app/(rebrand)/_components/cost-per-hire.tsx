'use client'

import { useMemo, useState } from 'react'
import { Capture } from './capture'

/**
 * Cost per hire, as SHRM defines it in its 2025 Recruiting Benchmarking data
 * brief: the sum of the listed recruiting costs divided by the number of
 * hires. Compared with SHRM’s 2025 medians (2,371 organizations surveyed).
 * Nothing here is estimated for the visitor: every number is theirs or SHRM’s.
 */

const ITEMS = [
  { id: 'agency', label: 'Third-party agency fees' },
  { id: 'adagency', label: 'Advertising agency fees' },
  { id: 'boards', label: 'Online job board fees' },
  { id: 'fairs', label: 'Job fair costs' },
  { id: 'referrals', label: 'Employee referral costs' },
  { id: 'travel', label: 'Travel for candidates and staff' },
  { id: 'relocation', label: 'Relocation' },
  { id: 'recruiters', label: 'Recruiter pay and benefits' },
  { id: 'system', label: 'Recruiting software (your talent acquisition system)' },
] as const

export const SHRM_2025 = { nonexecutive: 1200, executive: 10625, ttfNonexecutive: 44, ttfExecutive: 45, orgs: 2371 }

const money = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`
const num = (s: string) => {
  const v = Number(s.replace(/[^0-9.]/g, ''))
  return Number.isFinite(v) && v > 0 ? v : 0
}

export function CostPerHire() {
  const [vals, setVals] = useState<Record<string, string>>({})
  const [hires, setHires] = useState('')
  const [level, setLevel] = useState<'nonexecutive' | 'executive'>('nonexecutive')

  const r = useMemo(() => {
    const parts = ITEMS.map((i) => ({ ...i, amount: num(vals[i.id] ?? '') })).filter((p) => p.amount > 0)
    const total = parts.reduce((a, p) => a + p.amount, 0)
    const h = Math.floor(num(hires))
    if (!total || !h) return null
    const cph = total / h
    const median = SHRM_2025[level]
    const ratio = cph / median
    const who = level === 'executive' ? 'executive' : 'non-executive'
    const compare =
      ratio >= 1.05
        ? `${ratio.toFixed(1)} times SHRM’s 2025 median of ${money(median)} for ${who} hires.`
        : ratio <= 0.95
          ? `Below SHRM’s 2025 median of ${money(median)} for ${who} hires.`
          : `About the same as SHRM’s 2025 median of ${money(median)} for ${who} hires.`
    const sorted = [...parts].sort((a, b) => b.amount - a.amount)
    return { total, h, cph, compare, sorted }
  }, [vals, hires, level])

  return (
    <div className="cph">
      <div className="cph-inputs">
        <fieldset>
          <legend>What did you spend on recruiting?</legend>
          <p className="cph-hint">One period, such as last year. Leave out anything you didn&rsquo;t spend. Don&rsquo;t include the new hires&rsquo; own pay.</p>
          {ITEMS.map((i) => (
            <label className="cph-row" key={i.id}>
              <span>{i.label}</span>
              <span className="cph-money">
                <i>$</i>
                <input
                  inputMode="decimal"
                  autoComplete="off"
                  placeholder="0"
                  value={vals[i.id] ?? ''}
                  onChange={(e) => setVals((v) => ({ ...v, [i.id]: e.target.value }))}
                  aria-label={`${i.label}, in US dollars`}
                />
              </span>
            </label>
          ))}
        </fieldset>
        <fieldset>
          <legend>How many people did you hire in that period?</legend>
          <label className="cph-row">
            <span>Hires</span>
            <span className="cph-money">
              <input inputMode="numeric" autoComplete="off" placeholder="0" value={hires} onChange={(e) => setHires(e.target.value)} aria-label="Hires in the period" />
            </span>
          </label>
          <div className="cph-level" role="radiogroup" aria-label="Compare with">
            <span>Compare with</span>
            <label>
              <input type="radio" name="cph-level" checked={level === 'nonexecutive'} onChange={() => setLevel('nonexecutive')} />
              <span>Non-executive hires</span>
            </label>
            <label>
              <input type="radio" name="cph-level" checked={level === 'executive'} onChange={() => setLevel('executive')} />
              <span>Executive hires</span>
            </label>
          </div>
        </fieldset>
      </div>

      <div className="cph-out" aria-live="polite">
        {r ? (
          <>
            <span className="cph-k">Your cost per hire</span>
            <b className="cph-big">{money(r.cph)}</b>
            <p className="cph-cmp">
              {money(r.total)} across {r.h.toLocaleString('en-US')} hire{r.h === 1 ? '' : 's'}. {r.compare}
            </p>
            <p className="cph-note">
              A median is the middle: half of the {SHRM_2025.orgs.toLocaleString('en-US')} organizations SHRM surveyed spent more, half
              spent less. Their median time to fill was {SHRM_2025.ttfNonexecutive} days for non-executive roles and{' '}
              {SHRM_2025.ttfExecutive} for executive roles.
            </p>
            <div className="cph-bars" aria-label="Where the money went">
              {r.sorted.map((p) => (
                <div key={p.id} className="cph-bar">
                  <span>
                    {p.label} <em>{money(p.amount)}</em>
                  </span>
                  <i style={{ width: `${Math.max(2, (p.amount / r.total) * 100)}%` }} />
                </div>
              ))}
            </div>
            <div className="cph-keep">
              <Capture
                source="cost_per_hire"
                audience="hiring"
                promise="Email me this breakdown, with SHRM’s benchmarks beside it."
                cta="Email me the breakdown"
                done="Sent. Check your inbox."
                extras={{
                  cph: money(r.cph),
                  total: money(r.total),
                  hires: String(r.h),
                  compare: r.compare,
                  level,
                  breakdown: r.sorted
                    .slice(0, 3)
                    .map((p) => `${p.label} ${money(p.amount)} (${Math.round((p.amount / r.total) * 100)}%)`)
                    .join('; '),
                }}
                askCompanySize
              />
            </div>
          </>
        ) : (
          <p className="cph-empty">Add what you spent and how many people you hired. Your cost per hire appears here, next to SHRM&rsquo;s.</p>
        )}
      </div>
    </div>
  )
}
