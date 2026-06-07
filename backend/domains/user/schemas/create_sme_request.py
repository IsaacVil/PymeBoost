from pydantic import BaseModel

class CreateSmeRequest(BaseModel):
    email: str
    company_name: str
    phone: str
    legal_entity_id: str
