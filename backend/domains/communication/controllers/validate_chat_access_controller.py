from fastapi import APIRouter
router = APIRouter()

@router.get("/api/chat/{match_id}/access")
async def validate_chat_access(match_id: str):
    pass
