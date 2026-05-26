import type { Metadata } from 'next'
import { SeoContentPage } from '@/components/seo-content-page'

const CANONICAL =
  'https://hiring.productions/q/am-i-being-ghosted-by-a-recruiter'

export const metadata: Metadata = {
  title: 'Am I Being Ghosted by a Recruiter? (Senior Recruiter Answer)',
  description:
    "How long is too long without a recruiter response, what the silence usually means at each stage, and the exact next move. Written by a 20-year talent acquisition leader who has been the recruiter going silent.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: 'article',
    title: 'Am I being ghosted by a recruiter?',
    description:
      "What recruiter silence actually means at each stage, and the exact follow-up move. From someone who has been the recruiter who went quiet.",
    url: CANONICAL,
  },
}

export default function AmIBeingGhostedPage() {
  return (
    <SeoContentPage
      badge="ASKED OF A RECRUITER"
      badgeColor="indigo"
      headline="Am I being ghosted by a recruiter?"
      intro="Probably not for the reason you think. Most recruiter silence is not about you. It's about a budget freeze, an internal candidate emerging, the hiring manager being on vacation, or a queue that grew past what the recruiter can clear. The wait is real, but the verdict you're worried about usually isn't. Here's how to read silence by stage, the timeline that actually matters, and the exact move to make next."
      canonicalUrl={CANONICAL}
      sections={[
        {
          heading: 'The honest short answer',
          body: "If it has been less than 14 days since their last message and you're at any stage past the initial application, you are probably not ghosted. You're in the normal silence window. If it has been 21+ days with no update and you've sent one follow-up that got no response, you are probably ghosted by this specific role, but not by the company. Recruiters move on candidates the same way candidates move on roles: quietly, because the alternative is awkward. The fix is rarely to chase harder. It's to keep your pipeline full while this one resolves on its own timeline.",
        },
        {
          heading: 'What is actually happening on the recruiter\'s side',
          body: 'A working recruiter is usually managing 15 to 40 open roles at once. Each role has 30 to 200 applicants. The recruiter goes silent for one of five reasons, in roughly this order of frequency: (1) the role got put on hold and they have not been told they can recommunicate the freeze, (2) the hiring manager is reviewing slates in batches and the recruiter is waiting on debrief, (3) an internal candidate emerged and is being evaluated, (4) the recruiter just got reassigned and the role is in handoff limbo, (5) you are on the maybe list and they are waiting to see whether the top two candidates pass the next round. None of these reasons mean you are out. They all look identical to silence from your end.',
        },
        {
          heading: 'How long is too long, by stage',
          body: 'Applied through a job board: 7 to 14 days of silence is normal. Past 21 days, this channel is dead. Recruiter phone screen completed: 5 to 10 days is normal. Past 14 days, follow up once. Hiring manager interview completed: 7 to 14 days is the typical decision window. Past 21 days, follow up once and prepare for the answer to be no, slow, or "we went with someone else." Onsite or final-panel interview: 5 to 14 days is normal, sometimes longer for senior roles. Past 21 days, you are usually backup, not first choice. Offer pending verbally: 7 to 14 days for the written offer is common (background check, equity approval, comp committee). Past 21 days of "coming soon," follow up directly.',
        },
        {
          heading: 'The thank-you note is step 1, not step 2',
          body: "If you had a phone screen, hiring manager interview, or onsite within the last two weeks and have NOT sent a thank-you note yet, that is your first move before any follow-up. A short specific thank-you note to each person who took time with you, sent within 24 hours of the conversation, is standard recruiting etiquette and most candidates skip it. Even if it has been 5+ days, it is not too late within the first two weeks. Send a 3-5 sentence note referencing something specific from the conversation, then a forward-looking line. The thank-you note IS the relationship-building moment that makes a later follow-up land well. Do not send a follow-up email if you owe a thank-you.",
        },
        {
          heading: 'The one follow-up rule',
          body: "Once the thank-you is sent, one well-timed follow-up is professional. Two is acceptable in offer-pending situations only. Three is hurting your case. The follow-up email should do three things: reference something specific from your last conversation (not 'just checking in'), add one piece of value (a relevant article, an answer to something they asked, a new project that bears on the role), and close with a low-pressure out (something like 'happy to wait whatever timeline works on your end'). Subject line: never 'Following up' or 'Checking in.' Make it about something concrete.",
        },
        {
          heading: 'Signs you really are ghosted (not just slow)',
          body: 'Four signals together usually mean it is over. (1) 21+ days of silence after a known interview, (2) one follow-up sent that got no acknowledgment, not even an autoresponse, (3) the role listing was reposted or pulled from the company site in the last week, (4) the recruiter is active on LinkedIn (posting, commenting, viewing profiles) but not yours. If three of these four are true, redirect your energy. The room has decided. Send one final note ("Wanted to close the loop, please keep me in mind for similar roles") and put the position behind you.',
        },
        {
          heading: 'What to do with the energy instead',
          body: "The single biggest mistake post-ghost is chasing one stalled opportunity instead of refilling the pipeline. Two days of focused work on new applications, new outreach, and one networking conversation will return more than another follow-up to the recruiter who went quiet. Most ghosting resolves itself in one of two directions on its own timeline (an offer eventually arrives, or the silence stretches until it's obvious) and there is no version of the story where chasing harder changes that outcome. Use the wait time productively.",
        },
        {
          heading: "Want a real read on your specific situation?",
          body: "The Have I Been Ghosted? tool on hiring.productions takes your stage, the duration of silence, what the recruiter last said to you, and whether you've followed up. It gives you a stage-specific verdict (probably ghosted, probably still in process, worth one follow-up), the actual likely reason for the silence, the specific 48-hour action, and a paste-ready follow-up email if one is worth sending. Free to run.",
        },
      ]}
      faqs={[
        {
          q: 'How long should I wait before assuming I have been ghosted by a recruiter?',
          a: 'Stage matters more than total time. After a recruiter phone screen, wait 10 to 14 days before assuming. After a hiring manager interview, 14 to 21 days. After an onsite or final round, 14 to 21 days for most roles, sometimes longer for senior or regulated positions. Job-board applications that get no response in 21 days are effectively ghosted at the application portal level, but the role may still be live with other candidates.',
        },
        {
          q: 'Should I follow up after a phone screen if I have not heard back?',
          a: 'Yes, but only after you have sent a thank-you note within the first 24 hours of the screen. The thank-you note is the first message. The follow-up is the second, and it should come 7 to 10 days after the thank-you if the recruiter has not responded with next steps. If you skipped the thank-you, send that now (even if a week late) before you send any follow-up. Most candidates skip the thank-you and immediately want to send a follow-up. That order is wrong.',
        },
        {
          q: 'Why do recruiters ghost candidates?',
          a: 'Almost always because the recruiter is overloaded and the candidate dropped below the priority threshold. The most common real reasons are: the role got put on a hold the recruiter was not told to communicate, an internal candidate emerged, the hiring manager is sitting on debriefs, the recruiter got reassigned, or another candidate moved into the lead position and you are on the maybe list while it plays out. Most ghosting is not malicious. It is the recruiter unable to clear their queue and choosing not to send rejections that feel premature.',
        },
        {
          q: 'How many times is it acceptable to follow up with a recruiter?',
          a: "One follow-up after the initial thank-you note is professional. Two follow-ups is acceptable only in offer-pending situations where the silence is happening between verbal and written offer. Three or more follow-ups is hurting your case. Recruiters notice the pattern. The follow-ups read as panicked rather than persistent, which is a different signal than candidates think.",
        },
        {
          q: 'Does recruiter silence mean rejection?',
          a: 'Not automatically, but it correlates more with rejection the longer it goes. At week 1 post-interview, silence usually means the recruiter is still collecting feedback. At week 2, it often means another candidate is in the lead and you are on hold. At week 3+, the probability of a no rises sharply. By week 4 with no response to a follow-up, the role has functionally moved on whether or not the recruiter ever sends a formal rejection.',
        },
        {
          q: 'What should a follow-up email to a recruiter actually say?',
          a: 'Three short paragraphs. (1) Reference something specific from your last conversation so the recruiter remembers you in the right context, not as a generic checking-in candidate. (2) Add one piece of value: a relevant article, an answer to a question they asked, an update on a project that bears on the role. Not a guilt trip about timeline. (3) A low-pressure close that gives them an easy out, something like "happy to wait whatever timeline works on your end." Subject line should be about a concrete thing from your prior conversation, never "Following up" or "Checking in."',
        },
        {
          q: 'Is it okay to follow up with a hiring manager directly if the recruiter has gone quiet?',
          a: "Usually no, with one exception. If you interviewed with the hiring manager directly and exchanged emails, a thank-you note or a single follow-up to them is fine and often appropriate. But going around the recruiter to reach a hiring manager you have not had direct contact with is a tactic that almost never works and frequently backfires. The recruiter is the gatekeeper for a reason, and circumventing them reads as a process violation that gets you remembered for the wrong reason.",
        },
        {
          q: 'What if the recruiter reposts the job after going silent on me?',
          a: "A repost usually means one of two things: the original slate did not produce an acceptable hire and they are widening the search, or the role got modified and they are running it again. Either way, the silence is not personal, and reapplying is not weird. If you want the role, send a short note to the recruiter referencing your earlier conversation and saying you saw the repost and remain interested. It is one of the rare situations where reaching out a second time is welcome.",
        },
      ]}
      insideLook={{
        name: 'Have I Been Ghosted?',
        description:
          "Tell us your stage, how long it has been, and what the recruiter said last. Get a verdict (ghosted, in-process, or worth one follow-up), the actual likely reason, the specific 48-hour action, and a paste-ready follow-up email if one is worth sending. Free to run.",
        href: '/tools/ghosted',
        isFree: true,
      }}
      relatedLinks={[
        { label: 'Why am I not getting responses?', href: '/q/why-am-i-not-getting-responses' },
        { label: 'How to beat an ATS', href: '/q/how-to-beat-ats' },
        { label: 'Open to Work without looking desperate', href: '/q/open-to-work-without-looking-desperate' },
        { label: 'Have I Been Ghosted: the diagnostic', href: '/tools/ghosted' },
      ]}
    />
  )
}
