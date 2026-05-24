'use client'

import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { BilateralCallout } from '@/components/bilateral-callout'
import { BarChart2, Share2, Users, CheckSquare, Clock, Star } from 'lucide-react'

export default function ForCompaniesPage() {
  return (
    <div style={{ background: '#0F0F12', color: '#F2F0FF', minHeight: '100vh' }}>
      <Navigation variant="dark" />

      {/* Hero Section */}
      <section style={{
        padding: '120px 40px',
        position: 'relative',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* Radial glows */}
        <div style={{
          position: 'absolute',
          top: '-5%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(255,79,106,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(108,71,255,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.22em',
            color: '#FF4F6A',
            marginBottom: '22px',
          }}>
            FOR HIRING TEAMS
          </div>
          <h1 style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 900,
            lineHeight: 1.04,
            marginBottom: '22px',
            letterSpacing: '-0.03em',
          }}>
            A bad hire is the most
            <br />
            expensive mistake a small
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #FF4F6A 0%, #6C47FF 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              company makes.
            </span>
          </h1>
          <p style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: '18px',
            color: '#9D9CB3',
            lineHeight: 1.6,
            marginBottom: '14px',
            maxWidth: '620px',
          }}>
            Most happen because the job description was wrong before the first resume came in. The
            wrong title attracts the wrong pool. The wrong screen filters out the right candidate.
            The wrong interview asks the wrong questions. By the time you&rsquo;re reading the offer
            committee&rsquo;s notes, the mistake is already three weeks old.
          </p>
          <p style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: '17px',
            color: '#F2F0FF',
            fontWeight: 600,
            lineHeight: 1.6,
            marginBottom: '20px',
            maxWidth: '620px',
          }}>
            The hiring-team toolkit walks you through every stage — role clarity to signed offer —
            from someone who&rsquo;s run TA functions for 20 years.
          </p>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '13px',
              fontWeight: 600,
              color: '#A78BFA',
              letterSpacing: '0.03em',
              marginBottom: '32px',
            }}
          >
            By Stephanie Murray · 20 years in talent acquisition · Built the TA function at Brightside Health
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link href="#waitlist" className="btn-primary">
              Join the hiring-team waitlist — $199/yr →
            </Link>
            <Link href="/tools" className="btn-ghost">
              Explore the tools that exist today
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────── HIRING WORKFLOW SEQUENCE ───────────────
         The brief's vision: present tools as a hiring workflow, not a
         catalog. Stages move chronologically from role definition to
         signed offer. Tools that exist link directly; the ones we're
         still building show "Coming soon" + waitlist.
      */}
      <section style={{
        padding: 'clamp(56px, 8vw, 100px) clamp(20px, 5vw, 40px)',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        <div style={{
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 800,
          fontSize: '11px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#FF8FA3',
          marginBottom: '14px',
          textAlign: 'center',
        }}>
          The hire, end to end
        </div>
        <h2 style={{
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(28px, 4vw, 44px)',
          letterSpacing: '-0.02em',
          color: '#F2F0FF',
          textAlign: 'center',
          marginBottom: '40px',
          lineHeight: 1.1,
        }}>
          Every stage. Every decision. The tools to get each one right.
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
          gap: '16px',
        }}>
          {[
            { stage: '1. Define the role', tool: 'Role Clarity Tool', desc: 'Before the JD — what does 90-day success actually look like, and what level do you really need versus what you think you need?', status: 'soon' },
            { stage: '2. Write the JD', tool: 'Job Description Builder', desc: 'Not a template. A structured build that produces a JD that reads like a real job worth applying to.', status: 'soon', badge: 'First to ship' },
            { stage: '3. Score the JD', tool: 'JD SEO Scorecard', desc: 'How your JD ranks across every major job board and AI matching engine — built today.', status: 'free', href: '/jd-seo-score' },
            { stage: '4. Pick the platform', tool: 'Platform Strategy Tool', desc: 'Where to post this specific role, how much to spend, how to adapt the language for each platform\'s algorithm.', status: 'soon' },
            { stage: '5. Screen smarter', tool: 'Triage 200 Applicants in 30 Seconds', desc: 'A scorecard for this role, the 3-5 signals that actually predict success, and how to read a resume for THIS position.', status: 'pro', href: '/tools/applicant-triage' },
            { stage: '6. Source what you missed', tool: 'The Search String That Finds Your Candidate', desc: 'Generate the boolean string to paste into LinkedIn Recruiter, Indeed, and Google to surface the ideal candidate.', status: 'pro', href: '/tools/boolean-builder' },
            { stage: '7. Spot AI applications', tool: 'Is This Even a Real Candidate?', desc: 'Paste any application — get a verdict on whether it\'s human-authored or AI-generated, and what flagged it.', status: 'pro', href: '/tools/real-candidate' },
            { stage: '8. Run real interviews', tool: 'Interview Guide Builder', desc: 'Structured questions calibrated to the role and level. Prevents illegal questions, repeats, and vibe-based decisions.', status: 'soon' },
            { stage: '9. Audit the experience', tool: 'Your Hiring Process, From the Outside', desc: 'Every step of the process through a candidate\'s eyes — where strong candidates drop out and why.', status: 'soon' },
            { stage: '10. Close the offer', tool: 'How Your Offer Actually Lands', desc: 'How the offer reads to a candidate with two other options — and what to say in the offer call to close them.', status: 'soon' },
          ].map((stage) => (
            <Link
              key={stage.stage}
              href={stage.href ?? '#waitlist'}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                textDecoration: 'none',
                background: '#14141B',
                border: stage.status === 'soon'
                  ? '1px dashed rgba(255,143,163,0.3)'
                  : '1px solid rgba(255,79,106,0.25)',
                borderRadius: '14px',
                padding: '20px 20px 18px',
                transition: 'all 0.18s ease',
                minHeight: 178,
                opacity: stage.status === 'soon' ? 0.85 : 1,
                position: 'relative',
              }}
            >
              {stage.badge && (
                <div style={{
                  position: 'absolute',
                  top: -10,
                  left: 16,
                  background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                  color: '#FFFFFF',
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 800,
                  fontSize: 10,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  padding: '3px 10px',
                  borderRadius: 100,
                }}>
                  {stage.badge}
                </div>
              )}
              <div style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: 10,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#FF8FA3',
              }}>
                {stage.stage}
              </div>
              <div style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: 17,
                lineHeight: 1.25,
                color: '#F2F0FF',
              }}>
                {stage.tool}
              </div>
              <div style={{
                display: 'inline-block',
                alignSelf: 'flex-start',
                padding: '2px 8px',
                borderRadius: 100,
                background: stage.status === 'soon' ? 'rgba(255,143,163,0.12)'
                  : stage.status === 'free' ? 'rgba(94,230,168,0.12)'
                  : 'rgba(255,79,106,0.15)',
                color: stage.status === 'soon' ? '#FF8FA3'
                  : stage.status === 'free' ? '#5EE6A8'
                  : '#FF4F6A',
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: 9.5,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                {stage.status === 'soon' ? 'Coming soon' : stage.status === 'free' ? 'Free' : 'Pro'}
              </div>
              <div style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: 13.5,
                lineHeight: 1.5,
                color: '#9D9CB3',
                marginTop: 2,
              }}>
                {stage.desc}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─────────────── $199 WAITLIST ─────────────── */}
      <section
        id="waitlist"
        style={{
          padding: 'clamp(64px, 9vw, 110px) clamp(20px, 5vw, 40px)',
          background: '#14141B',
          borderTop: '1px solid rgba(255,79,106,0.15)',
          borderBottom: '1px solid rgba(255,79,106,0.15)',
        }}
      >
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#FF8FA3',
            marginBottom: 16,
          }}>
            Hiring-team Pro · Coming soon
          </div>
          <h2 style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(32px, 4.5vw, 50px)',
            letterSpacing: '-0.02em',
            color: '#F2F0FF',
            lineHeight: 1.1,
            marginBottom: 18,
          }}>
            The whole hiring workflow.
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #FF4F6A 0%, #6C47FF 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              $199 per year.
            </span>
          </h2>
          <p style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: 17,
            color: '#9D9CB3',
            lineHeight: 1.6,
            marginBottom: 28,
            maxWidth: 580,
            margin: '0 auto 28px',
          }}>
            Costs less than one LinkedIn job post. Gets you through every stage from role definition
            to signed offer. Small companies hire two to three times a year and need access when
            they need it — not a monthly bill that feels wasteful in quiet months.
          </p>
          <Link
            href="/api/lead?source=hiring-team-waitlist"
            className="btn-primary"
            style={{
              display: 'inline-block',
              padding: '15px 32px',
              background: 'linear-gradient(135deg, #FF4F6A, #6C47FF)',
              border: 'none',
              borderRadius: 10,
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: 16,
              color: 'white',
              textDecoration: 'none',
              boxShadow: '0 12px 30px rgba(255,79,106,0.30)',
            }}
          >
            Join the waitlist — get notified when JD Builder ships
          </Link>
          <p style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: 13,
            color: '#8B8AA0',
            marginTop: 14,
          }}>
            We&rsquo;ll send one email when it&rsquo;s live. No marketing series.
          </p>
        </div>
      </section>

      {/* Observations Row — replaced the old "46% / 89% / $17K" stats
          because the underlying studies are 2005/2012 and the brand rule
          forbids unsourced numbers. These are recruiter observations
          drawn from Stephanie's practice instead. */}
      <section style={{
        padding: 'clamp(56px, 7vw, 80px) clamp(20px, 5vw, 40px)',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
          gap: '20px',
        }}>
          {[
            {
              kicker: 'The asymmetry',
              label: 'One strong hire is worth several okay ones. Smaller teams can’t absorb the cost of either kind of mis-hire.',
            },
            {
              kicker: 'The leverage point',
              label: 'The job description does more selling than the recruiter does — especially at companies candidates haven’t heard of.',
            },
            {
              kicker: 'The wrong fight',
              label: 'Most small teams compete on comp. The actual fight is clarity — about the role, the work, and what the next 12 months look like.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: '#1A1A22',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '14px',
                padding: 'clamp(22px, 4vw, 28px)',
                textAlign: 'left',
              }}
            >
              <div style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: '11px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '12px',
              }}>
                {item.kicker}
              </div>
              <div style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: '15px',
                color: '#C9C7DA',
                lineHeight: 1.6,
              }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tools Section */}
      <section style={{
        padding: '100px 40px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <div style={{
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          color: '#8B8AA0',
          marginBottom: '20px',
        }}>
          Free Tools for Hiring Teams
        </div>
        <h2 style={{
          fontSize: '32px',
          fontWeight: 900,
          marginBottom: '48px',
          letterSpacing: '-0.02em',
        }}>
          Tools built for how you actually hire.
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
        }}>
          {[
            { name: 'JD SEO Scorecard', desc: 'See exactly how your job descriptions rank for visibility and candidate attraction.', icon: BarChart2, href: '/jd-seo-score', external: false, featured: false },
            { name: 'Social Recruitment Guide', desc: 'Learn how to source and engage top talent directly where they already are.', icon: Share2, href: '/for-companies#social', external: false, featured: false },
            { name: 'RepVera for Hiring Teams', desc: 'See verified proof of how candidates actually show up at work. Zero FCRA liability.', icon: Users, href: 'https://www.repvera.com', external: true, featured: true },
          ].map((tool, idx) => (
            <div
              key={idx}
              style={{
                background: '#1A1A22',
                border: tool.featured ? '2px solid rgba(108,71,255,0.4)' : '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                width: 'fit-content',
                marginBottom: '12px',
                background: 'rgba(255,79,106,0.15)',
                color: '#FF4F6A',
              }}>
                Hiring Team
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <tool.icon size={20} color="#FF4F6A" />
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#F2F0FF' }}>
                  {tool.name}
                </h3>
              </div>
              <p style={{ fontSize: '14px', color: '#8B8AA0', flex: 1, lineHeight: 1.5, marginBottom: '16px' }}>
                {tool.desc}
              </p>
              {tool.external ? (
                <a href={tool.href} target="_blank" rel="noopener noreferrer" style={{ color: '#A78BFA', fontWeight: 600, textDecoration: 'none' }}>
                  Learn more →
                </a>
              ) : (
                <Link href={tool.href} style={{ color: '#A78BFA', fontWeight: 600, textDecoration: 'none' }}>
                  Learn more →
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* RepVera Section */}
      <section style={{
        background: 'linear-gradient(160deg, #0F0F12 0%, #120e1f 50%, #0F0F12 100%)',
        borderTop: '1px solid rgba(108,71,255,0.1)',
        borderBottom: '1px solid rgba(108,71,255,0.1)',
        padding: '100px 40px',
        marginTop: '60px',
        marginBottom: '60px',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: '#8B8AA0',
            marginBottom: '20px',
            textAlign: 'center',
          }}>
            RepVera
          </div>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 900,
            marginBottom: '24px',
            textAlign: 'center',
            letterSpacing: '-0.02em',
          }}>
            How it fits into what you already do.
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#8B8AA0',
            textAlign: 'center',
            marginBottom: '48px',
            maxWidth: '700px',
            margin: '0 auto 48px',
            lineHeight: 1.6,
          }}>
            No system changes. No FCRA liability. No procurement cycle. Just verified proof of how someone actually shows up at work.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '48px',
          }}>
            {[
              { step: 1, title: 'Skills align. Candidate looks right.', desc: 'Someone checks out — "Do you have a moment? I have a quick question." You know what to look for, but you still don\'t know if this person is who their resume says they are.', icon: CheckSquare },
              { step: 2, title: 'Respect it. Before you schedule.', desc: 'One message: "Do you mind if I take a look?" No email thread. No awkward follow-up. No "by system requirements." Nothing that could land before you\'re ready.', icon: Clock },
              { step: 3, title: 'Walk in already knowing.', desc: 'You already know how they work. How they lead. How others experience them. You\'ve read their receipts.', icon: Users },
              { step: 4, title: 'Hire with confidence.', desc: 'Something changed. Teams noticed. You could have known — you could have seen something that might have changed it all.', icon: Star },
            ].map((item) => (
              <div
                key={item.step}
                style={{
                  background: '#1A1A22',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                  padding: '24px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <item.icon size={20} color="#6C47FF" />
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#F2F0FF' }}>
                    {item.title}
                  </h3>
                </div>
                <p style={{ fontSize: '14px', color: '#8B8AA0', lineHeight: 1.5 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '32px',
          }}>
            {['Zero FCRA Liability', 'No System Changes Required'].map((pill, idx) => (
              <div
                key={idx}
                style={{
                  background: '#1A1A22',
                  border: '1px solid rgba(108,71,255,0.3)',
                  borderRadius: '20px',
                  padding: '12px 20px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#F2F0FF',
                }}
              >
                {pill}
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <a
              href="https://www.repvera.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                padding: '14px 32px',
                fontSize: '16px',
                fontWeight: 800,
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Learn how RepVera works →
            </a>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{
        background: '#1A1A22',
        padding: '80px 40px',
        textAlign: 'center',
        marginBottom: '60px',
      }}>
        <h2 style={{
          fontSize: '36px',
          fontWeight: 900,
          marginBottom: '24px',
          letterSpacing: '-0.02em',
        }}>
          Ready to hire differently?
        </h2>
        <p style={{
          fontSize: '16px',
          color: '#8B8AA0',
          marginBottom: '40px',
        }}>
          Book a consultation or start with the free tools.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/consulting" className="btn-primary">
            Book a Consultation
          </Link>
          <Link href="/tools" className="btn-ghost">
            Explore All Tools
          </Link>
        </div>
      </section>

      <BilateralCallout audience="hiring" />

      <Footer />
    </div>
  )
}
