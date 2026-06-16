// Guard Pattern: Protects private routes and validates active session before rendering
// Why: Single point of security enforcement. Without it, every component checks auth = gaps

"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { UserRole, useAuthStore } from "@/store/authStore";

interface AuthGuardProps {
  children: ReactNode;
  requiredRole?: UserRole;
  requiredPermission?: string;
  fallback?: ReactNode;
}

export function AuthGuard({
  children,
  requiredRole,
  requiredPermission,
  fallback,
}: AuthGuardProps) {
  const router = useRouter();
  const { session, isAuthenticated, isLoading, hasPermission } = useAuthStore();

  const denied =
    !isAuthenticated ||
    !session.token ||
    (requiredRole != null && session.role !== requiredRole) ||
    (requiredPermission != null && !hasPermission(requiredPermission));

  // Navigation must happen in an effect, never during render.
  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated || !session.token) {
      router.replace("/login");
    } else if (requiredRole != null && session.role !== requiredRole) {
      router.replace("/unauthorized");
    } else if (requiredPermission != null && !hasPermission(requiredPermission)) {
      router.replace("/forbidden");
    }
  }, [isLoading, isAuthenticated, session.token, session.role, requiredRole, requiredPermission, hasPermission, router]);

  // While loading or redirecting, render the fallback (never the protected content).
  if (isLoading || denied) {
    return <>{fallback ?? <div className="min-h-screen flex items-center justify-center text-zinc-400">Loading…</div>}</>;
  }

  return <>{children}</>;
}

// HOC version for pages/components
export function withAuthGuard<P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    requiredRole?: UserRole;
    requiredPermission?: string;
  },
) {
  return function GuardedComponent(props: P) {
    return (
      <AuthGuard
        requiredRole={options?.requiredRole}
        requiredPermission={options?.requiredPermission}
      >
        <Component {...props} />
      </AuthGuard>
    );
  };
}
