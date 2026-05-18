import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-serif'
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: 'Adriana Gomes de Oliveira | Arquiteta',
  description: 'Escritório de Arquitetura especializado em regularização, projetos de construção e reforma, LTA, remembramento, desdobro e elaboração de EIV-RIV.',
  icons: {
    icon: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased flex flex-col min-h-screen`}>
        {/* header ao topo */}
        <Header />

        {/* children com tag main com flex-grow empurra o footer para baixo */}
        <main className="flex-grow">
          {children}
        </main>

        {/* footer na base */}
        <Footer />
      </body>
    </html>
  )
}
