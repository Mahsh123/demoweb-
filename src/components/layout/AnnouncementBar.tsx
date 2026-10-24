"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, X, ArrowRight } from "lucide-react";

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside aria-label="Special Offers" className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 text-white text-xs sm:text-sm py-2 px-4 border-b border-red-700/50 relative z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 mx-auto text-center font-medium">
          <span className="hidden sm:inline-flex items-center gap-1 bg-amber-400 text-red-950 font-bold px-2 py-0.5 rounded-full text-[11px] tracking-wide uppercase">
            <Sparkles className="w-3 h-3" /> Special Deal
          </span>
          <span>
            Coorg Pepper Festival: Flat <strong className="text-amber-300 font-bold">₹150 OFF</strong> with code{" "}
            <code className="bg-black/40 text-amber-300 px-1.5 py-0.5 rounded font-mono font-bold tracking-wider">
              KODAGUCRUNCH
            </code>{" "}
            · Free delivery above ₹499
          </span>
          <Link
            href="/offers"
            className="inline-flex items-center gap-1 text-amber-300 hover:text-white underline underline-offset-2 ml-1 text-xs font-semibold group"
          >
            View Offers
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="text-white/70 hover:text-white p-1 rounded-md transition-colors -mr-1"
          aria-label="Dismiss promotional message"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
