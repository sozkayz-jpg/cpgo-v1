import { StoreHeader } from "@/components/store/store-header";
import Link from "next/link";
import { Zap, Mail, MapPin, Phone } from "lucide-react";

export function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <StoreHeader />
      <main className="pt-[60px]">{children}</main>

      <footer className="bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)]">
        <div className="max-w-[1280px] mx-auto px-5 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-[var(--radius-md)] bg-[var(--color-accent)] flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <circle cx="12" cy="10" r="3" />
                    <path d="M7 21h10M12 17v4" />
                  </svg>
                </div>
                <span className="text-[17px] font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]">CarplayGO</span>
              </div>
              <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed">
                Le dongle USB CarPlay sans fil le plus simple du marché. Branchez, appairez, roulez.
              </p>
            </div>

            <div>
              <h4 className="text-[13px] font-semibold text-[var(--color-text-primary)] uppercase tracking-wide mb-3">Boutique</h4>
              <ul className="space-y-2">
                <li><Link href="/boutique" className="text-[13px] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors">Tous les produits</Link></li>
                <li><Link href="/boutique" className="text-[13px] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors">Dongles CarPlay</Link></li>
                <li><Link href="/boutique" className="text-[13px] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors">Accessoires</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[13px] font-semibold text-[var(--color-text-primary)] uppercase tracking-wide mb-3">Aide</h4>
              <ul className="space-y-2">
                <li><Link href="/guide" className="text-[13px] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors">Guide d'installation</Link></li>
                <li><Link href="/faq" className="text-[13px] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors">FAQ</Link></li>
                <li><Link href="/contact" className="text-[13px] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[13px] font-semibold text-[var(--color-text-primary)] uppercase tracking-wide mb-3">Contact</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-[13px] text-[var(--color-text-secondary)]"><Mail className="w-3.5 h-3.5" strokeWidth={1.5} /> contact@carplaygo.fr</li>
                <li className="flex items-center gap-2 text-[13px] text-[var(--color-text-secondary)]"><MapPin className="w-3.5 h-3.5" strokeWidth={1.5} /> Paris, France</li>
                <li className="flex items-center gap-2 text-[13px] text-[var(--color-text-secondary)]"><Zap className="w-3.5 h-3.5" strokeWidth={1.5} /> Livraison mondiale</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[var(--color-border)] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[12px] text-[var(--color-text-tertiary)]">© 2025 CarplayGO. Tous droits réservés.</p>
            <div className="flex items-center gap-4">
              <Link href="/cgv" className="text-[12px] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors">CGV</Link>
              <Link href="/confidentialite" className="text-[12px] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors">Confidentialité</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
