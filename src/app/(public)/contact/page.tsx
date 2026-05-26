export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-[100px] pb-20 px-5">
      <div className="max-w-[600px] mx-auto text-center">
        <h1 className="text-[32px] font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]">Contactez-nous</h1>
        <p className="mt-4 text-[17px] text-[var(--color-text-secondary)]">
          Une question sur votre commande ou sur nos produits ? Ecrivez-nous.
        </p>

        <div className="mt-10 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border-light)] p-8 text-left">
          <form className="space-y-6">
            <div>
              <label className="block text-[13px] font-medium text-[var(--color-text-secondary)] mb-1.5">Nom</label>
              <input type="text" className="w-full px-4 py-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-[15px] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:border-[var(--color-accent)] transition-all" />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-[var(--color-text-secondary)] mb-1.5">Email</label>
              <input type="email" className="w-full px-4 py-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-[15px] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:border-[var(--color-accent)] transition-all" />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-[var(--color-text-secondary)] mb-1.5">Message</label>
              <textarea rows={5} className="w-full px-4 py-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-[15px] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:border-[var(--color-accent)] transition-all resize-none" />
            </div>
            <button type="submit" className="w-full px-6 py-3 bg-[var(--color-accent)] text-white font-medium text-[15px] rounded-[var(--radius-md)] hover:bg-[var(--color-accent-hover)] transition-all">
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
