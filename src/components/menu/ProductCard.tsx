"use client";

import Image from "next/image";
import { Flame, Plus, Sparkles, Users } from "lucide-react";
import { Product } from "@/types";
import { money } from "@/data/products";

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export default function ProductCard({ product, onSelect, onQuickAdd }: ProductCardProps) {
  const hasCustomizations =
    (product.spiceOptions && product.spiceOptions.length > 1) ||
    (product.addons && product.addons.length > 0);

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-stone-200/90 hover:border-red-500/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Image Container */}
        <div
          onClick={() => onSelect(product)}
          className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-100 cursor-pointer"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.badge && (
              <span className="inline-flex items-center gap-1 bg-amber-400 text-stone-950 font-black text-[11px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                <Sparkles className="w-3 h-3" />
                {product.badge}
              </span>
            )}
            {product.isSpicy && (
              <span className="inline-flex items-center gap-1 bg-red-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                <Flame className="w-3 h-3 fill-white" /> Spicy
              </span>
            )}
            {product.isVeg && (
              <span className="inline-flex items-center gap-1 bg-emerald-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                Veg
              </span>
            )}
          </div>

          {/* Serves info pill */}
          {(product.serves || product.pieces) && (
            <div className="absolute bottom-2 right-2 bg-stone-900/85 backdrop-blur-sm text-stone-200 text-[11px] font-semibold px-2 py-1 rounded-lg flex items-center gap-1">
              <Users className="w-3 h-3 text-amber-400" />
              <span>{product.pieces || product.serves}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-2">
            <h3
              onClick={() => onSelect(product)}
              className="text-base sm:text-lg font-black text-stone-900 leading-snug group-hover:text-red-600 transition-colors cursor-pointer"
            >
              {product.name}
            </h3>
          </div>

          <p className="mt-2 text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Footer / Pricing & CTA */}
      <div className="p-4 sm:p-5 pt-0 mt-auto">
        <div className="flex items-center justify-between pt-3 border-t border-stone-100">
          <div>
            <span className="text-xs text-stone-400 font-medium block">Price</span>
            <span className="text-lg sm:text-xl font-black text-stone-950">
              {money(product.price)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {hasCustomizations ? (
              <button
                onClick={() => onSelect(product)}
                className="bg-stone-900 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider px-3.5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95"
              >
                Customize
              </button>
            ) : (
              <button
                onClick={() => onQuickAdd(product)}
                className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider px-3.5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center gap-1"
                aria-label={`Add ${product.name} to order`}
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
