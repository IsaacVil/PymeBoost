from dataclasses import dataclass

@dataclass
class SmeAccountCreatedEvent:
    sme_id: str
    email: str
    company_name: str
