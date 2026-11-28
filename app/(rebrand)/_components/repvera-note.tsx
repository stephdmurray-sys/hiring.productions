import { REPVERA_NOTE_LABEL, REPVERA_WHAT, repveraLink } from '@/lib/repvera'

/**
 * Stephanie's labeled RepVera note, in the page body, for the pages most
 * likely to be found in search (Nov 26, 2026). Same note and copy as the
 * real candidate, hiring costs and interview pages: her label, her words
 * (REPVERA_WHAT), no score and no rank. `campaign` tags the link with the
 * page it came from. Add repveraNoteCss to the page's <style>.
 */
export const repveraNoteCss = `
  .ours{max-width:760px;border-left:4px solid var(--indigo);padding:4px 0 4px 24px;}
  .ours-k{display:block;font-size:14px;font-weight:800;color:var(--indigo-text);}
  .ours p{font-size:18px;line-height:1.55;color:var(--ink);margin-top:6px;}
  .ours a{display:inline-block;margin-top:10px;}
`

export function RepveraNote({ campaign }: { campaign: string }) {
  return (
    <section className="wrap sec" id="repvera">
      <aside className="ours" aria-label={REPVERA_NOTE_LABEL}>
        <span className="ours-k">{REPVERA_NOTE_LABEL}</span>
        <p>{REPVERA_WHAT}</p>
        <a className="tl tl-strong" href={repveraLink(campaign)} rel="noopener">
          See how RepVera works <span className="arr">&#8599;</span>
        </a>
      </aside>
    </section>
  )
}
