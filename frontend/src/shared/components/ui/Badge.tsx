type BadgeStatus = "active" | "pending" | "complete" | "cancelled" | "neutral";

interface BadgeProps {
  status?: BadgeStatus;
  label: string;
}

const statusClasses: Record<BadgeStatus, string> = {
  active:    "bg-green-100 text-green-700 border-green-600",
  pending:   "bg-amber-100 text-amber-700 border-amber-500",
  complete:  "bg-teal-100 text-teal-700 border-teal-500",
  cancelled: "bg-red-100 text-red-700 border-red-600",
  neutral:   "bg-zinc-100 text-zinc-500 border-zinc-400",
};

export function Badge({ status = "neutral", label }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusClasses[status]}`}>
      {label}
    </span>
  );
}
