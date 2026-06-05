# PymeBoost Pattern Implementation Guide

This document shows how design patterns are implemented in the PymeBoost frontend codebase.

## Patterns in Action: Advisor Matching Flow

Here's how all patterns work together when a user performs advisor matching:

### 1. **User navigates to Matching page**
```
→ AuthGuard validates session (Guard Pattern)
  - Checks if user is authenticated
  - Verifies required permissions
  - Redirects to login if needed
```

### 2. **Component loads matching interface**
```
→ MatchingPage component calls useAdvisorMatching() (Factory Hook Pattern)
  - Hook sets up form state
  - Initializes TanStack Query via QueryClientFactory
  - Configures validation schemas
  - Sets up notification listeners
```

### 3. **User submits matching form**
```
→ Hook calls matchingService.getMatches() (Strategy Pattern)
  - Service selects algorithm (rule-based, AI, manual)
  - API call goes through ApiClient (Template Method Pattern)
    - Injects JWT token from authStore (Singleton Pattern)
    - Applies error handling and retries
    - Validates response with Zod
```

### 4. **Backend returns advisor recommendations**
```
→ TanStack Query caches response (via QueryClientFactory)
  - Cache settings apply consistently across all queries
  - Auto-refetch on stale data
  - Deduplication of requests
```

### 5. **Match created, users notified**
```
→ notificationStore publishes event (Observer Pattern)
  - All subscribing features react (chat, dashboard, etc.)
  - Components don't know about each other
  - Event propagates system-wide
```

### 6. **User creates contract**
```
→ ContractValidator validates terms (Strategy Pattern)
  - Different validation rules per contract type
  - Fixed-price, hourly, or milestone-based
  - Invalid data never reaches components or state
```

---

## File Locations for Each Pattern

| Pattern | File | Purpose |
|---------|------|---------|
| **Guard** | `frontend/src/shared/guards/AuthGuard.tsx` | Route protection, session validation |
| **Singleton** | `frontend/src/store/authStore.ts` | Global auth state, one instance |
| **Observer** | `frontend/src/store/notificationStore.ts` | Event publishing, decoupled subscribers |
| **Template Method** | `frontend/src/lib/apiClient.ts` | Common HTTP flow, JWT injection, retries |
| **Strategy (Matching)** | `frontend/src/features/matching/services/matchingService.ts` | Pluggable matching algorithms |
| **Strategy (Contracts)** | `frontend/src/features/contracts/validators/contractValidator.ts` | Type-specific validation rules |
| **Factory (Hook)** | `frontend/src/features/matching/hooks/useAdvisorMatching.ts` | Encapsulates workflow setup |
| **Factory (Query)** | `frontend/src/lib/queryClient.ts` | Centralizes cache configuration |

---

## Usage Examples

### Using AuthGuard
```tsx
import { AuthGuard } from "@/shared/guards/AuthGuard";

export default function PrivatePage() {
  return (
    <AuthGuard requiredRole="SME" requiredPermission="create:match">
      <MatchingInterface />
    </AuthGuard>
  );
}
```

### Using authStore (Singleton)
```tsx
import { useAuthStore } from "@/store/authStore";

export function UserMenu() {
  const { session, hasPermission, logout } = useAuthStore();
  
  return (
    <>
      {session.email}
      {hasPermission("create:contract") && <CreateContractButton />}
      <LogoutButton onClick={logout} />
    </>
  );
}
```

### Using notificationStore (Observer)
```tsx
import { useNotificationStore } from "@/store/notificationStore";

export function ContractAcceptedHandler() {
  const { subscribe } = useNotificationStore();
  
  useEffect(() => {
    // Subscribe to notifications
    const unsubscribe = subscribe((notification) => {
      if (notification.type === "contract-accepted") {
        // React to event across entire app
        updateDashboard();
      }
    });
    
    return unsubscribe;
  }, []);
}
```

### Using ApiClient (Template Method)
```tsx
// Services extend or use ApiClient; they don't duplicate request logic
import { apiClient } from "@/lib/apiClient";

export const matchingService = {
  getAdvisors: async () => {
    // ApiClient handles: JWT injection, error handling, retries
    return apiClient.request("/advisors", { method: "GET" });
  }
};
```

### Using useAdvisorMatching (Factory Hook)
```tsx
import { useAdvisorMatching } from "@/features/matching/hooks/useAdvisorMatching";

export function MatchingPage() {
  const {
    matches,
    isLoading,
    formData,
    updateFormData,
    performMatching,
    selectAdvisor,
  } = useAdvisorMatching({ pymeId: "123", strategy: "ai" });

  return (
    <form onSubmit={performMatching}>
      <input
        value={formData.industry}
        onChange={(e) => updateFormData({ industry: e.target.value })}
      />
      <button type="submit">Find Advisors</button>
      {matches.map((m) => (
        <AdvisorCard key={m.advisorId} match={m} onSelect={selectAdvisor} />
      ))}
    </form>
  );
}
```

### Using Strategy Pattern (ContractValidator)
```tsx
import { ContractValidator } from "@/features/contracts/validators/contractValidator";

// Validate any contract type
const result = ContractValidator.validate(formData);
if (!result.valid) {
  showError(result.error);
  return;
}

// Or validate specific type
const hourlyResult = ContractValidator.validateHourly(formData);
if (hourlyResult.valid) {
  saveContract(hourlyResult.data);
}
```

---

## Importance

1. **Guard Pattern**: Security at a single point. Without it, every component checks auth = gaps.
2. **Singleton**: One source of truth. Multiple instances = token mismatches = silent breakage.
3. **Observer**: Decouples features. Without it, components need prop drilling or direct imports = fragile.
4. **Template Method**: No duplicate error handling. Bugs fixed in one place propagate everywhere.
5. **Strategy**: New algorithms without touching components. Extensible without risk.
6. **Factory**: Encapsulates complexity. Components use simple interfaces instead of assembling 20 pieces.

