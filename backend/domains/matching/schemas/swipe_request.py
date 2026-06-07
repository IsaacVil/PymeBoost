from pydantic import BaseModel

class SwipeRequest(BaseModel):
    pyme_id: str
    advisor_id: str
    approved: bool
