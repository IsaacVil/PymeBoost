from fastapi import APIRouter
router = APIRouter()

@router.get("/api/pymes/{pyme_id}/similar-projects")
async def get_similar_projects(pyme_id: str):
    pass
