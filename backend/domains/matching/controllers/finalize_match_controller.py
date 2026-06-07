from fastapi import APIRouter
router = APIRouter()

@router.post("/api/matching/matches/{match_id}/finalize")
async def finalize_match(match_id: str):
    pass
