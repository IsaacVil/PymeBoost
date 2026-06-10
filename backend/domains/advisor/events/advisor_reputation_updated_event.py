from dataclasses import dataclass

@dataclass
class AdvisorReputationUpdatedEvent:
    advisor_id: str
    new_score: float
