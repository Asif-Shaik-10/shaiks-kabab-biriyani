import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [step, setStep] = useState(1); // 1: Email, 2: New Password, 3: Success
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { resetPassword } = useAuth();
    const navigate = useNavigate();

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        setError('');
        // In a real app, we would verify email exists here.
        // For this demo, we'll just move to the next step to simulate "link clicked"
        setStep(2);
    };

    const handlePasswordReset = (e) => {
        e.preventDefault();
        setError('');

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        const result = resetPassword(email, newPassword);
        if (result.success) {
            setStep(3);
            setTimeout(() => navigate('/login'), 3000);
        } else {
            // Even if email not found in our mocked DB, we might want to show success for security in real apps
            // But for this specific user request "fix it", let's fail if it doesn't exist
            setError(result.error || 'Failed to reset password');
            if (result.error === 'Email not found') {
                // Allow them to try again
                setTimeout(() => setStep(1), 1500);
            }
        }
    };

    return (
        <div className="min-h-screen pt-20 pb-12 flex items-center justify-center px-4 bg-dark">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-dark-lighter p-8 rounded-lg shadow-lg border border-gray-700"
            >
                <Link to="/login" className="flex items-center text-gray-400 hover:text-primary mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Login
                </Link>

                {step === 1 && (
                    <>
                        <h2 className="text-3xl font-bold text-light mb-2 font-serif">Reset Password</h2>
                        <p className="text-gray-400 mb-8">Enter your email to reset your password.</p>
                        <form onSubmit={handleEmailSubmit} className="space-y-6">
                            {error && <div className="text-red-400 bg-red-900/20 p-3 rounded">{error}</div>}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 bg-dark border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors">
                                Continue
                            </button>
                        </form>
                    </>
                )}

                {step === 2 && (
                    <>
                        <h2 className="text-3xl font-bold text-light mb-2 font-serif">New Password</h2>
                        <p className="text-gray-400 mb-8">Set a new password for {email}</p>
                        <form onSubmit={handlePasswordReset} className="space-y-6">
                            {error && <div className="text-red-400 bg-red-900/20 p-3 rounded">{error}</div>}

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">New Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full pl-10 pr-12 py-2 bg-dark border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
                                        placeholder="New password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Confirm Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 bg-dark border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
                                        placeholder="Confirm new password"
                                    />
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors">
                                Reset Password
                            </button>
                        </form>
                    </>
                )}

                {step === 3 && (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-green-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Password Reset!</h3>
                        <p className="text-gray-400 mb-6">
                            Your password has been updated successfully. Redirecting to login...
                        </p>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
