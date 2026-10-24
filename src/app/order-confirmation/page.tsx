import { Suspense } from "react";
import OrderConfirmationClient from "./OrderConfirmationClient";

export const metadata = {
  title: "Order Confirmed | Kodagu Fried Chicken",
  description: "Your simulated demonstration order has been received. Track kitchen progress and view receipt.",
};

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-stone-50 flex items-center justify-center p-12">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">
              Loading Order Confirmation...
            </p>
          </div>
        </div>
      }
    >
      <OrderConfirmationClient />
    </Suspense>
  );
}
