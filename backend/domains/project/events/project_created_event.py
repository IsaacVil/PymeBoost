from dataclasses import dataclass

@dataclass
class ProjectCreatedEvent:
    project_id: str
    contract_id: str
