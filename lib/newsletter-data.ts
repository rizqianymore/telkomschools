// lib/newsletter-data.ts
// Manajemen langganan berita, buletin vokasi, dan update PPDB SMK Telkom Jakarta

export interface NewsletterSubscriber {
  id: string
  email: string
  subscribedAt: string
  status: "active" | "unsubscribed"
}

export const NEWSLETTER_SUBSCRIBERS: NewsletterSubscriber[] = [
  {
    id: "sub_01",
    email: "alumni.telkom@gmail.com",
    subscribedAt: "2026-08-15T09:00:00Z",
    status: "active",
  },
]

export function addSubscriber(email: string): { success: boolean; message: string; isNew: boolean } {
  const cleanEmail = email.trim().toLowerCase()
  const existing = NEWSLETTER_SUBSCRIBERS.find((s) => s.email === cleanEmail)

  if (existing) {
    if (existing.status === "unsubscribed") {
      existing.status = "active"
      return { success: true, message: "Langganan buletin berita Anda berhasil diaktifkan kembali!", isNew: false }
    }
    return { success: true, message: "Email Anda sudah terdaftar dalam buletin berkala kami.", isNew: false }
  }

  NEWSLETTER_SUBSCRIBERS.push({
    id: `sub_${Date.now()}`,
    email: cleanEmail,
    subscribedAt: new Date().toISOString(),
    status: "active",
  })

  return { success: true, message: "Terima kasih telah berlangganan info PPDB & inovasi SMK Telkom Jakarta!", isNew: true }
}

export function getAllSubscribers(): NewsletterSubscriber[] {
  return [...NEWSLETTER_SUBSCRIBERS]
}
