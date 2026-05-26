"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Search, Bell, Moon, Sun, User } from "lucide-react";

export function Header({ sidebarCollapsed }: { sidebarCollapsed?: boolean }) {
  const [isDark, setIsDark] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);

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
        <span className="font-medium">CPGO</span>
        <span className="text-[var(--color-text-tertiary)]">/</span>
        <span>Dashboard</span>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-md)]",
              "bg-[var(--color-bg-secondary)] border border-[var(--color-border)]",
              "text-[var(--color-text-tertiary)] text-[13px]",
              "hover:text-[var(--color-text-secondary)]",
              "transition-colors duration-[var(--duration-micro)]"
            )}
          >
            <Search className="w-4 h-4" strokeWidth={1.5} />
            <span className="hidden sm:inline">Recherche...</span>
            <span className="hidden md:inline text-[11px] px-1.5 py-0.5 rounded-[var(--radius-sm)] bg-[var(--color-bg-tertiary)] border border-[var(--color-border-light)]">
              ⌘K
            </span>
          </button>
        </div>

        {/* Notifications */}
        <button
          className={cn(
            "relative w-9 h-9 rounded-[var(--radius-md)]",
            "flex items-center justify-center",
            "text-[var(--color-text-secondary)]",
            "hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]",
            "transition-colors duration-[var(--duration-micro)]"
          )}
        >
          <Bell className="w-[18px] h-[18px]" strokeWidth={1.5} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--color-destructive)]" />
        </button>

        {/* Dark mode toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className={cn(
            "w-9 h-9 rounded-[var(--radius-md)]",
            "flex items-center justify-center",
            "text-[var(--color-text-secondary)]",
            "hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]",
            "transition-colors duration-[var(--duration-micro)]"
          )}
        >
          {isDark ? (
            <Sun className="w-[18px] h-[18px]" strokeWidth={1.5} />
          ) : (
            <Moon className="w-[18px] h-[18px]" strokeWidth={1.5} />
          )}
        </button>

        {/* Avatar */}
        <div
          className={cn(
            "w-9 h-9 rounded-full",
            "bg-[var(--color-accent)]",
            "flex items-center justify-center",
            "cursor-pointer hover:opacity-90",
            "transition-opacity duration-[var(--duration-micro)]"
          )}
        >
          <User className="w-[18px] h-[18px] text-white" strokeWidth={1.5} />
        </div>
      </div>
    </header>
  );
}
