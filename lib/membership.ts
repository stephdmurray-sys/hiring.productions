'use client'

const MEMBERSHIP_KEY = 'hp_member_email'

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
 * Activate membership by storing email
 */
export function activateMembership(email: string): void {
  // Guard against SSR/server-side calls
  if (typeof window === 'undefined') {
    return
  }

  try {
    localStorage.setItem(MEMBERSHIP_KEY, email)
  } catch {
    // Fail silently in private mode or when localStorage is unavailable
  }
}

/**
 * Clear membership (logout)
 */
export function clearMembership(): void {
  // Guard against SSR/server-side calls
  if (typeof window === 'undefined') {
    return
  }

  try {
    localStorage.removeItem(MEMBERSHIP_KEY)
  } catch {
    // Fail silently
  }
}
