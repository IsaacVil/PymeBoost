from fastapi import APIRouter
router = APIRouter()

@router.post("/api/chat/{match_id}/messages")
async def send_message(match_id: str):
    pass
