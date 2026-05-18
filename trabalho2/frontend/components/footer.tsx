"use client"

import { Instagram, Linkedin, Facebook } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Linkedin, href: "https://linked.in", label: "LinkedIn" },
  ]

  const navLinks = [
    { href: "/", label: "Início" },
    { href: "/consultoria", label: "Consultoria" },
    { href: "/login", label: "Login" },
    { href: "/cadastro", label: "Cadastro" },
  ]

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {/* texto */}
          <div>
            <a href="#inicio" className="flex flex-col mb-4">
              <span className="text-primary font-serif text-2xl font-semibold tracking-wide">
                Adriana Gomes De Oliveira
              </span>
              <span className="text-muted-foreground text-xs tracking-[0.3em] uppercase">
                Arquitetura
              </span>
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Transformando espaços com excelência técnica e criatividade.
              Sua visão, nossa expertise.
            </p>
          </div>

          {/* navegação */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Navegação</h4>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* redes sociais */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Redes Sociais</h4>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* barra inferior */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm text-center md:text-left">
            &copy; {currentYear} Adriana Gomes de Oliveira. Todos os direitos reservados.
          </p>
          <p className="text-muted-foreground text-sm">
            CAU/SP 120290-1
          </p>
        </div>
      </div>
    </footer>
  )
}