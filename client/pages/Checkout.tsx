import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import { getCart, getCurrentUser, saveOrder, clearCart } from "@/lib/storage";
import { CartItem, Order } from "@/lib/products";

export default function Checkout() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const cartItems = getCart();
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: "",
    postalCode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
    if (!user) {
      navigate("/login?redirect=checkout");
    }
  }, [cartItems, user, navigate]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shippingCost = subtotal > 500 ? 0 : 80;
  const total = subtotal + shippingCost;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Create order
      const order: Order = {
        id: `ORD-${Date.now()}`,
        userId: user!.id,
        items: cartItems,
        total,
        paymentMethod,
        status: "confirmed",
        createdAt: Date.now(),
        shippingAddress: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
        },
      };

      saveOrder(order);
      clearCart();
      setOrderPlaced(true);

      setTimeout(() => {
        navigate(`/order-confirmation/${order.id}`);
      }, 1000);
    } catch (error) {
      alert("Failed to place order. Please try again.");
      setIsProcessing(false);
    }
  };

  if (orderPlaced) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="text-6xl mb-4">✓</div>
          <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
          <p className="text-muted-foreground">Redirecting to confirmation...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate("/cart")}
          className="flex items-center gap-2 text-primary font-semibold mb-6 hover:underline"
        >
          <ArrowLeft size={20} />
          Back to Cart
        </button>

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <form onSubmit={handlePlaceOrder} className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="col-span-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="col-span-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="col-span-1 md:col-span-2 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <textarea
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="col-span-1 md:col-span-2 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  rows={3}
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="col-span-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="col-span-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <div className="space-y-4">
                {[
                  { id: "cod", label: "Cash on Delivery (COD)", icon: "💵" },
                  { id: "bkash", label: "bKash", icon: "📱" },
                  { id: "card", label: "Credit/Debit Card", icon: "💳" },
                ].map((method) => (
                  <label
                    key={method.id}
                    className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-secondary transition-colors"
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-xl">{method.icon}</span>
                    <span className="font-semibold">{method.label}</span>
                  </label>
                ))}
              </div>

              {/* Payment Details */}
              {paymentMethod === "bkash" && (
                <div className="mt-4 p-4 bg-secondary rounded-lg">
                  <p className="text-sm font-semibold mb-2">Send payment to:</p>
                  <p className="text-lg font-bold">01XXX-XXXXXX</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    You'll receive a confirmation after payment
                  </p>
                </div>
              )}

              {paymentMethod === "card" && (
                <div className="mt-4 p-4 bg-secondary rounded-lg space-y-3">
                  <input
                    type="text"
                    placeholder="Card Number"
                    maxLength={16}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      maxLength={5}
                      className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      maxLength={3}
                      className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 p-4 border border-border rounded-lg hover:bg-secondary transition-colors cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="mt-1 w-4 h-4"
              />
              <span className="text-sm">
                I agree to the Terms & Conditions and Privacy Policy
              </span>
            </label>

            {/* Place Order Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isProcessing ? "Processing..." : `Place Order - ৳ ${total}`}
            </button>
          </form>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-secondary rounded-lg p-6 border border-border sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 mb-4 pb-4 border-b border-border max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span>
                      {item.product.name.substring(0, 20)}... x {item.quantity}
                    </span>
                    <span className="font-semibold">
                      ৳ {item.product.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>৳ {subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className={shippingCost === 0 ? "text-accent" : ""}>
                    {shippingCost === 0 ? "Free" : `৳ ${shippingCost}`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center text-lg font-bold p-4 bg-card rounded-lg">
                <span>Total</span>
                <span className="text-primary">৳ {total}</span>
              </div>

              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-xs text-green-700 dark:text-green-300">
                  ✓ Your order is secure and encrypted
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
