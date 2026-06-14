from dataclasses import dataclass


@dataclass
class UseCaseUploadedEvent:
    user_id: str
    use_case_id: str
