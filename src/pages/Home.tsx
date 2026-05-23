import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Gift, Truck, HeartHandshake, Sparkles, Palette, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { ProductWithCategory } from '../lib/supabase';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<ProductWithCategory[]>([]);
  const [bestsellers, setBestsellers] = useState<ProductWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewIndex, setReviewIndex] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*, categories(*)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) {
        setFeaturedProducts((data as ProductWithCategory[]).filter((p) => p.featured).slice(0, 4));
        setBestsellers((data as ProductWithCategory[]).filter((p) => p.bestseller).slice(0, 4));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const reviews = [
    {
      name: 'Priya S.',
      text: 'The personalized photo frame exceeded all my expectations! My mom cried happy tears when she saw it. The quality is exceptional.',
      product: 'Personalized Photo Frame',
      rating: 5,
    },
    {
      name: 'Rahul M.',
      text: 'Got the bridesmaid proposal boxes for my wedding. All my bridesmaids said yes and loved the boxes! The attention to detail is amazing.',
      product: 'Bridesmaid Proposal Box',
      rating: 5,
    },
    {
      name: 'Anita K.',
      text: 'The wine glasses were the perfect anniversary gift. The engraving was beautiful and arrived so quickly! Will definitely order again.',
      product: 'Personalized Wine Glasses',
      rating: 5,
    },
    {
      name: 'Megha T.',
      text: 'Ordered custom gifts for my team. The quality and packaging were top-notch. Great customer service too!',
      product: 'Custom Gift Set',
      rating: 5,
    },
  ];

  const nextReview = () => {
    setReviewIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative">
        <Link to="/products">
          <img
            src="https://images.pexels.com/photos/1660030/pexels-photo-1660030.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Craftopia Love Collection"
            className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-burgundy/40 flex items-center justify-center">
            <div className="text-center text-white">
              <p className="text-sm tracking-widest uppercase mb-2">Handcrafted with Love</p>
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold mb-4">Your Pinterest Inspo,<br />Our Handmade Touch!</h1>
              <p className="text-lg mb-6">Discover personalized gifts that tell your story</p>
              <span className="inline-block bg-white text-burgundy px-8 py-3 rounded-full font-medium hover:bg-cream-100 transition-colors">
                Shop Collection
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* Secondary Banner */}
      <section className="bg-cream-100 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Link to="/products" className="flex items-center justify-center gap-4">
            <img
              src="https://images.pexels.com/photos/4226256/pexels-photo-4226256.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="New Collection"
              className="w-32 h-32 object-cover rounded-lg"
            />
            <div>
              <p className="text-sm text-burgundy font-medium">New Arrival</p>
              <h2 className="font-serif text-2xl text-gray-900">Handcrafted Collection</h2>
              <p className="text-gray-600">From Our Studio to You</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-burgundy text-sm tracking-widest uppercase mb-2">Handpicked for you</p>
            <h2 className="font-serif text-3xl md:text-4xl text-gray-900">Featured Collection</h2>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-gray-200 rounded-lg mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Customer Favourites */}
      <section className="py-16 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-burgundy text-sm tracking-widest uppercase mb-2">Best Sellers</p>
            <h2 className="font-serif text-3xl md:text-4xl text-gray-900">Customer Favourites</h2>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-gray-200 rounded-lg mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {bestsellers.map((product) => (
                <ProductCard key={product.id} product={product} showBadge />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Founder Message */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/4226256/pexels-photo-4226256.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Our Founder"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <p className="text-burgundy text-sm tracking-widest uppercase mb-4">From the Founder</p>
              <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-6">A Note from Craftopia Love</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                "Thank you for being here! What started as a passion for creating meaningful gifts has grown into a community of people who believe in the power of thoughtful giving.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Each piece in our collection is designed with intention and crafted with care. We believe that the best gifts are the ones that connect hearts and create lasting memories.
              </p>
              <p className="font-serif text-xl text-gray-900">
                With love, from our studio to your home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pinterest Callout */}
      <section className="bg-burgundy py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Palette className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">Your Pinterest Inspo, Our Handmade Touch!</h2>
          <p className="text-white/80 mb-6">Send us your Pinterest board and we'll create something special just for you</p>
          <Link to="/contact" className="inline-block bg-white text-burgundy px-8 py-3 rounded-full font-medium hover:bg-cream-100 transition-colors">
            Contact Us
          </Link>
        </div>
      </section>

      {/* Features Highlights */}
      <section className="py-16 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            <div className="text-center">
              <div className="bg-white w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 shadow-sm">
                <Gift className="w-8 h-8 text-burgundy" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">One-of-a-kind</h3>
              <p className="text-sm text-gray-600">Creations</p>
            </div>
            <div className="text-center">
              <div className="bg-white w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 shadow-sm">
                <HeartHandshake className="w-8 h-8 text-burgundy" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Thoughtful</h3>
              <p className="text-sm text-gray-600">Gifting</p>
            </div>
            <div className="text-center">
              <div className="bg-white w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 shadow-sm">
                <Sparkles className="w-8 h-8 text-burgundy" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Aesthetic</h3>
              <p className="text-sm text-gray-600">Always</p>
            </div>
            <div className="text-center">
              <div className="bg-white w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 shadow-sm">
                <Truck className="w-8 h-8 text-burgundy" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Safe</h3>
              <p className="text-sm text-gray-600">Packaging</p>
            </div>
            <div className="text-center">
              <div className="bg-white w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 shadow-sm">
                <Palette className="w-8 h-8 text-burgundy" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Handmade &</h3>
              <p className="text-sm text-gray-600">Personalised</p>
            </div>
            <div className="text-center">
              <div className="bg-white w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 shadow-sm">
                <Heart className="w-8 h-8 text-burgundy" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Made with</h3>
              <p className="text-sm text-gray-600">Love</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Carousel */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-burgundy text-sm tracking-widest uppercase mb-2">Testimonials</p>
            <h2 className="font-serif text-3xl md:text-4xl text-gray-900">What Our Customers Say</h2>
            <p className="text-gray-600 mt-2">{reviews.length} Reviews</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-cream-100 rounded-lg shadow-sm p-8 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 text-lg mb-6">"{reviews[reviewIndex].text}"</p>
              <p className="font-medium text-gray-900">{reviews[reviewIndex].name}</p>
              <p className="text-sm text-gray-500">Purchased: {reviews[reviewIndex].product}</p>
            </div>

            <div className="flex justify-center items-center gap-4 mt-6">
              <button onClick={prevReview} className="p-2 rounded-full border hover:bg-cream-100 transition-colors">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex gap-2">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setReviewIndex(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${i === reviewIndex ? 'bg-burgundy' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
              <button onClick={nextReview} className="p-2 rounded-full border hover:bg-cream-100 transition-colors">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-12 bg-cream-100 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <MessageCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h2 className="font-serif text-2xl text-gray-900 mb-2">Need Customization?</h2>
          <p className="text-gray-600 mb-6">Drop your WhatsApp number and we'll reach out within 24 hours!</p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center max-w-md mx-auto">
            <input
              type="tel"
              placeholder="Enter your WhatsApp number"
              className="flex-1 input-field"
            />
            <button className="btn-primary">Submit</button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product, showBadge = false }: { product: ProductWithCategory; showBadge?: boolean }) {
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
        {showBadge && (
          <span className="absolute top-3 left-3 bg-burgundy text-white text-xs px-2 py-1 rounded-full font-medium">
            Most Loved
          </span>
        )}
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
      {product.gift_packaging_available && (
        <p className="text-xs text-gray-500 mt-1">Gift packaging available</p>
      )}
    </Link>
  );
}
