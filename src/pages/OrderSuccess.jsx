import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Home } from 'lucide-react';

const OrderSuccess = () => {
    const location = useLocation();
    const orderId = location.state?.orderId || 'N/A';

    return (
        <div className="min-h-screen bg-light flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="mb-6"
                >
                    <CheckCircle size={80} className="text-green-500 mx-auto" />
                </motion.div>

                <h1 className="text-3xl font-bold text-dark mb-3">Order Placed Successfully!</h1>
                <p className="text-gray-600 mb-6">
                    Thank you for your order. We'll start preparing your delicious food right away!
                </p>

                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-600">Order ID:</span>
                        <span className="font-bold text-dark">{orderId}</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-600">Status:</span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                            Confirmed
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">Est. Delivery:</span>
                        <span className="font-semibold text-primary">30-45 mins</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <Link
                        to="/profile"
                        className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors"
                    >
                        <Package size={20} />
                        Track Order
                    </Link>
                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 w-full bg-gray-100 hover:bg-gray-200 text-dark font-semibold py-3 rounded-lg transition-colors"
                    >
                        <Home size={20} />
                        Back to Home
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default OrderSuccess;
