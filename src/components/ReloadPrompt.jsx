import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

function ReloadPrompt() {
    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            console.log('SW Registered: ' + r);
        },
        onRegisterError(error) {
            console.log('SW registration error', error);
        },
    });

    const close = () => {
        setOfflineReady(false);
        setNeedRefresh(false);
    };

    return (
        <div className="ReloadPrompt-container">
            {(needRefresh) && (
                <div className="fixed bottom-4 right-4 p-4 bg-gray-900 border border-primary rounded-lg shadow-xl z-50 flex flex-col gap-2 animate-fade-in">
                    <div className="text-white mb-2">
                        {offlineReady
                            ? null // Don't show anything for offline ready
                            : 'New content available, click on reload button to update.'}
                    </div>
                    <div className="flex gap-2">
                        {needRefresh && (
                            <button
                                className="bg-primary text-white px-4 py-2 rounded font-bold hover:bg-orange-600 transition-colors"
                                onClick={() => updateServiceWorker(true)}
                            >
                                Reload
                            </button>
                        )}
                        <button
                            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                            onClick={close}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ReloadPrompt;
