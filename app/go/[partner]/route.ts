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
  // Stephanie's sourcing pick (founder-picks.json), shown on the "find people who aren't applying" answer.
  juicebox: 'https://juicebox.ai',
  // Fraud tools to know (lib/evidence/shortlists.ts). Each is the company's own site, confirmed Nov 14, 2026;
  // where the company sells more than this, the link goes to its page for hiring or interviews.
  tofu: 'https://www.hiretofu.com',
  'sherlock-ai': 'https://www.withsherlock.ai',
  'polygraf-ai': 'https://www.polygraf.ai/interview-cheating-ai-detector/',
  pindrop: 'https://www.pindrop.com/solution/meetings/hiring-fraud/',
  brighthire: 'https://brighthire.com/solutions/candidate-fraud/zoom/',
  fabric: 'https://fabrichq.ai/ai-interviewer',
  'getreal-security': 'https://www.getrealsecurity.com',
  persona: 'https://withpersona.com/solutions/candidate-verification/',
  clear: 'https://identity.clearme.com/industries/workforce',
  iproov: 'https://www.iproov.com',
  proof: 'https://www.proof.com/use-cases/candidate-fraud',
  // Portfolio sites to know (lib/evidence/shortlists.ts), each the company's own portfolio page, confirmed Nov 15, 2026.
  behance: 'https://www.behance.net',
  dribbble: 'https://dribbble.com',
  'adobe-portfolio': 'https://portfolio.adobe.com',
  'journo-portfolio': 'https://www.journoportfolio.com',
  'muck-rack': 'https://muckrack.com/journalists',
  'clippings-me': 'https://www.clippings.me',
  'github-pages': 'https://pages.github.com',
  carrd: 'https://carrd.co',
  canva: 'https://www.canva.com/create/portfolios/',
  notion: 'https://www.notion.com/product/sites',
  wix: 'https://www.wix.com/portfolio-website',
  squarespace: 'https://www.squarespace.com/websites/create-a-portfolio',
  contra: 'https://contra.com/portfolios',
  // Tools to know (Nov 16, 2026 value audit)
  'my-next-move': 'https://www.mynextmove.org/',
  'my-next-move-vets': 'https://www.mynextmove.org/vets/',
  'truity-career': 'https://www.truity.com/test/career-personality-profiler-test',
  'bbb-scam-tracker': 'https://www.bbb.org/scamtracker',
  'linkedin-job-verification': 'https://www.linkedin.com/help/linkedin/answer/a1492056',
  'icann-lookup': 'https://lookup.icann.org/',
  'nass-business-registries': 'https://www.nass.org/business-services/corporate-registration',
  'linkedin-free-job-post': 'https://business.linkedin.com/hire/hiring-pro/pricing',
  'linkedin-recruiter-lite': 'https://business.linkedin.com/hire/recruiter-lite',
  gem: 'https://www.gem.com/',
  hireez: 'https://hireez.com/',
  metaview: 'https://www.metaview.ai/',
  huru: 'https://huru.ai/',
  yoodli: 'https://yoodli.ai/',
  'big-interview': 'https://www.biginterview.com/',
  'aced-practice': 'https://www.pramp.com/',
  'interviewing-io': 'https://interviewing.io/',
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
