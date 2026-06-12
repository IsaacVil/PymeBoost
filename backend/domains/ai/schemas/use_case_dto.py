from pydantic import BaseModel

class UseCaseDTO(BaseModel):
    id: str
    advisor_id: str
    file_path: str
