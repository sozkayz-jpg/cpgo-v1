"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glass?: boolean;
  gradientTop?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = true, glass = false, gradientTop = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-[16px] p-6",
          "bg-[var(--color-surface)]",
          "border border-[var(--color-border-light)]",
          "shadow-[var(--shadow-sm)]",
          hover && "hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5",
          "transition-all duration-[var(--duration-normal)] ease-[var(--ease-apple)]",
          glass && "glass-light",
          className
        )}
        {...props}
      >
        {gradientTop && (
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-60 rounded-t-[16px]" />
        )}
        <div className="relative">
          {children}
        </div>
      </div>
    );
  }
);

Card.displayName = "Card";

export { Card };
