'use client'

/**
 * Proof Moment — the "oh, this actually works" beat (5/25 strategist).
 *
 * The page was relying on belief: every section described what the
 * product does without ever showing a result. This section drops ONE
 * concrete artifact the visitor can read and immediately understand
 * the difference between "what I have now" and "what this gives me."
 *
 * Chose LinkedIn headline before/after because:
 *   1. Everyone has a LinkedIn headline — visitor reads "before" and
 *      recognizes themselves in it
 *   2. Headlines are short — the transformation lands in 4 seconds
 *   3. It is sourceable structure, not a fabricated quote or stat
 *
 * No invented names, no fake metrics. Placeholders are bracketed so
 * the visitor reads them as structure, not as claims. Per BRAND.md:
 * "no fake testimonials, no invented names, no fabricated logos."
 */
export function ProofMoment() {
  return (
    <section
      style={{
        background: '#FAF8F3',
        padding: 'clamp(56px, 8vw, 88px) 24px',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Section header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(32px, 4vw, 44px)',
          }}
        >
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: 12,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#5A4FE0',
              marginBottom: 14,
            }}
          >
            What you actually get
          </div>
          <h2
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(28px, 4vw, 42px)',
              letterSpacing: '-0.022em',
              lineHeight: 1.08,
              color: '#1A1A22',
              margin: '0 0 12px',
            }}
          >
            One example. Same person. Different LinkedIn.
          </h2>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 500,
              fontSize: 'clamp(15px, 1.7vw, 17px)',
              lineHeight: 1.55,
              color: '#5A5A6E',
              maxWidth: 580,
              margin: '0 auto',
            }}
          >
            The before is what recruiters skip. The after is what they search
            for. This is the kind of rewrite you get inside.
          </p>
        </div>

        {/* The before/after cards. Two equal-weight cards, with a small
            "→" hinge between them on desktop and "After" label on
            mobile. Cards mimic the LinkedIn headline + profile preview
            so visitors recognize the artifact instantly. */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
            gap: 18,
            alignItems: 'stretch',
          }}
        >
          {/* BEFORE */}
          <article
            style={{
              background: '#FFFFFF',
              border: '1px solid #ECECF2',
              borderRadius: 16,
              padding: 'clamp(20px, 2.6vw, 28px)',
              position: 'relative',
              opacity: 0.92,
            }}
          >
            <div
              style={{
                display: 'inline-block',
                padding: '4px 10px',
                background: '#F2F0F8',
                color: '#8B8AA0',
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: 10,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                borderRadius: 100,
                marginBottom: 18,
              }}
            >
              Before
            </div>
            <div
              style={{
                display: 'flex',
                gap: 14,
                alignItems: 'flex-start',
              }}
            >
              <div
                aria-hidden
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background:
                    'linear-gradient(135deg, #E8E6F0, #D8D6E4)',
                  flexShrink: 0,
                }}
              />
              <div style={{ minWidth: 0, flex: 1 }}>
                <div
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 800,
                    fontSize: 15,
                    color: '#1A1A22',
                    marginBottom: 4,
                  }}
                >
                  [Your Name]
                </div>
                <div
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 500,
                    fontSize: 14,
                    color: '#5A5A6E',
                    lineHeight: 1.45,
                  }}
                >
                  Senior Product Manager | Tech Enthusiast | Passionate
                  about Innovation | Always Learning
                </div>
              </div>
            </div>
            <div
              style={{
                marginTop: 18,
                paddingTop: 16,
                borderTop: '1px dashed #ECECF2',
                fontFamily: "'Figtree', sans-serif",
                fontSize: 12.5,
                color: '#8B8AA0',
                lineHeight: 1.5,
                fontStyle: 'italic',
              }}
            >
              No role specificity. No outcome. No signal of what they are
              looking for. Recruiters scroll past.
            </div>
          </article>

          {/* AFTER */}
          <article
            style={{
              background: '#FFFFFF',
              border: '1.5px solid rgba(108,71,255,0.35)',
              borderRadius: 16,
              padding: 'clamp(20px, 2.6vw, 28px)',
              position: 'relative',
              boxShadow: '0 16px 40px rgba(108,71,255,0.10)',
            }}
          >
            <div
              style={{
                display: 'inline-block',
                padding: '4px 10px',
                background:
                  'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                color: '#FFFFFF',
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: 10,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                borderRadius: 100,
                marginBottom: 18,
              }}
            >
              After
            </div>
            <div
              style={{
                display: 'flex',
                gap: 14,
                alignItems: 'flex-start',
              }}
            >
              <div
                aria-hidden
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background:
                    'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                  flexShrink: 0,
                  opacity: 0.85,
                }}
              />
              <div style={{ minWidth: 0, flex: 1 }}>
                <div
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 800,
                    fontSize: 15,
                    color: '#1A1A22',
                    marginBottom: 4,
                  }}
                >
                  [Your Name]
                </div>
                <div
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                    color: '#1A1A22',
                    lineHeight: 1.45,
                  }}
                >
                  Senior PM, B2B SaaS. Led 0 to 1 marketplace at [Series B
                  startup]. Open to fintech or healthtech, IC or staff
                  level.
                </div>
              </div>
            </div>
            <div
              style={{
                marginTop: 18,
                paddingTop: 16,
                borderTop: '1px dashed rgba(108,71,255,0.18)',
                fontFamily: "'Figtree', sans-serif",
                fontSize: 12.5,
                color: '#5A4FE0',
                lineHeight: 1.5,
                fontWeight: 600,
                fontStyle: 'italic',
              }}
            >
              Role, level, industry, target, availability. This is what
              shows up when recruiters search.
            </div>
          </article>
        </div>

        {/* Footer line that names this is just one of the rewrites. */}
        <div
          style={{
            marginTop: 'clamp(24px, 3vw, 32px)',
            textAlign: 'center',
            fontFamily: "'Figtree', sans-serif",
            fontSize: 13.5,
            color: '#8B8AA0',
            maxWidth: 580,
            margin: 'clamp(24px, 3vw, 32px) auto 0',
            lineHeight: 1.55,
          }}
        >
          You get a rewrite like this for your resume, your LinkedIn, your
          outreach messages, and your interview answers. All inside the
          dashboard.
        </div>
      </div>
    </section>
  )
}
