import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { verifySessionToken } from "@/lib/security"

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get("telkom_auth_session")?.value

  if (!token) {
    redirect("/login")
  }

  const session = verifySessionToken(token)
  if (!session) {
    redirect("/login")
  }

  if (session.role === "guru") {
    redirect("/dashboard/guru")
  } else if (session.role === "staff") {
    redirect("/dashboard/staff")
  } else {
    redirect("/dashboard/siswa")
  }
}
