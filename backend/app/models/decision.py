from sqlalchemy import Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column
from app.db.base import Base
from datetime import datetime

class Decision(Base):
    __tablename__ = "decisions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    patient_id: Mapped[str] = mapped_column(String(50))
    risk_level: Mapped[str] = mapped_column(String(50))
    scenarios: Mapped[str] = mapped_column(Text)
    recommendations: Mapped[str] = mapped_column(Text)
    created_at: Mapped[str] = mapped_column(
        String(50),
        default=lambda: datetime.utcnow().isoformat()
    )
