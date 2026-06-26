"use client";
// Botón flotante (abajo-derecha) para reiniciar la demo al estado inicial y volver
// a correr la journey de Emma (PYME) y Maria (Advisor). Llama a POST /api/demo/reset
// (solo activo con USE_MOCKS en el backend), limpia la caché de queries y recarga.
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { apiClient } from "@/lib/apiClient";
import { useNotificationStore } from "@/store/notificationStore";

export function DemoResetButton() {
  const [busy, setBusy] = useState(false);
  const qc = useQueryClient();
  const { publish } = useNotificationStore();

  const onReset = async () => {
    if (busy) return;
    setBusy(true);
    const res = await apiClient.request<{ message: string }>("/api/demo/reset", { method: "POST" });
    if (res.success) {
      publish({ type: "success", title: "Demo reiniciada", message: "Estado restaurado. Recargando…", duration: 1500 });
      qc.clear();
      setTimeout(() => window.location.reload(), 600);
    } else {
      setBusy(false);
      publish({ type: "error", title: "No se pudo reiniciar", message: res.error ?? "Error desconocido", duration: 4000 });
    }
  };

  return (
    <button
      onClick={onReset}
      disabled={busy}
      title="Reiniciar la demo al estado inicial (Emma y Maria)"
      className="font-mono"
      style={{
        position: "fixed",
        right: 20,
        bottom: 20,
        zIndex: 60,
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 16px",
        borderRadius: 999,
        cursor: busy ? "wait" : "pointer",
        fontWeight: 700,
        fontSize: 13,
        color: "#fff",
        background: "var(--ink)",
        border: "var(--bd) solid var(--ink)",
        boxShadow: "var(--sh-pop)",
        opacity: busy ? 0.6 : 1,
      }}
    >
      <span style={{ fontSize: 15 }}>↺</span>
      {busy ? "Reiniciando…" : "Reiniciar demo"}
    </button>
  );
}
