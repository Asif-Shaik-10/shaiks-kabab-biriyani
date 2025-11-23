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
            const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
            setIsInstalled(isStandalone);
        };

        checkInstalled();
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

        // For iOS, show banner after delay if not installed
        if (isIosDevice && !isInstalled) {
            const timer = setTimeout(() => {
                setShowBanner(true);
            }, 3000);
            return () => {
                clearTimeout(timer);
                window.removeEventListener('beforeinstallprompt', handler);
            };
        }

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

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
