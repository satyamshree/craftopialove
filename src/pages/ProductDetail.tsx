import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Minus, Plus, ShoppingCart, Heart, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { ProductWithCategory } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<ProductWithCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [giftPackaging, setGiftPackaging] = useState(false);
  const [customizationText, setCustomizationText] = useState('');
  const [addingToCart, setAddingToCart] = useState(false);

  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*, categories(*)')
        .eq('slug', slug)
        .maybeSingle();

      if (error) throw error;
      if (data) setProduct(data as ProductWithCategory);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!product) return;

    setAddingToCart(true);
    try {
      await addToCart(product, quantity, giftPackaging, customizationText);
      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse grid lg:grid-cols-2 gap-12">
            <div className="aspect-square bg-gray-200 rounded-lg" />
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-2xl text-gray-900 mb-4">Product not found</h1>
          <Link to="/products" className="btn-primary">Browse Products</Link>
        </div>
      </div>
    );
  }

  const discount = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-cream-100 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-burgundy">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link to="/products" className="text-gray-500 hover:text-burgundy">Products</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Details */}
          <div>
            <h1 className="font-serif text-3xl text-gray-900 mb-4">{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                ))}
              </div>
              <span className="text-gray-600 text-sm">4.9</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl font-bold text-gray-900">Rs. {product.price.toFixed(0)}</span>
              {product.compare_at_price && (
                <>
                  <span className="text-gray-400 line-through">Rs. {product.compare_at_price.toFixed(0)}</span>
                  <span className="text-burgundy font-medium">{discount}% OFF</span>
                </>
              )}
            </div>

            <p className="text-gray-600 mb-8">{product.description}</p>

            {/* Customization */}
            {product.customization_available && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">Customization (Optional)</label>
                <input
                  type="text"
                  value={customizationText}
                  onChange={(e) => setCustomizationText(e.target.value)}
                  placeholder="Enter name or message to engrave..."
                  className="input-field"
                  maxLength={50}
                />
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-2">Quantity</label>
              <div className="flex items-center border rounded-lg w-fit">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-gray-100">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-gray-100">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Gift Packaging */}
            {product.gift_packaging_available && (
              <div className="mb-8">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={giftPackaging}
                    onChange={(e) => setGiftPackaging(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-burgundy focus:ring-burgundy/50"
                  />
                  <div>
                    <span className="font-medium text-gray-900">Add Gift Packaging</span>
                    <p className="text-sm text-gray-500">Beautiful gift wrap included</p>
                  </div>
                </label>
              </div>
            )}

            {/* Add to Cart */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={addingToCart}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                {addingToCart ? 'Adding...' : 'Add to Cart'}
              </button>
              <button className="p-3 border rounded-full hover:border-burgundy hover:text-burgundy transition-colors">
                <Heart className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
