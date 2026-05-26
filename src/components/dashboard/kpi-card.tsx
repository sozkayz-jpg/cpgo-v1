"use client";

import * as React from "react";
import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  change?: number;
  changeLabel?: string;
  icon: React.ReactNode;
  color?: "accent" | "info" | "warning" | "destructive";
}

const colorMap = {
  accent: {
    bg: "bg-[rgba(16,185,129,0.08)]",
    text: "text-[var(--color-accent)]",
  },
  info: {
    bg: "bg-[rgba(10,132,255,0.08)]",
    text: "text-[var(--color-info)]",
  },
  warning: {
    bg: "bg-[rgba(255,159,10,0.08)]",
    text: "text-[var(--color-warning)]",
  },
  destructive: {
    bg: "bg-[rgba(255,59,48,0.08)]",
    text: "text-[var(--color-destructive)]",
  },
};

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { duration: 1500, bounce: 0 });
  const display = useTransform(spring, (current) =>
    `${prefix}${Math.round(current).toLocaleString("fr-FR")}${suffix}`
  );

  React.useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  return (
    <motion.span ref={ref}>
      {display}
    </motion.span>
  );
}

export function KPICard({
  title,
  value,
  prefix = "",
  suffix = "",
  change,
  changeLabel = "vs mois dernier",
  icon,
  color = "accent",
}: KPICardProps) {
  const colors = colorMap[color];
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "relative rounded-[16px] p-6",
        "bg-[var(--color-surface)]",
        "border border-[var(--color-border-light)]",
        "shadow-[var(--shadow-sm)]",
        "hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5",
        "transition-all duration-[var(--duration-normal)] ease-[var(--ease-apple)]"
      )}
    >
      <div className="flex items-start justify-between">
        <div className={cn("w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center", colors.bg)}>
          <div className={colors.text}>{icon}</div>
        </div>
        {change !== undefined && (
          <div
            className={cn(
              "flex items-center gap-1 text-[13px] font-medium",
              isPositive && "text-[var(--color-accent)]",
              isNegative && "text-[var(--color-destructive)]",
              !isPositive && !isNegative && "text-[var(--color-text-tertiary)]"
            )}
          >
            <span>{isPositive ? "+" : ""}{change}%</span>
          </div>
        )}
      </div>

      <div className="mt-4">
        <p className="text-[28px] font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]">
          <AnimatedNumber value={value} prefix={prefix} suffix={suffix} />
        </p>
        <p className="mt-1 text-[13px] text-[var(--color-text-secondary)]">
          {title}
        </p>
        {changeLabel && change !== undefined && (
          <p className="mt-0.5 text-[12px] text-[var(--color-text-tertiary)]">
            {changeLabel}
          </p>
        )}
      </div>
    </motion.div>
  );
}
