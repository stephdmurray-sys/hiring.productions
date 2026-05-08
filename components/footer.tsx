'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer style={{
      background: '#0F0F12',
      borderTop: '1px solid rgba(255, 255, 255, 0.06)',
      padding: '60px 40px',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '48px',
        marginBottom: '48px',
      }}>
        {/* Left Column */}
        <div>
          <Link href="/" style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: '18px',
            fontWeight: 800,
            color: '#F2F0FF',
            textDecoration: 'none',
            display: 'block',
            marginBottom: '16px',
          }}>
            hiring.productions
          </Link>
          <p style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: '14px',
            fontWeight: 400,
            color: '#8B8AA0',
            lineHeight: 1.6,
            marginBottom: '20px',
          }}>
            The only place where both sides of hiring finally see the whole thing.
          </p>
          <Link href="/membership" className="btn-primary" style={{
            padding: '10px 20px',
            fontSize: '13px',
            fontWeight: 800,
          }}>
            Go Pro — $20/yr
          </Link>
        </div>

        {/* Center Column */}
        <div>
          <div style={{
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: '#8B8AA0',
            marginBottom: '16px',
            fontFamily: "'Figtree', sans-serif",
          }}>
            TOOLS
          </div>
          <nav style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}>
            <Link href="/jd-seo-score" style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '14px',
              fontWeight: 500,
              color: '#8B8AA0',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }} onMouseEnter={(e) => e.currentTarget.style.color = '#F2F0FF'} onMouseLeave={(e) => e.currentTarget.style.color = '#8B8AA0'}>
              JD SEO Scorecard
            </Link>
            <Link href="/resume" style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '14px',
              fontWeight: 500,
              color: '#8B8AA0',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }} onMouseEnter={(e) => e.currentTarget.style.color = '#F2F0FF'} onMouseLeave={(e) => e.currentTarget.style.color = '#8B8AA0'}>
              Resume AI Checker
            </Link>
            <Link href="/linkedin-guide" style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '14px',
              fontWeight: 500,
              color: '#8B8AA0',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }} onMouseEnter={(e) => e.currentTarget.style.color = '#F2F0FF'} onMouseLeave={(e) => e.currentTarget.style.color = '#8B8AA0'}>
              LinkedIn Guide
            </Link>
            <Link href="/get-found" style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '14px',
              fontWeight: 500,
              color: '#8B8AA0',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }} onMouseEnter={(e) => e.currentTarget.style.color = '#F2F0FF'} onMouseLeave={(e) => e.currentTarget.style.color = '#8B8AA0'}>
              Get Found Coaching
            </Link>
            <Link href="/tools" style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '14px',
              fontWeight: 500,
              color: '#8B8AA0',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }} onMouseEnter={(e) => e.currentTarget.style.color = '#F2F0FF'} onMouseLeave={(e) => e.currentTarget.style.color = '#8B8AA0'}>
              Inside Looks
            </Link>
          </nav>
        </div>

        {/* Right Column */}
        <div>
          <div style={{
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: '#8B8AA0',
            marginBottom: '16px',
            fontFamily: "'Figtree', sans-serif",
          }}>
            COMPANY
          </div>
          <nav style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}>
            <Link href="/for-companies" style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '14px',
              fontWeight: 500,
              color: '#8B8AA0',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }} onMouseEnter={(e) => e.currentTarget.style.color = '#F2F0FF'} onMouseLeave={(e) => e.currentTarget.style.color = '#8B8AA0'}>
              For Companies
            </Link>
            <Link href="/for-candidates" style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '14px',
              fontWeight: 500,
              color: '#8B8AA0',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }} onMouseEnter={(e) => e.currentTarget.style.color = '#F2F0FF'} onMouseLeave={(e) => e.currentTarget.style.color = '#8B8AA0'}>
              For Candidates
            </Link>
            <Link href="/consulting" style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '14px',
              fontWeight: 500,
              color: '#8B8AA0',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }} onMouseEnter={(e) => e.currentTarget.style.color = '#F2F0FF'} onMouseLeave={(e) => e.currentTarget.style.color = '#8B8AA0'}>
              Consulting
            </Link>
            <a href="https://www.repvera.com" target="_blank" rel="noopener noreferrer" style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '14px',
              fontWeight: 500,
              color: '#8B8AA0',
              textDecoration: 'none',
              transition: 'color 0.2s',
              cursor: 'pointer',
            }} onMouseEnter={(e) => e.currentTarget.style.color = '#F2F0FF'} onMouseLeave={(e) => e.currentTarget.style.color = '#8B8AA0'}>
              RepVera
            </a>
          </nav>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        paddingTop: '24px',
        marginTop: '48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '24px',
        flexWrap: 'wrap',
      }}>
        <p style={{
          fontFamily: "'Figtree', sans-serif",
          fontSize: '13px',
          fontWeight: 400,
          color: '#8B8AA0',
          margin: 0,
        }}>
          © 2025 Hiring.Productions. All rights reserved.
        </p>
        <p style={{
          fontFamily: "'Figtree', sans-serif",
          fontSize: '13px',
          fontWeight: 400,
          color: '#8B8AA0',
          margin: 0,
        }}>
          Built by Stephanie Murray
        </p>
      </div>
    </footer>
  )
}
