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
  customer: { firstName: string; lastName: string; email: string };
  items: { quantity: number; product: { name: string } }[];
}

const statusMap: Record<string, string> = {
  pending: "En attente",
  confirmed: "Confirmée",
  shipped: "Expédiée",
  delivered: "Livrée",
  cancelled: "Annulée",
  refunded: "Remboursée",
};

export default function CommandesPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then(setOrders);
  }, []);

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
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.number}</TableCell>
                  <TableCell>
                    <div>
                      <span className="font-medium">{order.customer?.firstName} {order.customer?.lastName}</span>
                      <br />
                      <span className="text-[13px] text-[var(--color-text-tertiary)]">{order.customer?.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>{order.items?.length || 0} article(s)</TableCell>
                  <TableCell className="text-[var(--color-text-secondary)]">
                    {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true, locale: fr })}
                  </TableCell>
                  <TableCell>
                    <Badge variant={order.status as never}>{statusMap[order.status] || order.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {(order.total / 100).toLocaleString("fr-FR")} €
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
