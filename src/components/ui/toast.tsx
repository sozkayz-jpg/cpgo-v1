"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
}

const ToastContext = React.createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const addToast = React.useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-3">
        <AnimatePresence>
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onDismiss={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-[var(--color-accent)]" strokeWidth={1.5} />,
    error: <XCircle className="w-5 h-5 text-[var(--color-destructive)]" strokeWidth={1.5} />,
    warning: <AlertCircle className="w-5 h-5 text-[var(--color-warning)]" strokeWidth={1.5} />,
    info: <Info className="w-5 h-5 text-[var(--color-info)]" strokeWidth={1.5} />,
  };

  const borders = {
    success: "border-l-[var(--color-accent)]",
    error: "border-l-[var(--color-destructive)]",
    warning: "border-l-[var(--color-warning)]",
    info: "border-l-[var(--color-info)]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.95 }}
      transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
      className={cn(
        "glass-light rounded-[var(--radius-md)] p-4 pr-10",
        "border border-[var(--color-border-light)] border-l-[3px] shadow-[var(--shadow-lg)]",
        "min-w-[320px] max-w-[420px]",
        borders[toast.type]
      )}
    >
      <div className="flex items-start gap-3">
        {icons[toast.type]}
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-semibold text-[var(--color-text-primary)]">{toast.title}</p>
          {toast.message && (
            <p className="mt-0.5 text-[13px] text-[var(--color-text-secondary)]">{toast.message}</p>
          )}
        </div>
      </div>
      <button
        onClick={onDismiss}
        className="absolute top-3 right-3 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
      >
        <X className="w-4 h-4" strokeWidth={1.5} />
      </button>
    </motion.div>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be inside ToastProvider");
  const { addToast } = ctx;
  return {
    success: (title: string, message?: string) => addToast({ type: "success", title, message }),
    error: (title: string, message?: string) => addToast({ type: "error", title, message }),
    warning: (title: string, message?: string) => addToast({ type: "warning", title, message }),
    info: (title: string, message?: string) => addToast({ type: "info", title, message }),
  };
}
