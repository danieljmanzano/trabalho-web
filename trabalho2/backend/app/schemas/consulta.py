from pydantic import BaseModel

class ConsultaCreate(BaseModel):
    user_email: str
    data: str
    horario: str
    cliente: str
    descricao: str | None = None

class ConsultaUpdate(BaseModel):
    user_email: str | None = None
    data: str | None = None
    horario: str | None = None
    cliente: str | None = None
    descricao: str | None = None

class ConsultaResponse(BaseModel):
    id: str
    user_email: str
    data: str
    horario: str
    cliente: str
    descricao: str | None
    criado_em: str

    class Config:
        from_attributes = True
