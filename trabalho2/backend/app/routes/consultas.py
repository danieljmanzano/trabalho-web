from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from uuid import uuid4
from datetime import datetime

from app.database import get_db
from app.models.consulta import Consulta
from app.schemas.consulta import ConsultaCreate, ConsultaResponse

router = APIRouter(prefix="/consultas", tags=["Consultas"])

@router.get("/", response_model=List[ConsultaResponse])
def listar_consultas(user_email: str | None = None, db: Session = Depends(get_db)):
    q = db.query(Consulta)
    if user_email:
        q = q.filter(Consulta.user_email == user_email)
    return q.all()

@router.post("/", response_model=ConsultaResponse, status_code=201)
def criar_consulta(dados: ConsultaCreate, db: Session = Depends(get_db)):
    # check unique constraint
    existe = db.query(Consulta).filter(Consulta.data == dados.data, Consulta.horario == dados.horario).first()
    if existe:
        raise HTTPException(status_code=409, detail="Horário já reservado nesta data")
    nova = Consulta(
        id=str(uuid4()),
        data=dados.data,
        horario=dados.horario,
        cliente=dados.cliente,
        descricao=dados.descricao,
        user_email=dados.user_email,
        criado_em=datetime.utcnow().isoformat(),
    )
    db.add(nova)
    db.commit()
    db.refresh(nova)
    return nova

@router.put("/{consulta_id}", response_model=ConsultaResponse)
def atualizar_consulta(consulta_id: str, user_email: str, dados: ConsultaCreate, db: Session = Depends(get_db)):
    c = db.query(Consulta).filter(Consulta.id == consulta_id, Consulta.user_email == user_email).first()
    if not c:
        raise HTTPException(status_code=404, detail="Consulta não encontrada")
    # check unique constraint only if data/horario changed
    if dados.data != c.data or dados.horario != c.horario:
        existe = db.query(Consulta).filter(
            Consulta.data == dados.data,
            Consulta.horario == dados.horario,
            Consulta.id != consulta_id
        ).first()
        if existe:
            raise HTTPException(status_code=409, detail="Horário já reservado nesta data")
    c.data = dados.data
    c.horario = dados.horario
    c.cliente = dados.cliente
    c.descricao = dados.descricao
    db.commit()
    db.refresh(c)
    return c

@router.delete("/{consulta_id}", status_code=204)
def deletar_consulta(consulta_id: str, user_email: str, db: Session = Depends(get_db)):
    c = db.query(Consulta).filter(Consulta.id == consulta_id, Consulta.user_email == user_email).first()
    if not c:
        raise HTTPException(status_code=404, detail="Consulta não encontrada")
    db.delete(c)
    db.commit()
