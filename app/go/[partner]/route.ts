/**
 * Tracked affiliate redirects: /go/{partner} 302s to the destination.
 *
 * Every outbound partner link on the site goes through here so that
 * (a) clicks are logged to the event log and visible in /admin, and
 * (b) affiliate URLs are swappable in ONE place when programs are
 * approved or terms change.
 *
 * Destinations are plain vendor URLs until each affiliate approval
 * lands; then the value swaps to the tracked affiliate link and every
 * page on the site is updated at once.
 */
import { NextRequest, NextResponse } from 'next/server'
import { logEvent } from '@/lib/event-log'

const DESTINATIONS: Record<string, string> = {
  'breezy-hr': 'https://breezy.hr',
  jazzhr: 'https://www.jazzhr.com',
  manatal: 'https://www.manatal.com',
  workable: 'https://www.workable.com',
  pinpoint: 'https://www.pinpointhq.com',
  ashby: 'https://www.ashbyhq.com',
  fountain: 'https://www.fountain.com',
  teamtailor: 'https://www.teamtailor.com',
  'zoho-recruit': 'https://www.zoho.com/recruit/',
  bamboohr: 'https://www.bamboohr.com',
  greenhouse: 'https://www.greenhouse.com',
  lever: 'https://www.lever.co',
  homerun: 'https://www.homerun.co',
  recruitee: 'https://recruitee.com',
  teal: 'https://www.tealhq.com',
  jobscan: 'https://www.jobscan.co',
  deel: 'https://www.deel.com',
  'resume-io': 'https://resume.io',
  huntr: 'https://huntr.co',
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ partner: string }> },
) {
  const { partner } = await params
  const dest = DESTINATIONS[partner]
  if (!dest) {
    return NextResponse.redirect(new URL('/', request.url), 302)
  }
  void logEvent('affiliate_click', {
    meta: { partner, from: request.headers.get('referer') ?? 'direct' },
  })
  return NextResponse.redirect(dest, 302)
}
