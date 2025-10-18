import { useParams, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategory, productCategories } from "@/lib/products";

export default function Category() {
  const { name } = useParams<{ name: string }>();
  const categoryName = name ? decodeURIComponent(name) : "";
  const products = getProductsByCategory(categoryName);
  const category = productCategories.find((c) => c.name === categoryName);

  if (!category) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The category you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90"
          >
            Back to Home
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/" className="text-primary hover:underline">
            Home
          </Link>
          <ChevronRight size={16} />
          <span className="text-muted-foreground">{categoryName}</span>
        </div>
      </div>

      {/* Category Header */}
      <div
        className="py-12 text-center text-white"
        style={{
          background: `linear-gradient(135deg, ${category.color}, ${category.color}dd)`,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="text-6xl mb-4">{category.emoji}</div>
          <h1 className="text-4xl font-bold mb-2">{categoryName}</h1>
          <p className="text-lg opacity-90">
            Showing {products.length} products
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-12">
        {products.length > 0 ? (
          <>
            <div className="mb-8 flex justify-between items-center">
              <h2 className="text-2xl font-bold">All Products</h2>
              <div className="flex gap-4">
                <select className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background">
                  <option>Sort by: Latest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Most Popular</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
