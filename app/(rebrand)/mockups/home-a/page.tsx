import type { Metadata } from 'next'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { retroCss } from '@/app/(rebrand)/_components/retro'
import { HomeTop, homeTopCss } from '@/app/(rebrand)/_components/home-top'
import { mockBarCss } from '../home-kit'

export const metadata: Metadata = { title: 'Homepage option A: Clapperboards', robots: { index: false, follow: false } }

/**
 * Homepage option A, "Clapperboards" (Nov 16, 2026). Closest to the layout Stephanie liked:
 * the headline on the left, two clapperboards on the right that snap shut on hover, the
 * challenges in a band under the hero, then four featured pages, two per side.
 */
export default function HomeA() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + retroCss + mockBarCss + homeTopCss }} />
      <p className="mock-bar">
        Option A: Clapperboards <a href="/mockups/home-b">See option B</a>
      </p>
      <SiteNav />

      <HomeTop />
      <div className="wrap">
        <p className="ha-rest">The rest of the homepage stays as it is under here: the scoreboard, Stephanie&rsquo;s picks and the guides.</p>
      </div>
      <SiteFooter />
    </>
  )
}
