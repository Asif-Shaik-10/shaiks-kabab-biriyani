import React, { createContext, useContext, useState, useEffect } from 'react';

const InstallContext = createContext();

export const useInstall = () => useContext(InstallContext);

export const InstallProvider = ({ children }) => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isIOS, setIsIOS] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        // Check if device is iOS
        const isIosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        setIsIOS(isIosDevice);

        // Check if already installed
        const checkInstalled = () => {
            const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                window.navigator.standalone ||
                document.referrer.includes('android-app://');
            setIsInstalled(isStandalone);
            return isStandalone;
        };

        const isAppInstalled = checkInstalled();
        window.addEventListener('appinstalled', () => {
            setIsInstalled(true);
            setDeferredPrompt(null);
            setShowBanner(false);
        });

        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowBanner(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        let timer;
        // Show banner after delay if not installed (for all platforms)
        if (!isAppInstalled) {
            timer = setTimeout(() => {
                setShowBanner(true);
            }, 5000); // Show after 5 seconds to not be too intrusive
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, [isInstalled]); // Added isInstalled to dependency array to re-evaluate timer if installation status changes

    const installApp = async () => {
        if (isIOS) {
            return; // iOS requires manual action, UI should handle this
        }

        if (!deferredPrompt) {
            // If no deferred prompt (e.g. Android/Desktop without event),
            // we can't trigger native install.
            // The UI should show instructions instead.
            return;
        }

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            setDeferredPrompt(null);
            setShowBanner(false);
        }
    };

    return (
        <InstallContext.Provider value={{
            isIOS,
            isInstalled,
            showBanner,
            setShowBanner,
            installApp,
            deferredPrompt
        }}>
            {children}
        </InstallContext.Provider>
    );
};
