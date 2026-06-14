from dataclasses import dataclass


@dataclass
class SmeNeedsAssessmentUpdatedEvent:
    pyme_id: str
    assessment_id: str
