# Trabalho 1 - Introdução ao Desenvolvimento Web (SCC0219)

Este é o primeiro projeto da disciplina de **Introdução ao Desenvolvimento Web**, que consiste na implementação do **front-end** de uma aplicação web desenvolvida para o escritório de arquitetura de **Adriana Gomes de Oliveira**.

## Desenvolvido por:
- Daniel Jorge Manzano - 15446861
- Heitor Gomes de Oliveira - 15458350
- Newton Eduardo Pena Villegas - 15481732

## Tecnologias utilizadas

- [Next.js 16](https://nextjs.org/) — framework React para aplicações web
- [TypeScript](https://www.typescriptlang.org/) — tipagem estática
- [Tailwind CSS](https://tailwindcss.com/) — estilização utilitária
- [Lucide React](https://lucide.dev/) — ícones

## Execução Local

**Pré-requisitos:** [Node.js 18+](https://nodejs.org/) instalado.

1. Clone o repositório:
   ```bash
   git clone https://github.com/danieljmanzano/trabalho-web
   cd trabalho1
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Estrutura do projeto

```
.
├── app/                # Rotas, layouts e estilos globais
│   ├── cadastro/       # Rota de cadastro (/cadastro)
│   ├── consultoria/    # Rota de consultoria (/consultoria)
│   ├── login/          # Rota de login (/login)
│   ├── globals.css     # Estilos globais do Tailwind
│   ├── layout.tsx      # Layout compartilhado (Header/Footer)
│   └── page.tsx        # Página inicial (Home)
├── components/         # Componentes React reutilizáveis
│   ├── consulta.tsx    # Lógica de exibição de consultas
|   ├── footer.tsx      # Definição do footer da página
│   ├── header.tsx      # Barra de navegação superior
│   └── input.tsx       # Componente de entrada customizado
├── public/             # Arquivos estáticos (imagens e ícones)
├── next.config.mjs     # Configurações do Next.js
├── package.json        # Dependências e scripts do projeto
└── tsconfig.json       # Configurações do TypeScript
```