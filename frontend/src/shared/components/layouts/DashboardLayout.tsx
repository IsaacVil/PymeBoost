import { ReactNode } from "react";
import { Navigation } from "@/shared/components/Navigation";
import { DemoResetButton } from "@/shared/components/DemoResetButton";
import { AuthGuard } from "@/shared/guards/AuthGuard";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-stone-100 flex">
        <aside className="w-60 bg-zinc-50 border-r-2 border-zinc-800 flex-shrink-0 flex flex-col">
          {/* Brand: P mark + wordmark */}
          <div className="px-5 py-4 border-b-2 border-zinc-800 flex items-center gap-2.5">
            <span
              className="display"
              style={{ width: 34, height: 34, borderRadius: "var(--r-sm)", background: "var(--ink)", color: "var(--paper)", display: "grid", placeItems: "center", border: "var(--bd) solid var(--ink)", fontSize: 22, lineHeight: 1, paddingTop: 2 }}
            >
              P
            </span>
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
      <DemoResetButton />
    </AuthGuard>
  );
}
