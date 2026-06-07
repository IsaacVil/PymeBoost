from fastapi import APIRouter
router = APIRouter()

@router.post("/api/matching/matches")
async def create_match():
    pass
