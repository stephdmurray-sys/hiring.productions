'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { ToolGate } from '@/components/tool-gate'

interface ToolPageShellProps {
  toolName: string
  toolDescription: string
  category: 'candidate' | 'hiring'
  isFree?: boolean
  /**
   * When true (default), wraps children in ToolGate so non-members see a
   * full-page paywall. Set to false when the page renders its own form
   * and handles gating inline at the result level (preview pattern).
   */
  gated?: boolean
  children: React.ReactNode
}

export function ToolPageShell({
  toolName,
  toolDescription,
  category,
  isFree = false,
  gated = true,
  children,
}: ToolPageShellProps) {
  const categoryPillColor = category === 'candidate' ? '#A78BFA' : '#FF4F6A'
  const categoryPillBg = category === 'candidate' ? 'rgba(108,71,255,0.15)' : 'rgba(255,79,106,0.15)'
  const categoryLabel = category === 'candidate' ? 'Candidate' : 'Hiring Team'
  const statusLabel = isFree ? 'Free Tool · No account needed.' : 'Pro Tool · Included in membership.'
  const statusBg = isFree ? 'rgba(52,211,153,0.15)' : 'rgba(108,71,255,0.15)'
  const statusColor = isFree ? '#10b981' : '#A78BFA'

  return (
    <div style={{ background: '#FAF8F3', minHeight: '100vh' }}>
      <Navigation />

      {/* Hero Section */}
      <section
        style={{
          background: '#FAF8F3',
          padding: '60px 40px 40px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Category Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              background: categoryPillBg,
              color: categoryPillColor,
              marginBottom: '16px',
            }}
          >
            {categoryLabel}
          </div>

          {/* Tool Name */}
          <h1
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: 'clamp(24px, 3.5vw, 38px)',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              color: '#1A1A22',
              margin: '0 0 16px 0',
            }}
          >
            {toolName}
          </h1>

          {/* Tool Description */}
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '16px',
              fontWeight: 400,
              color: '#8B8AA0',
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            {toolDescription}
          </p>

          {/* Status Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              background: statusBg,
              color: statusColor,
              marginTop: '20px',
            }}
          >
            {statusLabel}
          </div>
        </div>
      </section>

      {/* Tool Content — auto-gated unless the page opts out */}
      {gated ? (
        <ToolGate
          toolName={toolName}
          toolDescription={toolDescription}
          isFree={isFree}
        >
          {children}
        </ToolGate>
      ) : (
        <>{children}</>
      )}

      <Footer />
    </div>
  )
}
