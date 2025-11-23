import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

import { useInstall } from '../context/InstallContext';

const Footer = () => {
    const { isInstalled, isIOS, deferredPrompt } = useInstall();

    return (
        <footer className="bg-dark text-gray-300 py-8 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <div>
                            <h3 className="text-xl font-bold text-secondary mb-2 font-serif">SHAIK'S KABAB ND BIRIYANI</h3>
                            <p className="text-sm text-gray-400">Authentic non-veg delicacies</p>
                        </div>            </div>

                    <div className="flex space-x-6 mb-4 md:mb-0">
                        <a href="#" className="hover:text-secondary transition-colors"><Facebook size={20} /></a>
                        <a href="#" className="hover:text-secondary transition-colors"><Instagram size={20} /></a>
                        <a href="#" className="hover:text-secondary transition-colors"><Twitter size={20} /></a>
                    </div>

                    <div className="text-sm text-gray-500 text-center md:text-right">
                        <div>&copy; {new Date().getFullYear()} Shaik's Restaurant. All rights reserved.</div>
                        <div className="text-xs text-gray-600 mt-1">
                            v1.2 | {isInstalled ? 'App Installed' : 'Web Version'} | {isIOS ? 'iOS' : 'Android/PC'}
                            {!isInstalled && !isIOS && !deferredPrompt && ' (Manual Install)'}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
