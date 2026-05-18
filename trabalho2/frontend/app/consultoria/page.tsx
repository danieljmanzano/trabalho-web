import { ConsultaCard } from "@/components/consulta"
import { Plus } from "lucide-react"

export default function Consultoria() {
  // dados de mock
  const consultas = [
    {
      id: "1",
      data: "2026-04-20",
      hora: "14:00",
      duracao: "1h 30min",
      cliente: "Reforma - João Silva",
    },
  ]

  return (
    <main className="min-h-screen bg-background flex flex-col">

        {/* flex-1 faz ocupar tudo*/}
      <div className="flex-1">
          {/* margin x automatica */}
        <div className="container mx-auto px-4 py-12">
          {/* maxima largura 4xl */}
          <div className="max-w-4xl mx-auto mb-8">
          {/* md:text-5xl telas médias e maiores, texto 5xl */}
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-2">
              Agendamentos de <span className="text-primary">Consultoria</span>
            </h1>
            <p className="text-muted-foreground">
              Gerencie suas consultorias de arquitetura
            </p>
          </div>

          {/* botão criar nova consultoria */}
          <div className="max-w-4xl mx-auto mb-8">
            <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded font-bold hover:opacity-75">
              <Plus size={20} />
              Nova Consultoria
            </button>
          </div>

          {/* lista de donsultas */}
          <div className="max-w-4xl mx-auto space-y-6">
            {consultas.length > 0 ? (
              <>
                {consultas.map((consulta) => (
                  <ConsultaCard
                    key={consulta.id}
                    id={consulta.id}
                    data={consulta.data}
                    hora={consulta.hora}
                    duracao={consulta.duracao}
                    cliente={consulta.cliente}
                  />
                ))}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  Nenhuma consultoria agendada
                </p>
                <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded font-bold hover:opacity-75">
                  <Plus size={18} />
                  Agendar Consultoria
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}