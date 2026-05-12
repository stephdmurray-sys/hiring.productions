'use client'

import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import {
  AlertCircle,
  Building2,
  DollarSign,
  Edit3,
  Eye,
  FileSearch,
  FileText,
  Filter,
  Hash,
  HelpCircle,
  Linkedin,
  Mail,
  MessageCircle,
  Mic,
  Search,
  Sparkles,
  Star,
  Target,
} from 'lucide-react'
import { CATALOG, type ToolIcon } from '@/lib/tools-catalog'

// Map the catalog's icon-name strings to lucide components. Centralized so
// new tools added to the catalog with a known icon name just work here.
const ICON_MAP: Record<ToolIcon, React.ComponentType<{ size?: number; color?: string }>> = {
  AlertCircle,
  BarChart3: Filter, // fallback — page doesn't import the full set
  Building2,
  Calendar: FileText,
  CheckSquare: Filter,
  DollarSign,
  Edit3,
  Eye,
  FileText,
  Filter,
  Hash,
  HelpCircle,
  Mail,
  Map: Target,
  MessageCircle,
  MessageSquare: MessageCircle,
  Mic,
  Search,
  Send: Mail,
  Sparkles,
  Star,
  Target,
  UserCheck: Filter,
}

// Source candidate-facing tools from the single catalog so this page stays in
// sync as tools ship or get rearranged. Excludes `soon` tier so we never
// surface vapor.
const CANDIDATE_TOOLS = CATALOG.filter(
  (t) => t.audience === 'candidate' && t.tier !== 'soon',
).map((t) => ({
  name: t.name,
  desc: t.desc,
  icon: ICON_MAP[t.icon] ?? Filter,
  href: t.href,
  external: t.href.startsWith('http'),
  featured: false,
  free: t.tier === 'free',
}))

// RepVera lives outside the catalog (external product) but we still want it
// in the grid as the credibility/proof anchor.
const REPVERA_TOOL = {
  name: 'RepVera Profile',
  desc: 'Let your actual work speak. Verified proof of how you show up at work.',
  icon: Star,
  href: 'https://www.repvera.com',
  external: true,
  featured: true,
  free: false,
}

const TOOLS_FOR_PAGE = [...CANDIDATE_TOOLS, REPVERA_TOOL]

export default function ForCandidatesPage() {
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
          background: 'radial-gradient(circle, rgba(108,71,255,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(255,79,106,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: '#8B8AA0',
            marginBottom: '20px',
          }}>
            FOR JOB SEEKERS
          </div>
          <h1 style={{
            fontSize: 'clamp(38px, 5vw, 64px)',
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: '24px',
            letterSpacing: '-0.02em',
          }}>
            Hiring is a production. The interview is your audition.
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#8B8AA0',
            lineHeight: 1.6,
            marginBottom: '40px',
            maxWidth: '580px',
          }}>
            Anyone can rehearse an answer. The candidates who get the part show up with something the others don&apos;t. This is where you learn what that is — and how to bring it.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/tools" className="btn-primary">
              See what hiring teams actually see →
            </Link>
            <a href="https://www.repvera.com" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ display: 'inline-flex', textDecoration: 'none' }}>
              Build your reel — free →
            </a>
          </div>

          {/* Stat chips */}
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'flex-start',
            marginTop: '32px',
            flexWrap: 'wrap',
          }}>
            {['Know your lines', 'Bring your reel', 'Get the part'].map((text, idx) => (
              <div
                key={idx}
                style={{
                  background: '#1A1A22',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '12px',
                  padding: '12px 20px',
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#8B8AA0',
                }}
              >
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insight Section */}
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
          textAlign: 'center',
        }}>
          What&apos;s Actually Happening
        </div>
        <h2 style={{
          fontSize: '32px',
          fontWeight: 900,
          marginBottom: '48px',
          textAlign: 'center',
          letterSpacing: '-0.02em',
        }}>
          Hiring teams are guessing. Most candidates don&apos;t know that.
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
        }}>
          {[
            { icon: Eye, title: 'What they see', desc: 'Your resume gets 6 seconds before it\'s filtered. Here\'s exactly how that happens — and how to change what they find.' },
            { icon: Filter, title: 'How they decide', desc: 'Interview questions aren\'t random. They\'re built around specific signals. See how they\'re generated and what hiring teams are actually listening for.' },
            { icon: FileSearch, title: 'Where you disappear', desc: 'Job descriptions are written for algorithms first, humans second. See how SEO shapes what you\'re applying to before you even read it.' },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: '#1A1A22',
                border: '1px solid rgba(108,71,255,0.25)',
                borderRadius: '14px',
                padding: '28px',
              }}
            >
              <item.icon size={24} color="#6C47FF" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#F2F0FF', marginBottom: '12px' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '14px', color: '#8B8AA0', lineHeight: 1.5 }}>
                {item.desc}
              </p>
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
          textAlign: 'center',
        }}>
          Your Toolkit
        </div>
        <h2 style={{
          fontSize: '32px',
          fontWeight: 900,
          marginBottom: '48px',
          textAlign: 'center',
          letterSpacing: '-0.02em',
        }}>
          See what hiring teams actually see.
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
        }}>
          {TOOLS_FOR_PAGE.map((tool, idx) => (
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
                background: tool.free ? 'rgba(34, 197, 94, 0.15)' : 'rgba(108,71,255,0.15)',
                color: tool.free ? '#22c55e' : '#A78BFA',
              }}>
                {tool.free ? 'Free' : 'Candidate'}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <tool.icon size={20} color="#A78BFA" />
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
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
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
            The part of your application that&apos;s still missing.
          </h2>

          <p style={{
            fontSize: '17px',
            color: '#8B8AA0',
            textAlign: 'center',
            lineHeight: 1.8,
            marginBottom: '48px',
          }}>
            You can optimize your resume. You can rehearse your answers. But no one can fake what your manager, your teammates, and your clients say about you. That&apos;s what RepVera captures.
          </p>

          {/* Fabricated "Beta user, Product Manager" testimonial removed — it
              violated BRAND.md's "no fake testimonials" rule. Replace with a
              real attributed quote when one's available; until then, the
              page stands on the strength of the actual recruiter expertise. */}

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
              Start your RepVera — free
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
          Ready to show more than your resume?
        </h2>
        <p style={{
          fontSize: '16px',
          color: '#8B8AA0',
          marginBottom: '40px',
        }}>
          Start with a free tool or create your profile.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
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
            Start your RepVera — free
          </a>
          <Link href="/tools" className="btn-ghost">
            See all tools
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
