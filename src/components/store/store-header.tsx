"use client";

import Link from "next/link";
import { User, ShoppingCart, Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function StoreHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 glass-light border-b border-[var(--color-border)]">
      <div className="max-w-[1280px] mx-auto px-5 h-[56px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-[var(--radius-md)] bg-[var(--color-accent)] flex items-center justify-center">
            <span className="text-white font-bold text-[12px]">C</span>
          </div>
          <span className="text-[17px] font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]">CPGO</span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-1">
          <Link href="/boutique" className="px-3 py-1.5 text-[14px] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors rounded-[var(--radius-md)]">Boutique</Link>
          <Link href="/boutique?category=mobilier" className="px-3 py-1.5 text-[14px] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors rounded-[var(--radius-md)]">Mobilier</Link>
          <Link href="/boutique?category=peripheriques" className="px-3 py-1.5 text-[14px] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors rounded-[var(--radius-md)]">Périphériques</Link>
          <Link href="/boutique?category=accessoires" className="px-3 py-1.5 text-[14px] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors rounded-[var(--radius-md)]">Accessoires</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Link href="/boutique" className="w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] transition-colors">
            <Search className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </Link>
          <Link href="/panier" className="w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] transition-colors relative">
            <ShoppingCart className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </Link>
          <Link href="/" className="w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] transition-colors">
            <User className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </header>
  );
}
