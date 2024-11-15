// In your service worker file (e.g., `sw.js`)

self.addEventListener('push', event => {
    const data = event.data ? event.data.json() : {};
    const title = data.title || 'Default Title';
    const options = {
        body: data.body || 'Default body',
        icon: data.icon || 'favicon.ico',
        // badge: 'path/to/badge.png',
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});
