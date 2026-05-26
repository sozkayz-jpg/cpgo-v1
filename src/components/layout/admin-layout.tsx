"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { useAuth } from "@/lib/auth-context";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  React.useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] flex items-center justify-center">
        <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-accent)] animate-pulse" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <Header sidebarCollapsed={sidebarCollapsed} />
      <main
        className="pt-[60px] min-h-screen transition-all duration-[var(--duration-normal)] ease-[var(--ease-apple)]"
        style={{ marginLeft: sidebarCollapsed ? "72px" : "260px" }}
      >
        <div className="p-6 lg:p-8 animate-page-enter">
          {children}
        </div>
      </main>
    </div>
  );
}
