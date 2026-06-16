# PymeBoost — MVP Specification

> Documento operativo del MVP. Define decisiones confirmadas, la estrategia de
> "perfil local" para reconciliar el diseño cloud del README con un MVP que corre
> **solo en ambiente local**, los workstreams de la Fase 1 (repo ejecutable) y el
> alcance funcional.
>
> Regla rectora del rubro: **README ↔ /src ↔ arquitectura ↔ MVP deben mantenerse
> alineados permanentemente.** Toda desviación respecto al README se documenta aquí
> de forma explícita.

---

## 0. Estado actual / Bitácora de progreso

_Última actualización: 2026-06-15_

### Punto de partida (heredado)
- **Fase 1 (Agentes) — COMPLETA:** los 8 agentes existen como slash commands en
  `.claude/commands/` (`solid`, `dry`, `cohesion`, `architecture`, `frontend`,
  `backend`, `database`, `testing`) y como skills.
- **Arquitectura documentada:** `README.md` (~344 KB) con stack, DDD backend,
  feature-based frontend, schema DBML, índices, workflows, C4.
- **Estructura de carpetas creada** (`backend/domains/*`, `frontend/src/features/*`)
  pero con **stubs** (ej. `def get_matches(...): pass`). El MVP = rellenar stubs,
  NO reorganizar.
- **Data layer base:** `database/scripts/creationScript.sql`, `seed.sql`, DBML.

### Hecho en esta línea de trabajo
- ✅ Definido el alcance del MVP (§5) y la estrategia de perfil local (§2).
- ✅ Confirmadas las decisiones (§1): esqueleto existente · Postgres Docker ·
  mock JWT con bcrypt · SQL scripts · 6 features core · git en `main`/commits a pedido.
- ✅ Entorno verificado: Docker 29, Python 3.13, Node 24.
- ✅ **WS-2 (Data layer local) COMPLETO y verificado en runtime** — ver §3.
- ✅ **WS-1 (Backend ejecutable) COMPLETO y verificado en runtime** — ver §3.
  `uvicorn backend.main:app` arranca y `GET /health` → 200 conectado a la BD.
- ✅ **WS-3 (Auth mock bcrypt) COMPLETO y verificado en runtime** — ver §3.
  login/register/`/me` funcionando con JWT local (HS256) y bcrypt contra `PB_AuthCredentials`.
- ✅ **WS-4 (Frontend ejecutable) COMPLETO y verificado en runtime** — ver §3.
  `npm install` OK y `next dev` sirve `/` (200) y `/login` (200).
- ✅ **WS-5 (Documentación) COMPLETO** — sección `# MVP` en `README.md` (ejecución, env vars,
  data init, scope, Agent Validations). Ver §3.

### 🎉 FASE 1 COMPLETA — el andamio completo corre en local (BD + backend + frontend).

### Fase 2 — enfoque elegido: **frontend-first**
La UI de features ya existía pero **no estaba enrutada** (las pantallas vivían en
`features/*/page.tsx`, que Next no enruta). Fase 2A = enrutar + dejar toda la interfaz
navegable (login real, resto con mock data); Fase 2B = cablear backend por feature.

- ✅ **Fase 2A COMPLETA y verificada en navegador (Edge):**
  - **Login REAL** end-to-end: `LoginForm` (React Hook Form + Zod) → `useAuth` (TanStack
    mutation) → `authService` → backend; `authStore` persistido (localStorage) + token
    inyectado en `apiClient`; `RegisterForm` PYME/Advisor también real.
  - **Toda la UI enrutada**: route group `src/app/(app)/` con `dashboard`, `matching`,
    `contracts`, `messaging`, `reports` + rutas `(auth)/login` y `(auth)/register`.
  - Fixes: `AuthGuard` redirige a `/login` (era `/auth/login` 404) y navega en `useEffect`
    (no en render); `apiClient` lee el token del `authStore`; matching con mock data (2A).
  - Verificación browser (PASS): login→/dashboard · nav→/matching (3 cards) · sign out→/login
    · guard /dashboard→/login · password incorrecta→error.

- ✅ **Restyle a la estética del prototipo (retro "paper & ink")** — el frontend implementado
  seguía el design system teal del README §1.4, que difería del prototipo probado en UX.
  Decisión: el prototipo es la fuente de verdad. Se reescribió el design system:
  - `globals.css` con tokens retro + **remap de tokens Tailwind** (`teal-500`→azul, `stone-100`→papel,
    `zinc-*`→tinta, `shadow-sm`→sombra dura) → reskin global sin tocar cada componente.
  - Fuentes Space Grotesk + JetBrains Mono + Macondo (`layout.tsx`); primitivas Button/Badge y
    wordmark al estilo retro; **README §1.4 reescrito** (doc = impl = prototipo).
  - Verificado en navegador (Edge): `/login` y `/register` con papel/tinta, sombras duras,
    wordmark Macondo, botón azul mono. Las demás pantallas heredan vía el remap.

### Próximo paso inmediato
- ▶️ **Fase 2B — cablear backend por feature** (empezando por Matching): rellenar dominio
  backend + reemplazar mock del service del frontend por llamadas reales, con agentes
  `/backend-agent` → `/database-agent` → `/solid-validator` → `/testing-agent` + `/security-review`.

### Orden restante
**Fase 2B** (Matching → Messaging → Contracts → Dashboard → Reports), cada una con el
workflow de agentes (§4). Auth ya quedó real (backend WS-3 + frontend 2A).

### Cómo correr el stack (local)
```
# 1) Base de datos (WS-2)
docker compose up -d

# 2) Backend (WS-1/WS-3) — desde la raíz
cd backend && python -m venv .venv                      # una vez
./.venv/Scripts/python.exe -m pip install -r requirements.txt
cd .. && backend/.venv/Scripts/python.exe -m uvicorn backend.main:app --reload --port 8000
# → http://localhost:8000/health  y  /docs

# 3) Frontend (WS-4)
cd frontend && npm install                              # una vez
npm run dev
# → http://localhost:3000  (login demo: maria@cafedelvalle.cr / DemoPass123!)
```

---

## 1. Decisiones confirmadas

| Tema | Decisión | Justificación |
|------|----------|---------------|
| **Estructura del código** | Construir sobre el esqueleto existente (`backend/domains/`, `frontend/src/features/`), **no** una carpeta `/mvp` aparte | El esqueleto **es** la arquitectura documentada (README §1.2, §2.2, §2.16); los 8 agentes están hardcodeados a esos paths. Una carpeta paralela rompería la alineación y los comandos. |
| **Base de datos local** | **PostgreSQL en Docker** | Fiel al README (Cloud SQL = Postgres). Portable para la demo en cualquier máquina. |
| **Autenticación** | **Mock JWT propio** con **password real (bcrypt)** + flujo register/login | Cero dependencia de Auth0/servicio externo; corre 100% local; soporta roles PYME/Asesor. Requiere extensión de schema (credenciales) ya que el diseño original delegaba auth en Auth0. Desviación documentada en §2.3. |
| **Motor Postgres** | Imagen **`pgvector/pgvector:pg16`** en Docker | El schema usa `vector(32)` (`PB_NeedsAssessments.needsVector`); la imagen trae la extensión `pgvector` para que `creationScript.sql` corra **sin modificarse**, aunque la IA esté mockeada. |
| **Datos demo** | Nuevo **`seed_dev.sql`** (transaccional) tras catálogos | El `seed.sql` actual solo cubre catálogos; las tablas transaccionales requieren datos demo (usuarios, advisors, matches) para login y demostración. |
| **Convenciones locales** | BE `:8000`, FE `:3000`, CORS → `localhost:3000`, scoring de IA determinista | Defaults para integración FE↔BE local. |
| **Schema / migraciones** | **SQL scripts existentes** (`creationScript.sql` → `seed.sql`) | Ya existen y están alineados con el DBML. Evita doble fuente de verdad mientras los modelos son stubs. Alembic (README §3.3/§3.10) queda como envoltura opcional posterior. |
| **Alcance** | Las **6 features core** completas | Auth, Matching, Messaging, Contracts, Dashboard, Reports — según `agents&mvpformat.md`. |
| **IA** | **Mock local** (stub determinista) | Sin acceso a embeddings/LLM/pgvector reales; permitido por el enunciado. |

---

## 2. Estrategia de "perfil local"

El README documenta un stack cloud/GCP (Secret Manager, Cloud SQL, Pub/Sub, Redis
Memorystore, KMS, LangGraph, Auth0) y `backend/config.py` ya declara esas variables.
El MVP **no las elimina**: mantiene los **mismos nombres de variable** y los mapea a
equivalentes locales. Así el diseño documentado y la implementación local conviven sin
divergir.

### 2.1 Mapeo cloud → local

| Variable (README / cloud) | Equivalente local en el MVP | Estado |
|---|---|---|
| `DATABASE_URL` (Cloud SQL) | Postgres en Docker: `postgresql://pymeboost:pymeboost@localhost:5432/pymeboost` | Activo |
| `DATABASE_POOL_SIZE` | `5` (igual) | Activo |
| `AUTH0_DOMAIN` / `JWKS_URL` | **Mock JWT** firmado localmente (HS256 con `JWT_SECRET`) | Reemplazado |
| `PUBSUB_TOPIC_CONTRACTS` (Pub/Sub) | `shared/events/event_bus.py` in-process (ya existe) | Reemplazado |
| `REDIS_URL` (Memorystore) | Opcional: cache in-memory / desactivado | Opcional |
| `GCS_BUCKET_NAME` (Cloud Storage) | Carpeta local del filesystem (`./storage`) | Reemplazado |
| `KMS_KEY_NAME` (KMS) | `shared/utils/encryption_utils.py` con clave local / no-op | Reemplazado |
| `LANGRAPH_API_KEY` (LangGraph) | **Mock de IA** local (scores deterministas) | Reemplazado |
| `ENVIRONMENT` / `LOG_LEVEL` / `API_VERSION` | Iguales (`development`, `INFO`, `v1`) | Activo |

### 2.2 Variables nuevas del perfil local

| Variable | Propósito |
|----------|-----------|
| `USE_MOCKS=true` | Activa adapters mock (IA, auth, storage) en lugar de los clientes cloud. |
| `JWT_SECRET` | Secreto para firmar/validar los JWT del mock de auth. |
| `JWT_EXPIRE_MINUTES` | Expiración del token local. |

### 2.3 Desviaciones explícitas respecto al README

1. **Auth0 → mock JWT con bcrypt**: el flujo OAuth/JWKS se sustituye por emisión y
   validación local de JWT (HS256). Se **extiende el schema** con almacenamiento de
   credenciales (hash bcrypt) porque el diseño original delegaba auth en Auth0. El
   contrato (claims, roles, guard) se mantiene equivalente.
2. **Pub/Sub → event bus in-process**: los eventos de dominio se publican en memoria;
   sin broker externo.
3. **GCS / KMS / Redis cloud → equivalentes locales/opcionales**.
4. **pgvector / LangGraph → mock de IA**: el matching usa scores simulados, no
   embeddings reales.

---

## 3. Workstreams — Fase 1 (repo ejecutable)

Objetivo: dejar el andamio **corriendo en local** (sin features todavía). En orden:

### WS-1 · Backend ejecutable ✅ COMPLETO
- [x] `requirements.txt` (runtime) split de `requirements-dev.txt` (test tooling, README §2.17):
      `psycopg2-binary`, `python-jose[cryptography]`, `passlib[bcrypt]`, `python-multipart`, `uvicorn`.
      _Nota: `alembic` se omite — el MVP usa SQL scripts (decisión §1), no migraciones._
- [x] DB layer real:
  - `shared/database/connection.py` → `get_engine()` lazy singleton con `pool_pre_ping`.
  - `shared/database/session.py` → `sessionmaker` + dependency `get_db()`.
  - `shared/database/base.py` → **Base declarativa canónica única** (fuente de verdad).
    Los 26 stubs de modelos migran a este `Base` al rellenarse en Fase 2 (no se churnean ahora).
- [x] `main.py` (app factory + CORS) + `api/routes.py` (router raíz) + `api/health.py`
      (`GET /health` con chequeo real de BD; 200 si up, 503 si down).
- [x] `config.py`: defaults locales + `USE_MOCKS` + vars JWT + `cors_origins`; cloud vars opcionales.
- [x] `backend/.env.example` (perfil local) + `.gitignore` raíz (`.venv`, `.env`, `__pycache__`, `node_modules`…).
- [x] Verificado en runtime: venv aislado, deps instaladas, `uvicorn backend.main:app` arranca
      y `GET /health` → `200 {"status":"ok","database":"up",...}`; `/openapi.json` → 200.

### WS-2 · Data layer local ✅ COMPLETO
- [x] `docker-compose.yml` con imagen `pgvector/pgvector:pg16` + volumen + montaje de init scripts.
- [x] Init order: `01_creation` (creationScript.sql) → `02_seed_catalogs` (seed.sql) → `03_auth_local` (auth_local.sql) → `04_seed_dev` (seed_dev.sql).
- [x] `auth_local.sql`: extensión `PB_AuthCredentials` (perfil local, bcrypt) — la columna de password no existía (diseño Auth0).
- [x] `seed_dev.sql` con PYMEs/advisors/matches/chat/contrato demo + credenciales bcrypt (vía pgcrypto `crypt`+`gen_salt('bf')`). Password demo: `DemoPass123!`.
- [x] Verificado en runtime: 69 tablas, extensiones `vector`+`pgcrypto`, datos demo cargados, hashes `$2a$10$` validan password OK y rechazan incorrecta.

### WS-3 · Auth mock JWT (bcrypt) ✅ COMPLETO
- [x] Schema de credenciales (bcrypt) — hecho en WS-2 (`PB_AuthCredentials` / auth_local.sql).
- [x] `shared/auth/password_hasher.py` (bcrypt directo; verifica los `$2a$` de pgcrypto y hashea nuevos).
- [x] `shared/auth/jwt_validator.py` — emite + valida JWT local (HS256, `JWT_SECRET`); `create_access_token` + `validate`.
- [x] `shared/auth/permission_checker.py` — `get_current_principal` (authn) + `require_account_type` (authz por rol pyme/advisor) + `Principal`.
- [x] Dominio User: `auth_credential_model` + `pyme_model`/`advisor_model` (reescritos a tablas reales `PB_*` sobre el `Base` canónico), `user_repository`, `auth_service` (login + register PYME/Advisor), schemas (login/auth_response/create_*), controllers (`/api/auth/login`, `/api/auth/me`, `/api/sme/accounts`, `/api/advisor/accounts`).
- [x] Exception handlers centralizados en `main.py` (AuthException→401, ValidationException→400, NotFound→404, Domain→400) → controllers delgados.
- [x] Verificado en runtime: login seed→200+JWT; `/me`→200; password incorrecta→401; sin token→403;
      register PYME/Advisor→201+token (login posterior OK); email duplicado→400; `company_size` inválido→400; password <8→422.

### WS-4 · Frontend ejecutable ✅ COMPLETO
- [x] `frontend/package.json` con el stack exacto del README §1.1 (Next 15.3.3, React 19.1.0,
      TanStack Query 5.76.1, Zustand 5.0.5, Zod 3.23.8, React Hook Form 7.57.0, Framer Motion 12.15.0,
      @radix-ui/react-dialog; dev: TS 5.8.3, Tailwind v4 + @tailwindcss/postcss, Vitest 2.1.8,
      Playwright 1.58.2, ESLint/Prettier).
- [x] Configs completados: `postcss.config.mjs` (Tailwind v4), `next.config.js`, `tailwind.config.js`,
      `.eslintrc.json`, `.prettierrc`, `.env.example`/`.env.local` (`NEXT_PUBLIC_API_URL=http://localhost:8000`).
- [x] `src/app/providers.tsx` creado (faltaba; lo importa `layout.tsx`) → `QueryClientProvider` con el singleton.
- [x] `package.json` raíz (estaba vacío → warning de Browserslist) ahora es marker del monorepo.
- [x] Fix: link "Get Started" de la landing apuntaba a `/auth/login` (404) → `/login` (route group `(auth)`).
- [x] Verificado en runtime: `npm install` (513 paquetes OK), `next dev` levanta; `/` → 200 con el H1,
      `/login` → 200 ("Sign in to PymeBoost").
- ⚠️ Nota: `next@15.3.3` (versión del README) tiene aviso CVE-2025-66478; se mantiene por fidelidad al
      README (MVP local). Evaluar bump a 15.x parcheado al alinear versiones.

### WS-5 · Documentación ✅ COMPLETO
- [x] Sección **`# MVP`** en `README.md` (entre UX y `# Frontend`): perfil local + mapeo cloud→local,
      ejecución DB/BE/FE con comandos verificados, env vars (BE y FE), dependencias, inicialización de
      datos (automática vía init scripts), credenciales demo.
- [x] **MVP Scope** resumido en el README + enlace a este spec §5 para el detalle completo.
- [x] **Agent Validations** abierta en el README (tabla placeholder; se llena por feature en Fase 2).

### Definition of Done — Fase 1
- [ ] `uvicorn` levanta y `GET /health` responde `200`.
- [ ] `next dev` sirve la home sin errores.
- [ ] La BD local (Docker) tiene tablas + seed cargado.
- [ ] `/run` confirma ambos servicios arriba.
- [ ] README documenta cómo correr FE, BE y DB en local.
- [ ] **Sin features** — solo el andamio corriendo. Las features son Fase 2.

---

## 4. Fase 2 (referencia) — construcción por feature

Orden: Auth → Matching → Messaging → Contracts → Dashboard → Reports.
Workflow por feature (del `agents&mvpformat.md`):

```
escribir código → /architecture-validator → /solid-validator →
/dry-validator|/cohesion-validator → /frontend-agent|/backend-agent →
/testing-agent → documentar en "Agent Validations" del README → commit
```

---

## 5. MVP Scope

### Problem Statement (recap)
Las PYMEs no encuentran asesores confiables y adecuados a su etapa/sector, y los
procesos de selección, negociación y formalización son informales y dispersos.
PymeBoost resuelve el flujo end-to-end: **descubrir → conectar → negociar →
formalizar → dar seguimiento** a la relación PYME–asesor en un solo lugar.

El MVP se enfoca en ese flujo principal. Los módulos satelitales se reducen al
mínimo indispensable para soportarlo.

### Core Features (obligatorias — resuelven el problema central)

| # | Feature | Qué incluye en el MVP | Qué resuelve del problema |
|---|---------|------------------------|----------------------------|
| 1 | **Auth & Registro** | Registro/login de PYME y Asesor con roles diferenciados; validación de credenciales **simulada** (sin MEIC real); perfil básico. | Punto de entrada e identidad de los dos actores. |
| 2 | **Matching (Advisor Discovery)** | Cards tipo Tinder con asesores recomendados; swipe approve/reject; *score* de recomendación generado por un **mock de IA** (sin pgvector real); creación de match al haber interés. | Núcleo: conectar a la PYME con el asesor adecuado. |
| 3 | **Messaging (Chat básico)** | Conversación 1:1 entre PYME y asesor tras el match; historial de mensajes persistido; envío/recepción en tiempo casi real (polling o refetch simple). | Comunicación previa al acuerdo. |
| 4 | **Contracts (Negociación + Formalización)** | "Negotiate Tariff" (propuesta/contrapropuesta de tarifa y alcance); "Marry the Prospect" (formalización del contrato); estados del contrato (draft → negotiating → active). | Núcleo: cerrar el acuerdo formal. |
| 5 | **Dashboard (Tracking)** | Vista del estado de los matches y contratos activos; fases del proyecto/relación; métricas básicas. | Seguimiento de la relación. |
| 6 | **Reports (Reportes simples)** | Reporte por fase del contrato/proyecto; resumen de actividad; export básico (vista o PDF/CSV simple). | Valor tangible entregado a la PYME. |

### Supporting Features (mínimas — sostienen el flujo, sin profundidad)

| Feature | Alcance reducido en el MVP |
|---------|-----------------------------|
| **Notificaciones** | Notificación in-app simple ante eventos clave (match creado, mensaje nuevo, contrato formalizado). Sin email/push real. |
| **Perfil de usuario** | Lectura/edición básica de datos de PYME y Asesor (los necesarios para matching). Sin verificación documental. |
| **Seed / Datos precargados** | PYMEs, asesores, matches y mensajes de ejemplo para demos y pruebas funcionales. |
| **Eventos de dominio** | Publicación de eventos (MatchSwiped, ContractFormalized, etc.) en bus **in-process** (sin broker externo). |
| **Mock de IA** | Servicio local que devuelve scores/recomendaciones simuladas en lugar de embeddings/LLM reales. |

### Out of Scope (explícitamente fuera del MVP)

| Excluido | Razón |
|----------|-------|
| Validación real con MEIC | Sin acceso al servicio; se simula. |
| IA real (embeddings, LLM, pgvector) | Se reemplaza por mocks/stubs locales. |
| Pagos reales / pasarela | No es parte del flujo central a demostrar. |
| Múltiples contratos simultáneos por relación | Se limita a un contrato activo por match. |
| Mensajería en tiempo real con WebSockets | Se usa polling/refetch simple. |
| Notificaciones por email / push | Solo in-app. |
| Roles y permisos avanzados / panel admin | Solo roles PYME y Asesor. |
| Internacionalización (i18n) | Una sola moneda (₡) e idioma. |
| Despliegue en la nube / multi-tenant | El MVP corre **solo en ambiente local**. |
| Procesos secundarios complejos (auditoría, escalamiento, SLAs) | Documentados en arquitectura, fuera del MVP. |

### User Journeys en alcance

**Journey 1 — PYME encuentra y contrata un asesor (flujo principal)**
1. La PYME se registra/inicia sesión (Auth).
2. Ve el dashboard y entra a **Discovery**.
3. Hace swipe sobre cards de asesores recomendados (Matching + mock IA).
4. Al hacer match, abre el **chat** con el asesor (Messaging).
5. Negocia tarifa y alcance (Contracts — *Negotiate Tariff*).
6. Formaliza el contrato (Contracts — *Marry the Prospect*).
7. Da seguimiento desde el **dashboard** y consulta el **reporte** por fase.

**Journey 2 — Asesor recibe y acepta una oportunidad**
1. El asesor se registra/inicia sesión y completa su perfil (Auth + Perfil).
2. Recibe notificación in-app de un match nuevo (Notificaciones).
3. Conversa con la PYME (Messaging).
4. Responde a la negociación de tarifa (Contracts).
5. Confirma la formalización del contrato (Contracts).
6. Ve sus contratos activos en el dashboard (Dashboard).

**Journey 3 — Seguimiento y cierre de fase**
1. Con el contrato activo, la PYME revisa el avance por fases (Dashboard).
2. Genera un reporte de la fase actual (Reports).
3. Recibe notificación cuando cambia el estado del contrato (Notificaciones).

> **Fuera de journey:** recuperación de cuenta avanzada, disputas/arbitraje,
> renegociación de contratos ya cerrados, búsqueda con filtros avanzados.
