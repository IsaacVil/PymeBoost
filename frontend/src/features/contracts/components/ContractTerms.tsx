"use client";
import { Contract } from "../validators/contractValidator";

interface ContractTermsProps {
  contract: Contract;
}

export function ContractTerms({ contract }: ContractTermsProps) {
  // TODO: implement terms breakdown per contract type
  // fixed-price: totalPrice + deliverables
  // hourly: hourlyRate + estimatedHours
  // milestone-based: milestones list + paymentPercentage per milestone
  return (
    <div className="space-y-2 text-sm text-zinc-600">
      <p>Currency: {contract.currency}</p>
    </div>
  );
}
