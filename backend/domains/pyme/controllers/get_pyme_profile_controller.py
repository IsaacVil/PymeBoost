from fastapi import APIRouter
router = APIRouter()

@router.get("/api/pymes/{pyme_id}")
async def get_pyme_profile(pyme_id: str):
    pass
