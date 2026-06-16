-- ============================================================================
--  PymeBoost — Seed de DESARROLLO (datos transaccionales demo)
--  Motor objetivo : PostgreSQL 16 + pgvector
-- ----------------------------------------------------------------------------
--  CONTEXTO (ver docs/mvpspec.md §2.1 / WS-2):
--  El seed.sql oficial solo cubre catálogos; las tablas transaccionales se
--  pueblan "vía la aplicación". Para el MVP local necesitamos datos demo
--  precargados (usuarios, advisors, matches, chat, contrato) que permitan
--  login con mock JWT y demostrar los user journeys sin registrar todo a mano.
--
--  Se ejecuta DESPUÉS de: 01_creation → 02_seed_catalogs → 03_auth_local.
--  PKs hardcodeadas para poder referenciarlas entre statements. Reejecutar
--  requiere recrear el volumen (docker compose down -v).
--
--  Credenciales demo (bcrypt vía pgcrypto): TODOS los usuarios usan la
--  contraseña  ->  DemoPass123!
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. PYMEs
-- ----------------------------------------------------------------------------
INSERT INTO "PB_Pymes" (
    "id", "auth0Id", "ownerName", "businessEmail", "phone", "cedulaJuridica",
    "companyName", "companySizeId", "industryId", "description", "pymeStatusId",
    "reputationScore", "ratingCount"
) VALUES
(
    '11111111-1111-1111-1111-111111111101',
    'local|pyme-001',
    'María Rodríguez',
    'maria@cafedelvalle.cr',
    '+506 8888-1101',
    '3-101-111101',
    'Cafetería del Valle',
    (SELECT "id" FROM "PB_CompanySizes" WHERE "code" = 'small'),
    (SELECT "id" FROM "PB_Industries"   WHERE "code" = 'food_beverage'),
    'Cafetería de especialidad en San José que busca ordenar sus finanzas y crecer.',
    (SELECT "id" FROM "PB_PymeStatus"   WHERE "code" = 'active'),
    4.5, 2
),
(
    '11111111-1111-1111-1111-111111111102',
    'local|pyme-002',
    'Carlos Jiménez',
    'carlos@techsoluciones.cr',
    '+506 8888-1102',
    '3-101-111102',
    'TechSoluciones CR',
    (SELECT "id" FROM "PB_CompanySizes" WHERE "code" = 'medium'),
    (SELECT "id" FROM "PB_Industries"   WHERE "code" = 'technology'),
    'PYME de servicios de TI que necesita estrategia de crecimiento y nuevos mercados.',
    (SELECT "id" FROM "PB_PymeStatus"   WHERE "code" = 'active'),
    0, 0
);

-- ----------------------------------------------------------------------------
-- 2. Advisors
-- ----------------------------------------------------------------------------
INSERT INTO "PB_Advisors" (
    "id", "auth0Id", "fullName", "displayName", "personalEmail", "phone",
    "linkedinUrl", "description", "baseRate", "isAvailable", "advisorStatusId",
    "reputationScore", "ratingCount"
) VALUES
(
    '22222222-2222-2222-2222-222222222201',
    'local|advisor-001',
    'Ana López Solano',
    'Ana López',
    'ana@asesores.cr',
    '+506 8888-2201',
    'https://www.linkedin.com/in/ana-lopez-demo',
    'Especialista en marketing y posicionamiento de marca para PYMEs.',
    45000.00, TRUE,
    (SELECT "id" FROM "PB_AdvisorStatus" WHERE "code" = 'active'),
    4.8, 12
),
(
    '22222222-2222-2222-2222-222222222202',
    'local|advisor-002',
    'Roberto Mora Castro',
    'Roberto Mora',
    'roberto@asesores.cr',
    '+506 8888-2202',
    'https://www.linkedin.com/in/roberto-mora-demo',
    'Consultor financiero: presupuestos, flujo de caja y planificación fiscal.',
    60000.00, TRUE,
    (SELECT "id" FROM "PB_AdvisorStatus" WHERE "code" = 'active'),
    4.6, 8
),
(
    '22222222-2222-2222-2222-222222222203',
    'local|advisor-003',
    'Luis Vargas Núñez',
    'Luis Vargas',
    'luis@asesores.cr',
    '+506 8888-2203',
    'https://www.linkedin.com/in/luis-vargas-demo',
    'Asesor en transformación digital y desarrollo de software a medida.',
    55000.00, TRUE,
    (SELECT "id" FROM "PB_AdvisorStatus" WHERE "code" = 'active'),
    4.9, 20
);

-- Industrias de especialización del advisor (M:N)
INSERT INTO "PB_AdvisorIndustries" ("advisorId", "industryId") VALUES
('22222222-2222-2222-2222-222222222201', (SELECT "id" FROM "PB_Industries" WHERE "code" = 'professional_services')),
('22222222-2222-2222-2222-222222222202', (SELECT "id" FROM "PB_Industries" WHERE "code" = 'professional_services')),
('22222222-2222-2222-2222-222222222203', (SELECT "id" FROM "PB_Industries" WHERE "code" = 'technology'));

-- ----------------------------------------------------------------------------
-- 3. Credenciales (bcrypt vía pgcrypto) — password: DemoPass123!
-- ----------------------------------------------------------------------------
INSERT INTO "PB_AuthCredentials" ("accountTypeId", "pymeId", "advisorId", "email", "passwordHash") VALUES
((SELECT "id" FROM "PB_AccountTypes" WHERE "code" = 'pyme'),    '11111111-1111-1111-1111-111111111101', NULL, 'maria@cafedelvalle.cr',    crypt('DemoPass123!', gen_salt('bf', 10))),
((SELECT "id" FROM "PB_AccountTypes" WHERE "code" = 'pyme'),    '11111111-1111-1111-1111-111111111102', NULL, 'carlos@techsoluciones.cr', crypt('DemoPass123!', gen_salt('bf', 10))),
((SELECT "id" FROM "PB_AccountTypes" WHERE "code" = 'advisor'), NULL, '22222222-2222-2222-2222-222222222201', 'ana@asesores.cr',          crypt('DemoPass123!', gen_salt('bf', 10))),
((SELECT "id" FROM "PB_AccountTypes" WHERE "code" = 'advisor'), NULL, '22222222-2222-2222-2222-222222222202', 'roberto@asesores.cr',      crypt('DemoPass123!', gen_salt('bf', 10))),
((SELECT "id" FROM "PB_AccountTypes" WHERE "code" = 'advisor'), NULL, '22222222-2222-2222-2222-222222222203', 'luis@asesores.cr',         crypt('DemoPass123!', gen_salt('bf', 10)));

-- ----------------------------------------------------------------------------
-- 4. Matches (estados variados para demostrar el flujo de swipe)
--    m1: Cafetería del Valle  ↔ Ana López     -> match     (con chat + contrato)
--    m2: Cafetería del Valle  ↔ Roberto Mora   -> waiting_swipe (candidato pendiente)
--    m3: TechSoluciones CR     ↔ Luis Vargas    -> match
-- ----------------------------------------------------------------------------
INSERT INTO "PB_Matches" ("id", "pymeId", "advisorId", "matchStatusId") VALUES
('33333333-3333-3333-3333-333333333301', '11111111-1111-1111-1111-111111111101', '22222222-2222-2222-2222-222222222201', (SELECT "id" FROM "PB_MatchStatus" WHERE "code" = 'match')),
('33333333-3333-3333-3333-333333333302', '11111111-1111-1111-1111-111111111101', '22222222-2222-2222-2222-222222222202', (SELECT "id" FROM "PB_MatchStatus" WHERE "code" = 'waiting_swipe')),
('33333333-3333-3333-3333-333333333303', '11111111-1111-1111-1111-111111111102', '22222222-2222-2222-2222-222222222203', (SELECT "id" FROM "PB_MatchStatus" WHERE "code" = 'match'));

-- Historial mínimo de estado para los matches concretados
INSERT INTO "PB_MatchStatusHistory" ("matchId", "matchStatusId") VALUES
('33333333-3333-3333-3333-333333333301', (SELECT "id" FROM "PB_MatchStatus" WHERE "code" = 'waiting_swipe')),
('33333333-3333-3333-3333-333333333301', (SELECT "id" FROM "PB_MatchStatus" WHERE "code" = 'match')),
('33333333-3333-3333-3333-333333333303', (SELECT "id" FROM "PB_MatchStatus" WHERE "code" = 'match'));

-- ----------------------------------------------------------------------------
-- 5. Chat del match m1 + mensajes
-- ----------------------------------------------------------------------------
INSERT INTO "PB_ChatSessions" ("id", "matchId", "isActive") VALUES
('44444444-4444-4444-4444-444444444401', '33333333-3333-3333-3333-333333333301', TRUE);

INSERT INTO "PB_Messages" (
    "chatSessionId", "messageTypeId", "senderAccountTypeId",
    "senderPymeId", "senderAdvisorId", "content"
) VALUES
-- Mensaje de sistema al crear el match
('44444444-4444-4444-4444-444444444401', (SELECT "id" FROM "PB_MessageTypes" WHERE "code" = 'system'), NULL, NULL, NULL,
 '¡Hicieron match! Pueden coordinar los detalles de la asesoría por este chat.'),
-- PYME
('44444444-4444-4444-4444-444444444401', (SELECT "id" FROM "PB_MessageTypes" WHERE "code" = 'user'),
 (SELECT "id" FROM "PB_AccountTypes" WHERE "code" = 'pyme'),
 '11111111-1111-1111-1111-111111111101', NULL,
 'Hola Ana, queremos mejorar el posicionamiento de la cafetería. ¿Podemos conversar?'),
-- Advisor
('44444444-4444-4444-4444-444444444401', (SELECT "id" FROM "PB_MessageTypes" WHERE "code" = 'user'),
 (SELECT "id" FROM "PB_AccountTypes" WHERE "code" = 'advisor'),
 NULL, '22222222-2222-2222-2222-222222222201',
 '¡Hola María! Claro, te preparo una propuesta de tarifa y alcance.');

-- ----------------------------------------------------------------------------
-- 6. Contrato del match m1 (en negociación, propuesta del advisor)
-- ----------------------------------------------------------------------------
INSERT INTO "PB_Contracts" ("id", "matchId", "contractStatusId", "currentVersionId") VALUES
('55555555-5555-5555-5555-555555555501', '33333333-3333-3333-3333-333333333301',
 (SELECT "id" FROM "PB_ContractStatus" WHERE "code" = 'negotiating'), NULL);

INSERT INTO "PB_ContractVersions" (
    "id", "contractId", "versionNumber", "proposedByAccountTypeId",
    "proposedByPymeId", "proposedByAdvisorId", "contractVersionStatusId",
    "implementationBudget", "monthlyRetainer", "startDate", "endDate",
    "commissionPct", "mainObjective", "advisorResultProfit"
) VALUES
('66666666-6666-6666-6666-666666666601', '55555555-5555-5555-5555-555555555501', 1,
 (SELECT "id" FROM "PB_AccountTypes" WHERE "code" = 'advisor'),
 NULL, '22222222-2222-2222-2222-222222222201',
 (SELECT "id" FROM "PB_ContractVersionStatus" WHERE "code" = 'pending_proposal'),
 800000.00, 150000.00, '2026-07-01', '2026-12-31',
 5.0000, 'Aumentar las ventas mensuales de la cafetería en un 20% en 6 meses.', NULL);

-- Enlazar la versión actual del contrato
UPDATE "PB_Contracts"
   SET "currentVersionId" = '66666666-6666-6666-6666-666666666601'
 WHERE "id" = '55555555-5555-5555-5555-555555555501';

-- ============================================================================
-- FIN DEL SEED DE DESARROLLO
-- ============================================================================
