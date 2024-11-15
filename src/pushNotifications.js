import { notificationToken } from "./_config";
import { postSubscribe } from "./service/notification.service";

const publicVapidKey = notificationToken;

export const subscribeUserToPush = async () => {
    if ('serviceWorker' in navigator) {
        try {
            // Register service worker if not already registered
            const registration = await navigator.serviceWorker.register('/sw.js', { scope: '/' });

            // Avoid reloading the page on service worker update
            if (registration.waiting) {
            //    console.log("Service worker waiting to be updated.");
                return;
            }

            // Check for push manager support
            if (!registration.pushManager) {
           //     console.error("Push notifications not supported.");
                return;
            }

            // Subscribe the user to push notifications
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
            });

          //  console.log('Push subscription:', subscription);

            const subscriptionData = {
                endpoint: subscription.endpoint,
                keys: {
                    p256dh: btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('p256dh')))),
                    auth: btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('auth')))),
                }
            };

            // Post subscription to backend
            const response = await postSubscribe(subscriptionData);
            if (response.status !== 200) {
          //      console.error("Failed to subscribe. Response:", response);
                return;
            }

         //   console.log('Subscription successful');
        } catch (error) {
         //   console.error('Error during subscription:', error);
        }
    }
};

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}
