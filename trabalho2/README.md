# Trabalho 2 - Introdução ao Desenvolvimento Web (SCC0219)

Este é o segundo projeto da disciplina de **Introdução ao Desenvolvimento Web**, que consiste na implementação do **back-end** da aplicação web cujo front-end foi desenvolvido no primeiro trabalho. Além disso, foram feitas alterações no front-end para adequações necessárias das mudanças adotadas em relação a primeira entrega.

## Desenvolvido por:
- Daniel Jorge Manzano - 15446861
- Heitor Gomes de Oliveira - 15458350
- Newton Eduardo Pena Villegas - 15481732

## Tecnologias utilizadas

### Frontend
- [Next.js 16](https://nextjs.org/) - framework React para aplicações web
- [TypeScript](https://www.typescriptlang.org/) - tipagem estática
- [Tailwind CSS 4](https://tailwindcss.com/) - estilização utilitária
- [Lucide React](https://lucide.dev/) - ícones

### Backend
- [FastAPI](https://fastapi.tiangolo.com/) — framework web Python
- [SQLAlchemy](https://www.sqlalchemy.org/) — ORM
- [PostgreSQL (NeonDB)](https://neon.tech/) — banco de dados em nuvem
- [python-jose](https://github.com/mpdavis/python-jose) — tokens JWT

## Estrutura

```
trabalho2/
├── frontend/   # Next.js + React + Tailwind CSS
└── backend/    # Python + FastAPI + PostgreSQL (NeonDB)
```

## Rodando o projeto

### Frontend

```bash
cd frontend
npm install
npm run dev
# → http://localhost:3000
```

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
# → http://localhost:8000
# → Docs: http://localhost:8000/docs
```