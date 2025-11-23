import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Checkout = () => {
    const { cartItems, getCartTotal, clearCart, getWhatsAppMessage } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        paymentMethod: 'whatsapp'
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleWhatsAppOrder = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate processing
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Generate WhatsApp message
        const message = getWhatsAppMessage(formData);
        const phoneNumber = "919876543210"; // Replace with restaurant's phone number
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

        // Clear cart and redirect
        clearCart();
        window.open(whatsappUrl, '_blank');
        navigate('/order-success');
    };

    if (cartItems.length === 0) {
        return <Navigate to="/menu" />;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold text-primary mb-8 font-serif">Checkout</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Order Summary */}
                <div className="bg-dark p-6 rounded-lg shadow-lg border border-gray-800 h-fit">
                    <h3 className="text-xl font-bold text-white mb-4">Order Summary</h3>
                    <div className="space-y-4 mb-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex justify-between items-center text-gray-300">
                                <span>{item.name} x {item.quantity}</span>
                                <span>₹{item.price * item.quantity}</span>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-gray-700 pt-4 flex justify-between items-center text-xl font-bold text-secondary">
                        <span>Total</span>
                        <span>₹{getCartTotal()}</span>
                    </div>
                </div>

                {/* Checkout Form */}
                <div className="bg-dark p-6 rounded-lg shadow-lg border border-gray-800">
                    <h3 className="text-xl font-bold text-white mb-6">Delivery Details</h3>
                    <form onSubmit={handleWhatsAppOrder} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary"
                                placeholder="+91 98765 43210"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Delivery Address</label>
                            <textarea
                                name="address"
                                required
                                value={formData.address}
                                onChange={handleInputChange}
                                rows="3"
                                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary"
                                placeholder="Flat No, Building, Street, Area"
                            ></textarea>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                            >
                                {loading ? 'Processing...' : (
                                    <>
                                        <span>Place Order via WhatsApp</span>
                                    </>
                                )}
                            </button>
                            <p className="text-xs text-gray-500 text-center mt-2">
                                You can pay via UPI or Cash upon delivery confirmation on WhatsApp.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
