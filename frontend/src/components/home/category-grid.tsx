import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    image: '/api/placeholder/400/300',
    description: 'Latest gadgets and tech',
    productCount: 1250
  },
  {
    id: '2',
    name: 'Fashion',
    slug: 'fashion',
    image: '/api/placeholder/400/300',
    description: 'Trendy clothing and accessories',
    productCount: 2100
  },
  {
    id: '3',
    name: 'Home & Garden',
    slug: 'home-garden',
    image: '/api/placeholder/400/300',
    description: 'Everything for your home',
    productCount: 980
  },
  {
    id: '4',
    name: 'Sports & Fitness',
    slug: 'sports-fitness',
    image: '/api/placeholder/400/300',
    description: 'Gear for active lifestyle',
    productCount: 750
  },
  {
    id: '5',
    name: 'Beauty & Health',
    slug: 'beauty-health',
    image: '/api/placeholder/400/300',
    description: 'Wellness and beauty products',
    productCount: 640
  },
  {
    id: '6',
    name: 'Books & Media',
    slug: 'books-media',
    image: '/api/placeholder/400/300',
    description: 'Knowledge and entertainment',
    productCount: 1320
  }
];

export function CategoryGrid() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our diverse range of product categories and find exactly what you&apos;re looking for.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group block"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                  
                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-200 mb-2">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-300">
                        {category.productCount.toLocaleString()} products
                      </span>
                      <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}