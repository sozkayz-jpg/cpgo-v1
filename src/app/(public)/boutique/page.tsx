import { Suspense } from "react";
import BoutiqueContent from "./boutique-content";

export default function BoutiquePage() {
  return (
    <Suspense>
      <BoutiqueContent />
    </Suspense>
  );
}
