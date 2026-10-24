"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  Printer,
  Bike,
  Flame,
  ChefHat,
  PackageCheck,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { DemoOrder } from "@/types";
import { money } from "@/data/products";
import { RESTAURANT_LOCATIONS } from "@/data/locations";

export default function OrderConfirmationClient() {
  const searchParams = useSearchParams();
  const orderIdParam = searchParams.get("orderId");

  const [order] = useState<DemoOrder | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem("kfc_kodagu_last_order");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [activeStep, setActiveStep] = useState(1); // 1 = Received, 2 = In Fryer, 3 = Quality Check, 4 = Dispatched

  const orderId = orderIdParam || order?.orderId || "KFC-CRUNCH-DEMO";
  const orderType = order?.orderType || "delivery";

  const STEPS = [
    { label: "Order Received", desc: "Ticket printed in kitchen", icon: CheckCircle2 },
    { label: "Double-Crunch Fryer", desc: "Hand-dredged & fried hot", icon: Flame },
    { label: "Quality Check", desc: "Ventilated crunch box packing", icon: ChefHat },
    {
      label: orderType === "delivery" ? "Out for Delivery" : "Ready at Counter",
      desc: orderType === "delivery" ? "On route to your doorstep" : "Waiting at pickup counter",
      icon: orderType === "delivery" ? Bike : PackageCheck,
    },
  ];

  const advanceStep = () => {
    setActiveStep((prev) => (prev < 4 ? prev + 1 : 1));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-stone-50 py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Success Card Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xl text-center space-y-4 relative overflow-hidden">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600">
              SIMULATED DEMO ORDER CONFIRMED
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-stone-950 uppercase tracking-tight">
              That&apos;s A Wrap!
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
              Order Reference:{" "}
              <code className="font-mono font-black text-stone-900 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                {orderId}
              </code>
            </p>
          </div>

          {/* Demo disclaimer badge */}
          <div className="bg-amber-50 rounded-2xl p-3.5 border border-amber-200 text-xs text-amber-900 max-w-lg mx-auto flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Demo simulation only:</strong> No physical food will be cooked or dispatched, and
              no financial charges have occurred.
            </span>
          </div>
        </div>

        {/* Live Interactive Tracker Stepper */}
        <div className="bg-stone-950 text-white rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                Live Kitchen Tracker (Interactive Demo)
              </span>
              <h2 className="text-lg font-black text-white">Simulated Preparation Status</h2>
            </div>
            <button
              onClick={advanceStep}
              className="bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold px-3 py-1.5 rounded-lg border border-stone-700 transition-colors self-start sm:self-auto"
            >
              Advance Step Simulator ({activeStep}/4)
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STEPS.map((step, idx) => {
              const stepNumber = idx + 1;
              const isDone = stepNumber <= activeStep;
              const isCurrent = stepNumber === activeStep;
              const Icon = step.icon;

              return (
                <div
                  key={idx}
                  onClick={() => setActiveStep(stepNumber)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isCurrent
                      ? "bg-red-950/60 border-red-500 ring-1 ring-red-500"
                      : isDone
                      ? "bg-stone-900 border-emerald-500/50"
                      : "bg-stone-900/40 border-stone-800/80 opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        isCurrent
                          ? "bg-red-600 text-white animate-pulse"
                          : isDone
                          ? "bg-emerald-600 text-white"
                          : "bg-stone-800 text-stone-500"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-stone-400">0{stepNumber}</span>
                  </div>
                  <h3 className="text-xs font-black text-white leading-tight">{step.label}</h3>
                  <p className="text-[10px] text-stone-400 mt-1 leading-tight">{step.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-400 pt-2 border-t border-stone-900">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>
              Estimated delivery time: <strong>30–40 minutes</strong> from ticket creation
            </span>
          </div>
        </div>

        {/* Order Receipt Details */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div>
              <h2 className="text-lg font-black text-stone-900 uppercase tracking-tight">
                Itemized Order Receipt
              </h2>
              <p className="text-xs text-stone-500">
                Created: {order ? new Date(order.createdAt).toLocaleString("en-IN") : "Just now"}
              </p>
            </div>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 px-3 py-2 rounded-xl transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Receipt</span>
            </button>
          </div>

          {/* Delivery or Pickup summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-stone-50 p-4 rounded-2xl border border-stone-200/80">
            <div>
              <span className="font-bold text-stone-400 uppercase tracking-wider block mb-1">
                {orderType === "delivery" ? "Delivery Destination" : "Pickup Kitchen"}
              </span>
              {order?.deliveryDetails ? (
                <div className="space-y-0.5 text-stone-800">
                  <p className="font-black text-sm">{order.deliveryDetails.customerName}</p>
                  <p>{order.deliveryDetails.address}</p>
                  <p>
                    {order.deliveryDetails.city} — {order.deliveryDetails.pincode}
                  </p>
                  <p className="text-stone-500 font-mono">{order.deliveryDetails.customerPhone}</p>
                </div>
              ) : order?.pickupDetails ? (
                <div className="space-y-0.5 text-stone-800">
                  <p className="font-black text-sm">{order.pickupDetails.customerName}</p>
                  <p className="font-bold">
                    {RESTAURANT_LOCATIONS.find((l) => l.id === order.pickupDetails?.outletId)?.name ||
                      "Madikeri Flagship Kitchen"}
                  </p>
                  <p className="text-stone-500 font-mono">{order.pickupDetails.customerPhone}</p>
                </div>
              ) : (
                <div className="space-y-0.5 text-stone-800">
                  <p className="font-bold">Coorg Guest Diner</p>
                  <p>Madikeri Flagship Kitchen, Raja&apos;s Seat Road</p>
                </div>
              )}
            </div>

            <div>
              <span className="font-bold text-stone-400 uppercase tracking-wider block mb-1">
                Payment Simulation
              </span>
              <div className="space-y-0.5 text-stone-800">
                <p className="font-bold uppercase text-stone-900">
                  Method: {order?.paymentMethod.toUpperCase() || "COD (SIMULATED)"}
                </p>
                <p className="text-emerald-700 font-semibold">Payment Status: Simulated Verification OK</p>
                <p className="text-stone-500">Order ID: {orderId}</p>
              </div>
            </div>
          </div>

          {/* Items breakdown */}
          <div className="divide-y divide-stone-100">
            {order?.items && order.items.length > 0 ? (
              order.items.map((item) => (
                <div key={item.cartItemId} className="py-3 flex items-start justify-between text-xs">
                  <div>
                    <h3 className="font-bold text-stone-900 text-sm">
                      {item.quantity}× {item.product.name}
                    </h3>
                    <div className="text-[11px] text-stone-500">
                      {item.selectedSpice}
                      {item.selectedAddons.length > 0 &&
                        ` · +${item.selectedAddons.map((a) => a.name).join(", ")}`}
                    </div>
                  </div>
                  <span className="font-black text-stone-900">
                    {money(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))
            ) : (
              <div className="py-3 text-xs text-stone-500">
                Sample Coorg Crunch Bucket · 1× {money(549)}
              </div>
            )}
          </div>

          {/* Pricing Totals */}
          <div className="space-y-1.5 text-xs text-stone-600 pt-4 border-t border-stone-200">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-stone-900">{money(order?.subtotal || 549)}</span>
            </div>

            {order?.discount ? (
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Discount ({order.appliedCoupon?.code})</span>
                <span>−{money(order.discount)}</span>
              </div>
            ) : null}

            {orderType === "delivery" && (
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className={order?.deliveryFee === 0 ? "text-emerald-600 font-bold" : "text-stone-900"}>
                  {order?.deliveryFee === 0 ? "FREE" : money(order?.deliveryFee || 0)}
                </span>
              </div>
            )}

            <div className="flex justify-between">
              <span>GST (5%)</span>
              <span className="font-bold text-stone-900">{money(order?.taxAmount || 27)}</span>
            </div>

            <div className="pt-3 border-t border-stone-200 flex justify-between text-base sm:text-lg font-black text-stone-950">
              <span>Grand Total</span>
              <span className="text-red-600">{money(order?.total || 576)}</span>
            </div>
          </div>
        </div>

        {/* Back to menu CTA */}
        <div className="text-center pt-4">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 bg-stone-900 hover:bg-red-600 text-white font-black text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-2xl shadow-lg transition-all"
          >
            <span>Order Another Feast</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
