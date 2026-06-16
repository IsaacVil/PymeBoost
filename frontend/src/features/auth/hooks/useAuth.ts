"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { AuthSession, UserRole, useAuthStore } from "@/store/authStore";
import { authService } from "../services/authService";
import { AuthResponse, CreateAdvisorPayload, CreateSmePayload } from "../types/auth";
import { LoginInput } from "../validators/authValidator";

const SESSION_TTL_MS = 180 * 60 * 1000; // matches backend JWT_EXPIRE_MINUTES (180)

function toSession(res: AuthResponse): AuthSession {
  const role: UserRole = res.account_type === "pyme" ? "SME" : "ADVISOR";
  return {
    userId: res.subject_id,
    email: res.email,
    role,
    token: res.access_token,
    refreshToken: null,
    permissions: [],
    expiresAt: Date.now() + SESSION_TTL_MS,
  };
}

export function useAuth() {
  const router = useRouter();
  const { session, isAuthenticated, isLoading, setSession, logout } = useAuthStore();

  const handleAuthed = (res: AuthResponse) => {
    setSession(toSession(res));
    router.push("/dashboard");
  };

  const loginMutation = useMutation({
    mutationFn: async (input: LoginInput) => {
      const res = await authService.login(input);
      if (!res.success || !res.data) throw new Error(res.error ?? "Login failed");
      return res.data;
    },
    onSuccess: handleAuthed,
  });

  const registerPymeMutation = useMutation({
    mutationFn: async (payload: CreateSmePayload) => {
      const res = await authService.registerPyme(payload);
      if (!res.success || !res.data) throw new Error(res.error ?? "Registration failed");
      return res.data;
    },
    onSuccess: handleAuthed,
  });

  const registerAdvisorMutation = useMutation({
    mutationFn: async (payload: CreateAdvisorPayload) => {
      const res = await authService.registerAdvisor(payload);
      if (!res.success || !res.data) throw new Error(res.error ?? "Registration failed");
      return res.data;
    },
    onSuccess: handleAuthed,
  });

  const signOut = () => {
    logout();
    router.push("/login");
  };

  const hasRole = (role: UserRole) => session.role === role;

  return {
    session,
    isAuthenticated,
    isLoading,
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    registerPyme: registerPymeMutation.mutate,
    isRegisteringPyme: registerPymeMutation.isPending,
    registerPymeError: registerPymeMutation.error,
    registerAdvisor: registerAdvisorMutation.mutate,
    isRegisteringAdvisor: registerAdvisorMutation.isPending,
    registerAdvisorError: registerAdvisorMutation.error,
    signOut,
    hasRole,
  };
}
