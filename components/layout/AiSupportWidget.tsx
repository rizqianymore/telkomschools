"use client"

import * as React from "react"
import { cn } from "cn"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Bot,
  X,
  Send,
  Loader2,
  Sparkles,
  ChevronDown,
} from "lucide-react"

interface MessageItem {
  id: string
  role: "user" | "assistant"
  text: string
  time: string
}

// Helper untuk merender teks markdown ringan (bold, link, bullet point) agar rapi di UI
function FormattedMessageText({ text }: { text: string }) {
  const lines = text.split("\n")

  return (
    <div className="space-y-1.5 leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim()
        if (!trimmed) {
          return <div key={idx} className="h-1" />
        }

        // Parse format bold **teks** dan links [teks](url)
        const renderFormattedLine = (str: string) => {
          // Replace link markdown: [text](url) -> <a>
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

        // Jika diawali angka list: 1. atau bullet • / -
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
      text: "Halo! Saya Asisten AI SMK Telkom Jakarta.\nAda yang bisa saya bantu seputar pendaftaran PPDB, jurusan RPL/TKJ/DKV, kurikulum, atau fasilitas sekolah?",
      time: "Baru saja",
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
      }

      setMessages((prev) => [...prev, botMessage])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          role: "assistant",
          text: "Koneksi internet bermasalah. Silakan coba kirim ulang pertanyaan Anda.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
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

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Chat Window */}
      {isOpen && (
        <div
          className={cn(
            "mb-3 flex flex-col w-[350px] sm:w-[390px] h-[530px] max-h-[82vh] rounded-2xl bg-white shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-200"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-primary text-white px-4 py-3.5 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-white text-primary shadow-xs">
                <Bot className="h-4 w-4 text-primary" />
                <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 ring-2 ring-white"></span>
                </span>
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold leading-tight text-white">AI Support Online</span>
                  <span className="rounded-full bg-white/20 text-white px-1.5 py-0.2 text-[9px] font-medium tracking-wide">
                    Aktif
                  </span>
                </div>
                <span className="text-[10px] text-white/80 leading-tight">SMK Telkom Jakarta</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Tutup Chat"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-neutral-50/70 text-xs"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "flex flex-col max-w-[90%]",
                  m.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                )}
              >
                <div
                  className={cn(
                    "rounded-2xl px-3.5 py-2.5 text-xs shadow-xs",
                    m.role === "user"
                      ? "bg-primary text-white rounded-br-xs"
                      : "bg-white border border-neutral-200/80 text-neutral-800 rounded-bl-xs"
                  )}
                >
                  {m.role === "user" ? (
                    <div className="whitespace-pre-wrap">{m.text}</div>
                  ) : (
                    <FormattedMessageText text={m.text} />
                  )}
                </div>
                <span className="text-[10px] text-neutral-400 mt-1 px-1">{m.time}</span>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-neutral-600 bg-white border border-neutral-200/80 rounded-xl px-3.5 py-2 w-fit shadow-xs">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                <span>AI sedang mengetik jawaban...</span>
              </div>
            )}
          </div>

          {/* Quick Question Chips */}
          <div className="px-3 py-2 border-t border-neutral-100 bg-white flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                disabled={loading}
                onClick={() => {
                  setInput(q)
                }}
                className="shrink-0 rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-[10px] font-medium text-neutral-600 hover:border-red-300 hover:bg-red-50 hover:text-primary transition-colors disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSend}
            className="flex items-center gap-2 p-3 bg-white border-t border-neutral-100"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanyakan seputar sekolah..."
              disabled={loading}
              className="flex-1 rounded-xl text-xs h-9 border-neutral-200 bg-neutral-50/50 text-neutral-900 focus-visible:bg-white focus-visible:border-primary focus-visible:ring-primary/20"
            />
            <Button
              type="submit"
              disabled={loading || !input.trim()}
              size="icon"
              className="h-9 w-9 rounded-xl bg-primary text-white shrink-0 hover:bg-red-700 shadow-xs"
              aria-label="Kirim Pesan"
            >
              <Send className="h-3.5 w-3.5" />
            </Button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "group flex items-center gap-2 rounded-full py-2.5 px-4.5 shadow-lg transition-all focus:outline-hidden",
          isOpen
            ? "bg-neutral-900 text-white hover:bg-neutral-800"
            : "bg-primary text-white hover:bg-red-700 hover:shadow-xl hover:scale-105"
        )}
        aria-label="Buka Asisten AI"
      >
        {isOpen ? (
          <>
            <X className="h-4 w-4 text-white" />
            <span className="text-xs font-semibold tracking-wide text-white">Tutup</span>
          </>
        ) : (
          <>
            <div className="relative flex items-center justify-center">
              <Bot className="h-4 w-4 text-white" />
              <Sparkles className="h-2.5 w-2.5 absolute -top-1.5 -right-1.5 text-white animate-pulse" />
            </div>
            <span className="text-xs font-semibold tracking-wide text-white">AI Support Online</span>
          </>
        )}
      </button>
    </div>
  )
}
