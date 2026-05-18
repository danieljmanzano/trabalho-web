from sqlalchemy import Column, Integer, String, DateTime, func

from app.database import Base


class User(Base):
    """Modelo ORM de usuário no banco de dados"""

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    senha_hash = Column(String, nullable=False)
    foto_url = Column(String, nullable=True)
    criado_em = Column(DateTime, server_default=func.now())
