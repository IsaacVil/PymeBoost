from dataclasses import dataclass

@dataclass
class ProjectCompletedEvent:
    project_id: str
