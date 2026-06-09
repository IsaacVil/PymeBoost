"use client";
import { Badge } from "@/shared/components/ui/Badge";
import { Contract } from "../validators/contractValidator";

interface ContractViewerProps {
  contract: Contract;
}

export function ContractViewer({ contract }: ContractViewerProps) {
  // TODO: implement full contract display by type (fixed-price, hourly, milestone-based)
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-slate-100">{contract.title}</p>
        <Badge status="pending" label={contract.type} />
      </div>
      <p className="text-sm text-slate-400 capitalize">{contract.type}</p>
    </div>
  );
}
