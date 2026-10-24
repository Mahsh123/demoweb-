"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Tag,
  Bike,
  Store,
  Info,
  ShieldCheck,
  ChevronLeft,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { money } from "@/data/products";

export default function CartPage() {
  const {
    items,
    itemCount,
    subtotal,
    discount,
    deliveryFee,
    taxAmount,
    total,
    orderType,
    setOrderType,
    appliedCoupon,
    couponError,
    updateQuantity,
    removeItem,
    clearCart,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const ok = applyCoupon(couponCode);
    if (ok) setCouponCode("");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-stone-50 py-16 flex items-center justify-center">
        <div className="max-w-md w-full mx-4 text-center bg-white p-8 sm:p-12 rounded-3xl border border-stone-200 shadow-sm space-y-4">
          <div className="relative w-20 h-20 mx-auto drop-shadow-md">
            <Image
              src="/images/brand/kfc-logo.png"
              alt="Kodagu Fried Chicken Mascot"
              width={80}
              height={80}
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-2xl font-black text-stone-900 uppercase">Your Bag is Empty</h1>
          <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
            Looks like you haven&apos;t added any crunchy Coorg fried chicken to your feast yet.
          </p>
          <div className="pt-2">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-red-950/20 transition-all active:scale-95"
            >
              <span>Explore The Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top bar with back button & clear bag */}
        <div className="flex items-center justify-between">
          <Link
            href="/menu"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-stone-600 hover:text-stone-900 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>

          <button
            onClick={clearCart}
            className="text-xs font-bold text-red-600 hover:text-red-700 uppercase tracking-wider"
          >
            Clear Entire Bag
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items Column */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                <h1 className="text-xl sm:text-2xl font-black text-stone-950 uppercase tracking-tight">
                  Your Order Items ({itemCount})
                </h1>
                <span className="text-xs text-stone-400">Simulated Demo Bag</span>
              </div>

              {/* Items List */}
              <div className="divide-y divide-stone-100">
                {items.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-black text-stone-900 text-sm sm:text-base">
                          {item.product.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-500">
                          {item.selectedSpice && (
                            <span className="bg-stone-100 text-stone-800 font-semibold px-2 py-0.5 rounded-md">
                              {item.selectedSpice}
                            </span>
                          )}
                          {item.selectedAddons.map((a) => (
                            <span
                              key={a.id}
                              className="bg-amber-50 text-amber-900 text-[11px] font-medium px-2 py-0.5 rounded-md border border-amber-200/50"
                            >
                              +{a.name} ({money(a.price)})
                            </span>
                          ))}
                        </div>
                        {item.specialInstructions && (
                          <p className="text-[11px] text-stone-400 italic">
                            Note: {item.specialInstructions}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Stepper & Price */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                      <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 overflow-hidden shadow-sm">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, -1)}
                          className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-black text-stone-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, 1)}
                          className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right min-w-[80px]">
                        <span className="text-base font-black text-stone-950 block">
                          {money(item.unitPrice * item.quantity)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-[10px] text-stone-400">
                            {money(item.unitPrice)} each
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => removeItem(item.cartItemId)}
                        className="text-stone-400 hover:text-red-600 p-1.5 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Mode Toggle */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-3">
              <h3 className="text-sm font-black text-stone-900 uppercase tracking-wide">
                Select Ordering Preference
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setOrderType("delivery")}
                  className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                    orderType === "delivery"
                      ? "border-red-600 bg-red-50/50 shadow-sm ring-1 ring-red-600"
                      : "border-stone-200 hover:border-stone-300 bg-white"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      orderType === "delivery"
                        ? "bg-red-600 text-white"
                        : "bg-stone-100 text-stone-600"
                    }`}
                  >
                    <Bike className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-stone-900">Doorstep Hot Delivery</h4>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Estimated 30–40 mins · Ventilated crunch box
                    </p>
                    <span className="text-[11px] font-bold text-red-600 mt-1 block">
                      {subtotal >= 499 ? "FREE Delivery Applied" : "Standard ₹49 (Free above ₹499)"}
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderType("pickup")}
                  className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                    orderType === "pickup"
                      ? "border-red-600 bg-red-50/50 shadow-sm ring-1 ring-red-600"
                      : "border-stone-200 hover:border-stone-300 bg-white"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      orderType === "pickup"
                        ? "bg-red-600 text-white"
                        : "bg-stone-100 text-stone-600"
                    }`}
                  >
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-stone-900">Store Takeaway Pickup</h4>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Ready in 15–20 mins · Madikeri or Bengaluru
                    </p>
                    <span className="text-[11px] font-bold text-emerald-600 mt-1 block">
                      No delivery charges
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary & Coupon Column */}
          <div className="lg:col-span-4 space-y-4">
            {/* Coupon Card */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-red-600" />
                Apply Coupon Code
              </h3>

              {appliedCoupon ? (
                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-300 text-emerald-900 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-sm block">{appliedCoupon.code}</span>
                    <span className="text-emerald-700">
                      Savings of {money(discount)} applied
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-stone-500 hover:text-stone-900 font-bold uppercase text-[11px] px-2 py-1 bg-white rounded-lg shadow-sm"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="e.g. WELCOME20"
                      className="w-full text-xs font-mono font-bold uppercase p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-red-500"
                    />
                    <button
                      type="submit"
                      className="bg-stone-900 hover:bg-red-600 text-white font-bold text-xs uppercase px-4 rounded-xl transition-colors shrink-0"
                    >
                      Apply
                    </button>
                  </form>
                  {couponError && (
                    <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                      <Info className="w-3.5 h-3.5" />
                      {couponError}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-2.5 text-[11px]">
                    <span className="text-stone-400">Suggestions:</span>
                    <button
                      type="button"
                      onClick={() => applyCoupon("WELCOME20")}
                      className="font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded hover:bg-red-100"
                    >
                      WELCOME20
                    </button>
                    <button
                      type="button"
                      onClick={() => applyCoupon("KODAGUCRUNCH")}
                      className="font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded hover:bg-red-100"
                    >
                      KODAGUCRUNCH
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bill Details Card */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
              <h3 className="text-sm font-black text-stone-900 uppercase tracking-wide border-b border-stone-100 pb-3">
                Payment Summary
              </h3>

              <div className="space-y-2 text-xs sm:text-sm text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">{money(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>−{money(discount)}</span>
                  </div>
                )}

                {orderType === "delivery" && (
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className={deliveryFee === 0 ? "text-emerald-600 font-bold" : "text-stone-900"}>
                      {deliveryFee === 0 ? "FREE" : money(deliveryFee)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Restaurant GST (5%)</span>
                  <span className="font-semibold text-stone-900">{money(taxAmount)}</span>
                </div>

                <div className="pt-3 border-t border-stone-200 flex justify-between text-base sm:text-lg font-black text-stone-950">
                  <span>Grand Total</span>
                  <span className="text-red-600">{money(total)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-sm uppercase tracking-wider py-4 rounded-2xl shadow-xl shadow-red-950/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed to Simulated Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Demo note */}
              <div className="pt-2 flex items-center gap-2 text-[11px] text-stone-400">
                <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Simulation only. No real payment is required.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
