"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Bike,
  Store,
  ShieldAlert,
  ArrowRight,
  ChevronLeft,
  CreditCard,
  Banknote,
  Smartphone,
  Lock,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { RESTAURANT_LOCATIONS } from "@/data/locations";
import { money } from "@/data/products";
import { PaymentMethod, DemoOrder } from "@/types";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    itemCount,
    subtotal,
    discount,
    deliveryFee,
    taxAmount,
    total,
    orderType,
    setOrderType,
    appliedCoupon,
    clearCart,
  } = useCart();

  // Form states
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("Madikeri");
  const [pincode, setPincode] = useState("571201");
  const [deliveryInstructions, setDeliveryInstructions] = useState("");
  const [deliverySlot, setDeliverySlot] = useState("ASAP · 30–40 mins");

  // Pickup states
  const [pickupOutlet, setPickupOutlet] = useState("madikeri-flagship");
  const [pickupSlot, setPickupSlot] = useState("ASAP · 15–20 mins");

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty and not submitting, redirect to menu
  if (items.length === 0 && !isSubmitting) {
    return (
      <div className="min-h-[70vh] bg-stone-50 py-16 flex items-center justify-center">
        <div className="max-w-md w-full mx-4 text-center bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
          <h2 className="text-xl font-black text-stone-900 uppercase">Your Bag is Empty</h2>
          <p className="text-xs text-stone-500">
            Please add items to your cart before proceeding to checkout.
          </p>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 bg-red-600 text-white font-black text-xs uppercase px-5 py-3 rounded-xl"
          >
            Go to Menu
          </Link>
        </div>
      </div>
    );
  }

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!customerName.trim()) {
      errs.customerName = "Name is required.";
    }

    const cleanPhone = customerPhone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.customerPhone = "Valid 10-digit mobile number is required.";
    }

    if (orderType === "delivery") {
      if (!address.trim() || address.trim().length < 5) {
        errs.address = "Complete delivery address is required.";
      }
      if (!pincode.trim() || pincode.trim().length < 6) {
        errs.pincode = "Valid 6-digit PIN code is required.";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `KFC-CRUNCH-${randomNum}`;

    const newOrder: DemoOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      orderType,
      items: [...items],
      subtotal,
      discount,
      deliveryFee,
      taxAmount,
      total,
      appliedCoupon: appliedCoupon || undefined,
      deliveryDetails:
        orderType === "delivery"
          ? {
              customerName,
              customerPhone,
              address,
              landmark,
              city,
              pincode,
              instructions: deliveryInstructions,
              timeSlot: deliverySlot,
            }
          : undefined,
      pickupDetails:
        orderType === "pickup"
          ? {
              customerName,
              customerPhone,
              outletId: pickupOutlet,
              pickupTimeSlot: pickupSlot,
            }
          : undefined,
      paymentMethod,
      status: "received",
    };

    try {
      localStorage.setItem("kfc_kodagu_last_order", JSON.stringify(newOrder));
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }

    setTimeout(() => {
      clearCart();
      router.push(`/order-confirmation?orderId=${orderId}`);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-stone-50 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Back Link */}
        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Shopping Bag</span>
        </Link>

        {/* Demo Notice Banner */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 text-amber-950">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm space-y-1">
            <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-900">
              Simulation Demonstration Checkout
            </h2>
            <p className="text-amber-800 leading-relaxed text-xs">
              No live payments are processed, and no real delivery is scheduled. This simulated form
              demonstrates client-side validation, receipt generation, and simulated dispatch status tracking.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form Fields */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Mode Selector */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
              <h2 className="text-base sm:text-lg font-black text-stone-950 uppercase tracking-tight flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-bold">
                  1
                </span>
                <span>Select Order Type</span>
              </h2>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setOrderType("delivery")}
                  className={`p-3.5 sm:p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                    orderType === "delivery"
                      ? "border-red-600 bg-red-50/60 font-bold text-red-950 ring-1 ring-red-600 shadow-sm"
                      : "border-stone-200 text-stone-700 hover:border-stone-300"
                  }`}
                >
                  <Bike className="w-5 h-5 text-red-600" />
                  <div>
                    <span className="block text-xs sm:text-sm font-black">Doorstep Delivery</span>
                    <span className="text-[10px] text-stone-500">30–40 mins</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderType("pickup")}
                  className={`p-3.5 sm:p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                    orderType === "pickup"
                      ? "border-red-600 bg-red-50/60 font-bold text-red-950 ring-1 ring-red-600 shadow-sm"
                      : "border-stone-200 text-stone-700 hover:border-stone-300"
                  }`}
                >
                  <Store className="w-5 h-5 text-red-600" />
                  <div>
                    <span className="block text-xs sm:text-sm font-black">Store Takeaway</span>
                    <span className="text-[10px] text-stone-500">15–20 mins</span>
                  </div>
                </button>
              </div>
            </div>

            {/* 2. Customer Information */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
              <h2 className="text-base sm:text-lg font-black text-stone-950 uppercase tracking-tight flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-bold">
                  2
                </span>
                <span>Contact Details</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Rohith Biddappa"
                    className={`w-full text-xs p-3.5 rounded-xl border ${
                      errors.customerName ? "border-red-500 bg-red-50/50" : "border-stone-200"
                    } focus:outline-none focus:border-red-500`}
                  />
                  {errors.customerName && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.customerName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. 98450 12345"
                    className={`w-full text-xs p-3.5 rounded-xl border ${
                      errors.customerPhone ? "border-red-500 bg-red-50/50" : "border-stone-200"
                    } focus:outline-none focus:border-red-500`}
                  />
                  {errors.customerPhone && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.customerPhone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* 3. Address or Pickup Location Details */}
            {orderType === "delivery" ? (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
                <h2 className="text-base sm:text-lg font-black text-stone-950 uppercase tracking-tight flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-bold">
                    3
                  </span>
                  <span>Delivery Address</span>
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
                      Street Address & Building / House No. *
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Flat 302, Pepper Crest Apartments, Raja's Seat Road"
                      className={`w-full text-xs p-3.5 rounded-xl border ${
                        errors.address ? "border-red-500 bg-red-50/50" : "border-stone-200"
                      } focus:outline-none focus:border-red-500`}
                    />
                    {errors.address && (
                      <p className="text-[11px] text-red-600 mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
                        Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        placeholder="Near Coffee Board"
                        className="w-full text-xs p-3.5 rounded-xl border border-stone-200 focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
                        City
                      </label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full text-xs p-3.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-red-500"
                      >
                        <option value="Madikeri">Madikeri (Coorg)</option>
                        <option value="Bengaluru">Bengaluru</option>
                        <option value="Mysuru">Mysuru</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="571201"
                        className={`w-full text-xs p-3.5 rounded-xl border ${
                          errors.pincode ? "border-red-500 bg-red-50/50" : "border-stone-200"
                        } focus:outline-none focus:border-red-500`}
                      />
                      {errors.pincode && (
                        <p className="text-[11px] text-red-600 mt-1">{errors.pincode}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
                        Delivery Time Slot
                      </label>
                      <select
                        value={deliverySlot}
                        onChange={(e) => setDeliverySlot(e.target.value)}
                        className="w-full text-xs p-3.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-red-500"
                      >
                        <option value="ASAP · 30–40 mins">ASAP (30–40 mins)</option>
                        <option value="In 45–60 mins">In 45–60 mins</option>
                        <option value="Dinner Time (7:30 PM - 8:30 PM)">Dinner Time (7:30 PM - 8:30 PM)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
                        Rider Instructions
                      </label>
                      <input
                        type="text"
                        value={deliveryInstructions}
                        onChange={(e) => setDeliveryInstructions(e.target.value)}
                        placeholder="Leave at front door, ring bell"
                        className="w-full text-xs p-3.5 rounded-xl border border-stone-200 focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
                <h2 className="text-base sm:text-lg font-black text-stone-950 uppercase tracking-tight flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-bold">
                    3
                  </span>
                  <span>Select Pickup Outlet</span>
                </h2>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
                      Select Store
                    </label>
                    <select
                      value={pickupOutlet}
                      onChange={(e) => setPickupOutlet(e.target.value)}
                      className="w-full text-xs p-3.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-red-500"
                    >
                      {RESTAURANT_LOCATIONS.map((loc) => (
                        <option key={loc.id} value={loc.id}>
                          {loc.name} — {loc.city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
                      Estimated Pickup Slot
                    </label>
                    <select
                      value={pickupSlot}
                      onChange={(e) => setPickupSlot(e.target.value)}
                      className="w-full text-xs p-3.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-red-500"
                    >
                      <option value="ASAP · 15–20 mins">ASAP (15–20 mins)</option>
                      <option value="In 30 minutes">In 30 minutes</option>
                      <option value="In 45 minutes">In 45 minutes</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Payment Simulation */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
              <h2 className="text-base sm:text-lg font-black text-stone-950 uppercase tracking-tight flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-bold">
                  4
                </span>
                <span>Simulated Payment Method</span>
              </h2>

              <div className="space-y-2.5">
                <label
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === "cod"
                      ? "border-red-600 bg-red-50/50 shadow-sm ring-1 ring-red-600"
                      : "border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="text-red-600 accent-red-600 w-4 h-4"
                    />
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-stone-900 block">
                        Cash on Delivery / Pay on Pickup
                      </span>
                      <span className="text-[11px] text-stone-500">
                        Pay in cash or UPI QR upon simulated delivery
                      </span>
                    </div>
                  </div>
                  <Banknote className="w-5 h-5 text-stone-400" />
                </label>

                <label
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === "upi"
                      ? "border-red-600 bg-red-50/50 shadow-sm ring-1 ring-red-600"
                      : "border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "upi"}
                      onChange={() => setPaymentMethod("upi")}
                      className="text-red-600 accent-red-600 w-4 h-4"
                    />
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-stone-900 block">
                        Simulated Instant UPI
                      </span>
                      <span className="text-[11px] text-stone-500">
                        Google Pay / PhonePe / Paytm / Cred (Simulation)
                      </span>
                    </div>
                  </div>
                  <Smartphone className="w-5 h-5 text-stone-400" />
                </label>

                <label
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === "card"
                      ? "border-red-600 bg-red-50/50 shadow-sm ring-1 ring-red-600"
                      : "border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="text-red-600 accent-red-600 w-4 h-4"
                    />
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-stone-900 block">
                        Credit / Debit Card (Simulated)
                      </span>
                      <span className="text-[11px] text-stone-500">
                        Visa, Mastercard, RuPay (Test mode)
                      </span>
                    </div>
                  </div>
                  <CreditCard className="w-5 h-5 text-stone-400" />
                </label>
              </div>
            </div>
          </div>

          {/* Right Column / Order Summary & Submit */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-5 sticky top-24">
              <h2 className="text-base font-black text-stone-950 uppercase tracking-tight border-b border-stone-100 pb-3">
                Order Review ({itemCount} {itemCount === 1 ? "item" : "items"})
              </h2>

              {/* Items summary list */}
              <div className="divide-y divide-stone-100 max-h-60 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.cartItemId} className="py-2.5 flex items-start justify-between text-xs">
                    <div>
                      <span className="font-bold text-stone-900">
                        {item.quantity}× {item.product.name}
                      </span>
                      <div className="text-[10px] text-stone-500">
                        {item.selectedSpice}
                        {item.selectedAddons.length > 0 &&
                          ` · +${item.selectedAddons.map((a) => a.name).join(", ")}`}
                      </div>
                    </div>
                    <span className="font-black text-stone-900 shrink-0 ml-2">
                      {money(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Calculations */}
              <div className="space-y-2 text-xs text-stone-600 pt-3 border-t border-stone-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">{money(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>−{money(discount)}</span>
                  </div>
                )}

                {orderType === "delivery" && (
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className={deliveryFee === 0 ? "text-emerald-600 font-bold" : "text-stone-900"}>
                      {deliveryFee === 0 ? "FREE" : money(deliveryFee)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span className="font-semibold text-stone-900">{money(taxAmount)}</span>
                </div>

                <div className="pt-3 border-t border-stone-200 flex justify-between text-lg font-black text-stone-950">
                  <span>Grand Total</span>
                  <span className="text-red-600">{money(total)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-sm uppercase tracking-wider py-4 rounded-2xl shadow-xl shadow-red-950/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>Confirm Simulated Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[11px] text-stone-400 text-center flex items-center justify-center gap-1.5 pt-1">
                <Lock className="w-3.5 h-3.5 text-stone-400" />
                <span>Simulation environment · No charge applied</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
