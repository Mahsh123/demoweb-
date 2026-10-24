"use client";

import Image from "next/image";
import { Sparkles, Flame, ShieldCheck, Truck } from "lucide-react";
import { BRAND_PILLARS } from "@/data/brand";

export default function BrandPillars() {
  const getIcon = (name: string) => {
    switch (name) {
      case "Sparkles":
        return <Sparkles className="w-6 h-6 text-amber-500" />;
      case "Flame":
        return <Flame className="w-6 h-6 text-red-600" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
      case "Truck":
        return <Truck className="w-6 h-6 text-blue-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-amber-500" />;
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex justify-center mb-3">
            <div className="relative w-14 h-14 drop-shadow-md">
              <Image
                src="/images/brand/kfc-logo.png"
                alt="Kodagu Fried Chicken (KFC) Mascot Emblem"
                width={56}
                height={56}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-red-600 mb-2 block">
            THE KODAGU ADVANTAGE · KFC SIGNATURE STANDARDS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Why Kodagu Fried Chicken?
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2">
            We combined timeless hill-station spice wisdom with modern double-fry crunch engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {BRAND_PILLARS.map((pillar, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-red-500/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-stone-200 flex items-center justify-center mb-5">
                {getIcon(pillar.icon)}
              </div>
              <h3 className="text-lg font-black text-stone-900 mb-1">{pillar.title}</h3>
              <p className="text-xs font-bold text-red-600 uppercase tracking-wide mb-2">
                {pillar.tagline}
              </p>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
