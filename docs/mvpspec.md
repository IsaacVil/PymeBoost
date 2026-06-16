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

### WS-1 · Backend ejecutable
- [ ] `requirements.txt`: agregar `alembic`, `psycopg2-binary`, `python-jose[cryptography]`,
      `passlib[bcrypt]`, `python-multipart`.
- [ ] DB layer real:
  - `shared/database/connection.py` → `create_engine(settings.DATABASE_URL)`.
  - `shared/database/session.py` → `sessionmaker` + dependency `get_db()`.
  - Centralizar `Base` en `shared/database` (hoy cada modelo redefine su propio `Base`).
- [ ] `main.py` + `api/routes.py`: montar el router e incluir `GET /health`.
- [ ] `config.py`: defaults locales + flag `USE_MOCKS`; cloud vars opcionales en local.
- [ ] `backend/.env.example`: perfil local completo (no existe hoy).

### WS-2 · Data layer local
- [ ] `docker-compose.yml` con imagen `pgvector/pgvector:pg16` + volumen + montaje de init scripts.
- [ ] Init order: `creationScript.sql` → `seed.sql` (catálogos) → `seed_dev.sql` (demo transaccional).
- [ ] Crear `seed_dev.sql` con usuarios/advisors/matches demo (incluye credenciales bcrypt).
- [ ] Verificar que `creationScript.sql` está alineado con el DBML actual.

### WS-3 · Auth mock JWT (bcrypt)
- [ ] Extender schema: almacenamiento de credenciales (hash bcrypt) — desviación documentada (§2.3).
- [ ] Flujo `register` + `login` que verifica password con bcrypt y emite JWT (HS256, `JWT_SECRET`).
- [ ] `shared/auth/jwt_validator.py`: validar JWT local.
- [ ] `permission_checker.py`: guard por rol (PYME / Asesor).

### WS-4 · Frontend ejecutable
- [ ] `frontend/package.json`: **está vacío (0 bytes)** → crear real con el stack del
      README §1.1 (Next 15, React 19, TanStack Query, Zustand, Tailwind, Radix,
      Heroicons, Zod, Vitest, Playwright).
- [ ] `next.config.js`: configuración mínima (está vacío).
- [ ] `frontend/.env.example` / `.env.local`: `NEXT_PUBLIC_API_URL` + auth (vacíos hoy).
- [ ] `npm install` y `next dev` levanta la home.

### WS-5 · Documentación
- [ ] Sección **MVP** en `README.md`: ejecución FE, BE, DB; env vars; dependencias;
      inicialización de datos.
- [ ] Sección **MVP Scope** en `README.md` (ver §5).
- [ ] Sección **Agent Validations** en `README.md` (se va llenando en Fase 2).

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
