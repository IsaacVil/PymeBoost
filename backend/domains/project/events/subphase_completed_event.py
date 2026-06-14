from dataclasses import dataclass


@dataclass
class SubphaseCompletedEvent:
    subphase_id: str
    project_id: str
