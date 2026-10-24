"use client";

import Link from "next/link";
import { Flame, MapPin, Phone, Clock, Mail, ShieldAlert, Heart } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
      {/* Demo Notice Banner */}
      <div className="bg-amber-400/10 border-b border-amber-400/20 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs sm:text-sm text-amber-300 text-center font-medium">
          <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400" />
          <span>
            <strong>Demo Experience:</strong> Kodagu Fried Chicken is a presentation restaurant concept. All orders,
            pricing, and store locations are simulated for demonstration purposes.
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-md">
                <span className="font-black text-xl text-amber-300">K</span>
                <Flame className="w-4 h-4 text-amber-400 -ml-1 fill-amber-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                  KODAGU
                  <span className="text-[10px] bg-red-600/80 text-amber-300 font-bold px-1.5 py-0.5 rounded tracking-widest">
                    COORG
                  </span>
                </span>
                <span className="text-[10px] font-bold tracking-[0.25em] text-amber-400 uppercase">
                  Fried Chicken
                </span>
              </div>
            </Link>

            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              Crispy by nature, bold by flavour. Fresh farm chicken steeped in estate black pepper, wild herbs, and
              our 12-hour buttermilk dredge from the misty hills of Kodagu.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                Join the Crunch Club
              </span>
              {subscribed ? (
                <div className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs py-2.5 px-3 rounded-lg">
                  ✓ Welcome to the club! Sample promo code: <strong>KODAGUCRUNCH</strong>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="bg-stone-900 border border-stone-800 text-white px-3.5 py-2 text-xs rounded-lg focus:outline-none focus:border-red-500 flex-1 placeholder:text-stone-500"
                  />
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-500 text-white font-bold px-3.5 py-2 text-xs rounded-lg uppercase tracking-wider transition-colors shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 mb-4">
              Explore Menu
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <Link href="/menu?category=buckets" className="hover:text-white transition-colors">
                  Chicken Buckets
                </Link>
              </li>
              <li>
                <Link href="/menu?category=burgers" className="hover:text-white transition-colors">
                  Crispy Burgers
                </Link>
              </li>
              <li>
                <Link href="/menu?category=wings" className="hover:text-white transition-colors">
                  Coorg Pepper Wings
                </Link>
              </li>
              <li>
                <Link href="/menu?category=strips" className="hover:text-white transition-colors">
                  Strips & Tenders
                </Link>
              </li>
              <li>
                <Link href="/menu?category=combos" className="hover:text-white transition-colors">
                  Sharing Meals
                </Link>
              </li>
              <li>
                <Link href="/offers" className="text-red-400 font-bold hover:text-red-300 transition-colors">
                  Current Deals & Coupons
                </Link>
              </li>
            </ul>
          </div>

          {/* Brand & Support */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Our Coorg Story
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-white transition-colors">
                  Outlets & Hours
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white transition-colors">
                  Shopping Bag
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-white transition-colors">
                  Simulated Checkout
                </Link>
              </li>
              <li>
                <span className="text-stone-500 cursor-not-allowed">
                  Franchise Inquiries (Demo)
                </span>
              </li>
            </ul>
          </div>

          {/* Outlets & Contact */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 mb-4">
              Flagship Kitchen
            </h4>
            <div className="space-y-3 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>
                  Hill View Arcade, Raja&apos;s Seat Road, Madikeri, Kodagu — 571201
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <span>+91 80 4120 8921 (Demo line)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-red-500 shrink-0" />
                <span>11:00 AM – 11:30 PM Everyday</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <span>hello@kodagufriedchicken.demo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Kodagu Fried Chicken. All demo rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Demo Terms</span>
            <span>Privacy Policy</span>
            <span>Refund Policy</span>
            <span className="flex items-center gap-1 text-stone-400">
              Crafted with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for Coorg Crunch
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
