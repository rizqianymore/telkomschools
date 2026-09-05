import crypto from "node:crypto"

// Rahasia server untuk signing token session (wajib dikonfigurasi di file .env)
const SESSION_SECRET = process.env.SESSION_SECRET || ""
if (!SESSION_SECRET && process.env.NODE_ENV === "production") {
  console.warn("PERINGATAN KEAMANAN: SESSION_SECRET belum dikonfigurasi di file environment (.env)!")
}
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

    const sigBuffer = Buffer.from(signature)
    const expectedSigBuffer = Buffer.from(expectedSignature)
    if (sigBuffer.length !== expectedSigBuffer.length) return null
    if (!crypto.timingSafeEqual(sigBuffer, expectedSigBuffer)) return null

    const payload: AuthSessionPayload = JSON.parse(
      Buffer.from(payloadBase64, "base64url").toString("utf-8")
    )

    const now = Math.floor(Date.now() / 1000)
    if (payload.exp < now) return null

    return payload
  } catch {
    return null
  }
}

/**
 * 5. Rate Limiter In-Memory (Proteksi Brute-Force Login & OTP)
 */
interface RateLimitRecord {
  attempts: number
  resetTime: number
}

const rateLimitMap = new Map<string, RateLimitRecord>()

export function checkLoginRateLimit(key: string, maxAttempts = 5, windowMs = 5 * 60 * 1000): {
  allowed: boolean
  remainingAttempts: number
  retryAfterSeconds?: number
} {
  const now = Date.now()
  const record = rateLimitMap.get(key)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { attempts: 1, resetTime: now + windowMs })
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
  rateLimitMap.delete(key)
}

/**
 * 6. OTP Storage & Verification Memory Store
 */
interface OtpRecord {
  email: string
  otpHash: string
  expiresAt: number
  attempts: number
}

const otpStore = new Map<string, OtpRecord>()

export function generateSecureOtp(length = 6): string {
  // Generate digit numerik kriptografis aman
  const randomBytes = crypto.randomBytes(length)
  let otp = ""
  for (let i = 0; i < length; i++) {
    otp += (randomBytes[i] % 10).toString()
  }
  return otp
}

export function createAndStoreOtp(email: string, minutesValid = 10): string {
  const cleanEmail = email.trim().toLowerCase()
  const rawOtp = generateSecureOtp(6)
  const otpHash = crypto.createHash("sha256").update(rawOtp).digest("hex")

  otpStore.set(cleanEmail, {
    email: cleanEmail,
    otpHash,
    expiresAt: Date.now() + minutesValid * 60 * 1000,
    attempts: 0,
  })

  return rawOtp
}

export function verifyStoredOtp(email: string, inputOtp: string): { success: boolean; message: string } {
  const cleanEmail = email.trim().toLowerCase()
  const record = otpStore.get(cleanEmail)

  if (!record) {
    return { success: false, message: "Kode OTP belum diminta atau telah kedaluwarsa." }
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(cleanEmail)
    return { success: false, message: "Kode OTP telah kedaluwarsa. Silakan minta kode baru." }
  }

  if (record.attempts >= 4) {
    otpStore.delete(cleanEmail)
    return { success: false, message: "Terlalu banyak percobaan kode OTP yang salah. Silakan minta kode baru." }
  }

  record.attempts += 1
  const inputHash = crypto.createHash("sha256").update(inputOtp.trim()).digest("hex")

  if (crypto.timingSafeEqual(Buffer.from(inputHash), Buffer.from(record.otpHash))) {
    // Hanguskan OTP setelah berhasil diverifikasi (One-Time Use)
    otpStore.delete(cleanEmail)
    return { success: true, message: "Kode OTP valid." }
  }

  return { success: false, message: `Kode OTP tidak sesuai. Sisa kesempatan: ${4 - record.attempts}` }
}

/**
 * 7. Signed Password Reset Token
 * Menghasilkan token reset berumur pendek (15 menit) setelah OTP sukses diverifikasi
 */
export function createPasswordResetToken(email: string): string {
  const payload = {
    email: email.trim().toLowerCase(),
    exp: Math.floor(Date.now() / 1000) + 15 * 60, // 15 menit
  }
  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64url")
  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(`reset:${payloadBase64}`)
    .digest("base64url")

  return `${payloadBase64}.${signature}`
}

export function verifyPasswordResetToken(token: string): string | null {
  try {
    const parts = token.split(".")
    if (parts.length !== 2) return null
    const [payloadBase64, signature] = parts
    const expected = crypto
      .createHmac("sha256", SESSION_SECRET)
      .update(`reset:${payloadBase64}`)
      .digest("base64url")

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
      return null
    }

    const payload = JSON.parse(Buffer.from(payloadBase64, "base64url").toString("utf-8"))
    if (payload.exp < Math.floor(Date.now() / 1000)) return null

    return payload.email
  } catch {
    return null
  }
}
