"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  Search,
  Palette,
  Settings,
  ShoppingCart,
  Users,
  BarChart3,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

interface SidebarSection {
  title?: string;
  items: SidebarItem[];
}

const sidebarSections: SidebarSection[] = [
  {
    items: [
      { label: "Dashboard", href: "/", icon: LayoutDashboard },
      { label: "Commandes", href: "/commandes", icon: ShoppingCart },
      { label: "Produits", href: "/produits", icon: Package },
      { label: "Clients", href: "/clients", icon: Users },
      { label: "Analytics", href: "/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Marketing",
    items: [
      { label: "SEO", href: "/seo", icon: Search },
    ],
  },
  {
    title: "Personnalisation",
    items: [
      { label: "Thème", href: "/theme", icon: Palette },
      { label: "Paramètres", href: "/parametres", icon: Settings },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "Aide", href: "/aide", icon: HelpCircle },
    ],
  },
];

export function Sidebar({ collapsed, onToggle }: { collapsed?: boolean; onToggle?: () => void }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className={cn(
          "fixed top-4 left-4 z-50 lg:hidden",
          "w-10 h-10 rounded-[var(--radius-md)]",
          "bg-[var(--color-surface)] border border-[var(--color-border)]",
          "flex items-center justify-center",
          "shadow-[var(--shadow-sm)]"
        )}
      >
        <ChevronRight className="w-5 h-5 text-[var(--color-text-primary)]" />
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen z-40",
          "glass-light border-r border-[var(--color-border)]",
          "flex flex-col",
          "transition-all duration-[var(--duration-normal)] ease-[var(--ease-apple)]",
          collapsed ? "w-[72px]" : "w-[260px]",
          "-translate-x-full lg:translate-x-0",
          mobileOpen && "translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[var(--radius-md)] bg-[var(--color-accent)] flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-[14px]">C</span>
            </div>
            {!collapsed && (
              <span className="font-semibold text-[17px] text-[var(--color-text-primary)] tracking-[-0.02em]">
                CPGO
              </span>
            )}
          </div>
          {onToggle && (
            <button
              onClick={onToggle}
              className={cn(
                "hidden lg:flex items-center justify-center",
                "w-7 h-7 rounded-[var(--radius-sm)]",
                "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]",
                "hover:bg-[var(--color-bg-secondary)]",
                "transition-colors duration-[var(--duration-micro)]"
              )}
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-2">
          {sidebarSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className={cn("mb-4", sectionIndex > 0 && "mt-2")}>
              {section.title && !collapsed && (
                <p className="px-3 mb-2 text-[11px] font-medium uppercase tracking-[0.06em] text-[var(--color-text-tertiary)]">
                  {section.title}
                </p>
              )}
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  const Icon = item.icon;

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-[var(--radius-md)]",
                          "text-[14px] font-semibold",
                          "transition-all duration-[var(--duration-micro)] ease-[var(--ease-apple)]",
                          isActive
                            ? "bg-[rgba(16,185,129,0.12)] text-[var(--color-accent)]"
                            : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]"
                        )}
                      >
                        <Icon className="w-[18px] h-[18px] shrink-0" strokeWidth={1.5} />
                        {!collapsed && (
                          <span className="truncate">{item.label}</span>
                        )}
                        {isActive && !collapsed && (
                          <motion.div
                            layoutId="sidebar-indicator"
                            className="ml-auto w-[6px] h-[6px] rounded-full bg-[var(--color-accent)]"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
