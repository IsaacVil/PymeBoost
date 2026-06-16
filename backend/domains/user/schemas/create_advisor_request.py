from pydantic import BaseModel, Field


class CreateAdvisorRequest(BaseModel):
    full_name: str = Field(min_length=1, max_length=100)
    display_name: str | None = Field(default=None, max_length=100)
    personal_email: str = Field(min_length=3, max_length=150)
    phone: str = Field(min_length=3, max_length=20)
    linkedin_url: str = Field(min_length=3, max_length=500)
    base_rate: float | None = Field(default=None, ge=0)
    password: str = Field(min_length=8, max_length=72)
