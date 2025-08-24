import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Category } from "@/types";

// Mock data - replace with actual API call
const mockCategories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    description: "Latest gadgets and tech accessories",
    image: "/placeholder-category.jpg",
  },
  {
    id: "2",
    name: "Fashion",
    description: "Trendy clothing and accessories",
    image: "/placeholder-category.jpg",
  },
  {
    id: "3",
    name: "Home & Garden",
    description: "Everything for your home and garden",
    image: "/placeholder-category.jpg",
  },
  {
    id: "4",
    name: "Sports & Fitness",
    description: "Gear up for your active lifestyle",
    image: "/placeholder-category.jpg",
  },
  {
    id: "5",
    name: "Beauty & Health",
    description: "Personal care and wellness products",
    image: "/placeholder-category.jpg",
  },
  {
    id: "6",
    name: "Books & Media",
    description: "Books, movies, and entertainment",
    image: "/placeholder-category.jpg",
  },
];

export function CategoryGrid() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our diverse range of categories and find exactly what you&apos;re looking for.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {mockCategories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="group"
            >
              <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                <CardContent className="p-0">
                  {/* Category Image */}
                  <div className="aspect-square bg-muted relative overflow-hidden">
                    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10 transition-colors">
                      <div className="text-center space-y-2">
                        <div className="h-12 w-12 rounded-full bg-primary/20 mx-auto flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                          <div className="h-6 w-6 rounded-full bg-primary/40" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Category Info */}
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-sm lg:text-base mb-1 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-xs lg:text-sm text-muted-foreground line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}