// Template Method Pattern: Base HTTP client defining common request/response flow
// Reused by all feature services (matchingService, contractService, etc.)
// This eliminates duplicate error handling, JWT injection, and retry logic across services

interface RequestOptions {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: unknown;
}

interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: string | null;
  statusCode?: number;
}

export class ApiClient {
  private baseUrl: string;
  private maxRetries = 3;
  private retryDelay = 1000;

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api") {
    this.baseUrl = baseUrl;
  }

  // Template Method: defines the common request flow
  // All services call this instead of duplicating logic
  async request<T>(endpoint: string, options: RequestOptions): Promise<ApiResponse<T>> {
    try {
      // Step 1: Prepare request (inject JWT, set headers)
      const requestConfig = this.prepareRequest(endpoint, options);

      // Step 2: Execute request with retry logic
      const response = await this.executeWithRetry(requestConfig);

      // Step 3: Handle response status
      const responseData = await this.handleResponse<T>(response);

      // Step 4: Validate (services validate with Zod schemas)
      return { success: true, data: responseData, error: null, statusCode: response.status };
    } catch (error) {
      return this.handleError<T>(error);
    }
  }

  // Subclasses can override these without breaking the template
  protected prepareRequest(endpoint: string, options: RequestOptions) {
    const token = this.getAuthToken();
    const headers = {
      "Content-Type": "application/json",
      "X-Trace-ID": this.generateTraceId(),
      ...(token && { "Authorization": `Bearer ${token}` }),
      ...options.headers,
    };

    return {
      url: `${this.baseUrl}${endpoint}`,
      method: options.method,
      headers,
      body: options.body,
    };
  }

  protected async executeWithRetry(config: any, attempt = 0): Promise<Response> {
    try {
      return await fetch(config.url, {
        method: config.method,
        headers: config.headers,
        body: config.body ? JSON.stringify(config.body) : undefined,
      });
    } catch (error) {
      if (attempt < this.maxRetries) {
        await new Promise(resolve => setTimeout(resolve, this.retryDelay * (attempt + 1)));
        return this.executeWithRetry(config, attempt + 1);
      }
      throw error;
    }
  }

  protected async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return response.json();
  }

  protected handleError<T>(error: unknown): ApiResponse<T> {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[ApiClient Error]", message);
    // TODO: Log to Sentry
    return { success: false, data: null, error: message };
  }

  private getAuthToken(): string {
    if (typeof window === "undefined") return "";
    // TODO: Get from authStore (Zustand singleton)
    return localStorage.getItem("auth_token") || "";
  }

  private generateTraceId(): string {
    return `trace-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Singleton instance: reused by all feature services
export const apiClient = new ApiClient();
