# PymeBoost

Problem Statement: Provide a results-driven connection between SMEs and high-performance advisors.

Currently, starting and scaling an SME can become a complex and exhausting process, especially for entrepreneurs who lack prior experience in business management, process optimization, or scalability strategies. Many SMEs struggle to identify which areas of their business require improvement, how to implement more efficient processes, and most importantly, whom to trust to execute these changes effectively.

In many cases, SMEs do not have access to high-quality specialized advisory services or end up hiring consultants without clear performance metrics, structured follow-up, or real guarantees of results. This often leads to financial losses, poorly implemented processes, and low long-term sustainability. Additionally, there is a lack of trustworthy platforms where businesses can discover verified experts, compare past performance, and engage in transparent, structured collaborations.

PymeBoost emerges as a solution specifically designed for SMEs, creating an ecosystem where businesses can connect with advisors and specialists capable of optimizing specific operational areas within the organization. Through an intelligent matching system powered by AI, the platform analyzes each SME’s context, challenges, and objectives to recommend the most suitable advisors, while also enabling structured interaction through negotiation, contract generation, and continuous performance tracking. In this way, PymeBoost transforms the traditional consulting model into a results-driven system based on measurable outcomes, continuous monitoring, and transparency, ensuring that both the SME and the advisor remain aligned under clear and quantifiable objectives.

--- 

## Authors
 * Isaac Villalobos Bonilla, 2024124285
 * Christopher Daniel Vargas Villalta, 2024108443
 * Santiago Espinoza Rendón, 2024156530
 * Jose Ignacio Paniagua Vargas, 2024163735

--- 

# Prototypes & UX/UI

Figma: 

---

# Frontend

## 1.1 Technology Stack 

| Technology                    | Version             | Purpose                               | Justification                                                                                                                            |
| ----------------------------- | ------------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| React                         | 19.1.0              | Main UI library                       | Enables the development of dynamic and reusable interfaces for dashboards, chats, and interactive systems within PymeBoost.              |
| Next.js                       | 15.3.3              | Main frontend framework               | Provides routing, hybrid rendering, and a modern architecture compatible with cloud deployments and enterprise APIs.                     |
| TypeScript                    | 5.8.3               | Main frontend language                | Improves maintainability, scalability, and reliability through strong typing and integration with the backend OpenAPI 3.1 specification. |
| Node.js                       | 22.15.0 LTS         | Development runtime                   | Used for builds, tooling, and automation within the frontend ecosystem.                                                                  |
| TailwindCSS                   | 4.1.8               | Utility-first CSS framework           | Enables rapid development of modern, responsive, and consistent interfaces for dashboards and SaaS systems.                              |
| Zustand                       | 5.0.5               | Global state management               | Simplifies management of global states such as authentication, chats, and notifications in a lightweight and scalable way.               |
| TanStack Query                | 5.76.1              | Server state management and caching   | Synchronizes backend data, manages caching, and automatically updates information from APIs.                                             |
| Auth0                         | 3.1.1               | Authentication and session management | Provides secure authentication and centralized user management integrated with the backend authentication system with JWT validation.    |
| Framer Motion                 | 12.15.0             | Animation and transition system       | Enables modern animations and interactive transitions to improve the platform user experience.                                           |
| ESLint                        | 9.18.0              | Static code analysis                  | Detects errors, enforces development conventions, and improves overall frontend code quality.                                            |
| Prettier                      | 3.3.3               | Automatic code formatting             | Maintains visual consistency and code standardization across the project and shared monorepo.                                            |
| React Hook Form               | 7.57.0              | Form management and validation        | Efficiently manages complex forms and input handling with minimal re-renders; integrates seamlessly with Zod validation schemas.         |
| Zod                           | 3.23.8              | Data validation and typing            | Provides typed validation and data consistency before sending information to the backend; runtime schema validation for API DTOs.       |
| Vitest                        | 2.1.8               | Unit and integration testing          | Fast, ESM-native test framework integrated with Vite; enables rapid testing for components, hooks, and utilities.                        |
| Playwright                    | 1.58.2              | End-to-end testing                    | Automates testing for critical flows such as authentication, dashboards, and contracts within the platform across multiple browsers.     |
| Radix UI                      | Latest Stable (13.x)| Accessible component primitives       | Provides unstyled, accessible component foundational elements (Dialog, Select, Tooltip, etc.) for building accessible interfaces.       |
| @radix-ui/react-dialog        | Latest Stable (13.x)| Accessible dialog component           | Foundation for modals, alerts, and forms with full keyboard navigation and screen reader support (WCAG 2.1 AA).                       |
| Fetch API                     | Browser Native      | HTTP client for API communication     | Native browser API used via TanStack Query for making requests to backend REST APIs; no external dependency required.                   |
| Vercel                        | Latest Stable       | Frontend hosting and deployment       | Enables deployment of Next.js applications with native SSR/CSR support, preview deployments, and automatic optimization.                |
| GitHub Actions                | Latest Stable       | CI/CD and automation                  | Automates testing, builds, and deployments within the shared monorepo environment with GitHub Environments.                             |
| GitHub Environments           | Latest Stable       | Environment management                | Supports secure and organized management of Development, Stage, and Production environments with secrets and deployment approvals.      |
| Google Cloud Platform         | Latest Stable       | Main cloud platform service           | Provides integration with backend services (Cloud Run, Cloud SQL) and serves as primary cloud infrastructure.                            |
| Google Cloud Operations Suite | Latest Stable       | Backend observability and monitoring  | Cloud Logging, Cloud Monitoring, Cloud Trace for backend services, infrastructure metrics, and distributed tracing.                      |
| Sentry                        | 8.x                 | Frontend error tracking and monitoring| Real-time error capture, source map integration, user session tracking, and performance monitoring specific to client-side errors.      |
| Client-Side Rendering (CSR)   | Next.js 15          | Frontend rendering strategy           | Enables dynamic and highly interactive user experiences directly in the browser for dashboards, chats, matching systems, and real-time interactions. |
| Feature-Based Architecture    | Custom Architecture | Modular frontend organization         | Supports scalability and separation of functionalities such as dashboards, matching, contracts, and messaging without technical coupling. |
| Monorepo Architecture         | GitHub Monorepo     | Shared frontend/backend repository    | Centralizes workflows, CI/CD pipelines, and collaboration between frontend and backend teams with unified version control.              |
| Development / Stage / Production Environments | Standard Environment Strategy | Environment separation | Allows independent configuration and deployment workflows for development, testing, and production stages of the platform. |

---

## 1.2 Feature-Based Architecture & Folder Structure

PymeBoost frontend follows a **feature-based architecture** where the application is organized by business domains and features rather than technical layers. Each feature is self-contained with its own components, hooks, services, and state management, improving scalability and team autonomy.

The architecture supports:

- Feature ownership: each team can develop, test, and deploy features independently.
- Reduced cross-feature dependencies: features interact only through well-defined interfaces.
- Clear responsibility boundaries: each feature knows its own logic, data, and UI.
- Scalable module growth: new features added without affecting existing ones.
- Simplified testing: feature-specific tests remain isolated.

### Core Features

PymeBoost is built around these core features:

- **Matching:** Advisor discovery, recommendations, swipe decisions, match creation.
- **Contracts:** Contract negotiation, proposal submission, acceptance, tracking.
- **Messaging:** Real-time chat between PYME and advisors, message history.
- **Dashboard:** Project overview, metrics, milestones, status tracking.
- **Reports:** Report generation, viewing, download, sharing.
- **Auth:** User authentication, login, logout, session management.

### Complete Folder Structure

Each feature is a complete, self-contained module with its own layers:

```txt
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── (auth)/
│       ├── login/
│       │   └── page.tsx
│       └── callback/
│           └── page.tsx
│
├── features/
│   ├── matching/
│   │   ├── components/
│   │   │   ├── MatchingCard.tsx
│   │   │   ├── MatchingGrid.tsx
│   │   │   └── MatchingFilters.tsx
│   │   ├── hooks/
│   │   │   └── useAdvisorMatching.ts
│   │   ├── services/
│   │   │   └── matchingService.ts
│   │   ├── types/
│   │   │   └── matching.ts
│   │   ├── validators/
│   │   │   └── matchingValidator.ts
│   │   └── page.tsx
│   │
│   ├── contracts/
│   │   ├── components/
│   │   │   ├── ContractViewer.tsx
│   │   │   ├── ContractNegotiation.tsx
│   │   │   └── ContractTerms.tsx
│   │   ├── hooks/
│   │   │   └── useContractNegotiation.ts
│   │   ├── services/
│   │   │   └── contractService.ts
│   │   ├── types/
│   │   │   └── contract.ts
│   │   ├── validators/
│   │   │   └── contractValidator.ts
│   │   └── page.tsx
│   │
│   ├── messaging/
│   │   ├── components/
│   │   │   ├── ChatPanel.tsx
│   │   │   ├── MessageList.tsx
│   │   │   └── MessageInput.tsx
│   │   ├── hooks/
│   │   │   └── useChat.ts
│   │   ├── services/
│   │   │   └── chatService.ts
│   │   ├── types/
│   │   │   └── chat.ts
│   │   ├── validators/
│   │   │   └── chatValidator.ts
│   │   └── page.tsx
│   │
│   ├── dashboard/
│   │   ├── components/
│   │   │   ├── DashboardStats.tsx
│   │   │   ├── ProjectTimeline.tsx
│   │   │   └── PerformanceMetrics.tsx
│   │   ├── hooks/
│   │   │   └── useDashboard.ts
│   │   ├── services/
│   │   │   └── dashboardService.ts
│   │   ├── types/
│   │   │   └── dashboard.ts
│   │   ├── validators/
│   │   │   └── dashboardValidator.ts
│   │   └── page.tsx
│   │
│   ├── reports/
│   │   ├── components/
│   │   │   ├── ReportViewer.tsx
│   │   │   └── ReportGenerator.tsx
│   │   ├── hooks/
│   │   │   └── useReports.ts
│   │   ├── services/
│   │   │   └── reportService.ts
│   │   ├── types/
│   │   │   └── report.ts
│   │   └── page.tsx
│   │
│   └── auth/
│       ├── components/
│       │   ├── LoginForm.tsx
│       │   └── LogoutButton.tsx
│       ├── hooks/
│       │   └── useAuth.ts
│       ├── services/
│       │   └── authService.ts
│       ├── types/
│       │   └── auth.ts
│       └── page.tsx
│
├── shared/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Dialog.tsx
│   │   ├── layouts/
│   │   │   ├── DashboardLayout.tsx
│   │   │   └── AuthLayout.tsx
│   │   └── Navigation.tsx
│   ├── hooks/
│   │   └── useNotifications.ts
│   ├── types/
│   │   └── common.ts
│   └── utils/
│       └── helpers.ts
│
├── store/
│   ├── authStore.ts
│   ├── notificationStore.ts
│   └── uiStore.ts
│
├── lib/
│   ├── queryClient.ts
│   └── axios.ts
│
├── tests/
│   ├── features/
│   │   ├── matching.spec.ts
│   │   ├── contracts.spec.ts
│   │   ├── messaging.spec.ts
│   │   └── auth.spec.ts
│   └── shared/
│       ├── Button.spec.ts
│       └── helpers.spec.ts
│
├── styles/
│   ├── globals.css
│   └── variables.css
│
└── public/
    ├── logo.png
    └── icons/
```

### Folder Responsibilities
 
| Folder | Responsibility |
|--------|----------------|
| `app/` | Next.js App Router pages and route structure. Contains layout.tsx for root layout and route-based pages. |
| `features/matching/` | Advisor discovery and matching logic. Components for cards, grids, and filters. |
| `features/contracts/` | Contract lifecycle management. Components for viewing, negotiating, and tracking contracts. |
| `features/messaging/` | Real-time chat between PYME and advisors. Components for chat panel, message list, and input. |
| `features/dashboard/` | Project overview and metrics. Components for stats, timelines, and performance tracking. |
| `features/reports/` | Report generation and viewing. Components for report viewer and generator. |
| `features/auth/` | User authentication and session management. Components for login and logout. |
| `features/[feature]/components/` | UI components specific to that feature. Used only within that feature. |
| `features/[feature]/hooks/` | Business logic hooks that implement workflows. Called by components. |
| `features/[feature]/services/` | API communication functions. Called by hooks. One service per feature. |
| `features/[feature]/types/` | TypeScript interfaces specific to the feature. |
| `features/[feature]/validators/` | Zod validation schemas for feature data. |
| `features/[feature]/page.tsx` | Route page component for that feature. |
| `shared/components/` | Reusable UI components used across multiple features. |
| `shared/components/ui/` | Basic UI primitives (Button, Input, Badge, Modal, Card, Dialog, etc.). |
| `shared/components/layouts/` | Layout wrappers shared across features (DashboardLayout, AuthLayout). |
| `shared/hooks/` | Common hooks reused across features (useNotifications, etc.). |
| `shared/types/` | Global TypeScript types used across all features. |
| `shared/utils/` | Utility functions and helpers. |
| `store/` | Zustand global state stores. Not feature-specific. |
| `store/authStore.ts` | User authentication, permissions, JWT token. |
| `store/notificationStore.ts` | Toast messages, alerts, notifications. |
| `store/uiStore.ts` | Modal states, sidebars, theme. |
| `lib/` | Configurations and third-party integrations (queryClient for TanStack Query, axios for HTTP). |
| `tests/` | Feature and component tests using Playwright and Jest. Organized by feature. |
| `styles/` | Global CSS and CSS variables. |
| `public/` | Static assets (logos, icons, images). |
 
### Naming Conventions
 
**Components:**
- PascalCase: `MatchingCard.tsx`, `ContractViewer.tsx`, `DashboardStats.tsx`
- Descriptive names matching functionality.
**Hooks:**
- camelCase with `use` prefix: `useAdvisorMatching.ts`, `useChat.ts`, `useDashboard.ts`
- Function name describes the hook's purpose.
**Services:**
- camelCase with `Service` suffix: `matchingService.ts`, `contractService.ts`, `chatService.ts`
- One service file per feature.
**Types/Interfaces:**
- PascalCase: `Advisor.ts`, `Contract.ts`, `Message.ts`
- File name matches the main interface it exports.
**Validators:**
- camelCase with `Validator` suffix: `matchingValidator.ts`, `contractValidator.ts`
- Contains Zod schemas for validation.
**Stores:**
- camelCase with `Store` suffix: `authStore.ts`, `notificationStore.ts`, `uiStore.ts`


### Feature Internal Structure

Each feature follows this internal layer pattern:

- **components/:** UI components specific to the feature. Used only within that feature.
- **hooks/:** Business logic hooks that implement workflows. Called by components.
- **services/:** API communication functions. Called by hooks. One service per feature.
- **types/:** TypeScript interfaces and types specific to the feature.
- **validators/:** Zod schemas for validating feature data.
- **[FeatureName]Page.tsx:** Main page component for the feature route.

### Shared Layer

Shared resources live in `src/shared/` and are reused across features:

- **components/ui/:** Basic reusable UI elements (Button, Input, Badge, Modal, etc.).
- **components/layouts/:** Layout wrappers shared across features.
- **hooks/:** Common hooks like useNotifications.
- **types/:** Global TypeScript types used across features.
- **utils/:** Helper functions and utilities.

### Global State Management

Global state (not feature-specific) lives in `src/store/`:

- **authStore.ts:** User authentication, permissions, JWT token.
- **notificationStore.ts:** Toast messages, alerts, notifications.
- **uiStore.ts:** Modal states, sidebars, theme.

Features can read from these stores but should not modify them directly. State updates go through custom hooks.

### Feature Communication

Features communicate through:

- **Shared stores:** Features read from authStore to check permissions or user info.
- **Shared types:** Features import type definitions from shared/types/ for common data structures.
- **API responses:** Features get data from backend APIs, not from other features directly.

Features do NOT import from each other's folders. If feature A needs functionality from feature B, that logic belongs in the shared layer or backend API.

### Key Rules
 
- Each feature is independent: its own components, hooks, services, types, validators.
- Features never import from other features' folders. Use shared/ or the backend API instead.
- Shared components and utilities go in `shared/`.
- Global app state (auth, notifications, UI) goes in `store/`.
- Each feature service handles only that feature's API calls.
- Hooks handle business logic and coordinate between components and services.
- Components handle only UI rendering and user event delegation.
- All API responses are validated with Zod before use.
- Tests are colocated with features in `tests/features/`.

---

## 1.3 Component System & UI Architecture

### Component Organization: Feature-First
 
PymeBoost uses **feature-first component organization** where components live within their feature domain. Components belong to the feature that owns them. Shared primitives (Button, Input, Modal, etc.) live in `shared/components/ui/`.
 
**Decision Rule:** If a component is used by 2+ features → `shared/components/ui/`. If used by 1 feature → `features/[feature]/components/`.
 
### Component Layers
 
**Layer 1: Primitives** (Feature-specific, presentational)
- Single-responsibility components that accept data via props.
- Examples: `MatchingCard`, `ContractViewer`, `ChatBubble`, `MetricsChart`.
**Layer 2: Compound Components** (Assembled, reusable within feature)
- Combine primitives into larger, reusable units within the same feature.
- Examples: `MatchingGrid`, `ChatPanel`, `ContractSection`.
**Layer 3: Containers/Pages** (Logic-aware, orchestrators)
- Connect to hooks, API calls, and global state.
- Pass processed data to primitives and compounds.
- Examples: `MatchingPage`, `ContractPage`, `DashboardPage`.
**Shared Primitives** (`shared/components/ui/`)
- Foundational elements used across features: Button, Input, Badge, Modal, Card, Dialog, Select, Checkbox, Avatar, Textarea, Toast, Tooltip.
- Use Radix UI for behavior and TailwindCSS for styling.

### Feature Component Structure
 
**Matching Example:**
- `MatchingCard` (Primitive): Single advisor card.
- `MatchingGrid` (Compound): Grid of advisor cards.
- `MatchingPage` (Container): Manages data fetching and state.
**Contracts Example:**
- `ContractViewer` (Primitive): Contract display.
- `ContractSection` (Compound): Groups related contract elements.
- `ContractPage` (Container): Manages negotiation state.
**Messaging Example:**
- `MessageBubble` (Primitive): Single message.
- `ChatPanel` (Compound): MessageList + MessageInput combined.
- `ChatPage` (Container): Manages real-time updates.
 
### Composition Patterns
 
**Props-Based Variants:** Components accept props to adapt appearance. Single Badge component with `status` prop instead of separate `BadgeActive`, `BadgePending`, `BadgeComplete`.
 
**Compound Components:** Complex features organize sub-components that work together. Example: ChatPanel combines MessageList and MessageInput.
 
**Headless Components:** Shared primitives use Radix UI for behavior (keyboard navigation, accessibility) and TailwindCSS for styling. Feature components compose these headless primitives.
 
**No Cross-Feature Imports:** Features never import from other features. If two features need the same component, it moves to `shared/components/ui/`.
 
### Responsive Design
 
All components use TailwindCSS responsive utilities with mobile-first approach.
 
**Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px  
- Desktop: > 1024px
Components avoid fixed widths; use max-width containers (`max-w-4xl`, `max-w-6xl`).
 
### Styling Rules
 
- All components use **TailwindCSS utilities only**; no external stylesheets or CSS-in-JS.
- Shared primitives establish baseline styles; feature components extend them.
- Form inputs: `px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500`.
- Buttons: `primary` (blue-600), `secondary` (slate-200), `ghost` (transparent).
- Cards: `p-6 shadow-sm border border-slate-200 rounded-lg`.
- Modals: `bg-black/50` overlay, flexbox centered.
 
### Accessibility
 
- All interactive elements use Radix UI (ARIA attributes, keyboard navigation, focus management).
- Form labels linked to inputs via `htmlFor`.
- Focus states visually clear on all interactive elements.
- Color paired with icons or text (not sole indicator of state).
- Semantic HTML: `<button>`, `<a>`, `<form>`.
- Minimum contrast ratio 4.5:1 (WCAG AA).
- Full keyboard navigation support.
 
### Key Rules
 
- Each feature owns its components; no cross-feature imports.
- Shared primitives only in `shared/components/ui/`.
- Primitives: pure presentation. Containers: state and API calls.
- All interactive elements require ARIA attributes and keyboard support.
- One responsibility per component; split if blurred.

---

## 1.4 Visual Design System & Branding

### Color Palette

| Color | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| Primary Purple | #A855F7 | `purple-500` | CTAs, highlights, active states |
| Dark Background | #0F172A | `slate-950` | Main background |
| Dark Surface | #1E293B | `slate-800` | Cards, panels |
| Accent Gold | #FBBF24 | `amber-400` | Ratings, warnings |
| Text Light | #F1F5F9 | `slate-100` | Primary text |
| Text Muted | #94A3B8 | `slate-400` | Secondary text |
| Border | #334155 | `slate-700` | Borders, dividers |

### Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| H1 | Poppins | 40px | 700 |
| H2 | Poppins | 28px | 700 |
| H3 | Poppins | 20px | 600 |
| Body | Inter | 16px | 400 |
| Small | Inter | 14px | 400 |
| Mono | JetBrains Mono | 14px | 400 |

### Spacing

- Padding: `p-4` (16px), `p-6` (24px), `p-8` (32px)
- Margin: `m-4`, `m-6`, `m-8`
- Gap: `gap-4`, `gap-6`, `gap-8`

### Components

**Buttons:**
- Primary: `bg-purple-500 text-white hover:bg-purple-600 rounded-md px-4 py-2`
- Secondary: `bg-slate-800 text-slate-100 border border-slate-700 rounded-md px-4 py-2`

**Cards:**
- `bg-slate-800 border border-slate-700 rounded-lg p-6 shadow-lg`

**Inputs:**
- `bg-slate-900 border border-slate-700 text-slate-100 px-3 py-2 rounded-md focus:ring-2 focus:ring-purple-500/20`

**Modals:**
- `bg-slate-800 rounded-lg p-8 border border-slate-700 with bg-black/60 overlay`

### Icons & Images

- Icon library: Heroicons (24px)
- Avatars: 64px (matching/contracts), 48px (chat)

### Standards

- Purple primary only; gold accent for highlights/ratings
- Dark backgrounds, light text
- WCAG AA contrast (4.5:1 minimum)
- Focus states: `focus:ring-2 focus:ring-purple-500`
- Semantic HTML and full keyboard navigation
- No hardcoded colors; use Tailwind only

---

## 1.5 Design Patterns & Engineering Standards

PymeBoost employs strategic, essential OOP design patterns to maintain a modular, testable, and maintainable frontend. Patterns are applied only where they solve real architectural problems—no over-engineering.

### Design Patterns by Responsibility

| Class / Interface | Location | Responsibility | Pattern | Justification |
|------------------|----------|----------------|---------|----------------|
| AuthGuard | [frontend/src/shared/guards/AuthGuard.tsx](frontend/src/shared/guards/AuthGuard.tsx) | Protects private routes; validates active session before rendering | Guard | **Security at a single point.** PymeBoost handles sensitive advisor-SME relationships and contracts. Without Guard, every component must check auth, creating security gaps. Guard enforces authorization before any logic executes. |
| authStore | [frontend/src/store/authStore.ts](frontend/src/store/authStore.ts) | Manages global auth state (user, token, permissions) | Singleton | **One authoritative source.** Auth state must be consistent across all features (contracts, messaging, dashboards). Multiple instances = token mismatches = silent feature breakage. Zustand enforces one instance automatically. |
| notificationStore | [frontend/src/store/notificationStore.ts](frontend/src/store/notificationStore.ts) | Publishes system-wide toasts, alerts, notifications | Observer (Pub-Sub) | **Decouples event producers from consumers.** When contracts are accepted or milestones update, 5+ features must react without knowing each other. Without Observer, features need direct imports or prop drilling through 5+ levels = fragile code. |
| ApiClient | [frontend/src/lib/apiClient.ts](frontend/src/lib/apiClient.ts) | Base HTTP client with reusable request/response logic | Template Method | **Eliminates duplicate error handling.** Every API call needs JWT injection, error handling, rate limiting, retries. Template Method defines the flow once, reused by all services. Without it, duplicate logic across 10+ services means bugs fixed in one place don't propagate. |
| MatchingService | [frontend/src/features/matching/services/matchingService.ts](frontend/src/features/matching/services/matchingService.ts) | Determines advisor recommendation strategy based on context | Strategy | **Swappable algorithms without code changes.** Matching can be rule-based, AI-powered, or manual. Strategy allows new algorithms without modifying components. Without it, adding a matching type requires touching component and service layers. |
| useAdvisorMatching | [frontend/src/features/matching/hooks/useAdvisorMatching.ts](frontend/src/features/matching/hooks/useAdvisorMatching.ts) | Creates and manages matching workflow logic | Factory | **Encapsulates workflow complexity.** Setup requires: TanStack Query config, form state, Zod validation, service calls. Factory gives components `useAdvisorMatching()` instead of assembling 20 pieces—reduces bugs and cognitive load. |
| ContractValidator | [frontend/src/features/contracts/validators/contractValidator.ts](frontend/src/features/contracts/validators/contractValidator.ts) | Validates contract terms, negotiation constraints | Strategy | **Runtime validation of critical business rules.** Fixed-price, hourly, and milestone contracts have different constraints. Strategy centralizes validation logic; invalid data never reaches components or state. |
| QueryClientFactory | [frontend/src/lib/queryClient.ts](frontend/src/lib/queryClient.ts) | Initializes and configures TanStack Query | Factory | **Consistent caching across all features.** Factory centralizes cache settings, retry logic, staleTime. Without it, some features cache aggressively while others refetch constantly = data inconsistency and poor UX. |

### Code Layer Structure: How Patterns Enforce Separation

**Components** (`features/[feature]/components/`):
- Pure presentation; no API calls, business logic, or state mutations.
- Supported by **Composition pattern**: build complex UIs from simple, reusable pieces.
- Example: `MatchingCard` knows only props; `MatchingGrid` composes `MatchingCard` instances.

**Hooks** (`features/[feature]/hooks/`):
- Implement business workflows using **Factory pattern**.
- Orchestrate: TanStack Query (server state), Zustand reads, Zod validation, service calls.
- Example: `useAdvisorMatching()` returns ready-to-use state and handlers.

**Services** (`features/[feature]/services/`):
- Pure API communication, enforced by **Dependency Inversion**.
- All responses validated with Zod before returning.
- Example: `matchingService.getAdvisors()` returns validated DTO, never raw API data.

**Validators** (`features/[feature]/validators/`):
- Zod schemas define **Strategy**: different contract types validate differently.
- Runtime validation ensures no invalid data reaches components or state.

### State Distribution: Patterns in Practice

**Global State (Zustand) — Singleton Pattern:**
- `authStore`: Single instance manages user, token, permissions globally.
  - **Why Singleton:** Any feature reading auth must see the same state. Multiple instances = data inconsistency.
- `notificationStore`: Single instance publishes toasts, alerts system-wide.
  - **Why Singleton + Observer:** Matches created, contracts accepted, milestones met → all features receive notifications from one source.
- `uiStore`: Single instance manages modal states, sidebar visibility, theme.

**Server State (TanStack Query) — Factory + Cache Strategy:**
- All API data (advisors, contracts, messages) cached and managed via **QueryClientFactory**.
- **Why Factory:** Ensures consistent cache settings, retry behavior, staleTime across all queries.
- Automatic refetch, deduplication, background updates reduce stale data bugs.

**Local State (React `useState`):**
- Form inputs, UI toggles, loading states—never persisted beyond component.
- Keeps global state clean and predictable.

### Composition Over Inheritance

Components are built from primitives, not extended:
- `ContractSection` = `ContractViewer` + `ContractTerms` + `ActionButtons` (composition, not inheritance).
- `Button` component accepts `variant` prop instead of creating `PrimaryButton`, `SecondaryButton` subclasses.
- **Why:** Composition is flexible; inheritance creates rigid hierarchies prone to fragility.

### Immutability & State Safety

All state updates use immutable patterns (spread operator, Zustand setters, React hooks). Mutating state directly:
- Breaks Zustand reactivity
- Causes stale UI renders
- Creates race conditions in async workflows 

Zustand and React enforce this automatically through their APIs.

### Example: Matching Flow Pattern Integration

**How patterns work together for advisor matching:**

1. **User navigates to Matching** → `AuthGuard` validates session (Guard pattern)
2. **Component calls hook** → `useAdvisorMatching()` factory sets up the workflow
3. **Hook initiates query** → `QueryClientFactory` provides configured client (Factory)
4. **Hook calls service** → `matchingService` applies Strategy (rule-based vs. AI)
5. **Service fetches data** → `ApiClient` injects JWT, handles errors (Template Method)
6. **Response validated** → Zod schema validates advisor DTO (Strategy)
7. **Match created event** → `notificationStore` publishes to all features (Observer/Singleton)
8. **Advisor is notified** → Chat feature listens to notification event, updates UI

**Without these patterns:** Each layer would duplicate auth checking, error handling, validation, and event logic. Adding a new feature would require copying code from 3+ places, guaranteeing bugs.

## 1.6  State Management & API Communication

### Global State (Zustand)
 
Three Zustand stores hold state shared across all features:
 
| Store | Data | Why It Matters |
|-------|------|--------|
| **authStore** | User, token, account type, permissions | Every feature needs to know who you are and what you can do |
| **notificationStore** | Toast messages, alerts | When contracts are accepted or errors happen, all features need to notify users |
| **uiStore** | Sidebar open/closed, modal visibility, theme | UI state doesn't belong on the backend; it's purely client-side |
 
Features access stores via hooks (e.g., `useAuthStore()`). State changes only through explicit actions, never direct mutations.
 
Zustand is lightweight, no boilerplate, no prop drilling through 5+ component levels.
 
---
 
## Server State (TanStack Query)
 
All data from the backend (advisors, contracts, messages, dashboards) is cached and kept in sync via TanStack Query.
 
**How it works:**
1. Service fetches from API
2. Response validated with Zod (no invalid data enters state)
3. Hook wraps service call with TanStack Query caching
4. Component calls hook, receives ready-to-use data
**Three data types:**
- **Initial fetch:** useQuery caches and deduplicates requests
- **Mutations:** Create/update/delete via useMutation
- **Refetch:** After mutations, queries are invalidated to refetch fresh data

 TanStack Query basically handles caching, deduplication, background updates, and stale data automatically. Components never manage backend data manually.
 
## API Communication Layer
 
Single centralized `ApiClient` handles all HTTP communication:
- Injects JWT token into every request from authStore
- Handles errors (401 → logout user, 5xx → retry with backoff)
- Logs requests/responses to observability system
- No service duplicates auth or error logic
All services call through `apiClient`. No direct fetch() calls.
 
**Why centralized:** JWT injection, error handling, retries, and logging happen once, not duplicated across 10+ service files.
 
## Data Validation (Zod)
 
Every response from the backend is validated against a Zod schema before entering state or components.
 
Invalid data is rejected immediately. Components never receive unvalidated data.
 
**Why mandatory:** Bad backend data (missing fields, wrong types) crashes features silently. Zod catches it at the boundary.
 
## Mutations (Create, Update, Delete)
 
When data changes (new contract, updated metrics), mutations trigger:
1. Send change to backend
2. On success, invalidate related queries to refetch fresh data
3. Publish notification to notificationStore
Queries automatically refetch and components re-render with new data.
 
**Why invalidate:** No manual state updates. Backend is source of truth; invalidation keeps client in sync.
 
## State Distribution Summary
 
| State Type | Managed By | Where | When to Use |
|-----------|-----------|-------|-----------|
| **Global (auth, notifications, UI)** | Zustand | `src/store/` | Info needed across multiple features |
| **Backend data** | TanStack Query | Services via hooks | Advisors, contracts, messages, dashboards |
| **Form/UI toggles** | React useState | Component | Temporary, not shared (form inputs, dropdowns) |
 
## Key Rules
 
- **Zustand only for global state.** Auth, notifications, UI toggles. Not backend data.
- **TanStack Query for all backend data.** One service per feature. Query invalidation on mutations.
- **Zod validates every API response.** No unvalidated data enters state.
- **ApiClient is the single HTTP entry point.** JWT injection, error handling, logging centralized.
- **No prop drilling.** Use hooks to access global or server state.
- **Components never call API directly.** Always through services and hooks.
 

## 1.7 Workflows & Interaction Flows

## 1.8 Authentication, Security & Session Management

## 1.9 Testing, Observability & CI/CD

## 1.10 Performance Optimization Strategy

## 1.11 C4 Diagrams




---

# Backend

## Technology Stack

- API type: REST API, HTTPS
- API standard: OpenAPI 3.1
- API gateway: Google Cloud API Gateway
- Hosting: Google Cloud Run
- Architecture: Monorepo with Domain-Driven Design (DDD) and Event Driven Design
- Coding language: Python 3.12
- Web framework: FastAPI 0.115
- Unit testing framework: Pytest 8.3
- Data validation framework: Pydantic 2.7
- Asynchronous operations & notifications: Google Cloud Pub/Sub and Google Cloud Tasks
- Document & file storage: Google Cloud Storage
- OCR processing: Google Cloud Document AI
- Secret management: Google Secret Manager
- Code repository: GitHub (monorepo shared with the frontend)
- CI/CD automation: GitHub Actions
- Environments: Development, Stage, Production
- Environment deployments: GitHub Environments
- Observability: Google Cloud Operations Suite (Cloud Logging + Cloud Monitoring)
- Authentication verification: Auth0 (JWT token validation with syncrony from the frontend)
- Service architecture: Domain-driven services, Event Driven Design, Monorepo
- Database: Google Cloud SQL (PostgreSQL 16)
- Encryption key management: Google Cloud KMS
- Session cache: Google Cloud Memorystore (Redis)
- Agent orchestration framework: LangGraph (LangChain) 0.2

---

## Security

### Authentication & Authorization
- Authentication delegated to Auth0 with Google OAuth 
- JWT tokens validated on every request; expiration: 1 hour, automatic rotation with refresh token
- Roles and permissions validated at the backend level: `Manager` and `Customs Agent` with the same permission codes defined in the frontend
- Per-endpoint authorization enforced using permission claims from the JWT payload

### Transport
- All communication between backend services and GCP managed services (Cloud SQL, Storage, Pub/Sub) is secured via HTTPS/TLS 1.3 using Google-managed certificates

### Encryption at Rest
- The Encryption algorithm will use AES-256 to storage sensitive content in google cloud sql.
- Encryption keys are managed through Google Cloud KMS (Customer-Managed Encryption Keys - CMEK).
- Encryption is handled transparently by the cloud provider; no application-level encryption of the database is performed.

### Secrets
- All secrets managed in Google Secret Manager; never stored in the repository or hardcoded as environment variables.
 
 ### API Surface
- General maximum payload size: 10 MB; exception on the document upload endpoint: 50 MB
- Rate limit: maximum 100 concurrent requests per user
- Input validation with Pydantic on all endpoints
- OWASP API Top 10 protections applied

### Network
- Backend deployed within a private Virtual Private Cloud on Google Cloud Platform.
- Google Cloud SQL configured with no public IP, accessible only within the VPC
- Google Cloud Armor configured as firewall for the API Gateway

---

## Observability

### Logs
* Format: Structured JSON with trace_id, request_id, user_id, user_role, timestamp, level, message, service, enviroment, version, endpoint, method, statuscode
* Destination: Google Cloud Logging (same as frontend)
* Correlation: X-Trace-ID header propagated across all requests (unified with frontend logs)

### Metrics
* What to measure: Latency (P95, P99), error rate, CPU utilization, memory usage, Pub/Sub queue depth
* Destination: Google Cloud Monitoring
* Tool: Google Cloud Monitoring dashboards
 
### Distributed Traces
* Instrumentation: OpenTelemetry SDK for Python (FastAPI)
* Destination: Google Cloud Trace
* Scope: Trace every HTTP request from entry to exit, including Cloud SQL queries and Pub/Sub messages
 
### Application Patterns
 
* Health Checks: /health/live (liveness), /health/ready (readiness) endpoints checked every 30 seconds by Cloud Run
* Correlation IDs: X-Trace-ID injected into all logs, metrics, and spans; same ID across Frontend and Backend
* Service Level Indcators: 
  - Availability: 99.9% (max 43 min downtime/month)
  - Latency: 95% of requests < 500ms
  - Error rate: < 0.5%
 
### Events to Register
 
* User login (success/failure), JWT validation failures, unauthorized access attempts
* DUA created/updated/validated, document uploaded, OCR processing (started/completed), DUA generation completed
* API requests (received/completed), database queries, Pub/Sub messages (enqueued/processed)
* Exceptions/errors, health check results, performance degradation
 
### Centralization
 
* Events Platform: Google Cloud Operations Suite (Cloud Logging + Cloud Monitoring + Cloud Trace)
* Log Storage: Cloud Logging (structured logs retained 1 year; audit logs follow the retention schedule: Year 1 hot storage, Year 2 cool storage, Year 3+ archive, purged after 5 years via Cloud Scheduler)
* Dashboard Tool: Google Cloud Monitoring Dashboards 
* Frontend Synchronization: Same X-Trace-ID and Cloud Logging workspace for full-stack tracing

---

## Infrastructure  (DevOps)

### CI/CD Tool
* GitHub Actions: Automates build, test, and deployment from code repository
* Trigger: Automatic on push to develop (Dev) and main (Staging → Prod)
 
### Deployment Tool
* Terraform: Infrastructure as Code for Google Cloud resources (Cloud Run, Cloud SQL, Cloud Storage, Secret Manager)
* Environments: 
  - Dev: Cloud Run with 1 minimum instances (automatic deploy)
  - Staging: Cloud Run with 2 minimum instances (automatic deploy)
  - Prod: Cloud Run with auto-scaling from 1 to 10 instances (manual approval required, blue-green deployment). We intentionally keep the maximum number of instances low to optimize costs. At this stage of the project, we do not expect traffic levels that would require more than 10 instances. Based on our estimates, a single instance can handle approximately 5–20 requests per second, making a limit of 10 instances sufficient—and likely conservative—for the expected user base during the first year.

### Container Registry
* Google Artifact Registry: Store Docker images with automatic vulnerability scanning and binary authorization (approval)

---

## Availability

### SLA (Service Level Agreement) Target For The Business
* 99.9% uptime: Maximum 8.7 hours downtime per year
* Applies to production environment only

### Component SLAs & Recovery From the Providers

| Component | Native SLA | Recovery Strategy |
|-----------|-----------|-------------------|
| **Google Cloud Run** | 99.95% | Multi-region deployment (us-central1 + us-west1); auto-failover < 1 min |
| **Google Cloud SQL** | 99.99% (HA) | Cloud SQL HA with automatic failover and automated backups; RTO < 30 sec |
| **Google Cloud Storage** | 99.99% | Geo-redundant storage; automatic failover to secondary region |
| **Google Secret Manager** | 99.99% | Geo-replicated; retry with backoff on transient failures |
| **Google Cloud API Gateway** | 99.95% | Premium tier; circuit breaker for backend failures |
| **Google Cloud Pub/Sub** | 99.99% | Dead Letter Policy for failed messages; exponential backoff retry |
| **Google Cloud Document AI** | 99.9% | Retry with exponential backoff; degraded mode returns partial data |
| **Google Vertex AI (Gemini)** | 99.9% | Circuit breaker on 3 consecutive failures; fallback to manual review flag |
| **Auth0** | 99.99% | Managed HA by Auth0; JWT cache allows short-term offline tolerance |
| **Google Cloud Logging** | 99.95% | Best-effort; non-critical for availability |

### Single Point of Failure Analysis

### Resilience Patterns (Production)

---

## Scalability

### Elements That Scale with Request Volume
 
* Cloud Run: Auto-scale 5-50 instances (trigger: CPU > 70% or request concurrency > 80)
* Cloud SQL: Vertical scaling; read replicas for read-heavy workloads
* Pub/Sub: Auto-scales throughput; subscriber concurrency auto-adjusts (max 1000 concurrent pulls per subscription)
* Background Workers (Cloud Tasks): Auto-scale job processing threads based on queue depth
* Cloud Memorystore (Redis): Vertical scaling (Basic < Standard < Premium); auto-failover in Standard+ tiers
* Cloud Storage: Auto-scales (unlimited capacity, unlimited throughput)
 
### Auto-Scaling Triggers
 
* CPU > 70% → add Cloud Run instance
* Request concurrency > 80 → add Cloud Run instance
* Pub/Sub queue depth > 100 messages → increase subscriber concurrency
* Cloud SQL CPU > 80% → scale up (vertical); add read replica if reads spike
* Max limit: 50 Cloud Run instances (cost control)
 
 ---

## Backend Key Workflows



### User Domain

#### Create Account (SME)

Implementation: [src/backend/domains/user/controllers/create_sme_account_controller.py](src/backend/domains/user/controllers/create_sme_account_controller.py)

1. The user completes the registration form on the frontend.
2. The frontend sends the information to Google Cloud API Gateway through a POST request.
3. Google Cloud API Gateway validates that the endpoint exists and applies rate limiting.
4. Google Cloud API Gateway routes the request to Cloud Run.
5. FastAPI validates the format of the received data.
6. Business validations are executed:
   - Email is not already registered.
   - Phone number is not already registered.
   - Valid company name.
   - Required fields are completed (Legal Entity ID, associated bank account).
7. The request data is mapped into the corresponding Domain-Driven Design DTO.
8. The user is created in Auth0 and the JWT access token is retrieved.
9. The SME profile is created in the database.
10. A `SmeAccountCreated` event is generated.
11. The system returns a successful account creation confirmation.

---

#### Create Account (Advisor)

Implementation: [src/backend/domains/user/controllers/create_advisor_account_controller.py](src/backend/domains/user/controllers/create_advisor_account_controller.py)

1. The advisor completes the registration form.
2. The frontend sends the information through a POST request to Google Cloud API Gateway.
3. Google Cloud API Gateway validates the endpoint and applies rate limiting.
4. The request is routed to Cloud Run.
5. FastAPI validates the structure of the received data.
6. Business validations are executed:
   - Unique email address.
   - Valid specialization.
   - Required profile information is provided.
7. The request data is mapped into the corresponding Domain-Driven Design DTO.
8. The user is created in Auth0 and the JWT access token is retrieved.
9. The Advisor profile is created in the database.
10. An `AdvisorAccountCreated` event is generated.
11. The system returns a successful registration confirmation.

---

#### Login

Implementation: [src/backend/domains/user/controllers/login_controller.py](src/backend/domains/user/controllers/login_controller.py)

1. The user sends credentials from the frontend to Auth0.
2. The frontend sends the JWT to the backend using Bearer authentication.
3. Google Cloud API Gateway validates the endpoint and applies rate limiting.
4. Google Cloud API Gateway routes the request to Cloud Run.
5. FastAPI validates the JWT using Auth0 JWKS.
6. If the token is valid, the JWT claims are mapped into the corresponding domain session DTO.
7. The `Session Cache` workflow is executed.
8. The authenticated session is returned.

---

#### Session Cache

Implementation: [src/backend/domains/user/services/session_cache_service.py](src/backend/domains/user/services/session_cache_service.py)

1. An authenticated user accesses the system.
2. FastAPI retrieves information from the validated JWT.
3. The system checks whether the session already exists in Redis.
4. If the session exists:
   - The cached session is reused.
5. If the session does not exist:
   - User information is retrieved from the database using the Auth0 ID.
   - A session object is created.
   - The session is stored in Redis.
6. The session becomes available for future requests.
7. The session TTL (Time To Live) is refreshed whenever user activity is detected.

---

#### Change Information About an SME

Implementation: [src/backend/domains/user/controllers/update_sme_profile_controller.py](src/backend/domains/user/controllers/update_sme_profile_controller.py)

1. The SME requests an update to its business information.
2. The frontend sends an authenticated PUT request.
3. Google Cloud API Gateway validates the endpoint and JWT.
4. Cloud Run receives the request.
5. FastAPI validates the user's identity.
6. The system verifies that the user owns the SME profile.
7. The SME entity is retrieved from the database.
8. Allowed fields are updated:
   - Profile picture.
   - Business name.
   - Description.
   - Contact information.
9. Changes are persisted.
10. A `SmeInformationUpdated` event is generated.
11. The updated information is returned.

---

#### Change Information About an Advisor

Implementation: [src/backend/domains/user/controllers/update_advisor_profile_controller.py](src/backend/domains/user/controllers/update_advisor_profile_controller.py)

1. The advisor requests an update to their professional information.
2. The frontend sends an authenticated PUT request.
3. Google Cloud API Gateway validates the endpoint and JWT.
4. Cloud Run receives the request.
5. FastAPI validates the JWT.
6. The system verifies profile ownership.
7. The Advisor entity is retrieved.
8. Allowed fields are updated:
   - Profile picture.
   - Display name.
   - Description.
   - Contact information.
9. Changes are persisted.
10. An `AdvisorInformationUpdated` event is generated.
11. The updated profile is returned.

---

#### Change Industry for an Advisor

Implementation: [src/backend/domains/user/controllers/update_advisor_industry_controller.py](src/backend/domains/user/controllers/update_advisor_industry_controller.py)

1. The advisor selects new specialization industries.
2. The frontend sends an authenticated PUT request.
3. Google Cloud API Gateway validates the endpoint and JWT.
4. The request is routed to Cloud Run.
5. FastAPI validates the user's identity through Auth0.
6. The Advisor profile is retrieved.
7. The selected industries are validated against the system catalog.
8. The advisor's associated industries are updated.
9. An `AdvisorIndustryUpdated` event is generated.
10. The system returns a successful update confirmation.


### Notifications Domain Workflows

#### Project Status Notifications
#### Messages Notifications
#### Advisor Selection Notifications


### Pyme Domain Workflows

#### Advisor Recommendation
#### Advisor Recommendation Recalculation (Triggered by AdvisorIndustryUpdated Event)
#### Advisor Similar Project Retrieval
#### Advisor Impact Prediction


### Advisor Domain Workflows

#### Advisor Reputation Calculation
#### Advisor Base Rate Calculation (el porcentaje que saldra como "cobro base" puede ser negociado en chat luego)

### Matching Domain Workflows

#### Advisor Swipe Decision
#### Create Match
#### Match Expiration
#### Cancel Match
#### Finalize Advisor Selection (Marry the prospect)


### Communication Domain Workflows

#### Chat Access Validation
#### Chat Between Advisor and Pyme




### Contract Domain Workflows

#### Propose Contract
#### Counter Offer (Se puede definir en el chat una vez hay match para bajar la tarifa del advisor)
#### Accepted Contract 
#### Reject Contract


### Project Domain Workflows

#### Create Project 
#### Close Project 
#### Project Milestone Generation
#### Project Milestone Validation	
#### Project Health Monitoring	
#### Project Completion Validation	
#### Project Status Management




### Review Domain Workflows

#### Leave a Review for a Advisor (that you have already hired in the past)
#### Leave a Review for a Pime (that you have been hired by in the past)



### Event Domain Workflows

#### Event Audit Logging
#### AdvisorIndustryUpdated Event
#### MatchCreated Event
#### ProjectStatusChanged Event
#### RecommendationUpdated Event
#### ProjectAssigned Event




#### [QUITAR LUEGO DE REALIZARLO] Reflection Pattern puede aprovechar con el recommendations verificar si tiene projectos similares con Advisor Similar Project Retrieval



---

## Architecture Diagram in Layers

---

## Design Considerations
### Algorithm Selection & Parameters


---

## Source Code

### Backend (Python/FastAPI - Domain-Driven Design)

---

# Data Design
