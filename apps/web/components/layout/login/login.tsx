"use client"

import { type FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import styles from "./styles.module.scss"

export default function Login() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const u = username.trim()
    if (!u || !password) {
      setError("Nhập username và mật khẩu.")
      return
    }

    setError(null)

    const result = await signIn("credentials", {
      username: u,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError("Sai username hoặc password.")
      return
    }

    router.replace("/admin")
    router.refresh()
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.card} onSubmit={handleSubmit} noValidate>
        <h1 className={styles.title}>Login Admin</h1>
        {error ? (
          <p className={styles.error} role="alert">
            {error}
          </p>
        ) : null}
        <label className={styles.field}>
          <span className={styles.label}>Username</span>
          <input
            className={styles.input}
            name="username"
            type="text"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Password</span>
          <input
            className={styles.input}
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" className={styles.submit}>
          Đăng nhập
        </button>
      </form>
    </div>
  )
}
