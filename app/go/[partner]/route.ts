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
  airs: 'https://www.airsdirectory.com',
  sourcecon: 'https://www.eretraining.com',
  socialtalent: 'https://www.socialtalent.com',
  'recruiting-toolbox': 'https://recruitingtoolbox.com',
  'lou-adler': 'https://louadlergroup.com',
  'sourcing-certification': 'https://sourcingcertification.com',
  'asa-csp': 'https://americanstaffing.net/certification/',
  coursecareers: 'https://coursecareers.com',
  'naps-cpc': 'https://naps360.org',
  'linkedin-learning': 'https://www.linkedin.com/learning/',
  skillpanel: 'https://skillpanel.com',
  'shrm-prep': 'https://www.shrm.org/credentials/certification/exam-preparation/shrm-learning-system',
  hrcp: 'https://www.hrcp.com',
  aihr: 'https://www.aihr.com',
  'hrci-prep': 'https://www.hrci.org/certifications/certification-preparation',
  galileo: 'https://getgalileo.ai/learn',
  workology: 'https://go.workology.com/ace-the-hr-exam/',
  'pocket-prep': 'https://www.pocketprep.com',
  mometrix: 'https://www.mometrix.com',
  teamtailor: 'https://www.teamtailor.com',
  'zoho-recruit': 'https://www.zoho.com/recruit/',
  bamboohr: 'https://www.bamboohr.com',
  greenhouse: 'https://www.greenhouse.com',
  lever: 'https://www.lever.co',
  homerun: 'https://www.homerun.co',
  recruitee: 'https://recruitee.com',
  'resume-worded': 'https://resumeworded.com',
  kickresume: 'https://www.kickresume.com',
  novoresume: 'https://novoresume.com',
  zety: 'https://zety.com',
  enhancv: 'https://enhancv.com',
  rezi: 'https://www.rezi.ai',
  flowcv: 'https://flowcv.com',
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
