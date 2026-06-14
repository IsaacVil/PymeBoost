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

Agents are run via **Claude Code** (the CLI). Since we don't use VS Code Copilot Chat credits, all agent usage is done directly in Claude Code.

### How to run an agent in Claude Code

1. Open Claude Code in your terminal or VS Code extension
2. Use the command pattern below for the agent you want to run
3. Claude Code reads the agent file and applies the RICO format (Role, Instructions, Context, Output)
4. Document findings and corrections in README.md under the "Agent Validations" section

---

### Agent Command Reference

#### Design Principle Agents

**SOLID Validator** — Detects violations of all 5 SOLID principles in FE or BE code
```
Read .agents/solid-agent.md and analyze the following [component/hook/service/controller/repository] from the [feature/domain] feature for SOLID violations:

[paste code here]
```

**DRY Validator** — Detects duplicated logic, structure, types, or UI patterns
```
Read .agents/dry-agent.md and check the following code for DRY violations. These files are from the [feature/domain] feature:

File 1 — [filename]:
[paste code]

File 2 — [filename] (optional, for cross-file comparison):
[paste code]
```

**Cohesion Validator** — Classifies and evaluates the cohesion level of a module
```
Read .agents/cohesion-agent.md and evaluate the cohesion of the following [component/hook/service/controller/repository] from the [feature/domain] feature:

[paste code here]
```

---

#### Architecture Agent

**Architecture Validator** — Validates that code matches the documented architecture in README.md
```
Read .agents/architecture-agent.md and validate the following [component/hook/service/controller/repository] from the [feature/domain] feature against the documented architecture:

[paste code here]
```

For full feature validation (multiple files):
```
Read .agents/architecture-agent.md and validate the full [feature/domain] feature. Here are all the files:

Controller — [filename]:
[paste code]

Service — [filename]:
[paste code]

Repository — [filename]:
[paste code]
```

---

#### Technical Agents

**Frontend Agent** — Generates or reviews React components, hooks, services, and stores
```
# Generate a new component/hook/service:
Read .agents/frontend-agent.md and generate a [Primitive/Compound/Container/Hook/Service] for the [feature] feature. It should: [description of what it does]

# Review existing code:
Read .agents/frontend-agent.md and review the following [component/hook/service] from the [feature] feature:

[paste code here]
```

**Backend Agent** — Generates or reviews FastAPI controllers, services, repositories, models, schemas, and events
```
# Generate new backend code:
Read .agents/backend-agent.md and generate a [controller/service/repository/model/schema/event] for the [domain] domain. Use case: [description]

# Review existing code:
Read .agents/backend-agent.md and review the following [controller/service/repository] from the [domain] domain:

[paste code here]
```

**Database Agent** — Validates SQLAlchemy models, Alembic migrations, indexes, and seed data
```
# Review a SQLAlchemy model:
Read .agents/database-agent.md and review the following SQLAlchemy model from the [domain] domain:

[paste code here]

# Design a new table:
Read .agents/database-agent.md and design the SQLAlchemy model and Alembic migration for a new table in the [domain] domain: [description of fields and relationships]

# Review indexes:
Read .agents/database-agent.md and validate that the following table has the correct indexes per section 2.22 of the README:

[paste DDL or model code]
```

**Testing Agent** — Generates or reviews tests (Vitest, Playwright, Pytest)
```
# Generate frontend unit tests (Vitest):
Read .agents/testing-agent.md and generate Vitest unit tests for the following [hook/validator/service] from the [feature] feature:

[paste source code here]

# Generate backend unit tests (Pytest):
Read .agents/testing-agent.md and generate Pytest unit tests for the following [controller/service/repository] from the [domain] domain:

[paste source code here]

# Generate Playwright E2E tests:
Read .agents/testing-agent.md and generate Playwright E2E tests for the [workflow name] workflow (e.g., matching flow, contract negotiation)

# Review existing tests:
Read .agents/testing-agent.md and review the following test file for the [feature/domain]. Source code is also provided:

Test file:
[paste test code]

Source file:
[paste source code]
```

---

### Recommended Agent Combination per MVP Feature

| Feature | Run these agents in order |
|---------|--------------------------|
| Auth (Login/Register) | `architecture-agent` → `solid-agent` → `frontend-agent` → `testing-agent` |
| Matching (Advisor Cards) | `solid-agent` → `dry-agent` → `frontend-agent` → `backend-agent` → `testing-agent` |
| Messaging (Chat) | `cohesion-agent` → `architecture-agent` → `frontend-agent` → `backend-agent` → `testing-agent` |
| Contracts (Negotiation) | `solid-agent` → `architecture-agent` → `backend-agent` → `database-agent` → `testing-agent` |
| Dashboard (Tracking) | `dry-agent` → `cohesion-agent` → `frontend-agent` → `testing-agent` |
| Reports | `backend-agent` → `database-agent` → `testing-agent` |

### Workflow per feature (using Claude Code)

```
For each feature:
  1. Write the initial code (component, service, hook, controller, etc.)
  2. Run: architecture-agent → verify layer rules
  3. Run: solid-agent → verify design principles
  4. Run: dry-agent or cohesion-agent → verify quality
  5. Run: frontend-agent or backend-agent → generate/review
  6. Run: testing-agent → generate tests
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
