import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Award, Users } from 'lucide-react';
import restaurantImg from '../assets/images/restaurant-ambiance.png';

const About = () => {
    const features = [
        {
            icon: Award,
            title: 'Premium Quality',
            description: 'Only the finest ingredients and authentic spices'
        },
        {
            icon: Users,
            title: 'Expert Chefs',
            description: '20+ years of culinary expertise'
        },
        {
            icon: Clock,
            title: 'Fast Delivery',
            description: 'Fresh food delivered within 30-45 minutes'
        }
    ];

    return (
        <div className="min-h-screen bg-light">
            {/* Hero Section */}
            <div className="relative h-96 bg-dark overflow-hidden">
                <img
                    src={restaurantImg}
                    alt="Restaurant"
                    className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-white"
                    >
                        <h1 className="text-5xl font-bold font-serif mb-4">About Shaik's Kabab ND Biriyani</h1>
                        <p className="text-xl max-w-2xl mx-auto px-4">
                            Serving authentic kababs and biryanis since 2005
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Our Story */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h2 className="text-4xl font-bold text-dark mb-6 font-serif text-center">Our Story</h2>
                    <div className="max-w-3xl mx-auto text-gray-700 space-y-4 text-lg leading-relaxed">
                        <p>
                            Shaik's Kabab ND Biriyani was born from a passion for authentic non-vegetarian cuisine and a
                            commitment to preserving traditional cooking methods. What started as a small family
                            kitchen has grown into one of the most beloved restaurants in the city.
                        </p>
                        <p>
                            Our master chefs bring decades of experience, using time-honored recipes passed down
                            through generations. Every dish is crafted with the finest ingredients, aromatic spices,
                            and most importantly, love and dedication.
                        </p>
                        <p>
                            We take pride in our tandoor-grilled specialties, slow-cooked curries, and aromatic
                            biryanis that have won the hearts of thousands of food lovers.
                        </p>
                    </div>
                </motion.div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center"
                            >
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Icon size={32} className="text-primary" />
                                </div>
                                <h3 className="text-xl font-bold text-dark mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl shadow-lg p-8"
                >
                    <h2 className="text-3xl font-bold text-dark mb-8 text-center font-serif">Get in Touch</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="flex items-start gap-3">
                            <MapPin className="text-primary mt-1 flex-shrink-0" size={24} />
                            <div>
                                <h3 className="font-bold text-dark mb-1">Address</h3>
                                <p className="text-gray-600 text-sm">
                                    123 Food Street, Gourmet District, Mumbai - 400001
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Phone className="text-primary mt-1 flex-shrink-0" size={24} />
                            <div>
                                <h3 className="font-bold text-dark mb-1">Phone</h3>
                                <p className="text-gray-600 text-sm">+91 98765 43210</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Mail className="text-primary mt-1 flex-shrink-0" size={24} />
                            <div>
                                <h3 className="font-bold text-dark mb-1">Email</h3>
                                <p className="text-gray-600 text-sm">hello@shaiksrestaurant.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Clock className="text-primary mt-1 flex-shrink-0" size={24} />
                            <div>
                                <h3 className="font-bold text-dark mb-1">Hours</h3>
                                <p className="text-gray-600 text-sm">11:00 AM - 11:00 PM</p>
                                <p className="text-gray-600 text-sm">All days of the week</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
