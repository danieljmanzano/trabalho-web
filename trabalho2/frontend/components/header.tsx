export function Header() {
  return (
    <header className="bg-background border-b">
      {/* justify-between: espaço máximo entre os filhos */}
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="flex flex-col">
          <span className="text-primary font-serif text-2xl font-bold">
            Adriana Gomes de Oliveira
          </span>
          <span className="text-muted-foreground text-xs uppercase">
            Arquitetura
          </span>
        </a>

        <nav className="flex gap-8">
          <a
            href="/"
            className="text-sm text-foreground hover:text-primary"
          >
            Início
          </a>
          <a
            href="/consultoria"
            className="text-sm text-foreground hover:text-primary"
          >
            Agendamentos
          </a>
          <a
            href="/login"
            className="text-sm text-foreground hover:text-primary"
          >
            Login
          </a>
          <a
            href="/cadastro"
            className="text-sm text-foreground hover:text-primary"
          >
            Cadastro
          </a>
        </nav>
      </div>
    </header>
  )
}