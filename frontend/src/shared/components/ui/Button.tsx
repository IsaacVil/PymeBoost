import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: ReactNode;
}

// Retro buttons: ink border + hard offset shadow that "presses in" on click.
const PRESS = "shadow-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";

const variantClasses: Record<ButtonVariant, string> = {
  primary: `bg-teal-500 text-white border-2 border-zinc-800 hover:bg-teal-600 ${PRESS}`,
  secondary: `bg-zinc-50 text-zinc-900 border-2 border-zinc-800 hover:bg-zinc-100 ${PRESS}`,
  ghost: "bg-transparent text-zinc-500 border-2 border-transparent hover:text-zinc-900 hover:bg-zinc-100",
  danger: `bg-red-600 text-white border-2 border-zinc-800 hover:bg-red-700 ${PRESS}`,
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center gap-2 rounded-md font-mono font-semibold tracking-wide transition-all
        focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-stone-100
        disabled:opacity-45 disabled:cursor-not-allowed disabled:shadow-none
        ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {isLoading ? <span className="animate-spin">⟳</span> : null}
      {children}
    </button>
  );
}
