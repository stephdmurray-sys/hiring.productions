/**
 * Welcome emails for the review site's email asks. Each one delivers what
 * the visitor asked for, in writing, and carries the ownership disclosure.
 * RepVera appears only in hiring-team emails about fraud or what hiring
 * costs, labeled as ours (GROWTH.md).
 */
import { answerText, askFromState, askToQuery, recommend, situationFor, stateFromParams, verdictTitle } from '@/lib/evidence/recommend'
import { OWNERSHIP_DISCLOSURE, REPVERA_TEAMS_LINE, REPVERA_WHAT, repveraLink } from '@/lib/repvera'

const SITE = 'https://hiring.productions'

const SIGN_OFF = ['', OWNERSHIP_DISCLOSURE, "You're getting this because you asked for it on hiring.productions. Unsubscribe in one click.", '', 'Stephanie', 'hiring.productions']

/** A labeled RepVera note for hiring-team emails about screening, interviewing or what a hire costs (GROWTH.md). */
function repveraNote(campaign: string, lead?: string): string[] {
  return ['', 'From the team behind hiring.productions:', ...(lead ? [lead] : []), REPVERA_WHAT, `See how it works: ${repveraLink(campaign)}`]
}

export function reviewSiteWelcome(source: string, extras?: Record<string, string>): { subject: string; text: string } | null {
  const x = extras ?? {}

  if (source === 'recommender' && x.ask) {
    const ask = askFromState(stateFromParams(Object.fromEntries(new URLSearchParams(x.ask))))
    if (!ask) return null
    const r = recommend(ask)
    const sit = situationFor(ask)
    const url = sit ? `${SITE}/what-should-i-use/${sit.slug}` : `${SITE}/what-should-i-use?${askToQuery(ask)}`
    return {
      subject: `Your answer: ${verdictTitle(r).title}`,
      text: [
        "Here's the answer you asked for, in writing.",
        '',
        answerText(r),
        '',
        `See it, with why the other tools didn't fit: ${url}`,
        '',
        "We check every price, rating and list each month. If this answer changes, we'll email you once to say what changed.",
        ...SIGN_OFF,
      ].join('\n'),
    }
  }

  if (source === 'cost_per_hire' && x.cph) {
    return {
      subject: `Your cost per hire: ${x.cph}`,
      text: [
        "Here's your cost per hire, in writing.",
        '',
        `Cost per hire: ${x.cph}`,
        `Total recruiting costs: ${x.total ?? ''}, across ${x.hires ?? ''} hires`,
        x.breakdown ? `Where it went: ${x.breakdown}` : '',
        '',
        x.compare ?? '',
        '',
        "How it's counted, as SHRM defines it: agency fees, advertising agency fees, job fairs, job boards, referral costs, travel, relocation, recruiter pay and benefits, and recruiting software, divided by the number of hires.",
        "Benchmark: SHRM's 2025 Recruiting Benchmarking data brief, 2,371 organizations. Median cost per hire: $1,200 for non-executive hires, $10,625 for executive hires.",
        '',
        `Recalculate any time: ${SITE}/hiring-costs`,
        ...repveraNote('cost-per-hire-email', REPVERA_TEAMS_LINE),
        ...SIGN_OFF,
      ]
        .filter((line, i, all) => line !== '' || all[i - 1] !== '')
        .join('\n'),
    }
  }

  if (source === 'scorecard' && x.url) {
    return {
      subject: `Your interview scorecard${x.role ? `: ${x.role}` : ''}`,
      text: [
        'Your structured interview scorecard is ready to print and share with your panel:',
        x.url,
        '',
        x.competencies ? `It covers: ${x.competencies}.` : '',
        '',
        "How to run it, from the US Office of Personnel Management's guide to structured interviews:",
        '1. Ask every candidate the same questions, in the same order.',
        '2. Take notes during each answer.',
        '3. Rate each answer on the scale before anyone discusses it.',
        '4. Decide before the first interview how final ratings are set: consensus or average.',
        ...repveraNote('scorecard-email'),
        ...SIGN_OFF,
      ].join('\n'),
    }
  }

  if (source === 'fraud_checklist') {
    return {
      subject: 'Your "Is this a real candidate?" checklist',
      text: [
        'Here is the checklist for your interviewers. Every item comes from the FBI, with the notice named.',
        '',
        'Before the interview',
        '- Check your applicant tracking system for other applicants with the same resume content or contact information. (FBI, January 2025)',
        '- Check resumes for typos and unusual wording. (FBI, January 2025)',
        '- Verify identity during interviewing, not only at onboarding. (FBI, January 2025)',
        '',
        'During a video interview',
        "- Watch for lip movement that doesn't match the audio, or a cough or sneeze with no matching movement. (FBI, June 2022)",
        '- Know that face-swapping software has been used in video interviews. (FBI, January 2025)',
        '- Ask "soft" questions for specific details about where they live and where they studied. (FBI, January 2025)',
        '',
        'After',
        '- Do as much of the hiring and onboarding as you can in person. (FBI, January 2025)',
        '',
        'Why it matters: in a Gartner survey of 3,000 candidates, 6% said they had taken part in interview fraud.',
        '',
        'Sources: FBI Internet Crime Complaint Center, I-012325-PSA (January 23, 2025) and PSA220628 (June 28, 2022); Gartner, as reported by HR Dive.',
        `The full guide: ${SITE}/is-this-a-real-candidate`,
        ...repveraNote('fraud-checklist-email'),
        ...SIGN_OFF,
      ].join('\n'),
    }
  }

  if (source === 'on_the_rise') {
    return {
      subject: "You'll hear when a new tool breaks out",
      text: [
        "You're on the list. When a tool we're watching earns enough public reviews to score, or a new one shows up on the lists we check, you'll get one short note.",
        '',
        `Who we're watching now: ${SITE}/on-the-rise`,
        ...SIGN_OFF,
      ].join('\n'),
    }
  }

  return null
}
