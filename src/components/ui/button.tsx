"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary: [
        "bg-[var(--color-accent)] text-white",
        "hover:bg-[var(--color-accent-hover)]",
        "shadow-[var(--shadow-accent)]",
        "hover:shadow-[0_6px_20px_rgba(16,185,129,0.4)]",
        "hover:scale-[1.01]",
        "active:scale-[0.98]",
      ],
      secondary: [
        "bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)]",
        "border border-[var(--color-border)]",
        "hover:bg-[var(--color-bg-tertiary)]",
      ],
      ghost: [
        "bg-transparent text-[var(--color-accent)]",
        "hover:bg-[rgba(16,185,129,0.08)]",
      ],
      destructive: [
        "bg-[var(--color-destructive)] text-white",
        "hover:bg-[var(--color-destructive-hover)]",
        "active:scale-[0.98]",
      ],
    };

    const sizes = {
      sm: "px-3 py-1.5 text-[13px]",
      md: "px-5 py-2.5 text-[15px]",
      lg: "px-6 py-3 text-[17px]",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2",
          "font-semibold tracking-[-0.01em]",
          "rounded-[var(--radius-md)]",
          "transition-all duration-[var(--duration-normal)] ease-[var(--ease-apple)]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "active:scale-[0.97]",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon}
        {isLoading ? "Chargement..." : children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
