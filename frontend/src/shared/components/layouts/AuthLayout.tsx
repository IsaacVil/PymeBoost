import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-50 border-2 border-zinc-800 rounded-lg p-8 shadow-sm">
        <div className="mb-8 text-center">
          <span className="text-2xl font-bold text-teal-500">PymeBoost</span>
        </div>
        {children}
      </div>
    </div>
  );
}
