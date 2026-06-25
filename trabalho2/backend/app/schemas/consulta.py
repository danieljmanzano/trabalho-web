from pydantic import BaseModel

class ConsultaCreate(BaseModel):
    data: str
    horario: str
    cliente: str
    descricao: str | None = None

class ConsultaUpdate(BaseModel):
    data: str | None = None
    horario: str | None = None
    cliente: str | None = None
    descricao: str | None = None

class ConsultaResponse(BaseModel):
    id: str
    data: str
    horario: str
    cliente: str
    descricao: str | None
    criado_em: str

    class Config:
        from_attributes = True
