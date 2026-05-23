import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Heart, Search, ChevronDown, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { itemCount } = useCart();
  const location = useLocation();

  const categories = [
    { name: 'Birthday', slug: 'birthday' },
    { name: 'Anniversary', slug: 'anniversary' },
    { name: 'Wedding', slug: 'wedding' },
    { name: 'For Her', slug: 'for-her' },
    { name: 'For Him', slug: 'for-him' },
    { name: 'Bride & Bridesmaids', slug: 'bride-bridesmaids' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Announcement Bar */}
      <div className="bg-burgundy text-white text-center py-2 text-sm">
        <span className="font-medium">FREE Shipping</span> on orders above <span className="font-bold">Rs. 999</span> | International shipping to 30+ countries
      </div>

      {/* Main Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-burgundy" fill="currentColor" />
              <span className="font-serif text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Craftopia Love</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {/* Shop Dropdown */}
              <div className="relative" onMouseEnter={() => setIsShopOpen(true)} onMouseLeave={() => setIsShopOpen(false)}>
                <button className="flex items-center gap-1 text-gray-700 hover:text-burgundy font-medium text-sm tracking-wide">
                  Shop
                  <ChevronDown className="w-4 h-4" />
                </button>
                {isShopOpen && (
                  <div className="absolute top-full left-0 bg-white shadow-xl rounded-lg py-4 w-56 border border-gray-100">
                    <div className="px-4 mb-2">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">By Occasion</p>
                    </div>
                    {['Birthday', 'Anniversary', 'Wedding'].map((item) => (
                      <Link key={item} to={`/category/${item.toLowerCase()}`} className="block px-4 py-2 hover:bg-cream-100 hover:text-burgundy text-sm text-gray-700">
                        {item}
                      </Link>
                    ))}
                    <div className="px-4 mt-3 mb-2">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">By Recipients</p>
                    </div>
                    {['For Her', 'For Him', 'Bride & Bridesmaids'].map((item) => (
                      <Link key={item} to={`/category/${item.toLowerCase().replace(' ', '-')}`} className="block px-4 py-2 hover:bg-cream-100 hover:text-burgundy text-sm text-gray-700">
                        {item}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link to="/products" className="text-gray-700 hover:text-burgundy font-medium text-sm tracking-wide">
                All Collections
              </Link>
              <Link to="/products?filter=bestseller" className="text-gray-700 hover:text-burgundy font-medium text-sm tracking-wide">
                Best Sellers
              </Link>
              <Link to="/products?price=under500" className="text-gray-700 hover:text-burgundy font-medium text-sm tracking-wide">
                Gifts Under Rs. 500
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-burgundy font-medium text-sm tracking-wide">
                Our Story
              </Link>
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Search className="w-5 h-5 text-gray-700" />
              </button>

              {user ? (
                <div className="flex items-center gap-2">
                  <Link to="/account" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <User className="w-5 h-5 text-gray-700" />
                  </Link>
                  <button onClick={signOut} className="hidden sm:block text-sm text-gray-600 hover:text-burgundy">
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link to="/login" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <User className="w-5 h-5 text-gray-700" />
                </Link>
              )}

              <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-burgundy text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                    {itemCount}
                  </span>
                )}
              </Link>

              <button className="hidden sm:flex items-center gap-1 p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Globe className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-6 space-y-1">
            <Link to="/products" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-700 hover:text-burgundy font-medium">
              All Collections
            </Link>
            <Link to="/products?filter=bestseller" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-700 hover:text-burgundy font-medium">
              Best Sellers
            </Link>
            <Link to="/products?price=under500" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-700 hover:text-burgundy font-medium">
              Gifts Under Rs. 500
            </Link>
            <div className="pt-4 pb-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Shop by Category</p>
            </div>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-gray-700 hover:text-burgundy"
              >
                {cat.name}
              </Link>
            ))}
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-700 hover:text-burgundy font-medium pt-4">
              Our Story
            </Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-700 hover:text-burgundy font-medium">
              Contact
            </Link>
            <Link to="/faq" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-700 hover:text-burgundy font-medium">
              FAQ
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
