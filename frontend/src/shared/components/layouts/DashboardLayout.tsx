import { ReactNode } from "react";
import { Navigation } from "@/shared/components/Navigation";
import { AuthGuard } from "@/shared/guards/AuthGuard";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-stone-100 flex">
        <aside className="w-64 bg-zinc-50 border-r-2 border-zinc-800 flex-shrink-0">
          <div className="p-6 border-b-2 border-zinc-800">
            <span className="display text-2xl text-zinc-900">
              Pyme<span className="text-teal-500">Boost</span>
            </span>
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
