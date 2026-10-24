"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Sparkles, Utensils, RotateCcw } from "lucide-react";
import MenuFilterBar from "@/components/menu/MenuFilterBar";
import ProductCard from "@/components/menu/ProductCard";
import ProductDetailModal from "@/components/menu/ProductDetailModal";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { Product, HeatLevel, ProductAddon } from "@/types";
import { useCart } from "@/context/CartContext";

export default function MenuClient() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const { addToCart } = useCart();
  const [internalCategory, setInternalCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSpicyOnly, setIsSpicyOnly] = useState(false);
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [sortBy, setSortBy] = useState("popular");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Active category: if valid param present, prefer it, otherwise use internal selection
  const activeCategory = useMemo(() => {
    if (categoryParam && CATEGORIES.some((c) => c.slug === categoryParam)) {
      return categoryParam;
    }
    return internalCategory;
  }, [categoryParam, internalCategory]);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (activeCategory !== "all" && product.category !== activeCategory) {
        return false;
      }

      // Spicy filter
      if (isSpicyOnly && !product.isSpicy) {
        return false;
      }

      // Veg filter
      if (isVegOnly && !product.isVeg) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCategory) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0; // Default order
    });
  }, [activeCategory, isSpicyOnly, isVegOnly, searchQuery, sortBy]);

  const handleQuickAdd = (product: Product) => {
    addToCart(product, 1);
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

  const handleResetFilters = () => {
    setInternalCategory("all");
    setSearchQuery("");
    setIsSpicyOnly(false);
    setIsVegOnly(false);
    setSortBy("popular");
  };

  const currentCategoryInfo = CATEGORIES.find((c) => c.slug === activeCategory);

  return (
    <div className="min-h-screen bg-stone-50 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Menu Page Heading */}
        <div className="bg-stone-950 text-white rounded-3xl p-6 sm:p-10 border border-stone-800 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AUTHENTIC COORG KITCHEN MENU · KODAGU FRIED CHICKEN</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              {currentCategoryInfo ? currentCategoryInfo.name : "Our Complete Menu"}
            </h1>
            <p className="text-xs sm:text-sm text-stone-300">
              {currentCategoryInfo
                ? currentCategoryInfo.tagline
                : "Hand-breaded crispy chicken buckets, fiery burgers, pepper wings, combos and dips. Sample demo menu with illustrative pricing."}
            </p>
          </div>

          <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 drop-shadow-xl z-10 hidden sm:block">
            <Image
              src="/images/brand/kfc-logo.png"
              alt="Kodagu Fried Chicken (KFC) Official Mascot"
              width={96}
              height={96}
              priority
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Filter & Search Bar */}
        <MenuFilterBar
          activeCategory={activeCategory}
          onSelectCategory={setInternalCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isSpicyOnly={isSpicyOnly}
          onToggleSpicy={() => setIsSpicyOnly(!isSpicyOnly)}
          isVegOnly={isVegOnly}
          onToggleVeg={() => setIsVegOnly(!isVegOnly)}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Product Count & Active Filters Indicator */}
        <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-200">
          <span>
            Showing <strong className="text-stone-900">{filteredProducts.length}</strong> items
            {activeCategory !== "all" && ` in ${currentCategoryInfo?.name}`}
          </span>
          {(searchQuery || isSpicyOnly || isVegOnly || activeCategory !== "all") && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 font-bold"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={setSelectedProduct}
                onQuickAdd={handleQuickAdd}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 shadow-sm max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 mx-auto flex items-center justify-center">
              <Utensils className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-black text-stone-900">No crunch found</h3>
            <p className="text-xs text-stone-500">
              We couldn&apos;t find any items matching your selected criteria or search term &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              onClick={handleResetFilters}
              className="bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleCustomAdd}
      />
    </div>
  );
}
