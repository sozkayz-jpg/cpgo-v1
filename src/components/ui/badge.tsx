import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded"
  | "default"
  | "accent"
  | "warning"
  | "destructive";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const badgeStyles: Record<BadgeVariant, string> = {
  pending: "bg-[var(--color-pending-bg)] text-[var(--color-pending-text)]",
  confirmed: "bg-[var(--color-confirmed-bg)] text-[var(--color-confirmed-text)]",
  shipped: "bg-[var(--color-shipped-bg)] text-[var(--color-shipped-text)]",
  delivered: "bg-[var(--color-delivered-bg)] text-[var(--color-delivered-text)]",
  cancelled: "bg-[var(--color-cancelled-bg)] text-[var(--color-cancelled-text)]",
  refunded: "bg-[var(--color-refunded-bg)] text-[var(--color-refunded-text)]",
  default: "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]",
  accent: "bg-[var(--color-accent-light)] text-[var(--color-accent)]",
  warning: "bg-[rgba(255,159,10,0.12)] text-[var(--color-warning)]",
  destructive: "bg-[rgba(255,59,48,0.12)] text-[var(--color-destructive)]",
};

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center",
          "px-2 py-[3px]",
          "text-[12px] font-semibold",
          "rounded-[var(--radius-sm)]",
          badgeStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge, type BadgeVariant };
