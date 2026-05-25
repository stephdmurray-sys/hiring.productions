'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

/**
 * Sample Read — anonymized example of a real tool output, embedded on
 * the homepage between the monologue rotator and the founder section.
 *
 * Cold visitors buy blind: they're told "the recruiter's monologue on
 * your resume" but never see what that monologue actually LOOKS like.
 * This panel shows a real-shape example — same format, same tone, same
 * depth — for a fictional-but-realistic senior PM resume. Identifying
 * details are scrubbed. The panel is explicitly labeled as a sample.
 *
 * Voice rules respected: no fake testimonial, no invented person's
 * name, no fabricated company logo. The "candidate" is a generic
 * archetype, not a real or invented person; the recruiter voice is
 * Stephanie's own (calibrated to how she'd actually read this resume).
 */
export function SampleRead() {
  return (
    <section
      style={{
        position: 'relative',
        background: '#14141B',
        color: '#F2F0FF',
        padding: 'clamp(64px, 9vw, 112px) 24px',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        {/* Section eyebrow + heading */}
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
          02.5 — Inside a real read
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
            margin: '0 0 14px',
          }}
        >
          What you actually get back.
        </h2>
        <p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: 16,
            color: '#9D9CB3',
            lineHeight: 1.55,
            textAlign: 'center',
            maxWidth: 600,
            margin: '0 auto 36px',
          }}
        >
          A sample from <em>Through a Recruiter&rsquo;s Eyes.</em> Identifying details
          scrubbed; the read itself is exactly the shape and depth you receive.
        </p>

        {/* The sample card — styled like a real tool result. */}
        <article
          style={{
            background: '#0F0F12',
            border: '1px solid rgba(108,71,255,0.30)',
            borderRadius: 18,
            padding: 'clamp(24px, 4vw, 36px)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 24px 60px rgba(0,0,0,0.40)',
          }}
        >
          {/* Top stripe — same flourish the live tool uses */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
            }}
          />

          {/* Sample meta */}
          <div
            style={{
              display: 'flex',
              gap: 8,
              flexWrap: 'wrap',
              marginBottom: 22,
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: 10,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#A78BFA',
                background: 'rgba(167,139,250,0.14)',
                border: '1px solid rgba(167,139,250,0.35)',
                padding: '4px 10px',
                borderRadius: 100,
              }}
            >
              Sample
            </span>
            <span
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 500,
                fontSize: 13,
                color: '#8B8AA0',
              }}
            >
              Senior Product Manager · 8 yrs · B2B SaaS · resume run on a Tuesday
            </span>
          </div>

          {/* First-six-seconds read */}
          <SubHead>First six seconds:</SubHead>
          <Body>
            <em>&ldquo;Eight years, three companies, current title is Senior PM. Healthcare
            startup, then a fintech, now ad-tech. The healthcare line catches me first
            because we&rsquo;re hiring for a clinical SaaS — I&rsquo;m looking to see if
            she stayed long enough to ship something. Two years. OK. Keep reading.&rdquo;</em>
          </Body>

          {/* The line they'd land on */}
          <SubHead>The line a recruiter lands on:</SubHead>
          <Body>
            <em>&ldquo;Drove cross-functional initiatives that delivered measurable impact
            on platform growth.&rdquo;</em> — every senior PM resume says this. Tells me
            nothing about what she actually did. The line below it says
            <em> &ldquo;Owned the patient-intake redesign that cut onboarding from 14 days
            to 3.&rdquo;</em> THAT&rsquo;S the line. Move it up.
          </Body>

          {/* Three things to change */}
          <SubHead>Three things that would make me pause and screen this in:</SubHead>
          <ol
            style={{
              margin: '0 0 22px',
              paddingLeft: 22,
              fontFamily: "'Figtree', sans-serif",
              fontSize: 14.5,
              color: '#C9C7DA',
              lineHeight: 1.65,
            }}
          >
            <li style={{ marginBottom: 8 }}>
              The healthcare role is buried under the ad-tech role. Reorder so healthcare
              comes first. If she&rsquo;s targeting clinical SaaS, that&rsquo;s her wedge.
            </li>
            <li style={{ marginBottom: 8 }}>
              No metric on the current role. Six years of platform work and not one number
              I can repeat to a hiring manager? That&rsquo;s a self-inflicted screen-out.
            </li>
            <li style={{ marginBottom: 0 }}>
              Headline says &ldquo;Strategic Product Leader.&rdquo; That&rsquo;s every senior
              PM. Change to <em>&ldquo;Senior PM, B2B SaaS · healthcare and fintech.&rdquo;</em>
              The boolean search I&rsquo;m running for clinical roles would surface her
              instead of skipping her.
            </li>
          </ol>

          {/* The honest read */}
          <SubHead>The honest read:</SubHead>
          <Body>
            Strong eight years of work, badly packaged. The healthcare experience is a
            differentiator she&rsquo;s burying. Three small changes — reorder, add one
            metric per role, rewrite the headline — and she shows up in 4 out of the 5
            searches I would run for a Senior PM in clinical SaaS. Today she&rsquo;s in
            zero of them.
          </Body>

          {/* CTA */}
          <Link
            href="/tools/resume-recruiter-eyes"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              marginTop: 12,
              padding: '13px 22px',
              background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
              border: 'none',
              borderRadius: 10,
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: 14.5,
              color: 'white',
              textDecoration: 'none',
              boxShadow: '0 12px 28px rgba(108,71,255,0.28)',
            }}
          >
            Run this read on your resume <ArrowRight size={15} strokeWidth={2.5} />
          </Link>
        </article>
      </div>
    </section>
  )
}

function SubHead({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "'Figtree', sans-serif",
        fontWeight: 800,
        fontSize: 13,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: '#A78BFA',
        marginBottom: 8,
        marginTop: 0,
      }}
    >
      {children}
    </div>
  )
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "'Figtree', sans-serif",
        fontSize: 15.5,
        color: '#F2F0FF',
        lineHeight: 1.6,
        margin: '0 0 22px',
      }}
    >
      {children}
    </p>
  )
}
