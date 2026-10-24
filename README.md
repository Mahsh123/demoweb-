# Kodagu Fried Chicken (KFC) — Premium QSR Brand Website & Interactive Ordering Demo

A complete, responsive, mobile-first brand website and ordering demo for **Kodagu Fried Chicken**, inspired by the visual design and discovery mechanics of leading quick-service restaurant brands, featuring the authentic spice heritage of Kodagu (Coorg), Karnataka.

Built from scratch using **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Lucide React**.

---

## 🍗 Key Highlights

1. **Original Brand Identity**:
   - Distinctive typography, custom wordmark, deep crimson (`#991B1B`–`#DC2626`), charcoal (`#09090B`), and warm golden-amber accents (`#F59E0B`).
   - Story and seasoning rooted in Coorg's black pepper estates, buttermilk brining, and double-crunch batter.

2. **Appetizing Local Food Photography**:
   - 37 high-resolution, appetizing food images stored locally in `public/images/menu/`.
   - Distinct imagery across all 8 menu categories: Chicken Buckets, Crispy Burgers, Pepper Wings, Strips & Tenders, Toasted Wraps, Value Combos, Sides & Dips, and Chilled Drinks.
   - Zero broken image links or external latency dependencies.

3. **Complete Customer Navigation**:
   - `Home` (`/`): Image-led hero ("CRISPY BY NATURE. BOLD BY FLAVOUR."), category cards, crowd favourites, family bucket spotlight, demo coupons, brand pillars, Coorg story, and customer reviews.
   - `Menu` (`/menu`): Interactive filtering across all 8 categories, Veg / Spicy filter toggles, real-time search, sorting, and product customization dialogs.
   - `Offers` (`/offers`): Active coupons with one-click copy & apply (`KODAGUCRUNCH`, `WELCOME20`, `FAMILY100`, `FREEDEL`), plus combo bundles.
   - `Our Story` (`/about`): The culinary philosophy of Kodagu estate pepper and double-dredged frying.
   - `Find Us` (`/locations`): Detailed outlet cards for Madikeri Flagship, Bengaluru (Indiranagar & Koramangala), and Mysuru (Vijayanagar), plus simulated feedback form.
   - `Shopping Bag` (`/cart`): Full-page cart experience with live itemized pricing, quantity adjustment, and coupon discount breakdown.
   - `Simulated Checkout` (`/checkout`): Doorstep Delivery vs. Store Takeaway selection, customer details, address validation, time slots, and mock payment method selection.
   - `Simulated Confirmation` (`/order-confirmation`): Live interactive 4-stage kitchen status tracker, unique order reference (`KFC-CRUNCH-XXXX`), itemized receipt, and print capability.

4. **Functional Client-Side State Engine**:
   - Context-based reactive cart with automatic `localStorage` persistence.
   - Dynamic calculation of subtotal, coupon discounts, minimum-order validation, free-delivery threshold (free over ₹499), and standard 5% restaurant GST.
   - Quick cart slide-over drawer accessible from any page.

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18+ or v22+)
- npm (v9+)

### Installation and Start

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Alternatively, build and run the optimized production server
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📱 Responsive Testing Viewports

The design is fully mobile-first and tested across:
- **Mobile**: 320px, 375px, 390px, 430px (compact header, slide-out drawer, touch-friendly cards)
- **Tablet**: 768px – 1024px (adaptive 2-col to 4-col grids)
- **Desktop**: 1366px, 1920px (generous whitespace, sticky navigation, side-by-side checkout)

---

## 🏷️ Testable Demo Coupons

| Coupon Code | Discount | Minimum Order |
|---|---|---|
| `WELCOME20` | 20% OFF (up to ₹150) | ₹299 |
| `KODAGUCRUNCH` | Flat ₹150 OFF | ₹599 |
| `FAMILY100` | Flat ₹100 OFF | ₹799 |
| `FREEDEL` | Free Delivery Fee Waiver | ₹399 |

*Note: Delivery is automatically FREE on all orders of ₹499 or more without a coupon.*

---

## 📂 Project Architecture

```
src/
├── app/
│   ├── layout.tsx               # Root layout with CartProvider, Navbar, Footer, CartDrawer
│   ├── page.tsx                 # Homepage
│   ├── menu/                    # Dedicated full menu browsing & filtering
│   ├── offers/                  # Promotional deals & coupon cards
│   ├── about/                   # Heritage and culinary craft
│   ├── locations/               # Store directory & feedback form
│   ├── cart/                    # Detailed order bag
│   ├── checkout/                # Simulated ordering details & payment
│   └── order-confirmation/      # Order receipt & 4-step kitchen tracker
├── components/
│   ├── layout/                  # AnnouncementBar, Navbar, Footer, CartDrawer
│   ├── home/                    # HeroSection, CategoryStrip, FeaturedMeals, BucketBanner, etc.
│   └── menu/                    # ProductCard, ProductDetailModal, MenuFilterBar
├── context/
│   └── CartContext.tsx          # LocalStorage persisted cart & coupon calculation engine
├── data/
│   ├── products.ts              # 24+ menu items with prices, spices, and add-ons
│   ├── categories.ts            # Category definitions and tags
│   ├── offers.ts                # Verified coupon and combo definitions
│   ├── locations.ts             # Outlet addresses and timings
│   └── brand.ts                 # Brand pillars, FAQs, and reviews
├── types/
│   └── index.ts                 # Strongly-typed TypeScript interfaces
└── public/
    └── images/
        └── menu/                # 37 local food photography assets
```

---

## 🔒 Scope & Demo Boundaries

This project is a **customer-facing frontend prototype and interactive demonstration**.
- All menu pricing, store locations, and discounts are simulated.
- No real banking or payment card credentials are collected.
- No orders are dispatched to physical restaurants or real delivery partners.
- QR dine-in and administrative backoffice portals are separated from this customer brand showcase.
