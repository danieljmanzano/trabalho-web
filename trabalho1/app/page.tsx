import { MessageCircle, Mail, Facebook, Instagram } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      
      <div className="flex-1 flex items-center justify-center">
        <section className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 lg:gap-16 items-center max-w-6xl mx-auto">

            {/* imagem */}
            <div className="flex justify-center">
              <div className="w-60 h-80 md:w-72 md:h-96 relative overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="/adriana_gomes_de_oliveira.jpeg"
                  alt="Adriana Gomes de Oliveira"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* conteúdo (texto) com fundo amarelo claro */}
            <div className="bg-amber-50 p-6 sm:p-8 md:p-14 rounded-2xl md:rounded-[2.5rem] space-y-6 shadow-sm">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl font-bold text-amber-950 leading-tight">
                Arquitetura com <span className="text-primary">excelência</span>
              </h1>

              <div className="space-y-4 md:space-y-6">
                <p className="text-lg md:text-xl text-amber-900 leading-relaxed font-medium">
                  Sou Adriana Gomes de Oliveira, arquiteta com 15+ anos de experiência.
                  Com formação técnica sólida e expertise avançada, ofereço soluções completas
                  em regularização, projetos de construção e reforma.
                </p>

                <p className="text-base md:text-lg text-amber-800/90 leading-relaxed">
                  Minha jornada começou com o Curso Técnico em Edificações, seguida por
                  Graduação em Arquitetura, Mestrado e atualmente cursando Doutorado em
                  Ciências dos Materiais. Cada projeto é desenvolvido com dedicação,
                  precisão técnica e foco em suas necessidades.
                </p>
              </div>

              {/* links de contato */}
              <div className="flex gap-4 pt-2 md:pt-4">
                <a
                  href="https://wa.me/5519981202887"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-white text-primary rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm border border-amber-100"
                  title="WhatsApp"
                >
                  <MessageCircle size={20} className="md:w-6 md:h-6" />
                </a>
                <a
                  href="mailto:contato@adrianagomes.com"
                  className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-white text-primary rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm border border-amber-100"
                  title="Email"
                >
                  <Mail size={20} className="md:w-6 md:h-6" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-white text-primary rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm border border-amber-100"
                  title="Facebook"
                >
                  <Facebook size={20} className="md:w-6 md:h-6" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-white text-primary rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm border border-amber-100"
                  title="Instagram"
                >
                  <Instagram size={20} className="md:w-6 md:h-6" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}