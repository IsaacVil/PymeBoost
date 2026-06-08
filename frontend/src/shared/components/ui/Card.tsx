import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-slate-800 border border-slate-700 rounded-lg p-6 shadow-lg ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }: CardProps) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function CardTitle({ children }: { children: ReactNode }) {
  return <h3 className="text-lg font-semibold text-slate-100">{children}</h3>;
}

export function CardContent({ children, className = "" }: CardProps) {
  return <div className={`text-slate-300 ${className}`}>{children}</div>;
}
