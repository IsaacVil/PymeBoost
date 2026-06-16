from pydantic import BaseModel, Field


class CreateSmeRequest(BaseModel):
    owner_name: str = Field(min_length=1, max_length=100)
    business_email: str = Field(min_length=3, max_length=150)
    phone: str = Field(min_length=3, max_length=20)
    cedula_juridica: str = Field(min_length=3, max_length=20)  # validación MEIC simulada
    company_name: str = Field(min_length=1, max_length=100)
    company_size: str = Field(description="code: small | medium | large")
    industry: str | None = Field(default=None, description="industry code (optional)")
    password: str = Field(min_length=8, max_length=72)
