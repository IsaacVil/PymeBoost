from dataclasses import dataclass

@dataclass
class ContractProposedEvent:
    contract_id: str
    match_id: str
