"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu as MenuIcon, X, Flame, ChevronRight, PhoneCall } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { money } from "@/data/products";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/offers", label: "Offers" },
  { href: "/about", label: "Our Story" },
  { href: "/locations", label: "Find Us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { itemCount, subtotal, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-200 ${
        isScrolled
          ? "bg-stone-900/95 backdrop-blur-md text-white shadow-lg border-b border-stone-800"
          : "bg-stone-950 text-white border-b border-stone-800/80"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand Mark */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-md shadow-red-900/40 border border-red-500/30 group-hover:scale-105 transition-transform">
              <span className="font-black text-xl tracking-tighter text-amber-300">K</span>
              <Flame className="w-4 h-4 text-amber-400 -ml-1 fill-amber-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight leading-none text-white flex items-center gap-1.5">
                KODAGU
                <span className="text-xs bg-red-600/80 text-amber-300 font-bold px-1.5 py-0.5 rounded tracking-widest uppercase">
                  COORG
                </span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-amber-400 uppercase leading-tight mt-0.5">
                Fried Chicken
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-bold tracking-wide transition-colors ${
                    isActive
                      ? "text-amber-400 bg-white/10"
                      : "text-stone-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Cart & Order CTA */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Quick Cart Button */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2.5 bg-stone-800 hover:bg-stone-700 text-white px-3.5 py-2.5 rounded-xl border border-stone-700/80 transition-all active:scale-95 group shadow-sm"
              aria-label="View Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-red-600 text-white font-extrabold text-[11px] min-w-5 h-5 px-1 rounded-full flex items-center justify-center border-2 border-stone-900 animate-pulse">
                    {itemCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-bold text-sm text-stone-200">
                {itemCount > 0 ? money(subtotal) : "Bag"}
              </span>
            </button>

            {/* Desktop Order Now Button */}
            <Link
              href="/menu"
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-sm px-5 py-2.5 rounded-xl shadow-md shadow-red-950/40 hover:shadow-red-900/60 transition-all active:scale-95 border border-red-500/30 uppercase tracking-wide"
            >
              Order Now
              <ChevronRight className="w-4 h-4" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-stone-300 hover:text-white p-2 rounded-lg bg-stone-800/80 border border-stone-700"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-20 bg-stone-950/98 backdrop-blur-xl border-b border-stone-800 p-5 shadow-2xl transition-all duration-300 animate-in slide-in-from-top-4">
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl font-bold text-base transition-colors ${
                    isActive
                      ? "bg-red-600/20 text-amber-400 border border-red-500/30"
                      : "text-stone-300 hover:bg-stone-900 hover:text-white"
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </Link>
              );
            })}

            <div className="pt-4 border-t border-stone-800 flex flex-col gap-3 mt-2">
              <Link
                href="/menu"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-red-600 hover:bg-red-500 text-white font-black py-3 rounded-xl shadow-lg shadow-red-950/50 uppercase tracking-wide text-sm flex items-center justify-center gap-2"
              >
                Start Your Order
                <ChevronRight className="w-4 h-4" />
              </Link>
              <div className="flex items-center justify-center gap-2 text-xs text-stone-400 pt-2">
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                <span>Call Center (Demo): +91 80 4120 8921</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
