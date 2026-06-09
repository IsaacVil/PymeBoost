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
          <label htmlFor={id} className="block text-sm font-medium text-zinc-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={`w-full bg-white border-2 text-zinc-900 px-3 py-2 rounded-md text-sm
            placeholder:text-zinc-400
            focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? "border-red-600" : "border-zinc-800"}
            ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
