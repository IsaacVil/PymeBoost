// Guard Pattern: Protects private routes and validates active session before rendering
// Why: Single point of security enforcement. Without it, every component checks auth = gaps

"use client";

import { ReactNode } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

interface AuthGuardProps {
  children: ReactNode;
  requiredRole?: "SME" | "ADVISOR";
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

  // Step 1: Check if still loading auth
  if (isLoading) {
    return fallback || <div>Loading...</div>;
  }

  // Step 2: Check if user is authenticated
  if (!isAuthenticated || !session.token) {
    // Redirect to login
    router.push("/auth/login");
    return null;
  }

  // Step 3: Check token expiration
  // TODO: Implement token refresh logic
  // if (isTokenExpired()) { refresh or redirect to login }

  // Step 4: Check required role
  if (requiredRole && session.role !== requiredRole) {
    router.push("/unauthorized");
    return null;
  }

  // Step 5: Check required permission
  if (requiredPermission && !hasPermission(requiredPermission)) {
    router.push("/forbidden");
    return null;
  }

  // All checks passed: render protected content
  return <>{children}</>;
}

// HOC version for pages/components
export function withAuthGuard<P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    requiredRole?: "SME" | "ADVISOR";
    requiredPermission?: string;
  }
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
