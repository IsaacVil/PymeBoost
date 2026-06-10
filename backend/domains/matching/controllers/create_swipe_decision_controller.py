from fastapi import APIRouter
router = APIRouter()

@router.post("/api/matching/swipe")
async def create_swipe_decision():
    pass
