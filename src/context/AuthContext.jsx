import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in (from localStorage)
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                console.error('Failed to parse user from local storage:', error);
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Demo login - in production, this would call an API
        let users = [];
        try {
            users = JSON.parse(localStorage.getItem('users') || '[]');
        } catch (error) {
            console.error('Failed to parse users from local storage:', error);
            users = [];
        }
        const foundUser = users.find(u => u.email === email && u.password === password);

        if (foundUser) {
            const userWithoutPassword = { ...foundUser };
            delete userWithoutPassword.password;
            setUser(userWithoutPassword);
            localStorage.setItem('user', JSON.stringify(userWithoutPassword));
            return { success: true };
        }
        return { success: false, error: 'Invalid email or password' };
    };

    const signup = (userData) => {
        // Demo signup - in production, this would call an API
        let users = [];
        try {
            users = JSON.parse(localStorage.getItem('users') || '[]');
        } catch (error) {
            console.error('Failed to parse users from local storage:', error);
            users = [];
        }

        // Check if user already exists
        if (users.find(u => u.email === userData.email)) {
            return { success: false, error: 'User already exists' };
        }

        const newUser = {
            id: Date.now(),
            ...userData,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        const userWithoutPassword = { ...newUser };
        delete userWithoutPassword.password;
        setUser(userWithoutPassword);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));

        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const resetPassword = (email, newPassword) => {
        let users = [];
        try {
            users = JSON.parse(localStorage.getItem('users') || '[]');
        } catch (error) {
            console.error('Failed to parse users:', error);
            return { success: false, error: 'System error' };
        }

        const userIndex = users.findIndex(u => u.email === email);
        if (userIndex === -1) {
            return { success: false, error: 'Email not found' };
        }

        // Update password
        users[userIndex].password = newPassword;
        localStorage.setItem('users', JSON.stringify(users));

        return { success: true };
    };

    const value = {
        user,
        login,
        signup,
        logout,
        resetPassword,
        loading,
        isAuthenticated: !!user
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
