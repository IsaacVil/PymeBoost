// Contract types and interfaces

export interface ContractMetadata {
  createdAt: number;
  updatedAt: number;
  createdBy: string;
}

export interface ContractNegotiation {
  round: number;
  proposedBy: string;
  terms: Record<string, unknown>;
}
