from dataclasses import dataclass

@dataclass
class ContractRejectedEvent:
    contract_id: str
    reason: str
