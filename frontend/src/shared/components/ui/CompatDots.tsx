// Compatibility dots 1..5 (ported from prototype/app/components.jsx).
interface CompatDotsProps {
  value: number;
  label?: string;
}

export function CompatDots({ value, label = "Compatibilidad" }: CompatDotsProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {label && <span className="eyebrow">{label}</span>}
      <span style={{ display: "inline-flex", gap: 4 }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            style={{
              width: 11,
              height: 11,
              borderRadius: 3,
              transform: "rotate(45deg)",
              border: "1.5px solid var(--ink)",
              background: i <= value ? "var(--accent)" : "transparent",
            }}
          />
        ))}
      </span>
    </div>
  );
}
