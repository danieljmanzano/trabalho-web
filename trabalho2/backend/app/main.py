from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routes import auth

# Cria as tabelas no banco de dados (se não existirem)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Adriana Gomes — API",
    description="Backend para o site da arquiteta Adriana Gomes de Oliveira.",
    version="0.1.0",
)

# CORS — permite que o frontend (Next.js em localhost:3000) acesse a API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # ajuste em produção
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rotas
app.include_router(auth.router)


@app.get("/", tags=["Health"])
def health_check():
    return {"status": "ok", "message": "API funcionando!"}
