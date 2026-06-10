from pydantic import BaseModel

class ReviewRequest(BaseModel):
    project_id: str
    subject_id: str
    rating: float
    comment: str
