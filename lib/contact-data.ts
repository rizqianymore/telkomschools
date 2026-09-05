// lib/contact-data.ts
// Manajemen pesan dan pertanyaan formulir kontak SMK Telkom Jakarta

export interface ContactMessage {
  id: string
  name: string
  phone: string
  email: string
  majorInterest: string
  message: string
  createdAt: string
  status: "unread" | "read" | "replied"
}

export const CONTACT_MESSAGES: ContactMessage[] = [
  {
    id: "msg_01",
    name: "Ahmad Fauzi",
    phone: "081298765432",
    email: "ahmad.fauzi@gmail.com",
    majorInterest: "Rekayasa Perangkat Lunak (RPL)",
    message: "Apakah ada program beasiswa prestasi untuk siswa lulusan SMP dari luar Jakarta?",
    createdAt: "2026-09-04T10:30:00Z",
    status: "read",
  },
  {
    id: "msg_02",
    name: "Dewi Lestari",
    phone: "085611223344",
    email: "dewi.lestari@gmail.com",
    majorInterest: "Desain Komunikasi Visual (DKV)",
    message: "Kapan jadwal tes seleksi gelombang 1 dimulai dan apa saja materi ujiannya?",
    createdAt: "2026-09-05T08:15:00Z",
    status: "unread",
  },
]

export function addContactMessage(data: {
  name: string
  phone: string
  email: string
  majorInterest: string
  message: string
}): ContactMessage {
  const newMsg: ContactMessage = {
    id: `msg_${Date.now()}`,
    ...data,
    createdAt: new Date().toISOString(),
    status: "unread",
  }
  CONTACT_MESSAGES.unshift(newMsg)
  return newMsg
}

export function getAllContactMessages(): ContactMessage[] {
  return [...CONTACT_MESSAGES]
}

export function updateContactMessageStatus(id: string, status: "unread" | "read" | "replied"): boolean {
  const msg = CONTACT_MESSAGES.find((m) => m.id === id)
  if (!msg) return false
  msg.status = status
  return true
}
