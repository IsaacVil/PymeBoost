from pydantic import BaseModel

class MilestoneDTO(BaseModel):
    id: str
    project_id: str
    title: str
    completed: bool
