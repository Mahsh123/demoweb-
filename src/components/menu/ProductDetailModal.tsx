"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Flame, Plus, Minus, Check, Sparkles, MessageSquare } from "lucide-react";
import { Product, HeatLevel, ProductAddon } from "@/types";
import { money } from "@/data/products";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    quantity: number,
    spice?: HeatLevel,
    addons?: ProductAddon[],
    instructions?: string
  ) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSpice, setSelectedSpice] = useState<HeatLevel | undefined>(undefined);
  const [selectedAddons, setSelectedAddons] = useState<ProductAddon[]>([]);
  const [instructions, setInstructions] = useState("");

  if (!product) return null;

  const currentSpice = selectedSpice || (product.spiceOptions ? product.spiceOptions[0] : undefined);

  const toggleAddon = (addon: ProductAddon) => {
    setSelectedAddons((prev) => {
      const exists = prev.some((a) => a.id === addon.id);
      if (exists) {
        return prev.filter((a) => a.id !== addon.id);
      } else {
        return [...prev, addon];
      }
    });
  };

  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const unitPrice = product.price + addonsTotal;
  const totalPrice = unitPrice * quantity;

  const handleConfirm = () => {
    onAddToCart(product, quantity, currentSpice, selectedAddons, instructions);
    // Reset local states
    setQuantity(1);
    setSelectedSpice(undefined);
    setSelectedAddons([]);
    setInstructions("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200 my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-stone-900/80 hover:bg-stone-950 text-white p-2 rounded-full transition-colors backdrop-blur-sm"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1">
          {/* Header image banner */}
          <div className="relative h-64 sm:h-72 w-full bg-stone-900">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 700px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                {product.badge && (
                  <span className="inline-flex items-center gap-1 bg-amber-400 text-stone-950 font-black text-xs px-2.5 py-1 rounded-full uppercase tracking-wider mb-2">
                    <Sparkles className="w-3 h-3" />
                    {product.badge}
                  </span>
                )}
                <h2 className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-md">
                  {product.name}
                </h2>
              </div>
              <span className="text-2xl font-black text-amber-400 shrink-0">
                {money(product.price)}
              </span>
            </div>
          </div>

          <div className="p-5 sm:p-6 space-y-6">
            {/* Description & metadata */}
            <div>
              <p className="text-sm text-stone-600 leading-relaxed">{product.description}</p>
              <div className="flex flex-wrap gap-3 mt-3 text-xs font-semibold text-stone-500">
                {product.serves && (
                  <span className="bg-stone-100 px-2.5 py-1 rounded-lg">
                    Serves: {product.serves}
                  </span>
                )}
                {product.pieces && (
                  <span className="bg-stone-100 px-2.5 py-1 rounded-lg">
                    Pieces: {product.pieces}
                  </span>
                )}
                {product.calories && (
                  <span className="bg-stone-100 px-2.5 py-1 rounded-lg">
                    Energy: {product.calories}
                  </span>
                )}
              </div>
            </div>

            {/* Heat / Spice Level Selector */}
            {product.spiceOptions && product.spiceOptions.length > 0 && (
              <div className="pt-4 border-t border-stone-100">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-black text-stone-900 uppercase tracking-wide flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-red-600" />
                    Select Heat Level
                  </label>
                  <span className="text-xs text-stone-400">Required</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {product.spiceOptions.map((spice) => {
                    const isSelected = currentSpice === spice;
                    return (
                      <button
                        key={spice}
                        type="button"
                        onClick={() => setSelectedSpice(spice)}
                        className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                          isSelected
                            ? "border-red-600 bg-red-50 text-red-950 font-bold shadow-sm ring-1 ring-red-600"
                            : "border-stone-200 hover:border-stone-300 text-stone-700 bg-white"
                        }`}
                      >
                        <span className="text-xs font-bold">{spice}</span>
                        {isSelected && <Check className="w-4 h-4 text-red-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Add-ons */}
            {product.addons && product.addons.length > 0 && (
              <div className="pt-4 border-t border-stone-100">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-black text-stone-900 uppercase tracking-wide">
                    Add Extra Crunch & Dips
                  </label>
                  <span className="text-xs text-stone-400">Optional</span>
                </div>

                <div className="space-y-2">
                  {product.addons.map((addon) => {
                    const isChecked = selectedAddons.some((a) => a.id === addon.id);
                    return (
                      <label
                        key={addon.id}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                          isChecked
                            ? "border-amber-500 bg-amber-50/60 font-semibold"
                            : "border-stone-200 hover:border-stone-300 bg-white text-stone-700"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleAddon(addon)}
                            className="w-4 h-4 rounded text-red-600 focus:ring-red-500 accent-red-600"
                          />
                          <span className="text-xs sm:text-sm">{addon.name}</span>
                        </div>
                        <span className="text-xs font-bold text-stone-900">
                          +{money(addon.price)}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Special Instructions */}
            <div className="pt-4 border-t border-stone-100">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wide flex items-center gap-1.5 mb-2">
                <MessageSquare className="w-3.5 h-3.5 text-stone-400" />
                Special Kitchen Instructions (Optional)
              </label>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="e.g. Keep dips separate, extra crispy, no pickles..."
                rows={2}
                maxLength={120}
                className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 placeholder:text-stone-400"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer / Quantity & CTA */}
        <div className="p-4 sm:p-5 border-t border-stone-100 bg-stone-50 flex items-center justify-between gap-4">
          {/* Quantity selector */}
          <div className="flex items-center border border-stone-300 bg-white rounded-xl overflow-hidden shadow-sm">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="p-2 sm:p-2.5 text-stone-600 hover:text-stone-950 hover:bg-stone-100 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-3.5 text-sm font-black text-stone-900">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="p-2 sm:p-2.5 text-stone-600 hover:text-stone-950 hover:bg-stone-100 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to order CTA */}
          <button
            onClick={handleConfirm}
            className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black py-3.5 px-6 rounded-xl uppercase tracking-wider text-xs sm:text-sm flex items-center justify-between shadow-lg shadow-red-950/20 active:scale-[0.98] transition-all"
          >
            <span>Add to Bag</span>
            <span>{money(totalPrice)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
