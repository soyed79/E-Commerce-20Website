import { CartItem, Product, WishlistItem } from "./products";

const STORAGE_KEYS = {
  CART: "easymart_cart",
  WISHLIST: "easymart_wishlist",
  USER: "easymart_user",
  THEME: "easymart_theme",
  LANGUAGE: "easymart_language",
  ORDERS: "easymart_orders",
};

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  createdAt: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  paymentMethod: string;
  status: "pending" | "confirmed" | "shipped" | "delivered";
  createdAt: number;
  shippingAddress: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
}

export function getAllUsers(): User[] {
  try {
    const data = localStorage.getItem("easymart_users");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveUser(user: User): void {
  const users = getAllUsers();
  const index = users.findIndex((u) => u.id === user.id);
  if (index >= 0) {
    users[index] = user;
  } else {
    users.push(user);
  }
  localStorage.setItem("easymart_users", JSON.stringify(users));
}

export function getCurrentUser(): User | null {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: User | null): void {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
}

export function getCart(): CartItem[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CART);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function setCart(items: CartItem[]): void {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(items));
}

export function addToCart(product: Product, quantity: number = 1): void {
  const cart = getCart();
  const existingItem = cart.find((item) => item.product.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }

  setCart(cart);
}

export function removeFromCart(productId: string): void {
  const cart = getCart().filter((item) => item.product.id !== productId);
  setCart(cart);
}

export function updateCartQuantity(productId: string, quantity: number): void {
  const cart = getCart();
  const item = cart.find((item) => item.product.id === productId);
  if (item) {
    item.quantity = Math.max(1, quantity);
    setCart(cart);
  }
}

export function clearCart(): void {
  localStorage.removeItem(STORAGE_KEYS.CART);
}

export function getWishlist(): WishlistItem[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.WISHLIST);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function setWishlist(items: WishlistItem[]): void {
  localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(items));
}

export function addToWishlist(productId: string): void {
  const wishlist = getWishlist();
  if (!wishlist.find((item) => item.productId === productId)) {
    wishlist.push({ productId, addedAt: Date.now() });
    setWishlist(wishlist);
  }
}

export function removeFromWishlist(productId: string): void {
  const wishlist = getWishlist().filter((item) => item.productId !== productId);
  setWishlist(wishlist);
}

export function isInWishlist(productId: string): boolean {
  return getWishlist().some((item) => item.productId === productId);
}

export function getTheme(): "light" | "dark" {
  try {
    const theme = localStorage.getItem(STORAGE_KEYS.THEME) as
      | "light"
      | "dark"
      | null;
    return theme || "light";
  } catch {
    return "light";
  }
}

export function setTheme(theme: "light" | "dark"): void {
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export function getLanguage(): "en" | "bn" {
  try {
    const lang = localStorage.getItem(STORAGE_KEYS.LANGUAGE) as
      | "en"
      | "bn"
      | null;
    return lang || "en";
  } catch {
    return "en";
  }
}

export function setLanguage(language: "en" | "bn"): void {
  localStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
}

export function getOrders(): Order[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveOrder(order: Order): void {
  const orders = getOrders();
  orders.push(order);
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
}

export function getUserOrders(userId: string): Order[] {
  return getOrders().filter((order) => order.userId === userId);
}
