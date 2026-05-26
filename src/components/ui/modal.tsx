"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export function Modal({ isOpen, onClose, title, description, children, size = "md" }: ModalProps) {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[4px]" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "relative w-full",
              sizeClasses[size],
              "glass-light rounded-[20px]",
              "shadow-[var(--shadow-xl)]",
              "overflow-hidden"
            )}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className={cn(
                "absolute top-4 right-4 z-10",
                "w-8 h-8 rounded-full",
                "flex items-center justify-center",
                "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]",
                "hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]",
                "transition-colors duration-[var(--duration-micro)]"
              )}
            >
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>

            {/* Content */}
            <div className="p-6">
              {title && (
                <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-[var(--color-text-primary)] pr-10">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-1 text-[15px] text-[var(--color-text-secondary)]">
                  {description}
                </p>
              )}
              <div className={cn((title || description) && "mt-5")}>{children}</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
