import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Star, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { ProductWithCategory } from '../lib/supabase';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const [loading, setLoading] = useState(true);

  const categorySlug = searchParams.get('category') || '';

  useEffect(() => {
    fetchProducts();
  }, [categorySlug]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let query = supabase.from('products').select('*, categories(*)');

      if (categorySlug) {
        query = query.ilike('category_id', categorySlug);
      }

      const { data } = await query.order('created_at', { ascending: false });
      if (data) setProducts(data as ProductWithCategory[]);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-cream-100 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-burgundy">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900">All Products</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="font-serif text-3xl text-gray-900 mb-8 text-center">All Products</h1>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600">No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: ProductWithCategory }) {
  const discount = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0;

  return (
    <Link to={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-lg mb-4 bg-gray-100">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {discount > 0 && (
          <span className="absolute top-3 right-3 bg-gray-900 text-white text-xs px-2 py-1 rounded-full font-medium">
            {discount}% OFF
          </span>
        )}
      </div>
      <h3 className="font-medium text-gray-900 group-hover:text-burgundy transition-colors mb-1">
        {product.name}
      </h3>
      <div className="flex items-center gap-2 text-sm">
        <span className="font-bold text-gray-900">Rs. {product.price.toFixed(0)}</span>
        {product.compare_at_price && (
          <span className="text-gray-400 line-through">Rs. {product.compare_at_price.toFixed(0)}</span>
        )}
      </div>
    </Link>
  );
}
