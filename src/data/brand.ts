export interface BrandPillar {
  title: string;
  tagline: string;
  description: string;
  icon: string;
}

export const BRAND_PILLARS: BrandPillar[] = [
  {
    title: "Estate Black Pepper",
    tagline: "Single-origin spice from Kodagu hills",
    description: "We don't use bland generic seasoning. Our signature rub features freshly cracked black pepper sourced directly from shaded family estates in Coorg.",
    icon: "Sparkles",
  },
  {
    title: "Double-Crunch Coating",
    tagline: "Ultra-crispy outside, tender inside",
    description: "Soaked for 12 hours in spiced buttermilk brine, then hand-dredged twice in our coarse herb flour for a crunch that stays loud even after delivery.",
    icon: "Flame",
  },
  {
    title: "100% Farm-Fresh Chicken",
    tagline: "Whole muscle cuts, never processed",
    description: "Only whole chicken cuts and tenders from ethical Karnataka farms. Never frozen, no fillers, no artificial binders or preservatives.",
    icon: "ShieldCheck",
  },
  {
    title: "Steaming Hot Delivery",
    tagline: "Engineered crunch-retention packaging",
    description: "Custom ventilated food boxes ensure steam escapes while heat stays trapped, guaranteeing your chicken arrives hot and crisp, never soggy.",
    icon: "Truck",
  },
];

export const TESTIMONIALS = [
  {
    id: "1",
    author: "Rohan Cariappa",
    location: "Madikeri",
    rating: 5,
    text: "Being born in Coorg, I take pepper very seriously. Kodagu Fried Chicken nailed the balance — peppery heat with a deep golden crunch that puts international chains to shame.",
  },
  {
    id: "2",
    author: "Ananya Deshmukh",
    location: "Indiranagar, Bengaluru",
    rating: 5,
    text: "The Malnad Fire Burger is legendary! The fillet is massive, dripping with fiery chili mayo and the brioche bun is toasted to perfection. Arrived in 28 mins still piping hot.",
  },
  {
    id: "3",
    author: "Dr. Vikram Hegde",
    location: "Mysuru",
    rating: 5,
    text: "The Family Feast Bucket has become our Friday night ritual. 12 huge crispy pieces with authentic black pepper glaze and delicious masala crinkle fries.",
  },
];

export const FAQS = [
  {
    q: "What makes Kodagu Fried Chicken distinct from standard fried chicken?",
    a: "Our signature difference is the spice blend: authentic estate-grown black pepper, toasted curry leaves, and bird's eye chili from the hills of Kodagu (Coorg). Combined with our 12-hour buttermilk brine, the flavor penetrates all the way to the bone.",
  },
  {
    q: "How does the demo ordering work?",
    a: "This demo provides a complete simulated ordering journey. You can browse all categories, customize spice levels, choose add-ons, apply coupons, and simulate a delivery or pickup checkout. No real payment is taken.",
  },
  {
    q: "What is your delivery fee policy in the demo?",
    a: "Delivery is FREE on all demo orders above ₹499 (or using coupon FREEDEL above ₹399). For smaller orders, a standard demo delivery fee of ₹49 applies.",
  },
  {
    q: "Can I adjust the spice heat level?",
    a: "Yes! Every chicken bucket, burger, wings, and wrap has customizable heat settings: Classic Mild, Coorg Medium (Black Pepper Glaze), and Fiery Bird's Eye.",
  },
];
