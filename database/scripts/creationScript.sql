-- ============================================================================
--  PymeBoost — Script de creacion de base de datos
--  Motor objetivo : Google Cloud SQL for PostgreSQL (PostgreSQL 15+)
--  Extensiones     : pgcrypto (gen_random_uuid), vector (pgvector)
-- ----------------------------------------------------------------------------
--  Convenciones (heredadas del modelo PB_ del proyecto)
--   * Prefijo de tabla : "PB_" + PascalCase, identificadores entrecomillados.
--   * Columnas         : camelCase entrecomillado.
--   * PK               : UUID v4 con DEFAULT gen_random_uuid().
--   * Estados/tipos    : NUNCA varchar libre. Cada status/type tiene su propia
--                        tabla catalogo (..."Status" / ..."Types") con
--                        "code" (clave de negocio estable) + "name".
--   * Polimorfismo     : entidades que pertenecen a una PYME o a un Advisor
--                        usan "accountTypeId" + dos FK nulables
--                        ("pymeId"/"advisorId") con CHECK de exclusion mutua,
--                        conservando integridad referencial real.
--   * Tamanos varchar  : estandarizados por tipo de dato.
--   * Auditoria        : "createdAt"/"updatedAt" TIMESTAMPTZ; trigger
--                        set_updated_at() mantiene "updatedAt".
--   * Versionado       : contratos (PB_ContractVersions), salud de proyecto
--                        (PB_ProjectHealthHistory), needs assessment y
--                        recommendation sets conservan historial.
--   * Embeddings       : vector(768) (Vertex AI text-embedding-004).
--  NOTA: este script reemplaza el stub inicial; corrige tipos provisionales
--        (cedula -> varchar, email -> varchar, fechas -> timestamptz, etc.).
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 0. Extensiones
-- ----------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS pgcrypto;   -- gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS vector;     -- pgvector

-- ----------------------------------------------------------------------------
-- 0.1 Dominios de tipo (tamanos varchar estandarizados)
-- ----------------------------------------------------------------------------
CREATE DOMAIN code_t      AS VARCHAR(50);
CREATE DOMAIN name_t      AS VARCHAR(100);
CREATE DOMAIN title_t     AS VARCHAR(200);
CREATE DOMAIN shorttext_t AS VARCHAR(255);
CREATE DOMAIN email_t     AS VARCHAR(150);
CREATE DOMAIN phone_t     AS VARCHAR(20);
CREATE DOMAIN cedula_t    AS VARCHAR(20);
CREATE DOMAIN url_t       AS VARCHAR(500);
CREATE DOMAIN auth0_id_t  AS VARCHAR(64);
CREATE DOMAIN hash_t      AS VARCHAR(64);
CREATE DOMAIN money_t     AS NUMERIC(14,2);
CREATE DOMAIN pct_t       AS NUMERIC(7,4);
CREATE DOMAIN score_t     AS NUMERIC(12,8);   -- reputacion sin redondear

-- ----------------------------------------------------------------------------
-- 0.2 Funcion + trigger generico de updatedAt
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 1. CATALOGOS (lookup tables) — un status/type por tabla
-- ============================================================================

-- Tipo de cuenta / parte del ecosistema (pyme | advisor | system) -----------
CREATE TABLE "PB_AccountTypes" (
    "id"          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "code"        code_t      NOT NULL UNIQUE,
    "name"        name_t      NOT NULL,
    "description" shorttext_t
);

-- Catalogo de roles del sistema (pyme_owner | advisor | admin | system_agent) -
CREATE TABLE "PB_Roles" (
    "id"          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "code"        code_t      NOT NULL UNIQUE,
    "name"        name_t      NOT NULL,
    "description" shorttext_t,
    "isActive"    BOOLEAN     NOT NULL DEFAULT TRUE,
    "createdAt"   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tamano de empresa (Small | Medium | Large) --------------------------------
CREATE TABLE "PB_CompanySizes" (
    "id"          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "code"        code_t      NOT NULL UNIQUE,
    "name"        name_t      NOT NULL,
    "description" shorttext_t
);

-- Estado de cuenta PYME -----------------------------------------------------
CREATE TABLE "PB_PymeStatus" (
    "id"          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "code"        code_t      NOT NULL UNIQUE,
    "name"        name_t      NOT NULL,
    "description" shorttext_t
);

-- Estado de cuenta Advisor --------------------------------------------------
CREATE TABLE "PB_AdvisorStatus" (
    "id"          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "code"        code_t      NOT NULL UNIQUE,
    "name"        name_t      NOT NULL,
    "description" shorttext_t
);

-- Catalogo de industrias (con embedding representativo) ---------------------
CREATE TABLE "PB_Industries" (
    "id"                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "code"                    code_t      NOT NULL UNIQUE,
    "name"                    name_t      NOT NULL,
    "description"             shorttext_t,
    "representativeEmbedding" vector(768),
    "isActive"                BOOLEAN     NOT NULL DEFAULT TRUE,
    "createdAt"               TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Subindustrias (subdivision de una industria; base del needs assessment) ---
CREATE TABLE "PB_SubIndustries" (
    "id"                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "industryId"              UUID        NOT NULL REFERENCES "PB_Industries"("id"),
    "code"                    code_t      NOT NULL UNIQUE,
    "name"                    name_t      NOT NULL,
    "description"             shorttext_t,
    "representativeEmbedding" vector(768),
    "vectorIndex"             SMALLINT    NOT NULL UNIQUE,  -- posicion fija en needs/advisor vector
    "isActive"                BOOLEAN     NOT NULL DEFAULT TRUE,
    "createdAt"               TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX "idx_subindustries_industry" ON "PB_SubIndustries"("industryId");

-- Categorias tematicas de bloques de PDF ------------------------------------
CREATE TABLE "PB_ThematicCategories" (
    "id"          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "code"        code_t      NOT NULL UNIQUE,
    "name"        name_t      NOT NULL,
    "description" shorttext_t,
    "isRequired"  BOOLEAN     NOT NULL DEFAULT TRUE
);

-- Estado de procesamiento de documento (GCS) --------------------------------
CREATE TABLE "PB_DocumentStatus" (
    "id"          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "code"        code_t      NOT NULL UNIQUE,
    "name"        name_t      NOT NULL,
    "description" shorttext_t
);

-- Tipo de documento (use_case | baseline | completion) ----------------------
CREATE TABLE "PB_DocumentTypes" (
    "id"          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "code"        code_t      NOT NULL UNIQUE,  -- use_case, baseline, completion
    "name"        name_t      NOT NULL,
    "description" shorttext_t
);

-- Estado de un use case del advisor -----------------------------------------
CREATE TABLE "PB_UseCaseStatus" (
    "id"          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "code"        code_t      NOT NULL UNIQUE,
    "name"        name_t      NOT NULL,
    "description" shorttext_t
);

-- Estado de verificacion de una promesa (pending | accepted | rejected) -----
CREATE TABLE "PB_PromiseVerificationStatus" (
    "id"          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "code"        code_t      NOT NULL UNIQUE,  -- pending, accepted, rejected
    "name"        name_t      NOT NULL,
    "description" shorttext_t
);

-- Estado del match (modelo unificado swipe + match) -------------------------
CREATE TABLE "PB_MatchStatus" (
    "id"          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "code"        code_t      NOT NULL UNIQUE,  -- waiting_swipe, match, not_swiped, unmatch, finalized
    "name"        name_t      NOT NULL,
    "description" shorttext_t
);

-- Estado global del contrato (hilo de negociacion por match) ----------------
CREATE TABLE "PB_ContractStatus" (
    "id"          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "code"        code_t      NOT NULL UNIQUE,  -- negotiating, accepted, rejected, voided
    "name"        name_t      NOT NULL,
    "description" shorttext_t
);

-- Estado de una version de contrato -----------------------------------------
CREATE TABLE "PB_ContractVersionStatus" (
    "id"          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "code"        code_t      NOT NULL UNIQUE,  -- pending_proposal, accepted, rejected, superseded
    "name"        name_t      NOT NULL,
    "description" shorttext_t
);


-- Tipo de valor de una metrica (number | percentage) ------------------------
CREATE TABLE "PB_MetricValueTypes" (
    "id"          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "code"        code_t      NOT NULL UNIQUE,
    "name"        name_t      NOT NULL,
    "description" shorttext_t
);

-- Catalogo de metricas de negocio que un advisor puede prometer mejorar -----
-- La interpretacion del valor (numero absoluto vs. porcentaje) viene de
-- metricValueTypeId; no se almacena una columna "unit" separada.
CREATE TABLE "PB_Measures" (
    "id"                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "code"              code_t      NOT NULL UNIQUE,  -- revenue, customer_retention, operating_cost, profit_margin, ...
    "name"              name_t      NOT NULL,
    "description"       shorttext_t,
    "metricValueTypeId" UUID        NOT NULL REFERENCES "PB_MetricValueTypes"("id"),
    "isActive"          BOOLEAN     NOT NULL DEFAULT TRUE,
    "createdAt"         TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX "idx_measures_valuetype" ON "PB_Measures"("metricValueTypeId");

-- Estado del proyecto -------------------------------------------------------
CREATE TABLE "PB_ProjectStatus" (
    "id"          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "code"        code_t      NOT NULL UNIQUE,  -- active, awaiting_completion_document, completed, cancelled
    "name"        name_t      NOT NULL,
    "description" shorttext_t
);

-- Etiqueta de salud del proyecto --------------------------------------------
CREATE TABLE "PB_ProjectHealthStatus" (
    "id"          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "code"        code_t      NOT NULL UNIQUE,  -- on_track, at_risk, off_track
    "name"        name_t      NOT NULL,
    "description" shorttext_t
);



-- Tipo de mensaje (user | system) -------------------------------------------
CREATE TABLE "PB_MessageTypes" (
    "id"          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "code"        code_t      NOT NULL UNIQUE,
    "name"        name_t      NOT NULL,
    "description" shorttext_t
);

-- Estado de entrega de mensaje (estilo WhatsApp) ----------------------------
CREATE TABLE "PB_MessageStatus" (
    "id"          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "code"        code_t      NOT NULL UNIQUE,  -- sent, delivered, read
    "name"        name_t      NOT NULL,
    "description" shorttext_t
);

-- Categoria de contenido bloqueado en chat ----------------------------------
CREATE TABLE "PB_BlockedContentCategories" (
    "id"          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "code"        code_t      NOT NULL UNIQUE,  -- email, phone, social_media
    "name"        name_t      NOT NULL,
    "description" shorttext_t
);

-- Tipos de notificacion -----------------------------------------------------
CREATE TABLE "PB_NotificationTypes" (
    "id"          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "code"        code_t      NOT NULL UNIQUE,
    "name"        name_t      NOT NULL,
    "description" shorttext_t,
    "isActive"    BOOLEAN     NOT NULL DEFAULT TRUE
);

-- Canales de notificacion (in_app | email | push) --------------------------
CREATE TABLE "PB_NotificationChannels" (
    "id"          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "code"        code_t      NOT NULL UNIQUE,
    "name"        name_t      NOT NULL,
    "description" shorttext_t
);

-- Estado de entrega de notificacion -----------------------------------------
CREATE TABLE "PB_NotificationDeliveryStatus" (
    "id"          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "code"        code_t      NOT NULL UNIQUE,  -- pending, sent, delivered, read, failed
    "name"        name_t      NOT NULL,
    "description" shorttext_t
);

-- Estado de una sesion ------------------------------------------------------
CREATE TABLE "PB_SessionStatus" (
    "id"          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "code"        code_t      NOT NULL UNIQUE,  -- active, expired, revoked
    "name"        name_t      NOT NULL,
    "description" shorttext_t
);

-- Catalogo de tipos de evento de dominio ------------------------------------
CREATE TABLE "PB_EventTypes" (
    "id"          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "code"        code_t      NOT NULL UNIQUE,  -- SmeAccountCreated, MatchCreated, ...
    "name"        name_t      NOT NULL,
    "description" shorttext_t
);

-- ============================================================================
-- 2. DOMINIO USER — perfiles PYME y Advisor (tablas separadas) + sesiones
-- ============================================================================

-- PYME (SME) ----------------------------------------------------------------
CREATE TABLE "PB_Pymes" (
    "id"              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "auth0Id"         auth0_id_t  NOT NULL UNIQUE,
    "ownerName"       name_t      NOT NULL,
    "businessEmail"   email_t     NOT NULL UNIQUE,
    "phone"           phone_t     NOT NULL UNIQUE,
    "cedulaJuridica"  cedula_t    NOT NULL UNIQUE,
    "companyName"     name_t      NOT NULL,           -- verificado via Hacienda
    "companySizeId"   UUID        NOT NULL REFERENCES "PB_CompanySizes"("id"),
    "industryId"      UUID        REFERENCES "PB_Industries"("id"),
    "description"     TEXT,
    "pymeStatusId"    UUID        NOT NULL REFERENCES "PB_PymeStatus"("id"),
    "reputationScore" score_t     NOT NULL DEFAULT 0, -- promedio sin redondear
    "ratingCount"     INTEGER     NOT NULL DEFAULT 0,
    "createdAt"       TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt"       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX "idx_pymes_companySize" ON "PB_Pymes"("companySizeId");
CREATE INDEX "idx_pymes_industry"    ON "PB_Pymes"("industryId");
CREATE INDEX "idx_pymes_status"      ON "PB_Pymes"("pymeStatusId");
CREATE TRIGGER trg_pymes_updated BEFORE UPDATE ON "PB_Pymes"
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Advisor -------------------------------------------------------------------
CREATE TABLE "PB_Advisors" (
    "id"              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "auth0Id"         auth0_id_t  NOT NULL UNIQUE,
    "fullName"        name_t      NOT NULL,           -- de LinkedIn
    "displayName"     name_t,
    "personalEmail"   email_t     NOT NULL UNIQUE,
    "phone"           phone_t     NOT NULL UNIQUE,
    "linkedinUrl"     url_t       NOT NULL,
    "description"     TEXT,
    "baseRate"        money_t,
    "isAvailable"     BOOLEAN     NOT NULL DEFAULT TRUE,
    "advisorStatusId" UUID        NOT NULL REFERENCES "PB_AdvisorStatus"("id"),
    "reputationScore" score_t     NOT NULL DEFAULT 0,
    "ratingCount"     INTEGER     NOT NULL DEFAULT 0,
    "createdAt"       TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt"       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX "idx_advisors_status" ON "PB_Advisors"("advisorStatusId");
CREATE TRIGGER trg_advisors_updated BEFORE UPDATE ON "PB_Advisors"
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Experiencia laboral del advisor (LinkedIn) --------------------------------
CREATE TABLE "PB_AdvisorExperiences" (
    "id"          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "advisorId"   UUID        NOT NULL REFERENCES "PB_Advisors"("id") ON DELETE CASCADE,
    "roleTitle"   name_t      NOT NULL,
    "company"     name_t,
    "startDate"   DATE,
    "endDate"     DATE,        -- NULL = actual
    "description" TEXT,
    "createdAt"   TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX "idx_advisorExperiences_advisor" ON "PB_AdvisorExperiences"("advisorId");

-- Certificaciones del advisor (LinkedIn) ------------------------------------
CREATE TABLE "PB_AdvisorCertifications" (
    "id"        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "advisorId" UUID        NOT NULL REFERENCES "PB_Advisors"("id") ON DELETE CASCADE,
    "name"      name_t      NOT NULL,
    "issuer"    name_t,
    "issuedAt"  DATE,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX "idx_advisorCertifications_advisor" ON "PB_AdvisorCertifications"("advisorId");

-- Industrias / especializacion del advisor (M:N) ----------------------------
CREATE TABLE "PB_AdvisorIndustries" (
    "advisorId"  UUID        NOT NULL REFERENCES "PB_Advisors"("id")   ON DELETE CASCADE,
    "industryId" UUID        NOT NULL REFERENCES "PB_Industries"("id"),
    "createdAt"  TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY ("advisorId","industryId")
);
CREATE INDEX "idx_advisorIndustries_industry" ON "PB_AdvisorIndustries"("industryId");

-- Score por subindustria del advisor (centroide; recalculado al subir use case)
CREATE TABLE "PB_AdvisorSubIndustryScores" (
    "advisorId"       UUID         NOT NULL REFERENCES "PB_Advisors"("id") ON DELETE CASCADE,
    "subIndustryId"   UUID         NOT NULL REFERENCES "PB_SubIndustries"("id"),
    "score"           NUMERIC(6,5) NOT NULL,   -- promedio normalizado de bloques clasificados
    "updatedAt"       TIMESTAMPTZ  NOT NULL DEFAULT now(),
    PRIMARY KEY ("advisorId","subIndustryId")
);
CREATE INDEX "idx_advisorSubScores_subindustry" ON "PB_AdvisorSubIndustryScores"("subIndustryId");

-- Roles asignados a una PYME (N:M PB_Pymes <-> PB_Roles) -------------------
CREATE TABLE "PB_PymeRoles" (
    "pymeId"     UUID        NOT NULL REFERENCES "PB_Pymes"("id")  ON DELETE CASCADE,
    "roleId"     UUID        NOT NULL REFERENCES "PB_Roles"("id"),
    "assignedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY ("pymeId", "roleId")
);
CREATE INDEX "idx_pymeRoles_role" ON "PB_PymeRoles"("roleId");

-- Roles asignados a un Advisor (N:M PB_Advisors <-> PB_Roles) --------------
CREATE TABLE "PB_AdvisorRoles" (
    "advisorId"  UUID        NOT NULL REFERENCES "PB_Advisors"("id") ON DELETE CASCADE,
    "roleId"     UUID        NOT NULL REFERENCES "PB_Roles"("id"),
    "assignedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY ("advisorId", "roleId")
);
CREATE INDEX "idx_advisorRoles_role" ON "PB_AdvisorRoles"("roleId");

-- Sesiones (persistencia/auditoria de sesiones Auth0; runtime en Redis) -----
-- Los roles se resuelven desde PB_PymeRoles / PB_AdvisorRoles; no se persisten como JSON.
CREATE TABLE "PB_Sessions" (
    "id"              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "auth0Id"         auth0_id_t  NOT NULL,
    "accountTypeId"   UUID        NOT NULL REFERENCES "PB_AccountTypes"("id"),
    "pymeId"          UUID        REFERENCES "PB_Pymes"("id")    ON DELETE CASCADE,
    "advisorId"       UUID        REFERENCES "PB_Advisors"("id") ON DELETE CASCADE,
    "sessionStatusId" UUID        NOT NULL REFERENCES "PB_SessionStatus"("id"),
    "ipAddress"       VARCHAR(45),
    "userAgent"       shorttext_t,
    "issuedAt"        TIMESTAMPTZ NOT NULL DEFAULT now(),
    "lastActivityAt"  TIMESTAMPTZ NOT NULL DEFAULT now(),
    "expiresAt"       TIMESTAMPTZ NOT NULL,   -- TTL 3h (max JWT + grace)
    "createdAt"       TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_session_owner CHECK (
        ("pymeId" IS NOT NULL AND "advisorId" IS NULL)
     OR ("pymeId" IS NULL     AND "advisorId" IS NOT NULL)
    )
);
CREATE INDEX "idx_sessions_auth0"   ON "PB_Sessions"("auth0Id");
CREATE INDEX "idx_sessions_pyme"    ON "PB_Sessions"("pymeId");
CREATE INDEX "idx_sessions_advisor" ON "PB_Sessions"("advisorId");
CREATE INDEX "idx_sessions_status"  ON "PB_Sessions"("sessionStatusId");

-- ============================================================================
-- 3. DOMINIO ADVISOR — promesas de exito + reputacion historica
-- ============================================================================

-- Promesas de éxito (max. 3 activas por advisor — regla en servicio) --------
-- verificationStatusId inicia en 'pending'; el AI verification workflow lo
-- actualiza a 'accepted' o 'rejected' tras comparar la promesa con use cases.
-- Solo las promesas con status 'accepted' se muestran en el perfil y se usan
-- en el algoritmo de recomendacion.
CREATE TABLE "PB_Promises" (
    "id"                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "advisorId"            UUID          NOT NULL REFERENCES "PB_Advisors"("id") ON DELETE CASCADE,
    "measureId"            UUID          NOT NULL REFERENCES "PB_Measures"("id"),
    "promisedValue"        NUMERIC(14,4) NOT NULL,
    "explanationText"      TEXT          NOT NULL,
    "timeWindowDays"       INTEGER       NOT NULL,
    "feePercentage"        pct_t         NOT NULL,
    "verificationStatusId" UUID          NOT NULL REFERENCES "PB_PromiseVerificationStatus"("id"),
    "verificationScore"    NUMERIC(7,4),  -- NULL mientras pending; 0-100 una vez verificada
    "isActive"             BOOLEAN       NOT NULL DEFAULT TRUE,
    "createdAt"            TIMESTAMPTZ   NOT NULL DEFAULT now(),
    "updatedAt"            TIMESTAMPTZ   NOT NULL DEFAULT now()
);
CREATE INDEX "idx_promises_advisor" ON "PB_Promises"("advisorId");
CREATE INDEX "idx_promises_measure" ON "PB_Promises"("measureId");
CREATE TRIGGER trg_promises_updated BEFORE UPDATE ON "PB_Promises"
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Similitud coseno de la promesa contra cada subindustria (clasificacion IA) -
-- Permite ordenar promesas por relevancia para la PYME via producto punto
-- entre este vector de scores y el needsVector de la PYME.
CREATE TABLE "PB_PromiseSubIndustryScores" (
    "id"            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "promiseId"     UUID        NOT NULL REFERENCES "PB_Promises"("id") ON DELETE CASCADE,
    "subIndustryId" UUID        NOT NULL REFERENCES "PB_SubIndustries"("id"),
    "score"         pct_t       NOT NULL,
    "createdAt"     TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE ("promiseId","subIndustryId")
);
CREATE INDEX "idx_promiseSubScores_promise"     ON "PB_PromiseSubIndustryScores"("promiseId");
CREATE INDEX "idx_promiseSubScores_subindustry" ON "PB_PromiseSubIndustryScores"("subIndustryId");



-- ============================================================================
-- 4. DOMINIO PYME — needs assessment (versionado) + catalogo de preguntas
-- ============================================================================

-- Catalogo de preguntas del assessment --------------------------------------
CREATE TABLE "PB_QuestionCatalog" (
    "id"           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "questionText" TEXT        NOT NULL,
    "displayOrder" SMALLINT    NOT NULL DEFAULT 0,
    "isActive"     BOOLEAN     NOT NULL DEFAULT TRUE,
    "createdAt"    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX "idx_questions_active" ON "PB_QuestionCatalog"("isActive");

-- Subindustrias asociadas a cada pregunta (M:N) --------------------------------
CREATE TABLE "PB_QuestionSubIndustries" (
    "questionId"    UUID NOT NULL REFERENCES "PB_QuestionCatalog"("id") ON DELETE CASCADE,
    "subIndustryId" UUID NOT NULL REFERENCES "PB_SubIndustries"("id"),
    PRIMARY KEY ("questionId","subIndustryId")
);
CREATE INDEX "idx_questionSubIndustries_subindustry" ON "PB_QuestionSubIndustries"("subIndustryId");

-- Needs assessment (versionado; solo uno activo por PYME) -------------------
CREATE TABLE "PB_NeedsAssessments" (
    "id"            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "pymeId"        UUID        NOT NULL REFERENCES "PB_Pymes"("id") ON DELETE CASCADE,
    "versionNumber" INTEGER     NOT NULL,
    "isActive"      BOOLEAN     NOT NULL DEFAULT TRUE,
    -- distribucion normalizada (suma=1.0); dimension = nro de subindustrias (vectorIndex)
    "needsVector"   vector(32),
    "createdAt"     TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE ("pymeId","versionNumber")
);
CREATE UNIQUE INDEX "uq_needs_activePerPyme"
    ON "PB_NeedsAssessments"("pymeId") WHERE "isActive";

-- Respuestas individuales (1-5) ---------------------------------------------
CREATE TABLE "PB_NeedsAssessmentAnswers" (
    "id"                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "needsAssessmentId" UUID     NOT NULL REFERENCES "PB_NeedsAssessments"("id") ON DELETE CASCADE,
    "questionId"        UUID     NOT NULL REFERENCES "PB_QuestionCatalog"("id"),
    "rating"            SMALLINT NOT NULL CHECK ("rating" BETWEEN 1 AND 5),
    UNIQUE ("needsAssessmentId","questionId")
);
CREATE INDEX "idx_answers_assessment" ON "PB_NeedsAssessmentAnswers"("needsAssessmentId");

-- Score normalizado por subindustria (distribucion relacional) --------------
CREATE TABLE "PB_NeedsAssessmentSubIndustries" (
    "id"                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "needsAssessmentId" UUID         NOT NULL REFERENCES "PB_NeedsAssessments"("id") ON DELETE CASCADE,
    "subIndustryId"     UUID         NOT NULL REFERENCES "PB_SubIndustries"("id"),
    "avgRating"         NUMERIC(5,4) NOT NULL,
    "normalizedScore"   NUMERIC(6,5) NOT NULL,
    UNIQUE ("needsAssessmentId","subIndustryId")
);

-- ============================================================================
-- 4b. MEDIA FILES (PV_ = plataforma; independiente del dominio de negocio)
--     Se crea antes del dominio AI porque PB_Documents la referencia.
-- ============================================================================

-- Catalogo de tipos de medio: define el reproductor/visor a usar ------------
CREATE TABLE "PV_MediaTypes" (
    "mediaTypeId" SERIAL       PRIMARY KEY,
    "name"        VARCHAR(30),
    "playerImpl"  VARCHAR(100)
);

-- Registro de archivos multimedia subidos a la plataforma -------------------
-- userid referencia el auth0Id del usuario que subio el archivo.
-- Un registro PV_MediaFiles puede originar 1..N registros PB_Documents
-- (un mismo archivo puede catalogarse como distintos tipos de documento).
CREATE TABLE "PV_MediaFiles" (
    "mediafileid"  SERIAL       PRIMARY KEY,
    "mediapath"    VARCHAR(500) NOT NULL,
    "deleted"      BOOLEAN      NOT NULL DEFAULT FALSE,
    "lastupdate"   TIMESTAMPTZ  NOT NULL DEFAULT now(),
    "userid"       VARCHAR(64)  NOT NULL,
    "mediatypeid"  INT          NOT NULL REFERENCES "PV_MediaTypes"("mediaTypeId"),
    "sizeMB"       NUMERIC(10,3),
    "encoding"     VARCHAR(100),
    "samplerate"   VARCHAR(50),
    "languagecode" VARCHAR(10)
);
CREATE INDEX "idx_mediafiles_type"    ON "PV_MediaFiles"("mediatypeid");
CREATE INDEX "idx_mediafiles_userid"  ON "PV_MediaFiles"("userid");
CREATE INDEX "idx_mediafiles_deleted" ON "PV_MediaFiles"("deleted");

-- ============================================================================
-- 5. DOMINIO AI — documentos GCS, use cases, bloques (pgvector), recomendaciones
-- ============================================================================

-- Referencia a archivo en Google Cloud Storage -----------------------------
-- "mediafileId" apunta al registro PV_MediaFiles que origino este documento.
-- Un PV_MediaFile puede dar lugar a N PB_Documents (relacion 1 -> N).
CREATE TABLE "PB_Documents" (
    "id"                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "mediafileId"            INT         REFERENCES "PV_MediaFiles"("mediafileid") ON DELETE SET NULL,
    "gcsBucket"              name_t      NOT NULL,
    "gcsObjectPath"          url_t       NOT NULL,
    "originalFilename"       shorttext_t NOT NULL,
    "mimeType"               name_t      NOT NULL DEFAULT 'application/pdf',
    "sizeBytes"              BIGINT,
    "documentTypeId"         UUID        NOT NULL REFERENCES "PB_DocumentTypes"("id"),
    "documentStatusId"       UUID        NOT NULL REFERENCES "PB_DocumentStatus"("id"),
    "uploadedByAccountTypeId" UUID       NOT NULL REFERENCES "PB_AccountTypes"("id"),
    "uploadedByPymeId"       UUID        REFERENCES "PB_Pymes"("id"),
    "uploadedByAdvisorId"    UUID        REFERENCES "PB_Advisors"("id"),
    "uploadedAt"             TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_document_uploader CHECK (
        ("uploadedByPymeId" IS NOT NULL AND "uploadedByAdvisorId" IS NULL)
     OR ("uploadedByPymeId" IS NULL     AND "uploadedByAdvisorId" IS NOT NULL)
    )
);
CREATE INDEX "idx_documents_mediafile" ON "PB_Documents"("mediafileId");
CREATE INDEX "idx_documents_type"      ON "PB_Documents"("documentTypeId");
CREATE INDEX "idx_documents_status"    ON "PB_Documents"("documentStatusId");

-- Use case del advisor (1 PDF procesado) ------------------------------------
CREATE TABLE "PB_UseCases" (
    "id"              UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    "advisorId"       UUID          NOT NULL REFERENCES "PB_Advisors"("id") ON DELETE CASCADE,
    "documentId"      UUID          NOT NULL REFERENCES "PB_Documents"("id"),
    "title"           title_t,
    "industryId"      UUID          REFERENCES "PB_Industries"("id"),
    "companySizeId"   UUID          REFERENCES "PB_CompanySizes"("id"),
    "metricUsed"        name_t,
    "metricValueTypeId" UUID          REFERENCES "PB_MetricValueTypes"("id"),
    "metricBefore"      NUMERIC(14,4),
    "metricAfter"       NUMERIC(14,4),
    "useCaseStatusId" UUID          NOT NULL REFERENCES "PB_UseCaseStatus"("id"),
    "processedAt"     TIMESTAMPTZ,
    "createdAt"       TIMESTAMPTZ   NOT NULL DEFAULT now(),
    "updatedAt"       TIMESTAMPTZ   NOT NULL DEFAULT now()
);
CREATE INDEX "idx_useCases_advisor"  ON "PB_UseCases"("advisorId");
CREATE INDEX "idx_useCases_industry" ON "PB_UseCases"("industryId");
CREATE INDEX "idx_useCases_status"   ON "PB_UseCases"("useCaseStatusId");
CREATE TRIGGER trg_useCases_updated BEFORE UPDATE ON "PB_UseCases"
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Bloques tematicos del documento (embeddings pgvector + hash dedupe) -------
CREATE TABLE "PB_DocumentBlocks" (
    "id"                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "useCaseId"          UUID        NOT NULL REFERENCES "PB_UseCases"("id") ON DELETE CASCADE,
    "advisorId"          UUID        NOT NULL REFERENCES "PB_Advisors"("id") ON DELETE CASCADE,
    "thematicCategoryId" UUID        NOT NULL REFERENCES "PB_ThematicCategories"("id"),
    "industryId"         UUID        REFERENCES "PB_Industries"("id"),   -- indice invertido
    "content"            TEXT        NOT NULL,
    "contentHash"        hash_t      NOT NULL,
    "embedding"          vector(768) NOT NULL,
    "createdAt"          TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE ("advisorId","contentHash")   -- dedupe por advisor
);
CREATE INDEX "idx_blocks_useCase"  ON "PB_DocumentBlocks"("useCaseId");
CREATE INDEX "idx_blocks_category" ON "PB_DocumentBlocks"("thematicCategoryId");
CREATE INDEX "idx_blocks_industry" ON "PB_DocumentBlocks"("industryId");

-- Conjunto de recomendaciones (versionado; uno activo por PYME) -------------
CREATE TABLE "PB_RecommendationSets" (
    "id"            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "pymeId"        UUID        NOT NULL REFERENCES "PB_Pymes"("id") ON DELETE CASCADE,
    "versionNumber" INTEGER     NOT NULL,
    "isActive"      BOOLEAN     NOT NULL DEFAULT TRUE,
    "generatedAt"   TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE ("pymeId","versionNumber")
);
CREATE UNIQUE INDEX "uq_recommendation_activePerPyme"
    ON "PB_RecommendationSets"("pymeId") WHERE "isActive";

-- Items rankeados del conjunto de recomendaciones ---------------------------
CREATE TABLE "PB_RecommendationItems" (
    "id"                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "recommendationSetId" UUID     NOT NULL REFERENCES "PB_RecommendationSets"("id") ON DELETE CASCADE,
    "advisorId"           UUID     NOT NULL REFERENCES "PB_Advisors"("id"),
    "rank"                SMALLINT NOT NULL,
    "compositeScore"      NUMERIC(8,6) NOT NULL,
    "semanticScore"       NUMERIC(8,6),
    "needsAlignmentScore" NUMERIC(8,6),
    "reputationScore"     score_t,
    "createdAt"           TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE ("recommendationSetId","advisorId"),
    UNIQUE ("recommendationSetId","rank")
);
CREATE INDEX "idx_recItems_advisor" ON "PB_RecommendationItems"("advisorId");

-- ============================================================================
-- 6. DOMINIO MATCHING — tabla unificada PB_Matches (incluye ciclo de swipe)
-- ============================================================================
-- Ciclo (PB_MatchStatus.code):
--   waiting_swipe -> match | not_swiped ;  match -> unmatch | finalized
CREATE TABLE "PB_Matches" (
    "id"            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "pymeId"        UUID        NOT NULL REFERENCES "PB_Pymes"("id")    ON DELETE CASCADE,
    "advisorId"     UUID        NOT NULL REFERENCES "PB_Advisors"("id") ON DELETE CASCADE,
    "matchStatusId" UUID        NOT NULL REFERENCES "PB_MatchStatus"("id"),
    "createdAt"     TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE ("pymeId","advisorId")
);
CREATE INDEX "idx_matches_pyme"    ON "PB_Matches"("pymeId");
CREATE INDEX "idx_matches_advisor" ON "PB_Matches"("advisorId");
CREATE INDEX "idx_matches_status"  ON "PB_Matches"("matchStatusId");

-- Historial de estado por match (waiting_swipe, match, not_swiped, etc.) ----
CREATE TABLE "PB_MatchStatusHistory" (
    "matchId"       UUID        NOT NULL REFERENCES "PB_Matches"("id") ON DELETE CASCADE,
    "matchStatusId" UUID        NOT NULL REFERENCES "PB_MatchStatus"("id"),
    "occurredAt"    TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY ("matchId","matchStatusId")
);
CREATE INDEX "idx_matchStatus_match" ON "PB_MatchStatusHistory"("matchId");

-- ============================================================================
-- 7. DOMINIO COMMUNICATION — chat estilo WhatsApp
-- ============================================================================

-- Sesion de chat por match --------------------------------------------------
CREATE TABLE "PB_ChatSessions" (
    "id"        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "matchId"   UUID        NOT NULL UNIQUE REFERENCES "PB_Matches"("id") ON DELETE CASCADE,
    "isActive"  BOOLEAN     NOT NULL DEFAULT TRUE,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Mensajes (horas de envio/entrega/lectura; mensajes de sistema) ------------
CREATE TABLE "PB_Messages" (
    "id"                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "chatSessionId"       UUID        NOT NULL REFERENCES "PB_ChatSessions"("id") ON DELETE CASCADE,
    "messageTypeId"       UUID        NOT NULL REFERENCES "PB_MessageTypes"("id"),
    "senderAccountTypeId" UUID        REFERENCES "PB_AccountTypes"("id"),   -- NULL si system
    "senderPymeId"        UUID        REFERENCES "PB_Pymes"("id"),
    "senderAdvisorId"     UUID        REFERENCES "PB_Advisors"("id"),
    "content"             TEXT        NOT NULL,
    "createdAt"           TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_message_sender CHECK (
        ("senderPymeId" IS NOT NULL AND "senderAdvisorId" IS NULL)
     OR ("senderPymeId" IS NULL     AND "senderAdvisorId" IS NOT NULL)
     OR ("senderPymeId" IS NULL     AND "senderAdvisorId" IS NULL)
    )
);
CREATE INDEX "idx_messages_session" ON "PB_Messages"("chatSessionId","createdAt");

-- Historial de estado por mensaje (sent, delivered, read + timestamp) -------
CREATE TABLE "PB_MessageStatusHistory" (
    "messageId"       UUID        NOT NULL REFERENCES "PB_Messages"("id") ON DELETE CASCADE,
    "messageStatusId" UUID        NOT NULL REFERENCES "PB_MessageStatus"("id"),
    "occurredAt"      TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY ("messageId","messageStatusId")
);
CREATE INDEX "idx_messageStatus_message" ON "PB_MessageStatusHistory"("messageId");

-- Intentos de mensaje bloqueados (auditoria off-platform) -------------------
CREATE TABLE "PB_BlockedMessageAttempts" (
    "id"                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "chatSessionId"            UUID        NOT NULL REFERENCES "PB_ChatSessions"("id") ON DELETE CASCADE,
    "senderPymeId"             UUID        REFERENCES "PB_Pymes"("id"),
    "senderAdvisorId"          UUID        REFERENCES "PB_Advisors"("id"),
    "attemptedContent"         TEXT        NOT NULL,
    "blockedContentCategoryId" UUID        NOT NULL REFERENCES "PB_BlockedContentCategories"("id"),
    "createdAt"                TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX "idx_blocked_session" ON "PB_BlockedMessageAttempts"("chatSessionId");

-- ============================================================================
-- 8. DOMINIO CONTRACT — contrato + versiones (versionaje de contraofertas)
-- ============================================================================

-- Contrato = hilo de negociacion de un match --------------------------------
CREATE TABLE "PB_Contracts" (
    "id"               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "matchId"          UUID        NOT NULL UNIQUE REFERENCES "PB_Matches"("id") ON DELETE CASCADE,
    "contractStatusId" UUID        NOT NULL REFERENCES "PB_ContractStatus"("id"),
    "currentVersionId" UUID,        -- FK a PB_ContractVersions (se agrega abajo)
    "createdAt"        TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt"        TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER trg_contracts_updated BEFORE UPDATE ON "PB_Contracts"
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Version de contrato: cada propuesta / contraoferta ------------------------
CREATE TABLE "PB_ContractVersions" (
    "id"                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "contractId"              UUID        NOT NULL REFERENCES "PB_Contracts"("id") ON DELETE CASCADE,
    "versionNumber"           INTEGER     NOT NULL,
    "proposedByAccountTypeId" UUID        NOT NULL REFERENCES "PB_AccountTypes"("id"),
    "proposedByPymeId"        UUID        REFERENCES "PB_Pymes"("id"),
    "proposedByAdvisorId"     UUID        REFERENCES "PB_Advisors"("id"),
    "contractVersionStatusId" UUID        NOT NULL REFERENCES "PB_ContractVersionStatus"("id"),
    "implementationBudget"    money_t     NOT NULL,
    "monthlyRetainer"         money_t     NOT NULL,
    "startDate"               DATE        NOT NULL,
    "endDate"                 DATE        NOT NULL,
    "commissionPct"           pct_t       NOT NULL,
    "mainObjective"           TEXT        NOT NULL,
    "advisorResultProfit"     money_t,
    "createdAt"               TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE ("contractId","versionNumber"),
    CONSTRAINT chk_cv_proposer CHECK (
        ("proposedByPymeId" IS NOT NULL AND "proposedByAdvisorId" IS NULL)
     OR ("proposedByPymeId" IS NULL     AND "proposedByAdvisorId" IS NOT NULL)
    )
);
CREATE INDEX "idx_cv_contract" ON "PB_ContractVersions"("contractId");
CREATE INDEX "idx_cv_status"   ON "PB_ContractVersions"("contractVersionStatusId");

-- FK diferida currentVersionId ----------------------------------------------
ALTER TABLE "PB_Contracts"
    ADD CONSTRAINT fk_contracts_currentVersion
    FOREIGN KEY ("currentVersionId") REFERENCES "PB_ContractVersions"("id");

-- Metricas por version de contrato (baseline se registra al iniciar proyecto)
CREATE TABLE "PB_ContractMetrics" (
    "id"                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "contractVersionId" UUID          NOT NULL REFERENCES "PB_ContractVersions"("id") ON DELETE CASCADE,
    "name"              name_t        NOT NULL,
    "metricValueTypeId" UUID          NOT NULL REFERENCES "PB_MetricValueTypes"("id"),
    "target"            NUMERIC(14,4) NOT NULL,
    "baselineValue"     NUMERIC(14,4),   -- NULL hasta que el proyecto inicia
    "createdAt"         TIMESTAMPTZ   NOT NULL DEFAULT now(),
    UNIQUE ("contractVersionId","name")
);
CREATE INDEX "idx_contractMetrics_version" ON "PB_ContractMetrics"("contractVersionId");

-- Fases del roadmap por version -----------------------------------------------
CREATE TABLE "PB_ContractRoadmapPhases" (
    "id"                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    "contractVersionId" UUID        NOT NULL REFERENCES "PB_ContractVersions"("id") ON DELETE CASCADE,
    "phaseOrder"        SMALLINT    NOT NULL,
    "name"              name_t      NOT NULL,
    "description"       TEXT,
    "completed"         BOOLEAN     NOT NULL DEFAULT FALSE,
    "completedAt"       TIMESTAMPTZ,
    UNIQUE ("contractVersionId","phaseOrder")
);
CREATE INDEX "idx_roadmap_version" ON "PB_ContractRoadmapPhases"("contractVersionId");

-- Metricas objetivo por fase (una fase puede exigir N metricas a cierto %) --
CREATE TABLE "PB_PhaseMetricTargets" (
    "id"                UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    "phaseId"           UUID         NOT NULL REFERENCES "PB_ContractRoadmapPhases"("id") ON DELETE CASCADE,
    "contractMetricId"  UUID         NOT NULL REFERENCES "PB_ContractMetrics"("id"),
    "targetPct"         pct_t        NOT NULL,   -- % del target global que debe alcanzarse en esta fase
    UNIQUE ("phaseId","contractMetricId")
);
CREATE INDEX "idx_phaseMetricTargets_phase" ON "PB_PhaseMetricTargets"("phaseId");

-- Subfases (unidades de trabajo dentro de una fase) -------------------------
CREATE TABLE "PB_ContractSubPhases" (
    "id"          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    "phaseId"     UUID        NOT NULL REFERENCES "PB_ContractRoadmapPhases"("id") ON DELETE CASCADE,
    "name"        name_t      NOT NULL,
    "description" TEXT,
    "completed"   BOOLEAN     NOT NULL DEFAULT FALSE,
    "completedAt" TIMESTAMPTZ
);
CREATE INDEX "idx_subphases_phase" ON "PB_ContractSubPhases"("phaseId");

-- ============================================================================
-- 9. DOMINIO PROJECT — proyecto, fases, subfases, salud, KPIs
-- ============================================================================

-- Proyecto (creado al aceptar contrato) -------------------------------------
CREATE TABLE "PB_Projects" (
    "id"                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "contractVersionId" UUID        NOT NULL UNIQUE REFERENCES "PB_ContractVersions"("id"),
    "projectStatusId"   UUID        NOT NULL REFERENCES "PB_ProjectStatus"("id"),
    "completedAt"       TIMESTAMPTZ,
    "createdAt"         TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt"         TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX "idx_projects_status"  ON "PB_Projects"("projectStatusId");
CREATE TRIGGER trg_projects_updated BEFORE UPDATE ON "PB_Projects"
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();



-- Historial de salud del proyecto -------------------------------------------
CREATE TABLE "PB_ProjectHealthHistory" (
    "id"                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "projectId"             UUID        NOT NULL REFERENCES "PB_Projects"("id") ON DELETE CASCADE,
    "projectHealthStatusId" UUID        NOT NULL REFERENCES "PB_ProjectHealthStatus"("id"),
    "completedSubPhases"    SMALLINT    NOT NULL,
    "totalSubPhases"        SMALLINT    NOT NULL,
    "healthScore"           NUMERIC(8,2) NOT NULL,
    "timeProgressRatio"     NUMERIC(6,5) NOT NULL,
    "recordedAt"            TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX "idx_health_project" ON "PB_ProjectHealthHistory"("projectId","recordedAt");

-- Validacion de KPIs al cierre (extraida por IA del documento de cierre) ----
CREATE TABLE "PB_ProjectKpiValidations" (
    "id"                  UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    "projectId"           UUID          NOT NULL REFERENCES "PB_Projects"("id") ON DELETE CASCADE,
    "contractMetricId"    UUID          NOT NULL REFERENCES "PB_ContractMetrics"("id"),
    "metricsBefore"       NUMERIC(14,4) NOT NULL,
    "metricsAfter"        NUMERIC(14,4) NOT NULL,
    "finalImprovementPct" pct_t         NOT NULL,
    "met"                 BOOLEAN       NOT NULL,
    "validatedAt"         TIMESTAMPTZ   NOT NULL DEFAULT now(),
    UNIQUE ("projectId","contractMetricId")
);
CREATE INDEX "idx_kpi_project" ON "PB_ProjectKpiValidations"("projectId");

-- ============================================================================
-- 10. DOMINIO REVIEW — resenas (1 por proyecto por parte)
-- ============================================================================
-- pymeId y advisorId son ambos NOT NULL: un proyecto siempre tiene exactamente
-- un pyme y un advisor. reviewerAccountTypeId ('pyme'|'advisor') indica quien
-- escribe la resena; el subject se deduce como la otra parte.
CREATE TABLE "PB_Reviews" (
    "id"                    UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    "projectId"             UUID          NOT NULL REFERENCES "PB_Projects"("id") ON DELETE CASCADE,
    "pymeId"                UUID          NOT NULL REFERENCES "PB_Pymes"("id"),
    "advisorId"             UUID          NOT NULL REFERENCES "PB_Advisors"("id"),
    "reviewerAccountTypeId" UUID          NOT NULL REFERENCES "PB_AccountTypes"("id"),
    "rating"                NUMERIC(3,1)  NOT NULL CHECK ("rating" BETWEEN 1 AND 5 AND "rating" * 2 = FLOOR("rating" * 2)),
    "comment"               TEXT,
    "createdAt"             TIMESTAMPTZ   NOT NULL DEFAULT now(),
    UNIQUE ("projectId","reviewerAccountTypeId")   -- una resena por parte por proyecto
);
CREATE INDEX "idx_reviews_pyme"    ON "PB_Reviews"("pymeId");
CREATE INDEX "idx_reviews_advisor" ON "PB_Reviews"("advisorId");


-- ============================================================================
-- 11. DOMINIO NOTIFICATION — notificaciones, entregas, preferencias
-- ============================================================================

-- Notificacion (destinatario pyme o advisor) --------------------------------
CREATE TABLE "PB_Notifications" (
    "id"                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "recipientAccountTypeId" UUID        NOT NULL REFERENCES "PB_AccountTypes"("id"),
    "recipientPymeId"        UUID        REFERENCES "PB_Pymes"("id")    ON DELETE CASCADE,
    "recipientAdvisorId"     UUID        REFERENCES "PB_Advisors"("id") ON DELETE CASCADE,
    "notificationTypeId"     UUID        NOT NULL REFERENCES "PB_NotificationTypes"("id"),
    "title"                  title_t     NOT NULL,
    "body"                   TEXT,
    "payload"                JSONB       NOT NULL DEFAULT '{}'::jsonb,
    "relatedEntityType"      name_t,
    "relatedEntityId"        UUID,
    "isRead"                 BOOLEAN     NOT NULL DEFAULT FALSE,
    "readAt"                 TIMESTAMPTZ,
    "createdAt"              TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_notification_recipient CHECK (
        ("recipientPymeId" IS NOT NULL AND "recipientAdvisorId" IS NULL)
     OR ("recipientPymeId" IS NULL     AND "recipientAdvisorId" IS NOT NULL)
    )
);
CREATE INDEX "idx_notifications_pyme"    ON "PB_Notifications"("recipientPymeId");
CREATE INDEX "idx_notifications_advisor" ON "PB_Notifications"("recipientAdvisorId");
CREATE INDEX "idx_notifications_type"    ON "PB_Notifications"("notificationTypeId");

-- Entrega por canal ---------------------------------------------------------
CREATE TABLE "PB_NotificationDeliveries" (
    "id"                           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    "notificationId"               UUID        NOT NULL REFERENCES "PB_Notifications"("id") ON DELETE CASCADE,
    "notificationChannelId"        UUID        NOT NULL REFERENCES "PB_NotificationChannels"("id"),
    "notificationDeliveryStatusId" UUID        NOT NULL REFERENCES "PB_NotificationDeliveryStatus"("id"),
    "errorMessage"                 shorttext_t,
    UNIQUE ("notificationId","notificationChannelId")
);
CREATE INDEX "idx_deliveries_notification" ON "PB_NotificationDeliveries"("notificationId");

-- Historial de estado por entrega de notificacion ---------------------------
CREATE TABLE "PB_NotificationDeliveryStatusHistory" (
    "deliveryId"                   UUID        NOT NULL REFERENCES "PB_NotificationDeliveries"("id") ON DELETE CASCADE,
    "notificationDeliveryStatusId" UUID        NOT NULL REFERENCES "PB_NotificationDeliveryStatus"("id"),
    "occurredAt"                   TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY ("deliveryId","notificationDeliveryStatusId")
);
CREATE INDEX "idx_deliveryStatus_delivery" ON "PB_NotificationDeliveryStatusHistory"("deliveryId");

-- Preferencias de notificacion (pyme y advisor; por tipo y canal) -----------
CREATE TABLE "PB_NotificationPreferences" (
    "id"                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "ownerAccountTypeId"    UUID        NOT NULL REFERENCES "PB_AccountTypes"("id"),
    "ownerPymeId"           UUID        REFERENCES "PB_Pymes"("id")    ON DELETE CASCADE,
    "ownerAdvisorId"        UUID        REFERENCES "PB_Advisors"("id") ON DELETE CASCADE,
    "notificationTypeId"    UUID        NOT NULL REFERENCES "PB_NotificationTypes"("id"),
    "notificationChannelId" UUID        NOT NULL REFERENCES "PB_NotificationChannels"("id"),
    "enabled"               BOOLEAN     NOT NULL DEFAULT TRUE,
    "createdAt"             TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt"             TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_pref_owner CHECK (
        ("ownerPymeId" IS NOT NULL AND "ownerAdvisorId" IS NULL)
     OR ("ownerPymeId" IS NULL     AND "ownerAdvisorId" IS NOT NULL)
    ),
    UNIQUE ("ownerPymeId","notificationTypeId","notificationChannelId"),
    UNIQUE ("ownerAdvisorId","notificationTypeId","notificationChannelId")
);
CREATE TRIGGER trg_pref_updated BEFORE UPDATE ON "PB_NotificationPreferences"
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================================
-- 12. DOMINIO EVENT — event sourcing / auditoria de eventos de dominio
-- ============================================================================
CREATE TABLE "PB_DomainEvents" (
    "id"            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "eventTypeId"   UUID        NOT NULL REFERENCES "PB_EventTypes"("id"),
    "aggregateType" name_t,
    "aggregateId"   UUID,
    "payload"       JSONB       NOT NULL DEFAULT '{}'::jsonb,
    "occurredAt"    TIMESTAMPTZ NOT NULL DEFAULT now(),
    "publishedAt"   TIMESTAMPTZ,
    "createdAt"     TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX "idx_events_type"      ON "PB_DomainEvents"("eventTypeId");
CREATE INDEX "idx_events_aggregate" ON "PB_DomainEvents"("aggregateType","aggregateId");
CREATE INDEX "idx_events_occurred"  ON "PB_DomainEvents"("occurredAt");

-- ============================================================================
-- 14. LOGS
-- ============================================================================

CREATE TABLE "PV_LogTypes" (
    "logtypeid"       SERIAL       PRIMARY KEY,
    "name"            VARCHAR(45)  NOT NULL,
    "ref1description" VARCHAR(120) NOT NULL,
    "ref2description" VARCHAR(120) NOT NULL,
    "val1description" VARCHAR(120) NOT NULL,
    "val2description" VARCHAR(120) NOT NULL
);

CREATE TABLE "PV_LogSource" (
    "logsourceid" SERIAL      PRIMARY KEY,
    "name"        VARCHAR(45) NOT NULL
);

CREATE TABLE "PV_LogSeverity" (
    "logseverityid" SERIAL      PRIMARY KEY,
    "name"          VARCHAR(45) NOT NULL
);

CREATE TABLE "PV_Logs" (
    "logid"        SERIAL        PRIMARY KEY,
    "description"  VARCHAR(120)  NOT NULL,
    "name"         VARCHAR(50)   NOT NULL,
    "posttime"     TIMESTAMP     NOT NULL DEFAULT now(),
    "computer"     VARCHAR(45)   NOT NULL,
    "trace"        VARCHAR(200)  NOT NULL,
    "referenceid1" BIGINT,
    "referenceid2" BIGINT,
    "checksum"      VARCHAR(250)  NOT NULL,
    "logtypeid"     INT           NOT NULL REFERENCES "PV_LogTypes"("logtypeid"),
    "logsourceid"   INT           NOT NULL REFERENCES "PV_LogSource"("logsourceid"),
    "logseverityid" INT           NOT NULL REFERENCES "PV_LogSeverity"("logseverityid"),
    "value1"        VARCHAR(500),
    "value2"        VARCHAR(500)
);

-- ============================================================================
-- 15. INDICES VECTORIALES (pgvector / HNSW, cosine)
-- ============================================================================
CREATE INDEX "idx_blocks_embedding_hnsw"
    ON "PB_DocumentBlocks" USING hnsw ("embedding" vector_cosine_ops);

CREATE INDEX "idx_industries_embedding_hnsw"
    ON "PB_Industries" USING hnsw ("representativeEmbedding" vector_cosine_ops);

CREATE INDEX "idx_subindustries_embedding_hnsw"
    ON "PB_SubIndustries" USING hnsw ("representativeEmbedding" vector_cosine_ops);