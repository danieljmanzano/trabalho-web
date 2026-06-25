export const HORARIOS = [
  { label: "08:00 - 10:00", value: "08:00-10:00" },
  { label: "10:30 - 12:30", value: "10:30-12:30" },
  { label: "14:00 - 16:00", value: "14:00-16:00" },
  { label: "16:30 - 18:30", value: "16:30-18:30" },
] as const

export type HorarioValue = (typeof HORARIOS)[number]["value"]

export interface Consulta {
  id: string
  data: string
  horario: HorarioValue
  cliente: string
  descricao: string
  criadoEm: string
}

const BASE = "http://localhost:8000/consultas"

export async function getConsultas(): Promise<Consulta[]> {
  const res = await fetch(BASE)
  if (!res.ok) throw new Error(`Erro ${res.status} ao buscar consultas`)
  const data = await res.json()
  return (data as Consulta[]).sort(
    (a, b) => a.data.localeCompare(b.data) || a.horario.localeCompare(b.horario)
  )
}

export async function addConsulta(payload: {
  data: string
  horario: HorarioValue
  cliente: string
  descricao: string
}): Promise<Consulta> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Erro ${res.status} ao criar consulta`)
  return res.json()
}

export async function updateConsulta(
  id: string,
  payload: { data: string; horario: HorarioValue; cliente: string; descricao: string }
): Promise<Consulta> {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Erro ${res.status} ao atualizar consulta`)
  return res.json()
}

export async function deleteConsulta(id: string): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" })
  if (!res.ok) throw new Error(`Erro ${res.status} ao excluir consulta`)
}

export function getHorariosDisponiveis(
  data: string,
  consultas: Consulta[],
  excludeId?: string
): HorarioValue[] {
  const taken = consultas
    .filter((c) => c.data === data && c.id !== excludeId)
    .map((c) => c.horario)
  return HORARIOS.filter((h) => !taken.includes(h.value)).map((h) => h.value)
}

export function getLabelHorario(value: string): string {
  return HORARIOS.find((h) => h.value === value)?.label ?? value
}
