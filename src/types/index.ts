export type CategorySlug =
  | "buckets"
  | "burgers"
  | "wings"
  | "strips"
  | "wraps"
  | "combos"
  | "sides"
  | "drinks";

export interface CategoryInfo {
  slug: CategorySlug;
  name: string;
  tagline: string;
  image: string;
  itemCount?: number;
}

export type HeatLevel = "Classic Mild" | "Coorg Medium" | "Fiery Bird's Eye";

export interface ProductAddon {
  id: string;
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  category: CategorySlug;
  price: number;
  description: string;
  image: string;
  badge?: "Signature" | "Bestseller" | "Popular" | "New" | "Value Deal" | "Chef Special";
  isSpicy?: boolean;
  isVeg?: boolean;
  serves?: string;
  pieces?: string;
  spiceOptions?: HeatLevel[];
  addons?: ProductAddon[];
  calories?: string;
}

export interface CartItem {
  cartItemId: string; // unique hash: id + spice + addons
  product: Product;
  quantity: number;
  selectedSpice?: HeatLevel;
  selectedAddons: ProductAddon[];
  specialInstructions?: string;
  unitPrice: number;
}

export type OrderType = "delivery" | "pickup";

export interface Coupon {
  code: string;
  title: string;
  description: string;
  discountType: "percentage" | "fixed" | "free_delivery";
  discountValue: number; // percentage (e.g. 20) or flat amount (e.g. 150)
  minOrder: number;
  maxDiscount?: number;
}

export interface DeliveryDetails {
  customerName: string;
  customerPhone: string;
  address: string;
  landmark?: string;
  city: string;
  pincode: string;
  instructions?: string;
  timeSlot: string;
}

export interface PickupDetails {
  customerName: string;
  customerPhone: string;
  outletId: string;
  pickupTimeSlot: string;
  notes?: string;
}

export type PaymentMethod = "cod" | "upi" | "card";

export interface DemoOrder {
  orderId: string;
  createdAt: string;
  orderType: OrderType;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  taxAmount: number; // 5% GST
  total: number;
  appliedCoupon?: Coupon;
  deliveryDetails?: DeliveryDetails;
  pickupDetails?: PickupDetails;
  paymentMethod: PaymentMethod;
  status: "received" | "preparing" | "out_for_delivery" | "ready_for_pickup" | "completed";
}

export interface RestaurantLocation {
  id: string;
  name: string;
  city: string;
  address: string;
  landmarks: string;
  pincode: string;
  phone: string;
  hours: string;
  isFlagship?: boolean;
  deliveryRadius: string;
  features: string[];
}
