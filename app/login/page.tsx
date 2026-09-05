"use client"

import { LoginForm } from "@/components/login-form"
import { LoginHeader } from "@/components/sections/login/LoginHeader"
import { LoginVisualBanner } from "@/components/sections/login/LoginVisualBanner"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-white selection:bg-red-600 selection:text-white">
      {/* Left Column: Form & Header */}
      <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-12">
        <LoginHeader />

        <div className="mx-auto my-8 w-full max-w-sm">
          <LoginForm />
        </div>

        <div className="text-center text-xs text-neutral-400 border-t border-neutral-100 pt-4">
          <span>© {new Date().getFullYear()} SMK Telkom Jakarta. All rights reserved.</span>
        </div>
      </div>

      {/* Right Column: Clean Neutral Brand Visual */}
      <LoginVisualBanner />
    </div>
  )
}
