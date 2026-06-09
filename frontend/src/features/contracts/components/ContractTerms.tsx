"use client";
import { Contract } from "../validators/contractValidator";

interface ContractTermsProps {
  contract: Contract;
}

// Formats a number as Costa Rican colones
function formatCRC(amount: number): string {
  return `₡${amount.toLocaleString("es-CR")}`;
}

export function ContractTerms({ contract }: ContractTermsProps) {
  return (
    <div className="space-y-2 text-sm text-zinc-600">
      <div className="grid grid-cols-2 gap-x-8 gap-y-2">
        <div>
          <p className="text-xs font-mono text-zinc-400">Implementation budget</p>
          <p className="font-medium text-zinc-900">{formatCRC(contract.implementationBudget)}</p>
        </div>
        <div>
          <p className="text-xs font-mono text-zinc-400">Monthly retainer</p>
          <p className="font-medium text-zinc-900">{formatCRC(contract.monthlyRetainer)}</p>
        </div>
        <div>
          <p className="text-xs font-mono text-zinc-400">PymeBoost commission</p>
          <p className="font-medium text-zinc-900">{contract.pymeBoostCommission}%</p>
        </div>
        <div>
          <p className="text-xs font-mono text-zinc-400">Advisor commission</p>
          <p className="font-medium text-teal-600">{contract.advisorCommissionPercentage}%</p>
        </div>
      </div>
    </div>
  );
}
