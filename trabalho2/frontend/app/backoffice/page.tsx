"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  getProjetos,
  createProjeto,
  updateProjeto,
  deleteProjeto,
  type Projeto,
  type ProjetoCreate,
} from "@/lib/api"
import { getCurrentUser, isAdmin, logout } from "@/lib/auth"
import { TextInput, DateInput, SelectField, TextareaField, FormField } from "@/components/input"
import { ErrorBanner } from "@/components/error-banner"
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  ImageOff,
  Calendar,
  ChevronRight,
  Loader2,
  LogOut,
} from "lucide-react"

// Tipos e helpers

const CATEGORIAS = ["Residencial", "Comercial", "Reforma", "Regularização", "Outro"]

const FORM_VAZIO: ProjetoCreate = {
  nome: "",
  categoria: CATEGORIAS[0],
  descricao: "",
  data_inicio: "",
  data_fim: "",
  imagem_url: "",
}

function formatarPeriodo(dataInicio: string, dataFim: string | null): string {
  const fmt = (d: string) =>
    new Date(d + "T00:00:00").toLocaleDateString("pt-BR", { month: "short", year: "numeric" })
  return dataFim ? `${fmt(dataInicio)} – ${fmt(dataFim)}` : `${fmt(dataInicio)} – em andamento`
}

// Formulário de projeto (criação / edição)

interface FormularioProjetoProps {
  inicial: ProjetoCreate
  titulo: string
  onSalvar: (dados: ProjetoCreate) => Promise<void>
  onCancelar: () => void
}

function FormularioProjeto({ inicial, titulo, onSalvar, onCancelar }: FormularioProjetoProps) {
  const [form, setForm] = useState<ProjetoCreate>(inicial)
  const [erros, setErros] = useState<Partial<Record<keyof ProjetoCreate, string>>>({})
  const [salvando, setSalvando] = useState(false)
  const [imagemFile, setImagemFile] = useState<File | null>(null)

  const set = (campo: keyof ProjetoCreate, valor: string) => {
    setForm((f) => ({ ...f, [campo]: valor }))
    setErros((e) => ({ ...e, [campo]: "" }))
  }

  const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith("image/")) {
      set("imagem_url", "")
      return
    }
    setImagemFile(file)
    const reader = new FileReader()
    reader.onload = () => {
      set("imagem_url", reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const validar = (): boolean => {
    const novos: typeof erros = {}
    if (!form.nome.trim()) novos.nome = "Nome é obrigatório"
    const hoje = new Date().toISOString().split("T")[0]

    if (!form.data_inicio) {
      novos.data_inicio = "Data de início é obrigatória"
    } else if (form.data_inicio > hoje) {
      novos.data_inicio = "A data de início deve ser anterior ou igual a hoje"
    }

    if (form.data_fim) {
      if (form.data_inicio && form.data_fim <= form.data_inicio) {
        novos.data_fim = "A data de conclusão deve ser posterior à data de início"
      } else if (form.data_fim > hoje) {
        novos.data_fim = "A data de conclusão deve ser anterior ou igual a hoje"
      }
    }

    if (!form.imagem_url) novos.imagem_url = "Imagem é obrigatória"

    setErros(novos)
    return Object.keys(novos).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validar()) return
    setSalvando(true)
    try {
      await onSalvar({
        ...form,
        data_fim: form.data_fim || null,
        imagem_url: form.imagem_url || null,
        descricao: form.descricao || null,
      } as ProjetoCreate)
    } finally {
      setSalvando(false)
    }
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
      <h2 className="font-serif text-2xl font-bold text-foreground mb-6">{titulo}</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* nome */}
        <TextInput
          label="Nome do projeto"
          value={form.nome}
          onChange={(e) => set("nome", e.target.value)}
          placeholder="Ex: Residência Família Silva"
          error={erros.nome}
        />

        {/* categoria */}
        <SelectField
          label="Categoria"
          value={form.categoria}
          onChange={(e) => set("categoria", e.target.value)}
          error={erros.categoria}
        >
          {CATEGORIAS.map((c) => (
            <option key={c} value={c} className="bg-secondary">
              {c}
            </option>
          ))}
        </SelectField>

        {/* período */}
        <div className="grid sm:grid-cols-2 gap-4">
          <DateInput
            label="Data de início"
            value={form.data_inicio}
            onChange={(e) => set("data_inicio", e.target.value)}
            max={new Date().toISOString().split("T")[0]}
            error={erros.data_inicio}
          />
          <DateInput
            label={<>Data de fim <span className="text-muted-foreground font-normal">(vazio = em andamento)</span></>}
            value={form.data_fim ?? ""}
            onChange={(e) => set("data_fim", e.target.value)}
            max={new Date().toISOString().split("T")[0]}
            min={form.data_inicio || undefined}
            error={erros.data_fim}
          />
        </div>

        {/* descrição */}
        <TextareaField
          label={<>Descrição <span className="text-muted-foreground font-normal">(opcional)</span></>}
          value={form.descricao ?? ""}
          onChange={(e) => set("descricao", e.target.value)}
          placeholder="Descreva o projeto, materiais usados, desafios, resultados..."
          rows={4}
        />

        {/* imagem url */}
        <FormField label="Imagem do projeto *" error={erros.imagem_url}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImagemChange}
            required={!form.imagem_url}
            className="w-full px-4 py-3 bg-secondary border border-border rounded text-foreground file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:bg-primary file:text-primary-foreground file:text-sm cursor-pointer"
          />
          {form.imagem_url && (
            <img src={form.imagem_url} alt="Preview" className="mt-2 h-24 w-full object-cover rounded border border-border" />
          )}
        </FormField>

        {/* ações */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={salvando}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded font-semibold hover:opacity-80 transition-opacity disabled:opacity-50"
          >
            {salvando ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Check size={16} />
            )}
            Salvar
          </button>
          <button
            type="button"
            onClick={onCancelar}
            className="flex items-center gap-2 bg-secondary text-foreground px-6 py-2.5 rounded font-semibold hover:opacity-80 transition-opacity"
          >
            <X size={16} />
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

// Linha da tabela de projetos

interface LinhaProjetoProps {
  projeto: Projeto
  onEditar: (p: Projeto) => void
  onDeletar: (id: number) => void
  deletando: boolean
}

function LinhaProjeto({ projeto, onEditar, onDeletar, deletando }: LinhaProjetoProps) {
  const [confirmando, setConfirmando] = useState(false)

  return (
    <li className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-secondary/40 rounded-xl border border-border hover:border-border/80 transition-colors">
      {/* thumb */}
      <div className="w-14 h-14 rounded-lg bg-secondary border border-border overflow-hidden shrink-0 flex items-center justify-center">
        {projeto.imagem_url ? (
          <img src={projeto.imagem_url} alt={projeto.nome} className="w-full h-full object-cover" />
        ) : (
          <ImageOff size={20} className="text-muted-foreground opacity-40" />
        )}
      </div>

      {/* info */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-foreground truncate">{projeto.nome}</p>
        <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5 text-xs text-muted-foreground">
          <span className="text-primary font-medium">{projeto.categoria}</span>
          <span className="flex items-center gap-1">
            <Calendar size={11} />
            {formatarPeriodo(projeto.data_inicio, projeto.data_fim)}
          </span>
        </div>
      </div>

      {/* ações */}
      <div className="flex items-center gap-2 shrink-0">
        {confirmando ? (
          <>
            <span className="text-xs text-muted-foreground mr-1">Confirmar exclusão?</span>
            <button
              onClick={() => { onDeletar(projeto.id); setConfirmando(false) }}
              disabled={deletando}
              className="p-2 bg-destructive/20 text-destructive rounded-lg hover:bg-destructive/30 transition-colors"
              title="Confirmar exclusão"
            >
              {deletando ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
            </button>
            <button
              onClick={() => setConfirmando(false)}
              className="p-2 bg-secondary text-muted-foreground rounded-lg hover:text-foreground transition-colors"
              title="Cancelar"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onEditar(projeto)}
              className="p-2 bg-secondary text-muted-foreground rounded-lg hover:text-primary hover:bg-primary/10 transition-colors"
              title="Editar"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => setConfirmando(true)}
              className="p-2 bg-secondary text-muted-foreground rounded-lg hover:text-destructive hover:bg-destructive/10 transition-colors"
              title="Excluir"
            >
              <Trash2 size={16} />
            </button>
          </>
        )}
      </div>
    </li>
  )
}

// Página principal - Backoffice

export default function Backoffice() {
  const router = useRouter()
  const [projetos, setProjetos] = useState<Projeto[]>([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const [exibirForm, setExibirForm] = useState(false)
  const [editando, setEditando] = useState<Projeto | null>(null)
  const [deletando, setDeletando] = useState<number | null>(null)

  useEffect(() => {
    if (!getCurrentUser() || !isAdmin()) {
      router.replace("/login")
    }
  }, [])

  const handleSair = () => {
    logout()
  }

  const carregarProjetos = async () => {
    setLoading(true)
    setErro(null)
    try {
      setProjetos(await getProjetos())
    } catch {
      setErro("Não foi possível carregar os projetos.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { carregarProjetos() }, [])

  const handleCriar = async (dados: ProjetoCreate) => {
    await createProjeto(dados)
    setExibirForm(false)
    await carregarProjetos()
  }

  const handleEditar = async (dados: ProjetoCreate) => {
    if (!editando) return
    await updateProjeto(editando.id, dados)
    setEditando(null)
    await carregarProjetos()
  }

  const handleDeletar = async (id: number) => {
    setDeletando(id)
    try {
      await deleteProjeto(id)
      await carregarProjetos()
    } finally {
      setDeletando(null)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* top bar — only Sair */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleSair}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <LogOut size={16} />
          Sair
        </button>
      </div>

      {/* page header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-serif text-4xl font-bold text-foreground">Backoffice</h1>
          <p className="text-muted-foreground mt-1">Gerenciamento de projetos do portfólio</p>
        </div>
        {!exibirForm && !editando && (
          <button
            onClick={() => setExibirForm(true)}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-semibold hover:opacity-80 transition-opacity"
          >
            <Plus size={18} />
            Novo projeto
          </button>
        )}
      </div>

      {/* formulário de criação */}
      {exibirForm && (
        <div className="mb-8">
          <FormularioProjeto
            inicial={FORM_VAZIO}
            titulo="Novo projeto"
            onSalvar={handleCriar}
            onCancelar={() => setExibirForm(false)}
          />
        </div>
      )}

      {/* formulário de edição */}
      {editando && (
        <div className="mb-8">
          <FormularioProjeto
            inicial={{
              nome: editando.nome,
              categoria: editando.categoria,
              descricao: editando.descricao ?? "",
              data_inicio: editando.data_inicio,
              data_fim: editando.data_fim ?? "",
              imagem_url: editando.imagem_url ?? "",
            }}
            titulo={`Editando: ${editando.nome}`}
            onSalvar={handleEditar}
            onCancelar={() => setEditando(null)}
          />
        </div>
      )}

      {/* lista de projetos */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl font-semibold text-foreground">
            Projetos cadastrados
          </h2>
          {!loading && (
            <span className="text-sm text-muted-foreground">
              {projetos.length} {projetos.length === 1 ? "projeto" : "projetos"}
            </span>
          )}
        </div>

        {loading && (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {erro && !loading && (
          <ErrorBanner message={erro} className="mb-6" />
        )}

        {!loading && !erro && projetos.length === 0 && (
          <div className="text-center py-16 border border-dashed border-border rounded-2xl">
            <p className="text-muted-foreground">Nenhum projeto cadastrado ainda.</p>
          </div>
        )}

        {!loading && !erro && projetos.length > 0 && (
          <ul className="space-y-3">
            {projetos.map((p) => (
              <LinhaProjeto
                key={p.id}
                projeto={p}
                onEditar={setEditando}
                onDeletar={handleDeletar}
                deletando={deletando === p.id}
              />
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
