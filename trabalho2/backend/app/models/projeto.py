from sqlalchemy import Column, Integer, String, Text, Date, DateTime, func

from app.database import Base


class Projeto(Base):
    """Modelo ORM de projeto no banco de dados"""

    __tablename__ = "projetos"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    categoria = Column(String, nullable=False)
    descricao = Column(String, nullable=True)
    data_inicio = Column(Date, nullable=False)
    data_fim = Column(Date, nullable=True)  # None = em andamento
    imagem_data = Column(Text, nullable=True)   # base64 string, may be large
    imagem_tipo = Column(String(50), nullable=True)
    criado_em = Column(DateTime, server_default=func.now())
