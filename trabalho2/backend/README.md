# Backend - API Python (FastAPI)

## Tecnologias

- **FastAPI** - framework web
- **SQLAlchemy** - ORM para o banco de dados
- **PostgreSQL (NeonDB)** - banco de dados em nuvem
- **Pydantic** - validação de dados e schemas
- **python-jose** - geração e verificação de tokens JWT
- **Passlib + bcrypt** - hash de senhas
- **Uvicorn** - servidor ASGI

## Estrutura

```
backend/
├── app/
│   ├── main.py              ← entry point (FastAPI app + CORS)
│   ├── config.py            ← variáveis de ambiente (pydantic-settings)
│   ├── database.py          ← conexão SQLAlchemy + dependency injection
│   ├── models/
│   │   ├── user.py          ← tabela users
│   │   ├── projeto.py       ← tabela projetos
│   │   ├── consulta.py      ← tabela consultas
│   │   └── horario.py       ← tabela horarios
│   ├── schemas/
│   │   ├── user.py          ← validação de usuário / token
│   │   ├── projeto.py       ← validação de projeto
│   │   └── consulta.py      ← validação de consulta
│   ├── routes/
│   │   ├── auth.py          ← endpoints de autenticação
│   │   ├── projetos.py      ← CRUD de projetos
│   │   └── consultas.py     ← CRUD de consultas
│   └── services/
│       └── auth.py          ← lógica de cadastro, login e JWT
├── requirements.txt
├── .env
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

### 3. Configurar variáveis de ambiente

Copie o arquivo de exemplo e preencha com seus valores:

```bash
cp .env.example .env
```

Edite o `.env` gerado:

```
DATABASE_URL=postgresql://usuario:senha@host/banco?sslmode=require
SECRET_KEY=sua-chave-secreta-longa-e-aleatoria
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
```

> **Nunca commite o arquivo `.env`** — ele já está no `.gitignore`.

### 4. Rodar o servidor

```bash
uvicorn app.main:app --reload
```

A API estará disponível em `http://localhost:8000`.
A documentação interativa (Swagger) fica em `http://localhost:8000/docs`.

## Endpoints disponíveis

### Health

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/` | Health check |

### Autenticação (`/auth`)

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/auth/cadastro` | Cadastra novo usuário |
| POST | `/auth/login` | Autentica e retorna JWT |

### Projetos (`/projetos`)

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/projetos/` | Lista todos os projetos |
| POST | `/projetos/` | Cria um novo projeto |
| PUT | `/projetos/{id}` | Atualiza um projeto |
| DELETE | `/projetos/{id}` | Remove um projeto |

### Consultas (`/consultas`)

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/consultas/` | Lista consultas (filtro opcional por `user_email`) |
| POST | `/consultas/` | Cria uma nova consulta |
| PUT | `/consultas/{id}` | Atualiza uma consulta |
| DELETE | `/consultas/{id}` | Remove uma consulta |
