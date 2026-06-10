from pydantic import BaseModel

class PymeProfileResponse(BaseModel):
    id: str
    company_name: str
    industry: str
