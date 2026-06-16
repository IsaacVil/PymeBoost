"""POST a message to a match's chat (communication domain)."""
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from backend.domains.communication.schemas.message_response import MessageResponse
from backend.domains.communication.schemas.send_message_request import SendMessageRequest
from backend.domains.communication.services.message_service import MessageService
from backend.shared.auth.permission_checker import Principal, get_current_principal
from backend.shared.database.session import get_db

router = APIRouter(prefix="/api/communication", tags=["communication"])
_service = MessageService()


@router.post("/chats/{match_id}/messages", response_model=MessageResponse, status_code=status.HTTP_201_CREATED)
def send_message(
    match_id: str,
    req: SendMessageRequest,
    db: Session = Depends(get_db),
    principal: Principal = Depends(get_current_principal),
) -> MessageResponse:
    return _service.send_message(db, match_id, req.content, principal)
