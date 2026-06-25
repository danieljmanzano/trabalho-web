"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, X } from "lucide-react"
import { ConsultaCard } from "@/components/consulta"
import {
  Consulta,
  HORARIOS,
  HorarioValue,
  getConsultas,
  getHorariosDisponiveis,
  addConsulta,
  updateConsulta,
  deleteConsulta,
} from "@/lib/consultas"
import { getCurrentUser } from "@/lib/auth"
import { ErrorBanner } from "@/components/error-banner"
import { DateInput, SelectField, TextareaField, TextInput } from "@/components/input"

interface FormState {
  data: string
  horario: HorarioValue | ""
  cliente: string
  descricao: string
}
const FORM_VAZIO: FormState = { data: "", horario: "", cliente: "", descricao: "" }

export default function Consultoria() {
  const router = useRouter()
  const [nomeUsuario, setNomeUsuario] = useState("")
  const [consultas, setConsultas] = useState<Consulta[]>([])
  const [error, setError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [editandoId, setEditandoId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(FORM_VAZIO)
  const [horariosDisponiveis, setHorariosDisponiveis] = useState<HorarioValue[]>([])
  const [erros, setErros] = useState({ data: "", horario: "", cliente: "", geral: "" })

  useEffect(() => {
    const user = getCurrentUser()
    if (!user) {
      router.push("/login")
      return
    }
    setNomeUsuario(user.nome)
    getConsultas()
      .then(setConsultas)
      .catch(() => setError("Erro ao conectar com o servidor. Tente novamente mais tarde."))
  }, [router])

  const atualizarHorarios = (data: string, excluirId?: string) => {
    if (!data) {
      setHorariosDisponiveis(HORARIOS.map((h) => h.value))
      return
    }
    setHorariosDisponiveis(getHorariosDisponiveis(data, consultas, excluirId))
  }

  const abrirCriar = () => {
    setEditandoId(null)
    setForm(FORM_VAZIO)
    setErros({ data: "", horario: "", cliente: "", geral: "" })
    setHorariosDisponiveis(HORARIOS.map((h) => h.value))
    setShowModal(true)
  }

  const abrirEditar = (id: string) => {
    const consulta = consultas.find((c) => c.id === id)
    if (!consulta) return
    setEditandoId(id)
    setForm({
      data: consulta.data,
      horario: consulta.horario,
      cliente: consulta.cliente,
      descricao: consulta.descricao,
    })
    setErros({ data: "", horario: "", cliente: "", geral: "" })
    atualizarHorarios(consulta.data, id)
    setShowModal(true)
  }

  const fecharModal = () => {
    setShowModal(false)
    setEditandoId(null)
    setForm(FORM_VAZIO)
  }

  const handleDataChange = (data: string) => {
    setForm((prev) => ({ ...prev, data, horario: "" }))
    atualizarHorarios(data, editandoId ?? undefined)
    if (erros.data) setErros((prev) => ({ ...prev, data: "" }))
  }

  const validar = (): boolean => {
    const novosErros = { data: "", horario: "", cliente: "", geral: "" }
    if (!form.data) novosErros.data = "Data é obrigatória"
    if (!form.horario) novosErros.horario = "Horário é obrigatório"
    if (!form.cliente.trim()) novosErros.cliente = "Cliente é obrigatório"
    setErros(novosErros)
    return !novosErros.data && !novosErros.horario && !novosErros.cliente
  }

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validar()) return
    try {
      if (editandoId) {
        await updateConsulta(editandoId, {
          data: form.data,
          horario: form.horario as HorarioValue,
          cliente: form.cliente.trim(),
          descricao: form.descricao,
        })
      } else {
        await addConsulta({
          data: form.data,
          horario: form.horario as HorarioValue,
          cliente: form.cliente.trim(),
          descricao: form.descricao,
        })
      }
      const updated = await getConsultas()
      setConsultas(updated)
      fecharModal()
    } catch (err: unknown) {
      setErros((prev) => ({
        ...prev,
        geral: err instanceof Error ? err.message : "Erro ao salvar",
      }))
    }
  }

  const handleDeletar = async (id: string) => {
    if (!confirm("Confirma exclusão desta consulta?")) return
    try {
      await deleteConsulta(id)
      const updated = await getConsultas()
      setConsultas(updated)
    } catch {
      setError("Erro ao conectar com o servidor. Tente novamente mais tarde.")
    }
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <div className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto mb-8 flex items-start justify-between">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-2">
                Agendamentos de <span className="text-primary">Consultoria</span>
              </h1>
              <p className="text-muted-foreground">
                Olá, <strong>{nomeUsuario}</strong>. Gerencie suas consultorias.
              </p>
            </div>
          </div>

          {error && (
            <ErrorBanner message={error} className="max-w-4xl mx-auto mb-6" />
          )}

          <div className="max-w-4xl mx-auto mb-8">
            <button
              onClick={abrirCriar}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded font-bold hover:opacity-75"
            >
              <Plus size={20} />
              Nova Consultoria
            </button>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {consultas.length > 0 ? (
              consultas.map((consulta) => (
                <ConsultaCard
                  key={consulta.id}
                  id={consulta.id}
                  data={consulta.data}
                  horario={consulta.horario}
                  cliente={consulta.cliente}
                  descricao={consulta.descricao}
                  onEdit={abrirEditar}
                  onDelete={handleDeletar}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nenhuma consultoria agendada</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-background/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background border rounded w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="font-serif text-2xl font-bold text-foreground">
                {editandoId ? "Editar Consultoria" : "Nova Consultoria"}
              </h2>
              <button onClick={fecharModal} className="text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSalvar} className="p-6 space-y-5">
              {erros.geral && (
                <ErrorBanner message={erros.geral} />
              )}

              {/* Data */}
              <DateInput
                label="Data"
                value={form.data}
                onChange={(e) => handleDataChange(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                error={erros.data}
              />

              {/* Horário */}
              <SelectField
                label="Horário"
                value={form.horario}
                onChange={(e) => {
                  setForm((prev) => ({ ...prev, horario: e.target.value as HorarioValue }))
                  if (erros.horario) setErros((prev) => ({ ...prev, horario: "" }))
                }}
                disabled={!form.data}
                error={erros.horario}
              >
                <option value="">
                  {form.data ? "Selecione um horário" : "Selecione a data primeiro"}
                </option>
                {horariosDisponiveis.map((valor) => {
                  const h = HORARIOS.find((x) => x.value === valor)
                  return (
                    <option key={valor} value={valor}>
                      {h?.label ?? valor}
                    </option>
                  )
                })}
                {form.data && horariosDisponiveis.length === 0 && (
                  <span className="text-sm text-destructive">
                    Todos os horários desta data estão ocupados
                  </span>
                )}
              </SelectField>

              {/* Cliente */}
              <TextInput
                label="Cliente"
                value={form.cliente}
                onChange={(e) => {
                  setForm((prev) => ({ ...prev, cliente: e.target.value }))
                  if (erros.cliente) setErros((prev) => ({ ...prev, cliente: "" }))
                }}
                placeholder="Nome do cliente"
                error={erros.cliente}
              />

              {/* Descrição */}
              <TextareaField
                label="Descrição (opcional)"
                value={form.descricao}
                onChange={(e) => setForm((prev) => ({ ...prev, descricao: e.target.value }))}
                placeholder="Detalhes da consultoria..."
                rows={3}
              />

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={fecharModal}
                  className="flex-1 py-3 border rounded font-bold hover:opacity-75"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground py-3 rounded font-bold hover:opacity-75"
                >
                  {editandoId ? "Salvar" : "Agendar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}
