// Retro monogram avatar (ported from prototype/app/components.jsx).
type AvatarAccent = "primary" | "secondary" | "success" | "warning" | "danger";

const ACCENT_BG: Record<AvatarAccent, string> = {
  primary: "var(--primary)",
  secondary: "var(--secondary)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

interface AvatarProps {
  text: string;
  accent?: AvatarAccent;
  size?: number;
  square?: boolean;
}

export function Avatar({ text, accent = "primary", size = 46, square = false }: AvatarProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        flex: `0 0 ${size}px`,
        borderRadius: square ? "var(--r-md)" : "50%",
        background: ACCENT_BG[accent],
        color: "#fff",
        border: "var(--bd) solid var(--ink)",
        boxShadow: "var(--sh-pop)",
        display: "grid",
        placeItems: "center",
        fontFamily: "var(--font-sans)",
        fontWeight: 700,
        fontSize: size * 0.38,
        letterSpacing: "-.02em",
      }}
    >
      {text}
    </div>
  );
}
