"use client";

import * as React from "react";
import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface SEOScoreProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  label?: string;
}

const sizeMap = {
  sm: { width: 80, stroke: 6, fontSize: "20px", labelSize: "11px" },
  md: { width: 120, stroke: 8, fontSize: "32px", labelSize: "13px" },
  lg: { width: 200, stroke: 12, fontSize: "56px", labelSize: "17px" },
};

function AnimatedScore({ value, size }: { value: number; size: "sm" | "md" | "lg" }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { duration: 2000, bounce: 0 });
  const display = useTransform(spring, (current) => Math.round(current));

  React.useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  return (
    <motion.span ref={ref} className="tabular-nums">
      {display}
    </motion.span>
  );
}

export function SEOScore({ score, size = "md", showLabel = true, label }: SEOScoreProps) {
  const config = sizeMap[size];
  const radius = (config.width - config.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s >= 80) return "#10B981";
    if (s >= 60) return "#FF9F0A";
    if (s >= 40) return "#FF9500";
    return "#FF3B30";
  };

  const color = getColor(score);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      className="flex flex-col items-center"
    >
      <div className="relative" style={{ width: config.width, height: config.width }}>
        <svg width={config.width} height={config.width} viewBox={`0 0 ${config.width} ${config.width}`}>
          {/* Background circle */}
          <circle
            cx={config.width / 2}
            cy={config.width / 2}
            r={radius}
            fill="none"
            stroke="var(--color-bg-secondary)"
            strokeWidth={config.stroke}
          />
          {/* Progress circle */}
          <motion.circle
            cx={config.width / 2}
            cy={config.width / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={config.stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            transform={`rotate(-90 ${config.width / 2} ${config.width / 2})`}
            style={{ filter: `drop-shadow(0 0 ${config.stroke}px ${color}40)` }}
          />
        </svg>

        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={cn("font-bold tracking-[-0.02em] text-[var(--color-text-primary)]")}
            style={{ fontSize: config.fontSize }}
          >
            <AnimatedScore value={score} size={size} />
          </span>
          <span className="text-[11px] text-[var(--color-text-tertiary)] font-medium">/100</span>
        </div>
      </div>

      {showLabel && (
        <p
          className="mt-2 text-[var(--color-text-secondary)] font-medium"
          style={{ fontSize: config.labelSize }}
        >
          {label || (score >= 80 ? "Excellent" : score >= 60 ? "Bon" : score >= 40 ? "Moyen" : "À améliorer")}
        </p>
      )}
    </motion.div>
  );
}
