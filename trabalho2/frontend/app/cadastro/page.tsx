"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { TextInput } from "@/components/input"
import { ErrorBanner } from "@/components/error-banner"
import { Mail, Lock, User } from "lucide-react"
import { signup } from "@/lib/auth"

export default function Cadastro() {
  const router = useRouter()
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmaSenha, setConfirmaSenha] = useState("")
  const [erros, setErros] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmaSenha: "",
    geral: "",
  })

  const validar = () => {
    const novosErros = { nome: "", email: "", senha: "", confirmaSenha: "", geral: "" }
    if (!nome) novosErros.nome = "Nome é obrigatório"
    else if (nome.length < 3) novosErros.nome = "Nome deve ter pelo menos 3 caracteres"
    if (!email) novosErros.email = "Email é obrigatório"
    else if (!email.includes("@")) novosErros.email = "Email inválido"
    if (!senha) novosErros.senha = "Senha é obrigatória"
    else if (senha.length < 6) novosErros.senha = "Senha deve ter pelo menos 6 caracteres"
    if (!confirmaSenha) novosErros.confirmaSenha = "Confirmação de senha é obrigatória"
    else if (confirmaSenha !== senha) novosErros.confirmaSenha = "Senhas não correspondem"
    setErros(novosErros)
    return !Object.entries(novosErros).some(([k, v]) => k !== "geral" && v)
  }

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validar()) return
    try {
      await signup(nome, email, senha)
      router.push("/consultoria")
    } catch (err: unknown) {
      setErros((prev) => ({
        ...prev,
        geral: err instanceof Error ? err.message : "Erro ao cadastrar",
      }))
    }
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="font-serif text-4xl font-bold text-foreground mb-2">
                Criar Conta
              </h1>
              <p className="text-muted-foreground">
                Preencha os dados abaixo para se cadastrar
              </p>
            </div>

            {erros.geral && (
              <ErrorBanner message={erros.geral} className="mb-2" />
            )}

            <form onSubmit={handleCadastro} className="space-y-6">
              <TextInput
                label="Nome completo"
                type="text"
                value={nome}
                onChange={(e) => {
                  setNome(e.target.value)
                  if (erros.nome) setErros({ ...erros, nome: "" })
                }}
                placeholder="Seu nome"
                error={erros.nome}
                icon={<User size={20} />}
              />

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

              <TextInput
                label="Confirme a senha"
                type="password"
                value={confirmaSenha}
                onChange={(e) => {
                  setConfirmaSenha(e.target.value)
                  if (erros.confirmaSenha) setErros({ ...erros, confirmaSenha: "" })
                }}
                placeholder="Confirme a senha"
                error={erros.confirmaSenha}
                icon={<Lock size={20} />}
              />

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3 rounded font-bold hover:opacity-75"
              >
                Cadastrar
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-muted-foreground text-sm">
                Já tem conta?{" "}
                <a href="/login" className="text-primary hover:underline font-medium">
                  Faça login
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
