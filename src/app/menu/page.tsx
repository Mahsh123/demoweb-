import { Suspense } from "react";
import MenuClient from "./MenuClient";

export const metadata = {
  title: "Full Menu | Kodagu Fried Chicken",
  description: "Browse our crispy chicken buckets, burgers, hot wings, tenders, combos, and sides.",
};

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-stone-50 flex items-center justify-center p-12">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">
              Loading Coorg Kitchen Menu...
            </p>
          </div>
        </div>
      }
    >
      <MenuClient />
    </Suspense>
  );
}
