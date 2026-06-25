-- ============================================================================
--  PymeBoost — Seed de DESARROLLO (datos transaccionales demo)
--  Motor objetivo : PostgreSQL 16 + pgvector
-- ----------------------------------------------------------------------------
--  CONTEXTO (ver docs/mvpspec.md §2.1 / WS-2):
--  El seed.sql oficial solo cubre catálogos; las tablas transaccionales se
--  pueblan "vía la aplicación". Para el MVP local necesitamos datos demo
--  precargados que permitan login con mock JWT y demostrar los user journeys.
--
--  Se ejecuta DESPUÉS de: 01_creation → 02_seed_catalogs → 03_auth_local.
--  PKs hardcodeadas para poder referenciarlas entre statements. Reejecutar
--  requiere recrear el volumen (docker compose down -v).
--
--  Credenciales demo (bcrypt vía pgcrypto): TODOS los usuarios usan la
--  contraseña  ->  DemoPass123!
-- ----------------------------------------------------------------------------
--  GUION DE LA DEMO (journey principal que seguimos):
--    Emma (PYME "Ropa Sol")  → emma@ropasol.cr     → tienda de ropa, quiere
--        optimizar su marketing digital. Su flujo es 100% EN VIVO: entra con
--        mensajería y dashboard VACÍOS y, durante la demo:
--          1. Matching: Maria le aparece PRIMERA con compatibilidad máxima (5/5).
--          2. Hace swipe → se abre el chat → se autocarga un mensaje de contexto
--             de Emma (baseline, problema, objetivo+métrica, presupuesto).
--          3. Negocian y formalizan el contrato → el dashboard se llena en vivo.
--    Maria (Advisor marketing) → maria@socialpro.cr → ve la oportunidad de Emma
--        (y otras PYMEs) en Descubrir; en sus chats ya tiene un par de
--        oportunidades sembradas. El chat con Emma aparece al hacer el match.
--
--    Ejemplo "a mitad de plan" (dashboard rico SIN hacer el flujo en vivo):
--    el par  Café del Valle (Diego) ↔ Ana López  ya está sembrado con un
--    contrato de marketing ACTIVO al ~50% (2 de 4 fases completas + KPIs con
--    avances). Entrá con  diego@cafedelvalle.cr  para mostrar "Mi Contrato".
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. PYMEs
-- ----------------------------------------------------------------------------
INSERT INTO "PB_Pymes" (
    "id", "auth0Id", "ownerName", "businessEmail", "phone", "cedulaJuridica",
    "companyName", "companySizeId", "industryId", "description", "pymeStatusId",
    "reputationScore", "ratingCount"
) VALUES
-- Emma · Ropa Sol  (PYME ESTRELLA del journey · flujo en vivo)
(
    '11111111-1111-1111-1111-111111111101',
    'local|pyme-001',
    'Emma Salas',
    'emma@ropasol.cr',
    '+506 8888-1101',
    '3-101-111101',
    'Ropa Sol',
    (SELECT "id" FROM "PB_CompanySizes" WHERE "code" = 'small'),
    (SELECT "id" FROM "PB_Industries"   WHERE "code" = 'retail'),
    'Tienda de ropa con local físico y catálogo en línea. Quiere optimizar su marketing digital y aumentar las ventas de sus campañas pagadas.',
    (SELECT "id" FROM "PB_PymeStatus"   WHERE "code" = 'active'),
    0, 0
),
-- Café del Valle · Diego  (PYME del ejemplo "a mitad de plan" · contrato activo)
(
    '11111111-1111-1111-1111-111111111102',
    'local|pyme-002',
    'Diego Méndez',
    'diego@cafedelvalle.cr',
    '+506 8888-1102',
    '3-101-111102',
    'Café del Valle',
    (SELECT "id" FROM "PB_CompanySizes" WHERE "code" = 'small'),
    (SELECT "id" FROM "PB_Industries"   WHERE "code" = 'food_beverage'),
    'Cafetería de especialidad en San José; ya trabaja con un advisor de marketing para crecer su canal digital.',
    (SELECT "id" FROM "PB_PymeStatus"   WHERE "code" = 'active'),
    4.7, 3
),
-- Boutique Luna  (solo para que Maria tenga una oportunidad/chat sembrado)
(
    '11111111-1111-1111-1111-111111111103',
    'local|pyme-003',
    'Laura Quirós',
    'laura@boutiqueluna.cr',
    '+506 8888-1103',
    '3-101-111103',
    'Boutique Luna',
    (SELECT "id" FROM "PB_CompanySizes" WHERE "code" = 'small'),
    (SELECT "id" FROM "PB_Industries"   WHERE "code" = 'retail'),
    'Boutique de accesorios que quiere ordenar sus redes sociales y campañas.',
    (SELECT "id" FROM "PB_PymeStatus"   WHERE "code" = 'active'),
    0, 0
),
-- Verde Market  (solo para que Maria tenga otra oportunidad/chat sembrado)
(
    '11111111-1111-1111-1111-111111111104',
    'local|pyme-004',
    'Pablo Rojas',
    'pablo@verdemarket.cr',
    '+506 8888-1104',
    '3-101-111104',
    'Verde Market',
    (SELECT "id" FROM "PB_CompanySizes" WHERE "code" = 'small'),
    (SELECT "id" FROM "PB_Industries"   WHERE "code" = 'retail'),
    'Tienda de productos orgánicos con venta en línea; busca mejorar su embudo de suscripciones.',
    (SELECT "id" FROM "PB_PymeStatus"   WHERE "code" = 'active'),
    0, 0
);

-- ----------------------------------------------------------------------------
-- 2. Advisors
--    Maria = la mejor reputación (sale PRIMERA en el deck de Emma). El backend
--    además fuerza su compatibilidad a 5/5 con perfil de moda/marketing
--    (ver MockMatchingAI._DEMO_OVERRIDES). El resto también son buenos en
--    marketing digital para que existan otros matches posibles.
-- ----------------------------------------------------------------------------
INSERT INTO "PB_Advisors" (
    "id", "auth0Id", "fullName", "displayName", "personalEmail", "phone",
    "linkedinUrl", "description", "baseRate", "isAvailable", "advisorStatusId",
    "reputationScore", "ratingCount"
) VALUES
-- Maria · ADVISOR ESTRELLA (social media + marketing digital)
(
    '22222222-2222-2222-2222-222222222201',
    'local|advisor-001',
    'María Fernández Rojas',
    'María Fernández',
    'maria@socialpro.cr',
    '+506 8888-2201',
    'https://www.linkedin.com/in/maria-fernandez-demo',
    'Especialista en redes sociales y marketing digital para retail y moda.',
    150000.00, TRUE,
    (SELECT "id" FROM "PB_AdvisorStatus" WHERE "code" = 'active'),
    5.0, 18
),
-- Ana López (marketing/marca) — advisor del contrato a mitad de plan de Café del Valle
(
    '22222222-2222-2222-2222-222222222202',
    'local|advisor-002',
    'Ana López Solano',
    'Ana López',
    'ana@asesores.cr',
    '+506 8888-2202',
    'https://www.linkedin.com/in/ana-lopez-demo',
    'Estratega de marca y posicionamiento digital para PYMEs.',
    140000.00, TRUE,
    (SELECT "id" FROM "PB_AdvisorStatus" WHERE "code" = 'active'),
    4.8, 12
),
-- Luis Vargas (transformación digital / e-commerce)
(
    '22222222-2222-2222-2222-222222222203',
    'local|advisor-003',
    'Luis Vargas Núñez',
    'Luis Vargas',
    'luis@asesores.cr',
    '+506 8888-2203',
    'https://www.linkedin.com/in/luis-vargas-demo',
    'Asesor en e-commerce y optimización de conversión de tiendas online.',
    160000.00, TRUE,
    (SELECT "id" FROM "PB_AdvisorStatus" WHERE "code" = 'active'),
    4.7, 15
),
-- Sofía Brenes (performance / pauta pagada)
(
    '22222222-2222-2222-2222-222222222204',
    'local|advisor-004',
    'Sofía Brenes Mora',
    'Sofía Brenes',
    'sofia@asesores.cr',
    '+506 8888-2204',
    'https://www.linkedin.com/in/sofia-brenes-demo',
    'Especialista en performance marketing y pauta pagada (Meta/Google Ads).',
    155000.00, TRUE,
    (SELECT "id" FROM "PB_AdvisorStatus" WHERE "code" = 'active'),
    4.6, 9
);

-- Industrias de especialización del advisor (M:N) — todas orientadas a retail/moda
INSERT INTO "PB_AdvisorIndustries" ("advisorId", "industryId") VALUES
('22222222-2222-2222-2222-222222222201', (SELECT "id" FROM "PB_Industries" WHERE "code" = 'retail')),
('22222222-2222-2222-2222-222222222202', (SELECT "id" FROM "PB_Industries" WHERE "code" = 'retail')),
('22222222-2222-2222-2222-222222222203', (SELECT "id" FROM "PB_Industries" WHERE "code" = 'retail')),
('22222222-2222-2222-2222-222222222204', (SELECT "id" FROM "PB_Industries" WHERE "code" = 'retail'));

-- ----------------------------------------------------------------------------
-- 3. Credenciales (bcrypt vía pgcrypto) — password: DemoPass123!
--    Logins demo destacados:  emma@ropasol.cr (PYME) y maria@socialpro.cr (Advisor).
--    diego@cafedelvalle.cr (PYME) sirve para mostrar el dashboard a mitad de plan.
-- ----------------------------------------------------------------------------
INSERT INTO "PB_AuthCredentials" ("accountTypeId", "pymeId", "advisorId", "email", "passwordHash") VALUES
((SELECT "id" FROM "PB_AccountTypes" WHERE "code" = 'pyme'),    '11111111-1111-1111-1111-111111111101', NULL, 'emma@ropasol.cr',       crypt('DemoPass123!', gen_salt('bf', 10))),
((SELECT "id" FROM "PB_AccountTypes" WHERE "code" = 'pyme'),    '11111111-1111-1111-1111-111111111102', NULL, 'diego@cafedelvalle.cr', crypt('DemoPass123!', gen_salt('bf', 10))),
((SELECT "id" FROM "PB_AccountTypes" WHERE "code" = 'advisor'), NULL, '22222222-2222-2222-2222-222222222201', 'maria@socialpro.cr',    crypt('DemoPass123!', gen_salt('bf', 10))),
((SELECT "id" FROM "PB_AccountTypes" WHERE "code" = 'advisor'), NULL, '22222222-2222-2222-2222-222222222202', 'ana@asesores.cr',       crypt('DemoPass123!', gen_salt('bf', 10))),
((SELECT "id" FROM "PB_AccountTypes" WHERE "code" = 'advisor'), NULL, '22222222-2222-2222-2222-222222222203', 'luis@asesores.cr',      crypt('DemoPass123!', gen_salt('bf', 10))),
((SELECT "id" FROM "PB_AccountTypes" WHERE "code" = 'advisor'), NULL, '22222222-2222-2222-2222-222222222204', 'sofia@asesores.cr',     crypt('DemoPass123!', gen_salt('bf', 10)));

-- ----------------------------------------------------------------------------
-- 4. Matches
--    OJO: Emma↔Maria NO se siembra: ese match se crea EN VIVO con el swipe
--    durante la demo (así Emma arranca con mensajería vacía).
--      m2: Café del Valle ↔ Ana López  -> finalized (contrato activo a mitad de plan)
--      m3: Boutique Luna   ↔ Maria      -> match (oportunidad/chat de Maria)
--      m4: Verde Market    ↔ Maria      -> match (oportunidad/chat de Maria)
-- ----------------------------------------------------------------------------
INSERT INTO "PB_Matches" ("id", "pymeId", "advisorId", "matchStatusId") VALUES
('33333333-3333-3333-3333-333333333302', '11111111-1111-1111-1111-111111111102', '22222222-2222-2222-2222-222222222202', (SELECT "id" FROM "PB_MatchStatus" WHERE "code" = 'finalized')),
('33333333-3333-3333-3333-333333333303', '11111111-1111-1111-1111-111111111103', '22222222-2222-2222-2222-222222222201', (SELECT "id" FROM "PB_MatchStatus" WHERE "code" = 'match')),
('33333333-3333-3333-3333-333333333304', '11111111-1111-1111-1111-111111111104', '22222222-2222-2222-2222-222222222201', (SELECT "id" FROM "PB_MatchStatus" WHERE "code" = 'match'));

-- Historial mínimo de estado
INSERT INTO "PB_MatchStatusHistory" ("matchId", "matchStatusId") VALUES
('33333333-3333-3333-3333-333333333302', (SELECT "id" FROM "PB_MatchStatus" WHERE "code" = 'match')),
('33333333-3333-3333-3333-333333333302', (SELECT "id" FROM "PB_MatchStatus" WHERE "code" = 'finalized')),
('33333333-3333-3333-3333-333333333303', (SELECT "id" FROM "PB_MatchStatus" WHERE "code" = 'match')),
('33333333-3333-3333-3333-333333333304', (SELECT "id" FROM "PB_MatchStatus" WHERE "code" = 'match'));

-- ----------------------------------------------------------------------------
-- 5. Chats + mensajes
-- ----------------------------------------------------------------------------
INSERT INTO "PB_ChatSessions" ("id", "matchId", "isActive") VALUES
('44444444-4444-4444-4444-444444444402', '33333333-3333-3333-3333-333333333302', TRUE),  -- Café del Valle ↔ Ana
('44444444-4444-4444-4444-444444444403', '33333333-3333-3333-3333-333333333303', TRUE),  -- Boutique Luna ↔ Maria
('44444444-4444-4444-4444-444444444404', '33333333-3333-3333-3333-333333333304', TRUE);  -- Verde Market ↔ Maria

-- Chat del contrato activo (Café del Valle ↔ Ana): saludo + breve negociación cerrada
INSERT INTO "PB_Messages" (
    "chatSessionId", "messageTypeId", "senderAccountTypeId",
    "senderPymeId", "senderAdvisorId", "content"
) VALUES
('44444444-4444-4444-4444-444444444402', (SELECT "id" FROM "PB_MessageTypes" WHERE "code" = 'system'), NULL, NULL, NULL,
 '¡Hicieron match! Pueden coordinar los detalles de la asesoría por este chat.'),
('44444444-4444-4444-4444-444444444402', (SELECT "id" FROM "PB_MessageTypes" WHERE "code" = 'user'),
 (SELECT "id" FROM "PB_AccountTypes" WHERE "code" = 'pyme'),
 '11111111-1111-1111-1111-111111111102', NULL,
 'Hola Ana, queremos crecer el canal digital de la cafetería. ¿Armamos el plan?'),
('44444444-4444-4444-4444-444444444402', (SELECT "id" FROM "PB_MessageTypes" WHERE "code" = 'user'),
 (SELECT "id" FROM "PB_AccountTypes" WHERE "code" = 'advisor'),
 NULL, '22222222-2222-2222-2222-222222222202',
 '¡Hola Diego! Listo, te dejé la propuesta con roadmap de 4 fases. Arrancamos esta semana.');

-- Chats de oportunidad de Maria (solo saludo de sistema, SIN mensaje de contexto)
INSERT INTO "PB_Messages" ("chatSessionId", "messageTypeId", "content") VALUES
('44444444-4444-4444-4444-444444444403', (SELECT "id" FROM "PB_MessageTypes" WHERE "code" = 'system'),
 '¡Hicieron match! Pueden coordinar los detalles de la asesoría por este chat.'),
('44444444-4444-4444-4444-444444444404', (SELECT "id" FROM "PB_MessageTypes" WHERE "code" = 'system'),
 '¡Hicieron match! Pueden coordinar los detalles de la asesoría por este chat.');

-- ----------------------------------------------------------------------------
-- 6. EJEMPLO "A MITAD DE PLAN": contrato de marketing ACTIVO de Café del Valle ↔ Ana
--    (Emma↔Maria NO tiene contrato: ese flujo se hace en vivo y arranca el
--     dashboard de Emma vacío.)
-- ----------------------------------------------------------------------------
-- 6.1 Contrato + versión aceptada.
-- FK circular Contracts <-> ContractVersions: primero el contrato con
-- currentVersionId NULL, luego la versión (que referencia al contrato) y al final
-- fijamos currentVersionId con un UPDATE.
INSERT INTO "PB_Contracts" ("id", "matchId", "contractStatusId", "currentVersionId") VALUES
('55555555-5555-5555-5555-555555555502', '33333333-3333-3333-3333-333333333302',
 (SELECT "id" FROM "PB_ContractStatus" WHERE "code" = 'accepted'),
 NULL);

-- Fechas: inicio hace 2 meses, fin en 2 meses  → ~50% del plan transcurrido.
INSERT INTO "PB_ContractVersions" (
    "id", "contractId", "versionNumber", "proposedByAccountTypeId",
    "proposedByPymeId", "proposedByAdvisorId", "contractVersionStatusId",
    "implementationBudget", "monthlyRetainer", "startDate", "endDate",
    "commissionPct", "mainObjective", "advisorResultProfit"
) VALUES
('66666666-6666-6666-6666-666666666602', '55555555-5555-5555-5555-555555555502', 1,
 (SELECT "id" FROM "PB_AccountTypes" WHERE "code" = 'pyme'),
 '11111111-1111-1111-1111-111111111102', NULL,
 (SELECT "id" FROM "PB_ContractVersionStatus" WHERE "code" = 'accepted'),
 1200000.00, 180000.00,
 (CURRENT_DATE - INTERVAL '2 months'), (CURRENT_DATE + INTERVAL '2 months'),
 10.0000,
 'Aumentar las ventas del canal digital de la cafetería un 30% en 4 meses optimizando pauta, contenido y embudo de conversión.',
 250000.00);

-- Cerramos la FK circular: el contrato ya puede apuntar a su versión vigente.
UPDATE "PB_Contracts"
   SET "currentVersionId" = '66666666-6666-6666-6666-666666666602'
 WHERE "id" = '55555555-5555-5555-5555-555555555502';

-- 6.2 Roadmap: 4 fases — 2 completas, 1 en curso, 1 pendiente (≈50%)
INSERT INTO "PB_ContractRoadmapPhases" ("id", "contractVersionId", "phaseOrder", "name", "description", "completed", "completedAt") VALUES
('a1a1a1a1-0000-0000-0000-0000000000f1', '66666666-6666-6666-6666-666666666602', 1, 'Diagnóstico y estrategia',            'Auditoría de canales y definición de la estrategia digital.', TRUE,  (CURRENT_DATE - INTERVAL '7 weeks')),
('a1a1a1a1-0000-0000-0000-0000000000f2', '66666666-6666-6666-6666-666666666602', 2, 'Optimización de pauta y contenido',   'Rediseño de creativos y segmentación de campañas.',          TRUE,  (CURRENT_DATE - INTERVAL '3 weeks')),
('a1a1a1a1-0000-0000-0000-0000000000f3', '66666666-6666-6666-6666-666666666602', 3, 'Embudo de conversión y remarketing',  'Implementación de remarketing y mejoras de landing.',        FALSE, NULL),
('a1a1a1a1-0000-0000-0000-0000000000f4', '66666666-6666-6666-6666-666666666602', 4, 'Escalamiento y reportería',           'Escalar lo que funciona y entregar informe final.',          FALSE, NULL);

-- Subfases (objetivos) por fase
INSERT INTO "PB_ContractSubPhases" ("phaseId", "name", "completed", "completedAt") VALUES
-- Fase 1 (completa)
('a1a1a1a1-0000-0000-0000-0000000000f1', 'Auditoría de canales digitales',     TRUE,  (CURRENT_DATE - INTERVAL '7 weeks')),
('a1a1a1a1-0000-0000-0000-0000000000f1', 'Definición de buyer persona',        TRUE,  (CURRENT_DATE - INTERVAL '7 weeks')),
-- Fase 2 (completa)
('a1a1a1a1-0000-0000-0000-0000000000f2', 'Rediseño de creativos',              TRUE,  (CURRENT_DATE - INTERVAL '3 weeks')),
('a1a1a1a1-0000-0000-0000-0000000000f2', 'Segmentación de audiencias',         TRUE,  (CURRENT_DATE - INTERVAL '3 weeks')),
-- Fase 3 (en curso)
('a1a1a1a1-0000-0000-0000-0000000000f3', 'Implementar remarketing',            TRUE,  (CURRENT_DATE - INTERVAL '4 days')),
('a1a1a1a1-0000-0000-0000-0000000000f3', 'A/B testing de landing',             FALSE, NULL),
-- Fase 4 (pendiente)
('a1a1a1a1-0000-0000-0000-0000000000f4', 'Dashboard de KPIs en vivo',          FALSE, NULL),
('a1a1a1a1-0000-0000-0000-0000000000f4', 'Informe final de resultados',        FALSE, NULL);

-- 6.3 Proyecto activo (lo que hace que el dashboard tenga "tracking activo")
INSERT INTO "PB_Projects" ("id", "contractVersionId", "projectStatusId") VALUES
('77777777-7777-7777-7777-777777777702', '66666666-6666-6666-6666-666666666602',
 (SELECT "id" FROM "PB_ProjectStatus" WHERE "code" = 'active'));

-- 6.4 Métricas del contrato (definición de KPIs) + validaciones con avances
INSERT INTO "PB_ContractMetrics" ("id", "contractVersionId", "name", "metricValueTypeId", "target", "baselineValue") VALUES
('b2b2b2b2-0000-0000-0000-0000000000c1', '66666666-6666-6666-6666-666666666602', 'Tasa de conversión',       (SELECT "id" FROM "PB_MetricValueTypes" WHERE "code" = 'percentage'),       3.4000,    2.1000),
('b2b2b2b2-0000-0000-0000-0000000000c2', '66666666-6666-6666-6666-666666666602', 'Ingresos canal digital',   (SELECT "id" FROM "PB_MetricValueTypes" WHERE "code" = 'number'),     4200000.0000, 3000000.0000),
('b2b2b2b2-0000-0000-0000-0000000000c3', '66666666-6666-6666-6666-666666666602', 'Costo por adquisición',    (SELECT "id" FROM "PB_MetricValueTypes" WHERE "code" = 'number'),       11500.0000,   14000.0000);

-- Avances a mitad de plan: las 3 métricas mejoran respecto al baseline (van en buen camino)
INSERT INTO "PB_ProjectKpiValidations" ("projectId", "contractMetricId", "metricsBefore", "metricsAfter", "finalImprovementPct", "met") VALUES
('77777777-7777-7777-7777-777777777702', 'b2b2b2b2-0000-0000-0000-0000000000c1',      2.1000,       2.8000,  33.3300, TRUE),
('77777777-7777-7777-7777-777777777702', 'b2b2b2b2-0000-0000-0000-0000000000c2', 3000000.0000, 3720000.0000,  24.0000, TRUE),
('77777777-7777-7777-7777-777777777702', 'b2b2b2b2-0000-0000-0000-0000000000c3',   14000.0000,   12200.0000,  12.8600, TRUE);

-- ----------------------------------------------------------------------------
-- 7. Promesas de éxito de los advisors (perfil/credibilidad)
--    Maria → 3 promesas (2 accepted, 1 pending) · Ana → 2 · Luis → 1 · Sofía → 1
-- ----------------------------------------------------------------------------
INSERT INTO "PB_Promises" (
    "advisorId", "measureId", "promisedValue", "explanationText",
    "timeWindowDays", "feePercentage", "verificationStatusId", "verificationScore", "isActive"
) VALUES
-- Maria — promesa 1: tasa de conversión (accepted, 96 %)
(
    '22222222-2222-2222-2222-222222222201',
    (SELECT "id" FROM "PB_Measures" WHERE "code" = 'conversion_rate'),
    25.00,
    'Optimizamos tu pauta y embudo digital para subir la conversión de tus campañas pagadas al menos un 25% en 4 meses.',
    120, 12.0000,
    (SELECT "id" FROM "PB_PromiseVerificationStatus" WHERE "code" = 'accepted'),
    96.00, TRUE
),
-- Maria — promesa 2: ingresos (accepted, 94 %)
(
    '22222222-2222-2222-2222-222222222201',
    (SELECT "id" FROM "PB_Measures" WHERE "code" = 'revenue'),
    30.00,
    'Diseñamos una estrategia de redes y contenido que incrementará tus ventas del canal digital un 30% en los primeros 6 meses.',
    180, 12.0000,
    (SELECT "id" FROM "PB_PromiseVerificationStatus" WHERE "code" = 'accepted'),
    94.00, TRUE
),
-- Maria — promesa 3: retención (pending — verificación en curso)
(
    '22222222-2222-2222-2222-222222222201',
    (SELECT "id" FROM "PB_Measures" WHERE "code" = 'customer_retention'),
    15.00,
    'Implementamos automatizaciones de recompra y fidelización para subir la retención 15 puntos.',
    120, 10.0000,
    (SELECT "id" FROM "PB_PromiseVerificationStatus" WHERE "code" = 'pending'),
    NULL, TRUE
),
-- Ana — promesa 1: ingresos (accepted, 92 %)
(
    '22222222-2222-2222-2222-222222222202',
    (SELECT "id" FROM "PB_Measures" WHERE "code" = 'revenue'),
    20.00,
    'Estrategia de marca y canales digitales para incrementar tus ingresos mensuales al menos un 20% en 6 meses.',
    180, 12.0000,
    (SELECT "id" FROM "PB_PromiseVerificationStatus" WHERE "code" = 'accepted'),
    92.00, TRUE
),
-- Ana — promesa 2: conversión (accepted, 90 %)
(
    '22222222-2222-2222-2222-222222222202',
    (SELECT "id" FROM "PB_Measures" WHERE "code" = 'conversion_rate'),
    18.00,
    'Optimizamos tu embudo de ventas digital para subir la conversión un 18% en 4 meses.',
    120, 10.0000,
    (SELECT "id" FROM "PB_PromiseVerificationStatus" WHERE "code" = 'accepted'),
    90.00, TRUE
),
-- Luis — promesa 1: ingresos vía e-commerce (accepted, 93 %)
(
    '22222222-2222-2222-2222-222222222203',
    (SELECT "id" FROM "PB_Measures" WHERE "code" = 'revenue'),
    25.00,
    'Mejoramos tu tienda online y checkout para que el canal digital genere un 25% más de ingresos en 6 meses.',
    180, 12.0000,
    (SELECT "id" FROM "PB_PromiseVerificationStatus" WHERE "code" = 'accepted'),
    93.00, TRUE
),
-- Sofía — promesa 1: costo por adquisición (accepted, 91 %)
(
    '22222222-2222-2222-2222-222222222204',
    (SELECT "id" FROM "PB_Measures" WHERE "code" = 'operating_cost'),
    18.00,
    'Reestructuramos tus campañas de pauta para reducir el costo por adquisición un 18% manteniendo el volumen.',
    90, 10.0000,
    (SELECT "id" FROM "PB_PromiseVerificationStatus" WHERE "code" = 'accepted'),
    91.00, TRUE
);

-- ============================================================================
-- FIN DEL SEED DE DESARROLLO
-- ============================================================================
