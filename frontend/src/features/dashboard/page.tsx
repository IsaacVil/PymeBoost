"use client";
import { DashboardLayout } from "@/shared/components/layouts/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import { useAuthStore } from "@/store/authStore";

// TODO: replace with useDashboard() once backend is connected
const mockStats = [
  { label: "Active Projects", value: "3" },
  { label: "Advisors Connected", value: "5" },
  { label: "Contracts Signed", value: "2" },
  { label: "Avg. Advisor Rating", value: "4.8" },
];

const mockMilestones = [
  { id: "ms1", title: "Process audit delivered", project: "Process Optimization", status: "complete" as const },
  { id: "ms2", title: "Implementation roadmap", project: "Process Optimization", status: "active" as const },
  { id: "ms3", title: "Campaign strategy draft", project: "Digital Marketing", status: "pending" as const },
];

export default function DashboardPage() {
  const { session } = useAuthStore();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Dashboard</h1>
          <p className="text-slate-400 mt-1">Welcome back, {session.email}</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {mockStats.map((stat) => (
            <Card key={stat.label}>
              <p className="text-sm text-slate-400">{stat.label}</p>
              <p className="text-3xl font-bold text-purple-400 mt-1">{stat.value}</p>
            </Card>
          ))}
        </div>

        {/* Milestones */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-100">Upcoming Milestones</h2>
          {mockMilestones.map((ms) => (
            <Card key={ms.id}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-100">{ms.title}</p>
                  <p className="text-sm text-slate-400">{ms.project}</p>
                </div>
                <Badge status={ms.status} label={ms.status} />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
