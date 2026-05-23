import { Link } from 'react-router-dom';
import { Heart, Instagram, Facebook, Youtube, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-burgundy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-white" fill="currentColor" />
              <span className="font-serif text-xl font-bold text-white">Craftopia Love</span>
            </Link>
            <p className="text-white/80 leading-relaxed">
              Each piece is meaningfully created with love, care, and creativity.
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white hover:text-burgundy transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white hover:text-burgundy transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white hover:text-burgundy transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-white/70 transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-white/70 transition-colors">Shop</Link></li>
              <li><Link to="/products?filter=bestseller" className="hover:text-white/70 transition-colors">Best Sellers</Link></li>
              <li><Link to="/about" className="hover:text-white/70 transition-colors">Our Story</Link></li>
              <li><Link to="/bulk-orders" className="hover:text-white/70 transition-colors">Bulk Orders</Link></li>
              <li><Link to="/contact" className="hover:text-white/70 transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="hover:text-white/70 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-semibold text-white mb-6">Policies</h3>
            <ul className="space-y-3">
              <li><Link to="/returns" className="hover:text-white/70 transition-colors">Refund Policy</Link></li>
              <li><Link to="/shipping" className="hover:text-white/70 transition-colors">Shipping Policy</Link></li>
              <li><Link to="/privacy" className="hover:text-white/70 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white/70 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-white/80 mt-0.5" />
                <div>
                  <p className="text-white">+91 9052508389</p>
                  <p className="text-sm text-white/60">Mon-Sat, 10am-7pm IST</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-white/80 mt-0.5" />
                <div>
                  <p className="text-white">love.craftopia@gmail.com</p>
                  <p className="text-sm text-white/60">We reply within 24 hours</p>
                </div>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-white/10 rounded-lg">
              <p className="text-sm font-medium text-white mb-1">Need Customization?</p>
              <p className="text-sm text-white/70">Drop your WhatsApp number and we'll reach out within 24 hours!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-white/60">
            &copy; {new Date().getFullYear()} Craftopia Love. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
