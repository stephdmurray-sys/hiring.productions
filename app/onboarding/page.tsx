import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { OnboardingClient } from './onboarding-client'

/**
 * Onboarding — captures the visitor's target role + current scene so every
 * downstream tool can auto-personalize. This is the Stage 1 moment that
 * turns a brand-new account into a USED account.
 *
 * Per PLATFORM-VISION.md (Stage 1 + the Nunes & Drèze 2006 endowed-progress
 * effect): saving a target role + completing onboarding both count as
 * pre-completed steps. New accounts emerge from this flow already at 2-of-8
 * on the progress bar, which measurably raises completion rates.
 *
 * Server component: pulls existing profile/target_role state and bounces
 * already-onboarded users straight to the dashboard.
 */
export default async function OnboardingPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/sign-in?next=/onboarding')
  }

  // If the user has already onboarded, send them to the dashboard.
  // (The auth callback usually does this, but a direct nav to /onboarding
  // for a re-signed-in user would otherwise show the wizard again.)
  const { data: profile } = await supabase
    .from('profiles')
    .select('current_scene')
    .eq('id', user.id)
    .maybeSingle()

  if (profile?.current_scene) {
    redirect('/dashboard')
  }

  return <OnboardingClient userEmail={user.email ?? ''} />
}
