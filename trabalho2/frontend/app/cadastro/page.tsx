"use client"

import { useState } from "react"
import { TextInput } from "@/components/input"
import { Mail, Lock, User, Upload } from "lucide-react"

export default function Cadastro() {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmaSenha, setConfirmaSenha] = useState("")
  const [imagem, setImagem] = useState<File | null>(null)
  const [erros, setErros] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmaSenha: "",
    imagem: "",
  })

  const validar = () => {
    const novosErros = { nome: "", email: "", senha: "", confirmaSenha: "", imagem: "" }

    if (!nome) {
      novosErros.nome = "Nome é obrigatório"
    } else if (nome.length < 3) {
      novosErros.nome = "Nome deve ter pelo menos 3 caracteres"
    }

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

    if (!confirmaSenha) {
      novosErros.confirmaSenha = "Confirmação de senha é obrigatória"
    } else if (confirmaSenha !== senha) {
      novosErros.confirmaSenha = "Senhas não correspondem"
    }

    if (!imagem) {
      novosErros.imagem = "Imagem é obrigatória"
    }

    setErros(novosErros)
    return !Object.values(novosErros).some((erro) => erro)
  }

  const handleCadastro = (e: React.FormEvent) => {
    e.preventDefault()
    const isValido = validar()
    if (!isValido) {
      return
    }
    // TODO (parte 2 do projeto): aqui seria feito o envio dos dados para o servidor
    console.log("Cadastrando novo usuário:", { nome, email, senha, imagem })
  }

  const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = e.target.files?.[0]
    if (arquivo) {
      if (!arquivo.type.startsWith("image/")) {
        setErros((prev) => ({ ...prev, imagem: "Selecione uma imagem válida" }))
        setImagem(null)
      } else {
        setImagem(arquivo)
        // mantém os erros antigos ...
        setErros((prev) => ({ ...prev, imagem: "" }))
      }
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

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Foto de Perfil
                </label>
                <label className="flex items-center justify-center w-full p-4 border-2 border-dashed rounded cursor-pointer hover:opacity-75">
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="text-primary" size={24} />
                    <span className="text-sm text-muted-foreground">
                      {imagem ? imagem.name : "Clique para selecionar imagem"}
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImagemChange}
                    className="hidden"
                  />
                </label>
                {erros.imagem && (
                  <span className="text-sm text-destructive">{erros.imagem}</span>
                )}
              </div>

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
                <a
                  href="/login"
                  className="text-primary hover:underline font-medium"
                >
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