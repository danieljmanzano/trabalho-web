export interface Projeto {
  id: number
  nome: string
  categoria: string
  descricao: string | null
  data_inicio: string // "YYYY-MM-DD"
  data_fim: string | null // null = em andamento
  imagem_data: string | null
  imagem_tipo: string | null
  criado_em: string
}

export type ProjetoCreate = Omit<Projeto, "id" | "criado_em">
export type ProjetoUpdate = Partial<ProjetoCreate>

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"

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

export async function getProjetos(): Promise<Projeto[]> {
  return request<Projeto[]>("/projetos/")
}

export async function createProjeto(dados: ProjetoCreate): Promise<Projeto> {
  return request<Projeto>("/projetos/", { method: "POST", body: JSON.stringify(dados) })
}

export async function updateProjeto(id: number, dados: ProjetoUpdate): Promise<Projeto> {
  return request<Projeto>(`/projetos/${id}`, { method: "PUT", body: JSON.stringify(dados) })
}

export async function deleteProjeto(id: number): Promise<void> {
  return request<void>(`/projetos/${id}`, { method: "DELETE" })
}
