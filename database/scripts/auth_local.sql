-- ============================================================================
--  PymeBoost — Extensión de schema del PERFIL LOCAL (MVP)
--  Motor objetivo : PostgreSQL 16 + pgvector (imagen pgvector/pgvector:pg16)
-- ----------------------------------------------------------------------------
--  CONTEXTO (ver docs/mvpspec.md §2.3):
--  El diseño cloud delegaba la autenticación en Auth0 (campo "auth0Id"), por lo
--  que NO existe almacenamiento de credenciales en el schema original. El MVP
--  corre 100% local con un mock JWT propio y password real (bcrypt), de modo que
--  necesita persistir credenciales. Esta tabla es esa extensión, aislada en un
--  archivo aparte para dejar explícita la desviación respecto al README.
--
--  Hash: bcrypt generado vía pgcrypto (crypt + gen_salt('bf')). Formato $2a$,
--  compatible con passlib/bcrypt en el backend (WS-3).
-- ============================================================================

CREATE TABLE "PB_AuthCredentials" (
    "id"            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "accountTypeId" UUID        NOT NULL REFERENCES "PB_AccountTypes"("id"),
    "pymeId"        UUID        REFERENCES "PB_Pymes"("id")    ON DELETE CASCADE,
    "advisorId"     UUID        REFERENCES "PB_Advisors"("id") ON DELETE CASCADE,
    "email"         email_t     NOT NULL UNIQUE,
    "passwordHash"  VARCHAR(72) NOT NULL,            -- bcrypt ($2a$, 60 chars)
    "createdAt"     TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt"     TIMESTAMPTZ NOT NULL DEFAULT now(),
    -- Polimorfismo dueño: exactamente una PYME o un Advisor (igual convención
    -- que PB_Sessions / PB_Notifications en el creation script).
    CONSTRAINT chk_authcred_owner CHECK (
        ("pymeId" IS NOT NULL AND "advisorId" IS NULL)
     OR ("pymeId" IS NULL     AND "advisorId" IS NOT NULL)
    )
);
CREATE INDEX "idx_authcred_pyme"    ON "PB_AuthCredentials"("pymeId");
CREATE INDEX "idx_authcred_advisor" ON "PB_AuthCredentials"("advisorId");
CREATE TRIGGER trg_authcred_updated BEFORE UPDATE ON "PB_AuthCredentials"
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
