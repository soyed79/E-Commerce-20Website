import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { CheckCircle, Package, MapPin, Phone, Mail, Download } from "lucide-react";
import Layout from "@/components/Layout";
import { getOrders } from "@/lib/storage";
import { Order } from "@/lib/products";

export default function OrderConfirmation() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (id) {
      const orders = getOrders();
      const found = orders.find((o) => o.id === id);
      if (found) {
        setOrder(found);
      } else {
        navigate("/");
      }
    }
  }, [id, navigate]);

  if (!order) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Success Banner */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-8 text-center mb-8">
            <CheckCircle size={64} className="mx-auto text-green-600 mb-4" />
            <h1 className="text-4xl font-bold mb-2 text-green-700 dark:text-green-300">
              Order Confirmed!
            </h1>
            <p className="text-green-600 dark:text-green-400 text-lg">
              Thank you for your purchase. Your order has been received.
            </p>
          </div>

          {/* Order Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Order Info */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Package size={20} />
                  Order Information
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Order ID</span>
                    <span className="font-semibold">{order.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-semibold">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Method</span>
                    <span className="font-semibold capitalize">
                      {order.paymentMethod === "cod"
                        ? "Cash on Delivery"
                        : order.paymentMethod === "bkash"
                          ? "bKash"
                          : "Card"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs font-semibold">
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <MapPin size={20} />
                  Shipping Address
                </h2>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold">{order.shippingAddress.name}</p>
                  <p className="text-muted-foreground">{order.shippingAddress.address}</p>
                  <p className="text-muted-foreground">
                    {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                  </p>
                  <div className="flex items-center gap-2 text-muted-foreground mt-3 pt-3 border-t border-border">
                    <Phone size={16} />
                    <span>{order.shippingAddress.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail size={16} />
                    <span>{order.shippingAddress.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Order Items */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-bold mb-4">Order Items ({order.items.length})</h2>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {order.items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex justify-between items-center py-2 border-b border-border last:border-0"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          x {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold text-sm">
                        ৳ {item.product.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-primary text-primary-foreground rounded-lg p-6">
                <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4 pb-4 border-b border-primary-foreground/20">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>৳ {order.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>
                      {order.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0) > 500
                        ? "Free"
                        : "৳ 80"}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span>৳ {order.total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-3">What's Next?</h3>
            <ol className="space-y-2 text-sm text-blue-800 dark:text-blue-200 list-decimal list-inside">
              <li>We'll prepare your order for shipment</li>
              <li>You'll receive a tracking number via email and SMS</li>
              <li>Your package will be delivered within 2-3 business days</li>
              <li>Check your dashboard anytime to track your order</li>
            </ol>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex items-center justify-center gap-2 bg-secondary text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-muted transition-colors">
              <Download size={20} />
              Download Receipt
            </button>
            <Link
              to="/dashboard"
              className="flex-1 text-center bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              View My Orders
            </Link>
            <Link
              to="/"
              className="flex-1 text-center bg-secondary text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-muted transition-colors"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Contact Support */}
          <div className="mt-8 p-6 bg-secondary rounded-lg text-center">
            <p className="text-sm text-muted-foreground">
              Need help? Contact our support team at{" "}
              <a
                href="mailto:support@easymart.bd"
                className="text-primary font-semibold hover:underline"
              >
                support@easymart.bd
              </a>{" "}
              or call{" "}
              <a href="tel:+8801800123456" className="text-primary font-semibold hover:underline">
                +880 1800-123456
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
