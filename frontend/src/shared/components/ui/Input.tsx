import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-slate-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={`w-full bg-slate-900 border text-slate-100 px-3 py-2 rounded-md text-sm
            placeholder:text-slate-500
            focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? "border-red-500" : "border-slate-700"}
            ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
