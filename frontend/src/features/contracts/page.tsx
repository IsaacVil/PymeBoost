"use client";
import { DashboardLayout } from "@/shared/components/layouts/DashboardLayout";
import { Card } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";

const tierLabels = {
  standard: "Standard · 1 mo",
  medium:   "Medium · 3 mo",
  high:     "High · 6 mo",
  custom:   "Custom",
} as const;

// TODO: replace with useContracts() hook once connected to backend
const mockContracts = [
  { id: "c1", title: "Process Optimization Q3", tier: "high"     as const, status: "active"  as const, advisor: "Ana García" },
  { id: "c2", title: "Digital Marketing Strategy", tier: "standard" as const, status: "pending" as const, advisor: "Luis Torres" },
];

export default function ContractsPage() {
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
                  <p className="text-sm text-zinc-500">Advisor: {contract.advisor}</p>
                  <p className="text-xs text-zinc-400">{tierLabels[contract.tier]}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge status={contract.status} label={contract.status} />
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
