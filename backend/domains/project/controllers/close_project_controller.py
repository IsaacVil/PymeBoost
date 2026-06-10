from fastapi import APIRouter
router = APIRouter()

@router.post("/api/projects/{project_id}/close")
async def close_project(project_id: str):
    pass
