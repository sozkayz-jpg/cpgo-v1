export default function AProposPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-[100px] pb-20 px-5">
      <div className="max-w-[800px] mx-auto">
        <h1 className="text-[32px] font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]">A propos de CarplayGO</h1>

        <p className="mt-6 text-[17px] text-[var(--color-text-secondary)] leading-relaxed">
          CarplayGO est ne d'une frustration simple : les cables. Nous avons cree le dongle USB CarPlay sans fil le plus simple du marche pour que chaque conducteur puisse profiter de la technologie Apple dans sa voiture sans tracas.
        </p>

        <p className="mt-4 text-[17px] text-[var(--color-text-secondary)] leading-relaxed">
          Notre mission est simple : moderniser le tableau de bord de n'importe quel vehicule equipe de CarPlay filaire, avec un produit plug-and-play, fiable, et abordable.
        </p>

        <p className="mt-4 text-[17px] text-[var(--color-text-secondary)] leading-relaxed">
          Concu a Paris et livre partout dans le monde, CarplayGO est utilise par des milliers de conducteurs en Europe et au-dela. Nous croyons que la technologie automobile doit etre simple, rapide, et sans fil.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border-light)] p-6 text-center">
            <div className="text-[32px] font-bold text-[var(--color-accent)]">10 000+</div>
            <div className="mt-1 text-[14px] text-[var(--color-text-secondary)]">Dongles vendus</div>
          </div>
          <div className="rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border-light)] p-6 text-center">
            <div className="text-[32px] font-bold text-[var(--color-accent)]">95%</div>
            <div className="mt-1 text-[14px] text-[var(--color-text-secondary)]">Avis positifs</div>
          </div>
          <div className="rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border-light)] p-6 text-center">
            <div className="text-[32px] font-bold text-[var(--color-accent)]">2 ans</div>
            <div className="mt-1 text-[14px] text-[var(--color-text-secondary)]">Garantie</div>
          </div>
        </div>
      </div>
    </div>
  );
}
