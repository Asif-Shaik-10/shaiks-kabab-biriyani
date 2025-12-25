import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const result = login(formData.email, formData.password);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-dark via-gray-900 to-dark flex items-center justify-center px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-dark mb-2 font-serif">Shaik's Kabab ND Biriyani</h1>
                    <p className="text-gray-600 text-lg">Login to order delicious food</p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full pl-10 pr-12 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            <div className="flex justify-end mt-2">
                                <Link to="/forgot-password" className="text-sm text-secondary hover:text-yellow-400 transition-colors">
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
                        >
                            Login
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-secondary hover:text-yellow-400 font-semibold">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>

                <p className="text-center text-gray-500 text-sm mt-6">
                    Demo: Use any email/password to signup, then login with those credentials
                </p>
                <div className="mt-6 pt-6 border-t border-gray-800">
                    <button
                        onClick={() => {
                            login('demo@example.com', 'demo123');
                            // If login fails (user doesn't exist), signup first
                            if (!localStorage.getItem('user')) {
                                signup({
                                    name: 'Demo User',
                                    email: 'demo@example.com',
                                    phone: '9999999999',
                                    password: 'demo123'
                                });
                            }
                        }}
                        className="w-full bg-gray-800 text-gray-300 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors text-sm"
                    >
                        Try Demo Login (One Click)
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
