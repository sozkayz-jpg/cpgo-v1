"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { Search, Bell, Moon, Sun, LogOut, User } from "lucide-react";

export function Header({ sidebarCollapsed }: { sidebarCollapsed?: boolean }) {
  const { user, logout } = useAuth();
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [isDark]);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 h-[60px]",
        "glass-light border-b border-[var(--color-border)]",
        "flex items-center justify-between px-5",
        "transition-all duration-[var(--duration-normal)] ease-[var(--ease-apple)]",
        sidebarCollapsed ? "left-[72px]" : "left-[260px]"
      )}
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[15px] text-[var(--color-text-secondary)]">
        <span className="font-medium">Admin</span>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsDark(!isDark)}
          className={cn(
            "w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center",
            "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]",
            "transition-colors duration-[var(--duration-micro)]"
          )}
        >
          {isDark ? <Sun className="w-[18px] h-[18px]" strokeWidth={1.5} /> : <Moon className="w-[18px] h-[18px]" strokeWidth={1.5} />}
        </button>

        <button
          onClick={logout}
          className={cn(
            "w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center",
            "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-destructive)]",
            "transition-colors duration-[var(--duration-micro)]"
          )}
          title="Déconnexion"
        >
          <LogOut className="w-[18px] h-[18px]" strokeWidth={1.5} />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
            <span className="text-white text-[12px] font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </span>
          </div>
          {!sidebarCollapsed && (
            <span className="text-[13px] font-medium text-[var(--color-text-primary)] hidden xl:inline">
              {user?.name || user?.email || "Admin"}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
