"use client";
import { DashboardLayout } from "@/shared/components/layouts/DashboardLayout";
import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { Badge } from "@/shared/components/ui/Badge";

const mockReports = [
  { id: "r1", title: "Q2 Process Optimization Report", date: "Jun 1, 2026", status: "complete" as const },
  { id: "r2", title: "Marketing Campaign Performance", date: "May 15, 2026", status: "pending" as const },
];

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Reports</h1>
            <p className="text-zinc-500 mt-1">Track advisor deliverables and project performance.</p>
          </div>
          <Button size="sm">Generate Report</Button>
        </div>

        <div className="space-y-4">
          {mockReports.map((report) => (
            <Card key={report.id}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-zinc-900">{report.title}</p>
                  <p className="text-sm text-zinc-500">{report.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge status={report.status} label={report.status} />
                  <Button variant="ghost" size="sm">Download</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
