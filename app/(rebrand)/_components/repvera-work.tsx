import { REPVERA_EXAMPLE as R, REPVERA_WORK_EXAMPLE as W } from '@/lib/repvera-example'
import { keepLast } from '@/lib/site-line'

/**
 * An example RepVera Work tab: work samples with who saw them happen (Stephanie, Nov 16, 2026).
 * Same product window as the profile display (repvera-fill.tsx); styles in repvera-fill-css.ts.
 * Names and details are changed, and the line under it says so.
 */
export function RepveraWork({ k, note }: { k: string; note: string }) {
  return (
    <div className="rw">
      <h3 className="rw-k">{k}</h3>
      <div className="rfw rw-win">
        <div className="rfw-bar" aria-hidden="true">
          <span className="rfw-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="rfw-url">{W.path}</span>
        </div>
        <div className="rfw-in">
          <div className="rw-head">
            <span className="rw-av" aria-hidden="true">
              {W.initials}
            </span>
            <div>
              <p className="rfw-name">{W.name}</p>
              <p className="rfw-role">{W.role}</p>
              <p className="rfw-bio">{keepLast(W.bio)}</p>
            </div>
          </div>
          <p className="rfw-tabs" aria-hidden="true">
            {R.tabs.map((t) => (
              <span key={t} className={t === 'Work' ? 'rfw-tab-on' : ''}>
                {t}
              </span>
            ))}
          </p>
          <div className="rw-grid">
            {W.items.map((it) => (
              <div className={`rw-card rw-${it.status}`} key={it.title}>
                <div className="rw-thumb" aria-hidden="true">
                  <span className="rw-type">{it.type}</span>
                  <span className="rw-page">
                    <b>{it.title}</b>
                    <i />
                    <i />
                    <i />
                  </span>
                </div>
                <div className="rw-body">
                  <p className="rw-status">
                    <i aria-hidden="true" />
                    {it.label}
                  </p>
                  <p className="rw-title">{keepLast(it.title)}</p>
                  <p className="rw-org">
                    {it.org} &middot; {it.year}
                  </p>
                  {it.witness ? (
                    <>
                      <div className="rw-wit">
                        <span className="rw-wit-av" aria-hidden="true">
                          {it.witness.initials}
                        </span>
                        <span>
                          <b>{it.witness.name}</b>
                          <span>{it.witness.role}</span>
                        </span>
                      </div>
                      <p className="rw-read">Read {it.witness.name.split(' ')[0]}&rsquo;s full receipt &rarr;</p>
                    </>
                  ) : (
                    <p className="rw-desc">{keepLast(it.desc ?? '')}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="rw-foot">{keepLast(W.note)}</p>
        </div>
      </div>
      <p className="rw-note">{keepLast(note)}</p>
    </div>
  )
}
