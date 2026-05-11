'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { isMember, getMemberEmail } from '@/lib/membership'

interface NavigationProps {
  variant?: 'light' | 'dark'
}

/**
 * Pull a friendly first name out of an email address. Handles common patterns:
 *   stephanie@x.com          → "Stephanie"
 *   stephanie.murray@x.com   → "Stephanie"
 *   stephanie_murray@x.com   → "Stephanie"
 *   stephanie123@x.com       → "Stephanie"
 *   123@x.com                → ""  (caller falls back to "Hi there")
 */
function firstNameFromEmail(email: string | null): string {
  if (!email) return ''
  const local = email.split('@')[0] ?? ''
  const firstPart = local.split(/[._-]/)[0] ?? ''
  const cleaned = firstPart.replace(/\d+$/, '')
  if (!cleaned) return ''
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase()
}

const forCompanies = [
  { href: '/for-companies', label: 'For Companies' },
  { href: '/jd-seo-score', label: 'Is Your Job Even Being Seen?' },
  { href: '/for-companies#social', label: 'Social Recruitment Guide' },
  { href: '/consulting', label: 'Consulting' },
  { href: 'https://www.repvera.com', label: 'RepVera for Teams', external: true },
]

const forCandidates = [
  { href: '/for-candidates', label: 'For Candidates' },
  { href: '/for-new-grads', label: 'For New Grads' },
  { href: '/after-layoff', label: 'After a Layoff' },
  { href: '/career-changers', label: 'For Career Changers' },
  { href: '/returning-to-work', label: 'Returning to Work' },
  { href: '/stand-out', label: 'Stand Out in the Crowd' },
  { href: '/resume', label: 'Does My Resume Read as AI?' },
  { href: '/linkedin-guide', label: 'LinkedIn Guide' },
  { href: '/get-found', label: 'Get Found Coaching' },
  { href: 'https://www.repvera.com', label: 'RepVera Profile', external: true },
]

function DropdownMenu({
  label,
  items,
  isLight,
  pathname,
}: {
  label: string
  items: { href: string; label: string; external?: boolean }[]
  isLight: boolean
  pathname: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLLIElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const isActive = items.some((item) => item.href === pathname)

  return (
    <li
      ref={ref}
      style={{ position: 'relative', listStyle: 'none' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          fontFamily: "'Figtree', sans-serif",
          fontSize: '14px',
          fontWeight: 600,
          letterSpacing: '0.02em',
          color: isActive || open ? '#A78BFA' : '#F2F0FF',
          transition: 'color 0.15s ease',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
        <span
          style={{
            fontSize: '8px',
            display: 'inline-block',
            transition: 'transform 0.2s ease',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            marginTop: '1px',
          }}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            paddingTop: '8px',
            zIndex: 600,
          }}
        >
          <ul
            role="menu"
            style={{
              minWidth: '240px',
              listStyle: 'none',
              margin: 0,
              padding: '12px 0',
              borderRadius: '8px',
              zIndex: 200,
              background: '#1A1A22',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            }}
          >
          {items.map((item) => (
            <li key={item.href} role="none">
              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  style={{
                    display: 'block',
                    padding: '10px 20px',
                    fontFamily: "'Figtree', sans-serif",
                    fontSize: '14px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    color: '#8B8AA0',
                    transition: 'color 0.15s ease, background-color 0.15s ease',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#F2F0FF'
                    e.currentTarget.style.backgroundColor = 'rgba(108,71,255,0.08)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#8B8AA0'
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  href={item.href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  style={{
                    display: 'block',
                    padding: '10px 20px',
                    fontFamily: "'Figtree', sans-serif",
                    fontSize: '14px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    color: pathname === item.href ? '#A78BFA' : '#8B8AA0',
                    transition: 'color 0.15s ease, background-color 0.15s ease',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#F2F0FF'
                    e.currentTarget.style.backgroundColor = 'rgba(108,71,255,0.08)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = pathname === item.href ? '#A78BFA' : '#8B8AA0'
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
          </ul>
        </div>
      )}
    </li>
  )
}

export function Navigation({ variant = 'light' }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mobileCompaniesOpen, setMobileCompaniesOpen] = useState(false)
  const [mobileCandidatesOpen, setMobileCandidatesOpen] = useState(false)
  // memberActive starts false on SSR so the markup matches; we flip it on the
  // client after mount. This prevents a hydration mismatch between server and
  // client output for a localStorage-backed flag.
  const [memberActive, setMemberActive] = useState(false)
  const [memberFirstName, setMemberFirstName] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    setIsOpen(false)
    setMobileCompaniesOpen(false)
    setMobileCandidatesOpen(false)
  }, [pathname])

  useEffect(() => {
    const active = isMember()
    setMemberActive(active)
    setMemberFirstName(active ? firstNameFromEmail(getMemberEmail()) : '')
  }, [pathname])

  const greeting = memberFirstName ? `Hi, ${memberFirstName}` : 'Hi there'

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const isLight = variant === 'light'

  return (
    <>
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 500,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 32px',
          background: '#0F0F12',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: '18px',
            textDecoration: 'none',
            color: '#F2F0FF',
            display: 'flex',
            alignItems: 'baseline',
            fontWeight: 800,
            letterSpacing: '-0.5px',
          }}
        >
          hiring.productions
        </Link>

        {/* Desktop Navigation */}
        <ul
          className="nav-links-desktop"
          style={{
            display: 'flex',
            gap: '40px',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            alignItems: 'center',
          }}
        >
          <DropdownMenu
            label="For Companies"
            items={forCompanies}
            isLight={isLight}
            pathname={pathname}
          />
          <DropdownMenu
            label="For Candidates"
            items={forCandidates}
            isLight={isLight}
            pathname={pathname}
          />
          <li style={{ listStyle: 'none' }}>
            <Link
              href="/tools"
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '0.02em',
                color: pathname === '/tools' ? '#A78BFA' : '#F2F0FF',
                textDecoration: 'none',
                transition: 'color 0.15s ease',
                whiteSpace: 'nowrap',
              }}
            >
              Tools
            </Link>
          </li>
          {!memberActive && (
            <li style={{ listStyle: 'none' }}>
              <Link
                href="/sign-in"
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: '14px',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  color: pathname === '/sign-in' ? '#A78BFA' : '#F2F0FF',
                  textDecoration: 'none',
                  transition: 'color 0.15s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                Sign in
              </Link>
            </li>
          )}
          <li style={{ listStyle: 'none' }}>
            <Link
              href={memberActive ? '/sign-in' : '/membership'}
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: '14px',
                fontWeight: 800,
                letterSpacing: '0.02em',
                background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {memberActive ? greeting : 'Go Pro'}
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            padding: '8px',
            cursor: 'pointer',
            zIndex: 501,
          }}
        >
          <span
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: '24px',
              height: '18px',
              position: 'relative',
            }}
          >
            <span
              style={{
                display: 'block',
                height: '2px',
                width: '100%',
                borderRadius: '2px',
                background: isLight ? '#1C1917' : '#F5F0EA',
                transition: 'transform 0.2s ease, opacity 0.2s ease',
                transform: isOpen ? 'translateY(8px) rotate(45deg)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                height: '2px',
                width: '100%',
                borderRadius: '2px',
                background: isLight ? '#1C1917' : '#F5F0EA',
                transition: 'opacity 0.2s ease',
                opacity: isOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: 'block',
                height: '2px',
                width: '100%',
                borderRadius: '2px',
                background: isLight ? '#1C1917' : '#F5F0EA',
                transition: 'transform 0.2s ease, opacity 0.2s ease',
                transform: isOpen ? 'translateY(-8px) rotate(-45deg)' : 'none',
              }}
            />
          </span>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className="nav-mobile-overlay"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: '#1C1C1C',
          zIndex: 499,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden',
          transition: 'opacity 0.3s ease, visibility 0.3s ease',
          overflowY: 'auto',
        }}
      >
        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: '32px 24px',
            textAlign: 'center',
            width: '100%',
            maxWidth: '360px',
          }}
        >
          {/* For Companies group */}
          <li style={{ marginBottom: '32px' }}>
            <button
              onClick={() => setMobileCompaniesOpen((v) => !v)}
              aria-expanded={mobileCompaniesOpen}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "Georgia, 'Playfair Display', serif",
                fontSize: '26px',
                color: '#F5F0EA',
                textDecoration: 'none',
                width: '100%',
                textAlign: 'center',
              }}
            >
              For Companies
              <span
                style={{
                  fontSize: '14px',
                  display: 'inline-block',
                  transition: 'transform 0.2s ease',
                  transform: mobileCompaniesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
                aria-hidden="true"
              >
                ▾
              </span>
            </button>
            {mobileCompaniesOpen && (
              <ul style={{ listStyle: 'none', margin: '16px 0 0', padding: 0 }}>
                {forCompanies.map((item) => (
                  <li key={item.href} style={{ marginBottom: '12px' }}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      style={{
                        fontFamily: 'monospace',
                        fontSize: '16px',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: pathname === item.href ? '#7B5EA7' : 'rgba(245, 240, 232, 0.6)',
                        textDecoration: 'none',
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* For Candidates group */}
          <li style={{ marginBottom: '32px' }}>
            <button
              onClick={() => setMobileCandidatesOpen((v) => !v)}
              aria-expanded={mobileCandidatesOpen}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "Georgia, 'Playfair Display', serif",
                fontSize: '26px',
                color: '#F5F0EA',
                textDecoration: 'none',
                width: '100%',
                textAlign: 'center',
              }}
            >
              For Candidates
              <span
                style={{
                  fontSize: '14px',
                  display: 'inline-block',
                  transition: 'transform 0.2s ease',
                  transform: mobileCandidatesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
                aria-hidden="true"
              >
                ▾
              </span>
            </button>
            {mobileCandidatesOpen && (
              <ul style={{ listStyle: 'none', margin: '16px 0 0', padding: 0 }}>
                {forCandidates.map((item) => (
                  <li key={item.href} style={{ marginBottom: '12px' }}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      style={{
                        fontFamily: 'monospace',
                        fontSize: '16px',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: pathname === item.href ? '#7B5EA7' : 'rgba(245, 240, 232, 0.6)',
                        textDecoration: 'none',
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Tools */}
          <li style={{ marginBottom: '32px' }}>
            <Link
              href="/tools"
              onClick={() => setIsOpen(false)}
              style={{
                display: 'block',
                fontFamily: "Georgia, 'Playfair Display', serif",
                fontSize: '26px',
                color: pathname === '/tools' ? '#7B5EA7' : '#F5F0EA',
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              Tools
            </Link>
          </li>

          {/* Sign in — hidden when already a member */}
          {!memberActive && (
            <li style={{ marginBottom: '32px' }}>
              <Link
                href="/sign-in"
                onClick={() => setIsOpen(false)}
                style={{
                  display: 'block',
                  fontFamily: "Georgia, 'Playfair Display', serif",
                  fontSize: '26px',
                  color: pathname === '/sign-in' ? '#7B5EA7' : '#F5F0EA',
                  textDecoration: 'none',
                  textAlign: 'center',
                }}
              >
                Sign in
              </Link>
            </li>
          )}

          {/* Primary CTA — Go Pro for guests, personal greeting for members */}
          <li style={{ marginBottom: '32px' }}>
            <Link
              href={memberActive ? '/sign-in' : '/membership'}
              onClick={() => setIsOpen(false)}
              style={{
                display: 'inline-block',
                fontFamily: "'Figtree', sans-serif",
                fontSize: '18px',
                fontWeight: 800,
                letterSpacing: '0.02em',
                padding: '14px 32px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                color: '#FFFFFF',
                textDecoration: 'none',
                boxShadow: '0 18px 40px rgba(108,71,255,0.30)',
              }}
            >
              {memberActive ? greeting : 'Go Pro'}
            </Link>
          </li>
        </ul>
      </div>

    </>
  )
}
