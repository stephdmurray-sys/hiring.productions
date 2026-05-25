import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'

export default function NotFound() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800;900&display=swap');

        .coming-soon-back:hover {
          border-color: rgba(108,71,255,0.5) !important;
          color: #F2F0FF !important;
        }
        .coming-soon-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(108,71,255,0.4);
        }
        .coming-soon-card {
          transition: border-color 0.2s, transform 0.2s;
        }
        .coming-soon-card:hover {
          border-color: rgba(108,71,255,0.3) !important;
          transform: translateY(-2px);
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .glow-dot {
          animation: pulse-glow 2.4s ease-in-out infinite;
        }
        .float-icon {
          animation: float 3.5s ease-in-out infinite;
        }
      `}</style>

      <Navigation />

      <main
        style={{
          minHeight: '100vh',
          background: '#FAF8F3',
          fontFamily: "'Figtree', sans-serif",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Radial glows */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-10%',
            right: '-5%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(108,71,255,0.18) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '-10%',
            left: '-5%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(255,79,106,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Floating icon */}
        <div
          className="float-icon"
          aria-hidden="true"
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '20px',
            background: 'rgba(108,71,255,0.12)',
            border: '1px solid rgba(108,71,255,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '32px',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        {/* Label */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '20px',
            background: 'rgba(255,79,106,0.1)',
            border: '1px solid rgba(255,79,106,0.2)',
            marginBottom: '24px',
          }}
        >
          <span
            className="glow-dot"
            style={{
              display: 'inline-block',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#FF4F6A',
            }}
          />
          <span
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: '#FF4F6A',
            }}
          >
            In Production
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: 'clamp(38px, 6vw, 72px)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: '#1A1A22',
            textAlign: 'center',
            marginBottom: '16px',
            maxWidth: '700px',
          }}
        >
          This look is{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            coming soon.
          </span>
        </h1>

        {/* Subhead */}
        <p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: '18px',
            fontWeight: 500,
            color: '#8B8AA0',
            lineHeight: 1.7,
            textAlign: 'center',
            maxWidth: '520px',
            marginBottom: '48px',
          }}
        >
          We&apos;re still building this Recruiter Insight. Sign up to be first through the curtain when it goes live.
        </p>

        {/* CTA buttons */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '64px',
          }}
        >
          <Link
            href="/"
            className="coming-soon-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
              color: '#1A1A22',
              padding: '14px 32px',
              borderRadius: '10px',
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 700,
              fontSize: '15px',
              textDecoration: 'none',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
          >
            Back to home
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          <Link
            href="/tools"
            className="coming-soon-back"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: '1.5px solid rgba(255,255,255,0.1)',
              background: 'transparent',
              color: '#8B8AA0',
              padding: '14px 32px',
              borderRadius: '10px',
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 700,
              fontSize: '15px',
              textDecoration: 'none',
              transition: 'border-color 0.2s, color 0.2s',
            }}
          >
            See all Recruiter Insights
          </Link>
        </div>

        {/* Divider */}
        <div
          aria-hidden="true"
          style={{
            width: '100%',
            maxWidth: '560px',
            height: '1px',
            background: '#FFFFFF',
            marginBottom: '48px',
          }}
        />

        {/* Available now cards */}
        <p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: '#8B8AA0',
            marginBottom: '24px',
            textAlign: 'center',
          }}
        >
          Available Now — Free
        </p>

        <div
          style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {[
            {
              href: '/resume',
              label: 'Does My Resume Read as AI?',
              desc: 'See your resume through a recruiter\'s eyes.',
              pill: 'For Candidates',
              pillColor: '#6C47FF',
              pillBg: 'rgba(108,71,255,0.12)',
            },
            {
              href: '/for-companies',
              label: 'For Hiring Teams',
              desc: 'How strong candidates actually read your job posts.',
              pill: 'For Hiring Teams',
              pillColor: '#FF4F6A',
              pillBg: 'rgba(255,79,106,0.12)',
            },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="coming-soon-card"
              style={{
                display: 'block',
                width: '240px',
                background: '#1A1A22',
                border: '1px solid #ECECF2',
                borderRadius: '14px',
                padding: '20px',
                textDecoration: 'none',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  padding: '3px 10px',
                  borderRadius: '20px',
                  fontSize: '10px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  background: card.pillBg,
                  color: card.pillColor,
                  marginBottom: '10px',
                }}
              >
                {card.pill}
              </span>
              <p
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: '14px',
                  fontWeight: 800,
                  color: '#1A1A22',
                  lineHeight: 1.3,
                  marginBottom: '6px',
                }}
              >
                {card.label}
              </p>
              <p
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#8B8AA0',
                  lineHeight: 1.5,
                }}
              >
                {card.desc}
              </p>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </>
  )
}
