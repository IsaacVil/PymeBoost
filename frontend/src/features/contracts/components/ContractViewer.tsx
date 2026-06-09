"use client";
import { Badge } from "@/shared/components/ui/Badge";
import { Contract } from "../validators/contractValidator";

const tierLabels: Record<Contract["tier"], string> = {
  standard: "Standard · 1 mo",
  medium:   "Medium · 3 mo",
  high:     "High · 6 mo",
  custom:   "Custom",
};

const tierStatus = {
  standard: "neutral",
  medium:   "active",
  high:     "complete",
  custom:   "pending",
} as const;

interface ContractViewerProps {
  contract: Contract;
}

export function ContractViewer({ contract }: ContractViewerProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-zinc-900">{contract.title}</p>
        <Badge status={tierStatus[contract.tier]} label={tierLabels[contract.tier]} />
      </div>
      <div className="flex gap-6 text-sm text-zinc-500">
        <span>Start: {contract.startDate.toLocaleDateString()}</span>
        <span>End: {contract.endDate.toLocaleDateString()}</span>
        <span>{contract.durationMonths} month{contract.durationMonths > 1 ? "s" : ""}</span>
      </div>
      <div className="space-y-1">
        <p className="text-xs font-mono text-zinc-400">Objectives</p>
        <ul className="space-y-1">
          {contract.objectives.map((obj, i) => (
            <li key={i} className="text-sm text-zinc-700">· {obj}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
