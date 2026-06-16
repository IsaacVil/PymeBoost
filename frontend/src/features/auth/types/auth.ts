// Auth types — aligned with the backend (local profile, mock JWT).

export interface AuthCredentials {
  email: string;
  password: string;
}

/** Returned by POST /api/auth/login and the register endpoints. */
export interface AuthResponse {
  access_token: string;
  token_type: string;
  account_type: "pyme" | "advisor";
  subject_id: string;
  email: string;
}

export interface CreateSmePayload {
  owner_name: string;
  business_email: string;
  phone: string;
  cedula_juridica: string;
  company_name: string;
  company_size: "small" | "medium" | "large";
  industry?: string | null;
  password: string;
}

export interface CreateAdvisorPayload {
  full_name: string;
  display_name?: string | null;
  personal_email: string;
  phone: string;
  linkedin_url: string;
  base_rate?: number | null;
  password: string;
}
