from dataclasses import dataclass

@dataclass
class MatchSwipedEvent:
    pyme_id: str
    advisor_id: str
    approved: bool
