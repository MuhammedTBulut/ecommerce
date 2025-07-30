import { HeroSection } from '@/components/home/hero-section';
import { FeaturedProducts } from '@/components/home/featured-products';
import { CategoryGrid } from '@/components/home/category-grid';
import { NewProducts } from '@/components/home/new-products';
import { Newsletter } from '@/components/home/newsletter';

export default function Home() {
  return (
    <div className="space-y-16">
      <HeroSection />
      <FeaturedProducts />
      <CategoryGrid />
      <NewProducts />
      <Newsletter />
    </div>
  );
}
