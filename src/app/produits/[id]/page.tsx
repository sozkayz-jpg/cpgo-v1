"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SEOScore } from "@/components/dashboard/seo-score";
import { cn } from "@/lib/utils";
import { Save, Eye, Image as ImageIcon, Type, AlignLeft, Tag, CheckCircle, AlertCircle, XCircle } from "lucide-react";

export default function ProductPage() {
  const [seoScore, setSeoScore] = React.useState(72);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]">
              Modifier le produit
            </h1>
            <p className="mt-1 text-[15px] text-[var(--color-text-secondary)]">
              Chaise ergonomique premium - Réf. CH-2024-001
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" leftIcon={<Eye className="w-4 h-4" strokeWidth={1.5} />}>
              Aperçu
            </Button>
            <Button leftIcon={<Save className="w-4 h-4" strokeWidth={1.5} />}>
              Enregistrer
            </Button>
          </div>
        </motion.div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          {/* Left - Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-6"
          >
            {/* General */}
            <Card>
              <div className="flex items-center gap-2 mb-5">
                <Type className="w-5 h-5 text-[var(--color-accent)]" strokeWidth={1.5} />
                <h2 className="text-[17px] font-semibold text-[var(--color-text-primary)]">Informations générales</h2>
              </div>

              <div className="space-y-4">
                <Input label="Nom du produit" defaultValue="Chaise ergonomique premium" />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Référence" defaultValue="CH-2024-001" />
                  <Input label="Prix (€)" type="number" defaultValue="499" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Stock" type="number" defaultValue="45" />
                  <Input label="Catégorie" defaultValue="Mobilier de bureau" />
                </div>
              </div>
            </Card>

            {/* Description */}
            <Card>
              <div className="flex items-center gap-2 mb-5">
                <AlignLeft className="w-5 h-5 text-[var(--color-accent)]" strokeWidth={1.5} />
                <h2 className="text-[17px] font-semibold text-[var(--color-text-primary)]">Description</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[13px] font-semibold text-[var(--color-text-secondary)] mb-1.5">
                    Description courte
                  </label>
                  <textarea
                    className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] text-[15px] placeholder:text-[var(--color-text-tertiary)] px-3.5 py-2.5 transition-all duration-[var(--duration-normal)] ease-[var(--ease-apple)] focus:outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(16,185,129,0.15)] resize-none"
                    rows={3}
                    defaultValue="Chaise ergonomique haut de gamme avec support lombaire réglable et accoudoirs 4D."
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-[var(--color-text-secondary)] mb-1.5">
                    Description longue
                  </label>
                  <textarea
                    className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] text-[15px] placeholder:text-[var(--color-text-tertiary)] px-3.5 py-2.5 transition-all duration-[var(--duration-normal)] ease-[var(--ease-apple)] focus:outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(16,185,129,0.15)] resize-none"
                    rows={6}
                    defaultValue="Conçue pour les professionnels passant de longues heures assis, cette chaise ergonomique premium offre un confort exceptionnel grâce à son support lombaire dynamique, ses accoudoirs 4D réglables et son dossier en mesh respirant."
                  />
                </div>
              </div>
            </Card>

            {/* SEO */}
            <Card>
              <div className="flex items-center gap-2 mb-5">
                <Tag className="w-5 h-5 text-[var(--color-accent)]" strokeWidth={1.5} />
                <h2 className="text-[17px] font-semibold text-[var(--color-text-primary)]">SEO</h2>
              </div>

              <div className="space-y-4">
                <Input
                  label="Meta title"
                  defaultValue="Chaise ergonomique premium | CPGO"
                  rightIcon={<span className="text-[11px] text-[var(--color-text-tertiary)]">55/60</span>
                  }
                />
                <div>
                  <label className="block text-[13px] font-semibold text-[var(--color-text-secondary)] mb-1.5">
                    Meta description
                  </label>
                  <textarea
                    className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] text-[15px] placeholder:text-[var(--color-text-tertiary)] px-3.5 py-2.5 transition-all duration-[var(--duration-normal)] ease-[var(--ease-apple)] focus:outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(16,185,129,0.15)] resize-none"
                    rows={3}
                    defaultValue="Découvrez notre chaise ergonomique premium avec support lombaire réglable. Livraison gratuite et garantie 5 ans."
                  />
                  <p className="mt-1 text-[11px] text-[var(--color-text-tertiary)] text-right">142/160</p>
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-[var(--color-text-secondary)] mb-1.5">
                    URL slug
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] text-[var(--color-text-tertiary)]">cpgo.fr/produit/</span>
                    <input
                      type="text"
                      defaultValue="chaise-ergonomique-premium"
                      className="flex-1 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] text-[15px] px-3.5 py-2.5 transition-all duration-[var(--duration-normal)] ease-[var(--ease-apple)] focus:outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(16,185,129,0.15)]"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Right - Preview & SEO Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-6 lg:sticky lg:top-[80px] lg:self-start"
          >
            {/* SEO Score */}
            <Card className="flex flex-col items-center py-8">
              <SEOScore score={seoScore} size="md" />

              <div className="mt-6 w-full space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[var(--color-accent)]" strokeWidth={1.5} />
                    <span className="text-[13px] text-[var(--color-text-secondary)]">Meta title présent</span>
                  </div>
                  <Badge variant="accent">OK</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[var(--color-accent)]" strokeWidth={1.5} />
                    <span className="text-[13px] text-[var(--color-text-secondary)]">Meta description</span>
                  </div>
                  <Badge variant="accent">OK</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-[var(--color-warning)]" strokeWidth={1.5} />
                    <span className="text-[13px] text-[var(--color-text-secondary)]">Images sans alt</span>
                  </div>
                  <Badge variant="warning">2</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-[var(--color-destructive)]" strokeWidth={1.5} />
                    <span className="text-[13px] text-[var(--color-text-secondary)]">Schema markup</span>
                  </div>
                  <Badge variant="destructive">Manquant</Badge>
                </div>
              </div>
            </Card>

            {/* Preview */}
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-5 h-5 text-[var(--color-accent)]" strokeWidth={1.5} />
                <h2 className="text-[17px] font-semibold text-[var(--color-text-primary)]">Aperçu Google</h2>
              </div>

              <div className="space-y-2 p-4 rounded-[var(--radius-md)] bg-[var(--color-bg-secondary)]">
                <p className="text-[14px] text-[var(--color-accent)] truncate">
                  cpgo.fr › produit › chaise-ergonomique-premium
                </p>
                <p className="text-[18px] text-[#1a0dab] dark:text-[#8ab4f8] font-medium leading-tight">
                  Chaise ergonomique premium | CPGO
                </p>
                <p className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed">
                  Découvrez notre chaise ergonomique premium avec support lombaire réglable. Livraison gratuite et garantie 5 ans.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
}
