// Auth types and interfaces

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  expiresIn: number;
}
