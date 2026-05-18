# Backend — API Python (FastAPI)

## Tecnologias

- **FastAPI** — framework web moderno e rápido
// colocar aqui o restante do que realmente formos usar

## Estrutura

```
backend/
├── app/
│   ├── main.py          ← entry point (FastAPI app)
│   ├── config.py        ← variáveis de ambiente
│   ├── database.py      ← conexão com o banco
│   ├── models/
│   │   └── user.py      ← tabela de usuários
│   ├── schemas/
│   │   └── user.py      ← validação de dados
│   ├── routes/
│   │   └── auth.py      ← endpoints: POST /auth/cadastro, POST /auth/login
│   └── services/
│       └── auth.py      ← lógica de autenticação
├── requirements.txt
├── .env.example
└── README.md
```

## Como rodar

### 1. Criar e ativar ambiente virtual

```bash
python -m venv venv
source venv/bin/activate   # Linux/macOS
# venv\Scripts\activate    # Windows
```

### 2. Instalar dependências

```bash
pip install -r requirements.txt
```

// adicionar restante depois

## Endpoints disponíveis

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/` | Health check |
| POST | `/auth/cadastro` | Cadastra novo usuário |
| POST | `/auth/login` | Autentica e retorna JWT |
