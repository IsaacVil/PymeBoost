from pydantic import BaseModel
from typing import Any

class DomainEventDTO(BaseModel):
    id: str
    event_type: str
    payload: Any
    occurred_at: str
