'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Loader2, AlertCircle } from 'lucide-react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { createClient } from '@/lib/supabase/client'

/**
 * Custom magic-link verification page.
 *
 * Receives ?token=XXX&type=magiclink (or type=signup) from the email link
 * we sent ourselves via /api/auth/send-magic-link.
 *
 * Calls supabase.auth.verifyOtp({ token_hash, type }) — this works
 * regardless of Supabase Site URL / Redirect URL config because we're
 * not relying on Supabase's own URL handling. Their auth server just
 * validates the hashed token.
 *
 * On success: checks the user's profile.current_scene and routes them to
 *   - /onboarding if they haven't onboarded yet
 *   - /dashboard if they have
 */

// useSearchParams must live inside a Suspense boundary for Next.js's
// static export checker. Wrap the working component in Suspense and
// expose a thin outer component as the default export.
export default function VerifyPage() {
  return (
    <Suspense fallback={<VerifyLoading />}>
      <VerifyInner />
    </Suspense>
  )
}

function VerifyLoading() {
  return (
    <main style={{ background: '#FAF8F3', color: '#1A1A22', minHeight: '100vh' }}>
      <Navigation variant="light" />
      <section style={{ padding: 'clamp(80px, 12vw, 140px) 24px', textAlign: 'center' }}>
        <Loader2
          size={32}
          color="#6C47FF"
          strokeWidth={2.5}
          style={{ animation: 'spin 1s linear infinite' }}
        />
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </section>
      <Footer />
    </main>
  )
}

function VerifyInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  const [status, setStatus] = useState<'verifying' | 'error'>('verifying')
  const [errorMsg, setErrorMsg] = useState<string>('')

  useEffect(() => {
    const token = searchParams.get('token')
    const typeParam = searchParams.get('type')

    if (!token) {
      setStatus('error')
      setErrorMsg('Missing token. Try requesting a new sign-in link.')
      return
    }

    // Supabase accepts these `type` values for hashed-token verify.
    // We default to 'magiclink' because that's the most common case.
    const type =
      typeParam === 'signup' || typeParam === 'email' || typeParam === 'recovery'
        ? typeParam
        : 'magiclink'

    ;(async () => {
      const { error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: type as 'magiclink' | 'signup' | 'email' | 'recovery',
      })

      if (error) {
        setStatus('error')
        setErrorMsg(
          error.message.includes('expired')
            ? 'This sign-in link has expired. Request a new one.'
            : 'We couldn\'t sign you in with that link. Request a new one and try again.',
        )
        return
      }

      // Successfully signed in. Now figure out where to route them.
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setStatus('error')
        setErrorMsg('Sign-in succeeded but we couldn\'t find your account. Try again.')
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('current_scene')
        .eq('id', user.id)
        .maybeSingle()

      router.replace(profile?.current_scene ? '/dashboard' : '/onboarding')
    })()
  }, [router, searchParams, supabase])

  return (
    <main style={{ background: '#FAF8F3', color: '#1A1A22', minHeight: '100vh' }}>
      <Navigation variant="light" />

      <section
        style={{
          padding: 'clamp(80px, 12vw, 140px) 24px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 460, margin: '0 auto' }}>
          {status === 'verifying' && (
            <>
              <Loader2
                size={32}
                color="#6C47FF"
                strokeWidth={2.5}
                style={{
                  animation: 'spin 1s linear infinite',
                  marginBottom: 18,
                }}
              />
              <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
              <h1
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(26px, 3vw, 32px)',
                  letterSpacing: '-0.02em',
                  color: '#1A1A22',
                  margin: '0 0 8px',
                }}
              >
                Signing you in…
              </h1>
              <p
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: 15,
                  color: '#5A5A6E',
                  margin: 0,
                  lineHeight: 1.55,
                }}
              >
                One moment — we&apos;re verifying your link and routing you to your search.
              </p>
            </>
          )}

          {status === 'error' && (
            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(199,62,90,0.22)',
                borderRadius: 16,
                padding: 32,
                textAlign: 'left',
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
              }}
            >
              <AlertCircle size={28} color="#C73E5A" strokeWidth={2.2} style={{ marginBottom: 14 }} />
              <h1
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 900,
                  fontSize: 24,
                  color: '#1A1A22',
                  margin: '0 0 10px',
                }}
              >
                Couldn&apos;t sign you in.
              </h1>
              <p
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: 14.5,
                  color: '#5A5A6E',
                  lineHeight: 1.55,
                  margin: '0 0 22px',
                }}
              >
                {errorMsg}
              </p>
              <Link
                href="/sign-in"
                style={{
                  display: 'inline-block',
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                  color: '#FFFFFF',
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 800,
                  fontSize: 14,
                  borderRadius: 10,
                  textDecoration: 'none',
                  boxShadow: '0 12px 28px rgba(108,71,255,0.20)',
                }}
              >
                Request a new link
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
