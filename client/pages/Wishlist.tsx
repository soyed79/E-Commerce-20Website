import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { getWishlist } from "@/lib/storage";
import { getProductById } from "@/lib/products";

export default function Wishlist() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const wishlistItems = getWishlist();
    const wishlistProducts = wishlistItems
      .map((item) => getProductById(item.productId))
      .filter(Boolean);
    setProducts(wishlistProducts);
  }, []);

  if (products.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-12">
            <Heart size={64} className="mx-auto text-muted mb-4 opacity-50" />
            <h1 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h1>
            <p className="text-muted-foreground mb-6">
              Start adding products to your wishlist!
            </p>
            <Link
              to="/"
              className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
