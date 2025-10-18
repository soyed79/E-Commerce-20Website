import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Zap, Truck, Shield, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import {
  getProducts,
  productCategories,
  getProductsByCategory,
} from "@/lib/products";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState(getProducts());

  const heroSlides = [
    {
      id: 1,
      title: "Summer Sale!",
      subtitle: "Up to 50% off on selected items",
      cta: "Shop Now",
      image:
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=400&fit=crop",
      color: "from-orange-400 to-red-500",
    },
    {
      id: 2,
      title: "New Arrivals",
      subtitle: "Check out the latest products",
      cta: "Explore",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=400&fit=crop",
      color: "from-blue-400 to-purple-500",
    },
    {
      id: 3,
      title: "Flash Deals",
      subtitle: "Limited time offers on top brands",
      cta: "View Deals",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=1200&h=400&fit=crop",
      color: "from-green-400 to-emerald-500",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Truck size={32} />,
      title: "Free Delivery",
      description: "On orders over ৳ 500",
    },
    {
      icon: <Shield size={32} />,
      title: "Secure Payment",
      description: "100% secure transactions",
    },
    {
      icon: <Clock size={32} />,
      title: "24/7 Support",
      description: "Dedicated customer service",
    },
    {
      icon: <Zap size={32} />,
      title: "Fast Shipping",
      description: "Delivered within 2-3 days",
    },
  ];

  return (
    <Layout>
      {/* Hero Carousel */}
      <section className="relative h-96 overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-xl mb-6">{slide.subtitle}</p>
                <Link
                  to="/deals"
                  className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Controls */}
        <button
          onClick={() =>
            setCurrentSlide(
              (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
            )
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
        >
          ←
        </button>
        <button
          onClick={() =>
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
        >
          →
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? "bg-white w-8" : "bg-white/50 w-2"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-6 text-center border border-border hover:shadow-lg transition-shadow"
              >
                <div className="text-primary mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Shop by Category
        </h2>

        {/* Category Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {productCategories.map((category) => (
            <Link
              key={category.name}
              to={`/category/${encodeURIComponent(category.name)}`}
              className="relative h-48 rounded-lg overflow-hidden group cursor-pointer"
              style={{
                backgroundColor: category.color,
              }}
            >
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-3">{category.emoji}</div>
                  <h3 className="font-bold text-lg">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Products from Each Category */}
        {productCategories.map((category) => {
          const categoryProducts = getProductsByCategory(category.name).slice(
            0,
            5,
          );
          return (
            <div key={category.name} className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold">
                  {category.emoji} {category.name}
                </h3>
                <Link
                  to={`/category/${encodeURIComponent(category.name)}`}
                  className="text-primary font-semibold hover:underline flex items-center gap-1"
                >
                  View All <ChevronRight size={20} />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {categoryProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Testimonials Section */}
      <section className="bg-secondary py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            What Our Customers Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Fatima Hassan",
                rating: 5,
                text: "Amazing quality products and super fast delivery! Will definitely shop again.",
              },
              {
                name: "Karim Ahmed",
                rating: 5,
                text: "Easy Mart has the best prices in town. Their customer service is excellent!",
              },
              {
                name: "Aisha Khan",
                rating: 5,
                text: "Great variety of products. Easy returns and refunds. Highly recommended!",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-6 border border-border"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ⭐
                    </span>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "{testimonial.text}"
                </p>
                <p className="font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-lg mb-6 opacity-90">
            Discover thousands of products at unbeatable prices!
          </p>
          <Link
            to="/category/Fashion and Clothing"
            className="inline-block bg-accent text-accent-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Browse Products
          </Link>
        </div>
      </section>
    </Layout>
  );
}
