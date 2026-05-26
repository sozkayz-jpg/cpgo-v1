"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { Suspense } from "react";

interface Product {
  id: number;
  name: string;
  slug: string;
  reference: string;
  shortDesc: string;
  price: number;
  comparePrice: number | null;
  stock: number;
  status: string;
  featured: boolean;
  category: { name: string };
}

function BoutiqueContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category");

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const filtered = products.filter((p) => {
    if (p.status !== "active" && p.status !== "low_stock") return false;
    if (categoryFilter && !p.category?.name?.toLowerCase().includes(categoryFilter.toLowerCase())) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <div className="max-w-[1280px] mx-auto px-5 py-8 pt-[80px]">
        <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]">
          Boutique
        </h1>
        <p className="mt-1 text-[15px] text-[var(--color-text-secondary)]">
          Dongles USB CarPlay sans fil et accessoires auto connectes.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-tertiary)]" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Rechercher un dongle, adaptateur..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] text-[15px] placeholder:text-[var(--color-text-tertiary)] pl-10 pr-4 py-2.5 transition-all focus:outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(16,185,129,0.15)]"
            />
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[13px] font-medium text-[var(--color-text-secondary)]">
            <SlidersHorizontal className="w-4 h-4" strokeWidth={1.5} />
            {filtered.length} produit{filtered.length !== 1 ? "s" : ""}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border-light)] p-5 animate-shimmer">
                <div className="aspect-square rounded-[var(--radius-md)] bg-[var(--color-bg-secondary)] mb-4" />
                <div className="h-4 rounded bg-[var(--color-bg-secondary)] w-3/4 mb-2" />
                <div className="h-4 rounded bg-[var(--color-bg-secondary)] w-1/3" />
              </div>
            ))
          ) : (
            filtered.map((product) => (
              <Link
                key={product.id}
                href={`/boutique/${product.slug}`}
                className="group rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border-light)] p-5 hover:shadow-[var(--shadow-md)] hover:-translate-y-1 transition-all duration-[var(--duration-normal)]"
              >
                <div className="aspect-[4/3] rounded-[var(--radius-md)] bg-gradient-to-br from-[var(--color-accent)]/10 to-[var(--color-accent)]/5 flex items-center justify-center text-[40px] mb-4 border border-[var(--color-accent)]/10">
                  🔌
                </div>
                <p className="text-[13px] text-[var(--color-text-tertiary)] font-medium">{product.category?.name || "Categorie"}</p>
                <p className="mt-0.5 text-[15px] font-medium text-[var(--color-text-primary)] line-clamp-2">{product.name}</p>
                {product.shortDesc && (
                  <p className="mt-1 text-[13px] text-[var(--color-text-secondary)] line-clamp-2">{product.shortDesc}</p>
                )}
                <div className="mt-2 flex items-center gap-2">
                  <p className="text-[14px] font-semibold text-[var(--color-accent)]">
                    {(product.price / 100).toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                  </p>
                  {product.comparePrice && (
                    <span className="text-[12px] text-[var(--color-text-tertiary)] line-through">
                      {(product.comparePrice / 100).toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                    </span>
                  )}
                </div>
                {product.stock === 0 && (
                  <span className="mt-1 inline-block text-[11px] font-semibold text-[var(--color-destructive)]">Rupture de stock</span>
                )}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default function BoutiquePage() {
  return (
    <Suspense>
      <BoutiqueContent />
    </Suspense>
  );
}
