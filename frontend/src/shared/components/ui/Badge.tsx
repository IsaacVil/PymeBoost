type BadgeStatus = "active" | "pending" | "complete" | "cancelled" | "neutral";

interface BadgeProps {
  status?: BadgeStatus;
  label: string;
}

// Retro pills: monospace, uppercase, ink-bordered.
const statusClasses: Record<BadgeStatus, string> = {
  active: "bg-green-100 text-green-700 border-green-600",
  pending: "bg-amber-100 text-amber-700 border-amber-500",
  complete: "bg-cyan-100 text-teal-600 border-teal-500",
  cancelled: "bg-red-100 text-red-700 border-red-600",
  neutral: "bg-zinc-100 text-zinc-700 border-zinc-800",
};

export function Badge({ status = "neutral", label }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider ${statusClasses[status]}`}
    >
      {label}
    </span>
  );
}
