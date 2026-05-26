"use client";

import { useState, useEffect } from "react";
import { Package, ArrowRight, Truck, Shield, RotateCcw } from "lucide-react";

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  stock: number;
  status: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products?featured=true")
      .then((r) => {
        if (!r.ok) throw new Error("Erreur de chargement");
        return r.json();
      })
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Hero */}
      <section className="relative bg-[var(--color-bg-secondary)] pt-24 pb-20 px-5">
        <div className="max-w-[1280px] mx-auto text-center">
          <h1 className="text-[40px] md:text-[56px] font-semibold tracking-[-0.03em] text-[var(--color-text-primary)] leading-tight">
            CarPlay sans fil &
            <br />
            <span className="text-[var(--color-accent)]">connectivité auto</span>
          </h1>
          <p className="mt-4 text-[17px] text-[var(--color-text-secondary)] max-w-lg mx-auto">
            Transformez votre tableau de bord avec nos dongles USB et boitiers CarPlay sans fil. Connectivité instantanée pour tous vos trajets.
          </p>
          <a
            href="/boutique"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-[var(--color-accent)] text-white font-semibold text-[15px] rounded-[var(--radius-md)] shadow-[var(--shadow-accent)] hover:bg-[var(--color-accent-hover)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.4)] transition-all duration-[var(--duration-normal)]"
          >
            Découvrir la boutique
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </a>
        </div>

        {/* Featured Products Grid */}
        <div className="max-w-[1280px] mx-auto mt-16">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border-light)] p-5"
                >
                  <div className="aspect-square rounded-[var(--radius-md)] bg-[var(--color-bg-secondary)] animate-shimmer mb-4" />
                  <div className="h-4 bg-[var(--color-bg-secondary)] animate-shimmer rounded w-3/4 mb-2" />
                  <div className="h-4 bg-[var(--color-bg-secondary)] animate-shimmer rounded w-1/3" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <Package className="w-12 h-12 mx-auto text-[var(--color-text-tertiary)]" strokeWidth={1.5} />
              <p className="mt-4 text-[17px] font-medium text-[var(--color-text-primary)]">Aucun produit en vedette</p>
              <p className="mt-2 text-[15px] text-[var(--color-text-secondary)]">
                Retrouvez bientôt nos nouveautés CarPlay et dongles connectés.
              </p>
              <a
                href="/boutique"
                className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-[var(--color-accent)] text-white font-semibold text-[15px] rounded-[var(--radius-md)] shadow-[var(--shadow-accent)] hover:bg-[var(--color-accent-hover)] transition-all"
              >
                Voir la boutique
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {products.map((product) => (
                <a
                  key={product.id}
                  href={`/boutique/${product.slug}`}
                  className="group rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border-light)] p-5 hover:shadow-[var(--shadow-md)] hover:-translate-y-1 transition-all duration-[var(--duration-normal)]"
                >
                  <div className="aspect-square rounded-[var(--radius-md)] bg-[var(--color-bg-secondary)] flex items-center justify-center text-[40px] mb-4">
                    <span role="img" aria-label="product">📦</span>
                  </div>
                  <p className="text-[15px] font-medium text-[var(--color-text-primary)]">{product.name}</p>
                  <p className="mt-1 text-[14px] font-semibold text-[var(--color-accent)]">
                    {(product.price / 100).toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                  </p>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-5">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Truck className="w-6 h-6" strokeWidth={1.5} />, title: "Livraison gratuite", desc: "Sur toutes les commandes en France métropolitaine. Recevez votre dongle rapidement." },
            { icon: <Shield className="w-6 h-6" strokeWidth={1.5} />, title: "Garantie 2 ans", desc: "Tous nos produits CarPlay et connectivité auto sont couverts par une garantie de 2 ans." },
            { icon: <RotateCcw className="w-6 h-6" strokeWidth={1.5} />, title: "Retours simplifiés", desc: "30 jours pour changer d'avis. Retour gratuit et remboursement rapide sur tous les boitiers." },
          ].map((f) => (
            <div key={f.title} className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-[var(--color-bg-secondary)] flex items-center justify-center text-[var(--color-accent)] mb-4">
                {f.icon}
              </div>
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
            Prêt à moderniser votre tableau de bord ?
          </h2>
          <p className="mt-3 text-[17px] text-[var(--color-text-secondary)]">
            Rejoignez des milliers de conducteurs qui ont adopté le CarPlay sans fil avec CPGO.
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
