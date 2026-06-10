from fastapi import APIRouter
router = APIRouter()

@router.post("/api/reviews/advisor")
async def leave_advisor_review():
    pass
