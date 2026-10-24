"use client";

import { Search, X, Flame, Leaf, SlidersHorizontal } from "lucide-react";
import { CategoryInfo } from "@/types";
import { CATEGORIES } from "@/data/categories";

interface MenuFilterBarProps {
  activeCategory: string; // "all" or CategorySlug
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isSpicyOnly: boolean;
  onToggleSpicy: () => void;
  isVegOnly: boolean;
  onToggleVeg: () => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function MenuFilterBar({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  isSpicyOnly,
  onToggleSpicy,
  isVegOnly,
  onToggleVeg,
  sortBy,
  onSortChange,
}: MenuFilterBarProps) {
  return (
    <div className="space-y-4">
      {/* Search and Secondary Controls */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search chicken buckets, burgers, wings, combos..."
            className="w-full bg-white border border-stone-200 text-stone-900 pl-10 pr-9 py-2.5 text-sm rounded-xl focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 shadow-sm placeholder:text-stone-400"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-3 text-stone-400 hover:text-stone-700"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Spicy filter */}
          <button
            onClick={onToggleSpicy}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
              isSpicyOnly
                ? "bg-red-600 border-red-600 text-white shadow-sm"
                : "bg-white border-stone-200 text-stone-700 hover:border-stone-300"
            }`}
          >
            <Flame className={`w-3.5 h-3.5 ${isSpicyOnly ? "fill-white" : "text-red-500"}`} />
            <span>Spicy Only</span>
          </button>

          {/* Veg filter */}
          <button
            onClick={onToggleVeg}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
              isVegOnly
                ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
                : "bg-white border-stone-200 text-stone-700 hover:border-stone-300"
            }`}
          >
            <Leaf className={`w-3.5 h-3.5 ${isVegOnly ? "fill-white" : "text-emerald-600"}`} />
            <span>Veg / Drinks</span>
          </button>

          {/* Sort dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none bg-white border border-stone-200 text-stone-700 text-xs font-bold pl-3 pr-8 py-2 rounded-xl focus:outline-none focus:border-red-500 cursor-pointer shadow-sm"
            >
              <option value="popular">Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Horizontal Category Nav Pills */}
      <div className="relative">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
          <button
            onClick={() => onSelectCategory("all")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider whitespace-nowrap transition-all shadow-sm ${
              activeCategory === "all"
                ? "bg-stone-950 text-amber-400 ring-2 ring-stone-950"
                : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
            }`}
          >
            All Items
          </button>

          {CATEGORIES.map((cat: CategoryInfo) => {
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => onSelectCategory(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all shadow-sm flex items-center gap-1.5 ${
                  isActive
                    ? "bg-red-600 text-white shadow-md ring-2 ring-red-600"
                    : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
                }`}
              >
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
