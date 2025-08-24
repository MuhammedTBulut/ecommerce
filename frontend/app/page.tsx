import { HeroSection } from "@/components/home/hero-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { CategoryGrid } from "@/components/home/category-grid";
import { LatestProducts } from "@/components/home/latest-products";
import { Newsletter } from "@/components/home/newsletter";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturedProducts />
      <CategoryGrid />
      <LatestProducts />
      <Newsletter />
    </div>
  );
}
