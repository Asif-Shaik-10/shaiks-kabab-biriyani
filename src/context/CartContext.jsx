import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Load cart from localStorage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (error) {
                console.error('Failed to parse cart from local storage:', error);
                localStorage.removeItem('cart');
            }
        }
    }, []);

    useEffect(() => {
        // Save cart to localStorage whenever it changes
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item, quantity = 1) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(i => i.id === item.id);

            if (existingItem) {
                return prevItems.map(i =>
                    i.id === item.id
                        ? { ...i, quantity: i.quantity + quantity }
                        : i
                );
            }

            return [...prevItems, { ...item, quantity }];
        });
    };

    const removeFromCart = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    const updateQuantity = (itemId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(itemId);
            return;
        }

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getCartCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    const getTaxAmount = () => {
        return getCartTotal() * 0.05; // 5% tax
    };

    const getDeliveryFee = () => {
        return getCartTotal() > 500 ? 0 : 40;
    };

    const getFinalTotal = () => {
        return getCartTotal() + getTaxAmount() + getDeliveryFee();
    };

    const getWhatsAppMessage = (userDetails) => {
        const itemsList = cartItems
            .map((item) => `- ${item.name} x ${item.quantity} (₹${item.price * item.quantity})`)
            .join('%0a');

        const total = getFinalTotal();
        const subtotal = getCartTotal();
        const tax = getTaxAmount();
        const delivery = getDeliveryFee();

        return `*New Order from ${userDetails.name}* %0a%0a` +
            `*Items:*%0a${itemsList}%0a%0a` +
            `*Subtotal:* ₹${subtotal}%0a` +
            `*Tax (5%):* ₹${tax}%0a` +
            `*Delivery:* ₹${delivery}%0a` +
            `*Total Amount:* ₹${total}%0a%0a` +
            `*Payment Status:* ${userDetails.paymentMethod === 'upi' ? 'Paid via UPI (Verify Screenshot)' : 'Cash on Delivery'}%0a%0a` +
            `*Delivery Details:*%0a` +
            `Name: ${userDetails.name}%0a` +
            `Phone: ${userDetails.phone}%0a` +
            `Address: ${userDetails.address}`;
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        getTaxAmount,
        getDeliveryFee,
        getFinalTotal,
        getWhatsAppMessage
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
