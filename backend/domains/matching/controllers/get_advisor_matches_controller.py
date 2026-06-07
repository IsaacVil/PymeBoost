from fastapi import APIRouter
router = APIRouter()

@router.get("/api/pymes/{pyme_id}/matches")
async def get_advisor_matches(pyme_id: str):
    pass
