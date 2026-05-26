"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Palette, Type, Layout, Image as ImageIcon, MousePointer, Monitor, Smartphone, Sun, Moon, Check, RefreshCw } from "lucide-react";

const themeSettings = [
  {
    title: "Couleurs",
    icon: <Palette className="w-5 h-5" strokeWidth={1.5} />,
    description: "Personnalisez la palette de couleurs de votre boutique",
    fields: [
      { label: "Couleur principale", type: "color", value: "#10B981" },
      { label: "Couleur secondaire", type: "color", value: "#0A84FF" },
      { label: "Couleur de fond", type: "color", value: "#FFFFFF" },
    ],
  },
  {
    title: "Typographie",
    icon: <Type className="w-5 h-5" strokeWidth={1.5} />,
    description: "Choisissez les polices de votre site",
    fields: [
      { label: "Police titres", type: "select", value: "SF Pro Display" },
      { label: "Police body", type: "select", value: "SF Pro Text" },
      { label: "Taille de base", type: "text", value: "16px" },
    ],
  },
  {
    title: "Mise en page",
    icon: <Layout className="w-5 h-5" strokeWidth={1.5} />,
    description: "Configurez la structure de vos pages",
    fields: [
      { label: "Largeur max", type: "text", value: "1280px" },
      { label: "Espacement", type: "text", value: "24px" },
      { label: "Border radius", type: "text", value: "14px" },
    ],
  },
];

export default function ThemePage() {
  const [activePreview, setActivePreview] = React.useState("desktop");
  const [isDark, setIsDark] = React.useState(false);

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
              Thème
            </h1>
            <p className="mt-1 text-[15px] text-[var(--color-text-secondary)]">
              Personnalisez l'apparence de votre boutique
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" leftIcon={<RefreshCw className="w-4 h-4" strokeWidth={1.5} />}>
              Réinitialiser
            </Button>
            <Button leftIcon={<Check className="w-4 h-4" strokeWidth={1.5} />}>
              Appliquer
            </Button>
          </div>
        </motion.div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6">
          {/* Left - Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-4">
            {themeSettings.map((section, index) => (
              <Card key={index} hover={false}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 rounded-[var(--radius-md)] bg-[rgba(16,185,129,0.08)] flex items-center justify-center text-[var(--color-accent)]">
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="text-[17px] font-semibold text-[var(--color-text-primary)]">{section.title}</h3>
                    <p className="text-[12px] text-[var(--color-text-tertiary)]">{section.description}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {section.fields.map((field, fieldIndex) => (
                    <div key={fieldIndex} className="flex items-center justify-between gap-3">
                      <span className="text-[13px] font-medium text-[var(--color-text-secondary)]">{field.label}</span>
                      {field.type === "color" ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            defaultValue={field.value}
                            className="w-8 h-8 rounded-[var(--radius-sm)] border border-[var(--color-border)] cursor-pointer"
                          />
                          <span className="text-[13px] text-[var(--color-text-tertiary)] font-mono">{field.value}</span>
                        </div>
                      ) : (
                        <input
                          type="text"
                          defaultValue={field.value}
                          className="w-32 text-right rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] text-[13px] px-3 py-1.5 transition-all duration-[var(--duration-normal)] ease-[var(--ease-apple)] focus:outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(16,185,129,0.15)]"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            ))}

            {/* Dark mode toggle */}
            <Card hover={false}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-[var(--radius-md)] bg-[rgba(16,185,129,0.08)] flex items-center justify-center text-[var(--color-accent)]">
                    {isDark ? <Moon className="w-5 h-5" strokeWidth={1.5} /> : <Sun className="w-5 h-5" strokeWidth={1.5} />}
                  </div>
                  <div>
                    <h3 className="text-[17px] font-semibold text-[var(--color-text-primary)]">Mode sombre</h3>
                    <p className="text-[12px] text-[var(--color-text-tertiary)]">Activer le thème sombre</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsDark(!isDark)}
                  className={cn(
                    "relative w-12 h-7 rounded-full transition-colors duration-[var(--duration-normal)] ease-[var(--ease-apple)]",
                    isDark ? "bg-[var(--color-accent)]" : "bg-[var(--color-border)]"
                  )}
                >
                  <motion.div
                    className="absolute top-[3px] left-[3px] w-[22px] h-[22px] rounded-full bg-white shadow-[var(--shadow-sm)]"
                    animate={{ x: isDark ? 20 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
            </Card>
          </motion.div>

          {/* Right - Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-4"
          >
            {/* Preview Controls */}
            <Card hover={false} className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActivePreview("desktop")}
                  className={cn(
                    "w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center transition-colors",
                    activePreview === "desktop"
                      ? "bg-[var(--color-accent)] text-white"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]"
                  )}
                >
                  <Monitor className="w-4 h-4" strokeWidth={1.5} />
                </button>
                <button
                  onClick={() => setActivePreview("tablet")}
                  className={cn(
                    "w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center transition-colors",
                    activePreview === "tablet"
                      ? "bg-[var(--color-accent)] text-white"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]"
                  )}
                >
                  <MousePointer className="w-4 h-4" strokeWidth={1.5} />
                </button>
                <button
                  onClick={() => setActivePreview("mobile")}
                  className={cn(
                    "w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center transition-colors",
                    activePreview === "mobile"
                      ? "bg-[var(--color-accent)] text-white"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]"
                  )}
                >
                  <Smartphone className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
              <span className="text-[13px] text-[var(--color-text-secondary)]">
                Aperçu en temps réel
              </span>
            </Card>

            {/* Preview Frame */}
            <div className={cn(
              "relative rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden bg-[var(--color-bg-secondary)] transition-all duration-[var(--duration-normal)]",
              activePreview === "desktop" && "h-[600px]",
              activePreview === "tablet" && "h-[600px] max-w-[768px] mx-auto",
              activePreview === "mobile" && "h-[600px] max-w-[375px] mx-auto"
            )}>
              {/* Mock Store Preview */}
              <div className={cn(
                "h-full overflow-y-auto",
                isDark && "bg-[#1C1C1E]"
              )}>
                {/* Mock Header */}
                <div className={cn(
                  "px-6 py-4 flex items-center justify-between",
                  isDark ? "bg-[#2C2C2E]" : "bg-white"
                )}>
                  <span className={cn(
                    "font-semibold text-[17px]",
                    isDark ? "text-[#F5F5F7]" : "text-[#1D1D1F]"
                  )}>CarplayGO Store</span>
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "text-[13px]",
                      isDark ? "text-[#AEAEB2]" : "text-[#6E6E73]"
                    )}>Produits</span>
                    <span className={cn(
                      "text-[13px]",
                      isDark ? "text-[#AEAEB2]" : "text-[#6E6E73]"
                    )}>Contact</span>
                  </div>
                </div>

                {/* Mock Hero */}
                <div className={cn(
                  "px-6 py-12 text-center",
                  isDark ? "bg-[#1C1C1E]" : "bg-[#F5F5F7]"
                )}>
                  <h1 className={cn(
                    "text-[28px] font-semibold tracking-[-0.02em]",
                    isDark ? "text-[#F5F5F7]" : "text-[#1D1D1F]"
                  )}>
                    Mobilier ergonomique premium
                  </h1>
                  <p className={cn(
                    "mt-2 text-[15px]",
                    isDark ? "text-[#AEAEB2]" : "text-[#6E6E73]"
                  )}>
                    Confort et productivité au quotidien
                  </p>
                  <div className="mt-6 inline-flex px-5 py-2.5 rounded-[var(--radius-md)] text-white font-semibold text-[15px]"
                    style={{ backgroundColor: "#10B981" }}>
                    Découvrir
                  </div>
                </div>

                {/* Mock Products */}
                <div className="px-6 py-8">
                  <div className={cn(
                    "grid gap-4",
                    activePreview === "mobile" ? "grid-cols-1" : "grid-cols-2"
                  )}>
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={cn(
                          "rounded-[var(--radius-lg)] p-4",
                          isDark ? "bg-[#2C2C2E]" : "bg-white",
                          "border border-[var(--color-border-light)]"
                        )}>
                        <div className="aspect-square rounded-[var(--radius-md)] bg-[var(--color-bg-secondary)] flex items-center justify-center">
                          <ImageIcon className={cn(
                            "w-8 h-8",
                            isDark ? "text-[#6E6E73]" : "text-[#AEAEB2]"
                          )} strokeWidth={1.5} />
                        </div>
                        <p className={cn(
                          "mt-3 text-[15px] font-medium",
                          isDark ? "text-[#F5F5F7]" : "text-[#1D1D1F]"
                        )}>
                          Produit {i}
                        </p>
                        <p className="mt-1 text-[13px] text-[var(--color-accent)] font-semibold">
                          {(i * 100 + 99).toLocaleString("fr-FR")} €
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
}
