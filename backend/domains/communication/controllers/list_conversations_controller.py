"""GET the authenticated user's chat list (communication domain)."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.domains.communication.schemas.conversation_response import ConversationResponse
from backend.domains.communication.services.message_service import MessageService
from backend.shared.auth.permission_checker import Principal, get_current_principal
from backend.shared.database.session import get_db

router = APIRouter(prefix="/api/communication", tags=["communication"])
_service = MessageService()


@router.get("/conversations", response_model=list[ConversationResponse])
def list_conversations(
    db: Session = Depends(get_db),
    principal: Principal = Depends(get_current_principal),
) -> list[ConversationResponse]:
    return _service.list_conversations(db, principal)
