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
2. Paste the agent's full content into the conversation OR reference the agent file like this:
   ```
   Read .agents/solid-agent.md and apply it to the following code: [paste code here]
   ```
3. Claude Code will follow the RICO format (Role, Instructions, Context, Output) from the agent file
4. Document the findings and corrections in README.md

### Example commands to use in Claude Code

```
Read .agents/solid-agent.md and analyze this code with SOLID principles: [paste code]

Read .agents/dry-agent.md and check this code for duplication: [paste code]

Read .agents/cohesion-agent.md and validate cohesion in this module: [paste code]

Read .agents/coupling-agent.md and check coupling in this feature: [paste code]

Read .agents/architecture-agent.md and validate this feature follows our documented architecture: [paste code]

Read .agents/frontend-agent.md and review this React component: [paste code]

Read .agents/backend-agent.md and review this API endpoint: [paste code]

Read .agents/database-agent.md and validate this database schema: [paste code]

Read .agents/testing-agent.md and generate tests for this function: [paste code]
```

### Workflow per feature (using Claude Code)

```
1. Write the code (component, service, hook, etc.)
2. In Claude Code: "Read .agents/solid-agent.md and analyze: [paste code]"
3. Claude Code reports findings following the agent's Output format
4. Apply suggested corrections
5. Document findings + corrections in README.md under "Agent Validations"
6. Commit validated code
```

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

## The Most Important Thing

**Agents are QUALITY tools, not just an extra academic requirement.**

- Each agent you use in the MVP must be documented
- Documentation of findings + corrections is EVALUATED
- Validated code = fewer bugs = stronger demo
- This gives you points in the final evaluation

**Critical order that cannot be changed:**
1. Create Agents
2. Document agent usage
3. Build MVP with agents validating
4. Final demo with clean code

---

## Next Steps

1. **Now:** Create Agent 1 (SRP) as prototype
2. **Day 2:** Replicate the pattern for the remaining 7 agents
3. **Day 3:** Document "Agents" section in README
4. **Day 4:** Start Feature 1 of MVP with agents validating

Do you need me to generate Agent 1 (SRP) now as an example?
