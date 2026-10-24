"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Tag, Check, Copy, Sparkles, ArrowRight, ShieldCheck, Flame, Percent } from "lucide-react";
import { COUPONS, PROMO_DEALS } from "@/data/offers";
import { useCart } from "@/context/CartContext";
import { money } from "@/data/products";

export default function OffersPage() {
  const { applyCoupon, openCart } = useCart();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleApply = (code: string) => {
    applyCoupon(code);
    setCopiedCode(code);
    openCart();
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <div className="min-h-screen bg-stone-50 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-red-950 via-red-900 to-stone-950 text-white rounded-3xl p-6 sm:p-12 border border-red-800 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-amber-400 text-stone-950 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DEMO SAVINGS & DISCOUNTS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-tight">
              A Little Extra For The Feast.
            </h1>
            <p className="text-sm sm:text-base text-red-100 leading-relaxed">
              Explore our sample meal bundles, coupon codes, and value deals. Every coupon code can be
              tested right now in the simulated cart.
            </p>
          </div>
        </div>

        {/* 1. Tested Active Coupons */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-red-600" />
            <h2 className="text-2xl font-black text-stone-900 uppercase tracking-tight">
              Available Coupon Codes
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COUPONS.map((coupon) => {
              const isCopied = copiedCode === coupon.code;
              return (
                <div
                  key={coupon.code}
                  className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-red-600 to-amber-500" />

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-black uppercase tracking-wider text-red-600 bg-red-50 border border-red-200/60 px-2 py-0.5 rounded-full">
                        {coupon.title}
                      </span>
                      <Percent className="w-4 h-4 text-stone-400" />
                    </div>

                    <div className="text-3xl font-black text-stone-950 mb-1">
                      {coupon.discountType === "percentage"
                        ? `${coupon.discountValue}% OFF`
                        : coupon.discountType === "free_delivery"
                        ? "FREE DELIVERY"
                        : `₹${coupon.discountValue} OFF`}
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed mb-4">
                      {coupon.description}
                    </p>
                    <p className="text-[11px] text-stone-400">
                      Min order: {money(coupon.minOrder)}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-dashed border-stone-200 flex items-center justify-between">
                    <code className="font-mono font-bold text-xs bg-stone-100 text-stone-900 px-2.5 py-1.5 rounded-lg border border-stone-200">
                      {coupon.code}
                    </code>
                    <button
                      onClick={() => handleApply(coupon.code)}
                      className={`text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                        isCopied
                          ? "bg-emerald-600 text-white"
                          : "bg-red-600 hover:bg-red-500 text-white active:scale-95 shadow-sm"
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
              );
            })}
          </div>
        </section>

        {/* 2. Curated Value Deals */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-red-600" />
            <h2 className="text-2xl font-black text-stone-900 uppercase tracking-tight">
              Featured Combo Deals
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROMO_DEALS.map((deal) => (
              <div
                key={deal.id}
                className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg transition-all flex flex-col sm:flex-row"
              >
                <div className="relative h-48 sm:h-auto sm:w-52 shrink-0 bg-stone-100">
                  <Image
                    src={deal.image}
                    alt={deal.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 250px"
                  />
                  <span className="absolute top-3 left-3 bg-red-600 text-white font-black text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {deal.badge}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-black text-stone-900">{deal.title}</h3>
                    <p className="text-xs text-stone-500 font-bold uppercase mt-0.5">
                      {deal.tagline}
                    </p>
                    <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                      {deal.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {deal.itemsIncluded.map((item, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-semibold bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md"
                        >
                          ✓ {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                    <div>
                      <span className="text-xs text-stone-400 line-through mr-2">
                        {money(deal.originalPrice)}
                      </span>
                      <span className="text-xl font-black text-red-600">
                        {money(deal.dealPrice)}
                      </span>
                    </div>

                    <Link
                      href={`/menu?category=${deal.targetCategory}`}
                      className="bg-stone-900 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-xl transition-colors inline-flex items-center gap-1"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Demo Disclaimer Box */}
        <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200/80 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 space-y-1">
            <h4 className="font-bold uppercase tracking-wider">Sample Promotions Policy</h4>
            <p>
              Coupons and combo discounts displayed on this page are for evaluation and demonstration
              only. No financial transaction or verified commercial contract is formed. To test the coupon
              logic, copy any code above and paste it into the shopping cart coupon input.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
