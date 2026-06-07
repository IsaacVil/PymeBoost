from fastapi import APIRouter
router = APIRouter()

@router.delete("/api/matching/matches/{match_id}")
async def cancel_match(match_id: str):
    pass
