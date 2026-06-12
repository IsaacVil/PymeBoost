from pydantic import BaseModel

class DocumentBlockDTO(BaseModel):
    id: str
    use_case_id: str
    thematic_category: str | None = None
    content_hash: str
