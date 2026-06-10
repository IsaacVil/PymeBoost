"use client";
import { useState, lazy, Suspense } from "react";
import { DashboardLayout } from "@/shared/components/layouts/DashboardLayout";
import { Modal } from "@/shared/components/ui/Modal";
import { Card } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { Contract } from "./validators/contractValidator";

// Loaded on demand — only mounts when the user opens a contract's negotiation modal
const ContractNegotiation = lazy(
  () => import("./components/ContractNegotiation").then((m) => ({ default: m.ContractNegotiation }))
);

const tierLabels = {
  standard: "Standard · 1 mo",
  medium:   "Medium · 3 mo",
  high:     "High · 6 mo",
  custom:   "Custom",
} as const;

const mockContracts: Contract[] = [
  {
    id: "c1", title: "Process Optimization Q3",
    tier: "high", durationMonths: 6, pymeBoostCommission: 7,
    advisorId: "adv-1", pymeId: "pyme-1",
    implementationBudget: 800_000, monthlyRetainer: 200_000,
    advisorCommissionPercentage: 15,
    startDate: new Date("2026-07-01"), endDate: new Date("2027-01-01"),
    status: "active",
    objectives: ["Reduce operational costs by 20%"],
    actionPlan: [
      { phase: 1, title: "Diagnosis",    description: "Analyze current processes and identify gaps" },
      { phase: 2, title: "Planning",     description: "Define optimized process and KPIs" },
      { phase: 3, title: "Execution",    description: "Implement the new process with the team" },
      { phase: 4, title: "Monitoring",   description: "Track KPIs and adjust based on results" },
      { phase: 5, title: "Final report", description: "Deliver report and measure impact vs baseline" },
    ],
  },
  {
    id: "c2", title: "Digital Marketing Strategy",
    tier: "standard", durationMonths: 1, pymeBoostCommission: 3,
    advisorId: "adv-2", pymeId: "pyme-1",
    implementationBudget: 300_000, monthlyRetainer: 100_000,
    advisorCommissionPercentage: 10,
    startDate: new Date("2026-08-01"), endDate: new Date("2026-09-01"),
    status: "pending",
    objectives: ["Increase social media leads by 30%"],
    actionPlan: [
      { phase: 1, title: "Audit",        description: "Review current digital presence and channels" },
      { phase: 2, title: "Strategy",     description: "Define target audience and content plan" },
      { phase: 3, title: "Launch",       description: "Execute first campaign across selected channels" },
      { phase: 4, title: "Optimize",     description: "A/B test creatives and adjust budget allocation" },
      { phase: 5, title: "Report",       description: "Deliver performance report with recommendations" },
    ],
  },
];

const advisorNames: Record<string, string> = {
  "adv-1": "Ana García",
  "adv-2": "Luis Torres",
};

export default function ContractsPage() {
  const [selected, setSelected] = useState<Contract | null>(null);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Contracts</h1>
            <p className="text-zinc-500 mt-1">Track negotiations, milestones, and deliverables.</p>
          </div>
          <Button size="sm">New Contract</Button>
        </div>

        <div className="space-y-4">
          {mockContracts.map((contract) => (
            <Card key={contract.id}>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-semibold text-zinc-900">{contract.title}</p>
                  <p className="text-sm text-zinc-500">Advisor: {advisorNames[contract.advisorId]}</p>
                  <p className="text-xs text-zinc-400">{tierLabels[contract.tier]}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge status={contract.status} label={contract.status} />
                  <Button variant="ghost" size="sm" onClick={() => setSelected(contract)}>View</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* ContractNegotiation is lazy-loaded — its JS only downloads when the modal opens */}
      <Modal
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected?.title ?? ""}
      >
        <Suspense fallback={<p className="text-zinc-400 animate-pulse">Loading contract…</p>}>
          {selected && (
            <ContractNegotiation
              contract={selected}
              onAccept={(id: string) => { setSelected(null); console.log("accepted", id); }}
              onReject={(id: string, reason: string) => { setSelected(null); console.log("rejected", id, reason); }}
              onCounterOffer={(id: string, terms: Partial<Contract>) => { console.log("counter", id, terms); }}
            />
          )}
        </Suspense>
      </Modal>
    </DashboardLayout>
  );
}
