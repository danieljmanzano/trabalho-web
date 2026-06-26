from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routes import auth, projetos, consultas
from app.models import projeto  # noqa: F401
from app.models import user  # noqa: F401
from app.models import consulta  # noqa: F401
from app.models import horario  # noqa: F401

# Cria as tabelas no banco de dados se não existirem
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Adriana Gomes — API",
    description="Backend para o site da arquiteta Adriana Gomes de Oliveira.",
    version="0.1.0",
)

# CORS - permite que o frontend (Next.js em localhost:3000) acesse a API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rotas
app.include_router(auth.router)
app.include_router(projetos.router)
app.include_router(consultas.router)


@app.get("/", tags=["Health"])
def health_check():
    return {"status": "ok", "message": "API funcionando!"}
