"use client";
// Tinder-style swipe deck, ported from prototype/app/matching.jsx.
// Pointer-drag with rotation + APPROVED/REJECTED stamps + fly-out animation.
import { CSSProperties, PointerEvent, ReactNode, useCallback, useEffect, useRef, useState } from "react";

import { AdvisorCard } from "./AdvisorCard";
import { DeckAdvisor } from "../data/advisors";

const THRESH = 120;

interface SwipeDeckProps {
  advisors: DeckAdvisor[];
  onDecision?: (dir: "left" | "right", advisor: DeckAdvisor) => void;
}

export function SwipeDeck({ advisors, onDecision }: SwipeDeckProps) {
  const [idx, setIdx] = useState(0);
  const [drag, setDrag] = useState({ x: 0, y: 0, active: false });
  const [flyOut, setFlyOut] = useState<{ dir: "left" | "right" } | null>(null);
  const startRef = useRef<{ x: number; y: number } | null>(null);

  const current = advisors[idx];
  const next1 = advisors[idx + 1];
  const next2 = advisors[idx + 2];

  useEffect(() => {
    setIdx(0);
    setDrag({ x: 0, y: 0, active: false });
    setFlyOut(null);
  }, [advisors]);

  const decide = useCallback(
    (dir: "left" | "right") => {
      if (flyOut) return;
      setFlyOut({ dir });
      const adv = advisors[idx];
      setTimeout(() => {
        onDecision?.(dir, adv);
        setIdx((i) => i + 1);
        setDrag({ x: 0, y: 0, active: false });
        setFlyOut(null);
      }, 280);
    },
    [flyOut, idx, advisors, onDecision],
  );

  const onDown = (e: PointerEvent) => {
    if (flyOut) return;
    startRef.current = { x: e.clientX, y: e.clientY };
    setDrag((d) => ({ ...d, active: true }));
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: PointerEvent) => {
    if (!startRef.current) return;
    setDrag({ x: e.clientX - startRef.current.x, y: e.clientY - startRef.current.y, active: true });
  };
  const onUp = () => {
    if (!startRef.current) return;
    const { x } = drag;
    startRef.current = null;
    if (x > THRESH) decide("right");
    else if (x < -THRESH) decide("left");
    else setDrag({ x: 0, y: 0, active: false });
  };

  const cardShell = (extra: CSSProperties = {}): CSSProperties => ({
    position: "absolute",
    inset: 0,
    background: "var(--surface)",
    border: "var(--bd) solid var(--ink)",
    borderRadius: "var(--r-xl)",
    boxShadow: "var(--sh-card)",
    padding: 20,
    overflow: "hidden",
    ...extra,
  });

  if (!current) {
    return (
      <div style={{ width: 382, maxWidth: "100%", margin: "0 auto" }}>
        <div style={{ ...cardShell({ position: "relative", inset: "auto" }), textAlign: "center", padding: "48px 28px" }}>
          <div style={{ fontSize: 42 }}>🗂️</div>
          <h3 style={{ fontSize: 20, marginTop: 10 }}>No hay más advisors por hoy</h3>
          <p style={{ color: "var(--ink-soft)", fontSize: 13.5, marginTop: 8 }}>
            El motor de IA está buscando nuevas coincidencias según el contexto de tu PYME. Revisá tus matches en{" "}
            <b>Mensajes</b> mientras tanto.
          </p>
          <button
            onClick={() => setIdx(0)}
            className="font-mono"
            style={{ marginTop: 18, background: "var(--surface)", border: "var(--bd) solid var(--ink)", boxShadow: "var(--sh-pop)", borderRadius: "var(--r-md)", padding: "7px 14px", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}
          >
            ↻ Reiniciar deck (demo)
          </button>
        </div>
      </div>
    );
  }

  const rot = flyOut ? (flyOut.dir === "right" ? 1 : -1) * 22 : drag.x * 0.05;
  const tx = flyOut ? (flyOut.dir === "right" ? 1 : -1) * 700 : drag.x;
  const ty = flyOut ? -40 : drag.y;
  const approveOp = Math.max(0, Math.min(1, (flyOut?.dir === "right" ? 1 : drag.x) / THRESH));
  const rejectOp = Math.max(0, Math.min(1, (flyOut?.dir === "left" ? 1 : -drag.x) / THRESH));

  return (
    <div style={{ width: 382, maxWidth: "100%", margin: "0 auto" }}>
      <div style={{ position: "relative", height: 652 }}>
        {next2 && <div style={cardShell({ transform: "translateY(22px) scale(.92)", opacity: 0.55, zIndex: 1, boxShadow: "var(--sh)" })} aria-hidden />}
        {next1 && (
          <div style={cardShell({ transform: "translateY(11px) scale(.96)", opacity: 0.85, zIndex: 2 })} aria-hidden>
            <AdvisorCard a={next1} />
          </div>
        )}

        <div
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          style={cardShell({
            zIndex: 3,
            cursor: drag.active ? "grabbing" : "grab",
            touchAction: "none",
            transform: `translate(${tx}px, ${ty}px) rotate(${rot}deg)`,
            transition: drag.active && !flyOut ? "none" : "transform .3s cubic-bezier(.2,.7,.2,1)",
          })}
        >
          <AdvisorCard a={current} />

          {/* stamps */}
          <Stamp side="left" color="var(--success)" opacity={approveOp} text="APPROVED" />
          <Stamp side="right" color="var(--danger)" opacity={rejectOp} text="REJECTED" />
        </div>
      </div>

      {/* controls */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 20 }}>
        <RoundBtn label="Reject" color="var(--danger)" onClick={() => decide("left")}>✕</RoundBtn>
        <div className="font-mono" style={{ fontSize: 11, color: "var(--ink-soft)", textAlign: "center", minWidth: 84 }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: "var(--ink)" }}>{idx + 1} / {advisors.length}</div>
          <div>en el deck</div>
        </div>
        <RoundBtn label="Approve" color="var(--success)" onClick={() => decide("right")}>♥</RoundBtn>
      </div>
      <div className="font-mono" style={{ textAlign: "center", fontSize: 11, color: "var(--ink-faint)", marginTop: 12 }}>
        Arrastrá la tarjeta · → Swipe Approved · ← Swipe Rejected
      </div>
    </div>
  );
}

function Stamp({ side, color, opacity, text }: { side: "left" | "right"; color: string; opacity: number; text: string }) {
  return (
    <div style={{ position: "absolute", top: 22, [side]: 20, transform: `rotate(${side === "left" ? -14 : 14}deg)`, opacity, pointerEvents: "none" }}>
      <div className="font-mono" style={{ border: `3px solid ${color}`, color, padding: "4px 12px", borderRadius: 8, fontWeight: 700, fontSize: 20, letterSpacing: ".05em", background: "rgba(255,255,255,.6)" }}>
        {text}
      </div>
    </div>
  );
}

function RoundBtn({ children, color, onClick, label }: { children: ReactNode; color: string; onClick: () => void; label: string }) {
  return (
    <button
      title={label}
      onClick={onClick}
      style={{
        width: 60, height: 60, borderRadius: "50%", border: "var(--bd) solid var(--ink)",
        background: "var(--surface)", color, fontSize: 24, fontWeight: 700, boxShadow: "var(--sh-pop)",
        display: "grid", placeItems: "center", cursor: "pointer",
        transition: "transform .08s ease, box-shadow .08s ease",
      }}
      onMouseDown={(e) => { e.currentTarget.style.transform = "translate(2px,2px)"; e.currentTarget.style.boxShadow = "0 0 0"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "var(--sh-pop)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "var(--sh-pop)"; }}
    >
      {children}
    </button>
  );
}
