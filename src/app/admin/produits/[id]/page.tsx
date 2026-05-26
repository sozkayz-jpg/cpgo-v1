"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/layout/admin-layout";
import { useToast } from "@/components/ui/toast";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SEOScore } from "@/components/dashboard/seo-score";
import { Save, Eye, Type, AlignLeft, Tag, CheckCircle, AlertCircle, XCircle, ArrowLeft } from "lucide-react";

interface Product {
  id: number;
  name: string;
  slug: string;
  reference: string;
  description?: string;
  shortDesc?: string;
  price: number;
  stock: number;
  status: string;
  category?: { name: string } | null;
  metaTitle?: string;
  metaDescription?: string;
}

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { success, error: showError } = useToast();
  const [product, setProduct] = React.useState<Product | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [seoScore, setSeoScore] = React.useState(72);

  const [form, setForm] = React.useState({
    name: "",
    reference: "",
    slug: "",
    price: "",
    stock: "",
    status: "active",
    description: "",
    shortDesc: "",
    metaTitle: "",
    metaDescription: "",
    category: "",
  });

  React.useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/products/${id}`)
      .then(async (r) => {
        if (!r.ok) throw new Error("Produit non trouvé");
        return r.json();
      })
      .then((data: Product) => {
        setProduct(data);
        setForm({
          name: data.name || "",
          reference: data.reference || "",
          slug: data.slug || "",
          price: data.price ? String(data.price / 100) : "",
          stock: data.stock !== undefined ? String(data.stock) : "",
          status: data.status || "active",
          description: data.description || "",
          shortDesc: data.shortDesc || "",
          metaTitle: data.metaTitle || "",
          metaDescription: data.metaDescription || "",
          category: data.category?.name || "",
        });
      })
      .catch(() => showError("Erreur", "Impossible de charger le produit."))
      .finally(() => setLoading(false));
  }, [id, showError]);

  React.useEffect(() => {
    let score = 0;
    if (form.metaTitle) score += 25;
    if (form.metaDescription) score += 25;
    if (form.name) score += 20;
    if (form.description) score += 20;
    if (form.slug) score += 10;
    setSeoScore(score);
  }, [form]);

  const handleSave = async () => {
    if (!product) return;
    setSaving(true);
    const payload = {
      name: form.name.trim(),
      reference: form.reference.trim(),
      slug: form.slug.trim() || undefined,
      price: Number(form.price) * 100,
      stock: Number(form.stock),
      status: form.status,
      description: form.description.trim() || undefined,
      shortDesc: form.shortDesc.trim() || undefined,
      metaTitle: form.metaTitle.trim() || undefined,
      metaDescription: form.metaDescription.trim() || undefined,
    };
    try {
      const r = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!r.ok) {
        const body = await r.json().catch(() => ({}));
        throw new Error(body.error || "Échec de la sauvegarde");
      }
      success("Enregistré", `"${payload.name}" a été mis à jour.`);
    } catch (e: any) {
      showError("Erreur", e?.message || "Impossible d'enregistrer le produit.");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !product) {
    return (
      <AdminLayout>
        <div className="space-y-6 animate-pulse">
          <div className="h-8 bg-[var(--color-bg-secondary)] rounded w-1/3" />
          <div className="h-96 bg-[var(--color-bg-secondary)] rounded" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push("/admin/produits")}
                className="inline-flex items-center gap-1 text-[13px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                Retour
              </button>
            </div>
            <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]">
              Modifier le produit
            </h1>
            <p className="mt-1 text-[15px] text-[var(--color-text-secondary)]">
              {product.name} - Réf. {product.reference}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a href={`/boutique/${product.slug}`}>
              <Button variant="secondary" leftIcon={<Eye className="w-4 h-4" strokeWidth={1.5} />}>
                Aperçu
              </Button>
            </a>
            <Button leftIcon={<Save className="w-4 h-4" strokeWidth={1.5} />} onClick={handleSave} isLoading={saving}>
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
                <Input label="Nom du produit" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Référence" value={form.reference} onChange={(e) => setForm((f) => ({ ...f, reference: e.target.value }))} />
                  <Input label="Prix (€)" type="number" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Stock" type="number" value={form.stock} onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))} />
                  <Input label="Catégorie" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-[var(--color-text-secondary)] mb-1.5">Statut</label>
                  <select
                    className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] text-[15px] px-3.5 py-2.5 transition-all duration-[var(--duration-normal)] ease-[var(--ease-apple)] focus:outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(16,185,129,0.15)]"
                    value={form.status}
                    onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                  >
                    <option value="active">Actif</option>
                    <option value="low_stock">Stock faible</option>
                    <option value="out_of_stock">Rupture</option>
                    <option value="draft">Brouillon</option>
                  </select>
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
                    value={form.shortDesc}
                    onChange={(e) => setForm((f) => ({ ...f, shortDesc: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-[var(--color-text-secondary)] mb-1.5">
                    Description longue
                  </label>
                  <textarea
                    className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] text-[15px] placeholder:text-[var(--color-text-tertiary)] px-3.5 py-2.5 transition-all duration-[var(--duration-normal)] ease-[var(--ease-apple)] focus:outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(16,185,129,0.15)] resize-none"
                    rows={6}
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
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
                  value={form.metaTitle}
                  onChange={(e) => setForm((f) => ({ ...f, metaTitle: e.target.value }))}
                  rightIcon={<span className="text-[11px] text-[var(--color-text-tertiary)]">{form.metaTitle.length}/60</span>}
                />
                <div>
                  <label className="block text-[13px] font-semibold text-[var(--color-text-secondary)] mb-1.5">
                    Meta description
                  </label>
                  <textarea
                    className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] text-[15px] placeholder:text-[var(--color-text-tertiary)] px-3.5 py-2.5 transition-all duration-[var(--duration-normal)] ease-[var(--ease-apple)] focus:outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(16,185,129,0.15)] resize-none"
                    rows={3}
                    value={form.metaDescription}
                    onChange={(e) => setForm((f) => ({ ...f, metaDescription: e.target.value }))}
                  />
                  <p className="mt-1 text-[11px] text-[var(--color-text-tertiary)] text-right">{form.metaDescription.length}/160</p>
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-[var(--color-text-secondary)] mb-1.5">
                    URL slug
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] text-[var(--color-text-tertiary)]">cpgo.fr/produit/</span>
                    <input
                      type="text"
                      value={form.slug}
                      onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
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
                  <Badge variant="accent">{form.metaTitle ? "OK" : "Manquant"}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[var(--color-accent)]" strokeWidth={1.5} />
                    <span className="text-[13px] text-[var(--color-text-secondary)]">Meta description</span>
                  </div>
                  <Badge variant="accent">{form.metaDescription ? "OK" : "Manquant"}</Badge>
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
                  cpgo.fr › produit › {form.slug || "produit"}
                </p>
                <p className="text-[18px] text-[#1a0dab] dark:text-[#8ab4f8] font-medium leading-tight">
                  {form.metaTitle || form.name || "Titre du produit"}
                </p>
                <p className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed">
                  {form.metaDescription || form.shortDesc || "Description du produit..."}
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
}
