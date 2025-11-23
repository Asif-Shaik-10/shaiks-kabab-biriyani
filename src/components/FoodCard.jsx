import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, ShoppingCart, Flame } from 'lucide-react';
import { useCart } from '../context/CartContext';

const FoodCard = ({ item }) => {
    const [quantity, setQuantity] = useState(1);
    const [showQuantity, setShowQuantity] = useState(false);
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(item, quantity);
        setQuantity(1);
        setShowQuantity(false);

        // Show success feedback
        const button = document.getElementById(`add-btn-${item.id}`);
        if (button) {
            button.textContent = 'Added!';
            setTimeout(() => {
                button.textContent = 'Add to Cart';
            }, 1500);
        }
    };

    const spiceLevelDisplay = () => {
        return Array(item.spiceLevel || 0).fill('🌶️').join('');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
        >
            <div className="relative h-56 overflow-hidden">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
                {item.popular && (
                    <div className="absolute top-4 right-4 bg-secondary text-dark px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        POPULAR
                    </div>
                )}
                {item.spiceLevel > 0 && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs flex items-center gap-1">
                        <Flame size={14} className="text-red-500" />
                        <span>{spiceLevelDisplay()}</span>
                    </div>
                )}
            </div>

            <div className="p-5">
                <h3 className="text-xl font-bold text-dark mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

                <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-primary">₹{item.price}</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {item.category}
                    </span>
                </div>

                {!showQuantity ? (
                    <button
                        onClick={() => setShowQuantity(true)}
                        className="w-full bg-dark hover:bg-primary text-white font-semibold py-3 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                        <ShoppingCart size={18} />
                        <span>Add to Cart</span>
                    </button>
                ) : (
                    <div className="space-y-3">
                        <div className="flex items-center justify-between bg-gray-100 rounded-lg p-2">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                            >
                                <Minus size={18} />
                            </button>
                            <span className="font-bold text-lg">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                            >
                                <Plus size={18} />
                            </button>
                        </div>
                        <button
                            id={`add-btn-${item.id}`}
                            onClick={handleAddToCart}
                            className="w-full bg-primary hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
                        >
                            Add to Cart
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default FoodCard;
