from dataclasses import dataclass

@dataclass
class MatchCreatedEvent:
    match_id: str
    pyme_id: str
    advisor_id: str
