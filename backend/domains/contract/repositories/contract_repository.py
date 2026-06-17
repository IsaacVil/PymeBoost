"""Data access for contracts (contract domain). Repository pattern, ORM only.

Cross-domain participant read of PB_Matches is an accepted MVP deviation (see
README Agent Validations). Contract-status code is a catalog lookup via text()
(same accepted pattern as other domains).
"""
from sqlalchemy import func, select, text
from sqlalchemy.orm import Session

from backend.domains.contract.models.contract_model import ContractModel
from backend.domains.contract.models.contract_version_model import ContractVersionModel
from backend.domains.matching.models.match_model import MatchModel  # cross-domain read (MVP)


class ContractRepository:
    def find_match(self, db: Session, match_id: str) -> MatchModel | None:
        return db.execute(select(MatchModel).where(MatchModel.id == match_id)).scalar_one_or_none()

    def find_by_match(self, db: Session, match_id: str) -> ContractModel | None:
        return db.execute(
            select(ContractModel).where(ContractModel.match_id == match_id)
        ).scalar_one_or_none()

    def find_version(self, db: Session, version_id: str) -> ContractVersionModel | None:
        return db.execute(
            select(ContractVersionModel).where(ContractVersionModel.id == version_id)
        ).scalar_one_or_none()

    def status_code_by_id(self, db: Session, status_id: str) -> str | None:
        row = db.execute(
            text('SELECT "code" FROM "PB_ContractStatus" WHERE "id" = :id'), {"id": status_id}
        ).scalar_one_or_none()
        return str(row) if row is not None else None

    # --- catalog lookups (code -> id) --------------------------------------
    def _catalog_id(self, db: Session, table: str, code: str) -> str | None:
        row = db.execute(
            text(f'SELECT "id" FROM "{table}" WHERE "code" = :code'), {"code": code}
        ).scalar_one_or_none()
        return str(row) if row is not None else None

    def contract_status_id(self, db: Session, code: str) -> str | None:
        return self._catalog_id(db, "PB_ContractStatus", code)

    def version_status_id(self, db: Session, code: str) -> str | None:
        return self._catalog_id(db, "PB_ContractVersionStatus", code)

    def account_type_id(self, db: Session, code: str) -> str | None:
        return self._catalog_id(db, "PB_AccountTypes", code)

    def project_status_id(self, db: Session, code: str) -> str | None:
        return self._catalog_id(db, "PB_ProjectStatus", code)

    def match_status_id(self, db: Session, code: str) -> str | None:
        return self._catalog_id(db, "PB_MatchStatus", code)

    # --- writes ------------------------------------------------------------
    def create_contract(self, db: Session, match_id: str, status_id: str) -> ContractModel:
        contract = ContractModel(match_id=match_id, contract_status_id=status_id)
        db.add(contract)
        db.flush()
        return contract

    def next_version_number(self, db: Session, contract_id: str) -> int:
        current = db.execute(
            select(func.max(ContractVersionModel.version_number)).where(
                ContractVersionModel.contract_id == contract_id
            )
        ).scalar_one_or_none()
        return (current or 0) + 1

    def add_version(self, db: Session, version: ContractVersionModel) -> ContractVersionModel:
        db.add(version)
        db.flush()
        return version

    def set_version_status(self, db: Session, version_id: str, status_id: str) -> None:
        db.execute(
            text('UPDATE "PB_ContractVersions" SET "contractVersionStatusId" = :s WHERE "id" = :id'),
            {"s": status_id, "id": version_id},
        )

    def update_contract(self, db: Session, contract_id: str, status_id: str, current_version_id: str | None) -> None:
        if current_version_id is not None:
            db.execute(
                text('UPDATE "PB_Contracts" SET "contractStatusId" = :s, "currentVersionId" = :v WHERE "id" = :id'),
                {"s": status_id, "v": current_version_id, "id": contract_id},
            )
        else:
            db.execute(
                text('UPDATE "PB_Contracts" SET "contractStatusId" = :s WHERE "id" = :id'),
                {"s": status_id, "id": contract_id},
            )

    def update_match_status(self, db: Session, match_id: str, status_id: str) -> None:
        db.execute(
            text('UPDATE "PB_Matches" SET "matchStatusId" = :s WHERE "id" = :id'),
            {"s": status_id, "id": match_id},
        )

    def find_project_by_version(self, db: Session, version_id: str) -> str | None:
        row = db.execute(
            text('SELECT "id" FROM "PB_Projects" WHERE "contractVersionId" = :v'), {"v": version_id}
        ).scalar_one_or_none()
        return str(row) if row is not None else None

    def create_project(self, db: Session, version_id: str, status_id: str) -> str:
        return str(db.execute(
            text(
                'INSERT INTO "PB_Projects" ("contractVersionId", "projectStatusId") '
                'VALUES (:v, :s) RETURNING "id"'
            ),
            {"v": version_id, "s": status_id},
        ).scalar_one())

    def add_system_message(self, db: Session, match_id: str, content: str) -> None:
        session_id = db.execute(
            text('SELECT "id" FROM "PB_ChatSessions" WHERE "matchId" = :m'), {"m": match_id}
        ).scalar_one_or_none()
        if session_id is None:
            session_id = db.execute(
                text('INSERT INTO "PB_ChatSessions" ("matchId", "isActive") VALUES (:m, TRUE) RETURNING "id"'),
                {"m": match_id},
            ).scalar_one()
        system_type_id = db.execute(
            text('SELECT "id" FROM "PB_MessageTypes" WHERE "code" = \'system\'')
        ).scalar_one()
        db.execute(
            text(
                'INSERT INTO "PB_Messages" ("chatSessionId", "messageTypeId", "content") '
                "VALUES (:s, :t, :c)"
            ),
            {"s": str(session_id), "t": str(system_type_id), "c": content},
        )

    def seed_project_roadmap(self, db: Session, version_id: str, project_id: str, objective: str) -> None:
        """Generate a starter roadmap + KPIs so the dashboard has real content
        once the contract is activated (mirrors seed_dev.sql §8)."""
        metric_pct_type = db.execute(
            text('SELECT "id" FROM "PB_MetricValueTypes" WHERE "code" = \'percentage\'')
        ).scalar_one_or_none()
        # Two KPIs derived from the contract.
        metrics = [
            ("Conversión de campañas", 25.0, 2.1),
            ("Retención de clientes", 15.0, 41.0),
        ]
        metric_ids: list[str] = []
        for name, target, baseline in metrics:
            mid = db.execute(
                text(
                    'INSERT INTO "PB_ContractMetrics" ("contractVersionId", "name", "metricValueTypeId", "target", "baselineValue") '
                    'VALUES (:v, :n, :t, :tg, :bl) RETURNING "id"'
                ),
                {"v": version_id, "n": name, "t": str(metric_pct_type), "tg": target, "bl": baseline},
            ).scalar_one()
            metric_ids.append(str(mid))
        # Three phases; the first is completed so progress is visible.
        phases = [
            (1, "Análisis Inicial", "Auditoría y baseline de métricas.", True,
             ["Auditoría de la situación actual", "Identificación de público objetivo", "Análisis de métricas históricas"]),
            (2, "Implementación", "Ejecución del plan acordado.", False,
             ["Definición del plan de trabajo", "Ejecución de las acciones", "Seguimiento semanal"]),
            (3, "Optimización", "Ajustes finales según resultados.", False,
             ["Medición de resultados", "Ajuste de la estrategia", "Reporte de cierre"]),
        ]
        for order, name, desc, completed, subs in phases:
            phase_id = db.execute(
                text(
                    'INSERT INTO "PB_ContractRoadmapPhases" ("contractVersionId", "phaseOrder", "name", "description", "completed", "completedAt") '
                    'VALUES (:v, :o, :n, :d, :c, CASE WHEN :c THEN now() ELSE NULL END) RETURNING "id"'
                ),
                {"v": version_id, "o": order, "n": name, "d": desc, "c": completed},
            ).scalar_one()
            for sub in subs:
                db.execute(
                    text(
                        'INSERT INTO "PB_ContractSubPhases" ("phaseId", "name", "completed", "completedAt") '
                        'VALUES (:p, :n, :c, CASE WHEN :c THEN now() ELSE NULL END)'
                    ),
                    {"p": str(phase_id), "n": sub, "c": completed},
                )
        # KPI validations (before/after) scoped to the project.
        for mid, (name, target, baseline) in zip(metric_ids, metrics):
            db.execute(
                text(
                    'INSERT INTO "PB_ProjectKpiValidations" ("projectId", "contractMetricId", "metricsBefore", "metricsAfter", "finalImprovementPct", "met") '
                    'VALUES (:p, :m, :b, :a, :imp, :met)'
                ),
                {"p": project_id, "m": mid, "b": baseline, "a": baseline, "imp": 0, "met": False},
            )
