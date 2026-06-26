const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"
const SESSION_KEY = "session"
const TOKEN_KEY = "token"

export interface User {
  id: string | number
  nome: string
  email: string
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

export async function login(email: string, senha: string): Promise<User> {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail ?? "Email ou senha incorretos")
  }
  const { access_token } = await res.json()
  localStorage.setItem(TOKEN_KEY, access_token)
  // decodifica JWT para pegar as infos do usuário (não precisa validar client-side)
  const payload = JSON.parse(atob(access_token.split(".")[1]))
  const user: User = { id: payload.sub, nome: payload.nome ?? "", email: payload.email ?? email }
  localStorage.setItem(SESSION_KEY, JSON.stringify(user))
  return user
}

export async function signup(nome: string, email: string, senha: string): Promise<User> {
  const res = await fetch(`${API}/auth/cadastro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email, senha }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail ?? "Erro ao criar conta")
  }
  // depois do cadastro, loga automaticamente
  return login(email, senha)
}

export const ADMIN_EMAIL = "newtonepv@gmail.com"

export function isAdmin(): boolean {
  const user = getCurrentUser()
  return user?.email === ADMIN_EMAIL
}

export function logout() {
  localStorage.removeItem(SESSION_KEY)
  localStorage.removeItem(TOKEN_KEY)
  if (typeof window !== "undefined") window.location.href = "/"
}
