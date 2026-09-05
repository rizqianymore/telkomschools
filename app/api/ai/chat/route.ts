import { NextResponse } from "next/server"
import { askSchoolAI, type ChatMessage } from "@/lib/aiSupport"
import { runRateLimit } from "@/lib/rateLimit"
import { checkLoginRateLimit } from "@/lib/security"

// Header token rahasia internal diambil murni dari environment variable
export const AI_CLIENT_TOKEN = process.env.NEXT_PUBLIC_AI_CLIENT_SIGNATURE!

// Daftar User-Agent bot scraping atau crawling yang dilarang mengakses AI
const SCRAPER_BOT_REGEX = /(python-requests|aiohttp|curl|wget|scrapy|playwright|puppeteer|selenium|postmanruntime|insomnia|go-http-client|apache-httpclient|headlesschrome|axios|httpclient)/i

export async function POST(request: Request) {
  try {
    // 1. IP Rate Limiting ketat (maksimal 60 req/menit)
    await runRateLimit(request)

    const forwarded = request.headers.get("x-forwarded-for")
    const clientIp = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1"

    // 2. Anti-Scraping: Validasi User-Agent
    const userAgent = request.headers.get("user-agent") || ""
    if (!userAgent || SCRAPER_BOT_REGEX.test(userAgent)) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak (Deteksi automated bot/scraper)." },
        { status: 403 }
      )
    }

    // 3. Anti-Scraping / Anti-Bypass: Validasi Sec-Fetch dan Origin/Referer
    const secFetchSite = request.headers.get("sec-fetch-site")
    if (secFetchSite && !["same-origin", "same-site", "none"].includes(secFetchSite)) {
      return NextResponse.json(
        { success: false, message: "Akses lintas domain (cross-site) tidak diizinkan." },
        { status: 403 }
      )
    }

    // 4. Anti-Scraping: Client Signature Token Header
    const clientSignature = request.headers.get("x-client-signature")
    if (clientSignature !== AI_CLIENT_TOKEN) {
      return NextResponse.json(
        { success: false, message: "Sesi percakapan tidak sah (Invalid Client Signature)." },
        { status: 401 }
      )
    }

    // 5. Anti-Spam: Rate limiting khusus AI (maksimal 15 pertanyaan per 2 menit per IP)
    const aiRateLimit = checkLoginRateLimit(`ai-chat:${clientIp}`, 15, 2 * 60 * 1000)
    if (!aiRateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: `Pertanyaan terlalu cepat. Mohon tunggu ${aiRateLimit.retryAfterSeconds} detik untuk menjaga ketersediaan layanan.`,
        },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { prompt, history } = body as {
      prompt?: string
      history?: ChatMessage[]
    }

    if (!prompt || !prompt.trim()) {
      return NextResponse.json(
        { success: false, message: "Pesan pertanyaan tidak boleh kosong." },
        { status: 400 }
      )
    }

    // Batasi panjang prompt agar tidak dieksploitasi untuk token draining
    if (prompt.trim().length > 600) {
      return NextResponse.json(
        { success: false, message: "Pertanyaan terlalu panjang. Maksimal 600 karakter." },
        { status: 400 }
      )
    }

    const answer = await askSchoolAI(prompt.trim(), history || [])

    return NextResponse.json({
      success: true,
      answer,
    })
  } catch (error: any) {
    if (error?.message === "Rate limit exceeded") {
      return NextResponse.json(
        { success: false, message: "Batas permintaan per menit tercapai. Silakan tunggu sejenak." },
        { status: 429 }
      )
    }

    console.error("AI Support API Error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Layanan asisten AI sedang sibuk. Silakan coba kembali dalam beberapa saat.",
      },
      { status: 500 }
    )
  }
}
