'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { VerifyClient } from './verify-client'

/**
 * Legacy query-param verification route: /auth/verify?token=XXX&type=magiclink
 *
 * Kept for backward compatibility with any old links. New sign-in emails use
 * the path form (/auth/verify/magiclink/XXX) because email pipelines were
 * mangling the `=` in the query string — see verify-client.tsx for the story.
 */

// useSearchParams must live inside a Suspense boundary for Next.js's
// static export checker. Wrap the working component in Suspense and
// expose a thin outer component as the default export.
export default function VerifyPage() {
  return (
    <Suspense fallback={<VerifyLoading />}>
      <VerifyFromQuery />
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

function VerifyFromQuery() {
  const searchParams = useSearchParams()
  return (
    <VerifyClient token={searchParams.get('token')} type={searchParams.get('type')} />
  )
}
