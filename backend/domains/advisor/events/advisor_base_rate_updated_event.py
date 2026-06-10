from dataclasses import dataclass

@dataclass
class AdvisorBaseRateUpdatedEvent:
    advisor_id: str
    new_rate: float
