"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { CartItem, Product, ProductAddon, HeatLevel, Coupon, OrderType } from "@/types";
import { COUPONS } from "@/data/offers";

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  taxAmount: number;
  total: number;
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  appliedCoupon: Coupon | null;
  couponError: string | null;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (
    product: Product,
    quantity?: number,
    spice?: HeatLevel,
    addons?: ProductAddon[],
    instructions?: string
  ) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeItem: (cartItemId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "kfc_kodagu_cart_v1";
const COUPON_KEY = "kfc_kodagu_coupon_v1";
const ORDER_TYPE_KEY = "kfc_kodagu_ordertype_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem(COUPON_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [explicitCouponError, setExplicitCouponError] = useState<string | null>(null);

  const [orderType, setOrderTypeState] = useState<OrderType>(() => {
    if (typeof window === "undefined") return "delivery";
    try {
      const stored = localStorage.getItem(ORDER_TYPE_KEY);
      return stored === "pickup" ? "pickup" : "delivery";
    } catch {
      return "delivery";
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      if (appliedCoupon) {
        localStorage.setItem(COUPON_KEY, JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem(COUPON_KEY);
      }
      localStorage.setItem(ORDER_TYPE_KEY, orderType);
    } catch (e) {
      console.warn("Failed to write to localStorage", e);
    }
  }, [items, appliedCoupon, orderType]);

  const setOrderType = (type: OrderType) => {
    setOrderTypeState(type);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Subtotal calculation
  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => {
      const itemBase = item.product.price;
      const addonsTotal = item.selectedAddons.reduce((sum, a) => sum + a.price, 0);
      return acc + (itemBase + addonsTotal) * item.quantity;
    }, 0);
  }, [items]);

  const itemCount = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  // Derived coupon error if minimum order is not met
  const couponError = useMemo(() => {
    if (explicitCouponError) return explicitCouponError;
    if (appliedCoupon && subtotal < appliedCoupon.minOrder && subtotal > 0) {
      return `Min order ₹${appliedCoupon.minOrder} required for ${appliedCoupon.code}`;
    }
    return null;
  }, [explicitCouponError, appliedCoupon, subtotal]);

  // Discount calculation
  const discount = useMemo(() => {
    if (!appliedCoupon || subtotal < appliedCoupon.minOrder) return 0;

    if (appliedCoupon.discountType === "percentage") {
      const calculated = Math.round((subtotal * appliedCoupon.discountValue) / 100);
      return appliedCoupon.maxDiscount ? Math.min(calculated, appliedCoupon.maxDiscount) : calculated;
    }

    if (appliedCoupon.discountType === "fixed") {
      return Math.min(appliedCoupon.discountValue, subtotal);
    }

    return 0;
  }, [appliedCoupon, subtotal]);

  // Delivery fee calculation
  const deliveryFee = useMemo(() => {
    if (orderType === "pickup" || subtotal === 0) return 0;
    if (appliedCoupon?.discountType === "free_delivery" && subtotal >= appliedCoupon.minOrder) return 0;
    if (subtotal >= 499) return 0; // Free delivery above 499
    return 49;
  }, [orderType, subtotal, appliedCoupon]);

  // 5% Restaurant GST
  const taxableAmount = Math.max(0, subtotal - discount);
  const taxAmount = useMemo(() => {
    return Math.round(taxableAmount * 0.05);
  }, [taxableAmount]);

  // Final Total
  const total = useMemo(() => {
    return Math.max(0, taxableAmount + deliveryFee + taxAmount);
  }, [taxableAmount, deliveryFee, taxAmount]);

  const addToCart = (
    product: Product,
    quantity = 1,
    spice?: HeatLevel,
    addons: ProductAddon[] = [],
    instructions?: string
  ) => {
    const sortedAddonIds = addons.map((a) => a.id).sort().join("-");
    const spiceKey = spice || (product.spiceOptions ? product.spiceOptions[0] : "standard");
    const cartItemId = `${product.id}__${spiceKey}__${sortedAddonIds}`;

    const addonsCost = addons.reduce((sum, a) => sum + a.price, 0);
    const unitPrice = product.price + addonsCost;

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      } else {
        return [
          ...prev,
          {
            cartItemId,
            product,
            quantity,
            selectedSpice: spice,
            selectedAddons: addons,
            specialInstructions: instructions,
            unitPrice,
          },
        ];
      }
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setItems((prev) => {
      return prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeItem = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
    setExplicitCouponError(null);
  };

  const applyCoupon = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    const found = COUPONS.find((c) => c.code.toUpperCase() === cleanCode);

    if (!found) {
      setExplicitCouponError(`Invalid coupon code "${cleanCode}". Try WELCOME20 or KODAGUCRUNCH`);
      return false;
    }

    if (subtotal < found.minOrder) {
      setExplicitCouponError(`Add ₹${found.minOrder - subtotal} more to use coupon ${found.code}`);
      return false;
    }

    setAppliedCoupon(found);
    setExplicitCouponError(null);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setExplicitCouponError(null);
  };

  return (
    <CartContext.Provider
      value={{
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
        couponError,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
