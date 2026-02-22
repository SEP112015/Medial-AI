from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.deps import get_db
from app.services.ai_service import analyze_case

router = APIRouter()

@router.post("/")
def analyze(payload: dict, db: Session = Depends(get_db)):
    return analyze_case(payload, db)
