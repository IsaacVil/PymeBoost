import { ReactNode } from "react";
import { Navigation } from "@/shared/components/Navigation";
import { AuthGuard } from "@/shared/guards/AuthGuard";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-slate-950 flex">
        <aside className="w-64 bg-slate-900 border-r border-slate-800 flex-shrink-0">
          <div className="p-6 border-b border-slate-800">
            <span className="text-xl font-bold text-purple-400">PymeBoost</span>
          </div>
          <Navigation />
        </aside>
        <main className="flex-1 overflow-auto">
          <div className="max-w-6xl mx-auto p-8">{children}</div>
        </main>
      </div>
    </AuthGuard>
  );
}
