"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";

export function StoreHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Boutique", href: "/boutique" },
    { label: "Comment ça marche", href: "/guide" },
    { label: "FAQ", href: "/faq" },
    { label: "À propos", href: "/a-propos" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 glass-light border-b border-[var(--color-border)]">
      <div className="max-w-[1280px] mx-auto px-5 h-[60px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-[var(--radius-md)] bg-[var(--color-accent)] flex items-center justify-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <circle cx="12" cy="10" r="3" />
              <path d="M7 21h10" />
              <path d="M12 17v4" />
            </svg>
          </div>
          <span className="text-[17px] font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]">CarplayGO</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-[14px] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors rounded-[var(--radius-md)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Link href="/boutique" className="w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] transition-colors">
            <Search className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </Link>
          <Link href="/panier" className="w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] transition-colors relative">
            <ShoppingCart className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </Link>
          <Link href="/login" className="hidden sm:flex w-9 h-9 rounded-[var(--radius-md)] items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] transition-colors">
            <User className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </Link>
          <button
            className="lg:hidden w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-[18px] h-[18px]" strokeWidth={1.5} /> : <Menu className="w-[18px] h-[18px]" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-[60px] left-0 right-0 bg-[var(--color-bg-primary)] border-b border-[var(--color-border)] px-5 py-4 space-y-1 shadow-[var(--shadow-lg)]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 text-[15px] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] rounded-[var(--radius-md)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
