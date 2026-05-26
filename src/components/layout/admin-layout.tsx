"use client";

import * as React from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <Header sidebarCollapsed={sidebarCollapsed} />

      <main
        className="pt-[60px] min-h-screen transition-all duration-[var(--duration-normal)] ease-[var(--ease-apple)]"
        style={{
          marginLeft: sidebarCollapsed ? "72px" : "260px",
        }}
      >
        <div className="p-6 lg:p-8 animate-page-enter">
          {children}
        </div>
      </main>
    </div>
  );
}
