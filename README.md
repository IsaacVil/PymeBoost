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

Vercel: https://pymeboost-v1.vercel.app/

---

## UX Testing Results

Group of the Test: SynapSeed

In this section we review and analyse the results of the 4 participants of the Maze test for the Pymeboost prototype. Here is the link of the test: https://t.maze.co/532533747

## Task 1 — PYME Registration

**Task:** Sign up and log in as a PYME on PymeBoost.

### Heatmap Analysis

**Participant 1:**

![Heatmap P1 Task 1](docs/images/UX/heatmap-task1-p1.png)
![Heatmap P2 Task 1](docs/images/UX/heatmap-task1-p2.png)

- Clicked directly on "Iniciar sesión" and navigated successfully to the advisor discovery screen.
- Completed the task efficiently with no hesitation.

---

**Participant 2:**

![Heatmap P3 Task 1](docs/images/UX/heatmap-task1-p3.png)
![Heatmap P4 Task 1](docs/images/UX/heatmap-task1-p4.png)

- Verified the PYME/Advisor toggle to confirm role selection before clicking "Iniciar sesión".
- Completed the task successfully.

---

**Participant 3:**

![Heatmap P5 Task 1](docs/images/UX/heatmap-task1-p5.png)
![Heatmap P6 Task 1](docs/images/UX/heatmap-task1-p6.png)

- Clicked directly on "Iniciar sesión" with no hesitation.
- Completed the task efficiently with minimal interaction.

---

**Participant 4:**

![Heatmap P7 Task 1](docs/images/UX/heatmap-task1-p7.png)
![Heatmap P8 Task 1](docs/images/UX/heatmap-task1-p8.png)

- Completed the full registration flow by filling in the form fields before logging in.
- Chose the more complete registration path instead of the direct login shortcut.
- Completed the task successfully.

#### Key Observations

- All 4 participants completed the task successfully.
- 3 out of 4 participants used the direct login shortcut.
- 1 participant completed the full registration form, demonstrating the prototype supports both flows.

#### Detected Usability Issues

No significant usability issues detected in this task.

#### Corrections Applied

No corrections were required for this task.

#### User Rating — "How easy was the registration process?"

*Scale: 1 = Very difficult, 5 = Very easy*

| Score | Responses | Percentage |
|---|---|---|
| 5 - Very easy | 5 | 100% |

**Average score: 5/5** — All 4 participants rated the registration process as very easy.

![Registration Rating](docs/images/UX/rating-task1.png)

---

## Task 2 — Advisor Discovery & Decision

**Task:** Navigate to "Descubrí tu advisor" and make a decision (approved or rejected) with at least one advisor.

#### Heatmap Analysis

**Participant 1:**

![Heatmap P1 Task 2 - Login](docs/images/UX/heatmap-task2-p1.png)
![Heatmap P1 Task 2 - Advisor](docs/images/UX/heatmap-task2-p2.png)

- Clicked directly on "Iniciar sesión" to enter the app.
- On the advisor screen, interaction concentrated on the advisor name and compatibility section, indicating the participant read the advisor information before making a decision.

---

**Participant 2:**

![Heatmap P2 Task 2 - Login](docs/images/UX/heatmap-task2-p3.png)
![Heatmap P2 Task 2 - Advisor](docs/images/UX/heatmap-task2-p4.png)

- Clicked directly on "Iniciar sesión" to enter the app.
- On the advisor screen, interaction focused on the pricing section (Retainer Advisor ₡150,000), suggesting the participant paid close attention to the financial details before deciding.

---

**Participant 3:**

![Heatmap P3 Task 2 - Login](docs/images/UX/heatmap-task2-p5.png)
![Heatmap P3 Task 2 - Advisor](docs/images/UX/heatmap-task2-p6.png)

- Clicked directly on "Iniciar sesión" to enter the app.
- On the advisor screen, interaction concentrated on the PymeBoost commission section (₡36,000), indicating interest in the cost breakdown before making a decision.

---

**Participant 4:**

![Heatmap P4 Task 2 - Login](docs/images/UX/heatmap-task2-p7.png)
![Heatmap P4 Task 2 - Advisor](docs/images/UX/heatmap-task2-p8.png)

- Clicked directly on "Iniciar sesión" to enter the app.
- On the advisor screen, interaction was distributed across the advisor name, compatibility section, and a click outside the card area — this is expected behavior as the swipe mechanic also supports drag interaction in addition to button clicks.

> **Note:** Clicks registered outside the advisor card area are expected behavior, as the swipe mechanic supports both drag and click interactions.

#### Key Observations

- All 4 participants logged in successfully.
- Participants naturally focused on different sections of the advisor card (name, compatibility, pricing) before making a decision, showing the card layout guides decision-making effectively.
- The swipe mechanic was intuitive — no participants appeared confused about how to approve or reject.

#### Detected Usability Issues

No significant usability issues detected in this task.

#### Corrections Applied

No corrections were required for this task.


#### User Rating — "How clear was the advisor information for making a match decision?"
*Scale: 1 = Very confusing, 5 = Very clear*

| Score | Responses | Percentage |
|---|---|---|
| 5 - Very clear | 5 | 100% |

**Average score: 5/5** — All participants rated the advisor information as very clear for making a decision.

![Advisor Rating](docs/images/UX/rating-task2.png)

---

## Task 3 — Contract Negotiation & Dashboard Review

**Task:** Navigate to Messages, enter the chat with Sofía Ramírez, re-negotiate the contract proposal, and review the active contracts in the dashboard.

#### Heatmap Analysis

**Participant 1:**

![Heatmap P1 Task 3 - Login](docs/images/UX/heatmap-task3-p1.png)
![Heatmap P1 Task 3 - Advisor](docs/images/UX/heatmap-task3-p2.png)
![Heatmap P1 Task 3 - Messages](docs/images/UX/heatmap-task3-p3.png)
![Heatmap P1 Task 3 - Dashboard](docs/images/UX/heatmap-task3-p4.png)

- Logged in directly via "Iniciar sesión".
- On the advisor screen, briefly visited before navigating to Messages.
- In the Messages screen, navigated through multiple chats and interacted extensively with the contract negotiation flow, reaching the "¡Married the Prospect!" confirmation.
- Also visited the "Mi Contrato" dashboard to review active contract phases and financial distribution.

---

**Participant 2:**

![Heatmap P2 Task 3 - Login](docs/images/UX/heatmap-task3-p5.png)
![Heatmap P2 Task 3 - Advisor](docs/images/UX/heatmap-task3-p6.png)
![Heatmap P2 Task 3 - Messages](docs/images/UX/heatmap-task3-p7.png)

- Logged in directly via "Iniciar sesión".
- Briefly visited the advisor discovery screen before navigating to Messages.
- Located Sofía Ramírez's chat and completed the contract negotiation flow reaching "¡Married the Prospect!".
- Interaction concentrated on the chat list and the contract confirmation area.

---

**Participant 3:**

![Heatmap P3 Task 3 - Login](docs/images/UX/heatmap-task3-p8.png)
![Heatmap P3 Task 3 - Advisor](docs/images/UX/heatmap-task3-p9.png)
![Heatmap P3 Task 3 - Messages](docs/images/UX/heatmap-task3-p10.png)

- Logged in directly via "Iniciar sesión".
- Briefly visited the advisor discovery screen before navigating to Messages.
- Located Sofía Ramírez's chat and completed the negotiation successfully.
- Interaction in the chat was focused and direct with minimal exploration.

---

**Participant 4:**

![Heatmap P4 Task 3 - Login](docs/images/UX/heatmap-task3-p11.png)
![Heatmap P4 Task 3 - Advisor](docs/images/UX/heatmap-task3-p12.png)
![Heatmap P4 Task 3 - Messages](docs/images/UX/heatmap-task3-p13.png)
![Heatmap P4 Task 3 - Dashboard](docs/images/UX/heatmap-task3-p14.png)
![Heatmap P4 Task 3 - Messages 2](docs/images/UX/heatmap-task3-p15.png)

- Logged in directly via "Iniciar sesión".
- Explored the advisor discovery screen briefly before navigating.
- In Messages, explored multiple chats (Diego Hernández, Valeria Castro, Sofía Ramírez) before completing the negotiation.
- Also visited the "Mi Contrato" dashboard and explored the contract phases in detail.
- High click density across multiple screens reflects deep exploration of the interface, including chat interactions and contract negotiation flows — this is expected behavior given the open-ended nature of this task.

> **Note:** The high number of clicks across screens for all participants is expected, as this task involved free navigation through messaging, contract negotiation, and dashboard review. Multiple interactions within chats and contract flows naturally generate dense heatmaps.

#### Key Observations

- All 4 participants completed the task successfully.
- All participants navigated intuitively from login → Descubrir → Mensajes → contract negotiation.
- Participants who visited "Mi Contrato" dashboard explored it in detail, indicating the contract tracking information is engaging and clear.
- The "¡Married the Prospect!" confirmation was reached by all participants, confirming the negotiation flow is understandable.

#### Detected Usability Issues

No significant usability issues detected in this task.

#### Corrections Applied

No corrections were required for this task.

#### User Rating — "How intuitive was the contract negotiation and dashboard visualization process?"
*Scale: 1 = Very confusing, 5 = Very intuitive*

| Score | Responses | Percentage |
|---|---|---|
| 4 - Intuitive | 3 | 75% |
| 5 - Very intuitive | 1 | 25% |

| Participant | Response |
|---|---|
| Participant 1 | 4 |
| Participant 2 | 4 |
| Participant 3 | 4 |
| Participant 4 | 5 |

**Average score: 4.25/5** — Participants found the contract negotiation and dashboard visualization intuitive overall. The score reflects that while the flow was clear, the volume of information and the number of steps involved in the negotiation process added complexity, preventing a perfect rating.

![Negotiation Rating](docs/images/UX/rating-task3.png)
![Negotiation Rating Detail](docs/images/UX/rating-task3-detail.png)

---

## General Comments

**Task:** Leave a general comment about the application — what you liked, what you didn't, and what you would improve.

| Participant | Comment |
|---|---|
| Participant 1 | The app is quite intuitive, easy to follow and use. |
| Participant 2 | Really liked the design and found it intuitive overall. |
| Participant 3 | Very consistent overall. Some tabs have a lot of information — an info modal to guide the user in certain sections could help, for example to clarify doubts (how to re-negotiate, etc.). |
| Participant 4 | The dashboard may feel slightly overloaded, but overall everything works quite well. |

#### Key Observations

- All participants highlighted the app as intuitive and easy to use.
- 2 out of 4 participants mentioned information overload as a minor concern — specifically in the dashboard and some tabs.
- Participant 3 suggested adding info modals or tooltips to guide users through complex flows like contract re-negotiation.

#### Detected Usability Issues

| Issue | Participants affected | Severity |
|---|---|---|
| Information overload in dashboard and some tabs | P3, P4 | Medium |
| Lack of guidance tooltips for complex flows (e.g. re-negotiation) | P3 | Low |

#### Corrections Applied

- Simplified the dashboard layout by grouping related information into collapsible sections to reduce visual overload.
- Added contextual tooltips in key sections (contract negotiation, dashboard phases) to guide users through complex flows.

---

## Identified Usability Issues

The following table consolidates all usability issues detected across the 4 testing sessions:

| # | Issue | Task | Participants Affected | Severity |
|---|---|---|---|---|
| 1 | Information overload in the dashboard and some tabs makes the interface feel dense | Task 3, General | P3, P4 | Medium |
| 2 | Lack of guidance tooltips for complex flows such as contract re-negotiation | General | P3 | Low |

No issues were detected related to navigation, visual comprehension, accessibility, or visual consistency. The overall interface was rated as intuitive and easy to use by all 4 participants.

---

## Corrections Applied to the Prototype

### Correction 1 — Dashboard Information Density
**Problem detected:** 2 out of 4 participants mentioned the dashboard felt slightly overloaded with information, which contributed to the Task 3 average score of 4.25/5 instead of a perfect 5.

**Correction applied:** Grouped related dashboard sections into collapsible panels (e.g. financial distribution, contract phases, deliverables compliance) so users can progressively disclose information based on their needs.

**Design criterion:** Apply progressive disclosure to reduce visual noise without removing functionality. This follows the principle that users should see the most critical information first (contract status, progress percentage, time remaining) and access secondary details on demand.


### Correction 2 — Contextual Tooltips for Complex Flows

**Problem detected:** Participant 3 noted that some sections lack guidance for complex interactions such as contract re-negotiation, suggesting that first-time users may not immediately understand the steps involved.

**Correction applied:** Added contextual tooltips and a brief info modal on the contract negotiation screen explaining the re-negotiation flow step by step (Re-negotiate → Send proposal → Advisor accepts → Marry the Prospect).

**Design criterion:** Provide just-in-time guidance at points of complexity without disrupting the flow for experienced users. Tooltips are non-intrusive and only appear on hover or first visit, preserving a clean interface for returning users.


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

---

### Core Features

PymeBoost is built around these core features:

- **Matching:** Advisor discovery, recommendations, swipe decisions, match creation.
- **Contracts:** Contract negotiation, proposal submission, acceptance, tracking.
- **Messaging:** Real-time chat between PYME and advisors, message history.
- **Dashboard:** Project overview, metrics, status tracking.
- **Auth:** User authentication, login, logout, session management.

---

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
---

### Folder Responsibilities
 
| Folder | Responsibility |
|--------|----------------|
| [frontend/src/app/layout.tsx](frontend/src/app/layout.tsx) | Next.js App Router pages and route structure. Contains layout.tsx for root layout and route-based pages. |
| [frontend/src/features/matching/page.tsx](frontend/src/features/matching/page.tsx) | Advisor discovery and matching logic. Components for cards, grids, and filters. |
| [frontend/src/features/contracts/page.tsx](frontend/src/features/contracts/page.tsx) | Contract lifecycle management. Components for viewing, negotiating, and tracking contracts. |
| [frontend/src/features/messaging/page.tsx](frontend/src/features/messaging/page.tsx) | Real-time chat between PYME and advisors. Components for chat panel, message list, and input. |
| [frontend/src/features/dashboard/page.tsx](frontend/src/features/dashboard/page.tsx) | Project overview and metrics. Components for stats, timelines, and performance tracking. |
| [frontend/src/features/auth/page.tsx](frontend/src/features/auth/page.tsx) | User authentication and session management. Components for login and logout. |
| [frontend/src/features/matching/hooks/useAdvisorMatching.ts](frontend/src/features/matching/hooks/useAdvisorMatching.ts) | Business logic hooks that implement workflows. Called by components. |
| [frontend/src/features/matching/services/matchingService.ts](frontend/src/features/matching/services/matchingService.ts) | API communication functions. Called by hooks. One service per feature. |
| [frontend/src/features/matching/types/matching.ts](frontend/src/features/matching/types/matching.ts) | TypeScript interfaces specific to the feature. |
| [frontend/src/features/contracts/validators/contractValidator.ts](frontend/src/features/contracts/validators/contractValidator.ts) | Zod validation schemas for feature data. |
| [frontend/src/shared/components/ui/Button.tsx](frontend/src/shared/components/ui/Button.tsx) | Basic UI primitives (Button, Input, Badge, Modal, Card, Dialog, etc.). |
| [frontend/src/shared/components/layouts/DashboardLayout.tsx](frontend/src/shared/components/layouts/DashboardLayout.tsx) | Layout wrappers shared across features (DashboardLayout, AuthLayout). |
| [frontend/src/shared/guards/AuthGuard.tsx](frontend/src/shared/guards/AuthGuard.tsx) | Route protection and session validation before rendering any private view. |
| [frontend/src/shared/hooks/useNotifications.ts](frontend/src/shared/hooks/useNotifications.ts) | Common hooks reused across features. |
| [frontend/src/shared/types/common.ts](frontend/src/shared/types/common.ts) | Global TypeScript types used across all features. |
| [frontend/src/shared/utils/helpers.ts](frontend/src/shared/utils/helpers.ts) | Utility functions and helpers. |
| [frontend/src/store/authStore.ts](frontend/src/store/authStore.ts) | User authentication, permissions, JWT token (Singleton pattern). |
| [frontend/src/store/notificationStore.ts](frontend/src/store/notificationStore.ts) | Toast messages, alerts, notifications (Observer pattern). |
| [frontend/src/store/uiStore.ts](frontend/src/store/uiStore.ts) | Modal states, sidebars, theme. |
| [frontend/src/lib/queryClient.ts](frontend/src/lib/queryClient.ts) | TanStack Query configuration; cache, retry, staleTime (Factory pattern). |
| [frontend/src/lib/apiClient.ts](frontend/src/lib/apiClient.ts) | Base HTTP client; JWT injection, error handling, retries (Template Method pattern). |
| [frontend/src/tests/features/matching.spec.ts](frontend/src/tests/features/matching.spec.ts) | Feature and component tests using Vitest (unit tests) and Playwright (E2E tests). |
| [frontend/src/app/globals.css](frontend/src/app/globals.css) | Global CSS and CSS variables. |

---

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

---

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

---

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
 
PymeBoost uses feature-first component organization where components live within their feature domain. Components belong to the feature that owns them. Shared primitives (Button, Input, Modal, etc.) live in `frontend/src/shared/components/ui/`.
 
If a component is used by 2+ features → `frontend/src/shared/components/ui/`. 

If used by 1 feature → `frontend/src/features/[feature]/components/`.
 
### Component Layers
 
**Layer 1**: Primitives (Feature-specific, presentational, not logic-aware)
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

---

### Feature Component Structure
 
**Matching Example:**
- [`MatchingCard`](frontend/src/features/matching/components/MatchingCard.tsx) (Primitive): Single advisor card.
- [`MatchingGrid`](frontend/src/features/matching/components/MatchingGrid.tsx) (Compound): Grid of advisor cards.
- [`MatchingPage`](frontend/src/features/matching/page.tsx) (Container): Manages data fetching and state.

**Contracts Example:**
- [`ContractViewer`](frontend/src/features/contracts/components/ContractViewer.tsx) (Primitive): Contract display.
- [`ContractNegotiation`](frontend/src/features/contracts/components/ContractNegotiation.tsx) (Compound): Groups ContractViewer + ContractTerms + actions.
- [`ContractsPage`](frontend/src/features/contracts/page.tsx) (Container): Manages negotiation state.

**Messaging Example:**
- [`MessageBubble`](frontend/src/features/messaging/components/MessageBubble.tsx) (Primitive): Single message bubble.
- [`ChatPanel`](frontend/src/features/messaging/components/ChatPanel.tsx) (Compound): MessageList + MessageInput combined.
- [`MessagingPage`](frontend/src/features/messaging/page.tsx) (Container): Manages real-time updates.

---
 
### Composition Patterns
 
**Props-Based Variants:** Components accept props to adapt appearance. Single Badge component with `status` prop instead of separate `BadgeActive`, `BadgePending`, `BadgeComplete`.
 
**Compound Components:** Complex features organize sub-components that work together. Example: ChatPanel combines MessageList and MessageInput.
 
**Headless Components:** Shared primitives use Radix UI for behavior (keyboard navigation, accessibility) and TailwindCSS for styling. Feature components compose these headless primitives.
 
**No Cross-Feature Imports:** Features never import from other features. If two features need the same component, it moves to `shared/components/ui/`.
 
--- 

### Responsive Design
 
All components use TailwindCSS responsive utilities with desktop-first approach. PymeBoost is designed for web platforms (advisors and SME managers use desktop/laptop).
 
**Breakpoints:**
- Desktop: > 1024px (primary design target)
- Tablet: 640px - 1024px (secondary, graceful degradation)
- Mobile: < 640px (limited support for mobile browsers)

Components are designed for desktop experience first; gracefully adapt to smaller screens using TailwindCSS breakpoints. Use max-width containers (`max-w-4xl`, `max-w-6xl`) to keep layouts readable on large screens.

---

### Styling Rules
 
- All components use **TailwindCSS utilities only**; no external stylesheets or CSS-in-JS.
- Shared primitives establish baseline styles; feature components extend them.
- Form inputs: `bg-white border-2 border-zinc-800 px-3 py-2 rounded-md focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500`.
- Buttons: `primary` (teal-500), `secondary` (zinc-50 + border-zinc-800), `ghost` (transparent).
- Cards: `bg-zinc-50 border-2 border-zinc-800 rounded-lg p-6 shadow-sm`.
- Modals: `bg-black/50` overlay, flexbox centered.
 
---

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
| Primary Teal | #17B6B0 | `teal-500` | CTAs, highlights, active states |
| Primary Teal Dark | #12918C | `teal-600` | Hover states |
| Background Cream | #F5F1E8 | `stone-100` | Main background |
| Surface White | #FCFCFA | `zinc-50` | Cards, panels |
| Soft Cyan Surface | #DFF4F3 | `cyan-100` | Highlight sections |
| Dark Text | #161616 | `zinc-900` | Primary text |
| Muted Text | #6B6B6B | `zinc-500` | Secondary text |
| Border Dark | #262626 | `zinc-800` | Borders, dividers |
| Success Green | #20B15A | `green-600` | Success states |
| Warning Orange | #F59E0B | `amber-500` | Pending states |
| Danger Red | #DC2626 | `red-600` | Error/cancelled states |
| Gold Accent | #D97706 | `amber-600` | Ratings, premium indicators |

### Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| H1 | Righteous | 48px | 700 |
| H2 | Righteous | 32px | 700 |
| H3 | Righteous | 24px | 600 |
| Body | Sans Serif | 16px | 400 |
| Small | Sans Serif | 14px | 400 |
| Mono | JetBrains Mono | 12px | 500 |

### Spacing

- Padding: `p-4` (16px), `p-6` (24px), `p-8` (32px)
- Margin: `m-4`, `m-6`, `m-8`
- Gap: `gap-4`, `gap-6`, `gap-8`

### Components

**Buttons:**
- Primary: `bg-teal-500 text-white hover:bg-teal-600 rounded-md px-4 py-2`
- Secondary: `bg-zinc-50 text-zinc-900 border-2 border-zinc-800 rounded-md px-4 py-2`

**Cards:**
- `bg-zinc-50 border-2 border-zinc-800 rounded-lg p-6 shadow-sm`

**Inputs:**
- `bg-white border-2 border-zinc-800 text-zinc-900 px-3 py-2 rounded-md focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500`

**Modals:**
- `bg-zinc-50 rounded-lg p-8 border-2 border-zinc-800 with bg-black/50 overlay`

### Icons & Images

- Icon library: Heroicons (24px)
- Avatars: 64px (matching/contracts), 48px (chat)

### Standards

- Teal primary color for actions and active states
- Cream/light backgrounds with dark outlined cards
- Thick visible borders (`border-2 border-zinc-800`)
- Rounded industrial-style components
- WCAG AA contrast (4.5:1 minimum)
- Focus states: `focus:ring-2 focus:ring-teal-500`
- Semantic HTML and full keyboard navigation
- No hardcoded colors; use Tailwind only
- Monospace labels for metadata, tags, and section headers
- Subtle retro-dashboard aesthetic with spacious layouts

---

## 1.5 Design Patterns & Engineering Standards

PymeBoost employs strategic, essential OOP design patterns to maintain a modular, testable, and maintainable frontend. Patterns are applied only where they solve real architectural problems—no over-engineering.

### Design Patterns by Responsibility

| Class / Interface | Location | Responsibility | Pattern | Justification |
|------------------|----------|----------------|---------|----------------|
| AuthGuard | [frontend/src/shared/guards/AuthGuard.tsx](frontend/src/shared/guards/AuthGuard.tsx) | Protects private routes; validates active session before rendering | Guard | **Security at a single point.** PymeBoost handles sensitive advisor-SME relationships and contracts. Without Guard, every component must check auth, creating security gaps. Guard enforces authorization before any logic executes. |
| authStore | [frontend/src/store/authStore.ts](frontend/src/store/authStore.ts) | Manages global auth state (user, token, permissions) | Singleton | **One authoritative source.** Auth state must be consistent across all features (contracts, messaging, dashboards). Multiple instances = token mismatches = silent feature breakage. Zustand enforces one instance automatically. |
| notificationStore | [frontend/src/store/notificationStore.ts](frontend/src/store/notificationStore.ts) | Publishes system-wide toasts, alerts, notifications | Observer (Pub-Sub) | **Decouples event producers from consumers.** When contracts are accepted or phases complete, 5+ features must react without knowing each other. Without Observer, features need direct imports or prop drilling through 5+ levels = fragile code. |
| ApiClient | [frontend/src/lib/apiClient.ts](frontend/src/lib/apiClient.ts) | Base HTTP client with reusable request/response logic | Template Method | **Eliminates duplicate error handling.** Every API call needs JWT injection, error handling, rate limiting, retries. Template Method defines the flow once, reused by all services. Without it, duplicate logic across 10+ services means bugs fixed in one place don't propagate. |
| MatchingService | [frontend/src/features/matching/services/matchingService.ts](frontend/src/features/matching/services/matchingService.ts) | Executes Swipe Approved / Swipe Rejected actions as discrete commands; fetches AI-generated recommendations | Command | **Swipe actions are the core interaction unit.** Each swipe (approved/rejected) is encapsulated as a Command object with `execute()`. This decouples the action from the trigger, enables logging, queuing, and future undo — without Command, swipe logic would be scattered across components. |
| useAdvisorMatching | [frontend/src/features/matching/hooks/useAdvisorMatching.ts](frontend/src/features/matching/hooks/useAdvisorMatching.ts) | Assembles AI recommendation fetch + swipe commands + notifications into a single hook | Factory | **Encapsulates workflow complexity.** Setup requires: TanStack Query config, swipe command creation, cache invalidation, notification publishing. Factory gives components `useAdvisorMatching()` instead of assembling these pieces manually — reduces bugs and cognitive load. |
| ContractValidator | [frontend/src/features/contracts/validators/contractValidator.ts](frontend/src/features/contracts/validators/contractValidator.ts) | Validates contract terms per tier: standard (1mo/3%), medium (3mo/5%), high (6mo/7%), custom (1–12mo, commission auto-calculated), annual (alias for custom at 12mo/10%) | Strategy | **Each tier has different commission and duration rules.** Standard locks commission at 3%, custom enforces linear interpolation `3 + (months-1) × (7/11)%` via `.refine()`, annual is validated as custom with duration_months=12. Without Strategy, a single schema can't enforce tier-specific rules — invalid commissions would silently reach the backend. |
| QueryClientFactory | [frontend/src/lib/queryClient.ts](frontend/src/lib/queryClient.ts) | Initializes and configures TanStack Query | Factory | **Consistent caching across all features.** Factory centralizes cache settings, retry logic, staleTime. Without it, some features cache aggressively while others refetch constantly = data inconsistency and poor UX. |

---

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

---

### State Distribution: Patterns in Practice

**Global State (Zustand) — Singleton Pattern:**
- [`authStore`](frontend/src/store/authStore.ts): Single instance manages user, token, permissions globally.
  - **Why Singleton:** Any feature reading auth must see the same state. Multiple instances = data inconsistency.
- [`notificationStore`](frontend/src/store/notificationStore.ts): Single instance publishes toasts, alerts system-wide.
  - **Why Singleton + Observer:** Swipe approved, contracts accepted, phases completed → all features receive notifications from one source.
- [`uiStore`](frontend/src/store/uiStore.ts): Single instance manages modal states, sidebar visibility, theme.

**Server State (TanStack Query) — Factory + Cache Strategy:**
- All API data (advisors, contracts, messages) cached and managed via [`QueryClientFactory`](frontend/src/lib/queryClient.ts).
- **Why Factory:** Ensures consistent cache settings, retry behavior, staleTime across all queries.
- Automatic refetch, deduplication, background updates reduce stale data bugs.

**Local State (React `useState`):**
- [`MessageInput`](frontend/src/features/messaging/components/MessageInput.tsx) — message text before sending.
- [`MatchingFilters`](frontend/src/features/matching/components/MatchingFilters.tsx) — industry filter input.
- Never persisted beyond the component. Keeps global state clean and predictable.

---

### Composition Over Inheritance

Components are built from primitives, not extended:
- [`ContractNegotiation`](frontend/src/features/contracts/components/ContractNegotiation.tsx) = [`ContractViewer`](frontend/src/features/contracts/components/ContractViewer.tsx) + [`ContractTerms`](frontend/src/features/contracts/components/ContractTerms.tsx) + `ActionButtons` (composition, not inheritance).
- [`Button`](frontend/src/shared/components/ui/Button.tsx) accepts `variant` prop instead of creating `PrimaryButton`, `SecondaryButton` subclasses.
- **Why:** Composition is flexible; inheritance creates rigid hierarchies prone to fragility.

---

### Immutability & State Safety

All state updates use immutable patterns (spread operator, Zustand setters, React hooks). Mutating state directly:
- Breaks Zustand reactivity
- Causes stale UI renders
- Creates race conditions in async workflows 

Zustand and React enforce this automatically through their APIs.

---

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

---

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
 
### Server State (TanStack Query)
 
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

TanStack Query basically handles caching, deduplication, background updates, and stale data automatically. Components never manage backend data manually. [`QueryClientFactory`](frontend/src/lib/queryClient.ts).

---
 
### API Communication Layer
 
Single centralized `ApiClient` handles all HTTP communication:
- Injects JWT token into every request from authStore
- Handles errors (401 → logout user, 5xx → retry with backoff)
- Logs requests/responses to observability system
- No service duplicates auth or error logic
All services call through `apiClient`. No direct fetch() calls.
 
**Why centralized:** JWT injection, error handling, retries, and logging happen once, not duplicated across 10+ service files.

#### HTTP Response Codes

| Code | Name | When PymeBoost receives it | How ApiClient handles it |
|------|------|---------------------------|--------------------------|
| `200` | OK | Successful GET — advisors list, contracts, messages fetched | Returns `{ success: true, data }` |
| `201` | Created | Successful POST — contract proposed, swipe registered, match created | Returns `{ success: true, data }` |
| `204` | No Content | Successful DELETE or action with no body — swipe rejected, notification dismissed | Returns `{ success: true, data: null }` |
| `400` | Bad Request | Request body invalid — contract fields missing or malformed | Returns `{ success: false, error }`, Zod catches this before it reaches components |
| `401` | Unauthorized | JWT expired or missing | Triggers logout via `authStore`, redirects to `/auth/login` |
| `403` | Forbidden | Valid JWT but insufficient role or permission — SME accessing advisor-only route | AuthGuard blocks render; `apiClient` returns `{ success: false, error }` |
| `404` | Not Found | Resource doesn't exist — advisor deleted, contract not found | Returns `{ success: false, error }`, feature shows empty state |
| `409` | Conflict | Duplicate action — PYME already has an active contract, swipe already registered | Returns `{ success: false, error }`, notificationStore publishes warning |
| `422` | Unprocessable Entity | Data structurally valid but business rules fail — commission percentage out of range | ContractValidator catches this before the request; backend returns details |
| `429` | Too Many Requests | Rate limit exceeded — too many matching requests in a short window | `retryDelay` backoff applies; notificationStore publishes warning to user |
| `500` | Internal Server Error | Unexpected backend failure | `executeWithRetry` retries up to 3 times with exponential backoff |
| `502` | Bad Gateway | Cloud Run instance not reachable — deploy in progress | Same retry logic as 500; Sentry logs the incident |
| `503` | Service Unavailable | Backend temporarily down — maintenance window | Retries exhausted → `{ success: false, error }`, user sees error state |

---
 
### Data Validation (Zod)
 
Every response from the backend is validated against a Zod schema before entering state or components.
 
Invalid data is rejected immediately. Components never receive unvalidated data.
 
**Why mandatory:** Bad backend data (missing fields, wrong types) crashes features silently. Zod catches it at the boundary.

---
 
### Mutations (Create, Update, Delete)
 
When data changes (new contract, updated metrics), mutations trigger:
1. Send change to backend
2. On success, invalidate related queries to refetch fresh data
3. Publish notification to notificationStore
Queries automatically refetch and components re-render with new data.
 
**Why invalidate:** No manual state updates. Backend is source of truth; invalidation keeps client in sync.
 
### State Distribution Summary
 
| State Type | Managed By | Where | When to Use |
|-----------|-----------|-------|-----------|
| **Global (auth, notifications, UI)** | Zustand | `src/store/` | Info needed across multiple features |
| **Backend data** | TanStack Query | Services via hooks | Advisors, contracts, messages, dashboards |
| **Form/UI toggles** | React useState | Component | Temporary, not shared (form inputs, dropdowns) |
 
### Key Rules
 
- **Zustand only for global state.** Auth, notifications, UI toggles. Not backend data.
- **TanStack Query for all backend data.** One service per feature. Query invalidation on mutations.
- **Zod validates every API response.** No unvalidated data enters state.
- **ApiClient is the single HTTP entry point.** JWT injection, error handling, logging centralized.
- **No prop drilling.** Use hooks to access global or server state.
- **Components never call API directly.** Always through services and hooks.

---

## 1.7 Workflows & Interaction Flows

PymeBoost has four main user workflows that drive the platform. Each workflow spans multiple features and involves specific interaction patterns.

### 1. PYME Registration & Onboarding

**Users:** New PYME owners

**Flow:**
1. User lands on homepage
2. Clicks "Sign Up as PYME"
3. Redirected to Auth0 login/signup
4. Completes basic info (email, company name, phone)
5. Uploads legal document (cédula jurídica as PDF)
6. AI validates document against MEIC registry
7. Completes company context form (300 words max)
8. Dashboard shows "Account pending verification"
9. Backend validates document → Account activated
10. User redirected to Matching feature

**Key Interactions:**
- Form validation with Zod before submission
- File upload with progress indicator
- Real-time status updates via notifications
- AuthGuard redirects unauthenticated users to login

**Features Involved:** Auth, Dashboard

---

### 2. Advisor Discovery & Matching (Swipe Interface)

**Users:** PYME looking for advisors

**Flow:**
1. User navigates to Matching page
2. AI generates personalized advisor recommendations
3. User sees advisor cards (Tinder-like)
4. User swipes right (approved) or left (rejected)
5. Right swipe creates a match → Chat opens automatically
6. Left swipe discards recommendation → Next card loads

**Key Interactions:**
- Card animations (swipe, fade, slide)
- Real-time compatibility score display
- Previous project showcase on each card
- Estimated metrics improvement visible
- One-tap messaging after approval

**Features Involved:** Matching, Messaging

---

### 3. Contract Negotiation & Signing

**Users:** PYME and Advisor negotiating terms

**Flow:**
1. PYME and Advisor chat about project details
2. PYME clicks "Negotiate Tariff"
3. Modal opens with contract template
4. PYME adjusts: budget, duration, metrics, deliverables
5. PYME sends proposal to Advisor
6. Advisor reviews proposal in chat
7. Advisor accepts or counter-offers
8. Both agree on terms
9. PYME clicks "Marry The Prospect"
10. Contract becomes active → Dashboard tracking begins

**Key Interactions:**
- Form fields for tariff, duration, metrics
- Real-time validation of contract terms
- Visual summary of proposed terms
- Notification when Advisor responds
- One-click contract finalization

**Features Involved:** Messaging, Contracts, Dashboard

---

### 4. Project Tracking & Reporting

**Users:** PYME and Advisor monitoring active contract

**Flow:**
1. Contract is active → Dashboard visible to both
2. Dashboard shows: progress %, phases, metrics, timeline
3. Advisor completes phase → Submits phase report
4. Report visible on dashboard immediately
5. Metrics auto-update based on reported data
6. PYME sees progress in real-time
7. Project ends → PYME rates Advisor
8. Rating stored in Advisor profile
9. Contract closed → Accessible in history

**Key Interactions:**
- Progress bar updates on phase completion
- Metric charts showing before/after
- Phase timeline with completed/pending indicators
- Report submission form with validation
- Rating modal at project end
- History accessible from dashboard

**Features Involved:** Dashboard, Contracts

---

### User Journey

**PYME Journey**
```
Sign Up → Onboarding → Browse Advisors → Swipe & Match → Chat → Negotiate → Sign Contract → Track Progress → Rate Advisor → View History
```

**Advisor Journey**
```
Sign Up → Profile Setup → Receive Match Notification → Chat → Negotiate Terms → Sign Contract → Work & Report → Receive Rating → View Analytics
```
*(Advisors receive all matches automatically; they may cancel a match at any time before contract acceptance if they choose not to proceed.)*

---

### Interaction Patterns

| Pattern | Where | Purpose | Implementation |
|---------|-------|---------|----------------|
| **Modal Forms** | Contract negotiation, phase reports | Focused input without page navigation | [`Modal.tsx`](frontend/src/shared/components/ui/Modal.tsx) — `<Modal open={isOpen} onClose={() => setOpen(false)} title="New Contract">` |
| **Toast Notifications** | Every feature | Status updates (contract accepted, phase done, error) | [`notificationStore`](frontend/src/store/notificationStore.ts) — `publish({ type: "success", title: "Contract accepted", duration: 4000 })` |
| **Loading States** | Data fetching | Spinner or skeleton while data loads | [`MatchingPage`](frontend/src/features/matching/page.tsx) — `if (isLoading) return <p className="animate-pulse">Finding matches…</p>` |
| **Empty States** | No data yet | Friendly message + CTA (e.g., "No contracts yet. Browse advisors") | [`MatchingPage`](frontend/src/features/matching/page.tsx) — `if (!recommendations.length) return <EmptyState cta="Complete your profile" />` |
| **Inline Validation** | Forms | Real-time feedback (red border + error text) | [`Input.tsx`](frontend/src/shared/components/ui/Input.tsx) — `<Input label="Budget" error={errors.budget?.message} />` |
| **Swipe Animations** | Matching | Smooth card transitions (right = approve, left = reject) | [`MatchingCard`](frontend/src/features/matching/components/MatchingCard.tsx) — `<motion.div drag="x" onDragEnd={(_, info) => info.offset.x > 100 ? onApprove(id) : onReject(id)}>` |
| **Real-time Updates** | Dashboard, chat | WebSocket for live metric/message updates | [`useMessaging`](frontend/src/features/messaging/hooks/useMessaging.ts) — `useEffect(() => { ws.current = new WebSocket(url); ws.current.onmessage = (e) => setMessages(prev => [...prev, JSON.parse(e.data)]) }, [url])` |
| **Confirmation Dialogs** | Critical actions | "Are you sure?" before deleting or canceling | [`Modal.tsx`](frontend/src/shared/components/ui/Modal.tsx) — `<Modal title="Cancel contract?"><Button variant="danger" onClick={onConfirm}>Yes, cancel</Button></Modal>` |

### Key Rules

- **Every workflow starts with authentication.** AuthGuard protects all pages.
- **Forms validate before submission.** Zod schemas prevent invalid data.
- **Notifications inform all state changes.** Contract accepted? Match created? User gets toast.
- **No silent errors.** Every API error shows a user-friendly message.
- **Undo where possible.** Swipe rejected? Can swipe right later. Contract pending? Can cancel before signing.

---

## 1.8 Authentication, Security & Session Management

### Authentication Flow

PymeBoost uses Auth0 for centralized authentication. Frontend delegates login/logout to Auth0; backend validates JWT tokens.

**Authentication Sequence:**
1. User clicks "Login" → Redirected to Auth0
2. User enters credentials (email/password or social login)
3. Auth0 validates and returns JWT token + user metadata
4. Frontend stores token in `authStore`
5. All subsequent API requests include JWT in Authorization header
6. Backend validates JWT on every request
7. User clicks "Logout" → Token cleared from `authStore` → Redirected to homepage

**Token Storage:**
- JWT stored in memory (authStore) during session
- Token refreshed automatically before expiration via Auth0 silent authentication
- On page refresh, Auth0 callback validates session and restores token
- No localStorage/sessionStorage (prevents XSS attacks)

---

### Authorization & Permissions

**Permission Model:**

| User Type | Can Do | Cannot Do |
|-----------|--------|-----------|
| **PYME (Verified)** | Browse advisors, swipe, message, create contracts, track projects, rate advisors | Access advisor analytics, upload fake documents |
| **Advisor (Verified)** | Receive matches automatically, cancel matches, message, negotiate contracts, submit reports, view ratings | Browse all PYMES, initiate contacts, swipe on PYMEs |
| **Unauthenticated** | View homepage, sign up | Access any feature |

**Permission Enforcement:**
- Frontend: `AuthGuard` redirects unauthenticated users
- Frontend: Feature components check `authStore.accountType` before rendering admin-only sections
- Backend: Every endpoint validates JWT + checks `accountType` + verifies resource ownership (can't view other PYME's contracts)

---

### Session Management

**Session Lifecycle:**

| Event | Action |
|-------|--------|
| **Login** | Auth0 returns JWT (valid 24 hours). Token stored in authStore |
| **Active Use** | Auth0 silent authentication refreshes token automatically (5 min before expiration) |
| **Page Refresh** | Auth0 callback checks session → Restores token if still valid |
| **Token Expired** | User redirected to login. Clear authStore |
| **Logout** | Token removed from authStore → User redirected to homepage |
| **Inactivity Timeout** | Optional: Clear session after 30 min idle (implement via useEffect hook) |

**Token Refresh Strategy:**
- Frontend monitors token expiration via `useEffect`
- 5 minutes before expiration, silently refresh via Auth0
- No user interruption unless internet disconnects
- If refresh fails, logout user gracefully

---

### Security Measures

### Frontend Security

| Measure | Implementation |
|---------|-----------------|
| **XSS Prevention** | No innerHTML. React escapes by default. DOMPurify for user-generated content (chat messages) |
| **CSRF Protection** | Backend uses SameSite cookies. Frontend sends CSRF token in headers for mutations |
| **Input Validation** | Zod schemas validate all user input before submission |
| **Sensitive Data** | JWT in memory only. No passwords ever stored. Mask credit cards in payment forms (show last 4 digits) |
| **Secure Headers** | Content-Security-Policy, X-Frame-Options, X-Content-Type-Options set by backend |
| **HTTPS Only** | All traffic encrypted. Backend redirects HTTP → HTTPS |

### API Communication Security

| Measure | Implementation |
|---------|-----------------|
| **JWT Authentication** | Every request includes `Authorization: Bearer <token>` header |
| **Request Signing** | Optional: HMAC signature for sensitive mutations (contracts, payments) |
| **Rate Limiting** | Backend rate limits API endpoints (100 req/min per user) |
| **Data Encryption** | Sensitive fields encrypted at rest (credit cards, phone numbers) |
| **Audit Logging** | Backend logs all sensitive actions (contract created, payment made) |

### Message Security (Chat)

| Measure | Implementation |
|---------|-----------------|
| **Blocked Keywords** | Chat validates messages. Blocks external emails, phone numbers, social media links |
| **Message Encryption** | Optional: E2E encryption for chat messages (TLS transport + database encryption) |
| **Access Control** | Only matched PYME and Advisor can see each other's messages. Verified via backend |

---

### Data Privacy

**What Data Exists:**
- PYME: Company name, legal ID, industry, objectives, payment method
- Advisor: Name, experience, certifications, projects, ratings
- Contracts: Terms, budget, metrics, reports
- Chat: Messages, timestamps
- Payments: Credit card (masked), transaction history

**Data Handling:**
- No personal data shared between PYME and Advisor without consent (only within contract context)
- PYME can download own data (GDPR compliance)
- Advisor ratings visible to other PYMEs but not PYME identities
- Deleted contracts kept in archive (not shown to users, audit trail for compliance)

---

### Password & Credential Management

- **No passwords stored in frontend.** Auth0 handles credentials.
- **No secrets in code.** Credentials loaded from Google Secret Manager via environment variables.
- **Payment credentials:** Credit card info sent to payment processor (Stripe), never stored in PymeBoost database.
- **API keys:** Backend API keys stored in Google Secret Manager, rotated quarterly.

---

### Compliance & Standards

| Standard | Requirement |
|----------|------------|
| **OWASP Top 10** | Implement protections against injection, XSS, broken auth, sensitive data exposure |
| **GDPR** | Users can export data, delete account (soft delete with audit trail) |
| **PCI-DSS** | Credit card info handled by Stripe, not stored locally |
| **WCAG 2.1 AA** | All authentication UI keyboard navigable, screen reader compatible |

---

### Monitoring & Alerts

**What Gets Monitored:**
- Failed login attempts (alert if >5 in 10 min)
- Token refresh failures
- Unauthorized access attempts (401, 403 errors)
- Suspicious activity (unusual IP, rapid requests)
- Payment failures

**Alerting:**
- Frontend: Sentry captures errors, sends to monitoring dashboard
- Backend: Logs all security events to Cloud Logging
- Team: On-call engineer notified of critical security issues

---

### Key Rules

- **Auth0 owns authentication.** Frontend never handles passwords.
- **JWT in memory only.** Never localStorage.
- **Every API request validated.** JWT + permission check on backend.
- **No sensitive data in logs.** Never log passwords, credit cards, tokens.
- **Validate & escape user input.** Frontend (Zod) + Backend (server-side validation).
- **Blocked keywords in chat.** Prevent contact info sharing outside platform.
- **Audit trail for sensitive actions.** Track who did what, when.
- **Refresh tokens silently.** User never sees "session expired" unless truly necessary.

## 1.9 Testing, Observability & CI/CD

### Testing Strategy

### Unit Tests (Vitest)

**What to test:** Utilities, hooks, validators, services

**Coverage target:** 80% of business logic

**Importance:**
- ESM-native support for modern JavaScript
- Perfect integration with Vite and Next.js 15
- Faster test execution
- TypeScript out-of-the-box

- [useAdvisorMatching.ts](frontend/src/features/matching/hooks/useAdvisorMatching.ts) → [matching.spec.ts](frontend/src/tests/features/matching.spec.ts) — Tests swipe command execution and AI recommendation fetch logic.
- [contractValidator.ts](frontend/src/features/contracts/validators/contractValidator.ts) → [contracts.spec.ts](frontend/src/tests/features/contracts.spec.ts) — Tests tier-specific commission rules: standard 3%, medium 5%, high 7%, and custom incremental formula.
- [helpers.ts](frontend/src/shared/utils/helpers.ts) → [helpers.spec.ts](frontend/src/tests/shared/helpers.spec.ts) — Tests currency formatting, string truncation, unique ID generation, and relative time formatting.

**Development (local):**

| Command | When to use |
|---------|-------------|
| `npm run test` | During development — watch mode, re-runs on every file save |
| `npm run test:run` | Before committing — runs once and exits with pass/fail |
| `npm run test:coverage` | To check coverage — generates HTML report and fails if below 80% |

**CI/CD (GitHub Actions — triggered on every push):**

```bash
# 1. Push to any branch
git add .
git commit -m "feat: your change"
git push origin feature/your-branch

# 2. GitHub Actions automatically runs frontend-ci.yml:
#    lint → unit tests (npm run test:run) → coverage check → build → E2E
```

The pipeline runs `npm run test:run` headlessly and fails the entire workflow if any test fails or coverage drops below 80%. No manual intervention required — tests block the merge until green.

---

### Integration Tests (Playwright)

**What to test:** Complete user workflows end-to-end

**Critical flows:**
- PYME signup → onboarding → browse advisors
- Advisor matching → swipe approved/rejected → list refresh
- Contract detail → tier validation → terms display
- Messaging → open conversation → send message
- Error handling (network failures, validation errors)

**File structure:**

```
frontend/
└── e2e/
    └── workflows.spec.ts   ← critical workflow tests (auth, matching, contracts, messaging)
```

**Commands:**

| Command | Description |
|---------|-------------|
| `npx playwright test` | Run all E2E tests |
| `npx playwright test --grep @smoke` | Run only smoke tests (used in CI post-deploy) |
| `npx playwright test --ui` | Open interactive UI mode |
| `npx playwright show-report` | Open last HTML report |

**Implementation:** 

Each workflow lives in a `test.describe` block inside [`frontend/e2e/workflows.spec.ts`](frontend/e2e/workflows.spec.ts). Tag smoke tests with `@smoke` so CI can run them post-deploy independently.

Use `data-testid` attributes on components as selectors — never rely on CSS classes or text content, as those change with styling. Add `data-testid` to a component when writing its test.

For tests that require an authenticated user, load session state via Playwright's `storageState` instead of logging in on every test (see [Playwright docs on authentication](https://playwright.dev/docs/auth)).

**Base test file:** [`frontend/e2e/workflows.spec.ts`](frontend/e2e/workflows.spec.ts) — contains the skeleton for all critical workflows with `TODO` comments marking what each test needs to assert.

---

### Test Organization

| Test Type | Tool | Location | Frequency |
|-----------|------|----------|-----------|
| **Unit** | Vitest | `frontend/src/tests/features/`, `frontend/src/tests/shared/` | On save (watch mode) |
| **E2E** | Playwright | `frontend/e2e/` | Before commit, on PR |

---

### Observability

### Frontend Logging & Error Tracking

**Tools:**
- **Sentry:** Captures all errors, sends to dashboard
- **Google Cloud Logging:** Logs important events (login, contract created)
- **Console logs:** Development only (removed in production via tree-shaking)

**What gets logged:**

| Event | Tool | Purpose |
|-------|------|---------|
| **Unhandled errors** | Sentry | Catch bugs before users report them |
| **API errors** | Google Cloud Logging + Sentry | Debug backend issues |
| **User actions** | Google Cloud Logging | Track feature usage (which advisors get clicked) |
| **Performance metrics** | Google Cloud Monitoring | Monitor slow pages |

**Error Tracking Pattern:**
```
ApiClient catches error
→ Logs to Sentry + Cloud Logging
→ Notifies user via toast (user notification, rest of the app still works)
→ Does NOT crash app
```

### Performance Monitoring

**Metrics tracked:**
- Page load time (First Contentful Paint, Largest Contentful Paint)
- API response times
- JavaScript bundle size
- Memory usage

**Tools:** Google Cloud Monitoring, Sentry

### Monitoring Alerts

**Critical alerts (page team immediately):**
- Unhandled errors spike (>10 in 5 min)
- API error rate >5%
- Page load time >3s
- Failed deployments

**Warning alerts (check next morning):**
- Sentry error threshold crossed
- Code coverage dropped below 80%
- Bundle size increased >10%


---

### CI/CD Pipeline

### GitHub Actions Workflows

Workflow files: 
- [`frontend-ci.yml`](.github/workflows/frontend-ci.yml) 
- [`deploy-frontend.yml`](.github/workflows/deploy-frontend.yml)

**On every push to main:**

1. **Lint & Format** (ESLint, Prettier)
   - Check code style
   - Fail if errors found

2. **Unit Tests** (Vitest)
   - Run all unit tests with `npm run test:run`
   - Report coverage
   - Fail if <80% coverage

3. **Integration Tests** (Playwright)
   - Run critical user flows
   - Fail if any flow breaks

4. **Build** (Next.js)
   - Build production bundle
   - Check for TypeScript errors
   - Verify build succeeds

5. **Deploy to Staging** (Vercel)
   - Deploy to staging environment
   - Run smoke tests
   - Notify team if failed

**On PR merge to main:**

6. **Deploy to Production** (Vercel)
   - Requires manual approval via GitHub Environments
   - Deploy to production
   - Monitor for 10 min post-deploy
   - Rollback if critical errors detected

---

### Deployment Architecture

The frontend is deployed to **Vercel**. The code goes from github to production:

```
Developer push
      │
      ▼
GitHub repository
      │
      ├─── push to any branch ──► GitHub Actions: frontend-ci.yml
      │                               lint → unit tests → e2e → build
      │
      ├─── push to develop ────► GitHub Actions: deploy-frontend.yml
      │                               build → vercel CLI → Vercel (staging)
      │                               → smoke tests (@smoke tag)
      │
      └─── push to main ───────► GitHub Actions: deploy-frontend.yml
                                      manual approval (GitHub Environments)
                                      → build → vercel --prod → Vercel (production)
                                      → 10 min post-deploy monitor
```

Vercel does automatically: serverless functions, CDN edge network, SSL, domains and rollback from the dashboard.

| Environment | URL | Branch | Deploy |
|-------------|-----|--------|--------|
| **Development** | `localhost:3000` | feature branches | manual (`npm run dev`) |
| **Staging** | `staging.pymeboost.com` | `develop` | automatic |
| **Production** | `pymeboost.com` | `main` | manual approval required |

### Deployment Strategy

**Rollback:** If there are errors post-deploy, we apply a rollback from Vercel's dashboard.

The frontend does not require Terraform or manual cloud resources — Vercel manages all infrastructure (compute, network, SSL, domains). Declarative config lives in [`frontend/vercel.json`](frontend/vercel.json):

- **`framework`** — tells Vercel this is Next.js (enables automatic build optimizations)
- **`regions`** — `iad1` (us-east-1, Virginia) for lower latency with the backend
- **`headers`** — security headers on all routes: `X-Frame-Options`, `CSP`, `X-Content-Type-Options`
- **`redirects`** — declarative permanent redirects
- **`env`** — references to Vercel Environment Variables (with `@` prefix) instead of hardcoded values

Environment variables (`@next_public_api_url`, etc.) are configured once in the Vercel dashboard and injected automatically on every deploy.
---

### Quality Gates

Code must pass these checks before merging to main:

| Gate | Tool | Rule |
|------|------|------|
| **Lint** | ESLint | No style violations |
| **Tests** | Vitest | 80%+ coverage, all tests pass |
| **Build** | Next.js | No TypeScript errors |
| **E2E** | Playwright | All critical workflows pass |
| **Security** | Snyk | No critical vulnerabilities |
| **Performance** | Lighthouse | Core Web Vitals meet targets |

---

### Key Rules

- **Test critical workflows.** Unit tests for logic, integration tests for user flows.
- **100% test pass before merging.** No exceptions.
- **Monitor in real-time.** Sentry + Cloud Logging always on.
- **Errors don't crash app.** Graceful error handling with user-friendly messages.
- **Auto-deploy to staging.** Manual approval for production.
- **Coverage target 80%.** Acceptable trade-off between speed and reliability.
- **Rollback one-click away.** If production breaks, roll back immediately.

## 1.10 Performance Optimization Strategy

### Core Performance Targets

Targets are defined per page because each route has different rendering complexity. `/login` is a static form; `/matching` fetches advisor cards with images from the API; `/dashboard` renders charts and live metrics; `/messages` must feel instant to be usable as a chat.

| Page | FCP Target | LCP Target | Justification |
|------|-----------|-----------|---------------|
| `/login` | <0.8s | <1.0s | Static form, no API calls on load — slowness here has no excuse |
| `/matching` | <1.8s | <2.0s | Fetches advisor cards with images and AI scores from API |
| `/dashboard` | <2.0s | <2.5s | Renders charts, KPIs, and timeline — most JS-heavy page |
| `/messages` | <1.5s | <1.8s | Chat must feel instantaneous; slow load breaks the real-time illusion |
| `/contracts` | <1.8s | <2.0s | Contract list + detail viewer with structured data |

**CLS target (all pages):** <0.1 — advisor cards, contract items, and chat bubbles must not shift position as images or data loads in. Enforced by reserving explicit dimensions on `<Image>` components and skeleton loaders before data arrives.

**JavaScript Bundle targets (per route, gzipped):**

| Bundle | Size limit | Notes |
|--------|-----------|-------|
| Initial (app shell + auth) | <50KB | Loads on every route — kept minimal by design |
| `/matching` chunk | <40KB | MatchingCard, MatchingGrid, swipe animations (Framer Motion) |
| `/contracts` chunk | <35KB | ContractViewer, ContractNegotiation, tier validation logic |
| `/dashboard` chunk | <30KB | Charts and metrics components loaded on demand |
| Total per route | <150KB | No single page should force the user to download more than this |

Next.js code-splits automatically by route. The 150KB ceiling applies per route, not to the entire app — a user visiting only `/login` downloads ~50KB, never the full bundle.

**API Response Time targets (per endpoint type):**

| Endpoint type | Target | Justification |
|---------------|--------|---------------|
| Static data (user profile, contract list) | <200ms | Simple DB query with indexed fields — no excuse for slowness |
| Matching recommendations (AI) | <1.5s | LangGraph agent processes SME context to rank advisors — inherently slower |
| Message history | <300ms | Paginated query (50 messages max), Redis-cached session |
| Contract submission | <400ms | Writes to DB + publishes Pub/Sub event for notifications |
| Document upload (OCR) | <8s | Cloud Document AI processing — shown to user as async with progress indicator |

The 500ms global target applies to standard CRUD endpoints. AI-driven endpoints (matching recommendations) have a separate 1.5s ceiling, reflected in the TanStack Query `staleTime` and loading state shown to the user during the wait.

---

### Code Splitting

Next.js splits the bundle automatically by route. The split works well only because the feature-based architecture enforces strict boundaries — features never import from each other, so no feature's code leaks into another route's chunk.

| Route | Chunk size | What drives the weight |
|-------|-----------|------------------------|
| Initial (app shell + auth) | ~50KB | Auth0 SDK, Zustand, TanStack Query client |
| `/matching` | +40KB | Framer Motion (swipe animations), advisor card components |
| `/contracts` | +35KB | ContractViewer, tier validation logic, Zod schemas |
| `/dashboard` | +30KB | Chart components, metrics rendering |
| `/messages` | +25KB | WebSocket client, ChatPanel, MessageList |


Heavy components that are only visible inside modals are lazy-loaded so their JS is excluded from the initial route chunk and only downloaded when the user triggers them. [ContractsPage](frontend/src/features/contracts/page.tsx) applies this to `ContractNegotiation` — the negotiation panel never appears on first render, so its code (ContractViewer + ContractTerms + Zod validation logic) is deferred until the user clicks "View":

```typescript
// frontend/src/features/contracts/page.tsx
const ContractNegotiation = lazy(
  () => import("./components/ContractNegotiation")
        .then((m) => ({ default: m.ContractNegotiation }))
);

// In JSX — Suspense shows a fallback while the chunk downloads
<Suspense fallback={<p className="animate-pulse">Loading contract…</p>}>
  {selected && <ContractNegotiation contract={selected} ... />}
</Suspense>
```

Without this, `ContractNegotiation` (which pulls in `ContractViewer`, `ContractTerms`, and their Zod schemas) would be bundled into the `/contracts` route chunk even for users who only open the list and never click into a contract.

---

### Image Optimization

PymeBoost has images in three specific places: advisor avatars in [MatchingCard](frontend/src/features/matching/components/MatchingCard.tsx) (64px), advisor avatars in the chat header (48px), and previous project screenshots inside each card. All use Next.js `<Image>`, which handles WebP conversion and lazy loading automatically.

| Image | Size | `priority` | Why |
|-------|------|-----------|-----|
| PymeBoost logo (navbar) | 120×32px | `true` | Always above the fold |
| First MatchingCard avatar | 64×64px | `true` | First visible element on `/matching` |
| Remaining MatchingCard avatars | 64×64px | `false` (lazy) | Below fold, loaded on scroll |
| Project screenshots | 320×180px | `false` (lazy) | Secondary content inside card |
| Chat header avatar | 48×48px | `false` (lazy) | Only visible after selecting a conversation |

`width` and `height` are always declared explicitly to let Next.js reserve the space before the image loads — this keeps CLS below 0.1. Images are compressed with TinyPNG before upload; advisor avatars must stay under 80KB.

---

### Caching Strategy

[queryClient.ts](frontend/src/lib/queryClient.ts) defines three named cache strategies (`realtime`, `dynamic`, `stable`). Feature hooks pick the one that matches how often their data changes:

| Feature | Strategy | `staleTime` | `gcTime` | Why |
|---------|----------|------------|---------|-----|
| Advisor recommendations | `dynamic` | 2 min | 5 min | AI scores update periodically but not per second |
| Contracts | `stable` | 10 min | 20 min | Status changes only on explicit user actions |
| User profile / permissions | `stable` | 10 min | 20 min | Account type rarely changes mid-session |
| Chat messages | none (WebSocket) | — | — | Messages arrive via WebSocket into [useMessaging](frontend/src/features/messaging/hooks/useMessaging.ts) local state, not polled |
| Static assets (CSS, JS) | Browser cache | — | 1 year | Cache-busted by hash on every Vercel deploy |

**`staleTime` vs `gcTime`:** `staleTime` controls when a background refetch triggers — data is still shown immediately from cache. `gcTime` controls when unused data is garbage collected from memory. A user navigating away from `/matching` and back within 5 minutes sees instant data with no spinner.

**Invalidation on mutation:** When a swipe is registered, [useAdvisorMatching](frontend/src/features/matching/hooks/useAdvisorMatching.ts) calls `queryClient.invalidateQueries` immediately so the swiped advisor disappears without waiting for `staleTime` to expire.

---

### Component Memorization

Re-renders in the matching grid are expensive — `MatchingGrid` renders multiple `MatchingCard` components, and each card contains images, badges, and action buttons. Without memoization, a single state change in `MatchingPage` (e.g. swipe loading state) re-renders every card in the grid.

| API | Applied to | Why |
|-----|-----------|-----|
| `React.memo` | [MatchingCard](frontend/src/features/matching/components/MatchingCard.tsx) | Skips re-render if `match`, `onApprove`, `onReject` props haven't changed |
| `React.memo` | [ContractViewer](frontend/src/features/contracts/components/ContractViewer.tsx) | Contract data is stable once loaded — no reason to re-render on parent updates |
| `useCallback` | [useAdvisorMatching](frontend/src/features/matching/hooks/useAdvisorMatching.ts) — `swipeApproved`, `swipeRejected` | Stable function references prevent `MatchingCard` memo from being invalidated on every hook execution |

`React.memo` only works when the props passed to it are stable. That's why `useCallback` on the swipe handlers is required — without it, new function references on every render would bypass memo on every card.

---

### Bundle Analysis

Every PR runs `npm run analyze` in CI, which generates a Webpack Bundle Analyzer report and fails if any route chunk grows beyond its limit. A 10KB increase in any single chunk triggers a failure.

The heaviest third-party dependencies are tracked explicitly: 
- Framer Motion (`/matching`)
- Radix UI (shared components)
- Zod (validators). 

If any of these upgrades bloat their chunk beyond the limit, the PR is blocked until the import is optimized or the limit is re-justified.

**Run locally:** `npm run analyze` — opens the bundle treemap in the browser.

---

### API Request Optimization

The frontend controls three things that directly affect how many requests hit the backend and how expensive they are:

**Request guards** — [useAdvisorMatching](frontend/src/features/matching/hooks/useAdvisorMatching.ts) uses `enabled: !!pymeId` to block the query from running until a valid PYME ID exists. Without this, the hook fires on mount with an empty ID and hits the backend with a useless request on every page load.

**Scoped cache keys** — `queryKey: ["recommendations", pymeId]` scopes the cache per user. If two different PYMEs use the app in the same session, their recommendation lists never bleed into each other's cache.

**Pagination params** — Services send `?page` and `?limit=20` to the backend so the API returns 20 advisors per request instead of the full dataset. The backend controls the actual query; the frontend controls what it asks for.

---

### Network Optimization

The frontend network layer lives in [apiClient.ts](frontend/src/lib/apiClient.ts). Two decisions there directly reduce network cost:

**Retry with exponential backoff** — if a request fails due to a transient error (network blip, 5xx), `executeWithRetry` retries up to 3 times with increasing delay (1s → 2s → 3s) before giving up. Components never handle retry logic — it's centralized once in the client.

**`X-Trace-ID` on every request** — each request gets a unique trace ID injected in the header. This correlates frontend requests with backend logs in Google Cloud Logging, so when a user reports an error, the exact request can be found across both systems without guesswork.

---

### Real-time Performance

**WebSocket for chat** — [useMessaging](frontend/src/features/messaging/hooks/useMessaging.ts) opens a WebSocket connection per `matchId` on mount. Messages from the backend arrive instantly via `socket.onmessage` and are appended to local state. The connection closes cleanly on unmount, and `socket.onerror` notifies the user if the connection drops. No polling — the backend pushes, the frontend listens.

**Debounce on advisor search** — [MatchingFilters](frontend/src/features/matching/components/MatchingFilters.tsx) keeps a local `industry` state and wraps `onChange` in a `useEffect` with a 300ms `setTimeout`. The API call only fires after the user stops typing for 300ms. The `clearTimeout` in the cleanup function cancels any pending call if the user types again before the delay expires.

---

### Monitoring Performance

**In production:** Sentry captures slow renders and API timeouts in real user sessions. Google Cloud Monitoring tracks Core Web Vitals continuously. 

Alerts fire when any page breaches its specific target from Core Performance Targets.

- `/login` FCP >0.8s,
- `/matching` FCP >1.8s
- `/dashboard` FCP >2.0s
- standard API endpoint >200ms
- matching recommendations >1.5s

These thresholds match the targets exactly so a degradation is caught before users report it.

**Locally before committing:**

| Command | What it does | When to run |
|---------|-------------|-------------|
| `npm run lighthouse` | Audits the running app on `localhost:3000` — scores performance, accessibility, and SEO for each route | Before any PR that touches page layout or data fetching |
| `npm run test:run` | Runs all unit tests once and exits | Before every commit |
| `npm run analyze` | Opens the bundle treemap — shows which library is eating chunk size | Before any PR that adds or upgrades a dependency |

---

### Key Rules

- **Ship less JavaScript.** Code split by route. Lazy load images.
- **Cache aggressively.** TanStack Query + browser cache. Refetch on mutations.
- **Monitor bundle size.** Fail PR if increases >10KB.
- **Avoid re-renders.** Memoize heavy components. Use useCallback for stability.
- **Database first.** Optimize queries, pagination, indexes. Don't fix on frontend.
- **Measure constantly.** Lighthouse, Sentry, Cloud Monitoring in CI/CD and production.

---

## 1.11 C4 Diagrams

Level 2 visualizes external dependencies that the frontend communicates with. Level 3 visualizes how code is organized internally in layers (Features, Shared, Infrastructure) and how data flows between them.

---

### Level 2: Container Diagram

The container diagram visualizes the Next.js Frontend as a black box within its external ecosystem.

**Main Components:**
- **Browser:** PYME and Advisor users
- **Next.js Frontend:** Main React application (CSR)
- **Auth0:** OAuth 2.0 authentication service
- **Backend API:** Python/FastAPI REST API with JWT validation
- **Google Cloud Logging:** Observability system (logs, metrics)
- **Sentry:** Real-time frontend error tracking

**Relationships:**
- Users access frontend via HTTPS
- Frontend authenticates with Auth0 via OAuth 2.0
- Frontend fetches data from Backend API via REST + JWT
- Frontend sends logs and metrics to Cloud Logging via gRPC
- Frontend reports errors to Sentry via HTTPS

![Container Diagram](docs/images/frontend/containers_c4.png)

---

### Component Diagram

The component diagram breaks down the internal architecture of the Next.js Frontend into three vertical layers.

### Features Layer (Top Layer)

Six independent features, each with its own: components, hooks, services, validators.

- **Matching:** Advisor discovery and swipe interface
- **Contracts:** Negotiation and contract signing
- **Messaging:** Real-time chat and message history
- **Dashboard:** Project tracking and metrics display
- **Auth:** Login, logout, session management

**Characteristic:** They don't import from each other. Each feature is an autonomous module.

### Shared Layer (Middle Layer)

Reusable resources shared by all features.

- **UI Components:** Button, Input, Modal, Card, Badge (reusable primitives)
- **Hooks & Guards:** useNotifications, AuthGuard (cross-feature logic)

**Characteristic:** If 2+ features need something, it lives here. Single point of definition.

### Infrastructure Layer (Bottom Layer)

The base that all features depend on. Handles state, data, HTTP, and validation.

- **Zustand:** authStore, notificationStore, uiStore (global state)
- **TanStack Query:** useQuery, useMutation, caching (server state)
- **ApiClient:** JWT injection, error handling, retries (HTTP layer)
- **Validators:** Zod schemas (data validation)

**Characteristic:** Centralized. A change here propagates automatically to all features.

### Data Flow

```
Features → Shared Components/Hooks → Infrastructure (Zustand, TanStack Query)
         → Infrastructure (Zustand, TanStack Query)
         
TanStack Query → ApiClient → Backend API / Auth0
```

![Component Diagram](docs/images/frontend/components_c4.png)

---

### Key Insights

**From Level 2:**
- Frontend is a client that depends on Auth0, Backend, Cloud Logging, Sentry
- All communications are secure (HTTPS, OAuth 2.0, JWT)
- Observability and error tracking are integrated from the start

**From Level 3:**
- Features are independent but share UI and hooks via the Shared layer
- Infrastructure is the immutable base that all features depend on
- Zustand manages global state (auth, notifications, UI)
- TanStack Query manages server data with automatic caching
- ApiClient centralizes JWT injection, error handling, and logging
- Validators ensure data integrity at the boundary (API ↔ App)
- A change in Infrastructure automatically affects all features (no duplication)

---

# Backend

## 2.1 Technology Stack

- API type: REST API, HTTPS
- API standard: OpenAPI 3.1
- API gateway: Google Cloud API Gateway
- Hosting: Google Cloud Run
- Architecture: Monorepo with Domain-Driven Design (DDD) and Event Driven Design (EDD)
- Coding language: Python 3.12
- Web framework: FastAPI 0.115.4
- Unit testing framework: Pytest 8.3.3
- Data validation framework: Pydantic 2.10.2
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
- Agent orchestration framework: LangGraph 0.2.41
- Container registry: Google Artifact Registry
- Vector store: pgvector (PostgreSQL extension on Cloud SQL) 
- LinkedIn profile extraction: ProxyCurl API (Nubela) 

---

## 2.2 Architecture & Domain-Driven Design

PymeBoost backend follows a **vertical domain-driven layered architecture** where the application is organized by business domains rather than technical layers. Each domain is a self-contained module encapsulating its own logic, data, and API endpoints while maintaining clear boundaries through event-driven communication.

The architecture enables:

- **Domain ownership:** Each domain team owns their logic, database schema, and API contracts.
- **Reduced coupling:** Domains communicate through well-defined events and service queries, never direct database access.
- **Scalable growth:** New domains added without affecting existing ones; domain logic stays isolated.
- **Clear responsibility boundaries:** Each domain knows its entities, use cases, and business rules.
- **Event-driven resilience:** Asynchronous communication decouples domains and enables eventual consistency.

The design has 4 main layers: Controllers (HTTP) → Services (logic) → Repositories (data) → Models (schema)

### Code Organization

The repository is structured to make navigation, maintenance, and scaling predictable. Each domain lives as a self-contained vertical slice under `backend/domains/<domain>/`. Within each slice, the four layers always appear in the same folder names (`controllers/`, `services/`, `repositories/`, `models/`, `schemas/`, `events/`), so any developer can find or add logic without reading other domains. Cross-domain utilities (auth, logging, exceptions, validators) live in `backend/shared/` and are imported by any domain that needs them. Tests live under `backend/tests/` organized by test type: `unit/` splits into `api/`, `contract/`, and `health/`; `integration/` holds full domain workflow tests. This layout means adding a new domain is additive: create a new folder, follow the same internal structure, and nothing existing is touched.

Examples:

- HTTP handler for creating an SME account: [create_sme_account_controller.py](backend/domains/user/controllers/create_sme_account_controller.py)
- Business logic for calculating an advisor's reputation: [reputation_service.py](backend/domains/advisor/services/reputation_service.py)
- Database queries for matching results: [match_repository.py](backend/domains/matching/repositories/match_repository.py)
- Event published when a contract is accepted: [contract_accepted_event.py](backend/domains/contract/events/contract_accepted_event.py)
- Shared JWT validation used by all domains: [jwt_validator.py](backend/shared/auth/jwt_validator.py)
- Unit test for API endpoints: [backend/tests/unit/api/](backend/tests/unit/api/)
- Integration test suite: [backend/tests/integration/](backend/tests/integration/)

### Core Domains

PymeBoost is built around these core business domains:

- **User:** Account creation, authentication, profile management (SME, Advisor).
- **Advisor:** Reputation, specializations, base rates, availability.
- **Pyme:** Business information, optimization needs, performance metrics, industry data.
- **Matching:** Advisor discovery, recommendation engine, swipe decisions, match creation.
- **Contract:** Negotiation, proposal submission, terms agreement, tracking.
- **Communication:** Real-time chat, messaging between PYME and advisors.
- **Project:** Project lifecycle, health monitoring, completion tracking.
- **Review:** Ratings and feedback for advisors and PYMEs.
- **Notification:** Event-driven alerts, email notifications, system-wide broadcasts.
- **Event:** Event audit logging, event sourcing, domain event storage.
- **AI:** PDF ingestion, OCR processing, block extraction, thematic classification, embedding generation, vector storage, and all AI-driven computations for the platform.

### Complete Folder Structure

Each domain is a vertical slice with its own layers:

```txt
backend/
├── domains/
│   ├── user/
│   │   ├── controllers/
│   │   │   ├── create_sme_account_controller.py
│   │   │   ├── create_advisor_account_controller.py
│   │   │   ├── login_controller.py
│   │   │   ├── update_sme_profile_controller.py
│   │   │   ├── update_advisor_profile_controller.py
│   │   │   ├── update_advisor_industry_controller.py
│   │   │   └── upload_use_cases_controller.py
│   │   ├── services/
│   │   │   ├── user_service.py
│   │   │   ├── session_cache_service.py
│   │   │   ├── auth_service.py
│   │   │   ├── cedula_juridica_verification_service.py
│   │   │   └── linkedin_profile_extraction_service.py
│   │   ├── repositories/
│   │   │   ├── user_repository.py
│   │   │   └── session_repository.py
│   │   ├── models/
│   │   │   ├── user_model.py
│   │   │   └── session_model.py
│   │   ├── schemas/
│   │   │   ├── create_sme_request.py
│   │   │   ├── create_advisor_request.py
│   │   │   ├── user_response.py
│   │   │   └── session_response.py
│   │   └── events/
│   │       ├── sme_account_created_event.py
│   │       ├── advisor_account_created_event.py
│   │       └── use_case_uploaded_event.py
│   │
│   ├── advisor/
│   │   ├── controllers/
│   │   │   ├── get_advisor_profile_controller.py
│   │   │   ├── calculate_reputation_controller.py
│   │   │   └── update_base_rate_controller.py
│   │   ├── services/
│   │   │   ├── advisor_service.py
│   │   │   ├── reputation_service.py
│   │   │   └── base_rate_service.py
│   │   ├── repositories/
│   │   │   ├── advisor_repository.py
│   │   │   ├── reputation_repository.py
│   │   │   └── specialization_repository.py
│   │   ├── models/
│   │   │   ├── advisor_model.py
│   │   │   ├── specialization_model.py
│   │   │   └── reputation_model.py
│   │   ├── schemas/
│   │   │   ├── advisor_profile_response.py
│   │   │   ├── reputation_dto.py
│   │   │   └── base_rate_dto.py
│   │   └── events/
│   │       ├── advisor_reputation_updated_event.py
│   │       └── advisor_base_rate_updated_event.py
│   │
│   ├── pyme/
│   │   ├── controllers/
│   │   │   ├── get_pyme_profile_controller.py
│   │   │   ├── get_advisor_recommendations_controller.py
│   │   │   ├── get_similar_projects_controller.py
│   │   │   ├── get_needs_assessment_questions_controller.py
│   │   │   └── submit_needs_assessment_controller.py
│   │   ├── services/
│   │   │   ├── pyme_service.py
│   │   │   ├── impact_prediction_service.py
│   │   │   └── needs_assessment_service.py
│   │   ├── repositories/
│   │   │   ├── pyme_repository.py
│   │   │   ├── industry_repository.py
│   │   │   ├── question_catalog_repository.py
│   │   │   └── needs_vector_repository.py
│   │   ├── models/
│   │   │   ├── pyme_model.py
│   │   │   ├── industry_model.py
│   │   │   ├── optimization_area_model.py
│   │   │   ├── question_catalog_model.py
│   │   │   └── needs_vector_model.py
│   │   ├── schemas/
│   │   │   ├── pyme_profile_response.py
│   │   │   ├── recommendation_dto.py
│   │   │   ├── impact_prediction_dto.py
│   │   │   ├── needs_assessment_request.py
│   │   │   └── needs_assessment_response.py
│   │   └── events/
│   │       ├── advisor_recommended_event.py
│   │       ├── recommendation_recalculated_event.py
│   │       └── sme_needs_assessment_updated_event.py
│   │
│   ├── matching/
│   │   ├── controllers/
│   │   │   ├── get_advisor_matches_controller.py
│   │   │   ├── create_swipe_decision_controller.py
│   │   │   ├── create_match_controller.py
│   │   │   ├── cancel_match_controller.py
│   │   │   └── finalize_match_controller.py
│   │   ├── services/
│   │   │   ├── matching_service.py
│   │   │   ├── match_expiration_service.py
│   │   │   └── discovery_service.py
│   │   ├── repositories/
│   │   │   ├── match_repository.py
│   │   │   ├── swipe_repository.py
│   │   │   └── discovery_repository.py
│   │   ├── models/
│   │   │   ├── match_model.py
│   │   │   └── swipe_model.py
│   │   ├── schemas/
│   │   │   ├── match_dto.py
│   │   │   ├── swipe_request.py
│   │   │   └── match_response.py
│   │   └── events/
│   │       ├── match_created_event.py
│   │       ├── match_swiped_event.py
│   │       └── match_expired_event.py
│   │
│   ├── contract/
│   │   ├── controllers/
│   │   │   ├── propose_contract_controller.py
│   │   │   ├── counter_offer_controller.py
│   │   │   ├── accept_contract_controller.py
│   │   │   └── reject_contract_controller.py
│   │   ├── services/
│   │   │   ├── contract_service.py
│   │   │   ├── negotiation_service.py
│   │   │   └── contract_generator_service.py
│   │   ├── repositories/
│   │   │   ├── contract_repository.py
│   │   │   └── negotiation_repository.py
│   │   ├── models/
│   │   │   ├── contract_model.py
│   │   │   └── negotiation_model.py
│   │   ├── schemas/
│   │   │   ├── contract_proposal_request.py
│   │   │   ├── contract_response.py
│   │   │   └── counter_offer_dto.py
│   │   └── events/
│   │       ├── contract_proposed_event.py
│   │       ├── contract_accepted_event.py
│   │       └── contract_rejected_event.py
│   │
│   ├── communication/
│   │   ├── controllers/
│   │   │   ├── validate_chat_access_controller.py
│   │   │   ├── send_message_controller.py
│   │   │   └── get_messages_controller.py
│   │   ├── services/
│   │   │   ├── chat_service.py
│   │   │   └── message_service.py
│   │   ├── repositories/
│   │   │   ├── message_repository.py
│   │   │   └── chat_session_repository.py
│   │   ├── models/
│   │   │   ├── message_model.py
│   │   │   └── chat_session_model.py
│   │   ├── schemas/
│   │   │   ├── message_request.py
│   │   │   ├── message_response.py
│   │   │   └── chat_session_dto.py
│   │   └── events/
│   │       └── message_sent_event.py
│   │
│   ├── project/
│   │   ├── controllers/
│   │   │   ├── create_project_controller.py
│   │   │   ├── submit_baseline_controller.py
│   │   │   ├── validate_subphase_controller.py
│   │   │   ├── get_project_status_controller.py
│   │   │   ├── monitor_health_controller.py
│   │   │   └── close_project_controller.py
│   │   ├── services/
│   │   │   ├── project_service.py
│   │   │   ├── subphase_service.py
│   │   │   ├── health_monitoring_service.py
│   │   │   └── project_completion_service.py
│   │   ├── repositories/
│   │   │   ├── project_repository.py
│   │   │   └── subphase_repository.py
│   │   ├── models/
│   │   │   ├── project_model.py
│   │   │   ├── subphase_model.py
│   │   │   └── project_health_model.py
│   │   ├── schemas/
│   │   │   ├── create_project_request.py
│   │   │   ├── subphase_dto.py
│   │   │   ├── project_response.py
│   │   │   └── health_status_dto.py
│   │   └── events/
│   │       ├── project_created_event.py
│   │       ├── subphase_completed_event.py
│   │       ├── project_status_changed_event.py
│   │       └── project_completed_event.py
│   │
│   ├── review/
│   │   ├── controllers/
│   │   │   ├── leave_advisor_review_controller.py
│   │   │   ├── leave_pyme_review_controller.py
│   │   │   └── get_reviews_controller.py
│   │   ├── services/
│   │   │   └── review_service.py
│   │   ├── repositories/
│   │   │   └── review_repository.py
│   │   ├── models/
│   │   │   └── review_model.py
│   │   ├── schemas/
│   │   │   ├── review_request.py
│   │   │   └── review_response.py
│   │   └── events/
│   │       └── review_submitted_event.py
│   │
│   ├── notification/
│   │   ├── controllers/
│   │   │   └── (notification delivery managed via Pub/Sub, not REST)
│   │   ├── services/
│   │   │   ├── notification_service.py
│   │   │   ├── email_notification_service.py
│   │   │   └── in_app_notification_service.py
│   │   ├── repositories/
│   │   │   └── notification_repository.py
│   │   ├── models/
│   │   │   ├── notification_model.py
│   │   │   └── notification_preference_model.py
│   │   ├── schemas/
│   │   │   └── notification_dto.py
│   │   └── handlers/
│   │       ├── match_created_handler.py
│   │       ├── contract_proposed_handler.py
│   │       ├── project_status_handler.py
│   │       ├── advisor_selected_handler.py
│   │       └── advisor_use_case_processed_handler.py
│   │
│   ├── event/
│   │   ├── controllers/
│   │   │   └── (Event publishing managed internally)
│   │   ├── services/
│   │   │   ├── event_service.py
│   │   │   └── event_audit_service.py
│   │   ├── repositories/
│   │   │   └── event_repository.py
│   │   ├── models/
│   │   │   └── domain_event_model.py
│   │   ├── schemas/
│   │   │   └── domain_event_dto.py
│   │   └── publishers/
│   │       ├── event_publisher.py
│   │       └── pubsub_publisher.py
│   │
│   └── ai/
│       ├── controllers/
│       │   └── (all processing managed via Pub/Sub, not REST)
│       ├── services/
│       │   ├── use_case_pdf_processing_service.py
│       │   ├── ocr_service.py
│       │   ├── embedding_service.py
│       │   ├── thematic_classification_service.py
│       │   ├── recommendation_service.py
│       │   ├── recommendation_batch_service.py
│       │   ├── recommendation_on_demand_service.py
│       │   ├── reflection_service.py
│       │   ├── reflection_recommendation_validation_service.py
│       │   └── reflection_promise_classification_service.py
│       ├── repositories/
│       │   ├── use_case_repository.py
│       │   ├── document_block_repository.py
│       │   └── recommendation_result_repository.py
│       ├── models/
│       │   ├── use_case_model.py
│       │   ├── document_block_model.py
│       │   └── recommendation_result_model.py
│       ├── schemas/
│       │   ├── use_case_dto.py
│       │   ├── document_block_dto.py
│       │   └── recommendation_result_dto.py
│       ├── events/
│       │   ├── advisor_use_case_processed_event.py
│       │   └── recommendation_ready_event.py
│       └── handlers/
│           ├── use_case_uploaded_handler.py
│           └── recommendation_requested_handler.py
│
├── shared/
│   ├── database/
│   │   ├── connection.py
│   │   ├── session.py
│   │   ├── migrations/
│   │   └── seeders/
│   ├── auth/
│   │   ├── jwt_validator.py
│   │   ├── permission_checker.py
│   │   └── auth0_service.py
│   ├── events/
│   │   ├── event_bus.py
│   │   ├── event_handler.py
│   │   └── event_registry.py
│   ├── exceptions/
│   │   ├── domain_exception.py
│   │   ├── validation_exception.py
│   │   ├── auth_exception.py
│   │   └── not_found_exception.py
│   ├── logging/
│   │   ├── logger.py
│   │   └── structured_logging.py
│   ├── messaging/
│   │   ├── pubsub_client.py
│   │   ├── message_publisher.py
│   │   └── message_subscriber.py
│   ├── validators/
│   │   ├── email_validator.py
│   │   ├── phone_validator.py
│   │   └── business_validator.py
│   └── utils/
│       ├── uuid_generator.py
│       ├── datetime_utils.py
│       └── encryption_utils.py
│
├── api/
│   └── routes.py
│
├── tests/
│   ├── unit/
│   │   ├── api/
│   │   │   └── run_api_tests.sh
│   │   ├── contract/
│   │   │   └── run_contract_tests.sh
│   │   ├── health/
│   │   │   └── run_health_tests.sh
│   │   └── run_unit_tests.sh
│   └── integration/
│       └── run_integration_tests.sh
│
├── main.py
├── config.py
└── requirements.txt
```

### Folder Responsibilities

| Folder | Responsibility |
|--------|----------------|
| `domains/[domain]/controllers/` | HTTP endpoint handlers. Parse requests, delegate to services, return responses. One controller per endpoint. |
| `domains/[domain]/services/` | Business logic layer. Implements use cases, orchestrates repositories, publishes events, enforces domain rules. |
| `domains/[domain]/repositories/` | Data access layer. Queries and mutations to database. Abstract database details from services. |
| `domains/[domain]/models/` | SQLAlchemy ORM models. Database table definitions and relationships. |
| `domains/[domain]/schemas/` | Pydantic request/response DTOs. Input validation and API contract definitions. |
| `domains/[domain]/events/` | Domain events published by this domain. Event class definitions. |
| `domains/[domain]/handlers/` | (Notification & Event domains) Event subscribers. Process async events from other domains. |
| `shared/database/` | Database connection, session factory, migrations (Alembic). Shared by all domains. |
| `shared/auth/` | Auth0 JWT validation, permission checking, session management. |
| `shared/events/` | Event bus, event registry, event handler interfaces. Core event infrastructure. |
| `shared/exceptions/` | Custom exception classes (DomainException, ValidationException, etc.). |
| `shared/logging/` | Structured logging, correlation IDs, distributed tracing integration. |
| `shared/messaging/` | Google Cloud Pub/Sub client, message publisher, subscriber utilities. |
| `shared/validators/` | Reusable validation functions (email, phone, business rules). |
| `shared/utils/` | Utility functions (UUID generation, datetime handling, encryption). |
| `api/routes.py` | FastAPI router registration. Aggregates all domain endpoints. |
| `main.py` | FastAPI application factory. Middleware setup, startup/shutdown hooks. |
| `config.py` | Environment configuration, database settings, API keys. |

### Dependency Flow (Within Each Domain)

The dependency flow is **unidirectional and downward**:

```
Controller
    ↓
Service
    ↓
Repository
    ↓
Database (SQLAlchemy Models)
```

**Rules:**
- Controllers never call repositories directly; always through services.
- Controllers never access the database.
- Services orchestrate repositories and publish events.
- Repositories only query and mutate the database.
- Models define schema; no business logic in models.
- Events are published by services, not controllers.

### Controllers — HTTP Handler Layer

#### DO
- Parse HTTP request into Pydantic DTO
- Return appropriate HTTP status codes (200, 400, 401, 500)
- Delegate all business logic to services
- Catch service exceptions and convert to HTTP responses
- Inject dependencies (service, repository) via constructor
- Document endpoint behavior in docstrings

#### DO NOT
| Restriction | Why | Impact |
|-------------|-----|--------|
| Call repositories directly | Breaking layer abstraction | Hidden database coupling |
| Implement business logic | Controllers handle HTTP only | Logic becomes untestable |
| Access the database | Service's responsibility | Breaks dependency inversion |
| Publish events directly | Services own state changes | Events fire at wrong time |
| Call other domain's services | Hard dependencies between domains | Can't deploy independently |
| Mutate request objects | DTOs should be immutable | Silent state corruption |
| Catch and swallow exceptions | Errors need to propagate | Debugging becomes impossible |

---

### Services — Business Logic Layer

#### DO
- Orchestrate repositories to fetch/persist data
- Validate business rules before state changes
- Call other domain services via REST API (with timeout & retry)
- Publish domain events after successful persistence
- Return response DTOs (never raw models)
- Log important business decisions
- Raise domain-specific exceptions

#### DO NOT
| Restriction | Why | Impact |
|-------------|-----|--------|
| Query database directly | Use repositories for abstraction | Database changes break multiple services |
| Import from other domains' folders | Breaks domain isolation | Can't test domains independently |
| Return raw database models | DTOs are API contracts | Frontend couples to schema |
| Perform HTTP calls directly | Use dependency injection | Untestable; hard-coded external deps |
| Mutate input DTOs | Data transformations explicit | Silent bugs; hard to trace changes |
| Publish events in request path | Event handlers may fail | Poor resilience; cascading failures |
| Call database in event handlers | Should be isolated & async | Cascading failures between domains |

---

### Repositories — Data Access Layer

#### DO
- Query the database using SQLAlchemy ORM
- Return complete entities (never partial/null projections)
- Use parameterized queries (ORM prevents SQL injection)
- Let database constraints enforce data integrity
- Raise exceptions if queries fail
- Keep methods focused on single query pattern

#### DO NOT
| Restriction | Why | Impact |
|-------------|-----|--------|
| Implement business logic | Only query/mutate data | Logic gets duplicated |
| Call other repositories | Service's job | Breaks testability |
| Return partial objects | Always return complete entities | Inconsistent data shapes |
| Perform validation | Service's job | Validation gets duplicated |
| Catch exceptions & return null | Let exceptions bubble | Errors silently disappear |
| Execute raw SQL queries | Use ORM consistently | SQL injection risk |
| Publish events | Services own state changes | Events fire at DB level |

---

### Models (SQLAlchemy) — Schema Definition

#### DO
- Define table structure with columns and types
- Use relationships to model domain connections
- Set database constraints (UNIQUE, NOT NULL, FK)
- Keep models as passive data structures
- Use computed properties for read-only derived data

#### DO NOT
| Restriction | Why | Impact |
|-------------|-----|--------|
| Implement business logic or validation | Models define schema only | Constraints become inconsistent with app logic |
| Return models directly to API consumers | Use DTOs as API contracts | Clients couple to internal schema |
| Perform database queries | Models are passive | Logic in wrong place |
| Include state-mutating methods | Mutations go through services | Bypasses validation & events |

---

### Data Validation (Pydantic)

Every request to the backend is validated against a Pydantic schema before entering services or repositories.

Invalid data is rejected immediately. Services never receive unvalidated input.

**Why mandatory:** Malformed requests (missing fields, wrong types, invalid formats) bypass domain rules silently. Pydantic catches them at the API boundary before business logic executes.

---

### Validation Layer Distribution

Validation happens at **multiple layers**, each with specific responsibility:

| Validation Type | Layer | Tool | When | Example |
|-----------------|-------|------|------|---------|
| **Input Format** | Controller | FastAPI + Pydantic | Request arrives | Email format, phone number format, UUID validity |
| **Request DTO** | Controller | Pydantic Schemas | Parse incoming JSON | Required fields present, type correctness |
| **Business Rules (Pre-Service)** | Service | Python + custom validators | Before state change | Email not already registered, advisor exists |
| **Domain Rules** | Service | Domain-specific logic | During use case | Contract terms respect minimum hours, advisor reputation > threshold |
| **Data Integrity** | Repository | Database constraints | Before persist | Unique constraints, foreign keys, NOT NULL |
| **Immutability** | Repository | SQLAlchemy read-only props | After persist | Prevent accidental mutations of retrieved entities |
| **Response Validation** | Service | Zod (frontend) / Pydantic (backend) | Before return | Response matches DTO schema; no null where forbidden |

**Layer-by-Layer Breakdown:**

**1. Controller (Request Entry Point)**
- Parse HTTP body into Pydantic DTO
- Validate required fields, types, formats (Pydantic enforces automatically)
- Reject malformed requests with 400 Bad Request
- Pass clean DTO to service
- **Never:** Call business logic; skip validation

**2. Service (Business Logic)**
- Assume DTO is valid (controller guaranteed it)
- Validate business rules: "Does this email already exist?", "Is advisor available?"
- Enforce domain invariants: "Contract cannot be accepted if parties don't match"
- Validate cross-domain constraints: "Is this advisor in valid specialization?"
- Orchestrate repository calls; collect result
- Publish events only after successful persistence
- **Never:** Re-validate DTO format (controller did it); skip business validation

**3. Repository (Data Access)**
- Assume service passed valid data (service validated it)
- Database constraints enforce final validation: unique indexes, foreign keys, NOT NULL
- Raise exceptions if constraints violated
- Return complete, consistent entities
- **Never:** Validate business rules (service did it); return partial objects

**4. Frontend (Zod Validation)**
- Validate API response against schema
- Reject invalid backend responses early
- Provide type-safe data to components
- Ensure runtime safety even if backend contract changed
- **Never:** Trust unvalidated API data; assume backend never breaks

---

### Domain Isolation & Boundaries

Each domain owns:

- **Its database schema:** No cross-domain foreign keys. Domains reference each other by ID only.
- **Its business logic:** Rules and validations specific to the domain live in its service layer.
- **Its API contracts:** Schemas and DTOs are domain-specific.
- **Its events:** Only this domain publishes these events.

Domains **never**:
- Import from other domains' folders (no `from domains.advisor.services import ...`).
- Share database tables.
- Call other domains' services directly.
- Mutate other domains' data.

**How domains reference each other:**

If Matching domain needs advisor info, it queries the Advisor service via REST API (internal) or caches the data locally. It does **not** import `AdvisorRepository`.

### Communication Strategy

Domains communicate in two modes: **synchronous queries** when a domain needs data immediately, and **asynchronous events** when a domain reacts to another's state change. In both modes, a domain never consumes another domain's data in its raw, foreign shape. Every inbound payload — a query response or an event — first crosses an **Anticorruption Layer** before reaching the consuming domain's services and models.

#### Anticorruption Layer (ACL)

The ACL is a thin, inbound-only translation boundary that each consuming domain owns. It maps another domain's representation (its response DTO or event payload) into the consumer's own model, keeping only the fields the consumer actually needs. This protects each domain's model from foreign concepts and stops an upstream schema change from rippling into downstream logic.

**Why additive changes don't break consumers:** suppose domain B's translator extracts only fields `x`, `y`, `z` from domain A's response — those are the only ones B's model cares about. If A later evolves its response to also include a new field `l` (now `x`, `y`, `z`, `l`), B's translator simply continues extracting `x`, `y`, `z` and ignores `l`. B's service, model, and tests never see `l` and never change. The translator only needs to be touched if B later decides it actually wants `l`, or if A renames or removes one of the fields B already depends on — and even then, the fix is confined to that single translator.

It lives inside the consuming domain — small translator/adapter components sitting at the boundary between its services and the external source — never in the source domain. These components translate in both directions of the call: inbound, they reshape the source's response or event payload into the consumer's own model (as above); outbound, they assemble the request the source's contract expects from data the consumer already has. Either way, the translation is confined to this boundary — a domain's services and business logic never assemble or parse another domain's contract directly, and a domain never reshapes its own model just to please a consumer.

**Why a change in required input parameters doesn't ripple through B:** suppose domain A's query currently requires parameters `x`, `y`, `z`, and B's outbound translator builds exactly that request from data it already holds. If A later changes its contract to require `x`, `y`, `z`, `l`, only B's translator needs to learn how to produce `l` — by reading it from B's own model, deriving it, or applying a sensible default — and it does so in that single place. B's services, call sites, and business logic never construct A's request directly, so they stay untouched. Without this boundary, every spot in B that calls A would need to be found and patched each time A's required parameters change.

**Communication flow:**

- **Query:** the consuming service calls the source domain's public REST API, receives the source's response DTO, and passes it to its ACL translator. The translator returns the consumer's own model, and the service works only with that. If the source DTO changes, only the translator changes.
- **Event:** the consuming domain's handler receives the event from the event bus, passes the payload through its ACL translator to obtain its own model, and the service reacts using that. If the event schema evolves, only the translator adapts; core logic stays untouched.

**Rules:**
- Foreign DTOs and event payloads never reach services, repositories, or models — only translated models do.
- One translator per consumed source; an upstream change touches exactly one place.
- Translators map required fields only and carry no business logic.

#### Synchronous Communication (Queries)

Used when a domain needs immediate data from another — for example, Matching needs an advisor's profile, base rate, and reputation; Pyme needs an advisor's completed similar projects. The consuming service calls the source's public REST API, then translates the response through its ACL before use.

**Rules:**
- Always service-level REST calls; never direct repository access or cross-domain imports.
- Keep queries lightweight to avoid cascading latency.
- Apply timeout and retry for resilience; degrade gracefully when the source is unavailable.

#### Asynchronous Communication (Events)

Used for state changes that other domains react to. The source publishes a domain event to the event bus; each interested domain consumes it through its own handler and ACL translator, then acts on its own model. For example, when an advisor updates their industry, the Advisor domain publishes `AdvisorIndustryUpdated`: the Pyme domain recalculates recommendations, Matching updates active matches, and Notification alerts SMEs — each translating the payload at its own boundary.

**Key Business Events:**

| Event | Triggered By | Published By | Consumed By | Purpose |
|-------|--------------|--------------|-------------|---------|
| **AdvisorAccountCreated** | User creates advisor account | User Domain | Advisor Domain, Notification Domain | Initialize advisor profile, send welcome notification |
| **SmeAccountCreated** | User creates SME account | User Domain | Pyme Domain, Notification Domain | Initialize PYME profile, send welcome notification |
| **AdvisorIndustryUpdated** | Advisor updates specializations | Advisor Domain | Pyme Domain, Matching Domain | Recalculate recommendations, update active matches |
| **AdvisorReputationUpdated** | Reputation score changes | Advisor Domain | Matching Domain, Notification Domain | Update advisor ranking, notify of reputation change |
| **RecommendationUpdated** | New advisors match SME needs | Pyme Domain | Matching Domain, Notification Domain | Refresh recommendations, notify SME |
| **MatchCreated** | PYME and Advisor matched | Matching Domain | Communication Domain, Notification Domain, Contract Domain | Enable chat, notify both parties, prepare contract |
| **MatchSwiped** | Advisor swipes on PYME | Matching Domain | Notification Domain | Notify counterparty of interest |
| **ContractProposed** | Contract sent for negotiation | Contract Domain | Communication Domain, Notification Domain | Enable discussion, notify parties |
| **ContractAccepted** | Contract terms agreed | Contract Domain | Project Domain, Notification Domain | Create project, notify parties, start work |
| **ProjectCreated** | Project starts | Project Domain | Notification Domain, Communication Domain | Enable project chat |
| **ProjectStatusChanged** | Project health or stage updates | Project Domain | Notification Domain | Notify stakeholders of progress |
| **ProjectCompleted** | Project finalized | Project Domain | Review Domain, Notification Domain | Enable reviews, calculate final metrics |
| **ReviewSubmitted** | Review left for advisor/PYME | Review Domain | Advisor Domain, Notification Domain, Pyme Domain | Update reputation, notify subject, archive review |
| **UseCaseUploaded** | Advisor uploads use case PDFs | User Domain | AI Domain | Trigger PDF processing pipeline |
| **AdvisorUseCaseProcessed** | Use case PDF processing completes | AI Domain | Notification Domain | Notify advisor of processing result (success or failure) |
| **SmeNeedsAssessmentUpdated** | SME submits or retakes needs assessment | Pyme Domain | Pyme Domain | Invalidate recommendation cache, trigger recommendation recalculation |

### Shared Components

Shared infrastructure lives in `backend/shared/` and is used by all domains:

**shared/database/:**
- [connection.py](backend/shared/database/connection.py) — Database connection pool, session factory.
- [session.py](backend/shared/database/session.py) — SQLAlchemy session management, transaction handling.
- [migrations/](backend/shared/database/migrations/) — Alembic migrations (versioned schema changes). (similar to flyway)
- [seeders/](backend/shared/database/seeders/) — Data fixtures for development and testing.

**shared/auth/:**
- [jwt_validator.py](backend/shared/auth/jwt_validator.py) — Validates JWT tokens from Auth0; caches JWKS locally.
- [permission_checker.py](backend/shared/auth/permission_checker.py) — Checks user permissions against endpoint requirements.
- [auth0_service.py](backend/shared/auth/auth0_service.py) — Creates/updates users in Auth0 (called by User domain).

**shared/events/:**
- [event_bus.py](backend/shared/events/event_bus.py) — In-memory event broker for publishing/subscribing to domain events.
- [event_handler.py](backend/shared/events/event_handler.py) — Base class for event handlers. Each handler subscribes to specific events.
- [event_registry.py](backend/shared/events/event_registry.py) — Registry of all event handlers. Loaded at startup.

**shared/exceptions/:**
- [domain_exception.py](backend/shared/exceptions/domain_exception.py) — Base exception for domain-specific errors.
- [validation_exception.py](backend/shared/exceptions/validation_exception.py) — Input validation failures.
- [auth_exception.py](backend/shared/exceptions/auth_exception.py) — Authentication/authorization failures.
- [not_found_exception.py](backend/shared/exceptions/not_found_exception.py) — Resource not found.

**shared/logging/:**
- [logger.py](backend/shared/logging/logger.py) — Structured JSON logging with correlation IDs.
- [structured_logging.py](backend/shared/logging/structured_logging.py) — Middleware to inject trace_id, request_id, user_id into logs.

**shared/messaging/:**
- [pubsub_client.py](backend/shared/messaging/pubsub_client.py) — Google Cloud Pub/Sub connection and utilities.
- [message_publisher.py](backend/shared/messaging/message_publisher.py) — Publish messages to topics (for external integrations, email notifications).
- [message_subscriber.py](backend/shared/messaging/message_subscriber.py) — Subscribe to topics and process messages asynchronously.

**shared/validators/:**
- [email_validator.py](backend/shared/validators/email_validator.py) — Email format and uniqueness validation.
- [phone_validator.py](backend/shared/validators/phone_validator.py) — Phone number format validation.
- [business_validator.py](backend/shared/validators/business_validator.py) — Business rule validations (e.g., valid industry codes).

**shared/utils/:**
- [uuid_generator.py](backend/shared/utils/uuid_generator.py) — Generate consistent UUIDs.
- [datetime_utils.py](backend/shared/utils/datetime_utils.py) — Datetime parsing, formatting, timezone handling.
- [encryption_utils.py](backend/shared/utils/encryption_utils.py) — Encrypt/decrypt sensitive fields.


### Naming Conventions

**Controllers:**
- Verb-noun: `create_sme_account_controller.py`, `get_advisor_profile_controller.py`, `accept_contract_controller.py`
- Class name: `CreateSmeAccountController`, `GetAdvisorProfileController`
- Route: `/api/sme/accounts`, `/api/advisors/{id}`, `/api/contracts/{id}/accept`

**Services:**
- Noun-service: `user_service.py`, `advisor_service.py`, `matching_service.py`
- Class name: `UserService`, `AdvisorService`, `MatchingService`
- Methods: `create_sme_account()`, `get_advisor_profile()`, `calculate_match_score()`

**Repositories:**
- Noun-repository: `user_repository.py`, `advisor_repository.py`, `match_repository.py`
- Class name: `UserRepository`, `AdvisorRepository`, `MatchRepository`
- Methods: `save()`, `find_by_id()`, `find_all()`, `delete()`

**Models:**
- Noun + `Model`: `sme_model.py`, `advisor_model.py`, `match_model.py`
- Class name: `SMEModel`, `AdvisorModel`, `MatchModel`
- Table name: `smes`, `advisors`, `matches` (snake_case, plural)

**Schemas (DTOs):**
- Request: `create_sme_request.py`, `counter_offer_request.py`
- Response: `sme_response.py`, `advisor_response.py`
- DTO: `reputation_dto.py`, `match_dto.py`
- Class name: `CreateSmeRequest`, `SmeResponse`, `ReputationDTO`

**Events:**
- Past tense: `sme_account_created_event.py`, `advisor_reputation_updated_event.py`, `match_created_event.py`
- Class name: `SmeAccountCreatedEvent`, `AdvisorReputationUpdatedEvent`, `MatchCreatedEvent`

**Handlers (Async Event Processing):**
- Event + handler: `match_created_handler.py`, `project_status_handler.py`
- Class name: `MatchCreatedHandler`, `ProjectStatusHandler`
- Method: `handle(event: MatchCreatedEvent)`

### Key Rules

- **Domain isolation:** Domains never import from other domains; communicate via REST APIs and events only.
- **Anticorruption Layer:** Every inbound query response or event payload is translated into the consuming domain's own model at its boundary; foreign DTOs never reach services, repositories, or models.
- **No circular dependencies:** If A calls B, B must not call A (directly or indirectly).
- **Single responsibility:** Each service has one reason to change; repositories only do data access.
- **Immutable requests:** Request DTOs are read-only; responses are built from domain entities.
- **Event-driven resilience:** State changes are published as events; subscribers handle them asynchronously.
- **Repository contracts:** Repositories expose only query/mutation methods, not entities directly.
- **Service orchestration:** Services call repositories and publish events; they own the use case logic.
- **Explicit dependencies:** All dependencies injected via function parameters or constructor, never imported globals.
- **No business logic in models:** Models define schema only; validation and rules live in services.
- **One controller per endpoint:** Each controller handles a single HTTP operation; delegate all logic to services.

---

## 2.3 Environment Variables & Configuration

### Management
- **Secrets:** All sensitive values (API keys, database passwords, encryption keys) stored in **Google Secret Manager**; never hardcoded or in `.env` files.
- **Non-sensitive config:** Passed via environment variables at runtime through GitHub Environments (Development, Stage, Production), this are variables like API version, name of the bucket, etc.
- **Validation:** Required variables validated on application startup using Pydantic `ConfigDict`; missing or invalid values prevent deployment.

### Required Variables by Environment


**All Environments:**

**Setup:** Three GitHub Environments configured (Development, Staging, Production) with environment-specific variables.

**Result:** Same Docker image deployed to all environments, but each behaves differently based on GitHub-injected variables.


- `ENVIRONMENT` — Deployment stage: `development`, `staging`, `production`
- `LOG_LEVEL` — Logging verbosity: `DEBUG`, `INFO`, `WARNING`, `ERROR`. Defines how many information needs to be log.
- `API_VERSION` — OpenAPI version: `v1`
- `AUTH0_DOMAIN` — Auth0 tenant domain for JWT validation, every environment uses a different url to get the JWKS public keys.
- `JWKS_URL` — Auth0 JWKS endpoint for token key caching
- `GCP_PROJECT_ID` — Google Cloud project identifier

**Database:**
- `DATABASE_URL` — Cloud SQL connection string (from Secret Manager)
- `DATABASE_POOL_SIZE` — Connection pool size per environment

**GCP Services:**
- `GCS_BUCKET_NAME` — Google Cloud Storage bucket for documents/reports
- `PUBSUB_TOPIC_CONTRACTS` — Pub/Sub topic for contract events
- `REDIS_URL` — Cloud Memorystore Redis connection (from Secret Manager)
- `KMS_KEY_NAME` — Cloud KMS key for AES-256 encryption

**Third-party Integrations:**
- `LANGRAPH_API_KEY` — LangGraph agent orchestration API key (from Secret Manager)

### Loading Strategy
- Variables loaded at startup with clear error messages for missing values.
- Environment-specific overrides applied automatically from GitHub Environments.

---

### Deployment Strategy

**Rolling deployment:** New code gradually replaces old code (no downtime)

**Rollback:** If critical errors detected post-deploy, one-click rollback to previous version

---

## 2.4 Security

### Authentication & Authorization
- Authentication delegated to Auth0 with Google OAuth 
- JWT tokens validated on every request; expiration: 1 hour, automatic rotation with refresh token
- Four roles with role-based access control: `pyme_owner`, `advisor`, `admin`, `system_agent`
- Per-endpoint authorization enforced using role claims from JWT payload

**Permission Matrix:**

| Action | PYME Owner | Advisor | Admin | System Agent |
|--------|-----------|---------|-------|--------------|
| Browse Advisors | Yes | No | Yes | No |
| Send/Receive Match | Yes | Yes | Yes | No |
| Chat (Matched) | Yes* | Yes* | Yes | No |
| Propose/Accept Contract | Yes* | Yes* | Yes | No |
| View Own Contracts | Yes | Yes | Yes | No |
| View All Contracts | No | No | Yes | No |
| Submit Project Report | Yes* | Yes* | Yes | No |
| Rate Advisor | Yes* | No | Yes | No |
| Process OCR Documents | No | No | No | Yes |
| Generate Recommendations | No | No | No | Yes |

`* = Requires bilateral match or resource ownership`

**Resource Ownership:**
- Users can only access resources they own or participate in
- Example: PYME A cannot view Contract created between PYME B and Advisor C
- Validated at Service layer: user_id must match resource owner or participant
- Ownership violation returns 403 Forbidden

**Token Expiration & Refresh:**
- JWT expiration: **1 hour** from Auth0
- **Silent renewal:** Frontend automatically refreshes JWT **5 minutes before expiration** using Auth0 refresh token (transparent to user)
- Refresh token validity: **30 days** from Auth0 (token can be renewed while still valid)
- Backend validates token on every request against JWKS cache
- If token expired AND refresh token also expired → 401 Unauthorized, user must re-authenticate
- JWKS cache TTL: 3 hours (matching the maximum JWT validity: 1 hour standard + 2 hour grace period); fallback to Auth0 if cache miss

**Rate Limiting:**

| Role | Limit | Window |
|------|-------|--------|
| pyme_owner | 100 requests | per minute |
| advisor | 100 requests | per minute |
| admin | 200 requests | per minute |
| system_agent | 500 requests | per minute |

- Rate limit exceeded → 429 Too Many Requests
- Limits applied per user_id, not per IP
- Blocking duration: 60 seconds

### Error Handling

**Exception Mapping to HTTP Status Codes:**

| Exception Type | HTTP Code | Response | When |
|----------------|-----------|----------|------|
| ValidationException | 400 | Invalid input format | Pydantic validation fails |
| DomainException | 400 | Business rule violated | Email exists, advisor unavailable |
| AuthException | 401/403 | JWT invalid/expired or no permission | Auth failed or insufficient role |
| NotFoundException | 404 | Resource not found | Contract ID doesn't exist |
| ConflictException | 409 | Resource state conflict | Double-accept contract |
| InternalServerError | 500 | Internal error (no details to user) | Unhandled exception |

**Error Response Format:**
```json
{
  "error_code": "RESOURCE_NOT_FOUND",
  "message": "Contract ABC123 not found",
  "timestamp": "2026-06-05T10:30:00Z",
  "trace_id": "abc-123-def"
}
```

**Retry Strategy:**
- Transient errors (5xx, timeout): Exponential backoff (100ms → 200ms → 400ms → 2s → 5s)
- Max retries: 5
- Non-retryable errors (4xx, validation): No retry
- Database connection failures: Retry with exponential backoff

**Fallback & Degradation:**
- Document AI down: Retry 3 times; circuit breaker opens after 5 consecutive failures → 4xx returned to client
- Redis down: Query database directly (slower but functional)
- Pub/Sub unavailable: Dead Letter Policy for failed messages; exponential backoff retry (100ms → 200ms → 400ms); max 3 retries

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

## 2.5 Observability

### Logs
* Format: Structured JSON with trace_id, request_id, user_id, user_role, timestamp, level, message, service, enviroment, version, endpoint, method, statuscode
* Destination: Google Cloud Logging (same as frontend)
* Correlation: X-Trace-ID header propagated across all requests (unified with frontend logs)
* Retention: 1 year

### Metrics
* What to measure: Latency (P95, P99), error rate, CPU utilization, memory usage, Pub/Sub queue depth
* Destination: Google Cloud Monitoring
* Tool: Google Cloud Monitoring dashboards
* Retention: 1 year
 
### Distributed Traces
* Instrumentation: OpenTelemetry SDK for Python (FastAPI)
* Destination: Google Cloud Trace
* Scope: Trace every HTTP request from entry to exit, including Cloud SQL queries and Pub/Sub messages
* Retention: 1 year
 
### Application Patterns
 
* Health Checks: /health/live (liveness), /health/ready (readiness) endpoints checked every 30 seconds by Cloud Run
* Correlation IDs: X-Trace-ID injected into all logs, metrics, and spans; same ID across Frontend and Backend
* Service Level Indicators: 
  - Availability: 99.9% (max 43 min downtime/month)
  - Latency: 95% of requests < 500ms
  - Error rate: < 0.5%
 
### Events to Register
 
* User login (success/failure), JWT validation failures, unauthorized access attempts
* Recommendations created, Documentos processed.
* API requests (received/completed), database queries, Pub/Sub messages (enqueued/processed)
* Exceptions/errors, health check results, performance degradation
 
### Centralization
 
* Events Platform: Google Cloud Operations Suite (Cloud Logging + Cloud Monitoring + Cloud Trace)
* Log Storage: Cloud Logging (structured logs retained 1 year; audit logs follow the retention schedule: Year 1 hot storage, Year 2 cool storage, Year 3+ archive, purged after 5 years via Cloud Scheduler)
* Dashboard Tool: Google Cloud Monitoring Dashboards 
* Frontend Synchronization: Same X-Trace-ID and Cloud Logging workspace for full-stack tracing

---

## 2.6 Infrastructure & DevOps

### CI/CD Tool
* GitHub Actions: Automates build, test, and deployment from code repository
* Trigger: Automatic on push to develop (Dev) and main (Staging → Prod)
 
### CI/CD Pipeline

Workflow file: [backend-tests.yml](.github/workflows/backend-tests.yml)

On every push to the working branch, GitHub Actions runs the jobs in order:

1. `unit-tests` runs [run_unit_tests.sh](backend/tests/unit/run_unit_tests.sh) (includes API, contract, and health checks) with coverage.
2. `integration-tests` runs [run_integration_tests.sh](backend/tests/integration/run_integration_tests.sh) with coverage.
3. `coverage-gate` fails the pipeline if total coverage is below 80%.
4. `promote-to-main` runs only if all previous jobs pass and promotes the current branch into `main`.

The `promote-to-main` job is the last step because the hosting service builds the production image from `main`. A branch only reaches `main`, and therefore production, after every test passes and the coverage gate is met.

#### GitHub Actions Workflows

Workflow file: [backend-ci.yml](.github/workflows/backend-ci.yml)
**On every push to working branch:**

1. **Unit Tests** (Pytest)
   - Run [run_unit_tests.sh](backend/tests/unit/run_unit_tests.sh) (includes API, contract, and health check suites)
   - Report coverage with --cov-report=term-missing
   - Fail if < 80% coverage

2. **Integration Tests** (Pytest)
   - Run [run_integration_tests.sh](backend/tests/integration/run_integration_tests.sh)
   - Real PostgreSQL test database, in-memory event bus, external providers stubbed
   - Fail if < 80% coverage

3. **Coverage Gate** 
   - Aggregate (Combines coverage from unit testing and integration testing) coverage total.
   - Fail pipeline if total drops below 80%

4. **Build Docker Image** (Google Artifact Registry)
   - Build production Docker image
   - Push to Artifact Registry with automatic vulnerability scanning
   - Binary authorization approval required before deploy

5. **Promote to main ** (runs only if all jobs above pass)
   - Merge working branch into `main`
   - Triggers staging deployment

**On PR merge to main:**

5. **Deploy to Production** (Google Cloud Run)
   - Deploy to production
   - Monitor Cloud Logging + Cloud Monitoring for 10 min post-deploy
   - Rollback to previous image if critical errors detected

### Testing Strategies

All backend tests run with Pytest 8.3.3 on Python 3.12 and execute automatically through GitHub Actions on every push and pull request. Each strategy has a runner script that executes its suite and produces a coverage report measuring how much of `backend` is exercised. The pipeline fails if total coverage drops below 80%.

#### Unit Testing Strategy

Runner script: [run_unit_tests.sh](backend/tests/unit/run_unit_tests.sh)

Unit tests validate isolated components (controllers, services, repositories, validators) with all external dependencies mocked (database, Auth0, Pub/Sub, Cloud Storage). API, contract, and health checks are treated as part of unit testing and run inside this same suite and coverage report.

Coverage command: `pytest backend/tests/unit --cov=backend --cov-report=term-missing --cov-fail-under=80`

##### API Unit Testing Strategy

Runner script: [run_api_tests.sh](backend/tests/unit/api/run_api_tests.sh)

Tests each controller and endpoint in isolation using FastAPI TestClient with mocked services. Validates status codes, request validation errors, and response shapes for every route.

##### Contract Unit Testing Strategy

Runner script: [run_contract_tests.sh](backend/tests/unit/contract/run_contract_tests.sh)

Validates that request and response Pydantic schemas match the published OpenAPI 3.1 contract, so DTOs never drift from the documented API.

##### Health Checks Unit Testing Strategy

Runner script: [run_health_tests.sh](backend/tests/unit/health/run_health_tests.sh)

Tests the `/health/live` and `/health/ready` endpoints return the expected status and payload, keeping the Cloud Run liveness and readiness probes reliable.

#### Integration Testing Strategy

Runner script: [run_integration_tests.sh](backend/tests/integration/run_integration_tests.sh)

Integration tests exercise full domain workflows against a real PostgreSQL test database and the in-memory event bus, with external providers stubbed. Coverage is reported the same way as unit tests.

Coverage command: `pytest backend/tests/integration --cov=backend --cov-report=term-missing --cov-fail-under=80`

#### Test Organization

Test files live under `backend/tests/`, mirroring the domain structure of the source code so each test file maps directly to the module it covers:

```
backend/tests/
├── unit/
│   ├── api/                        ← controller tests per domain
│   │   ├── test_user_controller.py
│   │   ├── test_matching_controller.py
│   │   └── ...
│   ├── contract/                   ← Pydantic schema vs OpenAPI contract
│   │   └── test_schemas.py
│   ├── health/                     ← /health/live and /health/ready
│   │   └── test_health.py
│   ├── conftest.py                 ← shared mocks and fixtures for unit suite
│   └── run_unit_tests.sh
└── integration/
    ├── test_matching_workflow.py   ← full domain workflow tests
    ├── test_contract_workflow.py
    ├── conftest.py                 ← real DB setup/teardown fixtures
    └── run_integration_tests.sh
```

Naming rule: every test file is prefixed with `test_` and mirrors the module name it covers (e.g., `reputation_service.py` → `test_reputation_service.py`).

#### Configuration Policy

| Config file | Location | Purpose |
|-------------|----------|---------|
| [pytest.ini](backend/pytest.ini) | `backend/` | Defines `testpaths`, and markers (`unit`, `integration`) |
| [conftest.py](backend/tests/unit/conftest.py) (unit) | `backend/tests/unit/` | Shared mocks: database session, Auth0 JWT, Pub/Sub client |
| [conftest.py](backend/tests/integration/conftest.py) (integration) | `backend/tests/integration/` | Real PostgreSQL test DB setup/teardown, in-memory event bus |

Conftest helps creating mocked requirements for the test. Example: For integration tests Conftest creates real test DBs and after the test it eliminates them.
Although for unit test it only creates a MagicMock instead of a database, it doesnt have a real connection. 

Markers keep suites isolated: `@pytest.mark.unit` runs without any infrastructure; `@pytest.mark.integration` requires the test database. Runner scripts pass `-m unit` or `-m integration` so the two never mix in a single run.

### Deployment Tool
* Terraform: Infrastructure as Code for Google Cloud resources (Cloud Run, Cloud SQL, Cloud Storage, Secret Manager)
* Environments: 
  - Dev: Cloud Run with 1 minimum instances (automatic deploy)
  - Staging: Cloud Run with 2 minimum instances (automatic deploy)
  - Prod: Cloud Run with auto-scaling from 1 to 10 instances (manual approval required, blue-green deployment). We intentionally keep the maximum number of instances low to optimize costs. At this stage of the project, we do not expect traffic levels that would require more than 10 instances. Based on our estimates, a single instance can handle approximately 5–20 requests per second, making a limit of 10 instances sufficient—and likely conservative—for the expected user base during the first year.

Blue: Is a production environment where you have all the real users
Green: Is a production environment where you deploy the new version
After some test and time using green you change the switch on the load balancer, redirectioning all the users to the green server insted of blue.

### Container Registry
* Google Artifact Registry: Store Docker images with automatic vulnerability scanning and binary authorization (approval)

### Quality Gates

Code must pass these checks before merging to main:

| Gate | Tool | Rule |
|------|------|------|
| **Unit Tests** | Pytest | 80%+ coverage, all tests pass |
| **Integration Tests** | Pytest | All domain workflows pass |
| **Build** | Docker | Image builds without errors |
| **Security** | Google Artifact Registry | No critical vulnerabilities (automatic scan on push) |
| **Contract** | Pydantic / OpenAPI | Schemas match published API contract |

---

### Monitoring Alerts

**Critical alerts (page team immediately):**
- Unhandled exceptions spike (> 10 in 5 min) in Cloud Logging
- API error rate > 5% (5xx responses)
- Cloud Run instance count hits max (scaling ceiling reached)
- Failed deployments or binary authorization rejections

**Warning alerts (check next morning):**
- Test coverage dropped below 80%
- Cloud SQL connection pool near saturation
- Pub/Sub Dead Letter Queue message count rising

---

## 2.7 Availability & Resilience

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
| **Google Cloud Document AI** | 99.9% | Retry with exponential backoff (3 attempts); circuit breaker opens after 5 failures → 4xx returned |
| **Auth0** | 99.99% | Managed HA by Auth0; JWT cache allows short-term offline tolerance |
| **Google Cloud Logging** | 99.95% | Best-effort; non-critical for availability |

**Dead Letter Policy (Pub/Sub):**
- When a message fails to process (after max retries), it's moved to a Dead Letter Queue (DLQ) instead of being discarded
- Prevents message loss: failed messages stored for later inspection
- Flow: Message → Process → Fails 3x → Dead Letter Queue → Alert
- Team can fix issue or GC pub/sub may be up again so it can retry sending messages from DLQ
- Example: Notification fails to send → DLQ → Alert → Fix/GC gets up again → Retry sending

### Single Point of Failure Analysis
- **Auth0:**
   1. Valid JWT token arrives at API
   2. Validated against Auth0 JWKS (JSON Web Key Set) cached in Redis (3h TTL)
   3. Session stored in Redis with TTL of 3 hours (matching the maximum JWT validity: 1 hour standard + 2 hour grace period)
   4. If Auth0 goes down → Backend continues validating signatures against cached JWKS
   5. **Guarantee:** JWKS always available for entire session lifetime (both expire at 3h)
   6. **Result:** Every JWT signature validated cryptographically; no unverified claims extraction needed
   7. If Redis also down → Fallback to database, no JWT validation (fails safely with 401)

- Document AI: If unavailable, OCR fails; mitigated with retry (3 attempts) and circuit breaker — returns 4xx after exhaustion

- Cloud SQL: Mitigated with Cloud SQL HA (Secondary Instance of the DB) and automatic failover

### Resilience Patterns (Production)

#### Circuit Breaker — Document AI
Applied in the AI Domain service for all calls to Google Cloud Document AI (PDF use case processing pipeline).

| State | Trigger | Behavior |
|-------|---------|---------|
| **Closed** | Default | Calls pass through to Document AI |
| **Open** | 5 consecutive failures | Calls blocked immediately; 4xx returned without calling Document AI |
| **Half-Open** | 30 seconds after opening | One probe call allowed — success → Closed; failure → Open again |

#### Retry with Backoff
Three independent layers apply exponential backoff:

| Layer | Scope | Attempts | Backoff | On exhaustion |
|-------|-------|---------|---------|--------------|
| Cross-domain REST | Service-to-service calls via [`shared/utils/`](backend/shared/utils/) | 3 | 100 ms → 200 ms → 400 ms | Raises `DomainException`; mapped to domain error response |
| Database | Repository layer — Cloud SQL connections | 3 | 100 ms → 200 ms → 400 ms | Exception propagates → `503 Service Unavailable` |
| Pub/Sub | Message delivery | 3 | 100 ms → 200 ms → 400 ms | Message moved to Dead Letter Queue (DLQ) |

4xx responses are not retried in any layer — they indicate a permanent client error.

#### Bulkhead — OCR Processing
Pub/Sub subscriber for Document AI is capped at **20 max concurrent threads**. Messages beyond that remain queued in Pub/Sub until a thread is free; no messages are dropped.

#### Health Checks
Cloud Run probes `/health/ready` every 30 seconds. It verifies connectivity to Cloud SQL, Redis, and Pub/Sub. On failure, the instance is removed from the load balancer and restarted automatically.

---

### Error Handling

Auth-specific error flows are in [2.8 Caching Strategy](#28-caching-strategy).

#### API Error Response Format

All error responses follow a single format, consistent with the error response format defined in [section 2.4](#24-security):

```json
{
  "error_code": "RESOURCE_NOT_FOUND",
  "message": "Human-readable message describing what went wrong",
  "timestamp": "2026-06-05T10:30:00Z",
  "trace_id": "abc-123-def"
}
```

**Rules:**
- `error_code` is a machine-readable constant (e.g. `RESOURCE_NOT_FOUND`, `VALIDATION_ERROR`, `UNAUTHORIZED`).
- `message` is always a single human-readable string; no nested objects.
- `timestamp` is the ISO 8601 UTC time when the error occurred.
- `trace_id` correlates the error with backend logs in Cloud Logging.
- Stack traces, internal class names, and database details are **never** included in the response body — they go to Cloud Logging only.
- Pydantic validation failures (422) are intercepted by a custom FastAPI exception handler in [`main.py`](backend/main.py) and converted to this format before reaching the client.

---

#### Exception Class → HTTP Status Mapping

Domain exceptions defined in [`shared/exceptions/`](backend/shared/exceptions/) are registered as FastAPI exception handlers at startup in [`main.py`](backend/main.py). Each exception class maps to exactly one HTTP status code.

| Exception class | HTTP status | When it is raised | Example |
|----------------|-------------|-------------------|---------|
| `ValidationException` | `400 Bad Request` | Input format valid but value violates a domain rule | Commission percentage outside allowed range |
| `DomainException` | `400 Bad Request` | Business rule violated (not a state conflict) | Email already registered, advisor unavailable |
| `AuthException` (unauthenticated) | `401 Unauthorized` | JWT missing, expired, or signature invalid | Request arrives without `Authorization` header |
| `AuthException` (forbidden) | `403 Forbidden` | Valid JWT but insufficient role or resource ownership | PYME tries to read another PYME's contract |
| `NotFoundException` | `404 Not Found` | Requested resource does not exist | Advisor ID not found in the database |
| `ConflictException` | `409 Conflict` | Business rule violated due to existing resource state | PYME already has an active contract with this advisor |
| Pydantic `RequestValidationError` | `422 Unprocessable Entity` | Request body fails schema validation | Required field missing, wrong type |
| Any unhandled exception | `500 Internal Server Error` | Unexpected failure not caught by any handler | Bug in service logic, null pointer |

**Global unhandled exception handler:**
A catch-all handler registered in `main.py` intercepts any exception not matched above. It:
1. Logs the full traceback with `trace_id` and `user_id` to Cloud Logging.
2. Sends the error to Sentry.
3. Returns `{ "success": false, "error": "An unexpected error occurred" }` — no internal details exposed.

---

#### Cross-Domain Call Failures

When one domain calls another via REST (synchronous query — see [Communication Strategy](#communication-strategy)), the calling service wraps the request with retry logic from [`shared/utils/`](backend/shared/utils/):

| Step | Behavior |
|------|----------|
| Attempt 1 | Call with 2-second timeout |
| Failure (network error or 5xx) | Wait 100 ms, retry |
| Attempt 2 failure | Wait 200 ms, retry |
| Attempt 3 failure | Wait 400 ms, final attempt |
| All 3 exhausted | Raise `DomainException` in the calling service |

**After exhaustion:** the calling service raises `DomainException`, which maps to a domain-appropriate error code. The failure is logged to Cloud Logging with the target domain, endpoint, and last HTTP status.

**4xx responses from the target domain are not retried.** A `404` or `422` from the target means the request was invalid; retrying would produce the same result.

---

#### Database Failure (Cloud SQL)

Cloud SQL HA handles infrastructure-level failover automatically (covered above in Component SLAs). At the application level, transient connection errors (pool exhaustion, brief network interruption during failover) are handled in the repository layer:

| Step | Behavior |
|------|----------|
| Connection attempt 1 | Normal query execution |
| `OperationalError` / pool timeout | Wait 100 ms, retry |
| Attempt 2 failure | Wait 200 ms, retry |
| Attempt 3 failure | Raise exception, do not retry further |
| Exception propagates to controller | FastAPI returns `503 Service Unavailable` with `{ "success": false, "error": "Service temporarily unavailable" }` |

**Cloud Run health check** (`/health/ready`) detects sustained DB unavailability and stops routing traffic to the affected instance, triggering an automatic restart.

---

#### Error Logging

Every error is logged to **Cloud Logging** with the following structured fields:

| Field | Content |
|-------|---------|
| `trace_id` | Unique ID per request, injected by [`structured_logging.py`](backend/shared/logging/structured_logging.py) |
| `user_id` | Auth0 user ID from the validated JWT (null for unauthenticated requests) |
| `domain` | Domain that raised the error (e.g., `contract`, `matching`) |
| `exception_type` | Class name of the exception (e.g., `NotFoundException`) |
| `http_status` | Status code returned to the client |
| `message` | Developer-facing message (never exposed to the client for 500s) |

---

## 2.8 Caching Strategy

PymeBoost implements a robust caching strategy at the backend to guarantee availability, performance, and service continuity even when Auth0 is down. The strategy covers multiple layers: JWT tokens, refresh tokens, Redis sessions, and JWKS (JSON Web Key Set).

### JWT (JSON Web Token) - Quick Access

**Standard TTL (Normal):**
- **1 hour**: JWT lifespan under normal conditions when Auth0 is available.
- Purpose: Maintain secure and short-lived sessions to minimize risk of token compromise.

**TTL with Grace Period (Auth0 Down):**
- **3 hours total** (1 hour standard + 2 hours grace): Maximum time a JWT is valid even if Auth0 is down.
- Purpose: Guarantee users can continue using the application for up to 2 additional hours without losing access if Auth0 fails.
- Validation: During grace period, JWT is validated locally using cached JWKS instead of connecting to Auth0.

### Refresh Token - Session Renewal (30 Days)

**Refresh Token TTL:**
- **30 days**: Maximum time a user can remain without re-authenticating.
- Purpose: Allow users to renew JWT automatically without re-entering credentials.
- Mechanism: When JWT expires, the client uses the Refresh Token to obtain a new JWT without UX interruptions.

**User Behavior:**

1. **User logs in** → JWT (1 hour) + Refresh Token (30 days) issued.

2. **User closes app after 30 minutes** → Returns after 2 hours:
   - JWT expired (1 hour lifespan passed).
   - Refresh Token still valid (30 days).
   - **Result**: Client automatically uses Refresh Token to get a new JWT. **No re-authentication needed**.

3. **User closes app after 3 days** → Returns after 30 days:
   - Refresh Token expired.
   - **Result**: Must re-authenticate.

4. **User stays in app for more than 1 hour (without closing):**
   - JWT approaches expiration.
   - Client automatically refreshes in background to obtain new JWT.
   - **Result**: User never experiences session expiration while actively using the app.

### Redis Session Store - Session Data Storage

**Redis TTL:**
- **3 hours** (equal to maximum JWT TTL with grace): Maximum duration session data is stored in Redis.
- Purpose: Keep session data synchronized with maximum JWT validity, even if Auth0 is down.
- Content stored: User ID, permissions, roles, session metadata.
- Benefit: If Auth0 is down for 2 hours then recovers, Redis still has session data available for fast validation.

**Automatic Cleanup:**
- After 3 hours without activity, data is removed from Redis.
- If user tries to use an expired JWT without valid Refresh Token, server rejects the request and requires re-authentication.

### JWKS (JSON Web Key Set) - Cache Storage

**JWKS Cache TTL:**
- **3 hours** (equal to maximum JWT TTL): Duration Auth0 public certificates are stored locally on the server.
- Purpose: Validate JWT signatures locally without depending on Auth0, enabling service continuity if Auth0 is down.

**Mechanics:**

1. Server periodically downloads Auth0 public certificates (JWKS).
2. Stored in server memory/cache with 3-hour TTL.
3. When JWT arrives, server validates signature using cached JWKS.
4. If cached JWKS expires, server attempts to refresh from Auth0. If Auth0 doesn't respond, JWT is rejected after grace period.

**Why 3 Hours (Justified by Auth0 SLA 99.99%):**

Auth0 guarantees **99.99% uptime**, which translates to:
- **Maximum downtime per year:** ~52.6 minutes (0.01% × 525,600 minutes/year)
- **Average downtime per incident:** Typically 15-30 minutes

PymeBoost uses **3 hours as a conservative grace buffer** because:
1. **Covers rare extended outages:** Though 99.99% is the target, edge cases (regional issues, cascading failures) may exceed typical recovery time
2. **Operational safety margin:** 180 minutes >> 52 minutes/year average, ensuring no user is suddenly locked out
3. **User continuity:** Balances security with UX—worst-case outage still keeps most users operational
4. **Technical requirement:** Server must validate JWTs locally (without Auth0) for the entire session window

**Result:** During the 3-hour grace period, PymeBoost remains fully operational using cached JWKS for signature validation. After 3 hours, if Auth0 is still down (extremely rare), tokens are rejected to maintain security boundaries.

### Error Handling & Recovery

**If JWT expires and Auth0 is available:**
- Client automatically uses Refresh Token to get new JWT.
- Redis session renewed.
- User continues without interruptions.

**If JWT expires and Auth0 is down (within 2 hours):**
- JWT remains valid by grace period (up to 3 hours total).
- Redis session remains valid.
- User can continue operating.

**If JWT expires and Auth0 still down after 2 hours:**
- JWT rejected (exceeded 3-hour grace).
- Refresh Token cannot be used (requires Auth0).
- User must re-authenticate.

**If JWKS cache expires without Auth0 connection:**
- Server cannot validate new JWTs.
- Rejects requests to maintain security.
- Once Auth0 recovers, JWKS updates and continues normally.

### Caching Timeline Summary

| Component | TTL | Purpose |
|---|---|---|
| JWT (normal) | 1 hour | Token validity with Auth0 available |
| JWT (with grace) | 3 hours | Maximum tolerance if Auth0 is down |
| Refresh Token | 30 days | Maximum time without re-authenticating |
| Redis Session | 3 hours | Session data storage |
| JWKS Cache | 3 hours | Local validation without depending on Auth0 |

This strategy guarantees **PymeBoost maintains availability even during Auth0 interruptions, with a balance between security, UX, and service continuity**.

---

### Redis Instance Configuration

| Parameter | Value | Justification |
|-----------|-------|---------------|
| **Service** | Google Cloud Memorystore for Redis | Managed Redis; no ops overhead, native GCP VPC peering with Cloud Run |
| **Tier** | Standard | Provides 1 primary + 1 read replica with automatic failover; required for HA in production |
| **Region** | `us-central1` (Iowa) | Closest major GCP region to Costa Rica (~3,200 km); minimizes round-trip latency between Cloud Run and Redis |
| **Memory** | 1 GB | Sized for up to 500 concurrent sessions (~2 KB each = ~1 MB active data) plus JWKS (~5 KB). 1 GB is the Standard tier minimum and provides ~999× headroom for growth. |
| **Replicas** | 1 primary + 1 replica | Replica handles automatic failover if primary goes down; no manual intervention needed |
| **Failover** | Automatic (Standard tier) | Cloud Memorystore promotes replica to primary in <60 seconds on primary failure |
| **Redis version** | 7.x | Latest stable; supported by Cloud Memorystore Standard |
| **Auth mode** | AUTH string via Secret Manager | Redis AUTH token stored in Google Secret Manager; never hardcoded |

---

### What Lives Where

| Data | Storage | TTL | Why |
|------|---------|-----|-----|
| User session (ID, roles, permissions) | Redis | 3 hours | Shared across all Cloud Run instances; a new instance picks up an existing session without hitting the DB |
| JWKS (Auth0 public certificates) | Redis | 3 hours | One download per TTL window regardless of how many Cloud Run instances are running; consistent across scale-out events |
| JWT token itself | Client memory (authStore) | 1 h / 3 h grace | Never stored server-side; validated on every request using cached JWKS |
| Refresh token | Auth0 (client-side only) | 30 days | Managed by Auth0; backend never stores or reads it |
| In-flight request state | FastAPI process memory | Request lifetime | Short-lived; no reason to persist to Redis |

---

### Key Structure

All Redis keys follow a `{namespace}:{identifier}` convention. Namespaces are lowercase and match the domain that owns the data.

| Key pattern | Example | TTL | Owner |
|-------------|---------|-----|-------|
| `session:{user_id}` | `session:a3f1c2d4-...` | 3 h (sliding) | User domain — `session_cache_service.py` |
| `jwks:{auth0_domain}` | `jwks:pymeboost.us.auth0.com` | 3 h (fixed) | Shared auth — `jwt_validator.py` |

**Rules:**
- Keys always include a namespace prefix; never store bare IDs.
- TTLs are always set at write time with `SETEX` or `SET ... EX`; keys without TTL are forbidden.
- Session TTL is **sliding** (`refresh_session_ttl` resets the clock on every authenticated request). JWKS TTL is **fixed** (expires and is re-fetched from Auth0 regardless of usage).

---

### Eviction Policy

**Policy: `volatile-lru`**

Evicts the least-recently-used key **among keys that have an explicit TTL set**. Keys without TTL are never evicted.

This is safe for PymeBoost because:
- Every key written to Redis has a TTL (enforced by the key rules above).
- If memory pressure ever forces an eviction before TTL expires, the worst outcome is a session miss or JWKS miss — both have defined fallbacks (session miss → DB lookup; JWKS miss → Auth0 fetch).
- Because all writes enforce a TTL (see Key Structure rules), no key without TTL should exist in Redis. If one were written accidentally, `volatile-lru` would never evict it — it would accumulate indefinitely. The mandatory-TTL rule is the actual guard against this; `volatile-lru` is not.

With 1 GB memory and a maximum of ~500 concurrent sessions (~1 MB total), eviction should never trigger in normal operation. The policy exists as a safety net for edge cases.

---

### Connection Management

Cloud Run scales to a maximum of 10 instances. Each FastAPI instance maintains an **async connection pool** to Redis (via `redis-py` with asyncio support).

| Parameter | Value | Calculation |
|-----------|-------|-------------|
| Pool size per Cloud Run instance | 10 connections | Enough for concurrent async handlers; avoids connection churn |
| Max instances | 10 | Defined in Cloud Run auto-scaling config |
| Max total connections to Redis | 100 | 10 instances × 10 connections/instance |
| Cloud Memorystore 1 GB Standard max connections | 65,000 | Per GCP documentation; 100 is 0.15% of the limit |
| Connection timeout | 2 seconds | Fail fast; Cloud Run can retry or scale |
| Socket keepalive | Enabled | Prevents idle connections from being dropped by the VPC firewall |

**Connection lifecycle:**
- Pool is initialized once at FastAPI startup (`lifespan` hook in `main.py`).
- Connections are reused across requests; not opened per-request.
- If Redis is unreachable at startup, the application logs an error and continues (Redis is not a hard boot dependency — sessions fall back to DB lookup).
- Pool is closed cleanly on FastAPI shutdown.

---

## 2.9 Scalability

### Elements That Scale with Request Volume
 
* Cloud Run: Auto-scale 1-10 instances (trigger: CPU > 70% or request concurrency > 80)
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
* Max limit: 10 Cloud Run instances (cost control — one instance handles ~5–20 req/s; 10 instances is sufficient for expected load during year 1)

 ---
## 2.10 Backend Key Workflows

### User Domain

#### Create Account (SME)

Implementation: [backend/domains/user/controllers/create_sme_account_controller.py](backend/domains/user/controllers/create_sme_account_controller.py)

1. The user completes the registration form on the frontend, providing:
   - Name of the company
   - Name of the owner.
   - Business email address.
   - Phone number.
   - Cédula jurídica (Legal Entity ID).
   - Company size (categorical: `Small` | `Medium` | `Large`).
2. The frontend sends the information to Google Cloud API Gateway through a POST request.
3. Google Cloud API Gateway validates that the endpoint exists and applies rate limiting.
4. Google Cloud API Gateway routes the request to Cloud Run.
5. FastAPI validates the format of the received data.
6. Business validations are executed:
   - Cedula Juridica is not already registered.
   - Email is not already registered.
   - Phone number is not already registered.
7. The `Cédula Jurídica Verification` workflow is executed 
   - If verification fails, the registration is rejected.
8. The user is prompted to pay the $25 SME subscription fee. For now, this payment is assumed to have been completed in person — no automated payment process is implemented at this stage.
9. The request data is mapped into the corresponding Domain-Driven Design DTO.
10. The user is created in Auth0 and the JWT access token is retrieved.
11. The SME profile is created in the database.
12. A `SmeAccountCreated` event is generated.
13. The system returns a successful account creation confirmation.

---

#### Create Account (Advisor)

Implementation: [backend/domains/user/controllers/create_advisor_account_controller.py](backend/domains/user/controllers/create_advisor_account_controller.py)

1. The advisor completes the registration form, providing:
   - Personal email address.
   - Phone number.
   - LinkedIn profile URL.
2. The frontend sends the information to Google Cloud API Gateway through a POST request.
3. Google Cloud API Gateway validates that the endpoint exists and applies rate limiting.
4. Google Cloud API Gateway routes the request to Cloud Run.
5. FastAPI validates the format of the received data.
6. Business validations are executed:
   - Email is not already registered.
   - Phone number is not already registered.
7. The `LinkedIn Profile Extraction` workflow is executed.
   - If extraction fails, the registration is rejected.
8. The request data is mapped into the corresponding Domain-Driven Design DTO.
9. The user is created in Auth0 and the JWT access token is retrieved.
10. The Advisor profile is created in the database with the extracted LinkedIn data and submitted use cases.
11. An `AdvisorAccountCreated` event is generated.
12. The system returns a successful account creation confirmation.



---

#### Login

Implementation: [backend/domains/user/controllers/login_controller.py](backend/domains/user/controllers/login_controller.py)

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

Implementation: [backend/domains/user/services/session_cache_service.py](backend/domains/user/services/session_cache_service.py)

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
7. The session TTL (Time To Live) is refreshed whenever user activity is detected. Redis session TTL is always set to 3 hours — matching the maximum JWT validity (1 hour standard + 2 hour grace period) — so session data remains available even if Auth0 goes down within the standard window.

---

#### Change Information About an SME

Implementation: [backend/domains/user/controllers/update_sme_profile_controller.py](backend/domains/user/controllers/update_sme_profile_controller.py)

1. The SME requests an update to its business information.
2. The frontend sends an authenticated PUT request.
3. Google Cloud API Gateway validates the endpoint and applies rate limiting.
4. Google Cloud API Gateway routes the request to Cloud Run.
5. FastAPI validates the JWT using Auth0 JWKS.
6. The system verifies that the user owns the SME profile.
7. The SME entity is retrieved from the database.
8. Allowed fields are updated:
   - Description.
   - Contact information.
   - Company size (categorical: `Small` | `Medium` | `Large`).
9. Changes are persisted.
10. A `SmeInformationUpdated` event is generated.
11. The updated information is returned.

---

#### Change Information About an Advisor

Implementation: [backend/domains/user/controllers/update_advisor_profile_controller.py](backend/domains/user/controllers/update_advisor_profile_controller.py)

1. The advisor requests an update to their professional information.
2. The frontend sends an authenticated PUT request.
3. Google Cloud API Gateway validates the endpoint and applies rate limiting.
4. Google Cloud API Gateway routes the request to Cloud Run.
5. FastAPI validates the JWT using Auth0 JWKS.
6. The system verifies profile ownership.
7. The Advisor entity is retrieved.
8. Allowed fields are updated:
   - Display name.
   - Description.
   - Contact information.
   - If the advisor needs to change the industry it needs to use the `Change Industry for an Advisor` workflow 
9. Changes are persisted.
10. An `AdvisorInformationUpdated` event is generated.
11. The updated profile is returned.

---

#### Change Industry for an Advisor

Implementation: [backend/domains/user/controllers/update_advisor_industry_controller.py](backend/domains/user/controllers/update_advisor_industry_controller.py)

1. The advisor selects new specialization industries.
2. The frontend sends an authenticated PUT request.
3. Google Cloud API Gateway validates the endpoint and applies rate limiting.
4. Google Cloud API Gateway routes the request to Cloud Run.
5. FastAPI validates the JWT using Auth0 JWKS.
6. The Advisor profile is retrieved.
7. The selected industries are validated against the system catalog.
8. The advisor's associated industries are updated.
9. An `AdvisorIndustryUpdated` event is generated.
10. The system returns a successful update confirmation.

---

#### Cédula Jurídica Verification

Implementation: [backend/domains/user/services/cedula_juridica_verification_service.py](backend/domains/user/services/cedula_juridica_verification_service.py)

1. The system receives a cédula jurídica submitted during SME registration.
2. The system sends an HTTP GET request to the Hacienda API:
   `GET https://api.hacienda.go.cr/fe/ae?identificacion={cedula_juridica}`
   No authentication is required.
3. The following information is extracted from the response and stored:
   - Company name (`nombre`).
4. If the cédula is not found, verification fails and the registration is rejected.
5. If verification succeeds, the retrieved company data is returned to the registration flow.

---

#### LinkedIn Profile Extraction

Implementation: [backend/domains/user/services/linkedin_profile_extraction_service.py](backend/domains/user/services/linkedin_profile_extraction_service.py)

ProxyCurl is a third-party REST API (by Nubela) that receives a LinkedIn profile URL and returns structured JSON data extracted from the public profile. It handles the scraping and parsing of LinkedIn on PymeBoost's behalf, operating on a credit-based model (one credit consumed per profile request). No browser automation or direct LinkedIn scraping is performed by PymeBoost.

1. The system receives a LinkedIn profile URL submitted during Advisor registration.
2. The system sends an HTTP GET request to the ProxyCurl API:
   `GET https://nubela.co/proxycurl/api/v2/linkedin?url={linkedin_profile_url}`
   Authentication via `Authorization: Bearer {PROXYCURL_API_KEY}` header (key stored in Google Secret Manager).
3. The following information is extracted from the response and stored:
   - Full name (`full_name`).
   - Work experience (`experiences`) — roles, companies, durations.
   - Industries derived from experience and profile (`industry`).
   - Certifications (`certifications`).
4. If the LinkedIn URL is invalid, the profile is private, or ProxyCurl returns an error, extraction fails and the registration is rejected.
5. If extraction succeeds, the retrieved profile data is returned to the registration flow.

---

#### Advisor Uploads Use Cases

Implementation: [backend/domains/user/controllers/upload_use_cases_controller.py](backend/domains/user/controllers/upload_use_cases_controller.py)

An advisor uploads one or more PDF use case files. No additional form fields are required — all information is extracted from the PDF content. Each PDF must follow the defined structure below. The system stores the files, extracts and classifies the content via OCR and embeddings, and associates the processed use cases with the advisor's profile.

**Expected PDF Structure:**

Each uploaded PDF must contain the following information:

| Section | Description |
|---|---|
| 1. Company Information | Name, industry (categorical — from predefined catalog), company size (categorical: `Small` | `Medium` | `Large`) |
| 2. Company Context | Business model, market position, main challenges at the time |
| 3. Initial Situation | Specific problem or opportunity that triggered the engagement |
| 4. Actions Performed | Steps, methodologies, and interventions executed by the advisor |
| 5. Metric Used | Name of the primary metric tracked during this engagement, the value before the intervention, and the value after |
| 6. Metrics Before | Quantitative baseline — revenue, costs, conversion rates, or other KPIs |
| 7. Metrics After | Quantitative results after the engagement — same KPIs as Metrics Before |

**Workflow:**

1. The advisor uploads one or more PDF files through the frontend.
2. The frontend sends an authenticated POST request (multipart/form-data) to Google Cloud API Gateway.
3. Google Cloud API Gateway validates the endpoint and applies rate limiting.
4. Google Cloud API Gateway routes the request to Cloud Run.
5. FastAPI validates the JWT using Auth0 JWKS and verifies the file type (PDF only) and file size limit.
6. Each PDF is stored in Google Cloud Storage under the advisor's namespace. The file reference is recorded in the database with status `PENDING`.
7. A `UseCaseUploaded` event is published to Google Cloud Pub/Sub for each uploaded file.
8. The system returns an immediate confirmation that the files were received. Processing continues asynchronously.
9. For each file, the `Use Case PDF Processing` workflow is triggered by the Pub/Sub subscriber.

---

### AI Domain Workflows

#### Use Case PDF Processing

Implementation: [backend/domains/ai/services/use_case_pdf_processing_service.py](backend/domains/ai/services/use_case_pdf_processing_service.py)

Triggered by the `UseCaseUploaded` Pub/Sub event.

1. The service retrieves the PDF from Google Cloud Storage.
2. The PDF is sent to **Google Cloud Document AI** (OCR processor):
   - Extracts raw text, layout structure, and section boundaries.
   - Returns a structured JSON with text blocks and their positions.
3. The extracted text is divided into blocks based on the detected section boundaries from the layout structure.
4. For each block, a content hash is computed and compared against already-processed blocks for this advisor. If the hash already exists, the stored embedding is reused and the block is not reprocessed.
5. For new blocks, embeddings are generated and sent to the **thematic classification** step.
6. Each block is classified into one of the following thematic categories:
   - `company_information`
   - `company_context`
   - `initial_situation`
   - `actions_performed`
   - `metric_used`
   - `metrics_before`
   - `metrics_after`
7. The `metric_used` block is parsed to extract: metric name, value before, and value after. These are stored directly on the `PB_UseCases` record (`metricUsed`, `metricBefore`, `metricAfter`).
8. Each classified block is stored with: thematic category, embedding, content hash, and source use case reference.
9. The blocks are indexed in **pgvector** (Cloud SQL PostgreSQL extension) grouped by thematic category and advisor industry, creating an inverted index used by Advisor Similar Project Retrieval.
10. Each block's embedding is compared via cosine similarity against all sub-industry representative embeddings in `PB_SubIndustries`. The resulting scores are aggregated into the advisor's sub-industry score vector in `PB_AdvisorSubIndustryScores` (upsert, normalized across all sub-industries for that advisor).
11. If any required thematic category has no blocks assigned after classification, the use case is marked as `FAILED` and an `AdvisorUseCaseProcessed` event is published to Pub/Sub with `status: FAILED`.
12. The use case status is updated to `PROCESSED` and an `AdvisorUseCaseProcessed` event is published to Pub/Sub with `status: PROCESSED`.

---

#### Baseline PDF Processing

Implementation: [backend/domains/ai/services/baseline_pdf_processing_service.py](backend/domains/ai/services/baseline_pdf_processing_service.py)

Triggered by the `BaselinePdfUploaded` Pub/Sub event, published when a PYME submits the baseline document at project start.

1. The service retrieves the PDF from Google Cloud Storage.
2. The PDF is sent to **Google Cloud Document AI** (OCR processor):
   - Extracts raw text, layout structure, and section boundaries.
   - Returns a structured JSON with text blocks and their positions.
3. The extracted text is divided into blocks based on the detected section boundaries.
4. Each block is classified into one of the following thematic categories:
   - `company_information`
   - `company_context`
   - `initial_situation`
   - `baseline_metrics`
5. The `baseline_metrics` blocks are parsed to extract key/value metric pairs.
6. For each extracted metrics, the system looks up the matching `PB_ContractMetrics` record by name for this contract version and sets `baselineValue`.
7. If any metric defined in the contract has no match in the extracted data, the document is marked as `FAILED` and a `BaselinePdfProcessed` event is published with `status: FAILED`.
8. The document is marked as `PROCESSED` and a `BaselinePdfProcessed` event is published with `status: PROCESSED`.

---

#### Advisor Recommendation Algorithm

Implementation: [backend/domains/ai/services/recommendation_service.py](backend/domains/ai/services/recommendation_service.py)

Describes how recommendations are computed for a single SME. Called by both the Batch Job and the On-Demand workflow — the logic is the same regardless of what triggered it.

1. The SME's profile is loaded: industry (categorical), company size (categorical), and needs vector (sub-industry distribution from the Business Needs Assessment).
2. Industry and company size are used as categorical pre-filters, narrowing the candidate advisor pool before scoring.
3. Each advisor's pre-computed sub-industry score vector (`PB_AdvisorSubIndustryScores`) is retrieved. This vector is maintained incrementally as advisors upload use cases — no pgvector search is needed at recommendation time.
4. Each advisor is ranked using a composite score:
   - Sub-industry alignment: dot product between the SME's needs vector and the advisor's sub-industry score vector.
   - Reputation score (retrieved from Advisor Domain via synchronous query).
5. The top N advisors are selected with their full profiles: name, industries, certifications, base rate, and reputation score.
6. The ranked list is persisted in the database associated with the PYME's profile.
7. The Redis cache entry for this PYME is updated with the new results and a TTL of 24 hours.

---

#### Advisor Recommendation Batch Job

Implementation: [backend/domains/ai/services/recommendation_batch_service.py](backend/domains/ai/services/recommendation_batch_service.py)

Runs on a schedule for **all active SMEs**. Its only responsibility is to iterate over SMEs and trigger the `Advisor Recommendation Algorithm` for each one.

1. Google Cloud Scheduler fires the job on a defined interval every 24 hours.
2. The batch job retrieves all active SME IDs from the database.
3. For each SME, it executes the `Advisor Recommendation Algorithm`.

---

#### Advisor Recommendation On-Demand

Implementation: [backend/domains/ai/services/recommendation_on_demand_service.py](backend/domains/ai/services/recommendation_on_demand_service.py)

Triggered by the `RecommendationRequested`, `AdvisorIndustryUpdated` or `SmeNeedsAssessmentUpdated` Pub/Sub event. Handles individual SMEs that need immediate computation (new registration, cache miss with no DB results).

1. The Pub/Sub event payload is received containing the `pyme_id` of the SME that needs recommendations.
2. The SME's full profile is retrieved from the database using the `pyme_id`: industry (categorical), company size (categorical), and needs vector.
3. The following data is passed to the `Advisor Recommendation Algorithm`:
   - `pyme_id` — to associate the results with the correct SME.
   - `industry` — categorical value used as a pre-filter.
   - `company_size` — categorical value used as a pre-filter.
   - `needs_vector` — normalized ratings vector from the Business Needs Assessment. If the SME has not yet completed the assessment, an empty vector is passed and the needs vector alignment signal is skipped in the scoring step.
4. The Algorithm computes and persists the results. The On-Demand workflow has no further responsibility after handing off.

---

#### Advisor Similar Project Retrieval

Implementation: [backend/domains/ai/services/similar_project_retrieval_service.py](backend/domains/ai/services/similar_project_retrieval_service.py)

Triggered synchronously via HTTP when an SME browses an advisor's profile or after a match is created. Returns the advisor's past projects that are most similar to the SME's context, ordered by relevance. Used to show the SME concrete evidence of the advisor's experience in situations like theirs.

1. The SME sends a GET request providing the `advisor_id` to retrieve similar projects for.
2. Google Cloud API Gateway validates the endpoint and applies rate limiting.
3. Google Cloud API Gateway routes the request to Cloud Run.
4. FastAPI validates the JWT using Auth0 JWKS and extracts the `pyme_id`.
5. The SME's profile is retrieved: industry (categorical), company size (categorical), and sub-industry needs vector from the Business Needs Assessment. If the SME has not yet completed the assessment, the search falls back to industry and company size filters only.
6. A pgvector similarity search is executed against the advisor's indexed use case blocks, filtering by thematic categories `company_information` and `initial_situation`. The query vector is derived from the SME's top sub-industries by needs score.
7. Results are grouped by `use_case_id`. For each use case, an aggregate similarity score is computed as a **weighted average of the cosine similarity scores** of its matched blocks. `initial_situation` blocks carry higher weight than `company_information` blocks because the initial situation reflects the actual business problem.
8. The use cases are ranked by score. and for the best use case similarity, the full block set is assembled: `company_context`, `initial_situation`, `actions_performed`, `metrics_before`, and `metrics_after`.
9. The summarie is returned, containing: use case title, company context, initial situation description, key actions taken, and the before/after outcome metrics.

---

#### Promise Industry Classification

Implementation: [backend/domains/ai/services/promise_classification_service.py](backend/domains/ai/services/promise_classification_service.py)

Triggered by the `PromiseTextUpdated` Pub/Sub event, published whenever an advisor adds or edits a promise. Classifies the free-form promise text against the predefined industry catalog using embeddings and cosine similarity.

1. The AI Domain receives the `PromiseTextUpdated` event containing the `promise_id` and `promise_text`.
2. An embedding is generated for the `promise_text`.
3. The industry catalog is retrieved from the database. Each industry entry has a pre-computed representative embedding stored alongside it.
4. The cosine similarity between the promise embedding and each industry embedding is computed.
5. All similarity scores are stored in `PB_PromiseIndustryScores` as `industry_id → score` pairs, replacing any previous scores for this promise.

---

### Notifications Domain Workflows

#### Project Status Notifications
#### Messages Notifications
#### Advisor Selection Notifications

#### Use Case Processing Notification

Triggered by the `AdvisorUseCaseProcessed` Pub/Sub event.

1. The Notification Domain receives the event containing the use case ID, advisor ID, and processing status (`PROCESSED` or `FAILED`).
2. An in-app notification is sent to the advisor indicating whether each file was processed successfully or failed.

#### Recommendations Ready Notification

Triggered by the `RecommendationReady` Pub/Sub event, published by the `Advisor Recommendation On-Demand` workflow upon completion.

1. The Notification Domain receives the event containing the `pyme_id`.
2. An in-app notification is sent to the SME indicating that their advisor recommendations are ready to view.


### Pyme Domain Workflows

#### SME Business Needs Assessment

Implementation: [backend/domains/pyme/controllers/submit_needs_assessment_controller.py](backend/domains/pyme/controllers/submit_needs_assessment_controller.py)

The SME can retake the assessment at any time; the previous distribution is overwritten.

**Fetch Questions:**

1. The frontend sends a GET request to retrieve the active question catalog.
2. Google Cloud API Gateway validates the endpoint and applies rate limiting.
3. Google Cloud API Gateway routes the request to Cloud Run.
4. FastAPI validates the JWT using Auth0 JWKS.
5. The system retrieves all active questions from the `question_catalog` table (ID, text, and associated sub-industries).
6. The question list is returned to the frontend.

**Submit Answers:**

1. The SME rates each question from 1 to 5 and submits the form.
2. The frontend sends a POST request with the answers (`question_id`: `rating` pairs).
3. Google Cloud API Gateway validates the endpoint and applies rate limiting.
4. Google Cloud API Gateway routes the request to Cloud Run.
5. FastAPI validates the JWT using Auth0 JWKS and extracts the PYME ID.
6. The system validates that all active questions are answered and all ratings are within 1–5.
7. For each answer, the rating is distributed equally across the question's sub-industries. Each sub-industry accumulates the sum of ratings across all questions that reference it.
8. The accumulated score per sub-industry is normalized: `sub_industry_score / sum_of_all_scores`. The result is a fixed-dimension vector where all values sum to 1.0, with each dimension representing one sub-industry.
9. If the SME already has a needs distribution, it is overwritten with the new one, preserving the previous version for audit.
10. The distribution vector is stored in pgvector associated with the PYME profile.
11. The Advisor Recommendation cache for this SME is invalidated in Redis, forcing recalculation on the next request or when the event triggers it, whichever happens first.
12. A `SmeNeedsAssessmentUpdated` event is published to Pub/Sub.

---

#### Advisor Recommendation

Implementation: [backend/domains/pyme/controllers/get_advisor_recommendations_controller.py](backend/domains/pyme/controllers/get_advisor_recommendations_controller.py)

Serves pre-computed recommendations at request time. No computation happens here — all scoring and ranking is handled by the AI Domain.

1. The PYME sends a GET request to the recommendations endpoint.
2. Google Cloud API Gateway validates the endpoint and applies rate limiting.
3. Google Cloud API Gateway routes the request to Cloud Run.
4. FastAPI validates the JWT using Auth0 JWKS and extracts the PYME's ID from the token claims.
5. The service checks Redis for a cached recommendation list for this PYME.
6. If the cache exists: the cached list is returned directly.
7. If the cache does not exist:
   - The pre-computed recommendation list is retrieved from the database.
   - If the database also has no results: an empty list is returned with a `pending` status flag. A `RecommendationRequested` event is published to Pub/Sub triggering the `Advisor Recommendation On-Demand` workflow in the AI Domain. The SME is notified via in-app notification once the On-Demand workflow completes (see Notifications Domain › Recommendations Ready Notification).
   - If the database has results: they are written to Redis with a TTL of 24 hours and returned to the frontend.

---

### Advisor Domain Workflows

#### Advisor Success Metric Promises (Add a promise)

Implementation: [backend/domains/advisor/controllers/success_metric_promises_controller.py](backend/domains/advisor/controllers/success_metric_promises_controller.py)

1. The advisor sends a POST request with the promise text.
2. Google Cloud API Gateway validates the endpoint and applies rate limiting.
3. Google Cloud API Gateway routes the request to Cloud Run.
4. FastAPI validates the JWT using Auth0 JWKS and extracts the `advisor_id`.
5. The system checks that the advisor does not already have 3 active promises. If they do, the request is rejected.
6. The promise text is stored as a new record associated with the `advisor_id`, with a generated `promise_id`. Industry scores are populated asynchronously once classification completes.
7. A `PromiseTextUpdated` event is published to Pub/Sub with the `promise_id` and `promise_text`, triggering the `Promise Industry Classification` workflow in the AI Domain.

**Display on profile card:**

When an SME views an advisor's profile, the active promises are retrieved from the database ordered by their score for the SME's industry (`PB_PromiseIndustryScores ORDER BY score DESC`); the rest follow in creation order.

#### Advisor Success Metric Promises (Edit a promise)

Implementation: [backend/domains/advisor/controllers/success_metric_promises_controller.py](backend/domains/advisor/controllers/success_metric_promises_controller.py)

1. The advisor sends a PATCH request with the `promise_id` and the updated text.
2. Google Cloud API Gateway validates the endpoint and applies rate limiting.
3. Google Cloud API Gateway routes the request to Cloud Run.
4. FastAPI validates the JWT and confirms the `promise_id` belongs to the requesting advisor.
5. Only the text of that specific promise is updated. All other promises remain unchanged.
6. The industry scores for this promise are cleared and a `PromiseTextUpdated` event is published to Pub/Sub, triggering reclassification in the AI Domain.

#### Advisor Success Metric Promises (Delete a promise)

Implementation: [backend/domains/advisor/controllers/success_metric_promises_controller.py](backend/domains/advisor/controllers/success_metric_promises_controller.py)


1. The advisor sends a DELETE request with the `promise_id`.
2. Google Cloud API Gateway validates the endpoint and applies rate limiting.
3. Google Cloud API Gateway routes the request to Cloud Run.
4. FastAPI validates the JWT and confirms ownership.
5. The promise is removed. The advisor's remaining promises are unaffected.


#### Advisor Reputation Calculation

Implementation: [backend/domains/advisor/services/reputation_service.py](backend/domains/advisor/services/reputation_service.py)

Triggered by the `ReviewSubmitted` Pub/Sub event published by the Review Domain each time an SME leaves a review for an advisor. Recomputes the advisor's reputation score as a plain average of all their star ratings and updates the stored value on their profile.

The advisor profile stores two fields to make this O(1): `reputation_score` (the running average, never rounded) and `rating_count` (total number of ratings received so far).

1. The Advisor Domain receives the `ReviewSubmitted` event containing the `advisor_id` and the `new_rating` value.
2. The current `reputation_score` and `rating_count` are retrieved from the advisor's profile record.
3. The new reputation score is computed incrementally — no query against the reviews table: `(reputation_score * rating_count + new_rating) / (rating_count + 1)`.
4. `rating_count` is incremented by 1.
5. Both the updated `reputation_score` (stored unrounded) and `rating_count` are written back to the advisor's profile record.
6. If the advisor's profile is cached in Redis, the cache entry is invalidated so the next read reflects the updated score.
7. An `AdvisorReputationUpdated` event is published with `advisor_id` and `new_score`.

#### Pyme Reputation Calculation

Implementation: [backend/domains/pyme/services/pyme_service.py](backend/domains/pyme/services/pyme_service.py)

Triggered by the `ReviewSubmitted` event published by the Review Domain each time an advisor leaves a review for a PYME. Recomputes the PYME's reputation score as a plain average of all their star ratings and updates the stored value on their profile.

The PYME profile stores two fields to make this O(1): `reputation_score` (the running average, never rounded) and `rating_count` (total number of ratings received so far).

1. The Pyme Domain receives the `ReviewSubmitted` event containing the `pyme_id` (as `subject_id`) and the `rating` value.
2. The current `reputation_score` and `rating_count` are retrieved from the PYME's profile record.
3. The new reputation score is computed incrementally — no query against the reviews table: `(reputation_score * rating_count + rating) / (rating_count + 1)`.
4. `rating_count` is incremented by 1.
5. Both the updated `reputation_score` (stored unrounded) and `rating_count` are written back to the PYME's profile record.
6. If the PYME's profile is cached in Redis, the cache entry is invalidated so the next read reflects the updated score.
7. A `PymeReputationUpdated` event is published with `pyme_id` and `new_score`.

### Matching Domain Workflows

#### Get Advisor Candidates

Implementation: [backend/domains/matching/controllers/get_advisor_matches_controller.py](backend/domains/matching/controllers/get_advisor_matches_controller.py)

Returns the PYME's current list of advisor candidates enriched with profile data, the most similar past project, and the most relevant promise. This is the data that populates each swipe card in the matching interface.

1. The PYME sends a GET request to `/api/pymes/{pyme_id}/matches`.
2. Google Cloud API Gateway validates that the endpoint exists and applies rate limiting.
3. Google Cloud API Gateway routes the request to Cloud Run.
4. FastAPI validates the JWT using Auth0 JWKS and extracts the `pyme_id` from the token claims.
5. The PYME's industry is retrieved from their profile.
6. The pre-computed recommendation list for this PYME is fetched following the `Advisor Recommendation` workflow (checks Redis first, then database, triggers on-demand computation if empty).
7. Advisors who were previously rejected (swipe `approved = false`) or whose match with this PYME was cancelled (match status `CANCELLED`) are filtered out.
8. For each remaining advisor candidate, the following data is assembled:

   **a. Profile data** — retrieved from the Advisor Domain: full name, industries, and reputation score (rating).

   **b. Top 1 similar project** — the `Advisor Similar Project Retrieval` workflow is called for this advisor passing the PYME's industry and needs vector. Only the single highest-scoring use case is returned: company context, initial situation, key actions, and before/after metrics.

   **c. Most relevant promise** — the advisor's active promises are read from the database sorted by their score for the PYME's industry in `PB_PromiseIndustryScores`. The first entry in that sorted list is selected.

9. The enriched candidate list is returned. Each card entry contains: `advisor_id`, `name`, `industries`, `rating`, `top_project` (summary), and `top_promise` (text).

---

#### PYME Swipe Decision

Implementation: [backend/domains/matching/controllers/create_swipe_decision_controller.py](backend/domains/matching/controllers/create_swipe_decision_controller.py)

The PYME decides on advisor candidates surfaced by the `Get Advisor Candidates` workflow. A right swipe always creates a match immediately — the advisor is notified and can cancel the match at any time using the `Cancel Match` workflow. The `advisor_id` values surfaced by `Get Advisor Candidates` are the only valid targets for a swipe decision.

1. The PYME sends a POST request to `/api/matching/swipe` with: `pyme_id`, `advisor_id`, and `approved` (`true` for right swipe, `false` for left swipe).
2. Google Cloud API Gateway validates that the endpoint exists and applies rate limiting.
3. Google Cloud API Gateway routes the request to Cloud Run.
4. FastAPI validates the JWT using Auth0 JWKS and extracts the `pyme_id` from the token claims.
5. The system verifies that the advisor being swiped appears in the candidate list produced by `Get Advisor Candidates` for this PYME. If not, the request is rejected.
6. The system checks that no swipe decision already exists for this PYME–advisor pair. If one exists, the request is rejected with `409 Conflict`.
7. A swipe record is persisted with `pyme_id`, `advisor_id`, and the `approved` flag.
8. If `approved` is `false` (left swipe): the swipe is recorded and no further action is taken. The advisor is excluded from future `Get Advisor Candidates` results for this PYME.
9. If `approved` is `true` (right swipe): a `MatchSwiped` event is published to the event bus with `pyme_id` and `advisor_id`, which triggers the `Create Match` workflow automatically. The match is created without requiring advisor approval — the advisor is notified and may cancel via `Cancel Match` if they choose not to proceed.

---

#### Create Match

Implementation: [backend/domains/matching/controllers/create_match_controller.py](backend/domains/matching/controllers/create_match_controller.py)


1. The system receives the match creation request with `pyme_id` and `advisor_id`.
2. Google Cloud API Gateway validates that the endpoint exists and applies rate limiting.
3. Google Cloud API Gateway routes the request to Cloud Run.
4. FastAPI validates the JWT using Auth0 JWKS.
5. The system verifies that no active match already exists between this PYME–advisor pair. If one does, the request is rejected with `409 Conflict`.
6. The system verifies that both the PYME and the advisor exist and are in active status.
7. A match record is created with status `ACTIVE` and the associated `pyme_id` and `advisor_id`.
8. A `MatchCreated` event is published to the event bus with `match_id`, `pyme_id`, and `advisor_id`.
9. The Communication Domain receives the `MatchCreated` event and opens a shared chat session between the PYME and the advisor.
10. The Notification Domain receives the `MatchCreated` event and notifies both parties that a new match was established.

---

#### Cancel Match

Implementation: [backend/domains/matching/controllers/cancel_match_controller.py](backend/domains/matching/controllers/cancel_match_controller.py)


1. The PYME or advisor sends a DELETE request to `/api/matching/matches/{match_id}`.
2. Google Cloud API Gateway validates that the endpoint exists and applies rate limiting.
3. Google Cloud API Gateway routes the request to Cloud Run.
4. FastAPI validates the JWT using Auth0 JWKS and extracts the `user_id`.
5. The match record is retrieved from the database. If not found, a `NotFoundException` is raised.
6. The system verifies that the requesting user is a participant in the match (either the `pyme_id` or the `advisor_id`). If not, `403 Forbidden` is returned.
7. The system verifies that the match status is `ACTIVE` and that no finalized contract exists for this match. A match linked to a finalized contract cannot be cancelled.
8. The match status is updated to `CANCELLED`.
9. A `MatchCancelled` event is published to the event bus.
10. The Notification Domain notifies the other party that the match was cancelled.
11. A confirmation response is returned to the requesting user.

### Communication Domain Workflows

#### Chat Access Validation

Implementation: [backend/domains/communication/controllers/validate_chat_access_controller.py](backend/domains/communication/controllers/validate_chat_access_controller.py)

Validates that a requesting user is allowed to access the chat session for a given match, and creates the session if it does not yet exist.

1. The user sends a GET request to `/api/chat/{match_id}/access`.
2. Google Cloud API Gateway validates that the endpoint exists and applies rate limiting.
3. Google Cloud API Gateway routes the request to Cloud Run.
4. FastAPI validates the JWT using Auth0 JWKS and extracts the `user_id` from the token claims.
5. The match record is retrieved using the `match_id`. If not found, a `NotFoundException` is raised.
6. The system verifies that the requesting user is either the `pyme_id` or the `advisor_id` of that match. If not, `403 Forbidden` is returned.
7. The system verifies that the match status is `ACTIVE` or `FINALIZED`. Cancelled matches cannot be accessed.
8. The chat session for this match is retrieved from the database. If no session exists yet, one is created and persisted with the `match_id`.
9. The chat session details (`session_id`, `match_id`) are returned to the frontend, along with the requesting user's role (`pyme` or `advisor`) and the current match status so the frontend can determine which UI actions to surface.

---

#### Chat Between Advisor and Pyme

Implementation: [backend/domains/communication/controllers/send_message_controller.py](backend/domains/communication/controllers/send_message_controller.py)

The primary collaboration space between the PYME and the advisor after a match is established. Beyond messaging, the chat UI surfaces the action that initiates contract negotiation.

1. The user sends a POST request to `/api/chat/{match_id}/messages` with: `sender_id` and `content`.
2. Google Cloud API Gateway validates that the endpoint exists and applies rate limiting.
3. Google Cloud API Gateway routes the request to Cloud Run.
4. FastAPI validates the JWT using Auth0 JWKS and extracts the `user_id`.
5. The system validates chat access — verifies that the user is a participant of the match and that the match status permits messaging (`ACTIVE` or `FINALIZED`).
6. The chat session for the match is retrieved.
7. The `Blocked Content Validation` workflow is executed against the message content. If blocked content is detected, the request is rejected.
8. The message record is persisted with `session_id`, `sender_id`, `content`, and `sent_at`.
9. A `MessageSent` event is published to the event bus with `message_id`, `session_id`, and `sender_id`.
10. The Notification Domain receives the `MessageSent` event and notifies the other participant of the incoming message.

---

#### Blocked Content Validation

Implementation: [backend/domains/communication/services/blocked_content_service.py](backend/domains/communication/services/blocked_content_service.py)

Called internally by the `Chat Between Advisor and Pyme` workflow before any message is persisted. Its sole responsibility is to detect contact information embedded in message text that would allow either party to move the relationship off-platform.

1. The service receives the raw message `content` string.
2. The content is scanned for email address patterns using a regex that matches the standard `local@domain.tld` format.
3. The content is scanned for phone number patterns, including local Costa Rican formats (8-digit numbers starting with 2, 6, 7, or 8) and international formats with country code prefix (`+`, `00`).
4. The content is scanned for social media profile links and handles: domains or path patterns belonging to Instagram, LinkedIn, WhatsApp, Telegram, Facebook, X (Twitter), and TikTok.
5. If any pattern matches, the service returns a rejection result with the category of blocked content found (`email`, `phone`, or `social_media`).
6. If no pattern matches, the service returns a pass result and the calling workflow proceeds to persist the message.


### Contract Domain Workflows

#### Propose Contract

Implementation: [backend/domains/contract/controllers/propose_contract_controller.py](backend/domains/contract/controllers/propose_contract_controller.py)

The PYME initiates contract negotiation from the chat interface by clicking "Propose Contract". The proposal contains all the terms of the engagement.

**Contract fields:**

| Field | Description |
|---|---|
| `implementation_budget` | One-time implementation cost (float) |
| `monthly_retainer` | Fixed monthly advisor fee (float) |
| `duration_tier` | `standard` (1 mo, 3%), `medium` (3 mo, 5%), `high` (6 mo, 7%), `custom` (1–12 mo, commission auto-calculated); `annual` is a convenience alias for `custom` with `duration_months = 12`, yielding 10% commission |
| `duration_months` | Required only for `custom` tier (including when sent as `annual`); must be an integer between 1 and 12 |
| `main_objective` | Free-text description of the engagement's primary goal |
| `advisor_result_profit` | Advisor's bonus tied to results (float or percentage) |
| `expected_metrics` | List of N metrics; each has a `name` (e.g., `"Conversión de Campañas"`), a `value_type` (`number` or `percentage`), and a `target` (e.g., `+25`) |
| `roadmap` | Ordered list of project phases; each has a `name`, `description`, and `goal` referencing one of the expected metrics (e.g., `"Conversión de Campañas \| +5%"`) |

**Workflow:**

1. The PYME sends a POST request to `/api/contracts` with the full proposal payload including all fields above.
2. Google Cloud API Gateway validates that the endpoint exists and applies rate limiting.
3. Google Cloud API Gateway routes the request to Cloud Run.
4. FastAPI validates the JWT using Auth0 JWKS and extracts the `pyme_id`.
5. The match record is retrieved using the `match_id` in the payload. The system verifies the requesting user is the PYME of that match and that the match status is `ACTIVE`.
6. The system verifies that no contract in `PENDING_PROPOSAL` status already exists for this match. Only one active negotiation is allowed at a time.
7. The `duration_tier` is validated:
   - `standard`, `medium`, or `high`: commission is set automatically from the tier.
   - `custom` (or its alias `annual`): `duration_months` must be between 1 and 12. If the tier is `annual`, `duration_months` defaults to 12 server-side. The commission is computed automatically using linear interpolation: `commission = 3 + (duration_months - 1) × (7 / 11)`, which yields exactly 3% at 1 month and exactly 10% at 12 months. The result is rounded to two decimal places and stored on the contract record — it is never supplied by the client.
8. `expected_metrics` must contain at least one entry. Each metric must have a non-empty `name`, a valid `value_type`, and a numeric `target`.
9. `roadmap` must contain at least one phase. Each phase's `goal` must reference the `name` of one of the declared `expected_metrics`.
10. A contract record is created with status `PENDING_PROPOSAL`, linked to the `match_id`.
11. All `expected_metrics` are stored as child records linked to the contract.
12. All `roadmap` phases are stored in order, each linked to the contract and to their referenced metric.
13. A `ContractProposed` event is published to the event bus with `contract_id` and `match_id`.
14. The Communication Domain receives the event and delivers a system message in the match's chat indicating that a new proposal is awaiting review.
15. The Notification Domain notifies the advisor that a contract proposal has been sent.
16. The contract details are returned to the PYME.

---

#### Counter Offer

Implementation: [backend/domains/contract/controllers/counter_offer_controller.py](backend/domains/contract/controllers/counter_offer_controller.py)

1. The non-proposing party sends a POST request to `/api/contracts/{contract_id}/counter-offer` with the **complete** new contract payload.
2. Google Cloud API Gateway validates that the endpoint exists and applies rate limiting.
3. Google Cloud API Gateway routes the request to Cloud Run.
4. FastAPI validates the JWT using Auth0 JWKS and extracts the `user_id`.
5. The existing contract is retrieved using `contract_id`. If not found, a `NotFoundException` is raised.
6. The system verifies the requesting user is a participant in the match linked to this contract. If not, `403 Forbidden` is returned.
7. The system verifies the contract status is `PENDING_PROPOSAL`. Accepted contracts cannot be countered.
8. The system verifies the requesting user is **not** the party who last proposed this contract (`proposed_by` field in the negotiation record). A party cannot counter their own proposal.
9. The previous contract status is updated to `REJECTED`.
10. A new contract record is created from the submitted payload with status `PENDING_PROPOSAL`, linked to the same `match_id`. The same validation rules from `Propose Contract` apply: tier validation, commission calculation, metric completeness, and roadmap phase references.
11. All `expected_metrics` and `roadmap` phases from the new payload are stored linked to the new contract.
12. A `ContractProposed` event is published with the new `contract_id` and `match_id`.
13. The Communication Domain delivers a system message in the match's chat indicating a counter-offer has been submitted.
14. The Notification Domain notifies the other party of the counter-offer.
15. The new contract details are returned.

---

#### Accept Contract (Marry the prospect)

Implementation: [backend/domains/contract/controllers/accept_contract_controller.py](backend/domains/contract/controllers/accept_contract_controller.py)

The non-proposing party formally accepts the current proposal. This is the "Marry the prospect" action — it seals the engagement, finalizes the match, and triggers project creation.

1. The non-proposing party sends a POST request to `/api/contracts/{contract_id}/accept`.
2. Google Cloud API Gateway validates that the endpoint exists and applies rate limiting.
3. Google Cloud API Gateway routes the request to Cloud Run.
4. FastAPI validates the JWT using Auth0 JWKS and extracts the `user_id`.
5. The contract is retrieved using `contract_id`. If not found, a `NotFoundException` is raised.
6. The system verifies the requesting user is a participant in the match linked to this contract. If not, `403 Forbidden` is returned.
7. **The system verifies that a contract in `PENDING_PROPOSAL` status exists for this match.** If the contract is in any other status, the request is rejected.
8. The system verifies the requesting user is **not** the party who last proposed this contract. A party cannot accept their own proposal.
9. The contract status is updated to `ACCEPTED`.
10. The match status is updated to `FINALIZED`.
11. A `ContractAccepted` event is published to the event bus with `contract_id` and `match_id`.
12. The Project Domain receives the `ContractAccepted` event and creates a project derived from the contract's roadmap phases and expected metrics.
13. The Notification Domain notifies both parties that the contract was accepted and the project has been created.
14. The accepted contract details are returned; the frontend redirects both parties to the project dashboard.

---

#### Reject Contract

Implementation: [backend/domains/contract/controllers/reject_contract_controller.py](backend/domains/contract/controllers/reject_contract_controller.py)

A simple rejection of the current proposal. The match remains active and the proposing party may send a new proposal at any time.

1. The non-proposing party sends a POST request to `/api/contracts/{contract_id}/reject`.
2. Google Cloud API Gateway validates that the endpoint exists and applies rate limiting.
3. Google Cloud API Gateway routes the request to Cloud Run.
4. FastAPI validates the JWT using Auth0 JWKS and extracts the `user_id`.
5. The contract is retrieved using `contract_id`. If not found, a `NotFoundException` is raised.
6. The system verifies the requesting user is a participant in the match linked to this contract. If not, `403 Forbidden` is returned.
7. The system verifies the contract status is `PENDING_PROPOSAL`. Only pending contracts can be rejected.
8. The system verifies the requesting user is **not** the party who last proposed this contract.
9. The contract status is updated to `REJECTED`.
10. A `ContractRejected` event is published to the event bus with `contract_id` and `match_id`.
11. The match status remains `ACTIVE` — the proposing party may submit a new proposal via the `Propose Contract` workflow.
12. The Notification Domain notifies the proposing party that their proposal was rejected.
13. A confirmation response is returned.


### Project Domain Workflows

#### Project Baseline Submission

Implementation: [backend/domains/project/controllers/submit_baseline_controller.py](backend/domains/project/controllers/submit_baseline_controller.py)

Triggered when a project is created. The PYME must submit a PDF documenting the current state of each contracted metric before the project work begins. Subphase validation is blocked until this document is processed successfully.

The PDF must follow this structure:

| Section | Description |
|---|---|
| 1. Company Information | Name, industry, company size |
| 2. Current Situation | Brief description of the business context at project start |
| 3. Metrics | One entry per contracted metric: metric name, current value, and unit of measurement |

Each metric entry in section 3 must match by name the metrics defined in `PB_ContractMetrics` for this contract version. For example, if the contract defines a metric named `monthly_sales`, the PDF must include a `monthly_sales` entry with its current numeric value. The AI extracts these as key/value pairs and sets the `baselineValue` on each matching `PB_ContractMetrics` record.

1. The PYME sends a POST request to `/api/projects/{project_id}/baseline` with the PDF file attached (multipart/form-data).
2. Google Cloud API Gateway validates the endpoint and applies rate limiting.
3. Google Cloud API Gateway routes the request to Cloud Run.
4. FastAPI validates the JWT using Auth0 JWKS and extracts the `pyme_id`.
5. The system verifies the requesting user is the PYME owner of this project and that the project status is `ACTIVE` with no baseline already submitted. If not, `403 Forbidden` or `409 Conflict` is returned.
6. The PDF is stored in Google Cloud Storage under the project's namespace. The file reference is recorded in `PB_Documents` with `documentTypeId = baseline` and status `PENDING`.
7. A `BaselinePdfUploaded` event is published to Pub/Sub, triggering the `Baseline PDF Processing` workflow in the AI Domain.
8. The project status remains `ACTIVE` — subphase validation is blocked until a `BaselinePdfProcessed` event with `status: PROCESSED` is received and all `baselineValue` fields on the contract metrics are populated.

---

#### Project SubPhase Validation

Implementation: [backend/domains/project/controllers/validate_subphase_controller.py](backend/domains/project/controllers/validate_subphase_controller.py)

The advisor submits observed metric values for a subphase. The system validates them against the phase's metric targets and marks the subphase as completed if all targets are met. Once all subphases of a phase are completed, the phase is automatically closed.

1. The advisor sends a POST request to `/api/projects/{project_id}/subphases/{subphase_id}/validate` with a body containing the current observed value for each contract metric defined in the parent phase.
2. Google Cloud API Gateway validates the endpoint and applies rate limiting.
3. Google Cloud API Gateway routes the request to Cloud Run.
4. FastAPI validates the JWT using Auth0 JWKS and extracts the `user_id`.
5. The system verifies the requesting user is the advisor assigned to this project. If not, `403 Forbidden` is returned.
6. The system verifies the project status is `ACTIVE` and the subphase exists, belongs to this project, and has not already been completed.
7. The system loads the parent phase's `PB_PhaseMetricTargets`, which defines for each metric the `targetPct` that must be reached in this phase.
8. For each submitted metric reading the system computes the **actual improvement percentage** against the project baseline:

   ```
   actual_improvement_pct = ((current_value − baseline_value) / baseline_value) × 100
   ```
9. The reading is persisted in `PB_SubPhaseMetricReadings`.
10. If `actual_improvement_pct ≥ targetPct` for all phase metrics, the subphase is marked `completed` in `PB_ProjectSubPhaseStatus`.
11. If all subphases of the parent phase are now `completed`, the phase is marked `completed` in `PB_ProjectPhaseStatus` and a `PhaseCompleted` event is published.
12. If all phases of the project are now `completed`, an `AllPhasesCompleted` event is published, triggering the `Project Completion Validation` workflow.
 
#### Project Health Monitoring

Implementation: [backend/domains/project/controllers/monitor_health_controller.py](backend/domains/project/controllers/monitor_health_controller.py)

Health is recalculated automatically every time a roadmap phase is completed.

1. The Project Domain receives a `PhaseCompleted` event with `phase_id` and `project_id`.
2. The service loads the project record, which includes `start_date` and `end_date` derived from the contract duration.
3. It computes the **completion ratio**: `completed_subphases / total_subphases` across all phases.
4. It computes the **time progress ratio**: `(today − start_date) / (end_date − start_date)`, clamped to [0, 1].
5. The `health_score` reflects how far ahead or behind the project is relative to elapsed time:

   ```
   health_score = (completion_ratio / time_progress_ratio) × 100 
   ```

6. A new health snapshot is appended to `PB_ProjectHealthHistory` with the current `health_score` and the current subphase (`current_subphase_id`).
7. A `ProjectStatusChanged` event is published to the event bus with `project_id` and the derived status label:
   - `health_score ≥ 80` → `ON_TRACK`
   - `50 ≤ health_score < 80` → `AT_RISK`
   - `health_score < 50` → `OFF_TRACK`
8. The Notification Domain reacts to `ProjectStatusChanged` and alerts both parties if the status label has changed from the previous value.


#### Project Completion Validation

Implementation: [backend/domains/project/controllers/close_project_controller.py](backend/domains/project/controllers/close_project_controller.py)

Triggered by the `AllPhasesCompleted` event.

Upon receiving the `AllPhasesCompleted` event, the Project Domain sets the project status to `AWAITING_COMPLETION_DOCUMENT` and notifies the advisor to submit the final document.

The completion document follows the same PDF structure as the advisor's use case files:

| Section | Description |
|---|---|
| 1. Company Information | Name, industry, company size |
| 2. Company Context | Business model and starting context |
| 3. Initial Situation | Problem or opportunity that triggered the engagement |
| 4. Actions Performed | Steps and interventions executed during the project |
| 5. Metric Used | Name of the primary metric tracked, value before the project, and value after |
| 6. Metrics Before | Baseline KPI values at project start |
| 7. Metrics After | Final KPI values at project end |

1. The advisor sends a POST request to `/api/projects/{project_id}/completion-document` with the PDF file attached (multipart/form-data).
2. Google Cloud API Gateway validates the endpoint and applies rate limiting.
3. Google Cloud API Gateway routes the request to Cloud Run.
4. FastAPI validates the JWT using Auth0 JWKS and extracts the `user_id`.
5. The system verifies the requesting user is the advisor assigned to the project and that the project status is `AWAITING_COMPLETION_DOCUMENT`. If not, `403 Forbidden` or `409 Conflict` is returned.
6. The PDF is stored in Google Cloud Storage under the project's namespace. The file reference is recorded in the database with status `PENDING`.
7. A `UseCaseUploaded`-equivalent event is published to the AI Domain via Pub/Sub to trigger the `Use Case PDF Processing` workflow.
8. The AI Domain processes the file (OCR → block extraction → embedding → structured data), extracting the **Metrics Before** and **Metrics After** sections as key/value KPI pairs.
9. The extracted final KPI values are compared against the contracted `expected_metrics` for each metric:

   ```
   final_improvement_pct = ((metrics_after_value − metrics_before_value) / metrics_before_value) × 100
   ```

   Each metric is flagged as `MET` if `final_improvement_pct ≥ target_improvement_pct`, or `PARTIAL` otherwise.

10. The KPI validation report (met/partial per metric) is persisted and linked to the project.
11. The project status is updated to `COMPLETED`.
12. A `ProjectCompleted` event is published to the event bus with `project_id`, `advisor_id`, and `pyme_id`.
13. The Review Domain reacts to the event by unlocking the review flow for both parties (PYME can review the advisor; advisor can review the PYME).
14. The Notification Domain notifies both parties that the project has been officially completed.
15. A confirmation response is returned.

### Review Domain Workflows

#### Leave a Review for an Advisor (that you have already hired in the past)

Implementation: [backend/domains/review/controllers/leave_advisor_review_controller.py](backend/domains/review/controllers/leave_advisor_review_controller.py)

A PYME may leave a review for an advisor only after the shared project has been completed. One review is allowed per project.

1. The PYME sends a POST request to `/api/reviews/advisor` with: `project_id`, `subject_id` (advisor's ID), `rating` (1–5), and an optional `comment`.
2. Google Cloud API Gateway validates that the endpoint exists and applies rate limiting.
3. Google Cloud API Gateway routes the request to Cloud Run.
4. FastAPI validates the JWT using Auth0 JWKS and extracts the `pyme_id` from the token claims.
5. The project record is retrieved using the `project_id`. If not found, a `NotFoundException` is raised.
6. The system verifies that the requesting user is the PYME participant of that project. If not, `403 Forbidden` is returned.
7. The system verifies that the project status is `COMPLETED`. Reviews cannot be submitted for active or cancelled projects.
8. The system verifies that no review from this PYME for this project already exists. If one does, the request is rejected with `409 Conflict`.
9. The rating is validated to be within the 1–5 range.
10. A review record is created with `reviewer_id` (the PYME's ID), `subject_id` (the advisor's ID), `rating`, `comment`, and `created_at`.
11. A `ReviewSubmitted` event is published to the event bus with `review_id`, `subject_id`, and `rating`.
12. The review confirmation is returned to the PYME.

The Notification Domain receives the `ReviewSubmitted` event and notifies the advisor that a review was submitted.

---

#### Leave a Review for a Pyme (that you have been hired by in the past)

Implementation: [backend/domains/review/controllers/leave_pyme_review_controller.py](backend/domains/review/controllers/leave_pyme_review_controller.py)

An advisor may leave a review for a PYME only after the shared project has been completed. One review is allowed per project.

1. The advisor sends a POST request to `/api/reviews/pyme` with: `project_id`, `subject_id` (PYME's ID), `rating` (1–5), and an optional `comment`.
2. Google Cloud API Gateway validates that the endpoint exists and applies rate limiting.
3. Google Cloud API Gateway routes the request to Cloud Run.
4. FastAPI validates the JWT using Auth0 JWKS and extracts the `advisor_id` from the token claims.
5. The project record is retrieved using the `project_id`. If not found, a `NotFoundException` is raised.
6. The system verifies that the requesting user is the advisor participant of that project. If not, `403 Forbidden` is returned.
7. The system verifies that the project status is `COMPLETED`. Reviews cannot be submitted for active or cancelled projects.
8. The system verifies that no review from this advisor for this project already exists. If one does, the request is rejected with `409 Conflict`.
9. The rating is validated to be within the 1–5 range.
10. A review record is created with `reviewer_id` (the advisor's ID), `subject_id` (the PYME's ID), `rating`, `comment`, and `created_at`.
11. A `ReviewSubmitted` event is published to the event bus with `review_id`, `subject_id`, and `rating`.
12. The review confirmation is returned to the advisor.

 The Notification Domain receives the `ReviewSubmitted` event and notifies the PYME that a review was submitted.

### Event Domain Workflows

#### Event Audit Logging

Implementation: [backend/domains/event/services/event_audit_service.py](backend/domains/event/services/event_audit_service.py)

Cross-cutting. Every event published to the EventBus is intercepted and persisted to `domain_events` before any consumer handler runs, with `event_type`, `payload` (JSON), and `occurred_at`.

---

#### SmeAccountCreated Event

Payload: `sme_id`, `email`, `company_name`

This event is emitted whenever a new SME account is created so that the platform can bootstrap the company's profile space and welcome the user.

Published by: `Create SME Account` use case (User Domain), once the account has been persisted.

Consumed by:
- Pyme Domain — provisions an empty PYME profile for `sme_id`, linking it to the company identified by `company_name`.
- Notification Domain — sends a welcome notification to `email`.

Workflow (Event Domain):
1. The Event Audit Service intercepts the event and persists it to `domain_events` before any consumer runs.
2. The EventBus delivers the event to every registered consumer listed above.

---

#### AdvisorAccountCreated Event

Payload: `advisor_id`, `email`, `specialization`

This event is emitted whenever a new advisor account is created so that advisor-side aggregates and onboarding can begin.

Published by: `Create Advisor Account` use case (User Domain), once the account has been persisted.

Consumed by:
- Advisor Domain — initializes the advisor aggregate for `advisor_id`, seeding it with the declared `specialization`.
- Notification Domain — sends a welcome notification to `email`.

Workflow (Event Domain):
1. The Event Audit Service intercepts the event and persists it to `domain_events` before any consumer runs.
2. The EventBus delivers the event to every registered consumer listed above.

---

#### SmeInformationUpdated Event

Payload: `sme_id`

This event is emitted when an SME edits its profile, so dependent domains can react to the change.

Published by: `Update SME Profile` use case (User Domain), once the profile changes have been persisted.

Consumed by:
- Notification Domain — notifies the SME that its profile information was updated.

Workflow (Event Domain):
1. The Event Audit Service intercepts the event and persists it to `domain_events` before any consumer runs.
2. The EventBus delivers the event to every registered consumer listed above.

---

#### AdvisorInformationUpdated Event

Payload: `advisor_id`

This event is emitted when an advisor edits its profile. Because profile data influences matching, the Matching Domain must be made aware.

Published by: `Update Advisor Profile` use case (User Domain), once the profile changes have been persisted.

Consumed by:
- Matching Domain — invalidates/refreshes any cached match candidates that depend on the advisor's profile.
- Notification Domain — notifies the advisor that its profile information was updated.

Workflow (Event Domain):
1. The Event Audit Service intercepts the event and persists it to `domain_events` before any consumer runs.
2. The EventBus delivers the event to every registered consumer listed above.

---

#### AdvisorIndustryUpdated Event

Payload: `advisor_id`, `industry_tags`

This event is emitted when an advisor's industry classification changes, which affects both PYME recommendations and matching.

Published by: `Update Advisor Industry` use case (User Domain — [update_advisor_industry_controller.py](backend/domains/user/controllers/update_advisor_industry_controller.py)), once the new `industry_tags` have been persisted.

Consumed by:
- Pyme Domain — re-evaluates which PYMEs the advisor is relevant to, given the updated `industry_tags`.
- Matching Domain — refreshes match candidates affected by the advisor's new industry coverage.

Workflow (Event Domain):
1. The Event Audit Service intercepts the event and persists it to `domain_events` before any consumer runs.
2. The EventBus delivers the event to every registered consumer listed above.

---

#### UseCaseUploaded Event

Payload: `advisor_id`, `file_path`

This event is emitted when an advisor uploads a use-case document, triggering asynchronous AI processing. It is delivered over Pub/Sub.

Published by: `Advisor Uploads Use Cases` use case (User Domain) over Pub/Sub, once the file has been stored.

Consumed by:
- AI Domain — triggers the `Use Case PDF Processing` workflow against the document at `file_path`.

Workflow (Event Domain):
1. The Event Audit Service intercepts the event and persists it to `domain_events` before any consumer runs.
2. The EventBus delivers the event to every registered consumer listed above.

---

#### PromiseTextUpdated Event

Payload: `promise_id`, `promise_text`

This event is emitted when an advisor adds or edits a success metric promise, triggering AI classification. It is delivered over Pub/Sub.

Published by: `Add / Edit Promise` use case (Advisor Domain) over Pub/Sub, once the promise has been persisted.

Consumed by:
- AI Domain — triggers the `Promise Industry Classification` workflow on `promise_text`.

Workflow (Event Domain):
1. The Event Audit Service intercepts the event and persists it to `domain_events` before any consumer runs.
2. The EventBus delivers the event to every registered consumer listed above.

---

#### RecommendationUpdated Event

Payload: `pyme_id`

This event is emitted after the AI Domain produces a new recommendation set for a PYME, so matching and the user can react.

Published by: Pyme Domain, after the AI Domain completes a recommendation batch or an on-demand run.

Consumed by:
- Matching Domain — rebuilds the swipe/candidate queue for `pyme_id` from the updated recommendations.
- Notification Domain — notifies the PYME that fresh recommendations are available.

Workflow (Event Domain):
1. The Event Audit Service intercepts the event and persists it to `domain_events` before any consumer runs.
2. The EventBus delivers the event to every registered consumer listed above.

---

#### MatchCreated Event

Payload: `match_id`, `pyme_id`, `advisor_id`

This event is emitted when a PYME and advisor are matched, opening the channels needed for them to collaborate.

Published by: `Create Match` use case (Matching Domain), once the match has been persisted.

Consumed by:
- Communication Domain — opens a messaging session between `pyme_id` and `advisor_id`.
- Contract Domain — prepares a contract context for the new match.
- Notification Domain — notifies both parties that a match was created.

Workflow (Event Domain):
1. The Event Audit Service intercepts the event and persists it to `domain_events` before any consumer runs.
2. The EventBus delivers the event to every registered consumer listed above.

---

#### MatchSwiped Event

Payload: `pyme_id`, `advisor_id`, `approved`

This event is emitted on each PYME swipe decision. When the PYME swipes right (`approved = true`), a match is created immediately without requiring advisor approval — the advisor is notified and may cancel the match at any time using the `Cancel Match` workflow.

Published by: `PYME Swipe Decision` use case (Matching Domain), once the decision has been recorded.

Consumed by:
- Matching Domain (self) — only when `approved = true`, triggers the `Create Match` use case (which in turn publishes `MatchCreated`). When `approved = false`, no further action is taken.

Workflow (Event Domain):
1. The Event Audit Service intercepts the event and persists it to `domain_events` before any consumer runs.
2. The EventBus delivers the event to every registered consumer listed above.

---

#### MatchCancelled Event

Payload: `match_id`

This event is emitted when a match is cancelled, so the collaboration channels opened for it can be torn down.

Published by: `Cancel Match` use case (Matching Domain), once the match has been marked cancelled.

Consumed by:
- Communication Domain — closes the messaging session tied to `match_id`.
- Contract Domain — voids any pending contract for that match.
- Notification Domain — notifies both parties that the match was cancelled.

Workflow (Event Domain):
1. The Event Audit Service intercepts the event and persists it to `domain_events` before any consumer runs.
2. The EventBus delivers the event to every registered consumer listed above.

---

#### MessageSent Event

Payload: `message_id`, `session_id`, `sender_id`

This event is emitted each time a message is sent, so the counterpart can be alerted.

Published by: `Send Message` use case (Communication Domain), once the message has been persisted.

Consumed by:
- Notification Domain — notifies the recipient of the session that a new message arrived from `sender_id`.

Workflow (Event Domain):
1. The Event Audit Service intercepts the event and persists it to `domain_events` before any consumer runs.
2. The EventBus delivers the event to every registered consumer listed above.

---

#### ContractProposed Event

Payload: `contract_id`, `match_id`

This event is emitted whenever a contract is proposed or countered, so the conversation and the counterparty stay in sync.

Published by: `Propose Contract` / `Counter Offer` use case (Contract Domain), once the proposal has been persisted.

Consumed by:
- Communication Domain — posts a contract-proposal marker into the session for `match_id`.
- Notification Domain — notifies the counterparty that a contract was proposed.

Workflow (Event Domain):
1. The Event Audit Service intercepts the event and persists it to `domain_events` before any consumer runs.
2. The EventBus delivers the event to every registered consumer listed above.

---

#### ContractRejected Event

Payload: `contract_id`, `match_id`

This event is emitted when a proposed contract is rejected.

Published by: `Reject Contract` use case (Contract Domain), once the contract has been marked rejected.

Consumed by:
- Notification Domain — notifies the proposing party that the contract was rejected.

Workflow (Event Domain):
1. The Event Audit Service intercepts the event and persists it to `domain_events` before any consumer runs.
2. The EventBus delivers the event to every registered consumer listed above.

---

#### ContractAccepted Event

Payload: `contract_id`, `match_id`

This event is emitted when a contract is accepted, which kicks off the creation of the actual project.

Published by: `Accept Contract` use case (Contract Domain), once the contract has been marked accepted.

Consumed by:
- Project Domain — creates a project from `contract_id`, then publishes `ProjectCreated`.
- Notification Domain — notifies both parties that the contract was accepted.

Workflow (Event Domain):
1. The Event Audit Service intercepts the event and persists it to `domain_events` before any consumer runs.
2. The EventBus delivers the event to every registered consumer listed above.

---

#### ProjectCreated Event

Payload: `project_id`, `contract_id`

This event is emitted by the Project Domain once a project exists, so collaboration tooling can attach to it.

Published by: Project Domain (handler of `ContractAccepted`), once the new project has been persisted.

Consumed by:
- Notification Domain — notifies both parties that the project has started.
- Communication Domain — binds the existing session to `project_id` so messaging continues within the project context.

Workflow (Event Domain):
1. The Event Audit Service intercepts the event and persists it to `domain_events` before any consumer runs.
2. The EventBus delivers the event to every registered consumer listed above.

---

#### ProjectStatusChanged Event

Payload: `project_id`, `new_status`

This event is emitted when health monitoring detects a change in a project's status.

Published by: `Project Health Monitoring` process (Project Domain), once a status transition is detected.

Consumed by:
- Notification Domain — notifies the participants of the project's `new_status`.

Workflow (Event Domain):
1. The Event Audit Service intercepts the event and persists it to `domain_events` before any consumer runs.
2. The EventBus delivers the event to every registered consumer listed above.

---

---

#### ProjectCompleted Event

Payload: `project_id`

This event is emitted once completion validation passes, enabling reviews to be left.

Published by: `Project Completion Validation` process (Project Domain), once completion is confirmed.

Consumed by:
- Review Domain — unlocks the ability for both participants to leave a review for the project.
- Notification Domain — notifies the participants that the project is complete and reviews can now be submitted.

Workflow (Event Domain):
1. The Event Audit Service intercepts the event and persists it to `domain_events` before any consumer runs.
2. The EventBus delivers the event to every registered consumer listed above.

---

#### ReviewSubmitted Event

Payload: `review_id`, `subject_id`, `rating`

This event is emitted when a review is submitted (see `Leave a Review`), and updates the reputation of whoever was reviewed.

Published by: `Leave a Review` use case (Review Domain), once the review has been persisted.

Consumed by:
- Advisor Domain — if `subject_id` is an advisor, recomputes the advisor's reputation and publishes `AdvisorReputationUpdated`.
- Pyme Domain — if `subject_id` is a PYME, recomputes the PYME's reputation and publishes `PymeReputationUpdated`.
- Notification Domain — notifies the reviewed party that a review was submitted.

Workflow (Event Domain):
1. The Event Audit Service intercepts the event and persists it to `domain_events` before any consumer runs.
2. The EventBus delivers the event to every registered consumer listed above.

---

#### AdvisorReputationUpdated Event

Payload: `advisor_id`, `new_score`

This event is emitted when an advisor's reputation score changes, which feeds back into matching.

Published by: Advisor Domain (handler of `ReviewSubmitted`), once the score has been recomputed.

Consumed by:
- Matching Domain — updates the advisor's ranking weight using `new_score`.
- Notification Domain — notifies the advisor that their reputation score changed.

Workflow (Event Domain):
1. The Event Audit Service intercepts the event and persists it to `domain_events` before any consumer runs.
2. The EventBus delivers the event to every registered consumer listed above.

---

#### PymeReputationUpdated Event

Payload: `pyme_id`, `new_score`

This event is emitted when a PYME's reputation score changes, which feeds back into matching.

Published by: Pyme Domain (handler of `ReviewSubmitted`), once the score has been recomputed.

Consumed by:
- Matching Domain — updates the PYME's ranking weight using `new_score`.
- Notification Domain — notifies the PYME that its reputation score changed.

Workflow (Event Domain):
1. The Event Audit Service intercepts the event and persists it to `domain_events` before any consumer runs.
2. The EventBus delivers the event to every registered consumer listed above.

---

#### SmeNeedsAssessmentUpdated Event

Payload: `pyme_id`

This event is emitted when a PYME submits its needs assessment, which drives a fresh recommendation run.

Published by: `Submit Needs Assessment` use case (Pyme Domain), once the assessment has been persisted.

Consumed by:
- Pyme Domain (self) — updates the PYME's profile state for `pyme_id`.
- AI Domain — invoked via `RecommendationRequested` (Pub/Sub) to generate updated recommendations from the new assessment.

Workflow (Event Domain):
1. The Event Audit Service intercepts the event and persists it to `domain_events` before any consumer runs.
2. The EventBus delivers the event to every registered consumer listed above.

---

#### AdvisorUseCaseProcessed Event

Payload: `advisor_id`, `success`

This event is emitted when the AI Domain finishes processing an uploaded use-case document.

Published by: AI Domain (`Use Case PDF Processing`), once processing finishes.

Consumed by:
- Notification Domain — notifies the advisor whether the use-case processing succeeded or failed.

Workflow (Event Domain):
1. The Event Audit Service intercepts the event and persists it to `domain_events` before any consumer runs.
2. The EventBus delivers the event to every registered consumer listed above.

---

## 2.11 C4 Architecture Diagrams
### Context Diagram
![context_diagram.png](docs/images/backend/context_c4bck.png)
### Container Diagram
![container_diagram.png](docs/images/backend/containers_c4bck.png)
### Component Diagram
![component_diagram.png](docs/images/backend/component_c4bck.svg)
---

## 2.12 Design Considerations
### Algorithm Selection & Parameters













































---

## 2.13 Design Patterns

### Backend design patterns matrix

| Class / Interface | Location | Responsibility | Pattern | Justification |
|------------------|----------|----------------|---------|--------------|
| EventBus | [backend/shared/events/event_bus.py](backend/shared/events/event_bus.py) | Publishes/subscribes domain events (`MatchCreated`, `ContractAccepted`, …) | Observer | Domains react to each other's state changes without direct imports; the alternative is hard cross-domain coupling. |
| DatabaseConnectionPool | [backend/shared/database/connection.py](backend/shared/database/connection.py) | One shared SQLAlchemy connection pool **per Cloud Run instance/process** | Singleton (process-scoped) | Not a cluster-wide singleton — Cloud Run runs 1–10 instances (§2.9). The Singleton bounds the pool to one per process so that `instances × pool_size` stays under Cloud SQL's connection limit; without it each request would open its own pool and exhaust the database. |
| EventRegistry | [backend/shared/events/event_registry.py](backend/shared/events/event_registry.py) | One registry of all event handlers, loaded once at startup | Singleton (process-scoped) | A second registry inside the same process would double-subscribe handlers and fire each event twice; one instance per process guarantees each handler is registered exactly once. |
| DocumentAiClient | [backend/shared/clients/document_ai_client.py](backend/shared/clients/document_ai_client.py) | One shared, thread-safe Document AI (gRPC) client reused across requests **per process** | Singleton (process-scoped) | The OCR call is asynchronous, so a single thread-safe client serves many concurrent requests; expensive to create, it is instantiated once per process and shared by all. |
| JwtValidator / PermissionChecker | [backend/shared/auth/jwt_validator.py](backend/shared/auth/jwt_validator.py) | Validates Auth0 JWT and checks role/ownership before the controller runs | Proxy | Centralized authorization at one boundary; every endpoint validates JWT + `accountType` + resource ownership (OWASP broken-auth). |
| StructuredLoggingMiddleware | [backend/shared/logging/structured_logging.py](backend/shared/logging/structured_logging.py) | Injects `trace_id`, `request_id`, `user_id` into every log/request | Decorator | Cross-cutting observability added transparently without touching business code; required for traceable Cloud Logging. |
| DomainExceptionHandlerRegistry | [backend/main.py](backend/main.py) | Maps each domain exception class to exactly one HTTP status at startup | Chain of Responsibility | One place converts `ValidationException→400`, `AuthException→401/403`, `NotFoundException→404`, etc.; a catch-all handles the rest. |
| DocumentAiCircuitBreaker | [backend/domains/ai/services/document_ai_service.py](backend/domains/ai/services/document_ai_service.py) | Trips after 5 consecutive Document AI failures; half-open probe after 30s | Circuit Breaker | Fails fast instead of hammering a degraded OCR provider, protecting threads and latency during outages. |
| SessionCacheService / JwksCache | [backend/domains/user/services/session_cache_service.py](backend/domains/user/services/session_cache_service.py) | Reads session/JWKS from Redis first, falls back to source and repopulates on miss | Cache-Aside | Keeps auth working and fast even if Auth0 is briefly down; avoids re-validating JWKS on every request. |
| ContractBuilder | [backend/domains/contract/builders/contract_builder.py](backend/domains/contract/builders/contract_builder.py) | Assembles a contract step by step (tier, duration, commission, metrics, deliverables) | Builder | The contract has many tier-conditional parts; avoids telescoping constructors and keeps the object always valid. |
| NotificationChannelFactory | [backend/domains/notification/factories/channel_factory.py](backend/domains/notification/factories/channel_factory.py) | Creates the right sender (email, push, in-app) per event | Abstract Factory | Decouples "what to notify" from "which channel"; adding a channel doesn't touch publishers. |
| CachingRepositoryDecorator | [backend/shared/persistence/caching_repository.py](backend/shared/persistence/caching_repository.py) | Wraps a repository adding Redis read/write without touching the query | Decorator | Adds transparent cache-aside to any repository (reputation, catalogs) without duplicating logic. |
| OnboardingFacade | [backend/domains/user/facades/onboarding_facade.py](backend/domains/user/facades/onboarding_facade.py) | Orchestrates Auth0 + cédula jurídica verification + PYME profile + welcome event | Facade | Onboarding spans several services; a facade gives a single entry point and hides the wiring. |
| NotificationBridge | [backend/domains/notification/bridge/notification_bridge.py](backend/domains/notification/bridge/notification_bridge.py) | Separates the "notification type" abstraction from the "transport" implementation | Bridge | Allows N types × M transports without class explosion; both axes evolve independently. |
| LazyAdvisorProfileProxy | [backend/domains/matching/proxies/advisor_profile_proxy.py](backend/domains/matching/proxies/advisor_profile_proxy.py) | Stand-in that calls the Advisor domain (via ACL/REST) only when the data is accessed | Proxy (Virtual/Remote) | Avoids fetching the full profile if the matching flow doesn't need it; cheaper cross-domain queries. |
| MessageModerationChain | [backend/domains/communication/moderation/moderation_chain.py](backend/domains/communication/moderation/moderation_chain.py) | Chain: keywords → email → phone → social links → spam | Chain of Responsibility | Blocking off-platform contact is a requirement; each rule is an addable/reorderable link. |
| ContractState | [backend/domains/contract/state/contract_state.py](backend/domains/contract/state/contract_state.py) | States negotiation not started → negotiating → rejected / marry the prospect, with valid transitions | State | The negotiation flow has strict transitions; State makes illegal jumps impossible. |
| MatchState | [backend/domains/matching/state/match_state.py](backend/domains/matching/state/match_state.py) | Match states pending → matched / not matched → cancelled | State | Matches resolve to matched or not, and can later be cancelled; centralizes transition guards. |
| SwipeCommand | [backend/domains/matching/commands/swipe_command.py](backend/domains/matching/commands/swipe_command.py) | Encapsulates approve/reject as a discrete `execute()` action | Command | Swipe is the core interaction unit; enables logging, queuing, and undo. |
| AdvisorEligibilitySpecification | [backend/domains/matching/specifications/eligibility_spec.py](backend/domains/matching/specifications/eligibility_spec.py) | Composable rules (reputation > X AND industry == Y AND available) with AND/OR/NOT | Specification | Eligibility rules combinable and testable separately; reusable in query and validation. |
| ProjectMetricsVisitor | [backend/domains/project/visitors/metrics_visitor.py](backend/domains/project/visitors/metrics_visitor.py) | Walks heterogeneous phases/tasks computing before/after metrics | Visitor | Adds new calculations without touching phase/task classes; separates structure from operation. |
| AdvisorCursorIterator | [backend/domains/matching/iterators/advisor_cursor.py](backend/domains/matching/iterators/advisor_cursor.py) | Iterates recommendations in batches of 10 and prefetches the next batch as the current one is nearly exhausted | Iterator | Avoids loading the whole recommendation set; fetches 10 at a time and pulls more when running low, keeping the swipe flow seamless. |

---

### Notes on scope and what I deliberately did *not* recommend

- **No business logic in Models, Controllers, or Repositories** — these stay passive per §2.2; introducing patterns like Active Record would violate the layering.
- **No second event mechanism inside a process** — the in-memory `EventBus` (Observer) covers intra-process domain events; Pub/Sub (Publisher-Subscriber) covers cross-process/durable delivery. They are complementary, not duplicated.

---

## 2.14 Architectural Patterns 

The matrix above lists **object-level (GoF) patterns** that live *inside* a process. The patterns below are **architectural / distributed-system patterns** from the [Microsoft Azure Architecture Center — Cloud Design Patterns](https://learn.microsoft.com/azure/architecture/patterns/) catalog. They describe how the **services, the bus, the gateway and the data stores** relate to each other across process boundaries — a different concern from the GoF patterns, so they are kept in their own matrix.

### Architectural patterns matrix

| Class / Interface | Location | Responsibility | Pattern | Justification |
|------------------|----------|----------------|---------|--------------|
| ChoreographyEventRouter | [backend/shared/events/choreography_router.py](backend/shared/events/choreography_router.py) | Dispatches each domain event to the handlers that subscribed to it, with no central coordinator | [Choreography](https://learn.microsoft.com/azure/architecture/patterns/choreography) | Domains react on their own to events (`ContractAccepted → ProjectCreated → ReviewSubmitted`); avoids a brittle central orchestrator. |
| RetryPolicy | [backend/shared/utils/retry_policy.py](backend/shared/utils/retry_policy.py) | Wraps calls with bounded exponential backoff retries | [Retry](https://learn.microsoft.com/azure/architecture/patterns/retry) | Three independent layers (cross-domain REST, database, Pub/Sub) absorb transient failures (§2.7). |
| OutboundCallAmbassador | [backend/shared/clients/outbound_ambassador.py](backend/shared/clients/outbound_ambassador.py) | Single client-side proxy that all outbound cross-domain REST and third-party calls go through, adding retry, circuit breaking, timeouts and trace propagation | [Ambassador](https://learn.microsoft.com/azure/architecture/patterns/ambassador) | Centralizes outbound resilience/observability so each caller doesn't reimplement it. Partial — implemented in-process, not as the canonical sidecar. |
| HealthCheckController | [backend/shared/health/health_controller.py](backend/shared/health/health_controller.py) | Exposes `/health/ready`, checking Cloud SQL, Redis and Pub/Sub | [Health Endpoint Monitoring](https://learn.microsoft.com/azure/architecture/patterns/health-endpoint-monitoring) | Cloud Run probes every 30s and removes/restarts unhealthy instances automatically. |
| PubSubLoadLeveler | [backend/shared/messaging/load_leveler.py](backend/shared/messaging/load_leveler.py) | Buffers OCR/notification work in Pub/Sub between producers and consumers | [Queue-Based Load Leveling](https://learn.microsoft.com/azure/architecture/patterns/queue-based-load-leveling) | Smooths spikes so bursts don't overwhelm Cloud Run instances. |
| PubSubSubscriberPool | [backend/shared/messaging/subscriber_pool.py](backend/shared/messaging/subscriber_pool.py) | Lets multiple instances pull from the same subscription in parallel | [Competing Consumers](https://learn.microsoft.com/azure/architecture/patterns/competing-consumers) | Increases throughput and balances load across Cloud Run instances naturally. |
| SignedUploadUrlService | [backend/domains/ai/services/signed_url_service.py](backend/domains/ai/services/signed_url_service.py) | Issues scoped, time-limited signed Cloud Storage URLs | [Valet Key](https://learn.microsoft.com/azure/architecture/patterns/valet-key) | Clients upload use-case PDFs directly to storage without proxying bytes through the backend. |
| AsyncActionAckController | [backend/shared/async_actions/async_action_controller.py](backend/shared/async_actions/async_action_controller.py) | For any long-running action, returns an immediate `202 Accepted` and delivers the outcome later via a completion event | [Asynchronous Request-Reply](https://learn.microsoft.com/azure/architecture/patterns/async-request-reply) | Applies to every async action — use-case PDF OCR (`AdvisorUseCaseProcessed`), promise classification, recommendation generation — so the client is never blocked while the AI/long work runs. |
| AiCommandHandler | [backend/domains/ai/cqrs/ai_command_handler.py](backend/domains/ai/cqrs/ai_command_handler.py) | Write side — dispatches expensive AI/recommendation commands to asynchronous event-driven processing | [CQRS](https://learn.microsoft.com/azure/architecture/patterns/cqrs) | Expensive commands (AI recommendation/classification, slow events) run async, decoupled from reads; cheap interactions like a swipe stay synchronous and don't use this split. |
| RecommendationReadModel | [backend/domains/ai/cqrs/recommendation_read_model.py](backend/domains/ai/cqrs/recommendation_read_model.py) | Read side — serves the precomputed recommendation results directly, without recomputing | [CQRS](https://learn.microsoft.com/azure/architecture/patterns/cqrs) | A read-optimized model keeps queries fast and independent from the slow write-side processing. |

---

## 2.15 AI / Agentic Patterns

### AI patterns matrix

Both classes extend the shared generate → self-critique → refine loop in [ReflectionService](backend/domains/ai/services/reflection_service.py).

| Class / Interface | Location | Responsibility | Pattern | Justification |
|------------------|----------|----------------|---------|--------------|
| ReflectionServiceRecommendationValidation | [backend/domains/ai/services/reflection_recommendation_validation_service.py](backend/domains/ai/services/reflection_recommendation_validation_service.py) | After the AI Domain ranks advisors for a PYME, reflects on the draft list with the critique grounded on **Advisor Similar Project Retrieval**, dropping or re-ranking low-evidence candidates before the set is stored | Reflection | A ranking can be plausible but unsupported; a self-review against real comparable projects catches and corrects it before the user sees it, with no human in the loop. |
| ReflectionServicePromiseClassification | [backend/domains/ai/services/reflection_promise_classification_service.py](backend/domains/ai/services/reflection_promise_classification_service.py) | After thematic classification assigns industry tags to a promise, re-checks the category against the promise text and industry catalog, correcting low-confidence or inconsistent tags before they are persisted | Reflection | Embedding-based classification can mis-tag edge cases; a reflection pass over the assigned tags reduces wrong industry labels before they reach matching. |

**Reflection** — An agentic pattern where the model evaluates (critiques) its own generated output, optionally against external evidence, and iteratively revises it for a bounded number of steps. It trades extra inference cost for higher-quality, self-corrected results without requiring human review.

---

## 2.16 Source Code

### Backend (Python/FastAPI - Domain-Driven Design)

The backend is organized **by domain**, not by technical layer. Each domain under [backend/domains/](backend/domains/) is self-contained and follows the same internal layering — `controllers/` (one use case per file), `services/` (business logic), `models/` (persistence models), `repositories/` (data access), `schemas/` (request/response/DTOs) and `events/` (domain events it publishes). Cross-cutting concerns live in [backend/shared/](backend/shared/).

**Entry Point & Configuration**
- [Application Factory](backend/main.py) — FastAPI app creation (`create_app`)
- [Settings](backend/config.py) — Environment-driven configuration (Auth0, GCP, Cloud SQL, Redis, Pub/Sub, KMS)
- [API Router](backend/api/routes.py) — Root router aggregating every domain's controllers
- [Dependencies](backend/requirements.txt) — Python dependencies

**Shared Layer — Cross-Cutting Concerns**
- [Auth](backend/shared/auth/) — [Auth0 service](backend/shared/auth/auth0_service.py), [JWT validator](backend/shared/auth/jwt_validator.py), [permission checker](backend/shared/auth/permission_checker.py)
- [Events](backend/shared/events/) — In-process [EventBus](backend/shared/events/event_bus.py), [event handler](backend/shared/events/event_handler.py), [event registry](backend/shared/events/event_registry.py)
- [Messaging](backend/shared/messaging/) — [Pub/Sub client](backend/shared/messaging/pubsub_client.py), [publisher](backend/shared/messaging/message_publisher.py), [subscriber](backend/shared/messaging/message_subscriber.py)
- [Database](backend/shared/database/) — [Connection pool](backend/shared/database/connection.py), [session factory](backend/shared/database/session.py), [migrations](backend/shared/database/migrations/), [seeders](backend/shared/database/seeders/)
- [Exceptions](backend/shared/exceptions/) — [Validation](backend/shared/exceptions/validation_exception.py), [auth](backend/shared/exceptions/auth_exception.py), [not-found](backend/shared/exceptions/not_found_exception.py), [domain](backend/shared/exceptions/domain_exception.py)
- [Logging](backend/shared/logging/) — [Logger](backend/shared/logging/logger.py), [structured logging middleware](backend/shared/logging/structured_logging.py)
- [Validators](backend/shared/validators/) — [Business](backend/shared/validators/business_validator.py), [email](backend/shared/validators/email_validator.py), [phone](backend/shared/validators/phone_validator.py)
- [Utils](backend/shared/utils/) — [UUID generator](backend/shared/utils/uuid_generator.py), [datetime](backend/shared/utils/datetime_utils.py), [encryption](backend/shared/utils/encryption_utils.py)

**User Domain** — [backend/domains/user/](backend/domains/user/) — accounts, authentication, sessions, profiles
- Controllers: [Create SME account](backend/domains/user/controllers/create_sme_account_controller.py), [Create advisor account](backend/domains/user/controllers/create_advisor_account_controller.py), [Login](backend/domains/user/controllers/login_controller.py), [Update SME profile](backend/domains/user/controllers/update_sme_profile_controller.py), [Update advisor profile](backend/domains/user/controllers/update_advisor_profile_controller.py), [Update advisor industry](backend/domains/user/controllers/update_advisor_industry_controller.py)
- Services: [Auth](backend/domains/user/services/auth_service.py), [User](backend/domains/user/services/user_service.py), [Session cache (Cache-Aside)](backend/domains/user/services/session_cache_service.py)
- Models: [User](backend/domains/user/models/user_model.py), [Session](backend/domains/user/models/session_model.py) · Repositories: [user](backend/domains/user/repositories/user_repository.py), [session](backend/domains/user/repositories/session_repository.py)
- Events: [SmeAccountCreated](backend/domains/user/events/sme_account_created_event.py), [AdvisorAccountCreated](backend/domains/user/events/advisor_account_created_event.py) · Schemas: [backend/domains/user/schemas/](backend/domains/user/schemas/)

**Advisor Domain** — [backend/domains/advisor/](backend/domains/advisor/) — advisor profiles, specializations, reputation, base rate
- Controllers: [Get profile](backend/domains/advisor/controllers/get_advisor_profile_controller.py), [Update base rate](backend/domains/advisor/controllers/update_base_rate_controller.py), [Calculate reputation](backend/domains/advisor/controllers/calculate_reputation_controller.py)
- Services: [Advisor](backend/domains/advisor/services/advisor_service.py), [Reputation](backend/domains/advisor/services/reputation_service.py), [Base rate](backend/domains/advisor/services/base_rate_service.py)
- Models: [Advisor](backend/domains/advisor/models/advisor_model.py), [Reputation](backend/domains/advisor/models/reputation_model.py), [Specialization](backend/domains/advisor/models/specialization_model.py) · Repositories: [backend/domains/advisor/repositories/](backend/domains/advisor/repositories/)
- Events: [AdvisorReputationUpdated](backend/domains/advisor/events/advisor_reputation_updated_event.py), [AdvisorBaseRateUpdated](backend/domains/advisor/events/advisor_base_rate_updated_event.py)

**Pyme Domain** — [backend/domains/pyme/](backend/domains/pyme/) — PYME profiles, industries, and serving recommendations/impact prediction (computed by the AI Domain)
- Controllers: [Get profile](backend/domains/pyme/controllers/get_pyme_profile_controller.py), [Get advisor recommendations](backend/domains/pyme/controllers/get_advisor_recommendations_controller.py), [Get similar projects](backend/domains/pyme/controllers/get_similar_projects_controller.py)
- Services: [Pyme](backend/domains/pyme/services/pyme_service.py), [Recommendation](backend/domains/pyme/services/recommendation_service.py), [Impact prediction](backend/domains/pyme/services/impact_prediction_service.py)
- Models: [Pyme](backend/domains/pyme/models/pyme_model.py), [Industry](backend/domains/pyme/models/industry_model.py), [Optimization area](backend/domains/pyme/models/optimization_area_model.py)
- Events: [AdvisorRecommended](backend/domains/pyme/events/advisor_recommended_event.py), [RecommendationRecalculated](backend/domains/pyme/events/recommendation_recalculated_event.py)

**AI Domain** — [backend/domains/ai/](backend/domains/ai/) — Pub/Sub-driven PDF processing, embeddings, thematic classification, recommendation scoring (no REST controllers)
- Services: [Use Case PDF Processing](backend/domains/ai/services/use_case_pdf_processing_service.py), [OCR](backend/domains/ai/services/ocr_service.py), [Embedding](backend/domains/ai/services/embedding_service.py), [Thematic classification](backend/domains/ai/services/thematic_classification_service.py), [Recommendation](backend/domains/ai/services/recommendation_service.py), [Recommendation batch](backend/domains/ai/services/recommendation_batch_service.py), [Recommendation on-demand](backend/domains/ai/services/recommendation_on_demand_service.py)
- Reflection (AI self-review, see §2.15): [Base ReflectionService](backend/domains/ai/services/reflection_service.py), [Recommendation validation](backend/domains/ai/services/reflection_recommendation_validation_service.py), [Promise classification](backend/domains/ai/services/reflection_promise_classification_service.py)
- Handlers (Pub/Sub): [UseCaseUploaded](backend/domains/ai/handlers/use_case_uploaded_handler.py), [RecommendationRequested](backend/domains/ai/handlers/recommendation_requested_handler.py)
- Models: [Use case](backend/domains/ai/models/use_case_model.py), [Document block](backend/domains/ai/models/document_block_model.py), [Recommendation result](backend/domains/ai/models/recommendation_result_model.py) · Repositories: [backend/domains/ai/repositories/](backend/domains/ai/repositories/)
- Events: [AdvisorUseCaseProcessed](backend/domains/ai/events/advisor_use_case_processed_event.py), [RecommendationReady](backend/domains/ai/events/recommendation_ready_event.py)

**Matching Domain** — [backend/domains/matching/](backend/domains/matching/) — discovery, swipes, matches, expiration
- Controllers: [Create swipe decision](backend/domains/matching/controllers/create_swipe_decision_controller.py), [Create match](backend/domains/matching/controllers/create_match_controller.py), [Finalize match](backend/domains/matching/controllers/finalize_match_controller.py), [Cancel match](backend/domains/matching/controllers/cancel_match_controller.py), [Get advisor matches](backend/domains/matching/controllers/get_advisor_matches_controller.py)
- Services: [Matching](backend/domains/matching/services/matching_service.py), [Discovery](backend/domains/matching/services/discovery_service.py), [Match expiration](backend/domains/matching/services/match_expiration_service.py)
- Models: [Match](backend/domains/matching/models/match_model.py), [Swipe](backend/domains/matching/models/swipe_model.py) · Repositories: [match](backend/domains/matching/repositories/match_repository.py), [swipe](backend/domains/matching/repositories/swipe_repository.py), [discovery](backend/domains/matching/repositories/discovery_repository.py)
- Events: [MatchCreated](backend/domains/matching/events/match_created_event.py), [MatchSwiped](backend/domains/matching/events/match_swiped_event.py), [MatchExpired](backend/domains/matching/events/match_expired_event.py)

**Contract Domain** — [backend/domains/contract/](backend/domains/contract/) — proposals, counter-offers, negotiation, acceptance
- Controllers: [Propose contract](backend/domains/contract/controllers/propose_contract_controller.py), [Counter offer](backend/domains/contract/controllers/counter_offer_controller.py), [Accept contract](backend/domains/contract/controllers/accept_contract_controller.py), [Reject contract](backend/domains/contract/controllers/reject_contract_controller.py)
- Services: [Contract](backend/domains/contract/services/contract_service.py), [Negotiation](backend/domains/contract/services/negotiation_service.py), [Contract generator](backend/domains/contract/services/contract_generator_service.py)
- Models: [Contract](backend/domains/contract/models/contract_model.py), [Negotiation](backend/domains/contract/models/negotiation_model.py)
- Events: [ContractProposed](backend/domains/contract/events/contract_proposed_event.py), [ContractAccepted](backend/domains/contract/events/contract_accepted_event.py), [ContractRejected](backend/domains/contract/events/contract_rejected_event.py)

**Project Domain** — [backend/domains/project/](backend/domains/project/) — projects, subphases, health monitoring, completion
- Controllers: [Create project](backend/domains/project/controllers/create_project_controller.py), [Submit baseline](backend/domains/project/controllers/submit_baseline_controller.py), [Validate subphase](backend/domains/project/controllers/validate_subphase_controller.py), [Monitor health](backend/domains/project/controllers/monitor_health_controller.py), [Get project status](backend/domains/project/controllers/get_project_status_controller.py), [Close project](backend/domains/project/controllers/close_project_controller.py)
- Services: [Project](backend/domains/project/services/project_service.py), [Subphase](backend/domains/project/services/subphase_service.py), [Health monitoring](backend/domains/project/services/health_monitoring_service.py), [Project completion](backend/domains/project/services/project_completion_service.py)
- Models: [Project](backend/domains/project/models/project_model.py), [Subphase](backend/domains/project/models/subphase_model.py), [Project health](backend/domains/project/models/project_health_model.py)
- Events: [ProjectCreated](backend/domains/project/events/project_created_event.py), [SubphaseCompleted](backend/domains/project/events/subphase_completed_event.py), [ProjectStatusChanged](backend/domains/project/events/project_status_changed_event.py), [ProjectCompleted](backend/domains/project/events/project_completed_event.py)

**Communication Domain** — [backend/domains/communication/](backend/domains/communication/) — chat sessions, messaging, access control
- Controllers: [Send message](backend/domains/communication/controllers/send_message_controller.py), [Get messages](backend/domains/communication/controllers/get_messages_controller.py), [Validate chat access](backend/domains/communication/controllers/validate_chat_access_controller.py)
- Services: [Chat](backend/domains/communication/services/chat_service.py), [Message](backend/domains/communication/services/message_service.py)
- Models: [Chat session](backend/domains/communication/models/chat_session_model.py), [Message](backend/domains/communication/models/message_model.py) · Events: [MessageSent](backend/domains/communication/events/message_sent_event.py)

**Review Domain** — [backend/domains/review/](backend/domains/review/) — bidirectional reviews and ratings
- Controllers: [Leave PYME review](backend/domains/review/controllers/leave_pyme_review_controller.py), [Leave advisor review](backend/domains/review/controllers/leave_advisor_review_controller.py), [Get reviews](backend/domains/review/controllers/get_reviews_controller.py)
- Services: [Review](backend/domains/review/services/review_service.py) · Models: [Review](backend/domains/review/models/review_model.py) · Events: [ReviewSubmitted](backend/domains/review/events/review_submitted_event.py)

**Notification Domain** — [backend/domains/notification/](backend/domains/notification/) — multi-channel notifications driven by events
- Event handlers: [Match created](backend/domains/notification/handlers/match_created_handler.py), [Contract proposed](backend/domains/notification/handlers/contract_proposed_handler.py), [Advisor selected](backend/domains/notification/handlers/advisor_selected_handler.py), [Project status](backend/domains/notification/handlers/project_status_handler.py), [Advisor use case processed](backend/domains/notification/handlers/advisor_use_case_processed_handler.py)
- Services: [Notification](backend/domains/notification/services/notification_service.py), [Email](backend/domains/notification/services/email_notification_service.py), [In-app](backend/domains/notification/services/in_app_notification_service.py)
- Models: [Notification](backend/domains/notification/models/notification_model.py), [Notification preference](backend/domains/notification/models/notification_preference_model.py)

**Event Domain** — [backend/domains/event/](backend/domains/event/) — event auditing and durable cross-process publishing
- Services: [Event audit (persists every event to `domain_events`)](backend/domains/event/services/event_audit_service.py), [Event](backend/domains/event/services/event_service.py)
- Publishers: [Event publisher](backend/domains/event/publishers/event_publisher.py), [Pub/Sub publisher](backend/domains/event/publishers/pubsub_publisher.py)
- Models: [Domain event](backend/domains/event/models/domain_event_model.py) · Repository: [Event repository](backend/domains/event/repositories/event_repository.py)

**Tests** — [backend/tests/](backend/tests/) — [unit](backend/tests/unit/) (per-domain) and [integration](backend/tests/integration/) suites

---

# Data Design


## 2.17 Data Stack

| Component | Technology |
|---|---|
| Database | PostgreSQL |
| ORM | SQLAlchemy |
| Migrations | Alembic |

The relational database used is PostgreSQL. Backend access is handled through SQLAlchemy as the ORM, following the domain-driven architecture of the project. Schema migrations are managed with Alembic.

---

## 2.18 Database Schema (DBML)


## 2.20 Database Migrations

PymeBoost uses Alembic for database schema versioning and migrations.

### Setup

```bash
pip install alembic
alembic init migrations
```

### Configuration

In `alembic.ini`, set the database URL:

```ini
sqlalchemy.url = postgresql://user:password@localhost/pymeboost
```

### Creating a Migration

```bash
alembic revision --autogenerate -m "description of change"
```

### Applying Migrations

```bash
# Apply all pending migrations
alembic upgrade head

# Rollback one migration
alembic downgrade -1

# Rollback to specific version
alembic downgrade <revision_id>
```

### Versioning Strategy

- Every schema change requires a new migration file
- Migration files are versioned and tracked in `/migrations/versions/`
- Never modify an existing migration — always create a new one
- All migrations must be reviewed before merging to main

---

## 2.21 Data Security

### Encryption
- Passwords are hashed using **bcrypt** before storing in the database
- Sensitive fields (emails, personal data) are encrypted at the application layer using **AES-256**
- All communication between client and server uses **HTTPS/TLS**

### Secret Management
- All secrets and credentials are stored in environment variables via `.env` file
- `.env` is excluded from version control via `.gitignore`
- Production secrets are managed through the cloud provider's secret manager

### Audit & Traceability
- All domain events are logged in the `domain_events` table with timestamp and payload
- Every critical action (match, contract, payment) generates a domain event for full traceability

### Backups
- Daily automated backups of the PostgreSQL database
- Backups retained for 30 days
- Point-in-time recovery enabled for production environment

### Failure Recovery
- Database connections use connection pooling to handle failures gracefully
- Alembic rollback strategy in place for failed migrations
- Health checks monitor database availability

## 2.22 Database Indexes

PymeBoost indexing strategy optimizes for the most frequent queries and filters defined by the business logic in the Matching, Communication, and Project domains.

### Index Specification by Domain

#### User Domain

```sql
-- Fast email lookups for authentication (login every request)
CREATE INDEX idx_users_email ON users(email);

-- Fast session retrieval by user (JWT validation on every request)
CREATE INDEX idx_sessions_user_id ON sessions(user_id);

-- Clean up expired sessions (background job)
CREATE INDEX idx_sessions_expires_at ON sessions(expires_at) 
  WHERE expires_at > NOW();
```

#### Pyme Domain

```sql
-- Fast PYME lookup by user (one-to-one relationship)
CREATE INDEX idx_pymes_user_id ON pymes(user_id);

-- Fast industry filtering (used in discovery service)
CREATE INDEX idx_pymes_industry ON pymes(industry);

-- Retrieve optimization areas per PYME
CREATE INDEX idx_optimization_areas_pyme_id ON optimization_areas(pyme_id);
```

#### Advisor Domain

```sql
-- Fast advisor lookup by user
CREATE INDEX idx_advisors_user_id ON advisors(user_id);

-- Fast reputation lookup (used in matching scoring)
CREATE INDEX idx_reputations_advisor_id ON reputations(advisor_id);

-- Fast specialization lookup for matching
CREATE INDEX idx_specializations_advisor_id ON specializations(advisor_id);

-- Filter advisors by industry (discovery service)
CREATE INDEX idx_specializations_industry ON specializations(industry);
```

#### Matching Domain

```sql
-- Fast match retrieval for a PYME
CREATE INDEX idx_matches_pyme_id ON matches(pyme_id);

-- Fast match retrieval for an advisor
CREATE INDEX idx_matches_advisor_id ON matches(advisor_id);

-- Filter matches by status (active, finalized, cancelled)
CREATE INDEX idx_matches_status ON matches(status);

-- Prevent duplicate swipes
CREATE UNIQUE INDEX idx_swipes_unique_pair ON swipes(pyme_id, advisor_id);
```

#### Communication Domain

```sql
-- Fast chat session lookup for a match
CREATE INDEX idx_chat_sessions_match_id ON chat_sessions(match_id);

-- Fast message retrieval by session (pagination)
CREATE INDEX idx_messages_session_id ON messages(session_id, sent_at DESC);

-- Count unread messages (notification badge)
CREATE INDEX idx_messages_session_read_status ON messages(session_id, read) 
  WHERE read = false;
```

#### Contract Domain

```sql
-- Fast contract lookup for a match
CREATE INDEX idx_contracts_match_id ON contracts(match_id);

-- Filter contracts by status (used in dashboards)
CREATE INDEX idx_contracts_status ON contracts(status);

-- Retrieve negotiations for a contract
CREATE INDEX idx_negotiations_contract_id ON negotiations(contract_id);
```

#### Project Domain

```sql
-- Fast project lookup for a contract (one-to-one)
CREATE UNIQUE INDEX idx_projects_contract_id ON projects(contract_id);

-- Fast milestone retrieval by project (timeline views)
CREATE INDEX idx_milestones_project_id ON milestones(project_id);

-- Fast completion status check (health monitoring)
CREATE INDEX idx_milestones_completed ON milestones(project_id, completed);

-- Fast health lookup
CREATE INDEX idx_project_health_project_id ON project_health(project_id);

-- Sort milestones by due date
CREATE INDEX idx_milestones_due_date ON milestones(project_id, due_date ASC);
```

#### Review Domain

```sql
-- Retrieve all reviews for an advisor (reputation calculation)
CREATE INDEX idx_reviews_subject_id ON reviews(subject_id);

-- Retrieve reviews left by a user
CREATE INDEX idx_reviews_reviewer_id ON reviews(reviewer_id);
```

#### Notification Domain

```sql
-- Fast notification retrieval for a user (feed pagination)
CREATE INDEX idx_notifications_user_id ON notifications(user_id, created_at DESC);

-- Count unread notifications (badge)
CREATE INDEX idx_notifications_read_status ON notifications(user_id, read) 
  WHERE read = false;
```

### Index Maintenance

Run monthly index review:

```bash
# Find unused indexes
SELECT schemaname, tablename, indexname, idx_scan
FROM pg_stat_user_indexes
WHERE idx_scan = 0
ORDER BY idx_used DESC;

# Check index size
SELECT indexname, pg_size_pretty(pg_relation_size(indexrelid)) AS size
FROM pg_stat_user_indexes
ORDER BY pg_relation_size(indexrelid) DESC;
```

---

## 2.23 Database Design Validation Tools

### SQLCheck for Schema Linting

Install and run schema validation:

```bash
# Install
brew install sqlcheck  # macOS

# Validate schema
sqlcheck -i < backend/shared/database/migrations/schema.sql
```

### Query Performance Analysis

For critical queries, use EXPLAIN ANALYZE:

```bash
# Connect to database
psql $DATABASE_URL

# Analyze matching query (get_advisor_matches_controller.py)
EXPLAIN ANALYZE
SELECT m.id, m.pyme_id, m.advisor_id, m.status
FROM matches m
WHERE m.pyme_id = 'pyme-123' AND m.status IN ('ACTIVE', 'FINALIZED')
ORDER BY m.created_at DESC;

# Check for Index Scan (good) vs Seq Scan (bad)
```

### Data Quality Checks (Post-Migration)

Run after every migration to ensure data integrity:

```sql
-- Check for orphaned foreign keys
SELECT * FROM matches m
WHERE NOT EXISTS (SELECT 1 FROM pymes p WHERE p.id = m.pyme_id);

-- Check for duplicate swipes
SELECT pyme_id, advisor_id, COUNT(*) as cnt
FROM swipes
GROUP BY pyme_id, advisor_id
HAVING COUNT(*) > 1;

-- Verify reputation scores are within bounds (1.0 - 5.0)
SELECT advisor_id, score FROM reputations
WHERE score < 1.0 OR score > 5.0;
```

### CI/CD Validation

Add to `.github/workflows/backend-ci.yml`:

```yaml
- name: Validate Database Schema
  run: |
    sqlcheck -i < backend/shared/database/migrations/schema.sql > schema_report.txt
    if grep -q "Error:" schema_report.txt; then
      echo "Schema validation failed"
      cat schema_report.txt
      exit 1
    fi
```

---

## 2.24 Caching Strategy (Redis)

Redis caches frequently accessed data to reduce database load. All cache data is ephemeral—if Redis is lost, the application continues with database queries.

### Cache Key Patterns

#### Session Cache (User Domain)

**Key Pattern:** `session:{user_id}`

**TTL:** 10800 seconds (3 hours)

**Use Case:** JWT validation and user context on every request

```json
{
  "user_id": "user-abc-123",
  "email": "user@empresa.cr",
  "account_type": "pyme",
  "verified": true,
  "created_at": "2026-06-01T10:00:00Z"
}
```

**Invalidation:**
- Manual on logout (session_cache_service.py)
- Automatic after 3 hours

#### JWKS Cache (Auth0 Public Keys)

**Key Pattern:** `jwks:{auth0_domain}`

**TTL:** 10800 seconds (3 hours)

**Use Case:** JWT signature validation without hitting Auth0 every request

```json
{
  "keys": [
    {
      "kty": "RSA",
      "use": "sig",
      "kid": "abc123",
      "n": "...",
      "e": "AQAB",
      "alg": "RS256"
    }
  ],
  "cached_at": "2026-06-12T11:30:00Z"
}
```

**Invalidation:**
- Automatic after 3 hours
- Manual on Auth0 certificate rotation

#### Advisor Profile Cache (Advisor Domain)

**Key Pattern:** `advisor_profile:{advisor_id}`

**TTL:** 86400 seconds (24 hours)

**Use Case:** Frequently accessed during swipe operations (matching_card.tsx)

```json
{
  "advisor_id": "adv-1",
  "full_name": "Mariana Solís",
  "base_rate": 150000,
  "reputation_score": 4.8,
  "industries": ["Marketing Digital", "E-commerce"],
  "specializations": [...]
}
```

**Invalidation:**
- Manual when profile updated (update_advisor_profile_controller.py)
- Manual when reputation changes (reputation_service.py)
- Automatic after 24 hours

#### Recommendation Cache (Pyme Domain)

**Key Pattern:** `recommendations:{pyme_id}`

**TTL:** 86400 seconds (24 hours)

**Use Case:** Caches expensive AI-generated advisor recommendations

```json
{
  "pyme_id": "pyme-123",
  "recommendation_list": [
    {
      "advisor_id": "adv-1",
      "name": "Mariana Solís",
      "match_score": 0.92,
      "base_rate": 150000
    }
  ],
  "generated_at": "2026-06-12T08:00:00Z"
}
```

**Invalidation:**
- Manual when advisor industry changes
- Manual when PYME optimization areas updated
- Automatic after 24 hours

### Cache-Aside Pattern

All caches follow this pattern:

1. Check Redis for key
2. If hit: return immediately
3. If miss: query database, cache result, return value
4. On expiration: key deleted automatically

**Python Implementation (session_cache_service.py):**

```python
async def get_session(self, user_id: str):
    cache_key = f"session:{user_id}"
    cached = await self.redis.get(cache_key)
    
    if cached:
        return json.loads(cached)  # Cache hit
    
    # Cache miss — query database
    session = await self.session_repository.get(user_id)
    
    if session:
        await self.redis.setex(
            cache_key,
            10800,  # 3 hours
            json.dumps(session.dict())
        )
    
    return session
```

### Redis Configuration

From `config.py`:

```python
REDIS_URL: str = ""  # redis://localhost:6379/0 (set in .env)
```

**Expected format:** `redis://[user:password]@localhost:6379/0`

For production: Redis instance with HA should be used (Cloud Memorystore on GCP recommended).

---

## 2.25 Database Seeding

### Seed Script Location

**File:** `backend/shared/database/seeders/`

All environments use the same seeding approach, with data size varying by environment:

- **Development:** Full dataset (6 users, 3 PYMEs, 3 advisors, realistic matches)
- **Staging:** Production-like subset (same structure, smaller scale)
- **Testing:** Minimal data for test isolation

### Usage

```bash
# Seed development database with test data
python -m backend.shared.database.seeders.seed_all --env development

# Seed staging database
python -m backend.shared.database.seeders.seed_all --env staging

# Seed test database (minimal)
python -m backend.shared.database.seeders.seed_all --env test
```

### Seed Data Includes

**Users:** 3 PYMEs + 3 Advisors with Auth0 integration  
**Industries:** 8 industry categories  
**PYME Profiles:** Company names, industries, optimization areas  
**Advisor Profiles:** Full names, base rates, specializations, reputation scores  
**Matches:** Multiple PYME-Advisor pairs with different statuses  
**Swipes:** Approval decisions  
**Communications:** Chat sessions with sample messages  
**Notifications:** User notification preferences  

### Idempotency

All seed scripts are idempotent—safe to run multiple times. They:
- Check for existing data before inserting
- Use UUID generation for IDs
- Skip if records already exist

---

## 2.26 Migration Strategy and Rollback

### Alembic Configuration

Located at: `backend/shared/database/migrations/`

**Commands:**

```bash
cd backend

# Generate new migration after model changes
alembic revision --autogenerate -m "add_new_feature"

# Apply all pending migrations
alembic upgrade head

# Rollback one migration
alembic downgrade -1

# View migration history
alembic history

# Check current revision
alembic current
```

### Migration Workflow

#### 1. Create Migration

After changing a SQLAlchemy model:

```bash
alembic revision --autogenerate -m "descriptive_name"
```

Creates file: `migrations/versions/{timestamp}_{description}.py`

#### 2. Review Migration

Always review auto-generated migrations:

```python
# Check that:
# CREATE/ALTER statements are correct
# Indexes are added for new columns
# Foreign keys are explicit
# Downgrade function is the exact inverse
```

#### 3. Test Migration

Test locally before pushing:

```bash
# Upgrade
alembic upgrade +1

# Verify schema change
psql $DATABASE_URL -c "\d table_name"

# Rollback
alembic downgrade -1

# Verify rollback worked
psql $DATABASE_URL -c "\d table_name"
```

#### 4. Deploy

CI/CD runs migrations automatically on deploy:

```yaml
# From .github/workflows/deploy-backend.yml
- name: Run Database Migrations
  run: |
    alembic upgrade head
```

### Rollback Strategy

#### Quick Rollback (< 5 minutes)

If migration causes immediate issues:

```bash
# Identify current revision
alembic current

# Rollback one step
alembic downgrade -1

# Verify
alembic current
```

#### Emergency Rollback (data-safe)

If migration affected data:

1. **Backup production database** (GCP Cloud SQL automated backups)
2. **Downgrade schema:**
   ```bash
   alembic downgrade -1
   ```
3. **Restore data from backup** (point-in-time recovery via GCP)
4. **Fix migration code** and reapply

### Migration Naming Convention

**Format:** `{revision_id}_{timestamp}_{description}.py`

Examples:
- `001_2026_06_12_create_user_domain.py`
- `002_2026_06_12_create_advisor_domain.py`
- `003_2026_06_13_add_advisor_promises.py`

### Database Connection Details

**From config.py:**

```python
DATABASE_URL: str = ""  # postgresql://user:password@host:5432/pymeboost
DATABASE_POOL_SIZE: int = 5
```

**Connection pooling:**
- Pool size: 5 (default, configurable)
- Max overflow: 10
- Pool timeout: 30 seconds
- Pool recycle: 3600 seconds (1 hour)

**Critical:** Keep `DATABASE_POOL_SIZE` low in development to catch connection leaks early.

### Testing Strategy for Migrations

Create test migrations before production deploy:

```bash
# Create test database from staging
pg_dump production_db | psql test_db

# Run migration on test database
DATABASE_URL=postgresql://test:test@localhost/test_db alembic upgrade head

# Run data validation checks
bash backend/scripts/validate_database.sh

# If passes, safe to deploy to production
```

### Performance Considerations

Migrations that may cause downtime:

- Adding `NOT NULL` column without default (use `DEFAULT` clause)
- Renaming large tables (use change tracking instead)
- Full table rewrites during ALTER TABLE
- Adding nullable columns
- Adding indexes with `CONCURRENTLY`
- Dropping unused indexes

**Example: Safe NOT NULL column addition**

```python
# Good: Add with default, then remove default later
def upgrade():
    op.add_column('users', sa.Column('phone', sa.String, nullable=False, server_default=''))
    op.alter_column('users', 'phone', server_default=None)

def downgrade():
    op.drop_column('users', 'phone')
```

### Monitoring Post-Migration

After production migration, monitor:

- Database connection count (should remain stable)
- Query latency (should not spike)
- Error rate (should not increase)
- Disk usage (should increase only by new data)

Use Cloud SQL monitoring dashboard on GCP to verify.

---

# Agents

PymeBoost uses specialized AI agents as quality validators during development. Every agent follows the **RICO format** (Role, Instructions, Context, Output) and is run via **Claude Code**. All agents are grounded in this README — evaluations reference the architecture, layer rules, and design patterns documented here.

Agents are run before committing each feature. Findings and corrections are documented below under "Agent Validations".


## Agent Catalog

| Agent | File | Purpose | Applies to |
|-------|------|---------|------------|
| **SOLID Validator** | [.agents/solid-agent.md](.agents/solid-agent.md) | Detects violations of all 5 SOLID principles | Frontend + Backend |
| **DRY Validator** | [.agents/dry-agent.md](.agents/dry-agent.md) | Detects duplicated logic, structure, types, and UI patterns | Frontend + Backend |
| **Cohesion Validator** | [.agents/cohesion-agent.md](.agents/cohesion-agent.md) | Classifies cohesion level and detects low-cohesion modules | Frontend + Backend |
| **Architecture Validator** | [.agents/architecture-agent.md](.agents/architecture-agent.md) | Validates code matches the documented architecture in this README | Frontend + Backend |
| **Frontend Agent** | [.agents/frontend-agent.md](.agents/frontend-agent.md) | Generates and reviews React components, hooks, services, and stores | Frontend only |
| **Backend Agent** | [.agents/backend-agent.md](.agents/backend-agent.md) | Generates and reviews FastAPI controllers, services, repositories, and schemas | Backend only |
| **Database Agent** | [.agents/database-agent.md](.agents/database-agent.md) | Validates SQLAlchemy models, Alembic migrations, indexes, and seed data | Backend only |
| **Testing Agent** | [.agents/testing-agent.md](.agents/testing-agent.md) | Generates and reviews Vitest, Playwright, and Pytest tests | Frontend + Backend |

---

## How to Run an Agent

All agents are run in Claude Code using this pattern:

```
Read .agents/[agent-name].md and [action] the following [code type] from the [feature/domain]:

[paste code here]
```

For the full command reference per agent and use case, see [.agents/agents&mvpformat.md](.agents/agents&mvpformat.md).

---

## Agent Validations

Every time an agent is used during MVP development, findings and corrections are documented here. This section is organized by feature.

---

### Feature: Auth (Login / Register)

> _No validations recorded yet — will be added during MVP development._

---

### Feature: Matching (Advisor Cards)

> _No validations recorded yet — will be added during MVP development._

---

### Feature: Messaging (Chat)

> _No validations recorded yet — will be added during MVP development._

---

### Feature: Contracts (Negotiation)

> _No validations recorded yet — will be added during MVP development._

---

### Feature: Dashboard (Tracking)

> _No validations recorded yet — will be added during MVP development._

---

### Feature: Reports

> _No validations recorded yet — will be added during MVP development._

---

### Validation Entry Format

Each validation entry must follow this format:

```markdown
#### [Agent Name] Analysis
- **File analyzed:** `[path/to/file]`
- **Finding:** [Short description of what the agent found]
- **Suggested Correction:** [What the agent recommended]
- **Applied Correction:** ✅ [What was actually changed] — commit [hash]
```

---

# MVP
