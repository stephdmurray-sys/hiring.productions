import type { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import MisHireCalculator from '@/components/mis-hire-calculator'

const CANONICAL =
  'https://hiring.productions/tools/mis-hire-calculator'

/**
 * /tools/mis-hire-calculator — RepVera-branded free top-of-funnel
 * insight for talent leaders. Lives on hiring.productions in the
 * free-tools section per the spec. The calculator component itself
 * carries RepVera brand chrome internally; the route wraps it in
 * minimal hiring.productions Navigation + Footer so the visitor
 * still has site nav.
 *
 * No tool-gate. This is informational, no Pro required.
 */

export const metadata: Metadata = {
  title: 'True Cost of a Mis-Hire Calculator | RepVera',
  description:
    'How much does a bad hire actually cost? Slide your role, salary, and assumed mis-hire rate. Get a SHRM and DOL-backed exposure range, not a fake-precise number. Free.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: 'website',
    title: 'True Cost of a Mis-Hire',
    description:
      'SHRM and DOL-backed exposure calculator for talent leaders. Free.',
    url: CANONICAL,
  },
}

export default function MisHireCalculatorPage() {
  return (
    <div style={{ background: '#FAFAFB', minHeight: '100vh' }}>
      <Navigation variant="light" />
      <main
        style={{
          padding: 'clamp(48px, 6vw, 80px) 16px',
        }}
      >
        <MisHireCalculator />
      </main>
      <Footer />
    </div>
  )
}
