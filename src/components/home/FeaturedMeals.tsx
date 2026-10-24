"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import ProductCard from "@/components/menu/ProductCard";
import ProductDetailModal from "@/components/menu/ProductDetailModal";
import { PRODUCTS } from "@/data/products";
import { Product, HeatLevel, ProductAddon } from "@/types";
import { useCart } from "@/context/CartContext";

export default function FeaturedMeals() {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Select 4 crowd favourites
  const featured = PRODUCTS.filter((p) =>
    ["coorg-crunch-bucket", "malnad-fire-burger", "black-pepper-wings", "burger-meal-combo"].includes(
      p.id
    )
  );

  const handleQuickAdd = (p: Product) => {
    addToCart(p, 1);
  };

  const handleCustomAdd = (
    product: Product,
    quantity: number,
    spice?: HeatLevel,
    addons?: ProductAddon[],
    instructions?: string
  ) => {
    addToCart(product, quantity, spice, addons, instructions);
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-red-600 font-extrabold text-xs uppercase tracking-widest mb-1.5">
              <Flame className="w-4 h-4 fill-red-600" />
              <span>THE CROWD FAVORITES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
              Bestsellers with Serious Crunch.
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              Handcrafted daily with real Coorg black pepper and double-dredged batter.
            </p>
          </div>

          <Link
            href="/menu"
            className="inline-flex items-center gap-1.5 text-stone-900 hover:text-red-600 font-black text-sm uppercase tracking-wider group"
          >
            <span>View All Menu Items</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={setSelectedProduct}
              onQuickAdd={handleQuickAdd}
            />
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleCustomAdd}
      />
    </section>
  );
}
