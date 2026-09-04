import crypto from "node:crypto"

// Rahasia server untuk signing token session (gunakan ENV di produksi atau fallback dev yang stabil)
const SESSION_SECRET = process.env.SESSION_SECRET || "telkom-schools-production-secure-key-2026"
const TOKEN_MAX_AGE_SECONDS = 60 * 60 * 24 * 7 // 7 hari

export interface AuthSessionPayload {
  userId: number
  identifier: string
  email: string
  name: string
  role: "siswa" | "ortu" | "guru" | "staff"
  role_label: string
  exp: number
  iat: number
}

/**
 * 1. Password Hashing Menggunakan Node.js Crypto (Scrypt + Salt)
 * Standar OWASP: Aman dari brute-force dan rainbow table attacks.
 */
export async function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString("hex")
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err)
      resolve(`${salt}:${derivedKey.toString("hex")}`)
    })
  })
}

/**
 * 2. Timing-Safe Password Verification
 * Mencegah Timing Attacks (Side-channel analysis).
 */
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  // Jika formatnya plaintext (backward-compatibility demo), hash on the fly
  if (!storedHash.includes(":")) {
    const a = Buffer.from(password)
    const b = Buffer.from(storedHash)
    if (a.length !== b.length) return false
    return crypto.timingSafeEqual(a, b)
  }

  return new Promise((resolve) => {
    const [salt, key] = storedHash.split(":")
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) return resolve(false)
      const keyBuffer = Buffer.from(key, "hex")
      if (keyBuffer.length !== derivedKey.length) return resolve(false)
      resolve(crypto.timingSafeEqual(keyBuffer, derivedKey))
    })
  })
}

/**
 * 3. HMAC-SHA256 Stateless Signed Session Token
 * Standar Google: Memastikan token anti-tampering (tidak bisa dimanipulasi client).
 */
export function createSessionToken(
  user: Omit<AuthSessionPayload, "exp" | "iat">
): string {
  const iat = Math.floor(Date.now() / 1000)
  const exp = iat + TOKEN_MAX_AGE_SECONDS

  const payload: AuthSessionPayload = {
    ...user,
    iat,
    exp,
  }

  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64url")
  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(payloadBase64)
    .digest("base64url")

  return `${payloadBase64}.${signature}`
}

/**
 * 4. Token Verification & Payload Extraction
 */
export function verifySessionToken(token: string): AuthSessionPayload | null {
  try {
    const parts = token.split(".")
    if (parts.length !== 2) return null

    const [payloadBase64, signature] = parts
    const expectedSignature = crypto
      .createHmac("sha256", SESSION_SECRET)
      .update(payloadBase64)
      .digest("base64url")

    // Verifikasi tanda tangan kriptografis dengan timingSafeEqual
    const sigBuffer = Buffer.from(signature)
    const expectedSigBuffer = Buffer.from(expectedSignature)
    if (sigBuffer.length !== expectedSigBuffer.length) return null
    if (!crypto.timingSafeEqual(sigBuffer, expectedSigBuffer)) return null

    const payload: AuthSessionPayload = JSON.parse(
      Buffer.from(payloadBase64, "base64url").toString("utf-8")
    )

    // Cek kedaluwarsa token
    const now = Math.floor(Date.now() / 1000)
    if (payload.exp < now) return null

    return payload
  } catch {
    return null
  }
}

/**
 * 5. Rate Limiter In-Memory (Proteksi Brute-Force Login)
 * Membatasi maksimal 5 percobaan login gagal per identifier/IP dalam 5 menit.
 */
interface RateLimitRecord {
  attempts: number
  resetTime: number
}

const loginRateLimitMap = new Map<string, RateLimitRecord>()

export function checkLoginRateLimit(key: string, maxAttempts = 5, windowMs = 5 * 60 * 1000): {
  allowed: boolean
  remainingAttempts: number
  retryAfterSeconds?: number
} {
  const now = Date.now()
  const record = loginRateLimitMap.get(key)

  if (!record || now > record.resetTime) {
    loginRateLimitMap.set(key, { attempts: 1, resetTime: now + windowMs })
    return { allowed: true, remainingAttempts: maxAttempts - 1 }
  }

  if (record.attempts >= maxAttempts) {
    const retryAfterSeconds = Math.ceil((record.resetTime - now) / 1000)
    return { allowed: false, remainingAttempts: 0, retryAfterSeconds }
  }

  record.attempts += 1
  return { allowed: true, remainingAttempts: maxAttempts - record.attempts }
}

export function resetLoginRateLimit(key: string) {
  loginRateLimitMap.delete(key)
}
