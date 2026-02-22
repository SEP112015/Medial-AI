from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.deps import get_db
from app.models.decision import Decision

router = APIRouter()

@router.get("/")
def list_decisions(db: Session = Depends(get_db)):
    return db.query(Decision).order_by(Decision.id.desc()).all()
