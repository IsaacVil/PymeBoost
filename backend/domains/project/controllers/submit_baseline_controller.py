from fastapi import APIRouter

router = APIRouter()

@router.post("/api/projects/{project_id}/baseline")
async def submit_baseline(project_id: str):
    pass
