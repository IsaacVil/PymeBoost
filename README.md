# PymeBoost

Problem Statement: Proveer una conexión orientada a resultados entre PYMES y asesores de alto rendimiento.

Actualmente, iniciar y desarrollar una PYME puede convertirse en un proceso complejo y desgastante, especialmente para emprendedores que no cuentan con experiencia previa en administración, optimización de procesos o escalabilidad empresarial. Muchas pequeñas y medianas empresas enfrentan dificultades para identificar cuáles áreas de su negocio necesitan mejoras, cómo implementar procesos más eficientes y, principalmente, en quién confiar para realizar dichos cambios.

En muchos casos, las PYMES no tienen acceso a asesoría especializada de calidad o terminan contratando servicios sin métricas claras, sin seguimiento y sin garantías reales de resultados. Esto provoca pérdidas económicas, procesos mal implementados y poca sostenibilidad a largo plazo. A esto se suma la falta de plataformas confiables donde las empresas puedan encontrar expertos verificados, comparar experiencias previas y trabajar bajo esquemas transparentes y estructurados.

PymeBoost nace como una solución enfocada específicamente en las PYMES, creando un ecosistema donde las empresas pueden conectarse con advisors y especialistas capaces de optimizar procesos específicos dentro de la organización. La plataforma busca transformar la relación tradicional de consultoría en un modelo basado en resultados, seguimiento continuo y transparencia, asegurando que tanto la PYME como el advisor trabajen alineados bajo objetivos claros y medibles.

--- 

## Authors
 * Isaac Villalobos Bonilla, 2024124285
 * Christopher Daniel Vargas Villalta, 2024108443
 * Santiago Espinoza Rendón, 2024156530
 * Jose Ignacio Paniagua Vargas, 2024163735


--- 

## Funcionamiento de la Plataforma

PymeBoost funciona como una plataforma inteligente de conexión entre PYMES y advisors especializados en distintas áreas empresariales como administración, automatización, marketing, finanzas, recursos humanos, ventas, logística, análisis de datos y optimización operativa.

El alcance de la plataforma está enfocado exclusivamente en pequeñas y medianas empresas (PYMES), permitiendo que negocios con necesidades específicas encuentren expertos adecuados según su contexto, objetivos y procesos a mejorar.

Dentro de la plataforma:

* Las PYMES se les recomiendan advisors asociados a sus problemas basandose en un sistema de matching. 
* Los advisors pueden registrarse y crear perfiles profesionales, pero no buscan oportunidades activamente dentro del sistema.

PymeBoost recomienda advisors según:
* Industria de la PYME.
* Problema o proceso a optimizar.
* Presupuesto disponible.
* Objetivos empresariales.
* Historial y reputación del advisor.

La comunicación entre ambas partes ocurre mediante un sistema interno de mensajería dentro de la plataforma. A partir de estas conversaciones, la PYME y el advisor pueden discutir necesidades, alcances y expectativas antes de generar formalmente un contrato, habiendo visualizado previamente el componente de contrato predeterminado de Pymeboost. Además, con el fin de mantener la transparencia y seguridad dentro del ecosistema, las pymes y los advisors no pueden contactarse fuera de la plataforma. Toda la comunicación se realiza mediante chats internos controlados, donde no está permitido compartir información de contacto personal como correos electrónicos, números telefónicos u otros medios externos de comunicación.

Todo lo anterior se hace con base a una descripcion de la empresa, contexto de la empresa, problema a solucionar y objetivos de la empresa. Cuando una PYME se registra en el sistema se le pide una descripcion de todo esto y la IA se encarga del resto. Por ello PymeBoost lo que hace incorporar recomendaciones inteligentes mediante agentes de IA que ayudan a sugerir:

* Advisors adecuados.
* Posibles procesos de optimización.
* Planes de acción.
* Objetivos y métricas de seguimiento.

Restricciones:
- Una PYME solo puede tener un contrato activo a la vez, es decir, solo puede estar en contacto con un advisor y que este implementando un proceso. 
- El sistema de mensajeria no admite ningun tipo de mensaje relacionado a numeros de telefono, redes sociales o informacion de contacto. 

--- 

## Validación 

En esta seccion explicamos a detalle como se hace la validacion de PYMES y advisors.

Comentarios:

Redactar para intro o para un programador o IA lo hago.

Necesitamos que este mas especificado

Ejemplo: Validacion de PYMES, nos falta declaracion de MEIC datos etc, se entrego cedula juridica se escanea formato pdf, que todo coincida mas especifico

Ejemplo: Para los asesores esta hablando de cantidad de anos haciendo que, especificar industria, certificaciones que info se da de la certificacion, evitar que la IA lo haga muy general. Por ejemplo problema inicial 200 palabras.

Definir como se escriben los objetivos

que incluyen los planes de accion 

como se presentan las fases completadas del plan de accion que metricas de exito 

## Validacion de Pymes

Uno de los pilares principales de PymeBoost es la seguridad, legitimidad y automatización inteligente dentro del ecosistema. Por ello las PYMES son verificadas utilizando la lista oficial del MEIC de Costa Rica para asegurar que:

- Sean negocios reales.
- Existan formalmente.
- Cumplan requisitos básicos.

Lo unico que se le solicita a la PYME es la cedula juridica, nosotros validamos que este en la lista del MEIC y a partir de ello ya estaria validada. 

## Verificación Inteligente de Advisors

Los advisors pasan por un proceso de validación apoyado por inteligencia artificial.

La IA extrae información desde LinkedIn, como:

- Experiencia laboral.
- Industrias.
- Certificaciones.
- Especializaciones.

También analiza documentos PDF de casos de éxito (“Use Cases”), extrayendo información como:

- Problema inicial.
- Solución implementada.
- Industria y tamaño de la empresa.
- Métricas antes y después.
- Impacto generado.

PymeBoost utiliza IA para clasificar el problema de negocio de la PYME y compararlo con proyectos anteriores exitosos de advisors.

Con esto, la plataforma puede:

- Generar roadmaps personalizados esto a la hora de definir los contratos preliminares en el matching.
- Recomendar procesos a optimizar.
- Estimar mejoras en métricas del negocio.
- Hacer matches más precisos entre PYMES y advisors.
- Sistema de Reputación

Después de cada proyecto:

- Las PYMES califican al advisor.
- Se utiliza un sistema de 1 a 5 estrellas.
- Se incluyen comentarios y retroalimentación.

Esto ayuda a mantener estándares de calidad y generar confianza dentro de la plataforma.

---

## Mathching 

PymeBoost contará con un sistema de matching inspirado en plataformas como Tinder, donde las PYMES podrán visualizar advisors recomendados mediante tarjetas interactivas.

Cada perfil mostrará:

- Nombre del advisor.
- Industria y especialización.
- Calificación y reputación.
- Proyecto similar realizado anteriormente.
- Compatibilidad PYME–advisor (escala del 1 al 5).
- Mejora estimada en métricas de negocio.
- Distribución estimada de ganancias entre PymeBoost y el advisor.

Además, cada tarjeta incluirá dos acciones:

- Swipe Approved → aceptar recomendación.
- Swipe Rejected → descartar recomendación.

El sistema utilizará IA para generar recomendaciones basadas en proyectos previos exitosos, necesidades de la PYME y métricas históricas de impacto.

---

## Mensajería

La comunicación entre las PYMES y los advisors se realiza mediante un sistema interno de mensajería dentro de PymeBoost.

A través de estos chats, ambas partes pueden discutir necesidades, objetivos, alcances y expectativas antes de formalizar un contrato, habiendo visualizado previamente el componente de contrato predeterminado de la plataforma.

Con el fin de mantener la transparencia y seguridad del ecosistema, no está permitido el contacto fuera de PymeBoost. Toda la comunicación debe realizarse dentro de la plataforma, evitando compartir:

- Correos electrónicos.
- Números telefónicos.
- Redes sociales.
- Otros medios externos de contacto.

Esto permite mantener un entorno más seguro, trazable y confiable tanto para las PYMES como para los advisors.

--- 

## Contratos

Una vez que la PYME y el advisor llegan a un acuerdo mediante el sistema de mensajes, se puede generar un contrato digital dentro de PymeBoost. Con la accion de "Marry The Prospect" en el sistema. 

Cada contrato incluye los siguientes campos principales:

* Comisión de PymeBoost equivalente al porcentaje de ganancia alrededor del 10%. 
* Fecha de inicio.
* Fecha límite.
* Objetivos y métricas esperadas.
* Plan de acción.
* Duración del contrato.


### Plan de acción 

Uno de los elementos principales del contrato es el plan de acción personalizado para seguimiento de la PYME y PymeBoost.

Este plan es generado inicialmente mediante un agente de IA de PymeBoost, el cual analiza:

* Contexto de la PYME.
* Industria.
* Objetivos.
* Problema identificado.
* Tipo de proceso a implementar.

Con base en esto, la plataforma genera un plan de acción mínimo de 5 pasos estratégicos. Posteriormente:

* El advisor puede modificarlo.
* La PYME puede personalizarlo.
* Ambas partes pueden adaptarlo conforme avance el proyecto.
* Division del dinero.

PymeBoost no administra los pagos a advisors directamente dentro de la plataforma, nosotros solo tomamos el dinero de la membresia y el porcentaje de comision que tomamos del contrato. Osea la plataforma retiene automáticamente su comisión correspondiente.

--- 

## Seguimiento y Fases del Contrato

A diferencia de otras plataformas donde únicamente se conecta a ambas partes y luego el proceso queda sin supervisión, PymeBoost realiza un seguimiento continuo del contrato y de las fases definidas dentro del plan de acción.

La plataforma supervisa:

- Cumplimiento de objetivos.
- Avance de tareas.
- Entregables acordados.
- Métricas de mejora.
- Participación del advisor.
- Cumplimiento de fechas límite.

Este seguimiento permite generar mayor seguridad tanto para la PYME como para el advisor, asegurando que el trabajo realmente se implemente y que los resultados puedan medirse de forma objetiva.

### Dashboard de seguimiento

PymeBoost incorpora un dashboard donde ambas partes pueden visualizar:

* Estado general del contrato.
* Fases completadas.
* Objetivos pendientes.
* Métricas de rendimiento.
* Reportes de progreso.

--- 

## Modelo de Negocio y Generación de Ingresos

PymeBoost genera ingresos mediante una fuente principales dentro de su ecosistema. La primera corresponde a las comisiones aplicadas sobre los contratos realizados dentro de la plataforma, las cuales ya fueron mencionadas anteriormente y varían según la duración y tipo de contrato. Estas comisiones permiten sostener el sistema de seguimiento, validación, seguridad y acompañamiento continuo que ofrece la plataforma.

---

## Authors

* Isaac Villalobos Bonilla, 2024124285
* Christopher Daniel Vargas Villalta, 2024108443
* Santiago Espinoza Rendón, 2024156530
* Jose Ignacio Paniagua Vargas, 2024163735

--- 

# Prototipos

Prototipo Figma: 

---

# Frontend

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