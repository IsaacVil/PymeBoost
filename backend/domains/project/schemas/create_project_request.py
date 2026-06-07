from pydantic import BaseModel

class CreateProjectRequest(BaseModel):
    contract_id: str
