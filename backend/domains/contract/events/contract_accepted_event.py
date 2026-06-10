from dataclasses import dataclass

@dataclass
class ContractAcceptedEvent:
    contract_id: str
    match_id: str
