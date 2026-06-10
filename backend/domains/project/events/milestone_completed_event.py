from dataclasses import dataclass

@dataclass
class MilestoneCompletedEvent:
    milestone_id: str
    project_id: str
