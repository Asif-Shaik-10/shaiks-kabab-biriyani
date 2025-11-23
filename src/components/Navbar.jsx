import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, LogOut, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useInstall } from '../context/InstallContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const location = useLocation();
    const { getCartCount } = useCart();
    const { isAuthenticated, user, logout } = useAuth();
    const { isInstalled, deferredPrompt, isIOS, setShowBanner } = useInstall();

    const links = [
        { name: 'Home', path: '/' },
        { name: 'Menu', path: '/menu' },
        { name: 'About', path: '/about' },
    ];

    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
    };

    return (
        <nav className="bg-dark text-light sticky top-0 z-50 shadow-lg border-b border-primary/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0">
                        <h1 className="text-xl md:text-2xl font-bold text-primary font-serif tracking-wider">
                            SHAIK'S KABAB ND BIRIYANI
                        </h1>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={clsx(
                                        'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300',
                                        location.pathname === link.path
                                            ? 'text-primary'
                                            : 'text-gray-300 hover:text-secondary'
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Cart & User Menu */}
                    <div className="flex items-center gap-4">
                        {/* Install App Button */}
                        {!isInstalled && (
                            <button
                                onClick={() => setShowBanner(true)}
                                className="hidden md:flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-all shadow-md"
                            >
                                <Download size={18} />
                                <span className="text-sm font-medium">Install App</span>
                            </button>
                        )}

                        <Link to="/cart" className="relative p-2 text-gray-300 hover:text-secondary transition-colors">
                            <ShoppingCart size={24} />
                            {getCartCount() > 0 && (
                                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-6 h-6 text-xs font-bold leading-none text-white bg-primary rounded-full animate-pulse">
                                    {getCartCount()}
                                </span>
                            )}
                        </Link>

                        {/* User Menu */}
                        {isAuthenticated ? (
                            <div className="relative hidden md:block">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                                >
                                    <User size={20} />
                                    <span className="text-sm">{user?.name?.split(' ')[0]}</span>
                                </button>

                                <AnimatePresence>
                                    {showUserMenu && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 border border-gray-200"
                                        >
                                            <Link
                                                to="/profile"
                                                onClick={() => setShowUserMenu(false)}
                                                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            >
                                                <User size={18} />
                                                <span>My Profile</span>
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50"
                                            >
                                                <LogOut size={18} />
                                                <span>Logout</span>
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="hidden md:flex items-center gap-2">
                                <Link
                                    to="/login"
                                    className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-4 py-2 bg-primary hover:bg-red-700 rounded-lg transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-dark border-b border-gray-700"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={clsx(
                                        'block px-3 py-2 rounded-md text-base font-medium',
                                        location.pathname === link.path
                                            ? 'text-primary bg-gray-900'
                                            : 'text-gray-300 hover:text-white hover:bg-gray-700'
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {isAuthenticated ? (
                                <>
                                    <Link
                                        to="/profile"
                                        onClick={() => setIsOpen(false)}
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                                    >
                                        My Profile
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsOpen(false);
                                        }}
                                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-400 hover:text-red-300 hover:bg-gray-700"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        onClick={() => setIsOpen(false)}
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        onClick={() => setIsOpen(false)}
                                        className="block px-3 py-2 rounded-md text-base font-medium bg-primary hover:bg-red-700"
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                            {/* Mobile Install Button */}
                            {!isInstalled && (
                                <button
                                    onClick={() => {
                                        setShowBanner(true);
                                        setIsOpen(false);
                                    }}
                                    className="flex w-full items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                                >
                                    <Download size={18} />
                                    <span>Install App</span>
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
