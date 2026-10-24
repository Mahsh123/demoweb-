"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
  Navigation,
  Send,
  Sparkles,
  ShieldAlert,
} from "lucide-react";
import { RESTAURANT_LOCATIONS } from "@/data/locations";

export default function LocationsPage() {
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    outlet: "madikeri-flagship",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFeedbackSent(true);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>KITCHENS & DELIVERY ZONES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-stone-950 uppercase tracking-tight">
            Find A Kodagu Kitchen.
          </h1>
          <p className="text-sm sm:text-base text-stone-600">
            Freshly frying in Madikeri, Bengaluru, and Mysuru. Curbside pickup and rapid delivery available.
          </p>
        </div>

        {/* Demo Notice */}
        <div className="bg-amber-50 rounded-2xl p-4 sm:p-5 border border-amber-200 flex items-center gap-3 text-xs text-amber-900 max-w-3xl mx-auto">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
          <span>
            <strong>Simulated Locations:</strong> Restaurant addresses and contact numbers below are demo
            placeholders. No real delivery dispatch or physical store visits should be made based on this demo.
          </span>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {RESTAURANT_LOCATIONS.map((outlet) => (
            <div
              key={outlet.id}
              className={`bg-white rounded-3xl p-6 sm:p-8 border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${
                outlet.isFlagship
                  ? "border-red-500/50 ring-2 ring-red-500/10"
                  : "border-stone-200"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    {outlet.isFlagship && (
                      <span className="text-[10px] font-black uppercase tracking-widest bg-red-600 text-white px-2.5 py-1 rounded-full mb-2 inline-block">
                        Flagship Kitchen
                      </span>
                    )}
                    <h3 className="text-xl font-black text-stone-900">{outlet.name}</h3>
                    <p className="text-xs font-bold text-red-600 uppercase tracking-wide mt-0.5">
                      {outlet.city}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-600 shrink-0">
                    <Navigation className="w-5 h-5 text-red-600" />
                  </div>
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm text-stone-600 pt-2 border-t border-stone-100">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    <span>
                      {outlet.address}, {outlet.landmarks} — {outlet.pincode}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-stone-400 shrink-0" />
                    <span className="font-medium text-stone-800">{outlet.hours}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-stone-400 shrink-0" />
                    <span>{outlet.phone}</span>
                  </div>
                </div>

                {/* Delivery radius & features */}
                <div className="pt-3 border-t border-stone-100 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                    Delivery Coverage:
                  </span>
                  <p className="text-xs text-stone-700 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                    {outlet.deliveryRadius}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {outlet.features.map((feat, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-semibold bg-red-50 text-red-700 px-2 py-0.5 rounded-md"
                      >
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between gap-3">
                <Link
                  href="/menu"
                  className="w-full text-center bg-stone-900 hover:bg-red-600 text-white font-black text-xs uppercase tracking-wider py-3 rounded-xl transition-colors shadow-sm"
                >
                  Order From This Kitchen
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Contact & Feedback Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-md max-w-3xl mx-auto">
          <div className="mb-6 space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 uppercase tracking-tight">
              Get in Touch or Leave Feedback
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Have questions about catering, group orders, or spice levels? Send us a simulated message.
            </p>
          </div>

          {feedbackSent ? (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-6 rounded-2xl text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-black">Feedback Received!</h3>
              <p className="text-xs sm:text-sm text-emerald-700">
                Thank you, <strong>{formData.name}</strong>. Your demonstration feedback message has
                been recorded locally in this browser.
              </p>
              <button
                onClick={() => setFeedbackSent(false)}
                className="mt-3 text-xs font-bold text-emerald-800 underline uppercase tracking-wider"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Gowda"
                    className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ramesh@example.com"
                    className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
                  Nearest Outlet
                </label>
                <select
                  value={formData.outlet}
                  onChange={(e) => setFormData({ ...formData, outlet: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-white"
                >
                  <option value="madikeri-flagship">Madikeri Flagship (Coorg)</option>
                  <option value="bangalore-indiranagar">Bengaluru — Indiranagar</option>
                  <option value="bangalore-koramangala">Bengaluru — Koramangala</option>
                  <option value="mysuru-vijayanagar">Mysuru — Vijayanagar</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
                  Your Message or Feedback *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we help you crave the crunch?"
                  className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Demo Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
