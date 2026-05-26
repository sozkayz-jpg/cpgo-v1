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
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface Order {
  id: number;
  number: string;
  status: string;
  total: number;
  subtotal: number;
  shipping: number;
  createdAt: string;
  customer: { firstName: string; lastName: string; email: string } | null;
  items: Array<{ quantity: number; product: { name: string } }> | null;
}

const statusMap: Record<string, string> = {
  pending: "En attente",
  confirmed: "Confirmée",
  shipped: "Expédiée",
  delivered: "Livrée",
  cancelled: "Annulée",
  refunded: "Remboursée",
};

const statusOptions = [
  { value: "pending", label: "En attente" },
  { value: "confirmed", label: "Confirmée" },
  { value: "shipped", label: "Expédiée" },
  { value: "delivered", label: "Livrée" },
  { value: "cancelled", label: "Annulée" },
  { value: "refunded", label: "Remboursée" },
];

function getStatusVariant(status: string): string {
  switch (status) {
    case "delivered":
      return "accent";
    case "confirmed":
      return "accent";
    case "shipped":
      return "warning";
    case "cancelled":
    case "refunded":
      return "destructive";
    default:
      return "default";
  }
}

export default function CommandesPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<Record<number, boolean>>({});
  const { success, error: showError } = useToast();

  const loadOrders = () => {
    setLoading(true);
    fetch("/api/orders")
      .then(async (r) => {
        if (!r.ok) throw new Error("Erreur de chargement");
        return r.json();
      })
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .catch(() => showError("Erreur", "Impossible de charger les commandes."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    setUpdating((prev) => ({ ...prev, [orderId]: true }));
    try {
      const r = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!r.ok) throw new Error("Échec de la mise à jour");
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
      success("Statut mis à jour", `Commande #${orderId} → ${statusMap[newStatus] || newStatus}`);
    } catch {
      showError("Erreur", "Impossible de modifier le statut.");
    } finally {
      setUpdating((prev) => ({ ...prev, [orderId]: false }));
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]">
            Commandes
          </h1>
          <p className="mt-1 text-[15px] text-[var(--color-text-secondary)]">
            {orders.length} commande{orders.length > 1 ? "s" : ""} au total
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>N°</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Produits</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={6}>
                      <div className="h-6 rounded bg-[var(--color-bg-secondary)] animate-shimmer w-full" />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">#{order.number}</TableCell>
                    <TableCell>
                      <div>
                        <span className="font-medium">
                          {order.customer?.firstName} {order.customer?.lastName}
                        </span>
                        <br />
                        <span className="text-[13px] text-[var(--color-text-tertiary)]">
                          {order.customer?.email}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{order.items?.length || 0} article(s)</TableCell>
                    <TableCell className="text-[var(--color-text-secondary)]">
                      {order.createdAt
                        ? formatDistanceToNow(new Date(order.createdAt), { addSuffix: true, locale: fr })
                        : "—"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusVariant(order.status) as never}>
                          {statusMap[order.status] || order.status}
                        </Badge>
                        <select
                          value={order.status}
                          disabled={updating[order.id]}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className="text-[13px] border border-[var(--color-border)] rounded-[var(--radius-sm)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] px-2 py-1 transition-all focus:outline-none focus:border-[var(--color-accent)]"
                        >
                          {statusOptions.map((s) => (
                            <option key={s.value} value={s.value}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                        {updating[order.id] && (
                          <span className="inline-block w-3 h-3 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {(order.total / 100).toLocaleString("fr-FR")} €
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
