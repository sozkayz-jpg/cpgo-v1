import { StoreHeader } from "@/components/store/store-header";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <StoreHeader />
      <main className="pt-[56px]">{children}</main>
      <footer className="border-t border-[var(--color-border)] py-12 mt-16">
        <div className="max-w-[1280px] mx-auto px-5 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-[var(--radius-md)] bg-[var(--color-accent)] flex items-center justify-center">
              <span className="text-white font-bold text-[12px]">C</span>
            </div>
            <span className="text-[17px] font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]">CPGO</span>
          </div>
          <p className="text-[13px] text-[var(--color-text-tertiary)]">
            © 2024 CPGO. Design Apple-inspired. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}
