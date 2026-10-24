import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";

export const metadata: Metadata = {
  title: "Kodagu Fried Chicken — Crave The Crunch | Original Coorg Fried Chicken",
  description:
    "Hand-dredged Karnataka farm chicken seasoned with estate black pepper and wild Coorg spices. Explore buckets, burgers, hot wings, and sharing meals.",
  openGraph: {
    title: "Kodagu Fried Chicken — Crave The Crunch",
    description: "Authentic Coorg pepper fried chicken, burgers, and sharing feasts.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900 antialiased selection:bg-red-600 selection:text-white">
        <CartProvider>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <CartDrawer />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
