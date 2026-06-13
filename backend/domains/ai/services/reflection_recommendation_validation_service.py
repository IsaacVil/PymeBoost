from backend.domains.ai.services.reflection_service import ReflectionService


class ReflectionServiceRecommendationValidation(ReflectionService):
    """Reflection applied to advisor recommendations.

    After the recommendation ranking is produced, runs a generate ->
    self-critique -> refine loop where the critique is grounded on
    Advisor Similar Project Retrieval (does the advisor actually have
    comparable past projects?). Low-evidence candidates are dropped or
    re-ranked before the recommendation set is stored."""

    def validate(self, pyme_id: str, draft_recommendations):
        """Reflect on `draft_recommendations` and return the refined set."""
        pass
