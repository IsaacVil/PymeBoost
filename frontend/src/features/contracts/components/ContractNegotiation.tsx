"use client";
import { Button } from "@/shared/components/ui/Button";
import { ContractViewer } from "./ContractViewer";
import { ContractTerms } from "./ContractTerms";
import { Contract } from "../validators/contractValidator";

interface ContractNegotiationProps {
  contract: Contract;
  onAccept: (id: string) => void;
  onReject: (id: string, reason: string) => void;
  onCounterOffer: (id: string, terms: Partial<Contract>) => void;
}

export function ContractNegotiation({ contract, onAccept, onReject, onCounterOffer }: ContractNegotiationProps) {
  // TODO: implement full negotiation panel with counter-offer form
  return (
    <div className="space-y-6">
      <ContractViewer contract={contract} />
      <ContractTerms contract={contract} />
      <div className="flex gap-3">
        <Button onClick={() => onAccept(contract.id)}>Accept</Button>
        <Button variant="danger" onClick={() => onReject(contract.id, "")}>Reject</Button>
        <Button variant="ghost" onClick={() => onCounterOffer(contract.id, {})}>Counter Offer</Button>
      </div>
    </div>
  );
}
