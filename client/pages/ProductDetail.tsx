import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Star, Heart, ShoppingCart, ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { getProductById, getRelatedProducts } from "@/lib/products";
import {
  addToCart,
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
} from "@/lib/storage";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = id ? getProductById(id) : null;
  const [quantity, setQuantity] = useState(1);
  const [inWishlist, setInWishlist] = useState(
    product ? isInWishlist(product.id) : false,
  );
  const [activeTab, setActiveTab] = useState("description");

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90"
          >
            Continue Shopping
          </Link>
        </div>
      </Layout>
    );
  }

  const relatedProducts = getRelatedProducts(product.id);
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`Added ${quantity} item(s) to cart!`);
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
    <Layout>
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/" className="text-primary hover:underline">
            Home
          </Link>
          <ChevronRight size={16} />
          <Link
            to={`/category/${encodeURIComponent(product.category)}`}
            className="text-primary hover:underline"
          >
            {product.category}
          </Link>
          <ChevronRight size={16} />
          <span className="text-muted-foreground">{product.name}</span>
        </div>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Section */}
          <div className="relative">
            <div className="bg-secondary rounded-lg overflow-hidden h-96 lg:h-full mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {discount > 0 && (
              <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground px-4 py-2 rounded-lg font-bold">
                -{discount}%
              </div>
            )}
            {product.badge && (
              <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-4 py-2 rounded-lg font-semibold">
                {product.badge}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div>
            <div className="mb-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                {product.category}
              </p>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < Math.floor(product.rating)
                          ? "fill-accent text-accent"
                          : "text-muted"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-bold text-primary">
                    ৳ {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg line-through text-muted-foreground">
                      ৳ {product.originalPrice}
                    </span>
                  )}
                </div>
                {discount > 0 && (
                  <p className="text-sm text-accent font-semibold">
                    Save ৳ {product.originalPrice! - product.price}
                  </p>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.inStock ? (
                  <p className="text-accent font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent rounded-full"></span>
                    In Stock - Ships within 2-3 days
                  </p>
                ) : (
                  <p className="text-destructive font-semibold">Out of Stock</p>
                )}
              </div>

              {/* Quantity Selector */}
              {product.inStock && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 border border-border rounded hover:bg-secondary transition-colors"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                      }
                      className="w-16 px-3 py-2 border border-border rounded text-center"
                      min="1"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 border border-border rounded hover:bg-secondary transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button
                  onClick={handleWishlistToggle}
                  className={`px-6 py-3 rounded-lg border transition-colors font-semibold ${
                    inWishlist
                      ? "bg-accent border-accent text-accent-foreground"
                      : "border-border hover:bg-secondary"
                  }`}
                >
                  <Heart
                    size={20}
                    fill={inWishlist ? "currentColor" : "none"}
                  />
                </button>
              </div>

              {/* Buy Now */}
              <button
                disabled={!product.inStock}
                onClick={() => {
                  addToCart(product, quantity);
                  navigate("/checkout");
                }}
                className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                Buy Now
              </button>

              {/* Features */}
              <div className="mt-8 pt-8 border-t border-border space-y-3 text-sm">
                <div className="flex gap-3">
                  <span>🚚</span>
                  <div>
                    <p className="font-semibold">Free Delivery</p>
                    <p className="text-muted-foreground">
                      On orders over ৳ 500
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span>🔄</span>
                  <div>
                    <p className="font-semibold">Easy Returns</p>
                    <p className="text-muted-foreground">
                      30-day return policy
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span>🔒</span>
                  <div>
                    <p className="font-semibold">Secure Payment</p>
                    <p className="text-muted-foreground">
                      100% secure transactions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-12">
          <div className="flex gap-8 border-b border-border mb-6">
            {["description", "specifications", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 font-semibold transition-colors ${
                  activeTab === tab
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === "description" && (
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground mb-4">
                {product.description}
              </p>
            </div>
          )}

          {activeTab === "specifications" && (
            <div className="space-y-4">
              {product.specifications ? (
                Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between py-2 border-b border-border"
                  >
                    <span className="font-semibold text-sm">{key}</span>
                    <span className="text-muted-foreground text-sm">
                      {value}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">
                  No specifications available
                </p>
              )}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        size={14}
                        className="fill-accent text-accent"
                      />
                    ))}
                  </div>
                  <p className="font-semibold mb-1">Reviewer {i}</p>
                  <p className="text-muted-foreground text-sm">
                    Great product quality and fast delivery!
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
