import { ReactNode, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { getTheme } from "@/lib/storage";

export default function Layout({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Apply theme on mount
    const theme = getTheme();
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
