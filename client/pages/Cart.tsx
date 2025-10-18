import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Layout from "@/components/Layout";
import { getCart, removeFromCart, updateCartQuantity, getCurrentUser } from "@/lib/storage";
import { CartItem } from "@/lib/products";

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>(getCart());

  useEffect(() => {
    const handleStorageChange = () => {
      setCartItems(getCart());
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
    setCartItems(getCart());
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    updateCartQuantity(productId, quantity);
    setCartItems(getCart());
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingCost = subtotal > 500 ? 0 : 80;
  const total = subtotal + shippingCost;

  const handleCheckout = () => {
    const user = getCurrentUser();
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-12">
            <ShoppingBag size={64} className="mx-auto text-muted mb-4 opacity-50" />
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-6">
              Add some products to get started!
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
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 border-b border-border last:border-0 hover:bg-secondary transition-colors"
                >
                  {/* Product Image */}
                  <Link
                    to={`/product/${item.product.id}`}
                    className="flex-shrink-0 w-24 h-24 bg-secondary rounded-lg overflow-hidden"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1">
                    <Link
                      to={`/product/${item.product.id}`}
                      className="font-semibold hover:text-primary transition-colors block mb-1"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.product.category}
                    </p>
                    <p className="font-bold text-primary">৳ {item.product.price}</p>
                  </div>

                  {/* Quantity Control */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(
                          item.product.id,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                      className="p-1 hover:bg-secondary rounded transition-colors"
                    >
                      <Minus size={18} />
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleUpdateQuantity(
                          item.product.id,
                          Math.max(1, parseInt(e.target.value) || 1)
                        )
                      }
                      className="w-12 text-center border border-border rounded py-1"
                      min="1"
                    />
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="p-1 hover:bg-secondary rounded transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="flex flex-col items-end justify-between w-24">
                    <span className="font-bold text-primary">
                      ৳ {item.product.price * item.quantity}
                    </span>
                    <button
                      onClick={() => handleRemoveItem(item.product.id)}
                      className="text-destructive hover:bg-destructive/10 p-2 rounded transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Link
                to="/"
                className="text-primary font-semibold hover:underline"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-secondary rounded-lg p-6 border border-border sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>৳ {subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Items</span>
                  <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span className={shippingCost === 0 ? "text-accent" : ""}>
                    {shippingCost === 0 ? "Free 🎉" : `৳ ${shippingCost}`}
                  </span>
                </div>
                {shippingCost > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Free shipping on orders over ৳ 500
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center mb-6 text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">৳ {total}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity mb-3"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate("/")}
                className="w-full bg-secondary text-foreground py-3 rounded-lg font-semibold hover:bg-muted transition-colors"
              >
                Continue Shopping
              </button>

              {/* Trust Badges */}
              <div className="mt-6 space-y-2 text-xs text-muted-foreground">
                <p>✓ Secure Checkout</p>
                <p>✓ Money-back Guarantee</p>
                <p>✓ 24/7 Customer Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
