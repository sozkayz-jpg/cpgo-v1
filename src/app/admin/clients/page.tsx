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

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  city: string | null;
  orders: Array<{ id: number; status: string; total: number }> | null;
  createdAt: string;
}

export default function ClientsPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const { error: showError } = useToast();

  useEffect(() => {
    setLoading(true);
    fetch("/api/customers")
      .then(async (r) => {
        if (!r.ok) throw new Error("Erreur de chargement");
        return r.json();
      })
      .then((data) => setCustomers(Array.isArray(data) ? data : []))
      .catch(() => showError("Erreur", "Impossible de charger les clients."))
      .finally(() => setLoading(false));
  }, []);

  const totalSpent = (orders?: Customer["orders"]) => {
    if (!orders || !orders.length) return 0;
    return orders.reduce((sum, o) => sum + (o.total || 0), 0);
  };

  const orderCount = (orders?: Customer["orders"]) => {
    if (!orders) return 0;
    return orders.length;
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
            Clients
          </h1>
          <p className="mt-1 text-[15px] text-[var(--color-text-secondary)]">
            {customers.length} client{customers.length > 1 ? "s" : ""} enregistré{customers.length > 1 ? "s" : ""}
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
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Ville</TableHead>
                <TableHead>Commandes</TableHead>
                <TableHead className="text-right">Total dépensé</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={5}>
                      <div className="h-6 rounded bg-[var(--color-bg-secondary)] animate-shimmer w-full" />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">
                      {customer.firstName} {customer.lastName}
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.city || "—"}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {orderCount(customer.orders) > 0 ? (
                          <Badge variant="accent">
                            {orderCount(customer.orders)} commande{orderCount(customer.orders) > 1 ? "s" : ""}
                          </Badge>
                        ) : (
                          <span className="text-[13px] text-[var(--color-text-tertiary)]">Aucune</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {(totalSpent(customer.orders) / 100).toLocaleString("fr-FR")} €
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
