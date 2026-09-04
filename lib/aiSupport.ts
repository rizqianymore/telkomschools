import crypto from "node:crypto"

const API = "https://api.overchat.ai/v1/chat/completions"

const USER_AGENT =
  "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36"

const SYSTEM_PROMPT = `Anda adalah asisten AI resmi dari SMK Telkom Jakarta (Customer Service & Helpdesk Pendidikan).
Tugas Anda adalah melayani dan menjawab pertanyaan calon siswa, siswa, guru, dan orang tua seputar SMK Telkom Jakarta dengan ramah, informatif, dan profesional.

Informasi Resmi SMK Telkom Jakarta:
- Lokasi Kampus: Jl. Daan Mogot KM. 11, Cengkareng Timur, Jakarta Barat, DKI Jakarta 11730
- Telepon: (021) 5451-697 / WhatsApp Admisi: +62 812-3456-7890
- Email: info@smktelkom-jkt.sch.id
- Program Keahlian Unggulan (Akreditasi A Unggul):
  1. Rekayasa Perangkat Lunak (RPL) - Full-Stack Web, Mobile Apps, Cloud & AI.
  2. Teknik Komputer dan Jaringan (TKJ) - Cisco Enterprise Networking, Cybersecurity, Fiber Optic.
  3. Desain Komunikasi Visual (DKV) - UI/UX Design, Motion Graphics, 3D Animation.
- Keunggulan: Kurikulum berbasis industri (Cisco, Microsoft, Oracle), Lab Komputer & Multimedia mutakhir, penyaluran magang & kerja ke 100+ mitra industri teknologi, serta bimbingan masuk PTN favorit.
- Pendaftaran: Dibuka dalam 3 gelombang (Prestasi, Reguler 1, Reguler 2) secara online melalui website atau langsung di kampus.

Instruksi:
- Jawablah menggunakan bahasa Indonesia yang santun, jelas, dan akurat.
- Jika ada hal yang memerlukan konfirmasi biaya atau pendaftaran langsung, arahkan untuk menghubungi WhatsApp atau halaman Kontak.`

export interface ChatMessage {
  role: "user" | "assistant" | "system"
  content: string
}

export async function askSchoolAI(
  prompt: string,
  history: ChatMessage[] = []
): Promise<string> {
  if (!prompt || !prompt.trim()) {
    throw new Error("Pesan pertanyaan tidak boleh kosong.")
  }

  const chatId = crypto.randomUUID()
  const deviceId = crypto.randomUUID()
  const model = "alibaba/qwen3-next-80b-a3b-instruct"

  const messages = [
    {
      id: crypto.randomUUID(),
      role: "system",
      content: SYSTEM_PROMPT,
    },
    ...history.slice(-6).map((item) => ({
      id: crypto.randomUUID(),
      role: item.role,
      content: item.content,
    })),
    {
      id: crypto.randomUUID(),
      role: "user",
      content: prompt.trim(),
    },
  ]

  const body = {
    chatId,
    model,
    messages,
    personaId: "qwen-3-landing",
    frequency_penalty: 0,
    max_tokens: 1500,
    presence_penalty: 0,
    stream: true,
    temperature: 0.6,
    top_p: 0.95,
  }

  const headers = {
    "sec-ch-ua-platform": `"Android"`,
    "x-device-uuid": deviceId,
    "sec-ch-ua": `"Google Chrome";v="147", "Not.A/Brand";v="8", "Chromium";v="147"`,
    "sec-ch-ua-mobile": "?1",
    "x-device-language": "id-ID",
    "x-device-platform": "web",
    "x-device-version": "1.0.44",
    "user-agent": USER_AGENT,
    accept: "*/*",
    "content-type": "application/json",
    origin: "https://overchat.ai",
    referer: "https://overchat.ai/",
    "accept-language": "id-ID,id;q=0.9,en-US;q=0.8",
  }

  const response = await fetch(API, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const text = await response.text().catch(() => "")
    throw new Error(`AI Gateway Error (${response.status}): ${text.slice(0, 150) || response.statusText}`)
  }

  const reader = response.body?.getReader()
  if (!reader) {
    throw new Error("Tidak ada aliran stream body dari server AI.")
  }

  const decoder = new TextDecoder()
  let buffer = ""
  let answer = ""

  while (true) {
    const { value, done } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split("\n")
    buffer = lines.pop() || ""

    for (const rawLine of lines) {
      const line = rawLine.trim()
      if (!line.startsWith("data:")) continue

      const data = line.slice(5).trim()
      if (!data || data === "[DONE]") continue

      try {
        const json = JSON.parse(data)
        const content = json.choices?.[0]?.delta?.content
        if (typeof content === "string") answer += content
      } catch (_) {}
    }
  }

  const finalAnswer = answer.trim()
  if (!finalAnswer) {
    throw new Error("Respon AI kosong dari server.")
  }

  return finalAnswer
}
