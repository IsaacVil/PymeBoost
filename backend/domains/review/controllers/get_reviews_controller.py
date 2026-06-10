from fastapi import APIRouter
router = APIRouter()

@router.get("/api/reviews/{subject_id}")
async def get_reviews(subject_id: str):
    pass
