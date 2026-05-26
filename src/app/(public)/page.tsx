"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Truck, Shield, RotateCcw } from "lucide-react";

interface Product {
  id: number;
  name: string;
  slug: string;
  shortDesc: string;
  price: number;
  comparePrice: number | null;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data.filter((p: any) => p.featured) : []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <section className="relative bg-[var(--color-bg-secondary)] pt-[120px] pb-20 px-5">
        <div className="max-w-[1280px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent-light)] text-[var(--color-accent)] text-[12px] font-semibold mb-6">
            LIVRAISON GRATUITE — 48H
          </div>
          <h1 className="text-[40px] md:text-[56px] font-semibold tracking-[-0.03em] text-[var(--color-text-primary)] leading-[1.1]">
            CarPlay sans fil,
            <br />
            <span className="text-[var(--color-accent)]">en quelques secondes.</span>
          </h1>
          <p className="mt-6 text-[17px] text-[var(--color-text-secondary)] max-w-xl mx-auto leading-relaxed">
            Branchez le dongle CarplayGO sur le port USB de votre autoradio. Appairez votre iPhone. Et roulez avec CarPlay sans fil.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/boutique"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[var(--color-accent)] text-white font-semibold text-[15px] rounded-[var(--radius-md)] shadow-[var(--shadow-accent)] hover:bg-[var(--color-accent-hover)] transition-all"
            >
              Decouvrir CarplayGO
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
            <Link
              href="/guide"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent text-[var(--color-text-primary)] font-semibold text-[15px] rounded-[var(--radius-md)] border border-[var(--color-border)] hover:bg-[var(--color-bg-secondary)] transition-all"
            >
              Comment ca marche
            </Link>
          </div>
          <div className="mt-16 flex items-center justify-center gap-8 text-[13px] text-[var(--color-text-secondary)]">
            <span><b className="text-[var(--color-accent)]">95%</b> compatibilite auto</span>
            <span className="text-[var(--color-text-tertiary)]">|</span>
            <span><b className="text-[var(--color-accent)]"><60ms</b> latence</span>
            <span className="text-[var(--color-text-tertiary)]">|</span>
            <span><b className="text-[var(--color-accent)]">2 ans</b> garantie</span>
          </div>
        </div>
      </section>

      <section className="py-20 px-5">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-[28px] font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]">Nos produits</h2>
              <p className="mt-1 text-[15px] text-[var(--color-text-secondary)]">Choisissez votre dongle CarplayGO.</p>
            </div>
            <Link href="/boutique" className="hidden sm:inline-flex text-[14px] font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors">
              Voir tout →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border-light)] p-5 h-[360px] animate-shimmer" />
              ))
            ) : (
              products.map((product) => (
                <Link
                  key={product.id}
                  href={`/boutique/${product.slug}`}
                  className="group rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border-light)] p-5 hover:shadow-[var(--shadow-md)] hover:-translate-y-1 transition-all duration-[var(--duration-normal)]"
                >
                  <div className="aspect-[4/3] rounded-[var(--radius-md)] bg-gradient-to-br from-[var(--color-accent)]/10 to-[var(--color-bg-secondary)] flex items-center justify-center text-[48px] mb-5 border border-[var(--color-accent)]/10">
                    🔌
                  </div>
                  <h3 className="text-[16px] font-semibold text-[var(--color-text-primary)] line-clamp-2">{product.name}</h3>
                  <p className="mt-2 text-[13px] text-[var(--color-text-secondary)] line-clamp-2">{product.shortDesc}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-[16px] font-semibold text-[var(--color-text-primary)]">
                      {(product.price / 100).toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                    </span>
                    {product.comparePrice && (
                      <span className="text-[13px] text-[var(--color-text-tertiary)] line-through">
                        {(product.comparePrice / 100).toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                      </span>
                    )}
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="py-20 px-5 bg-[var(--color-bg-secondary)]">
        <div className="max-w-[1280px] mx-auto text-center">
          <h2 className="text-[28px] font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]">Ca marche comment ?</h2>
          <p className="mt-2 text-[15px] text-[var(--color-text-secondary)]">Trois etapes, zero galere.</p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Branchez", desc: "Inserez le dongle CarplayGO sur le port USB de votre autoradio compatible." },
              { step: "02", title: "Appairez", desc: "Activez le Bluetooth et le Wi-Fi sur votre iPhone. Le dongle apparait, vous appuyez sur Connecter." },
              { step: "03", title: "Roulez", desc: "Votre CarPlay demarre automatiquement a chaque demarrage du moteur. Sans cable." },
            ].map((s) => (
              <div key={s.step} className="text-left md:text-center">
                <span className="text-[32px] font-bold text-[var(--color-accent)]/30">{s.step}</span>
                <h3 className="mt-2 text-[17px] font-semibold text-[var(--color-text-primary)]">{s.title}</h3>
                <p className="mt-2 text-[14px] text-[var(--color-text-secondary)] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-5">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Livraison gratuite", desc: "En 48h sur la France metropolitaine. Livraison mondiale disponible." },
            { title: "Garantie 2 ans", desc: "Tous nos dongles CarplayGO sont couverts par une garantie fabricant de 2 ans." },
            { title: "Retours 30 jours", desc: "Pas satisfait ? Retournez votre dongle sous 30 jours. Remboursement garanti." },
          ].map((f) => (
            <div key={f.title} className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center text-[var(--color-accent)] mb-4">
                <Truck className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h3 className="text-[17px] font-semibold text-[var(--color-text-primary)]">{f.title}</h3>
              <p className="mt-2 text-[14px] text-[var(--color-text-secondary)]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-5 bg-[var(--color-bg-secondary)]">
        <div className="max-w-[1280px] mx-auto text-center">
          <h2 className="text-[28px] md:text-[36px] font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]">
            Pret a rouler sans fil ?
          </h2>
          <p className="mt-3 text-[17px] text-[var(--color-text-secondary)]">
            Rejoignez des milliers de conducteurs qui ont modernise leur tableau de bord avec CarplayGO.
          </p>
          <Link
            href="/boutique"
            className="inline-flex mt-8 px-7 py-3.5 bg-[var(--color-accent)] text-white font-semibold text-[15px] rounded-[var(--radius-md)] shadow-[var(--shadow-accent)] hover:bg-[var(--color-accent-hover)] transition-all"
          >
            Commander maintenant
          </Link>
        </div>
      </section>
    </div>
  );
}
