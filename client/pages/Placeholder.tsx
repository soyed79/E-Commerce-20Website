import { useLocation, Link } from "react-router-dom";
import Layout from "@/components/Layout";

export default function Placeholder() {
  const location = useLocation();
  const pageName =
    location.pathname
      .split("/")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ") || "Page";

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold mb-4">{pageName}</h1>
          <p className="text-muted-foreground text-lg mb-8">
            This page is coming soon! Let us know if you'd like us to prioritize
            it.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/"
              className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90"
            >
              Back to Home
            </Link>
            <Link
              to="/contact"
              className="inline-block bg-secondary text-foreground px-6 py-3 rounded-lg hover:bg-muted"
            >
              Request Feature
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
