from dataclasses import dataclass

@dataclass
class ProjectStatusChangedEvent:
    project_id: str
    new_status: str
