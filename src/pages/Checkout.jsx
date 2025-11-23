import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, CreditCard, Smartphone, Wallet, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
    const { cartItems, getFinalTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        address: '',
        city: '',
        pincode: '',
        phone: user?.phone || ''
    });

    const [paymentMethod, setPaymentMethod] = useState('');
    const [cardDetails, setCardDetails] = useState({
        number: '',
        name: '',
        expiry: '',
        cvv: ''
    });

    const handlePlaceOrder = (e) => {
        e.preventDefault();

        if (!paymentMethod) {
            alert('Please select a payment method');
            return;
        }

        // Save order to localStorage
        const order = {
            id: `ORD${Date.now()}`,
            items: cartItems,
            total: getFinalTotal(),
            paymentMethod,
            address: formData,
            status: 'Confirmed',
            date: new Date().toISOString()
        };

        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));

        clearCart();
        navigate('/order-success', { state: { orderId: order.id } });
    };

    const paymentMethods = [
        {
            id: 'cod',
            name: 'Cash on Delivery',
            icon: Wallet,
            description: 'Pay when you receive'
        },
        {
            id: 'upi',
            name: 'UPI',
            icon: Smartphone,
            description: 'Google Pay, PhonePe, Paytm'
        },
        {
            id: 'card',
            name: 'Credit/Debit Card',
            icon: CreditCard,
            description: 'Visa, Mastercard, Rupay'
        }
    ];

    return (
        <div className="min-h-screen bg-light py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-dark mb-8 font-serif"
                >
                    Checkout
                </motion.h1>

                <form onSubmit={handlePlaceOrder} className="space-y-8">
                    {/* Delivery Address */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl shadow-lg p-6"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <MapPin className="text-primary" size={24} />
                            <h2 className="text-2xl font-bold text-dark">Delivery Address</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Complete Address
                                </label>
                                <textarea
                                    required
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    rows="3"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="House no., Building name, Street, Locality"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Enter city"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.pincode}
                                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Enter pincode"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Enter phone number"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Payment Method */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-xl shadow-lg p-6"
                    >
                        <h2 className="text-2xl font-bold text-dark mb-6">Payment Method</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            {paymentMethods.map((method) => {
                                const Icon = method.icon;
                                return (
                                    <button
                                        key={method.id}
                                        type="button"
                                        onClick={() => setPaymentMethod(method.id)}
                                        className={`p-6 rounded-xl border-2 transition-all duration-300 ${paymentMethod === method.id
                                                ? 'border-primary bg-primary/5 shadow-lg'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="flex flex-col items-center text-center">
                                            <Icon
                                                size={32}
                                                className={paymentMethod === method.id ? 'text-primary' : 'text-gray-600'}
                                            />
                                            <h3 className="font-bold text-dark mt-3 mb-1">{method.name}</h3>
                                            <p className="text-xs text-gray-500">{method.description}</p>
                                            {paymentMethod === method.id && (
                                                <div className="mt-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                                    <Check size={16} className="text-white" />
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Card Payment Form */}
                        {paymentMethod === 'card' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="border-t pt-6 space-y-4"
                            >
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Card Number
                                    </label>
                                    <input
                                        type="text"
                                        value={cardDetails.number}
                                        onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="1234 5678 9012 3456"
                                        maxLength="19"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Cardholder Name
                                    </label>
                                    <input
                                        type="text"
                                        value={cardDetails.name}
                                        onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="Name on card"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Expiry Date
                                        </label>
                                        <input
                                            type="text"
                                            value={cardDetails.expiry}
                                            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="MM/YY"
                                            maxLength="5"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                                        <input
                                            type="text"
                                            value={cardDetails.cvv}
                                            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="123"
                                            maxLength="3"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* UPI Payment Info */}
                        {paymentMethod === 'upi' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="border-t pt-6"
                            >
                                <p className="text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
                                    You will be redirected to your UPI app to complete the payment after placing the order.
                                </p>
                            </motion.div>
                        )}

                        {/* COD Info */}
                        {paymentMethod === 'cod' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="border-t pt-6"
                            >
                                <p className="text-sm text-gray-600 bg-green-50 p-4 rounded-lg">
                                    Pay with cash when your order is delivered. Please keep exact change handy.
                                </p>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Order Summary & Place Order */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-xl shadow-lg p-6"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-dark">Order Total</h2>
                            <span className="text-3xl font-bold text-primary">₹{getFinalTotal().toFixed(2)}</span>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-red-700 text-white font-bold py-4 rounded-lg transition-colors duration-300 text-lg"
                        >
                            Place Order
                        </button>

                        <p className="text-xs text-gray-500 text-center mt-4">
                            By placing this order, you agree to our terms and conditions
                        </p>
                    </motion.div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
