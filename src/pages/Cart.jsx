import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
    const {
        cartItems,
        updateQuantity,
        removeFromCart,
        getCartTotal,
        getTaxAmount,
        getDeliveryFee,
        getFinalTotal
    } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            navigate('/checkout');
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-light flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <ShoppingBag size={80} className="mx-auto text-gray-300 mb-6" />
                    <h2 className="text-3xl font-bold text-dark mb-4">Your cart is empty</h2>
                    <p className="text-gray-600 mb-8">Add some delicious items to get started!</p>
                    <Link
                        to="/menu"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-red-700 transition-colors"
                    >
                        Browse Menu
                        <ArrowRight size={20} />
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-light py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-dark mb-8 font-serif"
                >
                    Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
                </motion.h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        <AnimatePresence>
                            {cartItems.map((item) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                                >
                                    <div className="flex gap-6">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-32 h-32 object-cover rounded-lg"
                                        />

                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <h3 className="text-xl font-bold text-dark mb-1">{item.name}</h3>
                                                    <p className="text-sm text-gray-500">{item.category}</p>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-lg"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-2">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-8 h-8 bg-white rounded flex items-center justify-center hover:bg-gray-200 transition-colors"
                                                    >
                                                        <Minus size={16} />
                                                    </button>
                                                    <span className="font-bold min-w-[30px] text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-8 h-8 bg-white rounded flex items-center justify-center hover:bg-gray-200 transition-colors"
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>

                                                <div className="text-right">
                                                    <p className="text-sm text-gray-500">₹{item.price} each</p>
                                                    <p className="text-2xl font-bold text-primary">₹{item.price * item.quantity}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-xl shadow-lg p-6 sticky top-24"
                        >
                            <h2 className="text-2xl font-bold text-dark mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">₹{getCartTotal()}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>GST (5%)</span>
                                    <span className="font-semibold">₹{getTaxAmount().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Delivery Fee</span>
                                    <span className="font-semibold">
                                        {getDeliveryFee() === 0 ? (
                                            <span className="text-green-600">FREE</span>
                                        ) : (
                                            `₹${getDeliveryFee()}`
                                        )}
                                    </span>
                                </div>

                                {getDeliveryFee() > 0 && (
                                    <p className="text-xs text-gray-500 bg-yellow-50 p-2 rounded">
                                        Add ₹{500 - getCartTotal()} more for free delivery
                                    </p>
                                )}

                                <div className="border-t pt-4 flex justify-between items-center">
                                    <span className="text-xl font-bold text-dark">Total</span>
                                    <span className="text-2xl font-bold text-primary">₹{getFinalTotal().toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="w-full bg-primary hover:bg-red-700 text-white font-bold py-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                            >
                                Proceed to Checkout
                                <ArrowRight size={20} />
                            </button>

                            <Link
                                to="/menu"
                                className="block text-center mt-4 text-primary hover:text-red-700 font-medium"
                            >
                                Continue Shopping
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
