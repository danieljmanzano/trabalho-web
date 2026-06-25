from sqlalchemy import Column, String

from app.database import Base


class Horario(Base):
    __tablename__ = "horarios"

    value = Column(String, primary_key=True)
    label = Column(String, nullable=False)
