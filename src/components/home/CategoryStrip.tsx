"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/data/categories";

export default function CategoryStrip() {
  return (
    <section className="py-14 sm:py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-red-600 font-extrabold text-xs uppercase tracking-widest mb-1.5">
              <span>EXPLORE BY CRAVING</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
              Pick Your Crunch.
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              From monster sharing buckets to fiery pepper burgers and wings.
            </p>
          </div>

          <Link
            href="/menu"
            className="inline-flex items-center gap-1.5 text-red-600 hover:text-red-700 font-black text-sm uppercase tracking-wider group"
          >
            <span>Browse Full Menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/menu?category=${category.slug}`}
              className="group relative bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-red-500/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Category Image */}
              <div className="relative h-36 sm:h-44 w-full bg-stone-100 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Arrow indicator */}
                <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-md group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Title & Tagline */}
              <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-sm sm:text-base text-stone-900 group-hover:text-red-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-stone-500 mt-1 line-clamp-1">
                    {category.tagline}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
