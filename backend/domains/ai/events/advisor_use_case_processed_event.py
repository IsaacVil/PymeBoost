from dataclasses import dataclass

@dataclass
class AdvisorUseCaseProcessedEvent:
    advisor_id: str
    success: bool
