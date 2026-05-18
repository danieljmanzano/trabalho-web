// Camada de serviço para comunicação com a API de projetos.
// Aponte NEXT_PUBLIC_API_URL para o backend FastAPI em produção.
// Sem a variável definida, usa dados mock locais para desenvolvimento.

export interface Projeto {
  id: number
  nome: string
  categoria: string
  descricao: string | null
  data_inicio: string // "YYYY-MM-DD"
  data_fim: string | null // null = em andamento
  imagem_url: string | null
  criado_em: string
}

export type ProjetoCreate = Omit<Projeto, "id" | "criado_em">
export type ProjetoUpdate = Partial<ProjetoCreate>

// ---------------------------------------------------------------------------
// Dados mock para desenvolvimento sem o backend rodando
// ---------------------------------------------------------------------------

let mockProjetos: Projeto[] = [
  {
    id: 1,
    nome: "Residência Família Souza",
    categoria: "Residencial",
    descricao: "Projeto de construção de residência unifamiliar com 280m², integrando áreas de lazer e ambientes amplos.",
    data_inicio: "2022-03-01",
    data_fim: "2023-08-30",
    imagem_url: null,
    criado_em: new Date().toISOString(),
  },
  {
    id: 2,
    nome: "Reforma Escritório Central",
    categoria: "Comercial",
    descricao: "Reforma completa de escritório corporativo com foco em ergonomia e bem-estar dos colaboradores.",
    data_inicio: "2023-01-15",
    data_fim: "2023-06-30",
    imagem_url: null,
    criado_em: new Date().toISOString(),
  },
  {
    id: 3,
    nome: "Regularização Imóvel Histórico",
    categoria: "Regularização",
    descricao: "Processo de regularização de imóvel histórico junto à prefeitura, incluindo laudos técnicos e projetos complementares.",
    data_inicio: "2024-02-01",
    data_fim: null,
    imagem_url: null,
    criado_em: new Date().toISOString(),
  },
]

let mockNextId = 4

// ---------------------------------------------------------------------------
// Funções de API
// ---------------------------------------------------------------------------

const API_URL = process.env.NEXT_PUBLIC_API_URL

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  })
  if (!res.ok) {
    const detail = await res.text()
    throw new Error(detail || `Erro ${res.status}`)
  }
  if (res.status === 204) return undefined as T
  return res.json()
}

// ---------------------------------------------------------------------------
// getProjetos
// ---------------------------------------------------------------------------
export async function getProjetos(): Promise<Projeto[]> {
  if (!API_URL) {
    return [...mockProjetos].sort(
      (a, b) => new Date(b.data_inicio).getTime() - new Date(a.data_inicio).getTime()
    )
  }
  return request<Projeto[]>("/projetos/")
}

// ---------------------------------------------------------------------------
// createProjeto
// ---------------------------------------------------------------------------
export async function createProjeto(dados: ProjetoCreate): Promise<Projeto> {
  if (!API_URL) {
    const novo: Projeto = { ...dados, id: mockNextId++, criado_em: new Date().toISOString() }
    mockProjetos.push(novo)
    return novo
  }
  return request<Projeto>("/projetos/", { method: "POST", body: JSON.stringify(dados) })
}

// ---------------------------------------------------------------------------
// updateProjeto
// ---------------------------------------------------------------------------
export async function updateProjeto(id: number, dados: ProjetoUpdate): Promise<Projeto> {
  if (!API_URL) {
    const idx = mockProjetos.findIndex((p) => p.id === id)
    if (idx === -1) throw new Error("Projeto não encontrado")
    mockProjetos[idx] = { ...mockProjetos[idx], ...dados }
    return mockProjetos[idx]
  }
  return request<Projeto>(`/projetos/${id}`, { method: "PUT", body: JSON.stringify(dados) })
}

// ---------------------------------------------------------------------------
// deleteProjeto
// ---------------------------------------------------------------------------
export async function deleteProjeto(id: number): Promise<void> {
  if (!API_URL) {
    mockProjetos = mockProjetos.filter((p) => p.id !== id)
    return
  }
  return request<void>(`/projetos/${id}`, { method: "DELETE" })
}
