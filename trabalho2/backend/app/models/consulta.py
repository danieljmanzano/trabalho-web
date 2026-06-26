from sqlalchemy import Column, String, UniqueConstraint, ForeignKey

from app.database import Base


class Consulta(Base):
    __tablename__ = "consultas"

    id = Column(String, primary_key=True)
    user_email = Column(String, ForeignKey("users.email"), primary_key=True, nullable=False)
    data = Column(String, nullable=False)
    horario = Column(String, nullable=False)
    cliente = Column(String, nullable=False)
    descricao = Column(String, nullable=True)
    criado_em = Column(String, nullable=False)

    __table_args__ = (UniqueConstraint("data", "horario"),)
