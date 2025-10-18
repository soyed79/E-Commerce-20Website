import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Heart,
  Bell,
  Menu,
  X,
  Moon,
  Sun,
  LogOut,
  User,
} from "lucide-react";
import { getCart, getWishlist, getTheme, setTheme, getCurrentUser, setCurrentUser, getLanguage, setLanguage } from "@/lib/storage";
import { productCategories } from "@/lib/products";

export default function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [theme, setThemeState] = useState<"light" | "dark">(getTheme());
  const [language, setLanguageState] = useState<"en" | "bn">(getLanguage());
  const [user, setUser] = useState(getCurrentUser());
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

  useEffect(() => {
    setCartCount(getCart().length);
    setWishlistCount(getWishlist().length);
    const handleStorageChange = () => {
      setCartCount(getCart().length);
      setWishlistCount(getWishlist().length);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setThemeState(newTheme);
  };

  const handleLanguageChange = (lang: "en" | "bn") => {
    setLanguage(lang);
    setLanguageState(lang);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUser(null);
    navigate("/");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setShowSearchSuggestions(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-card border-b border-border">
      {/* Top Navigation Bar */}
      <div className="bg-primary text-primary-foreground py-3">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex gap-6">
            <span>📞 +880 1800-123456</span>
            <span>✉️ support@easymart.bd</span>
          </div>
          <div className="flex gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => handleLanguageChange("en")}
                className={`${language === "en" ? "font-bold" : "opacity-70"}`}
              >
                EN
              </button>
              <span className="opacity-50">|</span>
              <button
                onClick={() => handleLanguageChange("bn")}
                className={`${language === "bn" ? "font-bold" : "opacity-70"}`}
              >
                BN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-6 mb-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="text-3xl font-bold text-primary flex items-center gap-2">
              🛒 Easy Mart
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchSuggestions(e.target.value.length > 0);
              }}
              className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:text-primary"
            >
              <Search size={20} />
            </button>
          </form>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleThemeToggle}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
              title="Toggle dark mode"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <Link
              to="/wishlist"
              className="relative p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <button className="p-2 hover:bg-secondary rounded-lg transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 bg-destructive text-destructive-foreground w-3 h-3 rounded-full"></span>
            </button>

            {user ? (
              <div className="relative group">
                <button className="p-2 hover:bg-secondary rounded-lg transition-colors flex items-center gap-2">
                  <User size={20} />
                  <span className="text-sm">{user.name.split(" ")[0]}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg hidden group-hover:block">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-secondary rounded-t-lg transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-secondary rounded-b-lg transition-colors text-destructive flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                Login
              </Link>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-secondary rounded-lg"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <div className="relative group">
            <button className="py-2 text-foreground hover:text-primary transition-colors flex items-center gap-1">
              Categories
              <span className="text-xs">▼</span>
            </button>
            <div className="absolute left-0 mt-0 w-64 bg-card border border-border rounded-lg shadow-lg hidden group-hover:block">
              {productCategories.map((category) => (
                <Link
                  key={category.name}
                  to={`/category/${encodeURIComponent(category.name)}`}
                  className="block px-4 py-3 hover:bg-secondary transition-colors border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{category.emoji}</span>
                    <span className="font-medium">{category.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <Link to="/" className="py-2 text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/deals" className="py-2 text-foreground hover:text-primary transition-colors">
            Deals
          </Link>
          <Link to="/blog" className="py-2 text-foreground hover:text-primary transition-colors">
            Blog
          </Link>
          <Link to="/faq" className="py-2 text-foreground hover:text-primary transition-colors">
            FAQ
          </Link>
          <Link to="/contact" className="py-2 text-foreground hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>

        {/* Search Bar - Mobile */}
        <form onSubmit={handleSearch} className="md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchSuggestions(e.target.value.length > 0);
              }}
              className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:text-primary"
            >
              <Search size={20} />
            </button>
          </div>
        </form>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <button
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              className="w-full text-left font-semibold flex justify-between items-center py-2"
            >
              Categories <span>{isCategoriesOpen ? "▲" : "▼"}</span>
            </button>
            {isCategoriesOpen && (
              <div className="pl-4 space-y-2">
                {productCategories.map((category) => (
                  <Link
                    key={category.name}
                    to={`/category/${encodeURIComponent(category.name)}`}
                    className="block py-2 text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="mr-2">{category.emoji}</span>
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
            <Link
              to="/"
              className="block py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/deals"
              className="block py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Deals
            </Link>
            <Link
              to="/blog"
              className="block py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/faq"
              className="block py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link
              to="/contact"
              className="block py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
