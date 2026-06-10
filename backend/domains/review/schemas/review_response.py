from pydantic import BaseModel

class ReviewResponse(BaseModel):
    id: str
    subject_id: str
    rating: float
    comment: str
