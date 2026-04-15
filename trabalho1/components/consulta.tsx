import { Trash2, Edit, Calendar, Clock } from "lucide-react"

interface ConsultaCardProps {
  id: string
  data: string
  hora: string
  duracao: string
  cliente?: string
}

export function ConsultaCard({ id, data, hora, duracao, cliente }: ConsultaCardProps) {
  return (
    <div className="bg-card border p-6 flex gap-4 rounded">
      {/* informações da consultoria */}
      <div className="flex-1">
        <h3 className="text-lg font-bold text-foreground mb-3">
          {cliente || "Consultoria de Arquitetura"}
        </h3>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* data */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar size={18} className="text-primary" />
            <span>{data}</span>
          </div>

          {/* hora */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock size={18} className="text-primary" />
            <span>{hora}</span>
          </div>

          {/* duração */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-sm font-bold">Duração:</span>
            <span>{duracao}</span>
          </div>
        </div>
      </div>

      {/* botões de ação */}
      <div className="flex gap-2">
        <button
          className="p-2 bg-secondary text-primary rounded hover:opacity-75"
          title="Editar"
        >
          <Edit size={20} />
        </button>
        <button
          className="p-2 bg-destructive text-white rounded hover:opacity-75"
          title="Deletar"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  )
}