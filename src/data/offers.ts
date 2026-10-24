import { Coupon } from "@/types";

export interface PromoDeal {
  id: string;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  originalPrice: number;
  dealPrice: number;
  savings: number;
  image: string;
  couponCode?: string;
  targetCategory: string;
  itemsIncluded: string[];
}

export const COUPONS: Coupon[] = [
  {
    code: "KODAGUCRUNCH",
    title: "Coorg Hill Festival",
    description: "Flat ₹150 OFF on orders above ₹599 across any bucket or meal",
    discountType: "fixed",
    discountValue: 150,
    minOrder: 599,
  },
  {
    code: "WELCOME20",
    title: "First Bite Discount",
    description: "20% OFF up to ₹150 on orders above ₹299",
    discountType: "percentage",
    discountValue: 20,
    minOrder: 299,
    maxDiscount: 150,
  },
  {
    code: "FAMILY100",
    title: "Family Sharing Deal",
    description: "Flat ₹100 OFF on sharing buckets and feast orders above ₹799",
    discountType: "fixed",
    discountValue: 100,
    minOrder: 799,
  },
  {
    code: "FREEDEL",
    title: "Zero Delivery Fee",
    description: "Enjoy 100% free delivery on all orders above ₹399",
    discountType: "free_delivery",
    discountValue: 49,
    minOrder: 399,
  },
];

export const PROMO_DEALS: PromoDeal[] = [
  {
    id: "coorg-family-combo-deal",
    title: "Mega Coorg Family Feast",
    badge: "SAVE ₹249",
    tagline: "The ultimate weekend crunch gathering",
    description: "12 pcs crispy fried chicken + 2 Crinkle Masala Fries + 4 Dips + 1L Beverage bottle.",
    originalPrice: 1148,
    dealPrice: 899,
    savings: 249,
    image: "/images/menu/family-feast-bucket.jpg",
    couponCode: "FAMILY100",
    targetCategory: "buckets",
    itemsIncluded: ["12 Pc Crispy Chicken", "2x Masala Fries", "4x Signature Dips", "1L Cold Drink"],
  },
  {
    id: "burger-wings-duo",
    title: "Burger & Hot Wings Duo",
    badge: "POPULAR COMBO",
    tagline: "Two legends in one box",
    description: "1 Malnad Fire Chicken Burger + 6 Coorg Black Pepper Wings + Regular Fries + Chilled Beverage.",
    originalPrice: 657,
    dealPrice: 499,
    savings: 158,
    image: "/images/menu/burger-meal-combo.jpg",
    couponCode: "WELCOME20",
    targetCategory: "combos",
    itemsIncluded: ["Malnad Fire Burger", "6x Pepper Wings", "Regular Fries", "Mango Sparkle"],
  },
  {
    id: "sharing-bucket-deal",
    title: "Signature Coorg 8-Pc Bucket",
    badge: "WEEKDAY SPECIAL",
    tagline: "Hand-breaded peppery crunch",
    description: "8 pieces of bone-in chicken marinated in roasted Coorg black pepper and garlic.",
    originalPrice: 699,
    dealPrice: 549,
    savings: 150,
    image: "/images/menu/coorg-crunch-bucket.jpg",
    couponCode: "KODAGUCRUNCH",
    targetCategory: "buckets",
    itemsIncluded: ["8 Pc Coorg Chicken", "2x Smoky Pepper Dips"],
  },
  {
    id: "tenders-fries-deal",
    title: "Crispy Strips & Loaded Fries",
    badge: "SNACK CRUNCH",
    tagline: "Crunchy tenders with loaded goodness",
    description: "5 whole muscle breast tenders + 1 Loaded Chicken Fries + 2 Roasted Garlic Dips.",
    originalPrice: 518,
    dealPrice: 419,
    savings: 99,
    image: "/images/menu/loaded-chicken-fries.jpg",
    couponCode: "WELCOME20",
    targetCategory: "strips",
    itemsIncluded: ["5x Crispy Tenders", "1x Loaded Chicken Fries", "2x Garlic Dips"],
  },
];
