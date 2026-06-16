from backend.domains.ai.services.reflection_service import ReflectionService


class ReflectionServicePromiseClassification(ReflectionService):
    """Reflection applied to promise sub-industry classification.

    After thematic classification assigns sub-industry scores to a promise,
    re-checks the scores against the explanation_text and the sub-industry
    catalog, correcting low-confidence or inconsistent scores before they
    are persisted in PB_PromiseSubIndustryScores."""

    def validate(self, promise_id: str, explanation_text: str, draft_scores):
        """Reflect on `draft_scores` and return the corrected scores."""
        pass
