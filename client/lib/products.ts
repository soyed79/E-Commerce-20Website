export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  specifications?: Record<string, string>;
  inStock: boolean;
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: number;
}

const products: Product[] = [
  {
    id: "p1",
    name: "Classic Cotton T-Shirt",
    price: 499,
    originalPrice: 899,
    category: "Fashion and Clothing",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    rating: 4.5,
    reviews: 128,
    description: "High-quality 100% cotton t-shirt for everyday comfort",
    specifications: {
      Material: "100% Cotton",
      Size: "XS to XXXL",
      Care: "Machine wash cold",
    },
    inStock: true,
    badge: "Sale",
  },
  {
    id: "p2",
    name: "Premium Denim Jeans",
    price: 1499,
    originalPrice: 2499,
    category: "Fashion and Clothing",
    image:
      "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop",
    rating: 4.7,
    reviews: 256,
    description: "Classic fit denim jeans with perfect stretch",
    specifications: {
      Material: "98% Cotton, 2% Spandex",
      Fit: "Slim fit",
      Waist: "28-40",
    },
    inStock: true,
  },
  {
    id: "p3",
    name: "Leather Jacket",
    price: 3999,
    category: "Fashion and Clothing",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&h=500&fit=crop",
    rating: 4.6,
    reviews: 89,
    description: "Stylish genuine leather jacket for all seasons",
    specifications: {
      Material: "100% Genuine Leather",
      Lining: "Viscose",
      Closure: "Zipper",
    },
    inStock: true,
    badge: "New",
  },
  {
    id: "p4",
    name: "Summer Floral Dress",
    price: 799,
    originalPrice: 1299,
    category: "Fashion and Clothing",
    image:
      "https://images.unsplash.com/photo-1595777712802-6b2ecef04910?w=500&h=500&fit=crop",
    rating: 4.4,
    reviews: 167,
    description: "Beautiful floral print summer dress",
    specifications: {
      Material: "Rayon blend",
      Length: "Knee length",
      Care: "Hand wash",
    },
    inStock: true,
  },
  {
    id: "p5",
    name: "Skincare Face Serum",
    price: 599,
    category: "Health and Beauty Products",
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop",
    rating: 4.8,
    reviews: 342,
    description: "Vitamin C serum for bright, glowing skin",
    specifications: {
      Volume: "30ml",
      Type: "Face Serum",
      "Skin Type": "All skin types",
    },
    inStock: true,
    badge: "Best Seller",
  },
  {
    id: "p6",
    name: "Lipstick Shades Set",
    price: 899,
    category: "Health and Beauty Products",
    image:
      "https://images.unsplash.com/photo-1586505892986-a0d5e2b41e07?w=500&h=500&fit=crop",
    rating: 4.6,
    reviews: 218,
    description: "5-piece lipstick set with various shades",
    specifications: {
      "Set Size": "5 pieces",
      Type: "Matte & Glossy",
      Duration: "8+ hours",
    },
    inStock: true,
  },
  {
    id: "p7",
    name: "Hair Brush & Comb Set",
    price: 349,
    originalPrice: 599,
    category: "Health and Beauty Products",
    image:
      "https://images.unsplash.com/photo-1576091160659-112ad2172d5d?w=500&h=500&fit=crop",
    rating: 4.3,
    reviews: 95,
    description: "Professional hair care brush and comb set",
    specifications: {
      Material: "Natural bristles",
      Set: "2 pieces",
      Use: "All hair types",
    },
    inStock: true,
  },
  {
    id: "p8",
    name: "Organic Body Lotion",
    price: 449,
    category: "Health and Beauty Products",
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop",
    rating: 4.5,
    reviews: 156,
    description: "Moisturizing organic body lotion",
    specifications: {
      Volume: "200ml",
      Type: "Body Lotion",
      Ingredients: "Organic",
    },
    inStock: true,
  },
  {
    id: "p9",
    name: "Wireless Bluetooth Earbuds",
    price: 1999,
    originalPrice: 3999,
    category: "Electronics and Gadgets",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    rating: 4.6,
    reviews: 512,
    description: "Premium wireless earbuds with active noise cancellation",
    specifications: {
      Connectivity: "Bluetooth 5.0",
      "Battery Life": "24 hours",
      Features: "ANC, Touch control",
    },
    inStock: true,
    badge: "Hot Deal",
  },
  {
    id: "p10",
    name: "4K Webcam",
    price: 2499,
    originalPrice: 4999,
    category: "Electronics and Gadgets",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop",
    rating: 4.7,
    reviews: 234,
    description: "Professional 4K webcam for streaming and video calls",
    specifications: {
      Resolution: "4K UHD",
      "Frame Rate": "30fps",
      "Field of View": "90°",
    },
    inStock: true,
  },
  {
    id: "p11",
    name: "Smart Watch",
    price: 4999,
    originalPrice: 7999,
    category: "Electronics and Gadgets",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    rating: 4.5,
    reviews: 378,
    description: "Fitness tracking smartwatch with AMOLED display",
    specifications: {
      Display: "AMOLED",
      "Battery Life": "14 days",
      Features: "Heart rate, Sleep tracking",
    },
    inStock: true,
    badge: "New",
  },
  {
    id: "p12",
    name: "USB-C Fast Charger",
    price: 799,
    category: "Electronics and Gadgets",
    image:
      "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop",
    rating: 4.4,
    reviews: 267,
    description: "65W USB-C fast charger for all devices",
    specifications: {
      Power: "65W",
      Ports: "2x USB-C",
      Compatibility: "Universal",
    },
    inStock: true,
  },
  {
    id: "p13",
    name: "Decorative Wall Art",
    price: 1499,
    category: "Home Decor",
    image:
      "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
    rating: 4.5,
    reviews: 145,
    description: "Modern abstract wall art canvas",
    specifications: {
      "Canvas Size": "60x80cm",
      Material: "Canvas on frame",
      Style: "Modern Abstract",
    },
    inStock: true,
  },
  {
    id: "p14",
    name: "Ceramic Vase Set",
    price: 899,
    originalPrice: 1499,
    category: "Home Decor",
    image:
      "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
    rating: 4.3,
    reviews: 89,
    description: "Set of 3 decorative ceramic vases",
    specifications: {
      Pieces: "3",
      Material: "Ceramic",
      Colors: "Assorted",
    },
    inStock: true,
    badge: "Sale",
  },
  {
    id: "p15",
    name: "LED Pendant Lights",
    price: 2499,
    category: "Home Decor",
    image:
      "https://images.unsplash.com/photo-1565893689887-47df01e50e9d?w=500&h=500&fit=crop",
    rating: 4.6,
    reviews: 201,
    description: "Modern LED pendant lights for any room",
    specifications: {
      Power: "LED",
      "Color Temp": "Warm white",
      Dimmable: "Yes",
    },
    inStock: true,
    badge: "New",
  },
  {
    id: "p16",
    name: "Throw Pillow Collection",
    price: 599,
    category: "Home Decor",
    image:
      "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
    rating: 4.4,
    reviews: 123,
    description: "Set of 2 decorative throw pillows",
    specifications: {
      Pieces: "2",
      Size: "45x45cm",
      Material: "Cotton blend",
    },
    inStock: true,
  },
  {
    id: "p17",
    name: "Action Figure Set",
    price: 799,
    originalPrice: 1299,
    category: "Toys and Games",
    image:
      "https://images.unsplash.com/photo-1516826957519-c21cc028cb29?w=500&h=500&fit=crop",
    rating: 4.6,
    reviews: 178,
    description: "Premium action figure collectible set",
    specifications: {
      "Figure Count": "5",
      Material: "PVC",
      "Age Group": "6+",
    },
    inStock: true,
  },
  {
    id: "p18",
    name: "Board Game Collection",
    price: 1899,
    category: "Toys and Games",
    image:
      "https://images.unsplash.com/photo-1516826957519-c21cc028cb29?w=500&h=500&fit=crop",
    rating: 4.5,
    reviews: 134,
    description: "Family board game pack with 4 games",
    specifications: {
      "Game Count": "4",
      Players: "2-6",
      "Age Group": "8+",
    },
    inStock: true,
  },
  {
    id: "p19",
    name: "Building Block Set",
    price: 649,
    originalPrice: 1099,
    category: "Toys and Games",
    image:
      "https://images.unsplash.com/photo-1516826957519-c21cc028cb29?w=500&h=500&fit=crop",
    rating: 4.7,
    reviews: 289,
    description: "Educational building block set for kids",
    specifications: {
      "Block Count": "500+",
      Material: "Plastic",
      "Age Group": "3+",
    },
    inStock: true,
    badge: "Best Seller",
  },
  {
    id: "p20",
    name: "Puzzle Collection",
    price: 399,
    category: "Toys and Games",
    image:
      "https://images.unsplash.com/photo-1516826957519-c21cc028cb29?w=500&h=500&fit=crop",
    rating: 4.4,
    reviews: 95,
    description: "3D puzzle collection pack",
    specifications: {
      Puzzles: "3",
      Difficulty: "Medium to Hard",
      "Age Group": "12+",
    },
    inStock: true,
  },
  {
    id: "p21",
    name: "Yoga Mat",
    price: 899,
    originalPrice: 1499,
    category: "Fitness Equipment and Sports Goods",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=500&h=500&fit=crop",
    rating: 4.6,
    reviews: 267,
    description: "Non-slip premium yoga mat with carry strap",
    specifications: {
      Thickness: "6mm",
      Material: "TPE",
      Length: "183cm",
    },
    inStock: true,
    badge: "Hot Deal",
  },
  {
    id: "p22",
    name: "Adjustable Dumbbells",
    price: 2999,
    originalPrice: 4999,
    category: "Fitness Equipment and Sports Goods",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=500&fit=crop",
    rating: 4.7,
    reviews: 312,
    description: "Adjustable dumbbell set 2.5kg to 10kg",
    specifications: {
      "Weight Range": "2.5kg-10kg",
      Material: "Steel",
      Set: "2 pieces",
    },
    inStock: true,
    badge: "New",
  },
  {
    id: "p23",
    name: "Resistance Band Set",
    price: 449,
    category: "Fitness Equipment and Sports Goods",
    image:
      "https://images.unsplash.com/photo-1599193700776-dba8ba36b745?w=500&h=500&fit=crop",
    rating: 4.5,
    reviews: 178,
    description: "5-piece resistance band set for home workouts",
    specifications: {
      "Band Count": "5",
      Resistance: "Multiple levels",
      Length: "208cm",
    },
    inStock: true,
  },
  {
    id: "p24",
    name: "Jump Rope",
    price: 299,
    category: "Fitness Equipment and Sports Goods",
    image:
      "https://images.unsplash.com/photo-1599195635746-d16a9de5e8e7?w=500&h=500&fit=crop",
    rating: 4.4,
    reviews: 134,
    description: "Professional jump rope for cardio training",
    specifications: {
      Material: "Steel cable",
      Length: "Adjustable",
      Handle: "Ergonomic",
    },
    inStock: true,
  },
  {
    id: "p25",
    name: "Electric Kettle",
    price: 999,
    originalPrice: 1699,
    category: "Kitchen Appliances",
    image:
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=500&h=500&fit=crop",
    rating: 4.6,
    reviews: 234,
    description: "Fast boiling electric kettle with auto shut-off",
    specifications: {
      Capacity: "1.5L",
      Power: "1500W",
      Features: "Auto shut-off, dry boil protection",
    },
    inStock: true,
    badge: "Sale",
  },
  {
    id: "p26",
    name: "Blender Mixer",
    price: 1899,
    category: "Kitchen Appliances",
    image:
      "https://images.unsplash.com/photo-1577951321026-3953e12a9af6?w=500&h=500&fit=crop",
    rating: 4.7,
    reviews: 289,
    description: "Powerful blender for smoothies and purees",
    specifications: {
      Power: "1200W",
      Jug: "2L glass",
      Speeds: "5 speed + pulse",
    },
    inStock: true,
    badge: "Best Seller",
  },
  {
    id: "p27",
    name: "Non-Stick Frying Pan",
    price: 749,
    originalPrice: 1299,
    category: "Kitchen Appliances",
    image:
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=500&h=500&fit=crop",
    rating: 4.5,
    reviews: 156,
    description: "Durable non-stick frying pan",
    specifications: {
      Diameter: "28cm",
      Material: "Aluminum",
      "Non-stick": "PTFE",
    },
    inStock: true,
  },
  {
    id: "p28",
    name: "Pressure Cooker",
    price: 2499,
    category: "Kitchen Appliances",
    image:
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=500&h=500&fit=crop",
    rating: 4.6,
    reviews: 201,
    description: "6L stainless steel pressure cooker",
    specifications: {
      Capacity: "6L",
      Material: "Stainless steel",
      Safety: "Multiple safety features",
    },
    inStock: true,
    badge: "New",
  },
];

export const productCategories = [
  {
    name: "Fashion and Clothing",
    emoji: "👕",
    color: "#FF6B6B",
  },
  {
    name: "Health and Beauty Products",
    emoji: "💄",
    color: "#FF69B4",
  },
  {
    name: "Electronics and Gadgets",
    emoji: "📱",
    color: "#4ECDC4",
  },
  {
    name: "Home Decor",
    emoji: "🏠",
    color: "#FFE66D",
  },
  {
    name: "Toys and Games",
    emoji: "🧸",
    color: "#95E1D3",
  },
  {
    name: "Fitness Equipment and Sports Goods",
    emoji: "🏋️",
    color: "#A8E6CF",
  },
  {
    name: "Kitchen Appliances",
    emoji: "🍳",
    color: "#FFD3B6",
  },
];

export function getProducts(): Product[] {
  return products;
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery),
  );
}

export function getRelatedProducts(productId: string, limit: number = 4) {
  const product = getProductById(productId);
  if (!product) return [];

  return products
    .filter((p) => p.category === product.category && p.id !== productId)
    .slice(0, limit);
}
