import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { createClient } from '@/lib/supabase/server'
import { MOMENTS } from '@/lib/moments'

/**
 * Dashboard — the minimal Stage 1 surface.
 *
 * Three blocks (per PLATFORM-VISION.md):
 *   1. Target role(s) — the saved artifact that auto-populates every tool
 *   2. Latest insights — every tool result auto-saved, returnable
 *   3. Next suggested step — what to do today
 *
 * Behavioral design:
 *   - Greeting is identity-reframing ("Welcome to your search" not "Welcome
 *     back, user"). Markus & Nurius 1986 — possible selves.
 *   - The progress strip shows X of 8 steps (endowed at 2 of 8 at sign-up,
 *     Nunes & Drèze 2006 endowed-progress effect).
 *   - "Insights" framing positions the saved data as artifacts the user
 *     wouldn't want to abandon (sunk-cost wedge, Thaler).
 *
 * Server component — pulls everything in one round trip via Supabase. RLS
 * ensures we only see the current user's rows.
 */

const STEP_DEFINITIONS = [
  { id: 'signed_up', label: 'Sign up', tool: null },
  { id: 'target_role_saved', label: 'Define your target role', tool: '/dashboard' },
  { id: 'recruiter_searched_for_you', label: 'See where you rank in recruiter searches', tool: '/tools/recruiter-search-rank' },
  { id: 'linkedin_audit', label: 'Audit your LinkedIn audition reel', tool: '/tools/linkedin-rewrite' },
  { id: 'resume_ai_check', label: 'Run your resume through the AI detector', tool: '/resume' },
  { id: 'interview_prep', label: 'Prep for an interview', tool: '/tools/rehearsal-room' },
  { id: 'offer_decoded', label: 'Decode an offer', tool: '/tools/offer-pitch' },
  { id: 'follow_up_strategy', label: 'Build your follow-up + networking strategy', tool: null },
]

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/sign-in?next=/dashboard')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('current_scene, steps_completed, display_name, email, membership_tier')
    .eq('id', user.id)
    .maybeSingle()

  if (!profile?.current_scene) {
    redirect('/onboarding')
  }

  const { data: targetRoles } = await supabase
    .from('target_roles')
    .select('id, title, level, location, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const { data: recentInsights } = await supabase
    .from('insights')
    .select('id, tool_id, title, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  const completed = profile.steps_completed ?? []
  const stepsTotal = STEP_DEFINITIONS.length
  const stepsDone = STEP_DEFINITIONS.filter((s) => completed.includes(s.id)).length
  const nextStep = STEP_DEFINITIONS.find((s) => !completed.includes(s.id))

  const greeting = profile.display_name ?? user.email?.split('@')[0] ?? 'there'
  // Moment IDs now match Supabase profiles.current_scene values
  // ('networking' | 'interview' | 'offer'), so this is a direct lookup.
  const currentMoment = MOMENTS.find((m) => m.id === profile.current_scene)

  return (
    <main style={{ background: '#FAF8F3', color: '#1A1A22', minHeight: '100vh' }}>
      <Navigation variant="light" />

      <section style={{ padding: 'clamp(40px, 6vw, 72px) 24px clamp(60px, 8vw, 96px)' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          {/* Greeting + scene */}
          <div style={{ marginBottom: 36 }}>
            <div
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#5A4FE0',
                marginBottom: 12,
              }}
            >
              Your search · {currentMoment?.title ?? 'Active'}
            </div>
            <h1
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(32px, 4.5vw, 48px)',
                letterSpacing: '-0.025em',
                lineHeight: 1.06,
                color: '#1A1A22',
                margin: 0,
              }}
            >
              Welcome to your search, {greeting}.
            </h1>
          </div>

          {/* Progress strip */}
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #ECECF2',
              borderRadius: 14,
              padding: '20px 22px',
              marginBottom: 24,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                marginBottom: 10,
                flexWrap: 'wrap',
                gap: 8,
              }}
            >
              <div
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 800,
                  fontSize: 15,
                  color: '#1A1A22',
                }}
              >
                Your search system
              </div>
              <div
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  color: '#5A5A6E',
                }}
              >
                {stepsDone} of {stepsTotal} steps complete
              </div>
            </div>
            <div
              style={{
                width: '100%',
                height: 8,
                background: '#F4F1FF',
                borderRadius: 4,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${(stepsDone / stepsTotal) * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                  transition: 'width 0.5s ease',
                }}
              />
            </div>
            {nextStep && (
              <div
                style={{
                  marginTop: 14,
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: 13.5,
                  color: '#5A5A6E',
                }}
              >
                Next: <strong style={{ color: '#1A1A22' }}>{nextStep.label}</strong>
                {nextStep.tool && (
                  <>
                    {' '}
                    —{' '}
                    <Link
                      href={nextStep.tool}
                      style={{
                        color: '#5A4FE0',
                        fontWeight: 700,
                        textDecoration: 'none',
                      }}
                    >
                      go →
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Two-column: target roles | recent insights */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
              gap: 18,
            }}
          >
            {/* Target roles block */}
            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid #ECECF2',
                borderRadius: 14,
                padding: 22,
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 800,
                    fontSize: 11,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#5A4FE0',
                  }}
                >
                  Target Roles
                </div>
                <span
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontSize: 12,
                    color: '#8B8AA0',
                  }}
                >
                  {targetRoles?.length ?? 0} saved
                </span>
              </div>

              {targetRoles && targetRoles.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {targetRoles.map((role) => (
                    <div
                      key={role.id}
                      style={{
                        padding: '12px 14px',
                        background: '#FAFAFB',
                        border: '1px solid #ECECF2',
                        borderRadius: 10,
                        fontFamily: "'Figtree', sans-serif",
                        fontWeight: 600,
                        fontSize: 14.5,
                        color: '#1A1A22',
                      }}
                    >
                      {role.title}
                      {role.level && (
                        <span style={{ color: '#5A5A6E', fontWeight: 500 }}>
                          {' '}
                          · {role.level}
                        </span>
                      )}
                      {role.location && (
                        <span style={{ color: '#5A5A6E', fontWeight: 500 }}>
                          {' '}
                          · {role.location}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontSize: 13.5,
                    color: '#5A5A6E',
                  }}
                >
                  No target roles yet. Add one to personalize every tool.
                </div>
              )}
            </div>

            {/* Recent insights block */}
            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid #ECECF2',
                borderRadius: 14,
                padding: 22,
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 800,
                    fontSize: 11,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#5A4FE0',
                  }}
                >
                  Recent Insights
                </div>
                <span
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontSize: 12,
                    color: '#8B8AA0',
                  }}
                >
                  {recentInsights?.length ?? 0} saved
                </span>
              </div>

              {recentInsights && recentInsights.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {recentInsights.map((insight) => (
                    <div
                      key={insight.id}
                      style={{
                        padding: '12px 14px',
                        background: '#FAFAFB',
                        border: '1px solid #ECECF2',
                        borderRadius: 10,
                        fontFamily: "'Figtree', sans-serif",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: 14,
                          color: '#1A1A22',
                          marginBottom: 2,
                        }}
                      >
                        {insight.title ?? insight.tool_id}
                      </div>
                      <div style={{ fontSize: 12, color: '#8B8AA0' }}>
                        {new Date(insight.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontSize: 13.5,
                    color: '#5A5A6E',
                  }}
                >
                  No insights yet. Every tool you run from here on auto-saves to your search.
                </div>
              )}
            </div>
          </div>

          {/* Scene moment quick-jump */}
          {currentMoment && (
            <div
              style={{
                marginTop: 28,
                padding: 24,
                background: '#FFFFFF',
                border: '1px solid #ECECF2',
                borderRadius: 14,
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              <div
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 800,
                  fontSize: 11,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#5A4FE0',
                  marginBottom: 8,
                }}
              >
                In your current scene
              </div>
              <h2
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(22px, 2.8vw, 28px)',
                  color: '#1A1A22',
                  margin: '0 0 6px',
                  letterSpacing: '-0.015em',
                }}
              >
                {currentMoment.title}
              </h2>
              <p
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: 14.5,
                  color: '#5A5A6E',
                  lineHeight: 1.55,
                  margin: '0 0 16px',
                  maxWidth: 640,
                }}
              >
                {currentMoment.sub.replace(/\\u2014/g, '—')}
              </p>
              <Link
                href="/tools"
                style={{
                  display: 'inline-block',
                  padding: '12px 20px',
                  background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                  color: 'white',
                  borderRadius: 10,
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 800,
                  fontSize: 14,
                  textDecoration: 'none',
                  boxShadow: '0 10px 24px rgba(108,71,255,0.18)',
                }}
              >
                Open the tools for this scene →
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
