from pydantic import BaseModel, Field

class PatientCreate(BaseModel):
    full_name: str = Field(min_length=2, max_length=120)
    age: int = Field(ge=0, le=120)
    gender: str = Field(min_length=1, max_length=20)

class PatientUpdate(BaseModel):
    full_name: str | None = Field(default=None, min_length=2, max_length=120)
    age: int | None = Field(default=None, ge=0, le=120)
    gender: str | None = Field(default=None, min_length=1, max_length=20)

class PatientOut(BaseModel):
    id: int
    full_name: str
    age: int
    gender: str

    class Config:
        from_attributes = True
