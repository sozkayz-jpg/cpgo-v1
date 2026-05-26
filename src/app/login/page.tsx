"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("admin@cpgo.fr");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.replace("/admin");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-secondary)] flex items-center justify-center px-5">
      <div className="w-full max-w-[420px] animate-page-enter">
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto rounded-[var(--radius-md)] bg-[var(--color-accent)] flex items-center justify-center mb-4">
            <span className="text-white font-bold text-[20px]">C</span>
          </div>
          <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]">
            Connexion</h1>
          <p className="mt-1 text-[15px] text-[var(--color-text-secondary)]">
            Accédez à votre tableau de bord CPGO.</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-[var(--radius-md)] bg-[var(--color-cancelled-bg)] text-[var(--color-cancelled-text)] text-[13px]">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" isLoading={loading} className="w-full">
            Se connecter
          </Button>
        </form>

        <div className="mt-6 p-4 rounded-[var(--radius-md)] bg-[var(--color-bg-tertiary)] border border-[var(--color-border-light)]">
          <p className="text-[13px] text-[var(--color-text-secondary)]">
            <span className="font-medium">Compte démo :</span>
          </p>
          <p className="text-[13px] text-[var(--color-text-tertiary)]">Email : admin@cpgo.fr</p>
          <p className="text-[13px] text-[var(--color-text-tertiary)]">Mot de passe : admin123</p>
        </div>
      </div>
    </div>
  );
}
