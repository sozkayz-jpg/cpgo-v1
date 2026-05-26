export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Hero */}
      <section className="relative bg-[var(--color-bg-secondary)] pt-24 pb-20 px-5">
        <div className="max-w-[1280px] mx-auto text-center">
          <h1 className="text-[40px] md:text-[56px] font-semibold tracking-[-0.03em] text-[var(--color-text-primary)] leading-tight">
            Mobilier ergonomique
            <br />
            <span className="text-[var(--color-accent)]">premium</span>
          </h1>
          <p className="mt-4 text-[17px] text-[var(--color-text-secondary)] max-w-lg mx-auto">
            Confort et productivité au quotidien. Découvrez notre collection de mobilier de bureau haut de gamme.
          </p>
          <a
            href="/boutique"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-[var(--color-accent)] text-white font-semibold text-[15px] rounded-[var(--radius-md)] shadow-[var(--shadow-accent)] hover:bg-[var(--color-accent-hover)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.4)] transition-all duration-[var(--duration-normal)]"
          >
            Découvrir la boutique
          </a>
        </div>

        {/* Featured Products Grid Mock */}
        <div className="max-w-[1280px] mx-auto mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { name: "Chaise ergonomique premium", price: "499,00 €", image: "🪑" },
              { name: "Bureau standing électrique", price: "899,00 €", image: "🖥️" },
              { name: "Casque antibruit pro", price: "299,00 €", image: "🎧" },
              { name: "Webcam 4K professionnelle", price: "199,00 €", image: "📷" },
            ].map((p) => (
              <a
                key={p.name}
                href="/boutique"
                className="group rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border-light)] p-5 hover:shadow-[var(--shadow-md)] hover:-translate-y-1 transition-all duration-[var(--duration-normal)]"
              >
                <div className="aspect-square rounded-[var(--radius-md)] bg-[var(--color-bg-secondary)] flex items-center justify-center text-[40px] mb-4">
                  {p.image}
                </div>
                <p className="text-[15px] font-medium text-[var(--color-text-primary)]">{p.name}</p>
                <p className="mt-1 text-[14px] font-semibold text-[var(--color-accent)]">{p.price}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-5">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Livraison gratuite", desc: "Sur toutes les commandes de plus de 100 € en France métropolitaine." },
            { title: "Garantie 5 ans", desc: "Tous nos produits ergonomiques sont couverts par une garantie de 5 ans." },
            { title: "Retours simplifiés", desc: "30 jours pour changer d'avis. Retour gratuit et remboursement rapide." },
          ].map((f) => (
            <div key={f.title} className="text-center">
              <h3 className="text-[17px] font-semibold text-[var(--color-text-primary)]">{f.title}</h3>
              <p className="mt-2 text-[15px] text-[var(--color-text-secondary)]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-5 bg-[var(--color-bg-secondary)]">
        <div className="max-w-[1280px] mx-auto text-center">
          <h2 className="text-[28px] md:text-[40px] font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]">
            Prêt à transformer votre espace de travail ?
          </h2>
          <p className="mt-3 text-[17px] text-[var(--color-text-secondary)]">
            Rejoignez des milliers de professionnels qui ont fait confiance à CPGO.
          </p>
          <a
            href="/boutique"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-[var(--color-text-primary)] text-white font-semibold text-[15px] rounded-[var(--radius-md)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)] border border-[var(--color-border)] transition-all duration-[var(--duration-normal)]"
          >
            Explorer la boutique
          </a>
        </div>
      </section>
    </div>
  );
}
