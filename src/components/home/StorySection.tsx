"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

export default function StorySection() {
  return (
    <section className="py-16 sm:py-24 bg-stone-950 text-white relative overflow-hidden border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-80 sm:h-[420px] rounded-3xl overflow-hidden shadow-2xl border-2 border-stone-800">
              <Image
                src="/images/menu/coorg-hills.jpg"
                alt="Kodagu Coorg Spices and Hills"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Madikeri, Coorg · 3,500 ft Above Sea Level
                </p>
                <p className="text-xs text-stone-300 mt-0.5">
                  Home of the world’s most aromatic Tellicherry & Malabar black pepper varieties.
                </p>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-amber-400 font-extrabold text-xs uppercase tracking-widest">
              <Compass className="w-4 h-4" />
              <span>OUR HERITAGE & CRAFT</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-tight">
              Coorg Flavour. <br />
              <span className="text-amber-400">City-Worthy Crunch.</span>
            </h2>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              Kodagu Fried Chicken was born out of a simple conviction: fast-food fried chicken was
              losing its soul to mass-produced salt and msg seasonings.
            </p>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              We took the robust culinary traditions of Coorg — fragrant cracked black pepper,
              curry leaf crunch, and bird&apos;s eye chili — and fused them with a 24-hour buttermilk brine
              and coarse flour dredge. The result is fried chicken that doesn&apos;t just crunch loudly,
              it leaves a lingering, unforgettable warmth.
            </p>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-black text-sm uppercase tracking-wider group"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
