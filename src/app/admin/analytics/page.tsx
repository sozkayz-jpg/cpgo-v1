"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Card } from "@/components/ui/card";
import { KPICard } from "@/components/dashboard/kpi-card";
import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react";

interface Order {
  id: number;
  total: number;
  status: string;
  createdAt: string;
}

export default function AnalyticsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch("/api/orders").then((r) => r.json()).then(setOrders);
    fetch("/api/products").then((r) => r.json()).then(setProducts);
    fetch("/api/customers").then((r) => r.json()).then(setCustomers);
  }, []);

  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const totalCustomers = customers.length;
  const avgOrder = totalOrders > 0 ? Math.round(totalSales / totalOrders / 100) : 0;

  // Simple SVG chart data — group by month
  const salesMap = new Map<string, number>();
  orders.forEach((order) => {
    const key = new Date(order.createdAt).toLocaleDateString("fr-FR", { month: "short", day: "2-digit" });
    salesMap.set(key, (salesMap.get(key) || 0) + order.total / 100);
  });
  const chartData = Array.from(salesMap.entries()).slice(-10).map(([label, value]) => ({ label, value }));
  const maxValue = chartData.length > 0 ? Math.max(...chartData.map((d) => d.value)) : 1;

  return (
    <AdminLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]">Analytics</h1>
          <p className="mt-1 text-[15px] text-[var(--color-text-secondary)]">Vue d'ensemble des performances de votre boutique.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <KPICard title="Ventes totales" value={Math.round(totalSales / 100)} suffix=" €" change={12.5} icon={<DollarSign className="w-5 h-5" strokeWidth={1.5} />} color="accent" />
          <KPICard title="Commandes" value={totalOrders} change={8.2} icon={<ShoppingCart className="w-5 h-5" strokeWidth={1.5} />} color="info" />
          <KPICard title="Clients" value={totalCustomers} change={-2.1} icon={<Users className="w-5 h-5" strokeWidth={1.5} />} color="warning" />
          <KPICard title="Panier moyen" value={avgOrder} suffix=" €" change={5.7} icon={<TrendingUp className="w-5 h-5" strokeWidth={1.5} />} color="accent" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card hover={false}>
            <h2 className="text-[17px] font-semibold text-[var(--color-text-primary)] mb-4">Ventes par période</h2>
            <div className="relative h-[300px] flex items-end gap-3 px-4">
              {chartData.length === 0 && (
                <div className="w-full text-center text-[13px] text-[var(--color-text-tertiary)]">Pas encore de données</div>
              )}
              {chartData.map((d, i) => {
                const height = Math.max((d.value / maxValue) * 240, 4);
                return (
                  <div key={i} className="flex flex-col items-center flex-1 gap-2 group">
                    <div className="relative w-full flex items-end justify-center">
                      <div
                        className="w-full max-w-[40px] rounded-[var(--radius-sm)] bg-[var(--color-accent)] opacity-80 group-hover:opacity-100 transition-all duration-300 relative"
                        style={{ height: `${height}px` }}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[var(--color-text-primary)] text-white text-[11px] font-medium px-2 py-1 rounded-[var(--radius-sm)] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {Math.round(d.value).toLocaleString("fr-FR")} €
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-[var(--color-text-tertiary)]">{d.label}</span>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
