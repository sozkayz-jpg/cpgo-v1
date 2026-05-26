"use client";

import { useState, useEffect } from "react";
import { Trash2, ArrowLeft, Plus, Minus, ShoppingBag, CreditCard } from "lucide-react";
import { useToast } from "@/components/ui/toast";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function PanierPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const { success, error: showError } = useToast();

  useEffect(() => {
    setMounted(true);
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setItems(cart);
  }, []);

  const updateQty = (id: number, delta: number) => {
    const updated = items.map((item) => {
      if (item.id === id) return { ...item, quantity: Math.max(1, item.quantity + delta) };
      return item;
    });
    setItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const remove = (id: number) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const checkout = async () => {
    if (items.length === 0) return;
    setCheckingOut(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, email: "client@example.com" }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        showError("Erreur", "Impossible de créer la session de paiement");
        setCheckingOut(false);
      }
    } catch {
      showError("Erreur", "Problème de connexion");
      setCheckingOut(false);
    }
  };

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 mx-auto text-[var(--color-text-tertiary)]" strokeWidth={1} />
          <h1 className="mt-4 text-[22px] font-semibold text-[var(--color-text-primary)]">Votre panier est vide</h1>
          <p className="mt-2 text-[15px] text-[var(--color-text-secondary)]">Découvrez nos produits ergonomiques.</p>
          <a href="/boutique" className="inline-flex mt-6 px-5 py-2.5 bg-[var(--color-accent)] text-white font-semibold text-[15px] rounded-[var(--radius-md)] hover:bg-[var(--color-accent-hover)] transition-colors">
            Continuer les achats
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <div className="max-w-[800px] mx-auto px-5 py-8 pt-[80px]">
        <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]">Panier</h1>

        <div className="mt-6 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border-light)]">
              <div className="w-16 h-16 rounded-[var(--radius-md)] bg-[var(--color-bg-secondary)] flex items-center justify-center text-[24px]">
                📦
              </div>
              <div className="flex-1">
                <p className="text-[15px] font-medium text-[var(--color-text-primary)]">{item.name}</p>
                <p className="text-[13px] text-[var(--color-text-secondary)]">{(item.price / 100).toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}</p>
              </div>
              <div className="flex items-center border border-[var(--color-border)] rounded-[var(--radius-md)]">
                <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-[var(--color-text-secondary)]"><Minus className="w-3 h-3" strokeWidth={1.5} /></button>
                <span className="w-8 text-center text-[14px]">{item.quantity}</span>
                <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-[var(--color-text-secondary)]"><Plus className="w-3 h-3" strokeWidth={1.5} /></button>
              </div>
              <button onClick={() => remove(item.id)} className="w-8 h-8 flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-destructive)] transition-colors">
                <Trash2 className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border-light)]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[15px] text-[var(--color-text-secondary)]">Sous-total</span>
            <span className="text-[17px] font-semibold text-[var(--color-text-primary)]">{(total / 100).toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[15px] text-[var(--color-text-secondary)]">Livraison</span>
            <span className="text-[15px] font-medium text-[var(--color-accent)]">Gratuite</span>
          </div>
          <div className="border-t border-[var(--color-border-light)] pt-4 flex items-center justify-between">
            <span className="text-[17px] font-semibold text-[var(--color-text-primary)]">Total</span>
            <span className="text-[22px] font-semibold text-[var(--color-text-primary)]">{(total / 100).toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}</span>
          </div>
          <button
            onClick={checkout}
            disabled={checkingOut}
            className="mt-6 w-full py-3 bg-[var(--color-text-primary)] text-white font-semibold text-[15px] rounded-[var(--radius-md)] flex items-center justify-center gap-2 hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)] border border-transparent hover:border-[var(--color-border)] transition-all duration-[var(--duration-normal)] disabled:opacity-60">
            <CreditCard className="w-4 h-4" strokeWidth={1.5} />
            {checkingOut ? "Redirection vers Stripe..." : "Payer avec Stripe"}
          </button>
        </div>

        <a href="/boutique" className="mt-4 inline-flex items-center gap-1 text-[13px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          Continuer les achats
        </a>
      </div>
    </div>
  );
}
