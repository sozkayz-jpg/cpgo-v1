"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/layout/admin-layout";
import { useToast } from "@/components/ui/toast";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";

interface Product {
  id: number;
  name: string;
  slug: string;
  reference: string;
  category: { name: string } | null;
  price: number;
  stock: number;
  status: string;
}

const statusLabels: Record<string, string> = {
  active: "Actif",
  low_stock: "Stock faible",
  out_of_stock: "Rupture",
  draft: "Brouillon",
};

function getStatusVariant(status: string) {
  switch (status) {
    case "active": return "accent";
    case "low_stock": return "warning";
    case "out_of_stock": return "destructive";
    default: return "default";
  }
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [creating, setCreating] = useState(false);
  const { success, error: showError } = useToast();

  const [newProduct, setNewProduct] = useState({
    name: "",
    reference: "",
    slug: "",
    price: "",
    stock: "",
    description: "",
  });

  const loadProducts = () => {
    setLoading(true);
    fetch("/api/products")
      .then(async (r) => {
        if (!r.ok) throw new Error("Erreur de chargement");
        return r.json();
      })
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        showError("Erreur", "Impossible de charger les produits.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedProduct) return;
    setDeleting(true);
    try {
      const r = await fetch(`/api/products/${selectedProduct.id}`, { method: "DELETE" });
      if (!r.ok) throw new Error("Échec de la suppression");
      setProducts((prev) => prev.filter((p) => p.id !== selectedProduct.id));
      success("Produit supprimé", `"${selectedProduct.name}" a été supprimé.`);
      setDeleteModalOpen(false);
      setSelectedProduct(null);
    } catch {
      showError("Erreur", "Impossible de supprimer le produit.");
    } finally {
      setDeleting(false);
    }
  };

  const handleCreate = async () => {
    const payload = {
      name: newProduct.name.trim(),
      reference: newProduct.reference.trim(),
      slug: newProduct.slug.trim() || undefined,
      price: Number(newProduct.price) * 100,
      stock: Number(newProduct.stock),
      description: newProduct.description.trim() || undefined,
      status: "active",
    };
    if (!payload.name || !payload.reference || !payload.price) {
      showError("Formulaire incomplet", "Merci de remplir au moins le nom, la référence et le prix.");
      return;
    }
    setCreating(true);
    try {
      const r = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!r.ok) {
        const body = await r.json().catch(() => ({}));
        throw new Error(body.error || "Échec de la création");
      }
      success("Produit créé", `"${payload.name}" a été ajouté.`);
      setCreateModalOpen(false);
      setNewProduct({ name: "", reference: "", slug: "", price: "", stock: "", description: "" });
      loadProducts();
    } catch (e: any) {
      showError("Erreur", e?.message || "Impossible de créer le produit.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]">Produits</h1>
            <p className="mt-1 text-[15px] text-[var(--color-text-secondary)]">
              Gérez votre catalogue de produits
            </p>
          </div>
          <Button
            leftIcon={<Plus className="w-4 h-4" strokeWidth={1.5} />}
            onClick={() => setCreateModalOpen(true)}
          >
            Nouveau produit
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Réf</TableHead>
                <TableHead>Produit</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead className="text-right">Prix</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={7}>
                      <div className="h-6 rounded bg-[var(--color-bg-secondary)] animate-shimmer w-full" />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium text-[var(--color-text-secondary)]">{product.reference}</TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="text-[var(--color-text-secondary)]">{product.category?.name || "—"}</TableCell>
                    <TableCell className="text-right font-medium">
                      {(product.price / 100).toLocaleString("fr-FR")} €
                    </TableCell>
                    <TableCell className={`text-right font-medium ${product.stock === 0 ? "text-[var(--color-destructive)]" : ""}`}>
                      {product.stock}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(product.status) as never}>
                        {statusLabels[product.status] || product.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <a href={`/boutique/${product.slug}`} className="w-8 h-8 rounded-[var(--radius-sm)] flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
                          <Eye className="w-4 h-4" strokeWidth={1.5} />
                        </a>
                        <a href={`/admin/produits/${product.id}`} className="w-8 h-8 rounded-[var(--radius-sm)] flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-accent)] transition-colors">
                          <Pencil className="w-4 h-4" strokeWidth={1.5} />
                        </a>
                        <button
                          onClick={() => handleDelete(product)}
                          className="w-8 h-8 rounded-[var(--radius-sm)] flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[rgba(255,59,48,0.08)] hover:text-[var(--color-destructive)] transition-colors"
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </motion.div>
      </div>

      {/* Delete modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Supprimer le produit"
        description={`Êtes-vous sûr de vouloir supprimer "${selectedProduct?.name}" ? Cette action est irréversible.`}
        size="sm"
      >
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="secondary" onClick={() => setDeleteModalOpen(false)} disabled={deleting}>
            Annuler
          </Button>
          <Button variant="destructive" onClick={confirmDelete} isLoading={deleting}>
            Supprimer
          </Button>
        </div>
      </Modal>

      {/* Create modal */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Nouveau produit"
        size="lg"
      >
        <div className="space-y-4 mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nom"
              placeholder="CarPlay sans fil - Model X"
              value={newProduct.name}
              onChange={(e) => setNewProduct((p) => ({ ...p, name: e.target.value }))}
            />
            <Input
              label="Référence"
              placeholder="CP-2025-001"
              value={newProduct.reference}
              onChange={(e) => setNewProduct((p) => ({ ...p, reference: e.target.value }))}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Slug (optionnel)"
              placeholder="carplay-sans-fil-model-x"
              value={newProduct.slug}
              onChange={(e) => setNewProduct((p) => ({ ...p, slug: e.target.value }))}
            />
            <Input
              label="Prix (€)"
              type="number"
              placeholder="129.00"
              value={newProduct.price}
              onChange={(e) => setNewProduct((p) => ({ ...p, price: e.target.value }))}
            />
          </div>
          <Input
            label="Stock"
            type="number"
            placeholder="100"
            value={newProduct.stock}
            onChange={(e) => setNewProduct((p) => ({ ...p, stock: e.target.value }))}
          />
          <div>
            <label className="block text-[13px] font-semibold text-[var(--color-text-secondary)] mb-1.5">
              Description
            </label>
            <textarea
              rows={4}
              className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] text-[15px] placeholder:text-[var(--color-text-tertiary)] px-3.5 py-2.5 transition-all duration-[var(--duration-normal)] ease-[var(--ease-apple)] focus:outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(16,185,129,0.15)] resize-none"
              placeholder="Description courte du produit..."
              value={newProduct.description}
              onChange={(e) => setNewProduct((p) => ({ ...p, description: e.target.value }))}
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setCreateModalOpen(false)} disabled={creating}>
              Annuler
            </Button>
            <Button onClick={handleCreate} isLoading={creating}>
              Créer
            </Button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}
