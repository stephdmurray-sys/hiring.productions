'use client'

import { useState } from 'react'
import { Hammer } from 'lucide-react'
import { Navigation } from './navigation'
import { Footer } from './footer'

interface ComingSoonToolProps {
  toolName: string
  toolDescription: string
  category: 'candidate' | 'hiring'
}

export function ComingSoonTool({ toolName, toolDescription, category }: ComingSoonToolProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsSubmitting(true)
    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbyUFzebPIPYH4nVKqOvbRDqtowfmIJzjFt-mB5kHPt9kxpE6e92pLupSUtXq-E8m7vk/exec',
        {
          method: 'POST',
          mode: 'no-cors',
          body: JSON.stringify({
            email,
            toolName,
            category,
            type: 'coming-soon-notification',
          }),
        }
      )
      setSubmitStatus('success')
      setEmail('')
      setTimeout(() => setSubmitStatus('idle'), 3000)
    } catch (error) {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const categoryColor = category === 'candidate' ? '#A78BFA' : '#FF4F6A'
  const categoryBg = category === 'candidate' ? 'rgba(108,71,255,0.15)' : 'rgba(255,79,106,0.15)'
  const categoryLabel = category === 'candidate' ? 'CANDIDATE' : 'HIRING'

  return (
    <>
      <Navigation />
      <main style={{
        background: '#0F0F12',
        minHeight: 'calc(100vh - 60px)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{
          flex: 1,
          padding: '100px 40px',
          maxWidth: '680px',
          margin: '0 auto',
          width: '100%',
        }}>
          {/* Category Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '5px 12px',
            borderRadius: '20px',
            background: categoryBg,
            color: categoryColor,
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 700,
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
            {categoryLabel}
          </div>

          {/* Icon */}
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(108,71,255,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '20px auto',
          }}>
            <Hammer size={32} color="#6C47FF" />
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(28px, 4vw, 40px)',
            letterSpacing: '-0.02em',
            color: '#F2F0FF',
            margin: '20px 0 12px',
            textAlign: 'center',
          }}>
            {toolName}
          </h1>

          {/* Description */}
          <p style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 400,
            fontSize: '17px',
            color: '#8B8AA0',
            lineHeight: 1.7,
            margin: '12px auto 24px',
            maxWidth: '480px',
            textAlign: 'center',
          }}>
            {toolDescription}
          </p>

          {/* Status Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#1A1A22',
            border: '1px solid rgba(255,79,106,0.3)',
            borderRadius: '8px',
            padding: '8px 16px',
            margin: '0 auto',
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 600,
            fontSize: '13px',
            color: '#FF4F6A',
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#FF4F6A',
              animation: 'pulse 1.5s infinite',
            }} />
            In production — launching soon
            <style jsx>{`
              @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.4; }
              }
            `}</style>
          </div>

          {/* Email Capture Card */}
          <form onSubmit={handleSubmit} style={{
            marginTop: '48px',
            background: '#1A1A22',
            border: '1px solid rgba(108,71,255,0.25)',
            borderRadius: '16px',
            padding: '36px',
          }}>
            <h2 style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: '18px',
              color: '#F2F0FF',
              margin: '0 0 8px 0',
            }}>
              Be first in the room when this drops.
            </h2>

            <p style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 400,
              fontSize: '14px',
              color: '#8B8AA0',
              margin: '8px 0 20px 0',
            }}>
              Drop your email and we&apos;ll let you know the moment this Recruiter Insight goes live.
            </p>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '10px',
                padding: '14px 18px',
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 400,
                fontSize: '15px',
                color: '#F2F0FF',
                boxSizing: 'border-box',
                outline: 'none',
                marginTop: '20px',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
            />

            <button
              type="submit"
              disabled={isSubmitting || submitStatus === 'success'}
              style={{
                width: '100%',
                marginTop: '12px',
                background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                border: 'none',
                borderRadius: '10px',
                padding: '15px',
                fontFamily: "'Figtree', sans-serif",
                fontSize: '15px',
                fontWeight: 800,
                color: 'white',
                cursor: isSubmitting ? 'wait' : 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s, opacity 0.2s',
                opacity: submitStatus === 'success' ? 0.8 : 1,
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting && submitStatus !== 'success') {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(108, 71, 255, 0.35)'
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {submitStatus === 'success' ? "You're on the list. ✓" : isSubmitting ? 'Saving...' : "Notify me when it's live →"}
            </button>
          </form>

          {/* Subtext */}
          <p style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 400,
            fontSize: '13px',
            color: '#8B8AA0',
            textAlign: 'center',
            marginTop: '20px',
          }}>
            Already a member? All current Recruiter Insights are unlocked in your account.
          </p>

          {/* RepVera CTA */}
          <div style={{
            marginTop: '48px',
            textAlign: 'center',
          }}>
            <p style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 400,
              fontSize: '13px',
              color: '#8B8AA0',
              marginBottom: '8px',
            }}>
              While you wait — start building proof of how you actually work.
            </p>
            <a
              href="https://www.repvera.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 600,
                fontSize: '13px',
                background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              Start your RepVera — free →
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
