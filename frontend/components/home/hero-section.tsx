import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-background">
      <div className="container mx-auto px-4 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Discover Premium
                <span className="text-primary block">Quality Products</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-md">
                Shop the latest trends with fast shipping, excellent customer service, 
                and unbeatable prices. Your perfect shopping experience starts here.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/categories">
                  Browse Categories
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div>
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div>
                <div className="text-2xl font-bold">5K+</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div>
                <div className="text-2xl font-bold">99%</div>
                <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 p-8">
              <div className="h-full w-full rounded-2xl bg-muted flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="h-32 w-32 rounded-full bg-primary/20 mx-auto flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full bg-primary/40" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Hero Image Placeholder
                    <br />
                    (Replace with actual product image)
                  </p>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-2xl bg-primary/10 backdrop-blur-sm flex items-center justify-center">
              <span className="text-sm font-semibold">✨ New</span>
            </div>
            <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-xl bg-secondary/80 backdrop-blur-sm flex items-center justify-center">
              <span className="text-xs font-semibold">🔥 Sale</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}