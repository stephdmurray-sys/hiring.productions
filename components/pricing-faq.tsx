'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

/**
 * Pricing FAQ — the gut-check questions that kill 80% of paywall
 * visitors. Lives on /pricing and /membership. Six direct-answer
 * questions, no hedging, in Stephanie's voice.
 *
 * Accordion pattern — closed by default so the visitor scans the
 * questions first and opens the one that's nagging them. Keeps the
 * page short for skimmers, deep for due-diligence buyers.
 */

interface Q {
  q: string
  a: React.ReactNode
}

const QUESTIONS: Q[] = [
  {
    q: 'Is this just AI dressed up as a recruiter?',
    a: (
      <>
        AI is the engine. The system prompt is mine — written from twenty years of
        running these searches and reading these resumes. Every tool was calibrated
        against real recruiter workflows: the boolean strings sourcers actually paste
        into LinkedIn Recruiter, the rubrics interviewers actually score against, the
        comp-committee math hiring managers actually run. Generic resume scorers
        give you generic feedback. This gives you the recruiter&rsquo;s read for
        your specific role.
      </>
    ),
  },
  {
    q: 'What happens to my resume after I upload it?',
    a: (
      <>
        Your resume goes to our server only long enough to run the tool you asked for.
        It isn&rsquo;t stored, isn&rsquo;t indexed, isn&rsquo;t used to train a model.
        The result is shown to you and the source text is dropped. Your email is only
        stored if you sign up for a free account or Pro.
      </>
    ),
  },
  {
    q: 'Will recruiters know I used your tools?',
    a: (
      <>
        No. The outputs are your own — a rewritten headline, a sharpened bullet, a
        better script for a comp conversation. There&rsquo;s nothing in the result
        that signals where it came from. We aren&rsquo;t adding watermarks, optimizing
        for an ATS scanner, or stuffing your resume with keywords that would read as
        machine-written. The rewrites are in your voice; the diagnoses are
        professional reads, not algorithmic ones.
      </>
    ),
  },
  {
    q: 'How is this different from Jobscan or Resume Worded?',
    a: (
      <>
        Those tools tell you whether your resume <em>passes a scan.</em> This tool
        tells you what the recruiter <em>thinks</em> when it does. Scanning is a
        layer-one filter; the actual hiring decision happens in the room after.
        Hiring.productions covers the layer-one filter (boolean searches, keyword
        gaps, ATS readability) AND the layer-two read (the six-second monologue, the
        debrief, the offer-committee math). One subscription, both layers, both sides
        of the table.
      </>
    ),
  },
  {
    q: 'Can I cancel?',
    a: (
      <>
        Yes. Cancel any time inside Stripe&rsquo;s billing portal — the link is in
        your receipt email. Monthly subscriptions stop at the end of the billing
        period; annual subscriptions don&rsquo;t renew. We don&rsquo;t hide a
        cancel link or run an exit survey.
      </>
    ),
  },
  {
    q: 'Refund policy?',
    a: (
      <>
        Email <a href="mailto:hi@hiring.productions" style={{ color: '#A78BFA' }}>
        hi@hiring.productions</a> within seven days of your first charge and we&rsquo;ll
        refund it. No questions, no &ldquo;tell us why you&rsquo;re leaving&rdquo;
        funnel. The bar is &ldquo;did this give you a result you&rsquo;d pay for&rdquo;
        — if no, we don&rsquo;t want the money.
      </>
    ),
  },
  {
    q: 'I&rsquo;m not in tech. Does this still work for me?',
    a: (
      <>
        The boolean searches and recruiter behaviors are calibrated to LinkedIn
        Recruiter, which is industry-agnostic. The system prompts read your specific
        role and industry off your resume and respond to that. We have members in
        healthcare, finance, law, education, manufacturing, government, and the
        nonprofit sector. The tools work wherever a recruiter would have pulled up
        LinkedIn Recruiter to source candidates — which is most knowledge-work hiring
        in 2026.
      </>
    ),
  },
  {
    q: 'Is the same membership for hiring teams?',
    a: (
      <>
        The Pro tier ($14.99/mo or $99/yr) unlocks both candidate-side AND
        hiring-team tools — same membership, both sides of the table. The
        dedicated hiring-team tier ($199/yr) is a separate product for small companies
        who want the full hiring workflow (role clarity, JD builder, interview rubric,
        offer-letter reverse-read). That tier is currently in waitlist as we ship the
        full workflow.
      </>
    ),
  },
]

export function PricingFAQ() {
  return (
    <section
      style={{
        padding: 'clamp(64px, 9vw, 112px) 24px',
        background: '#0F0F12',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            fontSize: 12,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#A78BFA',
            marginBottom: 16,
            textAlign: 'center',
          }}
        >
          Before you sign up
        </div>
        <h2
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(28px, 4vw, 42px)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#F2F0FF',
            textAlign: 'center',
            margin: '0 0 36px',
          }}
        >
          The questions you&rsquo;re actually asking.
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {QUESTIONS.map((item, idx) => (
            <FAQItem key={idx} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQItem({ q, a }: Q) {
  const [open, setOpen] = useState(false)
  return (
    <div
      style={{
        background: '#14141B',
        border: `1px solid ${open ? 'rgba(167,139,250,0.35)' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: 12,
        overflow: 'hidden',
        transition: 'border-color 0.2s ease',
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          padding: '20px 22px',
          textAlign: 'left',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 700,
          fontSize: 16,
          color: '#F2F0FF',
          lineHeight: 1.35,
        }}
      >
        <span dangerouslySetInnerHTML={{ __html: q }} />
        <span
          style={{
            flexShrink: 0,
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: open ? 'rgba(167,139,250,0.18)' : 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(167,139,250,0.3)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#A78BFA',
            transition: 'all 0.2s ease',
          }}
        >
          {open ? <Minus size={14} strokeWidth={2.5} /> : <Plus size={14} strokeWidth={2.5} />}
        </span>
      </button>
      {open && (
        <div
          style={{
            padding: '0 22px 22px',
            fontFamily: "'Figtree', sans-serif",
            fontSize: 15,
            color: '#C9C7DA',
            lineHeight: 1.65,
          }}
        >
          {a}
        </div>
      )}
    </div>
  )
}
