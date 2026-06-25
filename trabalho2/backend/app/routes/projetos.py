from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.projeto import Projeto
from app.schemas.projeto import ProjetoCreate, ProjetoUpdate, ProjetoResponse

router = APIRouter(prefix="/projetos", tags=["Projetos"])


@router.get("/", response_model=List[ProjetoResponse])
def listar_projetos(db: Session = Depends(get_db)):
    """
    Lista todos os projetos cadastrados.
    """
    return db.query(Projeto).order_by(Projeto.data_inicio.desc()).all()


@router.post("/", response_model=ProjetoResponse, status_code=201)
def criar_projeto(dados: ProjetoCreate, db: Session = Depends(get_db)):
    """
    Cria um novo projeto.

    - nome: nome do projeto
    - categoria: ex: Residencial, Comercial, Reforma...
    - descricao: descrição detalhada (opcional)
    - data_inicio: início do projeto (YYYY-MM-DD)
    - data_fim: conclusão do projeto (opcional, None = em andamento)
    - imagem_url: URL da imagem de capa (opcional)
    """
    projeto = Projeto(**dados.model_dump())
    db.add(projeto)
    db.commit()
    db.refresh(projeto)
    return projeto


@router.put("/{projeto_id}", response_model=ProjetoResponse)
def atualizar_projeto(
    projeto_id: int,
    dados: ProjetoUpdate,
    db: Session = Depends(get_db),
):
    """
    Atualiza um projeto existente. Apenas os campos enviados serão atualizados.
    """
    projeto = db.query(Projeto).filter(Projeto.id == projeto_id).first()
    if not projeto:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")

    for campo, valor in dados.model_dump(exclude_unset=True).items():
        setattr(projeto, campo, valor)

    db.commit()
    db.refresh(projeto)
    return projeto


@router.delete("/{projeto_id}", status_code=204)
def deletar_projeto(projeto_id: int, db: Session = Depends(get_db)):
    """
    Remove um projeto pelo ID.
    """
    projeto = db.query(Projeto).filter(Projeto.id == projeto_id).first()
    if not projeto:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")

    db.delete(projeto)
    db.commit()
