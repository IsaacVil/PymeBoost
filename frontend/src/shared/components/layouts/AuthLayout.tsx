import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-lg p-8 shadow-lg">
        <div className="mb-8 text-center">
          <span className="text-2xl font-bold text-purple-400">PymeBoost</span>
        </div>
        {children}
      </div>
    </div>
  );
}
