type BadgeStatus = "active" | "pending" | "complete" | "cancelled" | "neutral";

interface BadgeProps {
  status?: BadgeStatus;
  label: string;
}

const statusClasses: Record<BadgeStatus, string> = {
  active:    "bg-green-500/20 text-green-400 border-green-500/30",
  pending:   "bg-amber-500/20 text-amber-400 border-amber-500/30",
  complete:  "bg-purple-500/20 text-purple-400 border-purple-500/30",
  cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
  neutral:   "bg-slate-700 text-slate-400 border-slate-600",
};

export function Badge({ status = "neutral", label }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusClasses[status]}`}>
      {label}
    </span>
  );
}
