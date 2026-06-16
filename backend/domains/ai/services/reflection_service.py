class ReflectionService:
    """Reflection (agentic) pattern: generate -> self-critique -> refine.

    Wraps an AI output in a bounded loop where the model evaluates its own
    result against grounding evidence and revises it before the output is
    persisted or served. Shared by recommendation validation (grounded on
    Advisor Similar Project Retrieval) and promise sub-industry classification."""

    def reflect(self, draft, evidence, max_iterations: int = 2):
        """Critique `draft` against `evidence` and return a refined output."""
        pass

    def critique(self, draft, evidence):
        """Return the issues / confidence score found in a draft output."""
        pass

    def refine(self, draft, critique):
        """Produce an improved draft from a critique."""
        pass
