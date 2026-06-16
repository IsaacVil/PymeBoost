// Retro meter bar (ported from prototype/app/components.jsx).
interface MeterProps {
  label: string;
  value: number; // 0..100
}

export function Meter({ label, value }: MeterProps) {
  return (
    <div style={{ display: "grid", gap: 4 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span className="font-mono" style={{ fontSize: 11, color: "var(--ink-soft)", fontWeight: 600 }}>{label}</span>
        <span className="font-mono" style={{ fontSize: 11, fontWeight: 700 }}>{value}%</span>
      </div>
      <div style={{ height: 9, background: "var(--paper-2)", border: "1.5px solid var(--ink)", borderRadius: 999, overflow: "hidden" }}>
        <div style={{ width: `${value}%`, height: "100%", background: "var(--accent)", borderRight: "1.5px solid var(--ink)" }} />
      </div>
    </div>
  );
}
