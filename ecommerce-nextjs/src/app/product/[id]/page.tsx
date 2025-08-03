'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { productService } from '@/services';
import { Product } from '@/types';
import EnhancedHeader from '@/components/Header/EnhancedHeader';
import ProductReviews from '@/components/ProductReviews/ProductReviews';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { addToCart, isInCart, getCartItem } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const productId = params.id ? parseInt(params.id as string) : null;

  useEffect(() => {
    if (productId) {
      fetchProduct();
      fetchRelatedProducts();
    }
  }, [productId]);

  const fetchProduct = async () => {
    if (!productId) return;
    
    setLoading(true);
    try {
      const productData = await productService.getProductById(productId);
      setProduct(productData);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Product not found');
      router.push('/shop');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async () => {
    if (!productId) return;
    
    try {
      const related = await productService.getRelatedProducts(productId);
      setRelatedProducts(related.slice(0, 4)); // Show only 4 related products
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }

    if (!product) return;

    setAddingToCart(true);
    try {
      await addToCart(product.id, quantity);
      toast.success(`Added ${quantity} item(s) to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <EnhancedHeader />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-square bg-gray-300 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                <div className="h-32 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <EnhancedHeader />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">❌</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Product not found</h3>
            <p className="text-gray-500 mb-4">The product you're looking for doesn't exist</p>
            <Link
              href="/shop"
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const cartItem = getCartItem(product.id);
  const totalInCart = cartItem ? cartItem.quantity : 0;

  // Mock multiple images for demonstration
  const productImages = product.imageUrl 
    ? [product.imageUrl, product.imageUrl, product.imageUrl] 
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <EnhancedHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-gray-900">Shop</Link>
          <span>/</span>
          <Link href={`/categories/${product.categoryId}`} className="hover:text-gray-900">
            {product.category.name}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              {productImages.length > 0 ? (
                <img 
                  src={productImages[selectedImage]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-6xl">
                  📦
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {productImages.length > 1 && (
              <div className="flex space-x-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-orange-500 ring-2 ring-orange-200' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Price */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-orange-600">
                  ${product.price.toFixed(2)}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.stock > 0 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
              </div>
            </div>

            {/* Category */}
            <div>
              <span className="text-sm text-gray-500">Category: </span>
              <Link 
                href={`/categories/${product.categoryId}`}
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                {product.category.name}
              </Link>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity and Add to Cart */}
            {product.stock > 0 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={decrementQuantity}
                        disabled={quantity <= 1}
                        className="px-3 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                      <button
                        onClick={incrementQuantity}
                        disabled={quantity >= product.stock}
                        className="px-3 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm text-gray-500">
                      Max: {product.stock}
                    </span>
                  </div>
                </div>

                {totalInCart > 0 && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <p className="text-sm text-orange-800">
                      You already have {totalInCart} of this item in your cart
                    </p>
                  </div>
                )}

                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={addingToCart || !isAuthenticated}
                    className="flex-1 px-6 py-3 bg-orange-600 text-white text-lg font-medium rounded-lg hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    {addingToCart ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Adding...
                      </div>
                    ) : !isAuthenticated ? (
                      'Login to Purchase'
                    ) : (
                      'Add to Cart'
                    )}
                  </button>
                  
                  <button className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                    ❤️ Wishlist
                  </button>
                </div>
              </div>
            )}

            {/* Product Features */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm text-gray-600">Free Shipping</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm text-gray-600">30-Day Returns</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm text-gray-600">Warranty Included</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm text-gray-600">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Reviews */}
        <div className="mb-16">
          <ProductReviews productId={product.id} />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/product/${relatedProduct.id}`}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                    {relatedProduct.imageUrl ? (
                      <img 
                        src={relatedProduct.imageUrl} 
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
                        📦
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-lg font-bold text-gray-900">
                      ${relatedProduct.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}