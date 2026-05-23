import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-cream-100">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/category/:slug" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={<CheckoutPlaceholder />} />
            <Route path="/account" element={<AccountPlaceholder />} />
            <Route path="/about" element={<AboutPlaceholder />} />
            <Route path="/faq" element={<FAQPlaceholder />} />
            <Route path="/shipping" element={<ShippingPlaceholder />} />
            <Route path="/returns" element={<ReturnsPlaceholder />} />
            <Route path="/contact" element={<ContactPlaceholder />} />
            <Route path="/privacy" element={<PrivacyPlaceholder />} />
            <Route path="/terms" element={<TermsPlaceholder />} />
            <Route path="/bulk-orders" element={<BulkOrdersPlaceholder />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

function CheckoutPlaceholder() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="font-serif text-4xl text-gray-900 mb-4">Checkout</h1>
        <p className="text-gray-600">Coming soon</p>
      </div>
    </div>
  );
}

function AccountPlaceholder() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="font-serif text-4xl text-gray-900 mb-4">My Account</h1>
        <p className="text-gray-600">Coming soon</p>
      </div>
    </div>
  );
}

function AboutPlaceholder() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="font-serif text-5xl text-gray-900 mb-8">Our Story</h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Craftopia Love was born from a simple belief: that the best gifts are the ones that come
          from the heart. We create handcrafted, personalized gifts that help you celebrate life's
          special moments with your loved ones.
        </p>
      </div>
    </div>
  );
}

function FAQPlaceholder() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="font-serif text-5xl text-gray-900 mb-8 text-center">Frequently Asked Questions</h1>
        <p className="text-gray-600 text-center">Coming soon</p>
      </div>
    </div>
  );
}

function ShippingPlaceholder() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="font-serif text-5xl text-gray-900 mb-8 text-center">Shipping Information</h1>
        <p className="text-gray-600 text-center">Free shipping on orders over Rs 999. International shipping to 30+ countries.</p>
      </div>
    </div>
  );
}

function ReturnsPlaceholder() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="font-serif text-5xl text-gray-900 mb-8 text-center">Returns & Refunds</h1>
        <p className="text-gray-600 text-center">Coming soon</p>
      </div>
    </div>
  );
}

function ContactPlaceholder() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="font-serif text-5xl text-gray-900 mb-8 text-center">Contact Us</h1>
        <p className="text-gray-600 text-center">Email: love.craftopia@gmail.com | Phone: +91 9052508389</p>
      </div>
    </div>
  );
}

function PrivacyPlaceholder() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="font-serif text-5xl text-gray-900 mb-8 text-center">Privacy Policy</h1>
        <p className="text-gray-600 text-center">Coming soon</p>
      </div>
    </div>
  );
}

function TermsPlaceholder() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="font-serif text-5xl text-gray-900 mb-8 text-center">Terms of Service</h1>
        <p className="text-gray-600 text-center">Coming soon</p>
      </div>
    </div>
  );
}

function BulkOrdersPlaceholder() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="font-serif text-5xl text-gray-900 mb-8">Bulk Orders</h1>
        <p className="text-gray-600">For bulk orders and corporate gifting, please contact us at love.craftopia@gmail.com</p>
      </div>
    </div>
  );
}

export default App;
