from backend.domains.ai.services.reflection_service import ReflectionService


class ReflectionServicePromiseClassification(ReflectionService):
    """Reflection applied to promise industry classification.

    After thematic classification assigns industry tags to a promise,
    re-checks the assigned category against the promise text and the
    industry catalog, correcting low-confidence or inconsistent tags
    before they are persisted."""

    def validate(self, promise_id: str, promise_text: str, draft_tags):
        """Reflect on `draft_tags` and return the corrected tags."""
        pass
