from fastapi import APIRouter
router = APIRouter()

@router.get("/api/chat/{match_id}/messages")
async def get_messages(match_id: str):
    pass
