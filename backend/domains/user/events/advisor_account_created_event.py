from dataclasses import dataclass

@dataclass
class AdvisorAccountCreatedEvent:
    advisor_id: str
    email: str
    specialization: str
