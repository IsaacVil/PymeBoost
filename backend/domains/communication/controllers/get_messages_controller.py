"""GET the messages of a match's chat (communication domain)."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.domains.communication.schemas.message_response import MessageResponse
from backend.domains.communication.services.message_service import MessageService
from backend.shared.auth.permission_checker import Principal, get_current_principal
from backend.shared.database.session import get_db

router = APIRouter(prefix="/api/communication", tags=["communication"])
_service = MessageService()


@router.get("/chats/{match_id}/messages", response_model=list[MessageResponse])
def get_messages(
    match_id: str,
    db: Session = Depends(get_db),
    principal: Principal = Depends(get_current_principal),
) -> list[MessageResponse]:
    return _service.list_messages(db, match_id, principal)
