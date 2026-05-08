'use client'

import { SeoContentPage } from '@/components/seo-content-page'

export default function WhatRecruitersReallyThinkPage() {
  return (
    <SeoContentPage
      badge="BOTH SIDES"
      badgeColor="indigo"
      headline="What Recruiters Really Think When Reading Your Resume"
      intro="Most candidates write resumes for a reader who has time. Recruiters don't have time. Here's what actually goes through a recruiter's head when they open your resume — from someone who has read thousands of them."
      sections={[
        {
          heading: "The First 6 Seconds Are Real",
          body: "The 6-second resume scan is not a myth. It's not that recruiters don't care — it's that they have 200 more to get through by end of day. In those 6 seconds, a recruiter is scanning for three things: relevance (does this person have experience doing what we need?), recency (was their most recent role related?), and red flags (anything that immediately disqualifies them). If all three pass, they read more. If any one fails, they move on. Your resume doesn't need to tell your whole story in 6 seconds. It needs to survive the first scan."
        },
        {
          heading: "What Gets Skipped",
          body: "Objective statements at the top — nobody reads these anymore. Long paragraph descriptions of what a company does — recruiters know what Salesforce is. Responsibilities that describe the job title, not what you did — 'responsible for managing a team' tells a recruiter nothing. Anything in the last 15 years that predates the experience level they're hiring for — a Director of TA applying for a VP role doesn't need their 2008 coordinator bullets. Skills sections full of basic software — listing Microsoft Word as a skill in 2026 actively hurts you. Every line on your resume should earn its place. If a recruiter who doesn't know you would skip it, cut it."
        },
        {
          heading: "What Makes a Recruiter Stop Scrolling",
          body: "Specific numbers that demonstrate scale — 'led a team of 7' is better than 'led a team,' '$5M in new revenue' is better than 'drove revenue growth.' Company names they recognize, used in context — not just as employer names, but as reference points for scale and complexity. Promotions within the same company — internal advancement signals performance. Short role at a well-known company followed by a longer role — curiosity, not a red flag. The word 'built' — not 'managed,' not 'oversaw,' not 'supported.' People who build things get interviews. People who manage things get maybe calls."
        },
        {
          heading: "The Decision Is Made Faster Than You Think",
          body: "Most hiring decisions aren't made at the interview. They're made in the first 30 seconds of reviewing a resume — and then confirmed or overturned by the interview. This means your resume isn't trying to get you a job. It's trying to get you a call. One call. That's the only job it has. If you write your resume trying to explain your whole career, you'll lose. If you write it to answer the question 'should I call this person?' — you have a shot."
        }
      ]}
      insideLook={{
        name: "Your Resume, Through a Recruiter's Eyes",
        description: "See the internal monologue of a recruiter reading your resume in the first 6 seconds.",
        href: "/tools/resume-recruiter-eyes",
        isFree: false
      }}
      relatedLinks={[
        { label: "Would You Even Make It Through?", href: "/tools/ats-reality" },
        { label: "Where You Actually Have a Shot", href: "/tools/where-you-have-a-shot" }
      ]}
    />
  )
}
