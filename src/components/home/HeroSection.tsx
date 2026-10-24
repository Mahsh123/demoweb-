"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Clock,
  Volume2,
  VolumeX,
  Play,
  Pause,
} from "lucide-react";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleSound = () => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="relative bg-stone-950 text-white overflow-hidden border-b border-stone-800">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Copy Column */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 z-10">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2.5 bg-stone-900 border border-stone-800 px-3.5 py-1.5 rounded-full shadow-inner">
              <div className="relative w-5 h-5 shrink-0">
                <Image
                  src="/images/brand/kfc-logo.png"
                  alt="Kodagu Fried Chicken Mascot"
                  width={20}
                  height={20}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs font-black tracking-widest text-amber-300 uppercase">
                Kodagu Fried Chicken · Original Coorg Heritage
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] text-white uppercase">
              Crispy by Nature. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-amber-300">
                Bold by Flavour.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg lg:text-xl text-stone-300 max-w-xl leading-relaxed">
              Big crunch. Bold flavour. Chicken cravings, sorted. Hand-dredged Karnataka farm chicken
              seasoned with roasted estate black pepper and wild Coorg spices.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link
                href="/menu"
                className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-sm sm:text-base px-8 py-4 rounded-2xl shadow-xl shadow-red-950/60 hover:shadow-red-900/80 transition-all uppercase tracking-wider active:scale-[0.98] group"
              >
                <span>Order Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/menu"
                className="inline-flex items-center justify-center gap-2 bg-stone-900/90 hover:bg-stone-800 text-stone-200 hover:text-white font-bold text-sm sm:text-base px-7 py-4 rounded-2xl border border-stone-800 transition-all uppercase tracking-wider active:scale-[0.98]"
              >
                <span>Explore Menu</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-stone-800/80 max-w-lg">
              <div className="flex items-center gap-2 text-stone-300">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-bold leading-tight">Coorg Estate Pepper</span>
              </div>
              <div className="flex items-center gap-2 text-stone-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-bold leading-tight">100% Fresh Cuts</span>
              </div>
              <div className="flex items-center gap-2 text-stone-300">
                <Clock className="w-4 h-4 text-red-400 shrink-0" />
                <span className="text-xs font-bold leading-tight">30-Min Hot Delivery</span>
              </div>
            </div>
          </div>

          {/* Media Column (Video Showcase Frame with Mascot Seal) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Official Mascot Brand Seal Badge */}
              <div className="absolute -top-5 -left-3 sm:-top-6 sm:-left-6 z-20 flex items-center gap-3 bg-stone-900/95 backdrop-blur-md p-2 sm:p-2.5 pr-4 rounded-full border-2 border-amber-400/50 shadow-2xl">
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 drop-shadow">
                  <Image
                    src="/images/brand/kfc-logo.png"
                    alt="Kodagu Fried Chicken (KFC) Official Mascot"
                    width={56}
                    height={56}
                    priority
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 leading-tight">
                    Original Mascot
                  </span>
                  <span className="text-xs sm:text-sm font-black text-white leading-tight">
                    Kodagu Fried Chicken
                  </span>
                </div>
              </div>

              {/* Video Frame */}
              <div className="relative h-96 sm:h-[460px] lg:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-stone-800/80 bg-stone-900 group">
                <video
                  ref={videoRef}
                  src="/videos/hero-crunch.mp4"
                  poster="/images/menu/hero-chicken.jpg"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-transparent to-black/30 pointer-events-none" />

                {/* Floating Media Controls */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                  <button
                    onClick={toggleSound}
                    className="bg-black/60 hover:bg-black/85 text-white p-2 rounded-full backdrop-blur-md border border-white/15 transition-all shadow-lg active:scale-95"
                    aria-label={isMuted ? "Unmute sizzle audio" : "Mute sizzle audio"}
                    title={isMuted ? "Unmute audio" : "Mute audio"}
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-emerald-400" />
                    )}
                  </button>
                  <button
                    onClick={togglePlay}
                    className="bg-black/60 hover:bg-black/85 text-white p-2 rounded-full backdrop-blur-md border border-white/15 transition-all shadow-lg active:scale-95"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                    title={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 text-stone-200" />
                    ) : (
                      <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
                    )}
                  </button>
                </div>

                {/* Floating promo card */}
                <div className="absolute bottom-4 left-4 right-4 bg-stone-900/90 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-stone-700/80 flex items-center justify-between shadow-xl z-10">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-400 block">
                      Signature Crunch
                    </span>
                    <h3 className="text-sm sm:text-base font-black text-white">Coorg Crunch Bucket</h3>
                    <p className="text-xs text-stone-400">8 pcs hand-breaded chicken · ₹549</p>
                  </div>
                  <Link
                    href="/menu?category=buckets"
                    className="bg-red-600 hover:bg-red-500 text-white font-black text-xs px-3.5 py-2 rounded-xl uppercase tracking-wider transition-colors shrink-0"
                  >
                    Taste It
                  </Link>
                </div>
              </div>

              {/* Decorative Accent Ribbon */}
              <div className="absolute -bottom-3 -right-3 bg-amber-400 text-stone-950 font-black text-xs uppercase px-3.5 py-1.5 rounded-full shadow-lg rotate-[-4deg] tracking-wider border-2 border-stone-950 hidden sm:block z-20">
                Sizzling Double Crunch
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
