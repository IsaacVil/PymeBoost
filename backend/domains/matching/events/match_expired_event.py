from dataclasses import dataclass

@dataclass
class MatchExpiredEvent:
    match_id: str
