"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/layout/admin-layout";
import { SEOScore } from "@/components/dashboard/seo-score";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, AlertCircle, CheckCircle } from "lucide-react";

const seoPages = [
  { path: "/", title: "Page d'accueil", score: 92, issues: 2 },
  { path: "/produits", title: "Catalogue produits", score: 78, issues: 8 },
  { path: "/produit/chaise-ergonomique", title: "Chaise ergonomique", score: 85, issues: 5 },
  { path: "/produit/bureau-standing", title: "Bureau standing", score: 72, issues: 12 },
  { path: "/blog/guide-ergonomie", title: "Guide ergonomie", score: 88, issues: 3 },
  { path: "/contact", title: "Contact", score: 65, issues: 15 },
  { path: "/a-propos", title: "À propos", score: 70, issues: 10 },
  { path: "/faq", title: "FAQ", score: 80, issues: 6 },
];

const globalScore = Math.round(
  seoPages.reduce((acc, page) => acc + page.score, 0) / seoPages.length
);

function getScoreVariant(score: number): "accent" | "warning" | "destructive" | "default" {
  if (score >= 80) return "accent";
  if (score >= 60) return "default";
  if (score >= 40) return "warning";
  return "destructive";
}

export default function SEOPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]">
            Optimisation SEO
          </h1>
          <p className="mt-1 text-[15px] text-[var(--color-text-secondary)]">
            Analyse et optimisation du référencement naturel de votre site
          </p>
        </motion.div>

        {/* Global Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col items-center py-10"
        >
          <SEOScore score={globalScore} size="lg" label="Score SEO global" />

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] bg-[var(--color-bg-secondary)]">
              <CheckCircle className="w-4 h-4 text-[var(--color-accent)]" strokeWidth={1.5} />
              <span className="text-[13px] font-medium text-[var(--color-text-secondary)]">{seoPages.filter(p => p.score >= 80).length} pages optimisées</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] bg-[var(--color-bg-secondary)]">
              <AlertCircle className="w-4 h-4 text-[var(--color-warning)]" strokeWidth={1.5} />
              <span className="text-[13px] font-medium text-[var(--color-text-secondary)]">{seoPages.filter(p => p.score < 60).length} pages à améliorer</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] bg-[var(--color-bg-secondary)]">
              <FileText className="w-4 h-4 text-[var(--color-info)]" strokeWidth={1.5} />
              <span className="text-[13px] font-medium text-[var(--color-text-secondary)]">{seoPages.length} pages analysées</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] bg-[var(--color-bg-secondary)]">
              <Search className="w-4 h-4 text-[var(--color-text-tertiary)]" strokeWidth={1.5} />
              <span className="text-[13px] font-medium text-[var(--color-text-secondary)]">{seoPages.reduce((acc, p) => acc + p.issues, 0)} problèmes</span>
            </div>
          </div>
        </motion.div>

        {/* Pages Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-[var(--color-text-primary)] mb-4">
            Score par page
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {seoPages.map((page, index) => (
              <motion.div
                key={page.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * index, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Card hover className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-[15px] font-semibold text-[var(--color-text-primary)] truncate">
                        {page.title}
                      </p>
                      <p className="text-[13px] text-[var(--color-text-tertiary)] truncate">
                        {page.path}
                      </p>
                    </div>
                    <div className="ml-4 shrink-0">
                      <SEOScore score={page.score} size="sm" showLabel={false} />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <Badge variant={getScoreVariant(page.score)}>
                      {page.score >= 80 ? "Excellent" : page.score >= 60 ? "Bon" : page.score >= 40 ? "Moyen" : "Critique"}
                    </Badge>
                    <span className="text-[13px] text-[var(--color-text-secondary)]">
                      {page.issues} problème{page.issues > 1 ? "s" : ""}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
