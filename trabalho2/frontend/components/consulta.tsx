"use client"

import { Trash2, Edit, Calendar, Clock } from "lucide-react"
import { getLabelHorario } from "@/lib/consultas"

interface ConsultaCardProps {
  id: string
  data: string
  horario: string
  cliente: string
  descricao?: string
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function ConsultaCard({
  id,
  data,
  horario,
  cliente,
  descricao,
  onEdit,
  onDelete,
}: ConsultaCardProps) {
  const dataFormatada = new Date(data + "T00:00:00").toLocaleDateString("pt-BR")

  return (
    <div className="bg-card border p-6 flex gap-4 rounded">
      <div className="flex-1">
        <h3 className="text-lg font-bold text-foreground mb-3">{cliente}</h3>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar size={18} className="text-primary" />
            <span>{dataFormatada}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock size={18} className="text-primary" />
            <span>{getLabelHorario(horario)}</span>
          </div>
        </div>

        {descricao && (
          <p className="mt-3 text-sm text-muted-foreground">{descricao}</p>
        )}
      </div>

      <div className="flex gap-2 items-start">
        <button
          onClick={() => onEdit(id)}
          className="p-2 bg-secondary text-primary rounded hover:opacity-75"
          title="Editar"
        >
          <Edit size={20} />
        </button>
        <button
          onClick={() => onDelete(id)}
          className="p-2 bg-destructive text-white rounded hover:opacity-75"
          title="Deletar"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  )
}
