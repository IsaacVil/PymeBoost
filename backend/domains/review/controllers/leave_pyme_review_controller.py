from fastapi import APIRouter
router = APIRouter()

@router.post("/api/reviews/pyme")
async def leave_pyme_review():
    pass
