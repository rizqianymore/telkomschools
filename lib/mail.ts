import net from "node:net"
import tls from "node:tls"

export interface SmtpSendResult {
  success: boolean
  message: string
}

export function sendEmailNotification({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}): Promise<SmtpSendResult> {
  return new Promise((resolve) => {
    const host = process.env.SMTP_HOST || "smtp.gmail.com"
    const port = parseInt(process.env.SMTP_PORT || "587", 10)
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS

    if (!user || !pass) {
      return resolve({
        success: false,
        message: "Kredensial SMTP (SMTP_USER / SMTP_PASS) belum disetel di .env.",
      })
    }

    let step = 0
    let isTls = false

    let socket: net.Socket | tls.TLSSocket = net.createConnection(port, host)
    socket.setTimeout(12000)

    const sendCommand = (cmd: string) => {
      socket.write(cmd + "\r\n")
    }

    const upgradeToTls = () => {
      socket.removeAllListeners("data")
      const tlsSocket = tls.connect({
        socket: socket as net.Socket,
        host: host,
        rejectUnauthorized: false,
      })

      tlsSocket.setTimeout(12000)
      socket = tlsSocket

      setupListeners(tlsSocket)
      step = 4
      sendCommand(`EHLO localhost`)
    }

    const setupListeners = (s: net.Socket | tls.TLSSocket) => {
      s.on("data", (data) => {
        const res = data.toString()
        const code = res.slice(0, 3)

        if (step === 0) {
          if (code === "220") {
            step = 1
            sendCommand(`EHLO localhost`)
          }
        } else if (step === 1) {
          if (code === "250") {
            if (port === 587 && !isTls) {
              step = 2
              sendCommand("STARTTLS")
            } else {
              step = 5
              sendAuthPlain()
            }
          }
        } else if (step === 2) {
          if (code === "220") {
            isTls = true
            upgradeToTls()
          } else {
            resolve({ success: false, message: `STARTTLS gagal: ${res.trim()}` })
            s.end()
          }
        } else if (step === 4) {
          if (code === "250") {
            step = 5
            sendAuthPlain()
          }
        } else if (step === 5) {
          if (code === "235") {
            step = 6
            sendCommand(`MAIL FROM:<${user}>`)
          } else {
            resolve({ success: false, message: `Autentikasi gagal: ${res.trim()}` })
            s.end()
          }
        } else if (step === 6) {
          if (code === "250") {
            step = 7
            sendCommand(`RCPT TO:<${to}>`)
          } else {
            resolve({ success: false, message: `Penerima ditolak: ${res.trim()}` })
            s.end()
          }
        } else if (step === 7) {
          if (code === "250") {
            step = 8
            sendCommand("DATA")
          } else {
            resolve({ success: false, message: `Perintah DATA ditolak: ${res.trim()}` })
            s.end()
          }
        } else if (step === 8) {
          if (code === "354") {
            step = 9
            const messageBody = [
              `From: "SMK Telkom Jakarta" <${user}>`,
              `To: <${to}>`,
              `Subject: ${subject}`,
              `MIME-Version: 1.0`,
              `Content-Type: text/html; charset=UTF-8`,
              ``,
              html,
              `.`,
            ].join("\r\n")

            s.write(messageBody + "\r\n")
          }
        } else if (step === 9) {
          if (code === "250") {
            resolve({ success: true, message: `Email sukses terkirim ke ${to}` })
            sendCommand("QUIT")
            s.end()
          } else {
            resolve({ success: false, message: `Pengiriman gagal: ${res.trim()}` })
            s.end()
          }
        }
      })

      s.on("error", (err) => {
        resolve({ success: false, message: `Koneksi SMTP Error: ${err.message}` })
      })

      s.on("timeout", () => {
        s.destroy()
        resolve({ success: false, message: "Koneksi ke SMTP Server timeout." })
      })
    }

    const sendAuthPlain = () => {
      const authStr = `\0${user}\0${pass}`
      const base64 = Buffer.from(authStr).toString("base64")
      sendCommand(`AUTH PLAIN ${base64}`)
    }

    setupListeners(socket)
  })
}
