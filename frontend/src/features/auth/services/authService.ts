import { apiClient } from "@/lib/apiClient";
import { AuthResponse } from "../types/auth";

export const authService = {
  // Exchange Auth0 code for backend session
  exchangeCode: (code: string) =>
    apiClient.request<AuthResponse>("/auth/callback", { method: "POST", body: { code } }),

  // Refresh token when nearing expiration
  refreshToken: (refreshToken: string) =>
    apiClient.request<AuthResponse>("/auth/refresh", { method: "POST", body: { refreshToken } }),

  // Logout and invalidate session on backend
  logout: () =>
    apiClient.request<void>("/auth/logout", { method: "POST" }),
};
