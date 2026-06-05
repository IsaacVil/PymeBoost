// Singleton Pattern: Single source of truth for authentication state
// Zustand enforces one instance automatically
// Why: Multiple instances would cause token mismatches and silent feature breakage

import { create } from "zustand";

interface AuthSession {
  userId: string | null;
  email: string | null;
  role: "SME" | "ADVISOR" | null;
  token: string | null;
  refreshToken: string | null;
  permissions: string[];
  expiresAt: number | null;
}

interface AuthStore {
  session: AuthSession;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setSession: (session: AuthSession) => void;
  logout: () => void;
  updateToken: (token: string) => void;
  hasPermission: (permission: string) => boolean;
  isTokenExpired: () => boolean;
}

// Singleton: Only one instance exists globally
export const useAuthStore = create<AuthStore>((set, get) => ({
  session: {
    userId: null,
    email: null,
    role: null,
    token: null,
    refreshToken: null,
    permissions: [],
    expiresAt: null,
  },
  isAuthenticated: false,
  isLoading: true,

  setSession: (session: AuthSession) => {
    set({
      session,
      isAuthenticated: !!session.token,
      isLoading: false,
    });
  },

  logout: () => {
    set({
      session: {
        userId: null,
        email: null,
        role: null,
        token: null,
        refreshToken: null,
        permissions: [],
        expiresAt: null,
      },
      isAuthenticated: false,
    });
    // TODO: Clear localStorage, notify backend
  },

  updateToken: (token: string) => {
    const { session } = get();
    set({
      session: { ...session, token },
    });
  },

  hasPermission: (permission: string) => {
    const { session } = get();
    return session.permissions.includes(permission);
  },

  isTokenExpired: () => {
    const { session } = get();
    if (!session.expiresAt) return false;
    return Date.now() > session.expiresAt;
  },
}));
