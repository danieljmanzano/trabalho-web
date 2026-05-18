from pydantic import BaseModel
from datetime import date, datetime


class ProjetoCreate(BaseModel):
    """Dados recebidos na requisição de criação de projeto."""
    nome: str
    categoria: str
    descricao: str | None = None
    data_inicio: date
    data_fim: date | None = None  # None = em andamento
    imagem_url: str | None = None


class ProjetoUpdate(BaseModel):
    """Dados recebidos na requisição de atualização de projeto (todos opcionais)."""
    nome: str | None = None
    categoria: str | None = None
    descricao: str | None = None
    data_inicio: date | None = None
    data_fim: date | None = None
    imagem_url: str | None = None


class ProjetoResponse(BaseModel):
    """Dados retornados ao cliente."""
    id: int
    nome: str
    categoria: str
    descricao: str | None
    data_inicio: date
    data_fim: date | None
    imagem_url: str | None
    criado_em: datetime

    class Config:
        from_attributes = True  # compatível com ORM
