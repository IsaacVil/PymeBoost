# PymeBoost - Agents and MVP Development

## Overview

This document describes the process of building **Development Agents** (code validators) and then the **MVP** (Minimum Viable Product).

**Critical order:** First agents → Then MVP.

---

## Phase 1: Specialized Agents (1-2 weeks)

Agents are AI assistants that validate and review your code during development. They are created BEFORE the MVP.

### Required Agents (8 total)

#### 1. **SRP Validator** (Single Responsibility Principle)
- **Purpose:** Detects classes/components with multiple responsibilities
- **File:** `.agents/srp-agent.md`
- **Input:** TypeScript/React code
- **Output:** Findings + suggested refactoring

#### 2. **DRY Validator** (Don't Repeat Yourself)
- **Purpose:** Detects duplicated code
- **File:** `.agents/dry-agent.md`
- **Input:** Code with possible duplicates
- **Output:** Refactored code + reusable functions

#### 3. **SOLID Validator**
- **Purpose:** Validates all 5 SOLID principles
- **File:** `.agents/solid-agent.md`
- **Input:** Classes/services
- **Output:** Violations detected + corrections

#### 4. **Architecture Validator**
- **Purpose:** Validates that code matches documented architecture
- **File:** `.agents/architecture-agent.md`
- **Reviews:** Correct layers, separation of concerns, gaps between design and implementation
- **Input:** Complete feature or module
- **Output:** Deviations found + how to fix them

#### 5. **Frontend Agent**
- **Purpose:** Validates React components, state management, responsive design
- **File:** `.agents/frontend-agent.md`
- **Reviews:** Component structure, correct hooks, TailwindCSS, accessibility
- **Input:** React components
- **Output:** Suggested improvements

#### 6. **Backend Agent**
- **Purpose:** Validates endpoints, data validation, security
- **File:** `.agents/backend-agent.md`
- **Reviews:** DTOs with Zod, error handling, middlewares, authentication
- **Input:** Controllers/services
- **Output:** Vulnerabilities + improvements

#### 7. **Database Agent**
- **Purpose:** Validates relational/NoSQL design, indexes, integrity
- **File:** `.agents/database-agent.md`
- **Reviews:** Database schema, relationships, normalization
- **Input:** DBML schema or SQL
- **Output:** Design problems + optimizations

#### 8. **Testing Agent**
- **Purpose:** Generates unit tests, validates coverage
- **File:** `.agents/testing-agent.md`
- **Reviews:** Test coverage, edge cases, integration
- **Input:** Function/component to test
- **Output:** Generated tests + validation

### Agents Folder Structure

```
PymeBoost/
├── .agents/
│   ├── srp-agent.md
│   ├── dry-agent.md
│   ├── solid-agent.md
│   ├── architecture-agent.md
│   ├── frontend-agent.md
│   ├── backend-agent.md
│   ├── database-agent.md
│   └── testing-agent.md
├── src/
└── README.md
```

### Standard Format for Each Agent: RICO

Each agent follows the **RICO** method (Role, Instructions, Context, Output):

```markdown
## [AGENT NAME]

### Role
[Who you are and what expertise you have]

### Instructions
1. [Specific step 1]
2. [Specific step 2]
3. [Specific step 3]
[... more steps]

### Context
[Describe what type of input context you need the agent to know, and what code or information should be provided]

### Output
[Describe exactly what you will deliver as output]
```

### How to Create an Agent (Example: SRP)

```markdown
## SRP VALIDATOR - Single Responsibility Principle

### Role
You are an expert in software architecture specializing in the Single Responsibility Principle (SRP).
Your role is to analyze TypeScript/React code and identify classes/components that violate SRP.
Each class should have ONE single reason to change.

### Instructions
1. **Examine the provided class/component**
   - Identify all responsibilities it has
   - Mark each method and property with its associated responsibility
   - Note if there are methods that could belong to another class

2. **Detect SRP violations**
   - Does the class have more than one reason to change?
   - Does it mix business logic with UI?
   - Does it mix API communication with state logic?

3. **Provide detailed analysis**
   - List each responsibility found
   - Explain why it violates SRP
   - Cite specific lines of code

4. **Suggest refactoring**
   - Propose new classes for each responsibility
   - Specify what methods go to each class
   - Show how dependencies between classes would look

5. **Generate refactored code**
   - Write the code split across multiple classes
   - Ensure each class has ONE responsibility
   - Include instantiation/usage examples

### Context
- TypeScript/React source code (complete or partial)
- Classes, services, React components, custom hooks
- Can be any size (from 20 lines to 500+)

### Output
```markdown
## SRP Analysis: [Class Name]

### Findings
- **Responsibility 1:** [Description] (lines X-Y)
- **Responsibility 2:** [Description] (lines Z-A)
- **Violation:** [Clear explanation of why it violates SRP]

### Suggested Corrections
- **New class:** `[Name1]`
  - Methods: [list]
  - Purpose: [1 line]

- **New class:** `[Name2]`
  - Methods: [list]
  - Purpose: [1 line]

- **Original class (refactored):** `[Original Name]`
  - Keeps: [method list]
  - Delegates to: [class list]

### Refactored Code
[Complete code split across new classes]

### Benefits
- Better testability
- Lower coupling
- Easier to maintain
- Complies with SRP
```
```

---

## Documentation of Agent Usage

Every time you use an agent during development, document it:

### Entry in README.md

```markdown
## Agent Validations

### Feature: [Feature Name]

#### SRP Analysis
- **Finding:** MatchingService had 3 responsibilities
- **Suggested Correction:** Separate into MatchingCalculator + ReportGenerator
- **Applied Correction:** ✅ Refactored in commit [hash]

#### SOLID Analysis
- **Finding:** Dependency Inversion violation
- **Suggested Correction:** Inject dependencies
- **Applied Correction:** ✅ DI implemented in services

[... more validations ...]
```

---

## Phase 2: MVP 
The MVP is the functional product you will demonstrate. It is built AFTER the agents are ready.

### MVP Scope

**Core Features (Mandatory):**
- PYME and Advisor registration (simulated validation, no real MEIC)
- Intelligent matching (Tinder-like card system)
- Messaging between PYME and advisor
- Contract negotiation (Negotiate Tariff)
- Contract formalization (Marry the Prospect)
- Basic tracking dashboard
- Simple reports per phase

**Out of Scope:**
- Real MEIC validation
- Advanced AI (use mocks)
- Real payments
- Multiple simultaneous contracts
- Complex secondary processes

### MVP Development Flow with Agents

```
For each Feature:
  1. Write the code (component, service, etc)
  2. Run agent: "Review SOLID Principles"
  3. Agent reports findings
  4. Apply suggested corrections
  5. Document findings + corrections in README.md
  6. Commit validated code
  7. Move to next feature
```

### MVP Features (Development Order)

| # | Feature | Agents to Use | Time |
|---|---------|----------------|----|
| 1 | Auth (Login/Register) | SOLID, Architecture, Frontend | 3 days |
| 2 | Matching (Advisor Cards) | SOLID, Frontend, DRY | 5 days |
| 3 | Messaging (Basic Chat) | SOLID, Frontend, Architecture | 4 days |
| 4 | Contracts (Negotiation) | SOLID, Backend, Architecture | 5 days |
| 5 | Dashboard (Tracking) | Frontend, DRY, Architecture | 4 days |
| 6 | Reports (Simple Reports) | Backend, Database, Testing | 3 days |
| 7 | Testing & Integration | Testing Agent | 2 days |

### MVP Requirements

Run completely in local environment  
Follow documented architecture in README.md  
Code validated by agents  
Tests for critical functionalities  
README.md documents execution in section MVP:
   - How to run Frontend
   - How to run Backend
   - How to run Database/Data Layer
   - Required environment variables
   - Required dependencies
   - Data initialization procedure

---

## Checklist: Before Starting

### Agents Preparation
- [ ] 8 agents created in `.agents/`
- [ ] Each agent has standard RICO format
- [ ] Agents documented in README.md
- [ ] Team understands how to use them

### MVP Preparation
- [ ] Technology stack confirmed (React 19, Next.js 15, TypeScript, etc)
- [ ] Feature-Based architecture defined
- [ ] `/src` folder structure ready
- [ ] README.md with "Agents" section complete
- [ ] Local database configured (SQLite, PostgreSQL, MongoDB)
- [ ] Environment variables (.env.example) defined

---

## Commands to Use Agents (During MVP)

Agents are run via **Claude Code** slash commands. They are configured in `.claude/commands/` and accept a file path directly — no copy-pasting code needed.

### How to run an agent in Claude Code

1. Open Claude Code in your terminal or VS Code extension
2. Type the slash command followed by the file path (see patterns below)
3. Claude reads the file automatically via the `$ARGUMENTS` pattern and applies the RICO format
4. Document findings and corrections in README.md under the "Agent Validations" section

---

### Agent Command Reference

#### Design Principle Agents

**SOLID Validator** — Detects violations of all 5 SOLID principles in FE or BE code
```
/solid-validator <path/to/file.ts>
```
Example:
```
/solid-validator frontend/src/features/matching/hooks/useAdvisorMatching.ts
```

---

**DRY Validator** — Detects duplicated logic across one or two files
```
/dry-validator <path1.ts> <path2.ts>
```
Example (single file):
```
/dry-validator frontend/src/features/matching/services/matchingService.ts
```
Example (cross-file comparison):
```
/dry-validator frontend/src/features/matching/services/matchingService.ts frontend/src/features/messaging/services/messagingService.ts
```

---

**Cohesion Validator** — Classifies and evaluates the cohesion level of a module
```
/cohesion-validator <path/to/file.ts>
```
Example:
```
/cohesion-validator frontend/src/features/matching/hooks/useAdvisorMatching.ts
```

---

#### Architecture Agent

**Architecture Validator** — Validates that code matches the documented architecture in README.md
```
/architecture-validator <path/to/file.ts>
```
Example (single file):
```
/architecture-validator frontend/src/features/matching/hooks/useAdvisorMatching.ts
```
Example (full feature — pass all files as arguments):
```
/architecture-validator frontend/src/features/matching/page.tsx frontend/src/features/matching/hooks/useAdvisorMatching.ts frontend/src/features/matching/services/matchingService.ts
```

---

#### Technical Agents

**Frontend Agent** — Generates or reviews React components, hooks, services, and stores

Review existing file (pass file path):
```
/frontend-agent <path/to/file.tsx>
```
Example:
```
/frontend-agent frontend/src/features/matching/components/MatchingCard.tsx
```

Generate new code (describe what to build — no file path):
```
/frontend-agent generate a [Primitive/Compound/Container/Hook/Service] for the [feature] feature. It should: [description]
```

---

**Backend Agent** — Generates or reviews FastAPI controllers, services, repositories, models, schemas, and events

Review existing file (pass file path):
```
/backend-agent <path/to/file.py>
```
Example:
```
/backend-agent backend/domains/matching/services/matching_service.py
```

Generate new code (describe what to build — no file path):
```
/backend-agent generate a [controller/service/repository/model/schema/event] for the [domain] domain. Use case: [description]
```

---

**Database Agent** — Validates SQLAlchemy models, Alembic migrations, indexes, and seed data

Review existing file (pass file path):
```
/database-agent <path/to/model.py>
```
Example:
```
/database-agent backend/domains/matching/models/match_model.py
```

Design a new table (describe — no file path):
```
/database-agent design the SQLAlchemy model and Alembic migration for a new table in the [domain] domain: [description of fields and relationships]
```

---

**Testing Agent** — Generates or reviews tests (Vitest, Playwright, Pytest)

Generate tests for a source file (pass source file path):
```
/testing-agent <path/to/source.ts>
```
Example:
```
/testing-agent frontend/src/features/matching/hooks/useAdvisorMatching.ts
```

Review an existing test file (pass test file path):
```
/testing-agent <path/to/test.spec.ts>
```
Example:
```
/testing-agent frontend/src/tests/features/matching.spec.ts
```

---

### Recommended Agent Combination per MVP Feature

| Feature | Run these agents in order |
|---------|--------------------------|
| Auth (Login/Register) | `/architecture-validator` → `/solid-validator` → `/frontend-agent` → `/testing-agent` |
| Matching (Advisor Cards) | `/solid-validator` → `/dry-validator` → `/frontend-agent` → `/backend-agent` → `/testing-agent` |
| Messaging (Chat) | `/cohesion-validator` → `/architecture-validator` → `/frontend-agent` → `/backend-agent` → `/testing-agent` |
| Contracts (Negotiation) | `/solid-validator` → `/architecture-validator` → `/backend-agent` → `/database-agent` → `/testing-agent` |
| Dashboard (Tracking) | `/dry-validator` → `/cohesion-validator` → `/frontend-agent` → `/testing-agent` |
| Reports | `/backend-agent` → `/database-agent` → `/testing-agent` |

### Workflow per feature (using Claude Code)

```
For each feature:
  1. Write the initial code (component, service, hook, controller, etc.)
  2. Run: /architecture-validator <file> → verify layer rules
  3. Run: /solid-validator <file> → verify design principles
  4. Run: /dry-validator <file> or /cohesion-validator <file> → verify quality
  5. Run: /frontend-agent <file> or /backend-agent <file> → review generated code
  6. Run: /testing-agent <file> → generate tests for the source file
  7. Apply all suggested corrections
  8. Document findings + corrections in README.md under "Agent Validations"
  9. Commit validated code
```

---

## Skills

Skills are specialized built-in capabilities of Claude Code invoked with `/skill-name`, plus installable external skills from GitHub. Unlike agents (which you run manually by passing code), skills operate automatically over the current branch diff or the running app — no copy-pasting needed.

Skills and agents are complementary: **agents validate design principles with README context**, **skills catch bugs, enforce quality, and verify behavior automatically**.

### Installation

The external frontend-design skill must be installed once before use:

```bash
npx skills add https://github.com/anthropics/skills --skill frontend-design
```

Built-in skills (`/code-review`, `/simplify`, `/verify`, `/run`, `/security-review`) are available in Claude Code with no installation required.

---

### Skill Reference

#### `/code-review` — Automatic diff review for bugs and quality
Scans everything changed in the current branch. Does not need code pasted — reads the diff automatically.

| Variant | Command | When to use |
|---------|---------|-------------|
| Standard | `/code-review` | After applying agent corrections — catch bugs agents don't look for |
| Fix mode | `/code-review --fix` | Apply the findings directly to the working tree |
| PR comments | `/code-review --comment` | Post findings as inline comments on the GitHub PR |
| Deep (cloud) | `/code-review ultra` | Final review before demo — multi-agent, most thorough |

---

#### `/simplify` — Code simplification and cleanup
Looks for reuse, simplification, and efficiency in changed code and applies the fixes. Quality only — does not hunt for bugs.

| When to use |
|-------------|
| After `dry-agent` finds duplication — `/simplify` applies the consolidation |
| After any refactoring pass to remove leftover complexity |

---

#### `/verify` — Confirm a change works in the real app
Runs the app and observes actual behavior to validate that a feature works end-to-end.

| When to use |
|-------------|
| After applying agent corrections — confirm nothing broke visually |
| After `testing-agent` generates tests — verify the flow in the running app too |

---

#### `/run` — Launch the project locally
Detects the project type (Next.js frontend, FastAPI backend) and starts it locally.

| When to use |
|-------------|
| Before the demo — confirm MVP runs cleanly |
| After a backend or DB change — verify the server starts without errors |

---

#### `/security-review` — Security-focused diff review
Deep analysis of the diff for security vulnerabilities. Complements the `backend-agent`'s OWASP rules with a broader automated scan.

| When to use |
|-------------|
| Before any PR that touches auth, JWT, contracts, or messaging |
| After backend agent flags a security concern — get a second pass |

---

#### `frontend-design` (external skill) — UI and design system review
Installed via `npx skills add https://github.com/anthropics/skills --skill frontend-design`. Reviews frontend components for design quality, accessibility, and visual consistency.

| When to use |
|-------------|
| After `frontend-agent` generates a component — validate it against design system |
| Before demo — review all screens for visual consistency |

---

### Recommended Skill + Agent Combination per MVP Feature

| Feature | Agents (design & architecture) | Skills (quality & verification) |
|---------|-------------------------------|--------------------------------|
| Auth | `architecture-agent` → `solid-agent` → `frontend-agent` | `/code-review` → `/security-review` → `/verify` |
| Matching | `solid-agent` → `dry-agent` → `frontend-agent` | `/simplify` → `frontend-design` → `/verify` |
| Messaging | `cohesion-agent` → `architecture-agent` → `backend-agent` | `/code-review` → `/security-review` → `/verify` |
| Contracts | `solid-agent` → `backend-agent` → `database-agent` | `/code-review --fix` → `/security-review` → `/verify` |
| Dashboard | `dry-agent` → `frontend-agent` | `/simplify` → `frontend-design` → `/verify` |
| Reports | `backend-agent` → `database-agent` → `testing-agent` | `/code-review` → `/verify` |
| Final demo | — | `/code-review ultra` → `/run` |

---

## Recommended Timeline

| Week | Phase | Deliverables |
|------|-------|------------|
| 1 | Agents | 8 agents in `.agents/` |
| 1-2 | MVP Setup | Repo + structure + local database |
| 2-3 | MVP Feature 1-2 | Auth + Matching (with validations) |
| 3-4 | MVP Feature 3-4 | Messaging + Contracts (with validations) |
| 4-5 | MVP Feature 5-6 | Dashboard + Reports (with validations) |
| 5-6 | Testing | Critical tests + final documentation |
| 6 | Demo | MVP running locally + presentation |

---

## Agent & Skill Smoke Tests

Use these tests to verify that every agent and skill is working correctly before starting MVP development. Each test specifies the exact command to run and the file referenced.

**How to run:** Type the command in Claude Code — the agent reads the file automatically via the `$ARGUMENTS` pattern. No copy-pasting code needed. A passing test produces structured output matching the expected format — if Claude gives a generic response or says "no code found", check that the file path is correct.

---

### Agents

---

#### `/solid-validator` — SOLID Validator

**Type:** Review only

**Command:**
```
/solid-validator frontend/src/features/matching/hooks/useAdvisorMatching.ts
```

The agent reads `useAdvisorMatching.ts` automatically and analyzes it against all 5 SOLID principles.

**Expected output:** A report structured by S / O / L / I / D with ✅ / ⚠️ / ❌ status per principle, severity ratings, specific line references, and corrected code for any violations found.

---

#### `/dry-validator` — DRY Validator

**Type:** Review only — pass two file paths for cross-file comparison

**Command:**
```
/dry-validator frontend/src/features/matching/services/matchingService.ts frontend/src/features/messaging/services/messagingService.ts
```

The agent reads both files automatically via `$ARGUMENTS` and compares them for DRY violations.

**Expected output:** A list of duplicated patterns found across both files, with a proposed shared abstraction and refactored code.

---

#### `/cohesion-validator` — Cohesion Validator

**Type:** Review only

**Command:**
```
/cohesion-validator frontend/src/features/matching/hooks/useAdvisorMatching.ts
```

The agent reads `useAdvisorMatching.ts` automatically and classifies its cohesion level.

**Expected output:** A cohesion classification (Functional / Sequential / Communicational / Logical / Coincidental) with justification and specific findings for each responsibility detected in the module.

---

#### `/architecture-validator` — Architecture Validator

**Type:** Review only — pass multiple file paths for full-feature validation

**Command:**
```
/architecture-validator frontend/src/features/matching/page.tsx frontend/src/features/matching/hooks/useAdvisorMatching.ts frontend/src/features/matching/services/matchingService.ts
```

The agent reads all three files via `$ARGUMENTS` and validates the full matching feature layer by layer.

**Expected output:** A layer-by-layer validation against the README architecture rules, flagging any violations (e.g. service calling fetch directly, hook importing from another feature, page containing business logic).

---

#### `/frontend-agent` — Frontend Agent

**Type:** Generates code + Reviews existing code

---

**Test A — Generate (no file path — describe what to build):**

**Command:**
```
/frontend-agent generate a Primitive component for the matching feature. It should display a single advisor card with: full name, specialization list, base rate (formatted as ₡ currency), and reputation score as stars. It receives all data via props — no API calls.
```

**Expected output:** A complete `.tsx` file following PymeBoost's design system (TailwindCSS tokens, Heroicons, Radix UI), TypeScript props interface, no internal state, no service calls, and a usage example.

---

**Test B — Review (pass file path):**

**Command:**
```
/frontend-agent frontend/src/features/matching/components/MatchingCard.tsx
```

The agent reads `MatchingCard.tsx` automatically and reviews it as an existing file.

**Expected output:** Architecture checklist (layer rules, cross-feature imports, API calls, Zod validation, TailwindCSS, naming, accessibility, TypeScript), design patterns matrix, and a numbered issues table with severity and fixes.

---

#### `/backend-agent` — Backend Agent

**Type:** Generates code + Reviews existing code

---

**Test A — Generate (no file path — describe what to build):**

**Command:**
```
/backend-agent generate a controller for the matching domain. Use case: create a swipe decision (approved or rejected) for a given pyme_id and advisor_id. The controller should validate input with Pydantic, delegate to MatchingService, and publish a MatchSwiped event on success.
```

**Expected output:** A complete FastAPI controller file with Pydantic request schema, dependency injection, service delegation, event publishing, and correct HTTP status codes. No business logic in the controller.

---

**Test B — Review (pass file path):**

**Command:**
```
/backend-agent backend/domains/matching/services/matching_service.py
```

The agent reads `matching_service.py` automatically and reviews it against backend layer rules.

**Expected output:** Layer rule checklist (no direct DB access, uses repositories, returns DTOs, publishes events), OWASP security checks, and a findings table with severity and corrections.

---

#### `/database-agent` — Database Agent

**Type:** Designs new tables + Reviews existing models

---

**Test A — Design (no file path — describe what to build):**

**Command:**
```
/database-agent design the SQLAlchemy model and Alembic migration for a new table in the matching domain: a match_expiration table that stores match_id (FK to matches), expires_at (TIMESTAMPTZ), and notified (Boolean, default false). Include the correct index for the background job that queries unnotified, expired matches.
```

**Expected output:** A complete SQLAlchemy model file, an Alembic migration with `upgrade()` and `downgrade()`, and the CREATE INDEX statement with justification.

---

**Test B — Review (pass file path):**

**Command:**
```
/database-agent backend/domains/matching/models/match_model.py
```

The agent reads `match_model.py` automatically and validates it against the README schema spec.

**Expected output:** Schema checklist against README section 2.18 (column types, nullability, ON DELETE behaviors, cross-domain FK rules), index validation against section 2.22, and a findings table.

---

#### `/testing-agent` — Testing Agent

**Type:** Generates tests + Reviews existing tests

---

**Test A — Generate (pass source file path → agent generates tests for it):**

**Command:**
```
/testing-agent frontend/src/features/matching/hooks/useAdvisorMatching.ts
```

The agent reads `useAdvisorMatching.ts` and generates the corresponding Vitest test file.

**Expected output:** A complete Vitest test file with mocked dependencies (matchingService, notificationStore, TanStack Query), test cases for the happy path, error states, and edge cases (empty recommendations, failed swipe mutation).

---

**Test B — Review (pass test file path → agent reviews coverage and correctness):**

**Command:**
```
/testing-agent frontend/src/tests/features/matching.spec.ts
```

The agent reads the test file and reviews it against the README testing strategy.

**Expected output:** Coverage assessment, missing edge cases, mock correctness evaluation, and suggested additional test cases.

---

### Skills

Skills run automatically over the project — no file needs to be open and no code needs to be pasted.

---

#### `/code-review`

**When to test:** After making any code change in the branch.

**Command:**
```
/code-review
```

**Expected output:** A findings list organized by file and line number, with severity (High / Med / Low) and specific corrections. If no changes are staged, it will say the diff is empty.

---

#### `/code-review --fix`

**When to test:** After `/code-review` produces findings you want applied automatically.

**Command:**
```
/code-review --fix
```

**Expected output:** The same findings as `/code-review`, but Claude applies the corrections directly to the files instead of just reporting them.

---

#### `/code-review ultra`

**When to test:** Before a demo or PR merge. Takes longer — spawns multiple review agents in parallel.

**Command:**
```
/code-review ultra
```

**Expected output:** A deeper multi-agent report covering correctness bugs, architecture violations, security issues, and simplification opportunities across the entire branch diff.

---

#### `/simplify`

**When to test:** After `/dry-validator` finds duplication, or after any refactoring pass.

**Command:**
```
/simplify
```

**Expected output:** A list of simplification opportunities (reuse, dead code, over-abstraction) with the fixes applied directly to the working tree.

---

#### `/security-review`

**When to test:** Before any PR that touches auth, JWT validation, contracts, or messaging.

**Command:**
```
/security-review
```

**Expected output:** OWASP-aligned findings for the current diff — injection risks, broken auth, insecure data exposure, missing input validation, hardcoded secrets.

---

#### `/verify`

**When to test:** After applying agent corrections, to confirm nothing broke visually.

**Prerequisite:** The app must be running locally (`npm run dev` for frontend, `uvicorn` for backend).

**Command:**
```
/verify
```

**Expected output:** Claude launches a browser, navigates the affected feature, and reports whether the change works as expected or introduces a regression.

---

#### `/run`

**When to test:** To confirm the project starts cleanly from scratch.

**Command:**
```
/run
```

**Expected output:** Claude detects the project type (Next.js + FastAPI), runs the startup commands, and reports whether both servers are up and accessible.

---
