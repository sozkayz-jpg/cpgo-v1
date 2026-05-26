"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
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

interface Order {
  id: number;
  number: string;
  status: string;
  total: number;
  subtotal: number;
  createdAt: string;
  customer: { firstName: string; lastName: string };
}

export function DashboardContent() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch("/api/orders?limit=5").then((r) => r.json()).then(setOrders);
    fetch("/api/products").then((r) => r.json()).then(setProducts);
    fetch("/api/customers").then((r) => r.json()).then(setCustomers);
  }, []);

  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const totalCustomers = customers.length;
  const totalProducts = products.length;

  const kpiData = [
    {
      title: "Ventes totales",
      value: Math.round(totalSales / 100),
      prefix: "",
      suffix: " €",
      change: 12.5,
      icon: <DollarSign className="w-5 h-5" strokeWidth={1.5} />,
      color: "accent" as const,
    },
    {
      title: "Commandes",
      value: totalOrders,
      prefix: "",
      suffix: "",
      change: 8.2,
      icon: <ShoppingCart className="w-5 h-5" strokeWidth={1.5} />,
      color: "info" as const,
    },
    {
      title: "Clients",
      value: totalCustomers,
      prefix: "",
      suffix: "",
      change: -2.1,
      icon: <Users className="w-5 h-5" strokeWidth={1.5} />,
      color: "warning" as const,
    },
    {
      title: "Produits",
      value: totalProducts,
      prefix: "",
      suffix: "",
      change: 5.7,
      icon: <Package className="w-5 h-5" strokeWidth={1.5} />,
      color: "accent" as const,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

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
            Les dernières commandes passées sur votre boutique
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
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">#{order.number}</TableCell>
                <TableCell>{order.customer?.firstName} {order.customer?.lastName}</TableCell>
                <TableCell className="text-[var(--color-text-secondary)]">
                  {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true, locale: fr })}
                </TableCell>
                <TableCell>
                  <Badge variant={order.status as never}>
                    {order.status === "delivered" && "Livrée"}
                    {order.status === "shipped" && "Expédiée"}
                    {order.status === "confirmed" && "Confirmée"}
                    {order.status === "pending" && "En attente"}
                    {order.status === "cancelled" && "Annulée"}
                    {order.status === "refunded" && "Remboursée"}
                  </Badge>
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
  );
}
