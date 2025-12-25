import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Package, LogOut, Mail, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-light py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-dark mb-8 font-serif"
                >
                    My Profile
                </motion.h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* User Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex flex-col items-center mb-6">
                                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                    <User size={48} className="text-primary" />
                                </div>
                                <h2 className="text-2xl font-bold text-dark mb-1">{user?.name}</h2>
                                <p className="text-gray-500 text-sm">Member since {new Date(user?.createdAt).getFullYear()}</p>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Mail size={20} className="text-primary" />
                                    <span className="text-sm">{user?.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Phone size={20} className="text-primary" />
                                    <span className="text-sm">{user?.phone}</span>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-800">
                                <button
                                    onClick={logout}
                                    className="w-full bg-red-600/20 text-red-500 py-3 rounded-lg font-bold hover:bg-red-600/30 transition-colors flex items-center justify-center gap-2"
                                >
                                    <LogOut className="w-5 h-5" />
                                    Logout
                                </button>

                                <button
                                    onClick={() => {
                                        if (window.confirm('This will clear the app cache and reload. Continue?')) {
                                            if ('serviceWorker' in navigator) {
                                                navigator.serviceWorker.getRegistrations().then(function (registrations) {
                                                    for (let registration of registrations) {
                                                        registration.unregister();
                                                    }
                                                    window.location.reload(true);
                                                });
                                            } else {
                                                window.location.reload(true);
                                            }
                                        }
                                    }}
                                    className="w-full mt-4 bg-gray-800 text-gray-400 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors text-sm"
                                >
                                    Clear App Cache (Fix Issues)
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Order History */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2"
                    >
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <Package size={24} className="text-primary" />
                                <h2 className="text-2xl font-bold text-dark">Order History</h2>
                            </div>

                            {orders.length === 0 ? (
                                <div className="text-center py-12">
                                    <Package size={64} className="mx-auto text-gray-300 mb-4" />
                                    <p className="text-gray-500 text-lg">No orders yet</p>
                                    <p className="text-gray-400 text-sm mb-6">Start ordering to see your history here</p>
                                    <button
                                        onClick={() => navigate('/menu')}
                                        className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                                    >
                                        Browse Menu
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {orders.reverse().map((order) => (
                                        <div
                                            key={order.id}
                                            className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <h3 className="font-bold text-dark mb-1">Order {order.id}</h3>
                                                    <p className="text-sm text-gray-500">
                                                        {new Date(order.date).toLocaleDateString('en-IN', {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </p>
                                                </div>
                                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                                                    {order.status}
                                                </span>
                                            </div>

                                            <div className="border-t pt-3 mb-3">
                                                <p className="text-sm text-gray-600 mb-2">
                                                    {order.items.length} item{order.items.length > 1 ? 's' : ''}
                                                </p>
                                                <div className="space-y-1">
                                                    {order.items.map((item) => (
                                                        <div key={item.id} className="flex justify-between text-sm">
                                                            <span className="text-gray-700">
                                                                {item.name} x {item.quantity}
                                                            </span>
                                                            <span className="text-gray-600">₹{item.price * item.quantity}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="border-t pt-3 flex justify-between items-center">
                                                <span className="text-sm text-gray-600">
                                                    Payment: <span className="font-medium uppercase">{order.paymentMethod}</span>
                                                </span>
                                                <span className="text-lg font-bold text-primary">
                                                    ₹{order.total.toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
