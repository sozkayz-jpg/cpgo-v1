"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ShoppingCart, Check, Minus, Plus, ArrowLeft, Truck, Shield, RefreshCw } from "lucide-react";

interface Product {
  id: number;
  name: string;
  slug: string;
  reference: string;
  description: string;
  shortDesc: string;
  price: number;
  stock: number;
  status: string;
  category: { name: string };
}

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/products/slug/${slug}`)
      .then((r) => r.json())
      .then((data) => setProduct(data));
  }, [slug]);

  const addToCart = () => {
    if (!product) return;
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item: { id: number }) => item.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ id: product.id, name: product.name, price: product.price, quantity });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] flex items-center justify-center">
        <div className="animate-shimmer w-96 h-96 rounded-[var(--radius-lg)]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <div className="max-w-[1280px] mx-auto px-5 py-8 pt-[80px]">
        <a href="/boutique" className="inline-flex items-center gap-1 text-[13px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          Retour à la boutique
        </a>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="aspect-square rounded-[var(--radius-lg)] bg-[var(--color-bg-secondary)] flex items-center justify-center text-[80px]">
            📦
          </div>

          <div className="flex flex-col">
            <p className="text-[13px] font-medium text-[var(--color-accent)] uppercase tracking-wide">{product.category?.name}</p>
            <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]">{product.name}</h1>
            <p className="text-[14px] text-[var(--color-text-secondary)]">Réf. {product.reference}</p>
            <p className="mt-4 text-[15px] text-[var(--color-text-secondary)] leading-relaxed">{product.description || product.shortDesc}</p>

            <div className="mt-6">
              <span className="text-[32px] font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]">
                {(product.price / 100).toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
              </span>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <span className="text-[13px] font-semibold text-[var(--color-text-secondary)]">Quantité</span>
              <div className="flex items-center border border-[var(--color-border)] rounded-[var(--radius-md)]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] transition-colors"
                >
                  <Minus className="w-4 h-4" strokeWidth={1.5} />
                </button>
                <span className="w-10 text-center text-[15px] font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] transition-colors"
                >
                  <Plus className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            <button
              onClick={addToCart}
              disabled={product.stock === 0 || added}
              className="mt-6 w-full py-3 bg-[var(--color-accent)] text-white font-semibold text-[15px] rounded-[var(--radius-md)] shadow-[var(--shadow-accent)] hover:bg-[var(--color-accent-hover)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.4)] active:scale-[0.98] transition-all duration-[var(--duration-normal)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {added ? (
                <><Check className="w-5 h-5" strokeWidth={1.5} /> Ajouté !</>
              ) : (
                <><ShoppingCart className="w-5 h-5" strokeWidth={1.5} /> Ajouter au panier</>
              )}
            </button>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { icon: <Truck className="w-5 h-5" strokeWidth={1.5} />, label: "Livraison gratuite" },
                { icon: <Shield className="w-5 h-5" strokeWidth={1.5} />, label: "Garantie 5 ans" },
                { icon: <RefreshCw className="w-5 h-5" strokeWidth={1.5} />, label: "Retours 30 jours" },
              ].map((f) => (
                <div key={f.label} className="flex flex-col items-center text-center gap-2 p-3 rounded-[var(--radius-md)] bg-[var(--color-bg-secondary)]">
                  <div className="text-[var(--color-accent)]">{f.icon}</div>
                  <span className="text-[11px] font-medium text-[var(--color-text-secondary)]">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
