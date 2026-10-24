import HeroSection from "@/components/home/HeroSection";
import CategoryStrip from "@/components/home/CategoryStrip";
import FeaturedMeals from "@/components/home/FeaturedMeals";
import BucketBanner from "@/components/home/BucketBanner";
import DealsSection from "@/components/home/DealsSection";
import BrandPillars from "@/components/home/BrandPillars";
import StorySection from "@/components/home/StorySection";
import Testimonials from "@/components/home/Testimonials";
import Link from "next/link";
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. Bold, Image-Led Hero */}
      <HeroSection />

      {/* 2. Visual Category Navigation */}
      <CategoryStrip />

      {/* 3. Popular & Featured Meals */}
      <FeaturedMeals />

      {/* 4. Signature Buckets & Sharing Meals */}
      <BucketBanner />

      {/* 5. Special Promotional Deals & Coupons */}
      <DealsSection />

      {/* 6. Why Choose Us / Brand Values */}
      <BrandPillars />

      {/* 7. Our Story: From Kodagu Hills to Golden Crunch */}
      <StorySection />

      {/* 8. Verified Diner Reviews */}
      <Testimonials />

      {/* 9. Find Us Quick Strip */}
      <section className="py-14 sm:py-16 bg-stone-900 text-white border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-stone-950 p-8 sm:p-10 rounded-3xl border border-stone-800">
            <div className="space-y-3">
              <span className="text-xs font-black uppercase tracking-widest text-amber-400">
                VISIT OUR KITCHENS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Cravings in Madikeri, Bengaluru, or Mysuru?
              </h2>
              <div className="flex flex-wrap gap-4 text-xs text-stone-300 pt-1">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-red-500" /> 4 Outlets in Karnataka
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-red-500" /> Open 11:00 AM – 11:30 PM
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-red-500" /> +91 80 4120 8921 (Demo)
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/locations"
                className="bg-red-600 hover:bg-red-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-red-950/50 transition-all flex items-center gap-2"
              >
                <span>View All Outlets</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/menu"
                className="bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl border border-stone-700 transition-colors"
              >
                Order Online
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
