from pydantic import BaseModel

class CreateAdvisorRequest(BaseModel):
    email: str
    full_name: str
    phone: str
    specialization: str
