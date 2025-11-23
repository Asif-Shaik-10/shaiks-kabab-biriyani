import { Download, X } from 'lucide-react';
import { useInstall } from '../context/InstallContext';

export default function InstallPrompt() {
    const { isIOS, showBanner, setShowBanner, installApp, deferredPrompt } = useInstall();

    if (!showBanner) return null;

    const showInstructions = !deferredPrompt && !isIOS;

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 animate-slide-up">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow-2xl p-4 text-white">
                <button
                    onClick={() => setShowBanner(false)}
                    className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition-colors"
                    aria-label="Dismiss"
                >
                    <X size={18} />
                </button>

                <div className="flex items-start gap-3 pr-6">
                    <div className="bg-white/20 p-2 rounded-lg">
                        <Download size={24} />
                    </div>

                    <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">Install Our App</h3>
                        <p className="text-sm text-white/90 mb-3">
                            {isIOS
                                ? "Tap the Share button and select 'Add to Home Screen' to install."
                                : showInstructions
                                    ? "Tap the browser menu (⋮) and select 'Add to Home Screen' to install."
                                    : "Get quick access and order faster with our app!"}
                        </p>

                        {!isIOS && !showInstructions && (
                            <button
                                onClick={installApp}
                                className="w-full bg-white text-orange-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                Install Now
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
