import { AdminLayout } from "@/components/layout/admin-layout";

export default function ClientsPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]">
          Clients
        </h1>
        <p className="mt-2 text-[15px] text-[var(--color-text-secondary)]">Page en cours de développement</p>
      </div>
    </AdminLayout>
  );
}
