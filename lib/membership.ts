'use client'

const MEMBERSHIP_KEY = 'hp_member_email'
const PROFILE_KEY = 'hp_member_profile'

export interface MemberProfile {
  firstName: string
  lastName: string
  /** 'candidate' | 'hiring' | 'both' — captured at checkout */
  role: string
  jobTitle: string
}

/**
 * Check if user is a member
 * Returns false if localStorage is unavailable (SSR guard)
 */
export function isMember(): boolean {
  // Guard against SSR/server-side calls
  if (typeof window === 'undefined') {
    return false
  }

  try {
    const email = localStorage.getItem(MEMBERSHIP_KEY)
    return email !== null && email.trim().length > 0
  } catch {
    return false
  }
}

/**
 * Get the stored member email
 * Returns null if not found or on server
 */
export function getMemberEmail(): string | null {
  // Guard against SSR/server-side calls
  if (typeof window === 'undefined') {
    return null
  }

  try {
    return localStorage.getItem(MEMBERSHIP_KEY)
  } catch {
    return null
  }
}

/**
 * Activate membership by storing email and (optionally) profile fields.
 * Profile is best-effort — passing only an email still works (restore-from-
 * other-device flow has no name data to hand back yet).
 */
export function activateMembership(email: string, profile?: Partial<MemberProfile>): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(MEMBERSHIP_KEY, email)
    if (profile && (profile.firstName || profile.lastName || profile.role || profile.jobTitle)) {
      const normalized: MemberProfile = {
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        role: profile.role || '',
        jobTitle: profile.jobTitle || '',
      }
      localStorage.setItem(PROFILE_KEY, JSON.stringify(normalized))
    }
  } catch {
    // Fail silently in private mode or when localStorage is unavailable
  }
}

/**
 * Return the stored member profile, or null if none was captured. Members
 * who restored from another device won't have a profile until we wire
 * customer-metadata round-tripping on verify-customer.
 */
export function getMemberProfile(): MemberProfile | null {
  if (typeof window === 'undefined') return null

  try {
    const raw = localStorage.getItem(PROFILE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<MemberProfile>
    return {
      firstName: parsed.firstName || '',
      lastName: parsed.lastName || '',
      role: parsed.role || '',
      jobTitle: parsed.jobTitle || '',
    }
  } catch {
    return null
  }
}

/**
 * Clear membership (logout)
 */
export function clearMembership(): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.removeItem(MEMBERSHIP_KEY)
    localStorage.removeItem(PROFILE_KEY)
  } catch {
    // Fail silently
  }
}
