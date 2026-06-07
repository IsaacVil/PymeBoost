from fastapi import APIRouter
router = APIRouter()

@router.post("/api/projects/{project_id}/milestones/{milestone_id}/validate")
async def validate_milestone(project_id: str, milestone_id: str):
    pass
