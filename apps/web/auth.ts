import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { NextResponse } from "next/server"

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials) {
        const username = credentials?.username
        const password = credentials?.password
        if (typeof username !== "string" || typeof password !== "string") {
          return null
        }
        if (
          username === process.env.ADMIN_USERNAME &&
          password === process.env.ADMIN_PASSWORD
        ) {
          return { id: "1", name: "Admin" }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  callbacks: {
    authorized({ request, auth }) {
      const pathname = request.nextUrl.pathname
      const isLoginRoute = pathname === "/admin/login" || pathname.startsWith("/admin/login/")
      const isLoggedIn = !!auth?.user

      if (isLoggedIn && isLoginRoute) {
        return NextResponse.redirect(new URL("/admin", request.nextUrl))
      }
      if (!isLoggedIn && !isLoginRoute) {
        return false
      }
      return true
    },
  },
})
