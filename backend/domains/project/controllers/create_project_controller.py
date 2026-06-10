from fastapi import APIRouter
router = APIRouter()

@router.post("/api/projects")
async def create_project():
    pass
