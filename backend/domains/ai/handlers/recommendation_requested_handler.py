class RecommendationRequestedHandler:
    """Triggered by RecommendationRequested / AdvisorIndustryUpdated /
    SmeNeedsAssessmentUpdated Pub/Sub events; runs on-demand recommendation."""
    def handle(self, event) -> None:
        pass
