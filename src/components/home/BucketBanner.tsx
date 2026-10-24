"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";

export default function BucketBanner() {
  const { addToCart } = useCart();
  const familyBucket = PRODUCTS.find((p) => p.id === "family-feast-bucket");

  const handleOrderFeast = () => {
    if (familyBucket) {
      addToCart(familyBucket, 1);
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-stone-950 text-white relative overflow-hidden border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-red-950 via-stone-900 to-stone-950 border border-stone-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Image Column */}
            <div className="lg:col-span-6 relative h-72 sm:h-96 lg:h-[460px] w-full">
              <Image
                src="/images/menu/bucket-promo.jpg"
                alt="Coorg Family Feast Chicken Bucket"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 lg:from-transparent via-transparent to-transparent" />

              <div className="absolute top-4 left-4 bg-amber-400 text-stone-950 font-black text-xs uppercase px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" /> Serves 4–5 People
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 space-y-5">
              <div className="inline-flex items-center gap-1.5 text-amber-400 font-extrabold text-xs uppercase tracking-widest">
                <Sparkles className="w-4 h-4" />
                <span>SIGNATURE SHARING MEAL</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight uppercase">
                Pass the bucket. <br />
                <span className="text-amber-400">Make it a moment.</span>
              </h2>

              <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-lg">
                12 pieces of whole-muscle crispy fried chicken, 2 crinkle-cut masala fries, 4 signature dipping sauces, and a large 1L beverage. Built for loud stories, family tables, and hands that keep reaching back in.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex flex-col">
                  <span className="text-xs text-stone-400">Feast Combo Price</span>
                  <span className="text-2xl sm:text-3xl font-black text-amber-400">₹899</span>
                </div>

                <button
                  onClick={handleOrderFeast}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-red-950/50 active:scale-95 transition-all"
                >
                  <span>Order Family Feast</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  href="/menu?category=buckets"
                  className="text-xs sm:text-sm font-bold text-stone-300 hover:text-white underline underline-offset-4"
                >
                  View All Buckets
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
