-- ============================================================================
--  PymeBoost — RESET de la DEMO (estado transaccional → baseline sembrado)
-- ----------------------------------------------------------------------------
--  Idempotente: seguro de correr cuantas veces sea necesario. Lo invoca el botón
--  "Reiniciar demo" (POST /api/demo/reset) y también sirve manualmente:
--      docker exec -i pymeboost-db psql -U pymeboost -d pymeboost -f - < database/scripts/reset_demo.sql
--
--  Qué hace: borra TODO el estado transaccional (matches, chats, mensajes,
--  contratos, versiones, fases, proyectos, KPIs, historiales…) y reinserta el
--  baseline para volver a correr la journey:
--    - Emma (Ropa Sol) queda SIN matches → mensajería y dashboard vacíos (flujo en vivo).
--    - Maria recupera sus 2 chats de oportunidad (Boutique Luna, Verde Market).
--    - Café del Valle ↔ Ana recupera su contrato de marketing a mitad de plan.
--
--  NO toca: catálogos, PYMEs, advisors, credenciales ni promesas de advisors.
--  Las fechas del contrato se recalculan relativas a hoy (siempre ~50% del plan).
-- ============================================================================

-- 1) Wipe del grafo transaccional. TRUNCATE ... CASCADE sigue TODAS las FKs hijas
--    de PB_Matches (chats, mensajes, contratos, versiones, fases, proyectos, KPIs,
--    historiales) sin importar el ON DELETE de cada una.
TRUNCATE "PB_Matches" CASCADE;

-- 2) Baseline de matches (Emma↔Maria NO se siembra: se crea en vivo con el swipe)
INSERT INTO "PB_Matches" ("id", "pymeId", "advisorId", "matchStatusId") VALUES
('33333333-3333-3333-3333-333333333302', '11111111-1111-1111-1111-111111111102', '22222222-2222-2222-2222-222222222202', (SELECT "id" FROM "PB_MatchStatus" WHERE "code" = 'finalized')),
('33333333-3333-3333-3333-333333333303', '11111111-1111-1111-1111-111111111103', '22222222-2222-2222-2222-222222222201', (SELECT "id" FROM "PB_MatchStatus" WHERE "code" = 'match')),
('33333333-3333-3333-3333-333333333304', '11111111-1111-1111-1111-111111111104', '22222222-2222-2222-2222-222222222201', (SELECT "id" FROM "PB_MatchStatus" WHERE "code" = 'match'));

INSERT INTO "PB_MatchStatusHistory" ("matchId", "matchStatusId") VALUES
('33333333-3333-3333-3333-333333333302', (SELECT "id" FROM "PB_MatchStatus" WHERE "code" = 'match')),
('33333333-3333-3333-3333-333333333302', (SELECT "id" FROM "PB_MatchStatus" WHERE "code" = 'finalized')),
('33333333-3333-3333-3333-333333333303', (SELECT "id" FROM "PB_MatchStatus" WHERE "code" = 'match')),
('33333333-3333-3333-3333-333333333304', (SELECT "id" FROM "PB_MatchStatus" WHERE "code" = 'match'));

-- 3) Chats + mensajes baseline
INSERT INTO "PB_ChatSessions" ("id", "matchId", "isActive") VALUES
('44444444-4444-4444-4444-444444444402', '33333333-3333-3333-3333-333333333302', TRUE),
('44444444-4444-4444-4444-444444444403', '33333333-3333-3333-3333-333333333303', TRUE),
('44444444-4444-4444-4444-444444444404', '33333333-3333-3333-3333-333333333304', TRUE);

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

INSERT INTO "PB_Messages" ("chatSessionId", "messageTypeId", "content") VALUES
('44444444-4444-4444-4444-444444444403', (SELECT "id" FROM "PB_MessageTypes" WHERE "code" = 'system'),
 '¡Hicieron match! Pueden coordinar los detalles de la asesoría por este chat.'),
('44444444-4444-4444-4444-444444444404', (SELECT "id" FROM "PB_MessageTypes" WHERE "code" = 'system'),
 '¡Hicieron match! Pueden coordinar los detalles de la asesoría por este chat.');

-- 4) Contrato de marketing ACTIVO a mitad de plan (Café del Valle ↔ Ana)
--    FK circular Contracts<->ContractVersions: contrato con currentVersionId NULL,
--    luego versión, luego UPDATE.
INSERT INTO "PB_Contracts" ("id", "matchId", "contractStatusId", "currentVersionId") VALUES
('55555555-5555-5555-5555-555555555502', '33333333-3333-3333-3333-333333333302',
 (SELECT "id" FROM "PB_ContractStatus" WHERE "code" = 'accepted'), NULL);

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

UPDATE "PB_Contracts"
   SET "currentVersionId" = '66666666-6666-6666-6666-666666666602'
 WHERE "id" = '55555555-5555-5555-5555-555555555502';

INSERT INTO "PB_ContractRoadmapPhases" ("id", "contractVersionId", "phaseOrder", "name", "description", "completed", "completedAt") VALUES
('a1a1a1a1-0000-0000-0000-0000000000f1', '66666666-6666-6666-6666-666666666602', 1, 'Diagnóstico y estrategia',            'Auditoría de canales y definición de la estrategia digital.', TRUE,  (CURRENT_DATE - INTERVAL '7 weeks')),
('a1a1a1a1-0000-0000-0000-0000000000f2', '66666666-6666-6666-6666-666666666602', 2, 'Optimización de pauta y contenido',   'Rediseño de creativos y segmentación de campañas.',          TRUE,  (CURRENT_DATE - INTERVAL '3 weeks')),
('a1a1a1a1-0000-0000-0000-0000000000f3', '66666666-6666-6666-6666-666666666602', 3, 'Embudo de conversión y remarketing',  'Implementación de remarketing y mejoras de landing.',        FALSE, NULL),
('a1a1a1a1-0000-0000-0000-0000000000f4', '66666666-6666-6666-6666-666666666602', 4, 'Escalamiento y reportería',           'Escalar lo que funciona y entregar informe final.',          FALSE, NULL);

INSERT INTO "PB_ContractSubPhases" ("phaseId", "name", "completed", "completedAt") VALUES
('a1a1a1a1-0000-0000-0000-0000000000f1', 'Auditoría de canales digitales',     TRUE,  (CURRENT_DATE - INTERVAL '7 weeks')),
('a1a1a1a1-0000-0000-0000-0000000000f1', 'Definición de buyer persona',        TRUE,  (CURRENT_DATE - INTERVAL '7 weeks')),
('a1a1a1a1-0000-0000-0000-0000000000f2', 'Rediseño de creativos',              TRUE,  (CURRENT_DATE - INTERVAL '3 weeks')),
('a1a1a1a1-0000-0000-0000-0000000000f2', 'Segmentación de audiencias',         TRUE,  (CURRENT_DATE - INTERVAL '3 weeks')),
('a1a1a1a1-0000-0000-0000-0000000000f3', 'Implementar remarketing',            TRUE,  (CURRENT_DATE - INTERVAL '4 days')),
('a1a1a1a1-0000-0000-0000-0000000000f3', 'A/B testing de landing',             FALSE, NULL),
('a1a1a1a1-0000-0000-0000-0000000000f4', 'Dashboard de KPIs en vivo',          FALSE, NULL),
('a1a1a1a1-0000-0000-0000-0000000000f4', 'Informe final de resultados',        FALSE, NULL);

INSERT INTO "PB_Projects" ("id", "contractVersionId", "projectStatusId") VALUES
('77777777-7777-7777-7777-777777777702', '66666666-6666-6666-6666-666666666602',
 (SELECT "id" FROM "PB_ProjectStatus" WHERE "code" = 'active'));

INSERT INTO "PB_ContractMetrics" ("id", "contractVersionId", "name", "metricValueTypeId", "target", "baselineValue") VALUES
('b2b2b2b2-0000-0000-0000-0000000000c1', '66666666-6666-6666-6666-666666666602', 'Tasa de conversión',       (SELECT "id" FROM "PB_MetricValueTypes" WHERE "code" = 'percentage'),       3.4000,    2.1000),
('b2b2b2b2-0000-0000-0000-0000000000c2', '66666666-6666-6666-6666-666666666602', 'Ingresos canal digital',   (SELECT "id" FROM "PB_MetricValueTypes" WHERE "code" = 'number'),     4200000.0000, 3000000.0000),
('b2b2b2b2-0000-0000-0000-0000000000c3', '66666666-6666-6666-6666-666666666602', 'Costo por adquisición',    (SELECT "id" FROM "PB_MetricValueTypes" WHERE "code" = 'number'),       11500.0000,   14000.0000);

INSERT INTO "PB_ProjectKpiValidations" ("projectId", "contractMetricId", "metricsBefore", "metricsAfter", "finalImprovementPct", "met") VALUES
('77777777-7777-7777-7777-777777777702', 'b2b2b2b2-0000-0000-0000-0000000000c1',      2.1000,       2.8000,  33.3300, TRUE),
('77777777-7777-7777-7777-777777777702', 'b2b2b2b2-0000-0000-0000-0000000000c2', 3000000.0000, 3720000.0000,  24.0000, TRUE),
('77777777-7777-7777-7777-777777777702', 'b2b2b2b2-0000-0000-0000-0000000000c3',   14000.0000,   12200.0000,  12.8600, TRUE);

-- ============================================================================
-- FIN DEL RESET DE LA DEMO
-- ============================================================================
