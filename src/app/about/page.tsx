import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, Flame, ShieldCheck, Heart, Award } from "lucide-react";

export const metadata = {
  title: "Our Story | Kodagu Fried Chicken",
  description:
    "Discover the heritage of Kodagu Fried Chicken — how misty Coorg hills, estate black pepper, and double-crunch batter created an original fried chicken icon.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-50 py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ORIGIN & PHILOSOPHY</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-stone-950 uppercase tracking-tight leading-none">
            From The Mist of Kodagu <br />
            <span className="text-red-600">To The Golden Crunch.</span>
          </h1>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            We set out to create a fried chicken brand with genuine character — replacing generic,
            industrial flavorings with the rich, aromatic heat of Coorg estate spices.
          </p>
        </div>

        {/* Feature Hero Image */}
        <div className="relative h-72 sm:h-96 lg:h-[450px] rounded-3xl overflow-hidden shadow-2xl border-2 border-stone-200">
          <Image
            src="/images/menu/coorg-hills.jpg"
            alt="Misty hills of Kodagu Coorg Karnataka"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 1000px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white max-w-xl">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400 block mb-1">
              THE SPICE CAPITAL OF KARNATAKA
            </span>
            <p className="text-sm sm:text-base font-medium text-stone-200">
              Shaded by giant silver oak trees and nourished by monsoon rains, Kodagu produces the
              world’s most pungent and fragrant black pepper.
            </p>
          </div>
        </div>

        {/* Story Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4 text-stone-700 leading-relaxed text-sm sm:text-base">
            <h2 className="text-2xl sm:text-3xl font-black text-stone-950 uppercase tracking-tight">
              The Crunch That Started in Madikeri
            </h2>
            <p>
              Growing up in the Western Ghats, fried chicken was always a beloved treat — but the
              commercial offerings available in big cities all tasted identical: salty, heavily breaded,
              and lacking soul.
            </p>
            <p>
              In our experimental kitchen in Madikeri, we began infusing the 12-hour buttermilk brine
              with toasted estate black pepper, fresh ginger-garlic paste, and crushed curry leaves.
              The chicken absorbed the aromatics deep into the bone.
            </p>
            <p>
              When dropped into the double-dredged seasoned flour and flash-fried to golden amber,
              the result was unmistakable: a louder crunch on the outside, and an explosion of clean,
              peppery warmth on the inside.
            </p>
          </div>

          <div className="bg-stone-900 text-white p-8 rounded-3xl space-y-6 shadow-xl border border-stone-800">
            <h3 className="text-xl font-black text-amber-400 uppercase tracking-wide">
              The 4 Kitchen Commandments
            </h3>
            <ul className="space-y-4 text-xs sm:text-sm">
              <li className="flex items-start gap-3">
                <Flame className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Real Estate Spices</strong>
                  <span className="text-stone-400">
                    No artificial pepper essences. Only genuine coarse-cracked pepper from local Kodagu growers.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">100% Farm-Fresh Whole Cuts</strong>
                  <span className="text-stone-400">
                    Never frozen, no reconstituted chicken pastes. Only whole bone-in pieces and whole tenders.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">12-Hour Buttermilk Brine</strong>
                  <span className="text-stone-400">
                    Slow lactic acid tenderization locks in moisture and carries deep seasoning to the bone.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Cooked To Order</strong>
                  <span className="text-stone-400">
                    Nothing sits under drying heat lamps for hours. Every order is fried hot when the ticket prints.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Brand Promise Banner */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-3xl p-8 sm:p-12 text-center space-y-5 shadow-xl">
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
            Ready to Taste the Coorg Difference?
          </h2>
          <p className="text-sm sm:text-base text-red-100 max-w-xl mx-auto">
            Browse our signature buckets, burgers, and wings to experience authentic crunch in this demo.
          </p>
          <div className="pt-2">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 bg-stone-950 hover:bg-stone-900 text-amber-400 font-black text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg transition-transform active:scale-95"
            >
              <span>Explore The Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Demo Disclaimer */}
        <div className="text-center text-xs text-stone-500 pt-6">
          <p>
            * Note: Kodagu Fried Chicken is an original conceptual brand created for demonstration and portfolio
            showcase purposes. Mentioned history and culinary descriptions are illustrative creative writing.
          </p>
        </div>
      </div>
    </div>
  );
}
