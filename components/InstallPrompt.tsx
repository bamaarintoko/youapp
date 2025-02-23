'use client'

import { useEffect, useState } from "react"

interface NavigatorStandalone extends Navigator {
    standalone?: boolean;
}
interface BeforeInstallPromptEvent extends Event {
    prompt: () => void;
    userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function InstallPrompt() {
    const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [isInstalled, setIsInstalled] = useState<boolean>(false);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        // Detect if app is already installed
        const checkIfInstalled = (): boolean => {
            const standalone = window.matchMedia("(display-mode: standalone)").matches;
            const safariStandalone = (window.navigator as NavigatorStandalone).standalone; // iOS Safari
            return standalone || safariStandalone === true
            // setIsInstalled(standalone || safariStandalone);
        };

        setIsInstalled(checkIfInstalled()); // Run on load
        console.log('===> ', checkIfInstalled())
        // Listen for beforeinstallprompt event
        const handleBeforeInstallPrompt = (event: Event) => {
            event.preventDefault();
            setInstallPrompt(event as BeforeInstallPromptEvent);
            if (!isInstalled) {
                setShowPopup(true); // Show custom install popup
            }
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        window.addEventListener("appinstalled", () => setIsInstalled(true));

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
            window.removeEventListener("appinstalled", () => setIsInstalled(true));
        };
    }, []);

    if (!installPrompt) return null; // Hide button if not installable

    const handleInstallClick = () => {
        if (installPrompt) {
            installPrompt.prompt();
        }
    };
    return (
        <div className="bg-red-500 z-50">
            {
                showPopup && !isInstalled &&
                <div className="flex flex-col fixed bottom-4 lg:left-1/2 lg:transform lg:-translate-x-1/2 bg-white p-4 shadow-lg rounded-lg items-center">
                    <p className="text-gray-700 text-center">Install this app on your device for a better experience.</p>
                    <div className="flex gap-2 ">

                        <button
                            onClick={handleInstallClick}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                            Install
                        </button>
                        <button
                            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}