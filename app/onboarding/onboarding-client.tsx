'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { createClient } from '@/lib/supabase/client'

/**
 * Onboarding client — two questions, no more.
 *
 * Behavioral design notes:
 *   - Two questions only. Every additional field is friction that costs
 *     completions (Krug 2014; Norman 1988). The two we need are:
 *     1. Target role (auto-populates every tool from now on)
 *     2. Current scene (lets the dashboard route their first "next step")
 *
 *   - We pre-mark steps_completed with ['signed_up', 'target_role_saved']
 *     so visitors land on /dashboard at 2 of 8 complete — Nunes & Drèze
 *     2006 endowed-progress effect, ~doubles completion.
 *
 *   - The CTA is "Start my search" not "Continue" — identity reframing
 *     (Markus & Nurius 1986). The visitor begins as someone running a
 *     search, not signing up for a tool.
 */
type Scene = 'networking' | 'interview' | 'offer'

const SCENES: Array<{ id: Scene; title: string; quote: string; subtitle: string }> = [
  {
    id: 'networking',
    title: 'The Networking',
    quote: 'no one is responding to me',
    subtitle: 'You\'re applying, hearing nothing, or your story needs translation (gap, pivot, layoff, new grad).',
  },
  {
    id: 'interview',
    title: 'The Interview',
    quote: 'I have one coming up',
    subtitle: 'You need to research the company, decode the questions, and rehearse against the real rubric.',
  },
  {
    id: 'offer',
    title: 'The Offer',
    quote: 'I have an offer — now what?',
    subtitle: 'You need to read what\'s actually on the table and negotiate without leaving money behind.',
  },
]

export function OnboardingClient({ userEmail }: { userEmail: string }) {
  const router = useRouter()
  const supabase = createClient()

  const [step, setStep] = useState<1 | 2>(1)
  const [targetRole, setTargetRole] = useState('')
  const [scene, setScene] = useState<Scene | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!targetRole.trim()) return
    setStep(2)
  }

  const handleStep2Submit = async () => {
    if (!scene) return
    setSaving(true)
    setError('')

    const { data: userData } = await supabase.auth.getUser()
    const userId = userData?.user?.id
    if (!userId) {
      setError('Session expired. Sign in again.')
      setSaving(false)
      return
    }

    // Save target role
    const { error: roleError } = await supabase.from('target_roles').insert({
      user_id: userId,
      title: targetRole.trim(),
    })
    if (roleError) {
      setError(roleError.message)
      setSaving(false)
      return
    }

    // Update profile with scene + initial steps_completed (endowed progress)
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        current_scene: scene,
        steps_completed: ['signed_up', 'target_role_saved'],
      })
      .eq('id', userId)

    if (profileError) {
      setError(profileError.message)
      setSaving(false)
      return
    }

    router.push('/dashboard')
  }

  return (
    <main style={{ background: '#FAF8F3', color: '#1A1A22', minHeight: '100vh' }}>
      <Navigation variant="light" />

      <section
        style={{
          padding: 'clamp(48px, 8vw, 96px) 24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 700px 500px at 50% 0%, rgba(108,71,255,0.08) 0%, transparent 60%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: 620,
            margin: '0 auto',
          }}
        >
          {/* Step indicator */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              marginBottom: 24,
              fontFamily: "'Figtree', sans-serif",
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#5A4FE0',
            }}
          >
            <span>Step {step}</span>
            <span style={{ color: '#ECECF2' }}>•</span>
            <span style={{ color: '#8B8AA0' }}>2 questions, then you&apos;re in</span>
          </div>

          {step === 1 && (
            <form onSubmit={handleStep1Submit}>
              <h1
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(32px, 5vw, 48px)',
                  letterSpacing: '-0.025em',
                  lineHeight: 1.08,
                  color: '#1A1A22',
                  textAlign: 'center',
                  margin: '0 0 14px',
                }}
              >
                What role are you targeting?
              </h1>
              <p
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: 16,
                  color: '#5A5A6E',
                  textAlign: 'center',
                  lineHeight: 1.55,
                  margin: '0 0 36px',
                  maxWidth: 480,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                Be specific — &ldquo;Senior Product Manager at a Series B SaaS&rdquo; beats &ldquo;PM
                roles.&rdquo; We&apos;ll use this in every tool from here on.
              </p>

              <div
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #ECECF2',
                  borderRadius: 16,
                  padding: 24,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                }}
              >
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Senior Product Manager at Series B SaaS"
                  autoFocus
                  style={{
                    width: '100%',
                    background: '#FAFAFB',
                    border: '1px solid #ECECF2',
                    borderRadius: 10,
                    padding: '16px 18px',
                    fontFamily: "'Figtree', sans-serif",
                    fontSize: 16,
                    color: '#1A1A22',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
                />
                <button
                  type="submit"
                  disabled={!targetRole.trim()}
                  style={{
                    width: '100%',
                    marginTop: 14,
                    background: targetRole.trim()
                      ? 'linear-gradient(135deg, #6C47FF, #FF4F6A)'
                      : '#ECECF2',
                    color: targetRole.trim() ? '#FFFFFF' : '#8B8AA0',
                    border: 'none',
                    borderRadius: 10,
                    padding: 16,
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 800,
                    fontSize: 16,
                    cursor: targetRole.trim() ? 'pointer' : 'not-allowed',
                    transition: 'all 0.15s ease',
                  }}
                >
                  Next →
                </button>
              </div>

              <p
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: 12,
                  color: '#8B8AA0',
                  textAlign: 'center',
                  margin: '20px 0 0',
                }}
              >
                Signed in as {userEmail}
              </p>
            </form>
          )}

          {step === 2 && (
            <>
              <h1
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(32px, 5vw, 48px)',
                  letterSpacing: '-0.025em',
                  lineHeight: 1.08,
                  color: '#1A1A22',
                  textAlign: 'center',
                  margin: '0 0 14px',
                }}
              >
                Where are you in the search?
              </h1>
              <p
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: 16,
                  color: '#5A5A6E',
                  textAlign: 'center',
                  lineHeight: 1.55,
                  margin: '0 0 32px',
                }}
              >
                Pick your current scene. We&apos;ll surface the tools that matter
                most right now.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {SCENES.map((s) => {
                  const selected = scene === s.id
                  return (
                    <button
                      key={s.id}
                      onClick={() => setScene(s.id)}
                      style={{
                        textAlign: 'left',
                        background: '#FFFFFF',
                        border: selected
                          ? '2px solid #6C47FF'
                          : '1px solid #ECECF2',
                        borderRadius: 14,
                        padding: '20px 22px',
                        cursor: 'pointer',
                        fontFamily: "'Figtree', sans-serif",
                        transition: 'all 0.15s ease',
                        boxShadow: selected
                          ? '0 12px 28px rgba(108,71,255,0.12)'
                          : '0 2px 8px rgba(0,0,0,0.04)',
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 900,
                          fontSize: 22,
                          color: '#1A1A22',
                          marginBottom: 4,
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {s.title}
                      </div>
                      <div
                        style={{
                          fontStyle: 'italic',
                          fontSize: 13.5,
                          color: '#5A4FE0',
                          marginBottom: 8,
                        }}
                      >
                        &ldquo;{s.quote}&rdquo;
                      </div>
                      <div
                        style={{
                          fontSize: 13.5,
                          color: '#5A5A6E',
                          lineHeight: 1.5,
                        }}
                      >
                        {s.subtitle}
                      </div>
                    </button>
                  )
                })}
              </div>

              <div style={{ marginTop: 24 }}>
                <button
                  onClick={handleStep2Submit}
                  disabled={!scene || saving}
                  style={{
                    width: '100%',
                    background: scene
                      ? 'linear-gradient(135deg, #6C47FF, #FF4F6A)'
                      : '#ECECF2',
                    color: scene ? '#FFFFFF' : '#8B8AA0',
                    border: 'none',
                    borderRadius: 10,
                    padding: 16,
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 800,
                    fontSize: 16,
                    cursor: scene && !saving ? 'pointer' : 'not-allowed',
                    transition: 'all 0.15s ease',
                    boxShadow: scene && !saving
                      ? '0 12px 28px rgba(108,71,255,0.20)'
                      : 'none',
                  }}
                >
                  {saving ? 'Setting up your search...' : 'Start my search →'}
                </button>
                <button
                  onClick={() => setStep(1)}
                  type="button"
                  style={{
                    width: '100%',
                    marginTop: 10,
                    background: 'transparent',
                    color: '#8B8AA0',
                    border: 'none',
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 600,
                    fontSize: 13,
                    cursor: 'pointer',
                  }}
                >
                  ← Back
                </button>

                {error && (
                  <div
                    style={{
                      marginTop: 12,
                      padding: '10px 14px',
                      background: 'rgba(255,79,106,0.08)',
                      border: '1px solid rgba(255,79,106,0.25)',
                      borderRadius: 8,
                      fontFamily: "'Figtree', sans-serif",
                      fontSize: 12.5,
                      fontWeight: 500,
                      color: '#C73E5A',
                      lineHeight: 1.5,
                    }}
                  >
                    {error}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  )
}
