from pydantic import BaseModel

class ProjectResponse(BaseModel):
    id: str
    contract_id: str
    status: str
