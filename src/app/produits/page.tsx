"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";
import { Plus, Search, Filter, Pencil, Trash2, Eye } from "lucide-react";

const products = [
  { id: "PRD-001", name: "Chaise ergonomique premium", category: "Mobilier", price: 499, stock: 45, status: "active" as const },
  { id: "PRD-002", name: "Bureau standing électrique", category: "Bureaux", price: 899, stock: 12, status: "active" as const },
  { id: "PRD-003", name: "Lampe de bureau LED", category: "Éclairage", price: 129, stock: 0, status: "out_of_stock" as const },
  { id: "PRD-004", name: "Support écran double", category: "Accessoires", price: 89, stock: 78, status: "active" as const },
  { id: "PRD-005", name: "Tapis de souris XL", category: "Accessoires", price: 35, stock: 156, status: "active" as const },
  { id: "PRD-006", name: "Casque antibruit pro", category: "Audio", price: 299, stock: 8, status: "low_stock" as const },
  { id: "PRD-007", name: "Webcam 4K", category: "Périphériques", price: 199, stock: 23, status: "active" as const },
  { id: "PRD-008", name: "Clavier mécanique RGB", category: "Périphériques", price: 159, stock: 0, status: "out_of_stock" as const },
];

function getProductStatusVariant(status: string) {
  switch (status) {
    case "active": return "accent";
    case "low_stock": return "warning";
    case "out_of_stock": return "destructive";
    default: return "default";
  }
}

function getProductStatusLabel(status: string) {
  switch (status) {
    case "active": return "Actif";
    case "low_stock": return "Stock faible";
    case "out_of_stock": return "Rupture";
    default: return status;
  }
}

export default function ProductsPage() {
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<typeof products[0] | null>(null);

  const handleDelete = (product: typeof products[0]) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

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
            <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]">
              Produits
            </h1>
            <p className="mt-1 text-[15px] text-[var(--color-text-secondary)]">
              Gérez votre catalogue de produits
            </p>
          </div>
          <Button leftIcon={<Plus className="w-4 h-4" strokeWidth={1.5} />}>
            Nouveau produit
          </Button>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-tertiary)]" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] text-[15px] placeholder:text-[var(--color-text-tertiary)] pl-10 pr-4 py-2.5 transition-all duration-[var(--duration-normal)] ease-[var(--ease-apple)] focus:outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(16,185,129,0.15)]"
            />
          </div>
          <Button variant="secondary" leftIcon={<Filter className="w-4 h-4" strokeWidth={1.5} />}>
            Filtres
          </Button>
        </motion.div>

        {/* Products Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Référence</TableHead>
                <TableHead>Produit</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead className="text-right">Prix</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium text-[var(--color-text-secondary)]">{product.id}</TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="text-[var(--color-text-secondary)]">{product.category}</TableCell>
                  <TableCell className="text-right font-medium">{product.price.toLocaleString("fr-FR")} €</TableCell>
                  <TableCell className={cn(
                    "text-right font-medium",
                    product.stock === 0 && "text-[var(--color-destructive)]",
                    product.stock < 10 && product.stock > 0 && "text-[var(--color-warning)]"
                  )}>
                    {product.stock}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getProductStatusVariant(product.status)}>
                      {getProductStatusLabel(product.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <button className="w-8 h-8 rounded-[var(--radius-sm)] flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
                        <Eye className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                      <button className="w-8 h-8 rounded-[var(--radius-sm)] flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-accent)] transition-colors">
                        <Pencil className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
                        className="w-8 h-8 rounded-[var(--radius-sm)] flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[rgba(255,59,48,0.08)] hover:text-[var(--color-destructive)] transition-colors"
                      >
                        <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </div>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Supprimer le produit"
        description={`Êtes-vous sûr de vouloir supprimer "${selectedProduct?.name}" ? Cette action est irréversible.`}
        size="sm"
      >
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="secondary" onClick={() => setDeleteModalOpen(false)}>
            Annuler
          </Button>
          <Button variant="destructive" onClick={() => setDeleteModalOpen(false)}>
            Supprimer
          </Button>
        </div>
      </Modal>
    </AdminLayout>
  );
}
