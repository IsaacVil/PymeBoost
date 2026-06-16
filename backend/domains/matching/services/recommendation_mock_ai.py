"""Local mock-AI for matching recommendations.

Per docs/mvpspec.md, the MVP runs with USE_MOCKS=true and has no real AI
(no pgvector similarity / LLM). This service produces a deterministic enrichment
for each advisor (same advisor → same values) so the deck is stable across calls.
In a fuller build this is replaced by the AI domain's recommendation engine.
"""
import hashlib

_PROFILES = [
    {
        "industry": "Retail · E-commerce · Moda",
        "process": "Optimización de pauta y embudo digital",
        "ai_objective": "Subir la conversión de campañas pagadas de 2.1% a 3.4% (+25%) y reducir el CPA 15% en 4 meses.",
        "success_metric": {"label": "Tasa de conversión de campañas", "before": "2.1%", "after": "3.4%", "delta": "+25%"},
        "gain_basis": "de las ventas adicionales generadas",
    },
    {
        "industry": "Servicios · Retail · B2B",
        "process": "Automatización de seguimiento y recompra",
        "ai_objective": "Subir la retención de clientes de 41% a 49% (+19%) y recuperar 22% de carritos abandonados en 4 meses.",
        "success_metric": {"label": "Retención de clientes", "before": "41%", "after": "49%", "delta": "+19%"},
        "gain_basis": "de la recompra recuperada",
    },
    {
        "industry": "Retail · Tiendas online",
        "process": "Optimización de conversión y checkout",
        "ai_objective": "Bajar el costo por adquisición 18% y subir 12% el cierre de checkout en 4 meses.",
        "success_metric": {"label": "Costo por adquisición (CPA)", "before": "₡14k", "after": "₡11.5k", "delta": "−18%"},
        "gain_basis": "de la reducción de costos de adquisición",
    },
    {
        "industry": "Retail · Alimentos · Moda",
        "process": "Reestructuración de pricing y márgenes",
        "ai_objective": "Mejorar el margen bruto de 38% a 50% (+12 pts) reajustando precios por línea en 4 meses.",
        "success_metric": {"label": "Margen bruto", "before": "38%", "after": "50%", "delta": "+12 pts"},
        "gain_basis": "del margen adicional generado",
    },
]


class MockMatchingAI:
    """Deterministic, local stand-in for the AI recommendation engine."""

    def enrich(self, advisor_id: str, base_rate: int) -> dict:
        seed = int(hashlib.md5(str(advisor_id).encode()).hexdigest(), 16)
        profile = _PROFILES[seed % len(_PROFILES)]
        compat = 3 + (seed % 3)  # 3..5
        gain_pct = 6 + (seed % 5)  # 6..10
        est = int(base_rate * 4 * (gain_pct / 100) * 8)  # rough deterministic estimate
        years = 6 + (seed % 8)  # 6..13
        return {
            "industry": profile["industry"],
            "process": profile["process"],
            "ai_objective": profile["ai_objective"],
            "success_metric": profile["success_metric"],
            "advisor_gain": {"pct": gain_pct, "basis": profile["gain_basis"], "est": est, "months": 4},
            "compat": compat,
            "years": years,
        }
