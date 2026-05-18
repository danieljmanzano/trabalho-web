from pydantic import BaseModel, EmailStr
from datetime import datetime


# Cadastro 

class UserCreate(BaseModel):
    """Dados recebidos na requisição de cadastro."""
    nome: str
    email: EmailStr
    senha: str


class UserResponse(BaseModel):
    """Dados retornados ao cliente após cadastro ou consulta."""
    id: int
    nome: str
    email: str
    foto_url: str | None
    criado_em: datetime

    class Config:
        from_attributes = True  # compatível com ORM (ex-orm_mode)


# Login

class UserLogin(BaseModel):
    """Dados recebidos na requisição de login."""
    email: EmailStr
    senha: str


class Token(BaseModel):
    """Token JWT retornado após login bem-sucedido."""
    access_token: str
    token_type: str = "bearer"
