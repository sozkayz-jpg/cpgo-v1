"use client";

import { useEffect, useState } from "react";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function OrderSuccessPage() {
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    setSessionId(params.get("session_id") || "");
    localStorage.removeItem("cart");
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] flex items-center justify-center px-5">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto rounded-full bg-[var(--color-accent-light)] flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-[var(--color-accent)]" strokeWidth={1.5} />
        </div>
        <h1 className="mt-6 text-[28px] font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]">Commande confirmée !</h1>
        <p className="mt-2 text-[15px] text-[var(--color-text-secondary)]">
          Merci pour votre commande. Vous recevrez un email de confirmation.
        </p>
        {sessionId && (
          <p className="mt-2 text-[13px] text-[var(--color-text-tertiary)]">Session : {sessionId}</p>
        )}
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/boutique"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-white font-semibold text-[15px] rounded-[var(--radius-md)] shadow-[var(--shadow-accent)] hover:bg-[var(--color-accent-hover)] transition-colors"
          >
            Continuer les achats
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 text-[15px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            Retour à l'accueil
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </div>
  );
}
