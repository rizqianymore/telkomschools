// lib/auth.ts
// Helper untuk mengelola sesi login user di client-side (SMK Telkom Jakarta)

export interface AuthUser {
  id: number
  identifier: string
  email: string
  nis?: string
  nip?: string
  name: string
  role: string
  role_label: string
}

const USER_STORAGE_KEY = "telkom_auth_user"

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

export function setStoredUser(user: AuthUser): void {
  if (typeof window === "undefined") return
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
  window.dispatchEvent(new Event("auth_state_changed"))
}

export function removeStoredUser(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(USER_STORAGE_KEY)
  window.dispatchEvent(new Event("auth_state_changed"))
}
