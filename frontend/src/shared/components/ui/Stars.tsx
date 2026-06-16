// Retro star rating (ported from prototype/app/components.jsx).
interface StarsProps {
  value: number;
  size?: number;
  showNum?: boolean;
}

export function Stars({ value, size = 14, showNum = false }: StarsProps) {
  const full = Math.round(value);
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
      <span style={{ display: "inline-flex", gap: 1, fontSize: size, lineHeight: 1 }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} style={{ color: i <= full ? "var(--warning)" : "var(--ink-faint)" }}>
            ★
          </span>
        ))}
      </span>
      {showNum && (
        <span className="font-mono" style={{ fontSize: size - 1, fontWeight: 600 }}>
          {value.toFixed(1)}
        </span>
      )}
    </span>
  );
}
