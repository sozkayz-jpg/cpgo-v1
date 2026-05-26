import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, leftIcon, rightIcon, type, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-[13px] font-semibold text-[var(--color-text-secondary)] mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            ref={ref}
            className={cn(
              "w-full rounded-[var(--radius-md)]",
              "border border-[var(--color-border)]",
              "bg-[var(--color-bg-secondary)]",
              "text-[var(--color-text-primary)] text-[15px]",
              "placeholder:text-[var(--color-text-tertiary)]",
              "px-3.5 py-2.5",
              "transition-all duration-[var(--duration-normal)] ease-[var(--ease-apple)]",
              "focus:outline-none",
              "focus:border-[var(--color-accent)]",
              "focus:shadow-[0_0_0_3px_rgba(16,185,129,0.15)]",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-[var(--color-destructive)] focus:border-[var(--color-destructive)] focus:shadow-[0_0_0_3px_rgba(255,59,48,0.15)]",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-[13px] text-[var(--color-destructive)]">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
