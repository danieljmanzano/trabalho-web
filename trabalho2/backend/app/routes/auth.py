from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.user import UserCreate, UserResponse, UserLogin, Token
from app.services.auth import cadastrar_usuario, autenticar_usuario

router = APIRouter(prefix="/auth", tags=["Autenticação"])


@router.post("/cadastro", response_model=UserResponse, status_code=201)
def cadastro(dados: UserCreate, db: Session = Depends(get_db)):
    """
    Cadastra um novo usuário.

    - **nome**: nome completo
    - **email**: endereço de e-mail único
    - **senha**: mínimo 6 caracteres
    """
    return cadastrar_usuario(db, dados)


@router.post("/login", response_model=Token)
def login(dados: UserLogin, db: Session = Depends(get_db)):
    """
    Autentica o usuário e retorna um token JWT.

    - **email**: e-mail cadastrado
    - **senha**: senha do usuário
    """
    token = autenticar_usuario(db, dados.email, dados.senha)
    return Token(access_token=token)
