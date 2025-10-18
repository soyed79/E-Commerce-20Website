import { Link } from "react-router-dom";
import {
  Mail,
  MapPin,
  Phone,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
} from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter Section */}
        <div className="bg-primary text-primary-foreground rounded-lg p-8 mb-12">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-bold mb-2">
              Subscribe to Our Newsletter
            </h3>
            <p className="mb-4 opacity-90">
              Get exclusive deals, new product launches, and shopping tips
              delivered to your inbox!
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
              <button
                type="submit"
                className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Subscribe
              </button>
            </form>
            {subscribed && (
              <p className="mt-2 text-sm opacity-90">
                ✓ Thank you for subscribing!
              </p>
            )}
          </div>
        </div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-primary">
              🛒 Easy Mart
            </h4>
            <p className="text-muted-foreground mb-4">
              Your trusted online shopping destination for quality products at
              great prices.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm">
                <Phone size={16} className="mt-1 flex-shrink-0" />
                <span>+880 1800-123456</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Mail size={16} className="mt-1 flex-shrink-0" />
                <span>support@easymart.bd</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/deals"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Deals & Offers
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/faq"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4 mb-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-secondary hover:bg-primary text-foreground hover:text-primary-foreground rounded-lg transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-secondary hover:bg-primary text-foreground hover:text-primary-foreground rounded-lg transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-secondary hover:bg-primary text-foreground hover:text-primary-foreground rounded-lg transition-colors"
              >
                <Youtube size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-secondary hover:bg-primary text-foreground hover:text-primary-foreground rounded-lg transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>

            <h4 className="text-sm font-semibold mb-3">We Accept</h4>
            <div className="flex gap-2 text-2xl">
              <span title="Cash on Delivery">💵</span>
              <span title="bKash">📱</span>
              <span title="Card">💳</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center md:text-left">
              <h5 className="font-semibold mb-1">🚚 Free Delivery</h5>
              <p className="text-sm text-muted-foreground">
                On orders over ৳ 500
              </p>
            </div>
            <div className="text-center">
              <h5 className="font-semibold mb-1">🔒 Secure Payment</h5>
              <p className="text-sm text-muted-foreground">
                100% secure transactions
              </p>
            </div>
            <div className="text-center md:text-right">
              <h5 className="font-semibold mb-1">🔄 Easy Returns</h5>
              <p className="text-sm text-muted-foreground">
                30-day return policy
              </p>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 Easy Mart. All rights reserved.</p>
            <p className="mt-2">
              Made with ❤️ for Bangladesh | Privacy Policy • Terms & Conditions
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
