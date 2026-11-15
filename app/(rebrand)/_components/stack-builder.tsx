'use client'

import { useEffect, useMemo, useState } from 'react'
import { Logo } from './logo'
import { Capture } from './capture'
import type { StackLane } from '@/lib/stack'
import { cancelReminders, dayAfter, fmt, plural, round2, stackLines, stackQuery, stackTotals, type StackState } from '@/lib/stack-math'
import { SHRM_2025 } from './cost-per-hire'

/**
 * The stack builder: click a tool into each part of a job search (or a
 * hiring setup), and the bill updates as you go. One tool that covers
 * several parts is paid for once. Every price comes from lib/stack.ts,
 * which reads only what is on file; a tool with no published price says so
 * and is never added to a total. The whole stack lives in the address, so
 * a link opens the same stack.
 */

export function StackBuilder({ lane, initial, path }: { lane: StackLane; initial: StackState; path: string }) {
  const [s, setS] = useState<StackState>(initial)
  const [note, setNote] = useState<string | null>(null)
  const [origin, setOrigin] = useState('')
  const side = lane.lane
  const L = useMemo(() => stackLines(lane, s), [lane, s])
  const query = stackQuery(lane, s)

  // Dates are worked out in the visitor's browser, from today.
  const [today, setToday] = useState<Date | null>(null)
  useEffect(() => {
    setOrigin(window.location.origin)
    setToday(new Date())
  }, [])
  // Phones: a total bar along the bottom while the parts are on screen and the bill isn't.
  const [mini, setMini] = useState(false)
  useEffect(() => {
    const main = document.querySelector('.sb-main')
    const bill = document.getElementById('sb-bill')
    if (!main || !bill || !('IntersectionObserver' in window)) return
    let inMain = false
    let inBill = false
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === main) inMain = e.isIntersecting
        if (e.target === bill) inBill = e.isIntersecting
      }
      setMini(inMain && !inBill)
    })
    io.observe(main)
    io.observe(bill)
    return () => io.disconnect()
  }, [])
  useEffect(() => {
    // Keep the stack in the address so a copied link opens the same stack.
    window.history.replaceState(null, '', `${path}?${query}#stack`)
  }, [path, query])

  const { usd, eur, forget, unpriced } = stackTotals(L)
  const filled = lane.slots.filter((x) => s.picks[x.id]).length

  const set = (patch: Partial<StackState>) => {
    setNote(null)
    setS((x) => ({ ...x, ...patch }))
  }
  const pick = (slot: string, id: string | null) => {
    const picks = { ...s.picks }
    if (id === null || picks[slot] === id) delete picks[slot]
    else picks[slot] = id
    set({ picks })
  }
  const setPaid = (id: string, on: boolean) => set({ paid: on ? [...new Set([...s.paid, id])] : s.paid.filter((x) => x !== id) })

  // Make it free: every tool onto its free version, and a free tool in place of any that has none or no price.
  const freeVersion = () => {
    const picks = { ...s.picks }
    const swaps: string[] = []
    for (const slot of lane.slots) {
      const id = picks[slot.id]
      if (!id) continue
      const t = lane.tools[id]
      const isAts = side === 'hiring' && slot.id === 'ats'
      const hasFree = isAts ? !!t.plan?.freeTier : t.free === 'full' || t.free === 'limited' || t.free === 'site'
      if (hasFree) continue
      // Only swap where there is a free tool for that part; RepVera, portfolios and sourcing stay as chosen.
      if (!isAts && slot.id !== 'fraud' && t.free === 'unknown') continue
      const alt = isAts ? slot.options.find((o) => lane.tools[o].plan?.freeTier) : slot.options.find((o) => ['full', 'site'].includes(lane.tools[o].free))
      if (alt && alt !== id) {
        picks[slot.id] = alt
        swaps.push(`${lane.tools[alt].name} for ${t.name}`)
      }
    }
    return { next: { ...s, picks, paid: [] as string[] }, swaps }
  }
  const freeNow = freeVersion()
  const canFree = usd > 0 || freeNow.swaps.length > 0
  const freeTotal = stackTotals(stackLines(lane, freeNow.next)).usd
  const reminders = today ? cancelReminders(L, today) : null
  const downloadReminders = () => {
    if (!reminders) return
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([reminders], { type: 'text/calendar' }))
    a.download = 'cancel-reminders.ics'
    document.body.appendChild(a)
    a.click()
    a.remove()
    setNote('Reminders saved. Open the file to add them to your calendar: each one lands 2 days before a plan renews.')
  }
  const makeFree = () => {
    const { next, swaps } = freeVersion()
    const after = stackTotals(stackLines(lane, next))
    const saved = round2(usd - after.usd)
    setS(next)
    setNote(
      `${swaps.length ? `Swapped in ${swaps.join(', ')}. ` : ''}${after.unpriced.length ? 'Everything with a published price' : 'Every tool'} is on a free version now${saved > 0 ? `: ${fmt(saved)} less ${side === 'seekers' ? `over ${plural(s.months, 'month')}` : 'a year'}` : ''}. The limits of each free version are under its name.`,
    )
  }

  const total = fmt(usd)
  const window_ = side === 'seekers' ? `for ${plural(s.months, 'month')}` : 'a year'
  const url = `${origin}${path}?${query}`

  return (
    <div className={`sb sb-${side}`} id="stack">
      <div className="sb-main">
        <div className="sb-starters" role="group" aria-label="Starting points">
          {lane.starters.map((st) => (
            <button
              type="button"
              key={st.id}
              className={`sb-starter sb-starter-${st.id}`}
              onClick={() => {
                setNote(null)
                setS((x) => ({ ...x, picks: { ...st.picks }, paid: [...st.paid] }))
              }}
            >
              {st.label}
            </button>
          ))}
          {filled > 0 && (
            <button type="button" className="sb-clear" onClick={() => set({ picks: {}, paid: [] })}>
              Clear
            </button>
          )}
        </div>

        {side === 'seekers' ? (
          <div className="sb-control">
            <span className="sb-control-k" id="sb-months">
              How long do you expect to search?
            </span>
            <div className="sb-chips" role="radiogroup" aria-labelledby="sb-months">
              {[1, 3, 6, 12].map((m) => (
                <button type="button" role="radio" aria-checked={s.months === m} key={m} className="sb-chip" onClick={() => set({ months: m })}>
                  {plural(m, 'month')}
                </button>
              ))}
            </div>
            <input className="sb-range" type="range" min={1} max={12} value={s.months} aria-label="Months of searching" onChange={(e) => set({ months: Number(e.target.value) })} />
          </div>
        ) : (
          <div className="sb-control sb-control-2">
            <div>
              <span className="sb-control-k" id="sb-seats">
                Who will use it?
              </span>
              <div className="sb-chips" role="radiogroup" aria-labelledby="sb-seats">
                {lane.seats!.map((o) => (
                  <button type="button" role="radio" aria-checked={s.seats === o.value} key={o.value} className="sb-chip" onClick={() => set({ seats: o.value })}>
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="sb-control-k" id="sb-hires">
                How many hires a year?
              </span>
              <div className="sb-chips" role="radiogroup" aria-labelledby="sb-hires">
                {lane.hires!.map((n) => (
                  <button type="button" role="radio" aria-checked={s.hires === n} key={n} className="sb-chip" onClick={() => set({ hires: n })}>
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="sb-control-k" id="sb-emp">
                How many employees?
              </span>
              <div className="sb-chips" role="radiogroup" aria-labelledby="sb-emp">
                {lane.employees!.map((o) => (
                  <button type="button" role="radio" aria-checked={s.employees === o.value} key={o.value} className="sb-chip" onClick={() => set({ employees: o.value })}>
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {lane.slots.map((slot) => {
          const chosen = s.picks[slot.id] ? lane.tools[s.picks[slot.id]] : null
          // A tool already in the stack for another part that does this one too.
          const already = [...new Set(Object.entries(s.picks).filter(([k, id]) => k !== slot.id && lane.tools[id]?.covers.includes(slot.id) && s.picks[slot.id] !== id).map(([, id]) => id))].map(
            (id) => lane.tools[id],
          )
          const line = chosen ? L.find((l) => l.tool.id === chosen.id) : null
          return (
            <section className={`sb-slot${chosen ? ' sb-slot-on' : ''}`} key={slot.id} aria-labelledby={`sb-${slot.id}`}>
              <div className="sb-slot-head">
                <h3 id={`sb-${slot.id}`}>{slot.title}</h3>
                <span className="sb-slot-state">{chosen ? chosen.name : 'Empty'}</span>
              </div>
              <p className="sb-why">{slot.why}</p>
              {already.length > 0 && (
                <p className="sb-dupe">
                  {already.map((t) => (
                    <button type="button" key={t.id} onClick={() => pick(slot.id, t.id)}>
                      {t.name} is already in your stack and does this too. Use it here for nothing extra
                    </button>
                  ))}
                </p>
              )}
              <div className="sb-opts">
                {slot.options.map((id) => {
                  const t = lane.tools[id]
                  const on = s.picks[slot.id] === id
                  return (
                    <button type="button" key={id} className="sb-opt" aria-pressed={on} onClick={() => pick(slot.id, id)}>
                      <Logo domain={t.domain} name={t.name} size={34} />
                      <span className="sb-opt-t">
                        <b>{t.name}</b>
                        <small>{t.tag}</small>
                      </span>
                      {t.score !== null && <span className="sb-score">{t.score.toFixed(2)}</span>}
                    </button>
                  )
                })}
              </div>
              {chosen && line && (
                <div className="sb-detail">
                  <p className="sb-free">{chosen.freeLine}</p>
                  {((side === 'seekers' && chosen.paid && (chosen.free === 'full' || chosen.free === 'limited')) || (side === 'hiring' && slot.id === 'ats' && chosen.plan?.freeTier)) && (
                    <div className="sb-toggle" role="radiogroup" aria-label={`${chosen.name}: free or paid`}>
                      <button type="button" role="radio" aria-checked={!s.paid.includes(chosen.id)} onClick={() => setPaid(chosen.id, false)}>
                        Free version
                      </button>
                      <button type="button" role="radio" aria-checked={s.paid.includes(chosen.id)} onClick={() => setPaid(chosen.id, true)}>
                        Paid plan
                      </button>
                    </div>
                  )}
                  <p className="sb-cost">
                    <b>{line.cost === null ? line.how : line.cost === 0 ? '$0' : fmt(line.cost, line.currency)}</b>
                    {line.cost !== null && line.cost > 0 && <span>{` ${window_}: ${line.how}`}</span>}
                  </p>
                  {line.renewsAfter !== undefined && !line.onFree && (
                    <p className="sb-renew">
                      {line.renewsAfter === null
                        ? 'Paid once. It never renews.'
                        : `It renews on day ${line.renewsAfter}${today ? `, around ${dayAfter(today, line.renewsAfter)} if you start today` : ''}. Cancel before then if your search is done.`}
                    </p>
                  )}
                  {chosen.renews4w && !line.onFree && (
                    <p className="sb-trap">
                      Bills every 4 weeks, so 13 charges a year.{' '}
                      {chosen.trap && <a href={chosen.trap}>What {chosen.name} really costs</a>}
                    </p>
                  )}
                  <a className="tl" href={chosen.href} {...(chosen.external && chosen.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}>
                    {chosen.hrefLabel} <span className="arr">&rarr;</span>
                  </a>
                </div>
              )}
            </section>
          )
        })}
        {filled > 0 && mini && (
          <a className="sb-mini" href="#sb-bill">
            <span>{side === 'seekers' ? plural(s.months, 'month') : 'A year'}</span>
            <b>{total}</b>
            <span className="sb-mini-go">See the bill</span>
          </a>
        )}
      </div>

      <aside className="sb-bill" id="sb-bill" aria-label="Your bill" aria-live="polite">
        <p className="sb-bill-k">{side === 'seekers' ? 'Your job search bill' : 'Your hiring stack bill'}</p>
        {filled === 0 ? (
          <p className="sb-empty">Click a tool into any part, or start from one of the stacks above.</p>
        ) : (
          <ul className="sb-lines">
            {L.map((l) => (
              <li key={l.tool.id}>
                <span>
                  {l.tool.name}
                  {l.slots.length > 1 && <small>{`covers ${l.slots.length} parts, paid once`}</small>}
                </span>
                <i aria-hidden="true" />
                <b>{l.cost === null ? (l.how === 'No price on file' ? 'no price' : 'quote') : l.cost === 0 ? '$0' : fmt(l.cost, l.currency)}</b>
              </li>
            ))}
          </ul>
        )}
        <div className="sb-total">
          <span>
            {side === 'seekers' ? `${plural(s.months, 'month')} of searching` : 'A year'}
            {unpriced.length > 0 ? ', priced tools only' : ''}
          </span>
          <b key={total} className="sb-pop">
            {total}
          </b>
          {eur > 0 && <span className="sb-eur">plus {fmt(eur, 'EUR')} billed in euros</span>}
          {side === 'hiring' && usd > 0 && <span className="sb-sub">{`About ${fmt(Math.round(usd / 12))} a month`}</span>}
        </div>
        {side === 'seekers' && forget > usd && (
          <p className="sb-forget">
            <b>{fmt(forget)}</b> in the first year if you forget to cancel
          </p>
        )}
        {side === 'hiring' && usd > 0 && (
          <p className="sb-perhire">
            <b>{fmt(Math.round(usd / s.hires))}</b>
            {` in tools per hire, at ${plural(s.hires, 'hire')} a year. SHRM’s 2025 median cost per hire, everything in: ${fmt(SHRM_2025.nonexecutive)}.`}{' '}
            <a href="/hiring-costs">Work out yours</a>
          </p>
        )}
        {canFree && usd > freeTotal && (
          <p className="sb-save">
            {`Same parts on free versions: ${fmt(freeTotal)}. That’s ${fmt(round2(usd - freeTotal))} you keep.`}
          </p>
        )}
        {unpriced.length > 0 && (
          <p className="sb-unpriced">
            {unpriced.every((l) => l.how === 'No price on file')
              ? `Not in the total: ${unpriced.map((l) => l.tool.name).join(', ')}. ${unpriced.length === 1 ? 'It has' : 'They have'} no published price on file.`
              : `Not in the total: ${unpriced.map((l) => `${l.tool.name} (${l.how.charAt(0).toLowerCase()}${l.how.slice(1)})`).join(', ')}.`}
          </p>
        )}
        {canFree && (
          <button type="button" className={`btn ${side === 'seekers' ? 'btn-indigo' : 'btn-coral'} sb-free-btn`} onClick={makeFree}>
            Make it free
          </button>
        )}
        {reminders && (
          <button type="button" className="sb-remind" onClick={downloadReminders}>
            {'Add cancel reminders to my\u00a0calendar'}
          </button>
        )}
        {note && (
          <p className="sb-note" role="status">
            {note}
          </p>
        )}
        {filled > 0 && origin && (
          <p className="sb-share">
            <button
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(url)
                  setNote('Link copied. It opens this exact stack.')
                } catch {
                  setNote(url)
                }
              }}
            >
              Copy a link to this stack
            </button>
          </p>
        )}
        <p className="sb-fine">Prices from each tool’s own pricing page, on file with every review. Nobody pays to be in a stack.</p>
      </aside>

      {filled > 0 && (
        <div className="sb-capture">
          <Capture
            source={side === 'seekers' ? 'stack_seekers' : 'stack_hiring'}
            audience={side === 'seekers' ? 'candidate' : 'hiring'}
            promise={side === 'seekers' ? 'Get this stack by email, and one note if a price in it changes.' : 'Get this stack by email, and one note if a price in it changes.'}
            cta="Email me my stack"
            done="Sent. Check your inbox for your stack and its link."
            extras={{ stack: query }}
          />
        </div>
      )}
    </div>
  )
}
