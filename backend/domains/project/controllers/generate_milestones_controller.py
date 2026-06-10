from fastapi import APIRouter
router = APIRouter()

@router.post("/api/projects/{project_id}/milestones")
async def generate_milestones(project_id: str):
    pass
