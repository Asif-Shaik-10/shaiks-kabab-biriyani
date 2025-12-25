import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { menuItems } from '../data/menuData';

const Home = () => {
    const popularItems = menuItems.filter(item => item.popular).slice(0, 3);

    return (
        <div>
            {/* Hero Section */}
            <div className="relative bg-dark text-light min-h-[90vh] flex items-center overflow-hidden">
                {/* Background Image Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-30"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=2070&auto=format&fit=crop")',
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex items-center gap-2 mb-6"
                        >
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Star key={i} size={20} className="text-secondary fill-secondary" />
                                ))}
                            </div>
                            <span className="text-gray-300">Rated 4.8 by 5000+ customers</span>
                        </motion.div>

                        <h1 className="text-6xl md:text-7xl font-bold font-serif mb-6 leading-tight">
                            Experience the <span className="text-primary">Royal</span> Taste of <span className="text-secondary">Non-Veg</span>
                        </h1>
                        <p className="text-2xl text-gray-300 mb-8 leading-relaxed">
                            Succulent kebabs, rich curries, and aromatic biryanis. Crafted for the true meat lover.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/menu"
                                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-red-800 transition-all duration-300 shadow-lg hover:shadow-xl group"
                            >
                                Order Now
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/about"
                                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300"
                            >
                                Learn More
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Floating Elements */}
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute bottom-10 right-10 hidden lg:block"
                >
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                        <p className="text-sm text-gray-300 mb-1">Fast Delivery</p>
                        <p className="text-2xl font-bold">30-45 mins</p>
                    </div>
                </motion.div>
            </div>

            {/* Popular Items Section */}
            <div className="bg-light py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Flame className="text-primary" size={32} />
                            <h2 className="text-4xl font-bold text-dark font-serif">Popular Dishes</h2>
                        </div>
                        <p className="text-xl text-gray-600">Crowd favorites that keep them coming back</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {popularItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                whileHover={{ y: -10 }}
                                className="bg-white rounded-2xl shadow-xl overflow-hidden group"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4 bg-secondary text-dark px-3 py-1 rounded-full text-sm font-bold">
                                        POPULAR
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-dark mb-2">{item.name}</h3>
                                    <p className="text-gray-600 mb-4">{item.description}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-2xl font-bold text-primary">₹{item.price}</span>
                                        <Link
                                            to="/menu"
                                            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-red-700 transition-colors"
                                        >
                                            Order Now
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            to="/menu"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-dark text-white rounded-full font-semibold text-lg hover:bg-primary transition-colors"
                        >
                            View Full Menu
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="bg-gradient-to-br from-dark to-gray-900 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold font-serif mb-4">What Our Customers Say</h2>
                        <p className="text-xl text-gray-400">Real reviews from real food lovers</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: 'Rajesh Kumar',
                                review: 'The best biryani I\'ve ever had! The spices are perfectly balanced and the meat is so tender.',
                                rating: 5
                            },
                            {
                                name: 'Priya Sharma',
                                review: 'Authentic flavors that remind me of home. The butter chicken is to die for!',
                                rating: 5
                            },
                            {
                                name: 'Mohammed Ali',
                                review: 'Fast delivery and amazing food quality. My go-to restaurant for non-veg cravings.',
                                rating: 5
                            }
                        ].map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                            >
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} size={18} className="text-secondary fill-secondary" />
                                    ))}
                                </div>
                                <p className="text-gray-300 mb-4 italic">"{testimonial.review}"</p>
                                <p className="font-bold">- {testimonial.name}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
