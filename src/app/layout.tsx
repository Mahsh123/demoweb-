import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";

export const metadata: Metadata = {
  metadataBase: new URL("https://kodagufriedchicken.com"),
  title: "Kodagu Fried Chicken — Crave The Crunch | Original Coorg Fried Chicken",
  description:
    "Hand-dredged Karnataka farm chicken seasoned with estate black pepper and wild Coorg spices. Explore buckets, burgers, hot wings, and sharing meals.",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/images/brand/kfc-logo.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Kodagu Fried Chicken (KFC) — Crave The Crunch",
    description: "Authentic Coorg pepper fried chicken, burgers, and sharing feasts.",
    type: "website",
    images: [
      {
        url: "/images/brand/kfc-logo.png",
        width: 1000,
        height: 1000,
        alt: "Kodagu Fried Chicken Mascot Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Syne:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900 font-sans antialiased selection:bg-red-600 selection:text-white">
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
