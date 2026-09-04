"use client"

import * as React from "react"
import { cn } from "cn"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  X,
  Send,
  Loader2,
  ChevronDown,
  Headphones,
  User,
  MessageCircle,
  ExternalLink,
  RotateCcw,
} from "lucide-react"

interface MessageItem {
  id: string
  role: "user" | "assistant"
  text: string
  time: string
  showActionButtons?: boolean
}

// Helper untuk merender teks markdown ringan (bold, link, bullet point)
function FormattedMessageText({ text }: { text: string }) {
  const lines = text.split("\n")

  return (
    <div className="space-y-1.5 leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim()
        if (!trimmed) {
          return <div key={idx} className="h-1" />
        }

        const renderFormattedLine = (str: string) => {
          const parts = str.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g)
          return parts.map((part, pIdx) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={pIdx} className="font-semibold text-neutral-900">
                  {part.slice(2, -2)}
                </strong>
              )
            }
            const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/)
            if (linkMatch) {
              return (
                <a
                  key={pIdx}
                  href={linkMatch[2]}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-primary hover:underline underline-offset-2"
                >
                  {linkMatch[1]}
                </a>
              )
            }
            return part
          })
        }

        const listMatch = trimmed.match(/^(\d+\.|\•|\-)\s+(.*)/)
        if (listMatch) {
          const marker = listMatch[1]
          const content = listMatch[2]
          return (
            <div key={idx} className="flex items-start gap-1.5 pl-0.5">
              <span className="font-semibold text-primary shrink-0 text-[11px] mt-0.5">
                {marker}
              </span>
              <span className="flex-1">{renderFormattedLine(content)}</span>
            </div>
          )
        }

        return <div key={idx}>{renderFormattedLine(line)}</div>
      })}
    </div>
  )
}

export function AiSupportWidget() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [input, setInput] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [messages, setMessages] = React.useState<MessageItem[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Halo! Saya CS Virtual SMK Telkom Jakarta.\nAda yang bisa kami bantu seputar pendaftaran PPDB, jurusan RPL/TKJ/DKV, atau informasi sekolah?",
      time: "Baru saja",
      showActionButtons: true,
    },
  ])

  const chatContainerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages, loading])

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const prompt = input.trim()
    if (!prompt || loading) return

    const now = new Date()
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    const userMessage: MessageItem = {
      id: `user-${Date.now()}`,
      role: "user",
      text: prompt,
      time: timeStr,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const history = messages.slice(-5).map((m) => ({
        role: m.role,
        content: m.text,
      }))

      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, history }),
      })

      const data = await res.json()

      const botMessage: MessageItem = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        text: data.success
          ? data.answer
          : data.message || "Mohon maaf, terjadi kendala teknis sementara.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        showActionButtons: true,
      }

      setMessages((prev) => [...prev, botMessage])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          role: "assistant",
          text: "Koneksi terputus. Silakan periksa jaringan Anda atau hubungi kami langsung via WhatsApp.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          showActionButtons: true,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const quickQuestions = [
    "Apa saja jurusan di SMK Telkom?",
    "Bagaimana alur daftar PPDB?",
    "Di mana alamat kampus Jakarta?",
  ]

  const handleResetChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        text: "Halo! Saya CS Virtual SMK Telkom Jakarta.\nAda yang bisa kami bantu seputar pendaftaran PPDB, jurusan RPL/TKJ/DKV, atau informasi sekolah?",
        time: "Baru saja",
        showActionButtons: true,
      },
    ])
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Floating Chat Window - Tanpa border putih tebal, menyatu alami */}
      {isOpen && (
        <div
          className={cn(
            "mb-3 flex flex-col w-[360px] sm:w-[410px] h-[550px] max-h-[85vh] rounded-xl bg-white shadow-2xl overflow-hidden border border-neutral-200"
          )}
        >
          {/* CS Header - Warna solid alami tanpa aksen mencolok */}
          <div className="flex items-center justify-between bg-primary text-white px-4 py-3">
            <div className="flex items-center gap-2.5">
              {/* CS Avatar */}
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white shrink-0">
                <Headphones className="h-4 w-4 text-white" />
                <span className="absolute bottom-0 right-0 flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold leading-tight text-white">Customer Support AI</span>
                  <span className="rounded bg-white/20 text-white px-1.5 py-0.2 text-[10px] font-medium">
                    Online
                  </span>
                </div>
                <span className="text-[11px] text-red-100 leading-tight">SMK Telkom Jakarta</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleResetChat}
                className="rounded-md p-1.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                title="Mulai Ulang Percakapan"
                aria-label="Reset Chat"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-md p-1.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                title="Tutup"
                aria-label="Tutup Chat"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50 text-xs"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "flex items-start gap-2 max-w-[90%]",
                  m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                )}
              >
                {/* Profile Avatar Icon - Tanpa border putih tebal */}
                <div
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold mt-0.5",
                    m.role === "user"
                      ? "bg-primary text-white"
                      : "bg-red-50 text-primary"
                  )}
                >
                  {m.role === "user" ? (
                    <User className="h-3.5 w-3.5 text-white" />
                  ) : (
                    <Headphones className="h-3.5 w-3.5 text-primary" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={cn(
                    "flex flex-col space-y-2",
                    m.role === "user" ? "items-end" : "items-start"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-lg px-3.5 py-2.5 text-xs leading-relaxed",
                      m.role === "user"
                        ? "bg-primary text-white"
                        : "bg-white text-neutral-800 border border-neutral-200"
                    )}
                  >
                    {m.role === "user" ? (
                      <div className="whitespace-pre-wrap">{m.text}</div>
                    ) : (
                      <FormattedMessageText text={m.text} />
                    )}
                  </div>

                  {/* 2 Tombol Terintegrasi Langsung di Dalam Chat Balasan CS */}
                  {m.role === "assistant" && m.showActionButtons && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                      <a
                        href="https://wa.me/6281234567890?text=Halo%20Admin%20SMK%20Telkom%20Jakarta,%20saya%20ingin%20bertanya%20seputar%20pendaftaran"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-2.5 py-1.5 text-[11px] font-medium text-white hover:bg-emerald-700 transition-colors"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span>Chat WhatsApp Admin</span>
                      </a>
                      <a
                        href="https://smktelkom-jkt.sch.id"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-md bg-white border border-neutral-300 px-2.5 py-1.5 text-[11px] font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"
                      >
                        <span>Website Resmi</span>
                        <ExternalLink className="h-3 w-3 text-neutral-500" />
                      </a>
                    </div>
                  )}

                  <span className="text-[10px] text-neutral-400 px-0.5">{m.time}</span>
                </div>
              </div>
            ))}

            {/* Claude-like thinking / processing state */}
            {loading && (
              <div className="flex items-start gap-2 max-w-[90%] mr-auto">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-50 text-primary mt-0.5">
                  <Headphones className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-600 bg-white border border-neutral-200 rounded-lg px-3.5 py-2">
                  <span className="flex items-center gap-1 text-primary">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce"></span>
                  </span>
                  <span className="text-[11px] text-neutral-500">Menganalisis pertanyaan...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Question Chips - Alami tanpa border tebal */}
          <div className="px-3 py-1.5 border-t border-neutral-200 bg-white flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                disabled={loading}
                onClick={() => {
                  setInput(q)
                }}
                className="shrink-0 rounded-md border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-[10px] font-medium text-neutral-600 hover:border-red-300 hover:text-primary transition-colors disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Form with Send Button */}
          <form
            onSubmit={handleSend}
            className="flex items-center gap-2 p-3 bg-white border-t border-neutral-200"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanyakan sesuatu ke CS..."
              disabled={loading}
              className="flex-1 rounded-md text-xs h-10 border-neutral-300 bg-white text-neutral-900 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
            />
            <Button
              type="submit"
              disabled={loading || !input.trim()}
              className="h-10 px-4 rounded-md shrink-0 gap-1.5 font-medium text-xs"
              aria-label="Kirim Pesan"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <span>Kirim</span>
                  <Send className="h-3.5 w-3.5" />
                </>
              )}
            </Button>
          </form>
        </div>
      )}

      {/* Floating Launcher Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 rounded-md py-2.5 px-4 shadow-sm border transition-colors focus:outline-none",
          isOpen
            ? "bg-neutral-900 border-neutral-800 text-white hover:bg-neutral-800"
            : "bg-primary border-transparent text-white hover:bg-primary/90"
        )}
        aria-label="Buka Customer Support"
      >
        {isOpen ? (
          <>
            <X className="h-4 w-4 text-white" />
            <span className="text-xs font-medium text-white">Tutup CS</span>
          </>
        ) : (
          <>
            <div className="relative flex items-center justify-center">
              <Headphones className="h-4 w-4 text-white" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
            </div>
            <span className="text-xs font-medium text-white">Customer Service AI</span>
          </>
        )}
      </button>
    </div>
  )
}
