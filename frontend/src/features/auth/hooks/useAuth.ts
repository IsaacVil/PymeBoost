"use client";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export function useAuth() {
  const { session, isAuthenticated, isLoading, logout } = useAuthStore();
  const router = useRouter();

  const signOut = async () => {
    logout();
    // TODO: also call Auth0 logout endpoint
    router.push("/auth/login");
  };

  const hasRole = (role: "SME" | "ADVISOR") => session.role === role;

  return { session, isAuthenticated, isLoading, signOut, hasRole };
}
