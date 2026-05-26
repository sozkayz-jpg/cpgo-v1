"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/layout/admin-layout";
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
import { Plus, Pencil, Trash2, Eye } from "lucide-react";

interface Product {
  id: number;
  name: string;
  slug: string;
  reference: string;
  category: { name: string };
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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedProduct) return;
    await fetch(`/api/products/${selectedProduct.id}`, { method: "DELETE" });
    setProducts(products.filter((p) => p.id !== selectedProduct.id));
    setDeleteModalOpen(false);
    setSelectedProduct(null);
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
              Gérez votre catalogue de produits</p>
          </div>
          <Button leftIcon={<Plus className="w-4 h-4" strokeWidth={1.5} />}>
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
                        <a href={`/admin/produits/${product.id}`} className="w-8 h-8 rounded-[var(--radius-sm)] flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
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

      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Supprimer le produit"
        description={`Êtes-vous sûr de vouloir supprimer "${selectedProduct?.name}" ? Cette action est irréversible.`}
        size="sm"
      >
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="secondary" onClick={() => setDeleteModalOpen(false)}>Annuler</Button>
          <Button variant="destructive" onClick={confirmDelete}>Supprimer</Button>
        </div>
      </Modal>
    </AdminLayout>
  );
}
