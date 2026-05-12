import type { Metadata } from 'next'
import { SeoContentPage } from '@/components/seo-content-page'

const CANONICAL = 'https://hiring.productions/q/how-to-beat-ats'

export const metadata: Metadata = {
  title: 'How to Beat an ATS in 2026 (What Actually Works)',
  description:
    "Most advice on beating an ATS is years out of date. Here's what modern ATS systems actually check, the formatting rules that matter in 2026, and the keyword approach that gets you past the filter.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: 'article',
    title: 'How to Beat an ATS in 2026',
    description:
      "The recruiter-side read on what modern ATS systems actually check — and the practical fixes that get your resume to a human.",
    url: CANONICAL,
  },
}

export default function HowToBeatATSPage() {
  return (
    <SeoContentPage
      badge="FOR CANDIDATES"
      badgeColor="indigo"
      headline="How to Beat an ATS in 2026"
      intro="You don't beat an ATS — you align with it. Most resumes never reach a human because of three specific issues that take an afternoon to fix. Here's what actually works in 2026."
      canonicalUrl={CANONICAL}
      sections={[
        {
          heading: 'Stop Trying to Trick the System',
          body: 'Most online advice on beating an ATS is 5-10 years out of date. White-text keyword stuffing got patched a decade ago. Hidden text gets flagged. Gimmicks like microscopic font sizes packed with JD keywords get caught by modern parsers and often flag the resume for manual review with a note that says exactly what the candidate did. The systems are not trying to be defeated. They are trying to match qualified candidates to roles. Working with the matching logic instead of against it is how you actually pass.',
        },
        {
          heading: 'What Modern ATS Systems Actually Check',
          body: "Workday, Greenhouse, Lever, Taleo, iCIMS, and SuccessFactors are the six platforms behind most large-employer hiring. They all do roughly the same things: parse the resume into structured fields (name, contact, work history, education, skills), match the parsed text against the job description's keywords, look at job titles and tenure for level fit, and pass a score to the recruiter. The differences between them matter less than how you've prepared the document. A resume that parses cleanly and uses precise keyword matching passes all six.",
        },
        {
          heading: 'The Three Issues That Actually Tank Resumes',
          body: "First, broken parsing. Anything that isn't plain text in a single column — tables, text boxes, columns, fancy headers, graphics — risks being read as garbled text. The fix: clean single-column layout, standard fonts (Calibri, Arial, Times), section headers as plain text. Second, keyword mismatch. Writing 'recruiting' when the JD says 'talent acquisition' loses you the match. Mirror the exact language of the posting where it fits. Third, mismatched job titles. If the JD wants 'Senior Product Manager' and your title was 'Lead Product Manager,' put both — your actual title with a parenthetical of how it maps. ATS scoring will find the alignment.",
        },
        {
          heading: 'The Keyword Approach That Actually Works',
          body: "Read the job description twice. Mark every noun and noun phrase that describes responsibilities, tools, and qualifications. Write those exact phrases into your resume where they describe work you actually did. 'Greenhouse' goes in if you used Greenhouse. 'Quarterly business reviews' goes in if you ran QBRs. 'B2B SaaS' goes in if that's the industry. Don't make things up to keyword-match — that gets caught in the interview. But where the truth lines up with the JD's exact phrasing, use the exact phrasing. This single move tends to raise ATS scores by 15-25 percentage points.",
        },
        {
          heading: 'What to Do With Your File',
          body: "Submit as a Word .docx unless the application specifically requests PDF. Most ATS systems parse Word better than PDF, especially for older platforms still in use. Name the file something specific — FirstLast-Resume-2026.docx, not 'resume_final_v3_USE_THIS_ONE.docx.' The file name shows up in the recruiter's view in some platforms. If the application asks for both LinkedIn and resume, your LinkedIn headline and About section should reinforce the same keyword story — recruiters often check both during screening.",
        },
        {
          heading: "What 'ATS-Friendly' Doesn't Mean",
          body: "It doesn't mean stripped-down and boring. Once your resume parses cleanly and mirrors the JD vocabulary, the writing still needs to be good. The 7-second human scan happens after the ATS scan passes. A resume that's perfect for the ATS but reads like a checklist of buzzwords loses humans. A resume that's compelling for humans but breaks ATS parsing never reaches them. Both layers matter. The candidates who land interviews consistently do both.",
        },
      ]}
      faqs={[
        {
          q: 'How do I actually beat an ATS?',
          a: "Three things: format your resume in a single column with plain-text section headers (no tables, columns, or graphics), mirror the exact language of the job description where it accurately describes your work, and submit as a Word .docx unless the application explicitly asks for PDF. That alone moves most resumes from below 50% match to above 75%.",
        },
        {
          q: 'Does the ATS reject my resume automatically?',
          a: "It doesn't outright reject — it scores. Resumes below a certain match threshold (often 60-70%) get pushed to the bottom of the pile or filtered out of the recruiter's default view. They technically still exist in the system, but no human is realistically going to find them.",
        },
        {
          q: "What's the best file format for an ATS?",
          a: "Word .docx parses best across the most-used ATS platforms. PDFs have improved but still cause parsing issues in older Workday and Taleo configurations. Only submit PDF if the application specifically requests it.",
        },
        {
          q: 'Should I include a skills section to beat the ATS?',
          a: 'Yes — a clean skills section near the top of the resume helps ATS keyword matching. Keep it to specific tools, platforms, methodologies, and certifications. Skip generic skills like "Microsoft Office" or "Communication" — those neither help the ATS nor impress a human.',
        },
        {
          q: 'Can I use ChatGPT to beat the ATS?',
          a: "ChatGPT is useful for identifying which JD keywords you should incorporate and rewriting bullets to mirror them. It is not useful for generating a resume from scratch — those have other tells that get caught downstream. Use it as an editor, not a writer.",
        },
        {
          q: 'How do I know if my resume passed the ATS?',
          a: "You won't get a confirmation. The signal is the response rate on applications. If you're applying to roles where you genuinely match 70%+ of the requirements and getting no responses across multiple applications, the ATS is the most likely filter. Running your resume through an ATS Reality Check estimates your match score before you apply.",
        },
      ]}
      insideLook={{
        name: 'Would Your Resume Even Make It Through?',
        description:
          'Get your ATS score, the missing keywords blocking you, and the top 3 fixes — before your next application.',
        href: '/tools/ats-reality',
        isFree: false,
      }}
      relatedLinks={[
        { label: 'How ATS actually works', href: '/how-ats-actually-works' },
        { label: "Why am I not getting responses?", href: '/q/why-am-i-not-getting-responses' },
        { label: 'What is the 7-second rule on a resume?', href: '/q/7-second-rule-resume' },
        { label: 'Is my resume good?', href: '/q/is-my-resume-good' },
      ]}
    />
  )
}
