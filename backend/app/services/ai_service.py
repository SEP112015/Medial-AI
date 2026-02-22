from app.models.decision import Decision
from sqlalchemy.orm import Session
import json

def analyze_case(payload: dict, db: Session) -> dict:

    result = {
        "diagnostic_scenarios": [
            {"name": "Escenario A", "probability": 0.55},
            {"name": "Escenario B", "probability": 0.25}
        ],
        "risk_level": "moderate",
        "recommendations": [
            "Solicitar hemograma",
            "Monitoreo de signos vitales"
        ]
    }

    # 🔥 Guardar decisión en BD
    decision = Decision(
        patient_id=payload.get("patient_id", "N/A"),
        risk_level=result["risk_level"],
        scenarios=json.dumps(result["diagnostic_scenarios"]),
        recommendations=json.dumps(result["recommendations"]),
    )

    db.add(decision)
    db.commit()

    return result
