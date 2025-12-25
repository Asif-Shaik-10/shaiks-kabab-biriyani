import React, { useEffect } from 'react';
import { Bell } from 'lucide-react';

const CheesyNotification = () => {
    useEffect(() => {
        // Request permission on mount
        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }

        // Set a timer to trigger the notification
        const timer = setTimeout(() => {
            if (Notification.permission === 'granted') {
                new Notification("Hey! Your tummy is calling... 🍗", {
                    body: "Pick up! Some hot biryani is waiting for you at Shaik's!",
                    icon: '/pwa-192x192.png', // Use PWA icon
                    vibrate: [200, 100, 200]
                });
            }
        }, 10000); // Trigger after 10 seconds

        return () => clearTimeout(timer);
    }, []);

    return null; // This component doesn't render anything visible
};

export default CheesyNotification;
