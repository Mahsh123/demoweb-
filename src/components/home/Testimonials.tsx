"use client";

import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data/brand";

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-red-600 mb-2 block">
            HEAR THE CRUNCH
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Loved Across Karnataka.
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            Real feedback from diners who crave genuine hill-station spice over mass-market chicken.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-stone-200 mb-2" />
                <p className="text-stone-700 text-sm leading-relaxed italic mb-6">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">{t.author}</h4>
                  <p className="text-xs text-stone-500">{t.location}</p>
                </div>
                <span className="text-[10px] bg-red-50 text-red-700 font-bold px-2 py-0.5 rounded-full uppercase">
                  Verified Diner
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
