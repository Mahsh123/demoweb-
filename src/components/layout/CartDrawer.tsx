"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Tag,
  Bike,
  Store,
  Info,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { money } from "@/data/products";

export default function CartDrawer() {
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
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const ok = applyCoupon(couponCode);
    if (ok) setCouponCode("");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside
          aria-label="Your Bag"
          className="w-screen max-w-md bg-stone-900 text-stone-100 flex flex-col shadow-2xl border-l border-stone-800"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center border border-red-500/30">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-black uppercase tracking-wide text-white">Your Bag</h2>
                <p className="text-xs text-stone-400">
                  {itemCount} {itemCount === 1 ? "item" : "items"} · Demo cart
                </p>
              </div>
            </div>
            <button
              onClick={closeCart}
              className="text-stone-400 hover:text-white p-2 rounded-lg bg-stone-800/80 hover:bg-stone-700 transition-colors"
              aria-label="Close Bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery / Pickup Toggle */}
          <div className="px-5 py-3 bg-stone-950/60 border-b border-stone-800">
            <div className="grid grid-cols-2 p-1 bg-stone-800/80 rounded-xl border border-stone-700/60">
              <button
                type="button"
                onClick={() => setOrderType("delivery")}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                  orderType === "delivery"
                    ? "bg-red-600 text-white shadow-md"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                <Bike className="w-3.5 h-3.5" />
                <span>Delivery (30-40m)</span>
              </button>
              <button
                type="button"
                onClick={() => setOrderType("pickup")}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                  orderType === "pickup"
                    ? "bg-red-600 text-white shadow-md"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>Takeaway (15m)</span>
              </button>
            </div>
          </div>

          {/* Content */}
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 rounded-2xl bg-stone-800/60 flex items-center justify-center mb-4 text-stone-500 border border-stone-700">
                <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
              </div>
              <h3 className="text-lg font-black text-white mb-1">Your bag is empty</h3>
              <p className="text-xs text-stone-400 max-w-xs mb-6">
                Add some crispy Coorg chicken buckets, fire burgers, or hot wings to begin your feast.
              </p>
              <Link
                href="/menu"
                onClick={closeCart}
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow-lg transition-transform active:scale-95"
              >
                Explore Full Menu
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto divide-y divide-stone-800/60 px-4 sm:px-5">
              {items.map((item) => (
                <div key={item.cartItemId} className="py-4 flex gap-3.5 group">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-stone-800 shrink-0 relative border border-stone-700/80">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-sm font-bold text-white truncate">{item.product.name}</h4>
                        <button
                          onClick={() => removeItem(item.cartItemId)}
                          className="text-stone-500 hover:text-red-400 p-1 rounded transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Customization details */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[11px] text-stone-400">
                        {item.selectedSpice && (
                          <span className="bg-stone-800 text-amber-300 px-1.5 py-0.5 rounded font-medium border border-stone-700">
                            {item.selectedSpice}
                          </span>
                        )}
                        {item.selectedAddons.map((addon) => (
                          <span
                            key={addon.id}
                            className="bg-stone-800/80 text-stone-300 px-1.5 py-0.5 rounded text-[10px]"
                          >
                            +{addon.name} ({money(addon.price)})
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2.5">
                      <div className="flex items-center border border-stone-700 bg-stone-800 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, -1)}
                          className="p-1.5 text-stone-300 hover:text-white hover:bg-stone-700 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, 1)}
                          className="p-1.5 text-stone-300 hover:text-white hover:bg-stone-700 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-sm font-black text-amber-400">
                        {money(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer / Checkout Actions */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-stone-800 bg-stone-950 space-y-3.5">
              {/* Coupon Bar */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-emerald-400" />
                    <div>
                      <span className="font-bold">{appliedCoupon.code}</span> applied!
                      <span className="text-emerald-400 block text-[10px]">
                        Saved {money(discount)} on this order
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-stone-400 hover:text-white font-bold text-xs uppercase px-2 py-1 bg-emerald-900/40 rounded hover:bg-emerald-800/60 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Coupon (e.g. WELCOME20)"
                        className="w-full bg-stone-900 border border-stone-800 text-white pl-8 pr-3 py-2 text-xs rounded-xl focus:outline-none focus:border-red-500 uppercase placeholder:normal-case placeholder:text-stone-500 font-mono font-bold"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 font-bold px-3.5 py-2 text-xs rounded-xl uppercase transition-colors shrink-0"
                    >
                      Apply
                    </button>
                  </form>
                  {couponError && (
                    <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                      <Info className="w-3 h-3" /> {couponError}
                    </p>
                  )}
                  {/* Suggested Coupon Quick Pill */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] text-stone-400">Available:</span>
                    <button
                      type="button"
                      onClick={() => applyCoupon("WELCOME20")}
                      className="text-[10px] font-bold text-amber-300 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded hover:bg-amber-400/20 transition-colors"
                    >
                      WELCOME20
                    </button>
                    <button
                      type="button"
                      onClick={() => applyCoupon("KODAGUCRUNCH")}
                      className="text-[10px] font-bold text-amber-300 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded hover:bg-amber-400/20 transition-colors"
                    >
                      KODAGUCRUNCH
                    </button>
                  </div>
                </div>
              )}

              {/* Subtotal & Totals */}
              <div className="space-y-1.5 text-xs text-stone-400 pt-2 border-t border-stone-800/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-stone-200 font-medium">{money(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>−{money(discount)}</span>
                  </div>
                )}
                {orderType === "delivery" && (
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className={deliveryFee === 0 ? "text-emerald-400 font-bold" : "text-stone-200"}>
                      {deliveryFee === 0 ? "FREE" : money(deliveryFee)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Restaurant GST (5%)</span>
                  <span className="text-stone-200 font-medium">{money(taxAmount)}</span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-stone-800">
                  <span>Total Amount</span>
                  <span className="text-amber-400">{money(total)}</span>
                </div>
              </div>

              {/* Proceed CTA */}
              <div className="space-y-2 pt-1">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black py-3.5 rounded-xl uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-950/60 active:scale-[0.98] transition-all"
                >
                  <span>Proceed to Demo Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center justify-between px-1">
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="text-xs text-stone-400 hover:text-white underline underline-offset-4"
                  >
                    View detailed bag
                  </Link>
                  <button
                    onClick={closeCart}
                    className="text-xs text-stone-400 hover:text-white"
                  >
                    Continue browsing
                  </button>
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
