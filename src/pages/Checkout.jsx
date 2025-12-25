import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Checkout = () => {
    const { cartItems, getCartTotal, clearCart, getTaxAmount, getDeliveryFee, getFinalTotal } = useCart();
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

    const handleWhatsAppOrder = (e) => {
        e.preventDefault();
        setLoading(true);

        // 1. Construct the Order Message
        const itemsList = cartItems.map(item => `- ${item.name} x ${item.quantity} (₹${item.price * item.quantity})`).join('%0a');
        const subtotal = getCartTotal();
        const tax = getTaxAmount();
        const delivery = getDeliveryFee();
        const total = getFinalTotal();

        const message = `*New Order from Website* 🍽️%0a%0a` +
            `*Customer Details:*%0a` +
            `Name: ${formData.name}%0a` +
            `Phone: ${formData.phone}%0a` +
            `Address: ${formData.address}%0a%0a` +
            `*Order Summary:*%0a${itemsList}%0a%0a` +
            `--------------------------------%0a` +
            `Subtotal: ₹${subtotal}%0a` +
            `Tax: ₹${tax}%0a` +
            `Delivery: ${delivery === 0 ? 'Free' : '₹' + delivery}%0a` +
            `*Total Amount: ₹${total}* 💰%0a` +
            `--------------------------------%0a` +
            `Payment Method: ${formData.paymentMethod === 'upi' ? 'UPI' : 'Cash on Delivery'}%0a` +
            `%0aPlease confirm this order!`;

        // 2. Your WhatsApp Number
        const phoneNumber = "917780402204"; // Country code + Number

        // 3. Create WhatsApp URL
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

        // 4. Redirect
        window.location.href = whatsappUrl;

        // Optionally clear cart after a delay or let them clear it manually after returning
        setTimeout(() => {
            clearCart();
        }, 2000);
    };

    if (cartItems.length === 0) {
        return <Navigate to="/menu" />;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold text-primary mb-8 font-serif">Checkout</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Order Summary */}
                <div className="bg-dark-lighter p-6 rounded-lg shadow-lg border border-white/10 h-fit">
                    <h3 className="text-xl font-bold text-light mb-4">Order Summary</h3>
                    <div className="space-y-4 mb-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex justify-between items-center text-gray-300">
                                <span>{item.name} x {item.quantity}</span>
                                <span>₹{item.price * item.quantity}</span>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-gray-700 pt-4 space-y-2">
                        <div className="flex justify-between items-center text-gray-400">
                            <span>Subtotal</span>
                            <span>₹{getCartTotal()}</span>
                        </div>
                        <div className="flex justify-between items-center text-gray-400">
                            <span>Tax (5%)</span>
                            <span>₹{getTaxAmount()}</span>
                        </div>
                        <div className="flex justify-between items-center text-gray-400">
                            <span>Delivery Fee</span>
                            <span>{getDeliveryFee() === 0 ? 'Free' : `₹${getDeliveryFee()}`}</span>
                        </div>
                        <div className="border-t border-gray-700 pt-2 flex justify-between items-center text-xl font-bold text-primary">
                            <span>Total</span>
                            <span>₹{getFinalTotal()}</span>
                        </div>
                    </div>
                </div>

                {/* Checkout Form */}
                <div className="bg-dark-lighter p-6 rounded-lg shadow-lg border border-white/10">
                    <h3 className="text-xl font-bold text-light mb-6">Delivery Details</h3>
                    <p className="text-gray-400 mb-6 text-sm">
                        Fill in your details and click below to send your order directly to our WhatsApp!
                    </p>
                    <form onSubmit={handleWhatsAppOrder} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-dark border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary"
                                placeholder="Your Name"
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
                                className="w-full px-4 py-2 bg-dark border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary"
                                placeholder="Your Phone Number"
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
                                className="w-full px-4 py-2 bg-dark border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary"
                                placeholder="Flat No, Building, Street, Area"
                            ></textarea>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                            >
                                {loading ? 'Opening WhatsApp...' : (
                                    <>
                                        <span>Place Order via WhatsApp</span>
                                    </>
                                )}
                            </button>
                            <p className="text-xs text-gray-500 text-center mt-2">
                                This will open WhatsApp with your order details pre-filled.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
