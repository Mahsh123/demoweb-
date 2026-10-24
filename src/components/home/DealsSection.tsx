"use client";

import { useState } from "react";
import Link from "next/link";
import { Tag, Check, Copy, ArrowRight, Sparkles } from "lucide-react";
import { COUPONS } from "@/data/offers";
import { useCart } from "@/context/CartContext";

export default function DealsSection() {
  const { applyCoupon, openCart } = useCart();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleApply = (code: string) => {
    applyCoupon(code);
    setCopiedCode(code);
    openCart();
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <section className="py-16 sm:py-24 bg-stone-100/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-red-600 font-extrabold text-xs uppercase tracking-widest mb-1.5">
              <Sparkles className="w-4 h-4" />
              <span>SPECIAL PROMOTIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
              A Little Extra For The Table.
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              Apply these sample coupon codes at checkout for immediate demo savings.
            </p>
          </div>

          <Link
            href="/offers"
            className="inline-flex items-center gap-1.5 text-stone-900 hover:text-red-600 font-black text-sm uppercase tracking-wider group"
          >
            <span>All Deals & Terms</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {COUPONS.map((coupon) => {
            const isCopied = copiedCode === coupon.code;
            return (
              <div
                key={coupon.code}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden"
              >
                {/* Top accent line */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-red-600 to-amber-500" />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-red-600 bg-red-50 border border-red-200/60 px-2.5 py-1 rounded-full">
                      {coupon.title}
                    </span>
                    <Tag className="w-4 h-4 text-stone-400" />
                  </div>

                  <div className="mb-2">
                    <div className="text-3xl sm:text-4xl font-black text-stone-950 tracking-tight">
                      {coupon.discountType === "percentage"
                        ? `${coupon.discountValue}%`
                        : coupon.discountType === "free_delivery"
                        ? "FREE"
                        : `₹${coupon.discountValue}`}
                      <span className="text-sm font-bold text-stone-500 ml-1">
                        {coupon.discountType === "free_delivery" ? "DELIVERY" : "OFF"}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {coupon.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-dashed border-stone-200">
                  <div className="flex items-center justify-between gap-2">
                    <code className="font-mono font-bold text-xs bg-stone-100 text-stone-900 px-2.5 py-1.5 rounded-lg border border-stone-200">
                      {coupon.code}
                    </code>

                    <button
                      onClick={() => handleApply(coupon.code)}
                      className={`text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                        isCopied
                          ? "bg-emerald-600 text-white"
                          : "bg-stone-900 hover:bg-red-600 text-white active:scale-95"
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Applied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Apply</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
