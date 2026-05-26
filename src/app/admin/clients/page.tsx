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

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  city: string | null;
  orders: Array<{ id: number; status: string; total: number }>;
  createdAt: string;
}

export default function ClientsPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetch("/api/customers")
      .then((r) => r.json())
      .then(setCustomers);
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
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.firstName} {customer.lastName}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.city || "—"}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {customer.orders?.length ? (
                        <Badge variant="accent">{customer.orders.length} commande{customer.orders.length > 1 ? "s" : ""}</Badge>
                      ) : (
                        <span className="text-[13px] text-[var(--color-text-tertiary)]">Aucune</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {(customer.orders?.reduce((sum, o) => sum + o.total, 0) / 100).toLocaleString("fr-FR")} €
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
