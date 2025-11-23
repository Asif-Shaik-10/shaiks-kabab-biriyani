import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import FoodCard from '../components/FoodCard';
import { menuItems, menuCategories } from '../data/menuData';

const Menu = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredItems = selectedCategory === 'All'
        ? menuItems
        : menuItems.filter(item => item.category === selectedCategory);

    return (
        <div className="min-h-screen bg-light py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl font-bold text-dark mb-4 font-serif">Our Menu</h1>
                    <p className="text-xl text-gray-600">Authentic non-veg delicacies crafted to perfection</p>
                </motion.div>

                {/* Category Filter */}
                <div className="mb-12">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <Filter size={20} className="text-gray-600" />
                        <span className="text-gray-600 font-medium">Filter by category:</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                        {menuCategories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${selectedCategory === category
                                        ? 'bg-primary text-white shadow-lg scale-105'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Items Count */}
                <div className="mb-6">
                    <p className="text-center text-gray-600">
                        Showing <span className="font-bold text-primary">{filteredItems.length}</span> items
                    </p>
                </div>

                {/* Menu Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {filteredItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <FoodCard item={item} />
                        </motion.div>
                    ))}
                </motion.div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-500">No items found in this category</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Menu;
