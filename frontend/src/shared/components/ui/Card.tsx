import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-zinc-50 border-2 border-zinc-800 rounded-lg p-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }: CardProps) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function CardTitle({ children }: { children: ReactNode }) {
  return <h3 className="text-lg font-semibold text-zinc-900">{children}</h3>;
}

export function CardContent({ children, className = "" }: CardProps) {
  return <div className={`text-zinc-600 ${className}`}>{children}</div>;
}
