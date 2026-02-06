from fastapi import APIRouter
from app.services.ai_service import analyze_case

router = APIRouter()

@router.post("/")
def analyze(payload: dict):
    # payload esperado: sintomas, historial, resultados, etc.
    return analyze_case(payload)
