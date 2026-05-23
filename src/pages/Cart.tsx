import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { user } = useAuth();
  const { items, loading, itemCount, subtotal, updateQuantity, removeFromCart } = useCart();

  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="font-serif text-3xl text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6">Please login to view your cart</p>
          <Link to="/login" className="btn-primary">Login to Continue</Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-burgundy" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="font-serif text-3xl text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6">Add some beautiful gifts to your cart</p>
          <Link to="/products" className="btn-primary">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="font-serif text-3xl text-gray-900 mb-8 text-center">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-6 flex gap-6">
                <Link to={`/product/${item.products?.slug}`} className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.products?.image_url} alt={item.products?.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1">
                  <Link to={`/product/${item.products?.slug}`} className="font-medium text-gray-900 hover:text-burgundy transition-colors">
                    {item.products?.name}
                  </Link>
                  <p className="text-gray-900 font-bold mt-1">Rs. {item.products?.price.toFixed(0)}</p>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center border rounded-lg">
                      <button onClick={() => updateQuantity(item.product_id, item.quantity - 1)} className="p-2 hover:bg-gray-100">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-3 font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product_id, item.quantity + 1)} className="p-2 hover:bg-gray-100">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.product_id)} className="text-gray-500 hover:text-red-600">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">Rs. {((item.products?.price || 0) * item.quantity).toFixed(0)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <h2 className="font-serif text-xl text-gray-900 mb-6">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({itemCount} items)</span>
                  <span className="font-medium">Rs. {subtotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600 font-medium' : 'font-medium'}>
                    {shipping === 0 ? 'FREE' : `Rs. ${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-sm text-gray-500">Add Rs. {(999 - subtotal).toFixed(0)} more for free shipping</p>
                )}
                <div className="border-t pt-3 flex justify-between font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-xl">Rs. {total.toFixed(0)}</span>
                </div>
              </div>
              <button className="w-full btn-primary">Proceed to Checkout</button>
              <Link to="/products" className="block text-center text-burgundy hover:text-burgundy-dark font-medium mt-4">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
