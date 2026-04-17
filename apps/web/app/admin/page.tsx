import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import Admin from "@/components/pages/admin/admin"

export const metadata: Metadata = {
  title: "Admin",
}

export default async function AdminPage() {
  const session = await auth()
  if (!session?.user) {
    redirect("/admin/login")
  }

  return <Admin />
}
