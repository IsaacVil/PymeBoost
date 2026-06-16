// Singleton Pattern: Single source of truth for authentication state.
// Persisted to localStorage so the session survives reloads and the apiClient can
// read the JWT outside React. `isLoading` stays true until rehydration completes,
// which keeps AuthGuard from redirecting before the stored session is restored.

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type UserRole = "SME" | "ADVISOR" | null;

export interface AuthSession {
  userId: string | null;
  email: string | null;
  role: UserRole;
  token: string | null;
  refreshToken: string | null;
  permissions: string[];
  expiresAt: number | null;
}

const EMPTY_SESSION: AuthSession = {
  userId: null,
  email: null,
  role: null,
  token: null,
  refreshToken: null,
  permissions: [],
  expiresAt: null,
};

interface AuthStore {
  session: AuthSession;
  isAuthenticated: boolean;
  isLoading: boolean;

  setSession: (session: AuthSession) => void;
  logout: () => void;
  updateToken: (token: string) => void;
  hasPermission: (permission: string) => boolean;
  isTokenExpired: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      session: EMPTY_SESSION,
      isAuthenticated: false,
      isLoading: true,

      setSession: (session) =>
        set({ session, isAuthenticated: !!session.token, isLoading: false }),

      logout: () => set({ session: EMPTY_SESSION, isAuthenticated: false, isLoading: false }),

      updateToken: (token) => set((s) => ({ session: { ...s.session, token } })),

      hasPermission: (permission) => get().session.permissions.includes(permission),

      isTokenExpired: () => {
        const { expiresAt } = get().session;
        return expiresAt ? Date.now() > expiresAt : false;
      },
    }),
    {
      name: "pymeboost-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ session: s.session }),
      onRehydrateStorage: () => (state) => {
        // Runs on the client once the persisted session is restored.
        if (state) {
          state.isAuthenticated = !!state.session.token;
          state.isLoading = false;
        }
      },
    },
  ),
);
