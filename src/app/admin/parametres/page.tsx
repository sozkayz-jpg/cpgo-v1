"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/components/ui/toast";
import { User, Shield, Globe, Key } from "lucide-react";

export default function ParametresPage() {
  const { user } = useAuth();
  const { success } = useToast();
  const [loading, setLoading] = useState(false);
  const [store, setStore] = useState({
    name: "CPGO",
    email: "contact@cpgo.fr",
    phone: "+33 1 23 45 67 89",
    address: "12 Rue de Paris, Paris",
  });

  const handleSave = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      success("Paramètres enregistrés", "Les modifications ont été sauvegardées.");
    }, 800);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]">Paramètres</h1>
          <p className="mt-1 text-[15px] text-[var(--color-text-secondary)]">Gérez votre compte et les informations de votre boutique.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
            <Card hover={false}>
              <div className="flex items-center gap-2 mb-5">
                <User className="w-5 h-5 text-[var(--color-accent)]" strokeWidth={1.5} />
                <h2 className="text-[17px] font-semibold text-[var(--color-text-primary)]">Profil utilisateur</h2>
              </div>
              <div className="space-y-4">
                <Input label="Nom" defaultValue={user?.name || ""} />
                <Input label="Email" type="email" defaultValue={user?.email || ""} disabled />
                <div>
                  <label className="block text-[13px] font-semibold text-[var(--color-text-secondary)] mb-1.5">Rôle</label>
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-[var(--radius-md)] text-[13px] font-semibold bg-[var(--color-accent-light)] text-[var(--color-accent)]">
                    <Shield className="w-3 h-3" />
                    {user?.role || "Admin"}
                  </span>
                </div>
                <Button className="w-full">Mettre à jour le profil</Button>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
            <Card hover={false}>
              <div className="flex items-center gap-2 mb-5">
                <Globe className="w-5 h-5 text-[var(--color-accent)]" strokeWidth={1.5} />
                <h2 className="text-[17px] font-semibold text-[var(--color-text-primary)]">Informations boutique</h2>
              </div>
              <div className="space-y-4">
                <Input label="Nom de la boutique" value={store.name} onChange={(e) => setStore({ ...store, name: e.target.value })} />
                <Input label="Email de contact" type="email" value={store.email} onChange={(e) => setStore({ ...store, email: e.target.value })} />
                <Input label="Téléphone" value={store.phone} onChange={(e) => setStore({ ...store, phone: e.target.value })} />
                <div>
                  <label className="block text-[13px] font-semibold text-[var(--color-text-secondary)] mb-1.5">Adresse</label>
                  <textarea
                    className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] text-[15px] px-3.5 py-2.5 transition-all focus:outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(16,185,129,0.15)] resize-none"
                    rows={3}
                    value={store.address}
                    onChange={(e) => setStore({ ...store, address: e.target.value })}
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
            <Card hover={false}>
              <div className="flex items-center gap-2 mb-5">
                <Key className="w-5 h-5 text-[var(--color-accent)]" strokeWidth={1.5} />
                <h2 className="text-[17px] font-semibold text-[var(--color-text-primary)]">Sécurité</h2>
              </div>
              <div className="space-y-4">
                <Input label="Mot de passe actuel" type="password" placeholder="••••••••" />
                <Input label="Nouveau mot de passe" type="password" placeholder="Min. 8 caractères" />
                <Input label="Confirmer le mot de passe" type="password" />
                <Button variant="secondary" className="w-full">Changer le mot de passe</Button>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }}>
            <Card hover={false} className="flex flex-col gap-4">
              <Button onClick={handleSave} isLoading={loading} className="w-full">Enregistrer tous les changements</Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
}
