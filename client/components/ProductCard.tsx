import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Product } from "@/lib/products";
import { addToCart, addToWishlist, removeFromWishlist, isInWishlist } from "@/lib/storage";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [inWishlist, setInWishlist] = useState(isInWishlist(product.id));
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, 1);
    // Trigger visual feedback
    alert("Added to cart!");
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
    setInWishlist(!inWishlist);
  };

  return (
    <div className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow duration-300">
      {/* Image Container */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden bg-secondary h-64">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        {product.badge && (
          <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
            {product.badge}
          </div>
        )}
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-xs font-semibold">
            -{discount}%
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-destructive text-destructive-foreground px-4 py-2 rounded-lg font-semibold">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{product.category}</p>

        {/* Title */}
        <Link
          to={`/product/${product.id}`}
          className="block font-semibold text-foreground hover:text-primary transition-colors mb-2 line-clamp-2"
        >
          {product.name}
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted"}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-primary">৳ {product.price}</span>
            {product.originalPrice && (
              <span className="text-sm line-through text-muted-foreground">৳ {product.originalPrice}</span>
            )}
          </div>
        </div>

        {/* Stock Status */}
        {product.inStock && (
          <p className="text-xs text-accent font-semibold mb-3">In Stock</p>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={16} />
            <span className="text-sm font-semibold">Add</span>
          </button>
          <button
            onClick={handleWishlistToggle}
            className={`p-2 rounded-lg border transition-colors ${
              inWishlist
                ? "bg-accent border-accent text-accent-foreground"
                : "border-border hover:bg-secondary"
            }`}
          >
            <Heart size={18} fill={inWishlist ? "currentColor" : "none"} />
          </button>
        </div>

        {/* View Details Link */}
        <Link
          to={`/product/${product.id}`}
          className="block text-center mt-3 text-primary font-medium text-sm hover:underline"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
