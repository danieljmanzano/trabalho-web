# Frontend - Next.js + React

## Tecnologias

- **Next.js 16** - framework React com App Router
- **React 19** - biblioteca de UI
- **TypeScript** - tipagem estática
- **Tailwind CSS 4** - estilização utilitária
- **Lucide React** - ícones
- **next-themes** - gerenciamento de tema
- **Google Fonts** - Playfair Display (serif) e Inter (sans)

## Estrutura

```
frontend/
├── app/
│   ├── layout.tsx           ← layout raiz (Header + Footer + fontes)
│   ├── page.tsx             ← página inicial (Home)
│   ├── globals.css          ← estilos globais e variáveis de tema
│   ├── login/
│   │   └── page.tsx         ← página de login
│   ├── cadastro/
│   │   └── page.tsx         ← página de cadastro de usuário
│   ├── portfolio/
│   │   └── page.tsx         ← galeria de projetos (público)
│   ├── consultoria/
│   │   └── page.tsx         ← agendamento de consultas (usuário logado)
│   └── backoffice/
│       └── page.tsx         ← painel administrativo (CRUD de projetos)
├── components/
│   ├── header.tsx           ← navegação principal
│   ├── footer.tsx           ← rodapé com contatos e links
│   ├── input.tsx            ← componente de input reutilizável
│   ├── consulta.tsx         ← card de consulta
│   └── error-banner.tsx     ← banner de erro
├── lib/
│   ├── api.ts               ← cliente HTTP + tipos de Projeto
│   ├── auth.ts              ← login, cadastro, logout e sessão (JWT)
│   └── consultas.ts         ← funções de consulta + horários disponíveis
├── public/
│   ├── adriana_gomes_de_oliveira.jpeg
│   └── icon.svg
├── package.json
├── tsconfig.json
├── next.config.mjs
└── postcss.config.mjs
```

## Como rodar

### 1. Instalar dependências

```bash
npm install
```

### 2. Rodar o servidor de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

> O frontend espera que o backend esteja rodando em `http://localhost:8000`.
> Para alterar, defina a variável de ambiente `NEXT_PUBLIC_API_URL`.

## Páginas

| Rota | Descrição | Acesso |
|------|-----------|--------|
| `/` | Home — apresentação da arquiteta | Público |
| `/portfolio` | Galeria de projetos cadastrados | Público |
| `/login` | Login com email e senha | Público |
| `/cadastro` | Criação de conta | Público |
| `/consultoria` | Agendamento de consultas | Usuário logado |
| `/backoffice` | CRUD de projetos (criar, editar, excluir) | Admin |
