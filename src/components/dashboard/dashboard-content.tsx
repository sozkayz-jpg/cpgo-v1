"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
} from "lucide-react";
import { KPICard } from "@/components/dashboard/kpi-card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const kpiData = [
  {
    title: "Ventes totales",
    value: 45280,
    prefix: "",
    suffix: " €",
    change: 12.5,
    icon: <DollarSign className="w-5 h-5" strokeWidth={1.5} />,
    color: "accent" as const,
  },
  {
    title: "Commandes",
    value: 1284,
    prefix: "",
    suffix: "",
    change: 8.2,
    icon: <ShoppingCart className="w-5 h-5" strokeWidth={1.5} />,
    color: "info" as const,
  },
  {
    title: "Clients",
    value: 3240,
    prefix: "",
    suffix: "",
    change: -2.1,
    icon: <Users className="w-5 h-5" strokeWidth={1.5} />,
    color: "warning" as const,
  },
  {
    title: "Produits",
    value: 856,
    prefix: "",
    suffix: "",
    change: 5.7,
    icon: <Package className="w-5 h-5" strokeWidth={1.5} />,
    color: "accent" as const,
  },
];

const recentOrders: Array<{
  id: string;
  client: string;
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled" | "refunded";
  date: string;
}> = [
  { id: "#CMD-2024-001", client: "Marie Dupont", total: 2450, status: "delivered" as const, date: "26 mai 2024" },
  { id: "#CMD-2024-002", client: "Jean Martin", total: 1890, status: "shipped" as const, date: "25 mai 2024" },
  { id: "#CMD-2024-003", client: "Sophie Bernard", total: 3200, status: "confirmed" as const, date: "25 mai 2024" },
  { id: "#CMD-2024-004", client: "Lucas Petit", total: 750, status: "pending" as const, date: "24 mai 2024" },
  { id: "#CMD-2024-005", client: "Emma Richard", total: 4100, status: "cancelled" as const, date: "23 mai 2024" },
];

export function DashboardContent() {
  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Recent Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="mb-4">
          <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]">
            Commandes récentes
          </h2>
          <p className="text-[15px] text-[var(--color-text-secondary)]">
            Les 5 dernières commandes passées sur votre boutique
          </p>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>N° Commande</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.client}</TableCell>
                <TableCell className="text-[var(--color-text-secondary)]">{order.date}</TableCell>
                <TableCell>
                  <Badge variant={order.status}>
                    {order.status === "delivered" && "Livrée"}
                    {order.status === "shipped" && "Expédiée"}
                    {order.status === "confirmed" && "Confirmée"}
                    {order.status === "pending" && "En attente"}
                    {order.status === "cancelled" && "Annulée"}
                    {order.status === "refunded" && "Remboursée"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {order.total.toLocaleString("fr-FR")} €
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
}
