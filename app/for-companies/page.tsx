'use client'

import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
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
            ◆ FOR HIRING TEAMS
          </div>
          <h1 style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 900,
            lineHeight: 1.04,
            marginBottom: '22px',
            letterSpacing: '-0.03em',
          }}>
            Hiring well isn&apos;t more recruiting.
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #FF4F6A 0%, #6C47FF 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              It&apos;s smarter recruitment marketing.
            </span>
          </h1>
          <p style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: '18px',
            color: '#9D9CB3',
            lineHeight: 1.6,
            marginBottom: '20px',
            maxWidth: '620px',
          }}>
            Most companies that hire well aren&apos;t doing more recruiting. They&apos;re writing job descriptions
            candidates actually read, showing up where talent already is, and competing on something
            other than brand name. Free tools and recruiter-grade answers, built from 20 years of TA practice.
          </p>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '13px',
              fontWeight: 600,
              color: '#FF4F6A',
              letterSpacing: '0.03em',
              marginBottom: '32px',
            }}
          >
            By Stephanie Murray · 20 years in talent acquisition · Built the TA function at Brightside Health
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link href="/for-small-teams" className="btn-primary">
              I&apos;m a small team →
            </Link>
            <Link href="/tools" className="btn-ghost">
              Explore the tools
            </Link>
            <Link href="/consulting" className="btn-ghost">
              Book a consultation
            </Link>
          </div>
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

      <Footer />
    </div>
  )
}
