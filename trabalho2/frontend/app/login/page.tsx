"use client"

import { useState } from "react"
import { TextInput } from "@/components/input"
import { Mail, Lock } from "lucide-react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erros, setErros] = useState({ email: "", senha: "" })

  const validar = () => {
    const novosErros = { email: "", senha: "" }

    if (!email) {
      novosErros.email = "Email é obrigatório"
    } else if (!email.includes("@")) {
      novosErros.email = "Email inválido"
    }

    if (!senha) {
      novosErros.senha = "Senha é obrigatória"
    } else if (senha.length < 6) {
      novosErros.senha = "Senha deve ter pelo menos 6 caracteres"
    }

    setErros(novosErros)
    return !novosErros.email && !novosErros.senha
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const isValido = validar()
    if (!isValido) {
      return
    }
    // Aqui você faria o envio dos dados para o servidor
    console.log("Fazendo login com:", { email, senha })
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">

      <div className="flex-1 flex items-center justify-center">
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="font-serif text-4xl font-bold text-foreground mb-2">
                Bem-vindo
              </h1>
              <p className="text-muted-foreground">
                Entre com suas credenciais
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <TextInput
                label="Email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (erros.email) setErros({ ...erros, email: "" })
                }}
                placeholder="seu@email.com"
                error={erros.email}
                icon={<Mail size={20} />}
              />

              <TextInput
                label="Senha"
                type="password"
                value={senha}
                onChange={(e) => {
                  setSenha(e.target.value)
                  if (erros.senha) setErros({ ...erros, senha: "" })
                }}
                placeholder="Mínimo 6 caracteres"
                error={erros.senha}
                icon={<Lock size={20} />}
              />

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3 rounded font-bold hover:opacity-75"
              >
                Entrar
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-muted-foreground text-sm">
                Não tem conta?{" "}
                <a
                  href="/cadastro"
                  className="text-primary hover:underline font-medium"
                >
                  Cadastre-se
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}