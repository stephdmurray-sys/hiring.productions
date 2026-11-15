/**
 * What we earn from each outbound vendor link, said right under the link.
 *
 * As of Nov 14, 2026 no affiliate deal is live (Stephanie): every /go link
 * goes to the vendor's plain website (app/go/[partner]/route.ts). When a
 * deal is approved, add the partner id here at the same time the /go
 * destination swaps to the tracked link, and every label on the site
 * switches with it. The advertiser disclosure page lists this set too.
 * Two static guides say "No link on this page earns us anything right now"
 * in their HTML (_html/guide-ats.ts, _html/guide-training.ts): change those
 * lines by hand when this set stops being empty.
 */
export const PAYS_US: ReadonlySet<string> = new Set<string>([])

export const EARN_NOTHING = 'We earn nothing from this link.'
export const EARN_COMMISSION = 'We earn a commission if you buy through this link.'

export function moneyLine(partnerId: string): string {
  return PAYS_US.has(partnerId) ? EARN_COMMISSION : EARN_NOTHING
}

/** For the static HTML guides: adds the money line after every /go link with class "visit". */
export function labelGoLinks(html: string): string {
  return html.replace(/(<a href="\/go\/([a-z0-9-]+)"[^>]*class="visit"[^>]*>[\s\S]*?<\/a>)/g, (_m, link: string, id: string) => `${link}<span class="money" style="display:block;font-size:12.5px;line-height:1.4;font-weight:600;color:#62627A;margin-top:6px;text-align:inherit;">${moneyLine(id)}</span>`)
}

export const moneyCss = `
  .money{display:block;font-size:12.5px;line-height:1.4;font-weight:600;color:var(--ink-3,#62627A);margin-top:6px;letter-spacing:0;text-transform:none;}
`
