"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { getCurrentUser, logout } from "@/lib/auth"

export function Header() {
  const pathname = usePathname()
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    setLoggedIn(!!getCurrentUser())
  }, [])

  const handleSair = (e: React.MouseEvent) => {
    e.preventDefault()
    logout()
    window.location.href = "/"
  }

  const linkClass = (href: string) =>
    `text-sm hover:text-primary ${pathname === href ? "text-primary font-bold" : "text-foreground"}`

  return (
    <header className="bg-background border-b">
      {/* justify-between: espaço máximo entre os filhos */}
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="flex flex-col">
          <span className="text-primary font-serif text-2xl font-bold">
            Adriana Gomes de Oliveira
          </span>
          <span className="text-muted-foreground text-xs uppercase">
            Arquitetura
          </span>
        </a>

        <nav className="flex gap-8">
          <a href="/" className={linkClass("/")}>
            Início
          </a>
          <a href="/portfolio" className={linkClass("/portfolio")}>
            Portfólio
          </a>
          {loggedIn && (
            <a href="/consultoria" className={linkClass("/consultoria")}>
              Agendamentos
            </a>
          )}
          {loggedIn ? (
            <a href="#" onClick={handleSair} className="text-sm hover:text-primary text-foreground">
              Sair
            </a>
          ) : (
            <>
              <a href="/login" className={linkClass("/login")}>
                Login
              </a>
              <a href="/cadastro" className={linkClass("/cadastro")}>
                Cadastro
              </a>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
