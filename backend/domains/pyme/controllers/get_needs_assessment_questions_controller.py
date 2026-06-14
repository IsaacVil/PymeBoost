from fastapi import APIRouter

router = APIRouter()

@router.get("/api/pymes/{pyme_id}/needs-assessment/questions")
async def get_needs_assessment_questions(pyme_id: str):
    pass
