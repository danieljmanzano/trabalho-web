"use client"

import { useEffect, useState } from "react"
import { getProjetos, type Projeto } from "@/lib/api"
import { Calendar, Tag, ImageOff } from "lucide-react"
import { ErrorBanner } from "@/components/error-banner"

const CATEGORIAS = ["Todas", "Residencial", "Comercial", "Reforma", "Regularização"] as const

function formatarPeriodo(dataInicio: string, dataFim: string | null): string {
  const inicio = new Date(dataInicio + "T00:00:00").toLocaleDateString("pt-BR", {
    month: "short",
    year: "numeric",
  })
  if (!dataFim) return `${inicio} – em andamento`
  const fim = new Date(dataFim + "T00:00:00").toLocaleDateString("pt-BR", {
    month: "short",
    year: "numeric",
  })
  return `${inicio} – ${fim}`
}

function ProjetoCard({ projeto }: { projeto: Projeto }) {
  return (
    <article className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 flex flex-col">
      {/* imagem */}
      <div className="aspect-video bg-secondary relative overflow-hidden">
        {projeto.imagem_data ? (
          <img
            src={projeto.imagem_data}
            alt={projeto.nome}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground flex-col gap-2">
            <ImageOff size={32} className="opacity-40" />
            <span className="text-xs opacity-40">Sem imagem</span>
          </div>
        )}

        {/* badge de categoria */}
        <span className="absolute top-3 left-3 flex items-center gap-1.5 bg-background/60 backdrop-blur-sm text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/30">
          <Tag size={11} />
          {projeto.categoria}
        </span>

        {/* badge "em andamento" */}
        {!projeto.data_fim && (
          <span className="absolute top-3 right-3 bg-primary/20 text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/40">
            Em andamento
          </span>
        )}
      </div>

      {/* conteúdo */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h2 className="font-serif text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
          {projeto.nome}
        </h2>

        {projeto.descricao && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {projeto.descricao}
          </p>
        )}

        <div className="mt-auto flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t border-border">
          <Calendar size={13} className="text-primary shrink-0" />
          <span>{formatarPeriodo(projeto.data_inicio, projeto.data_fim)}</span>
        </div>
      </div>
    </article>
  )
}

export default function Portfolio() {
  const [projetos, setProjetos] = useState<Projeto[]>([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>("Todas")

  useEffect(() => {
    getProjetos()
      .then(setProjetos)
      .catch(() => setErro("Erro ao conectar com o servidor. Tente novamente mais tarde."))
      .finally(() => setLoading(false))
  }, [])

  const projetosFiltrados =
    categoriaAtiva === "Todas"
      ? projetos
      : projetos.filter((p) => p.categoria === categoriaAtiva)

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* cabeçalho */}
      <header className="mb-10">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-3">
          Portfólio
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl">
          Conheça alguns dos projetos desenvolvidos com dedicação e expertise técnica.
        </p>
      </header>

      {/* filtros */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIAS.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaAtiva(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
              categoriaAtiva === cat
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* estados */}
      {loading && (
        <div className="flex justify-center items-center py-24">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {erro && !loading && (
        <ErrorBanner message={erro} className="mb-6" />
      )}

      {!loading && !erro && projetosFiltrados.length === 0 && (
        <div className="text-center py-24 text-muted-foreground">
          <p>Nenhum projeto encontrado{categoriaAtiva !== "Todas" ? ` na categoria "${categoriaAtiva}"` : ""}.</p>
        </div>
      )}

      {/* grid */}
      {!loading && !erro && projetosFiltrados.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projetosFiltrados.map((projeto) => (
            <ProjetoCard key={projeto.id} projeto={projeto} />
          ))}
        </div>
      )}
    </div>
  )
}
