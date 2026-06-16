import { apiClient } from "@/lib/apiClient";
import { AuthCredentials, AuthResponse, CreateAdvisorPayload, CreateSmePayload } from "../types/auth";

// Auth API (local profile, mock JWT). Endpoints implemented in the User domain
// (backend/domains/user/controllers/*). apiClient injects the Bearer token.
export const authService = {
  login: (credentials: AuthCredentials) =>
    apiClient.request<AuthResponse>("/api/auth/login", { method: "POST", body: credentials }),

  registerPyme: (payload: CreateSmePayload) =>
    apiClient.request<AuthResponse>("/api/sme/accounts", { method: "POST", body: payload }),

  registerAdvisor: (payload: CreateAdvisorPayload) =>
    apiClient.request<AuthResponse>("/api/advisor/accounts", { method: "POST", body: payload }),

  me: () => apiClient.request<{ subjectId: string; accountType: string; email: string }>(
    "/api/auth/me",
    { method: "GET" },
  ),
};
