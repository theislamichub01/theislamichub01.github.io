// Islamic Hub — Service Worker
// Enables notifications to display even when the community.html tab
// is backgrounded/minimized (while the browser itself is running).
// This does NOT deliver notifications if the browser is fully closed —
// that requires a server-triggered push service, which this static
// site does not have.

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(clientList => {
            for (const client of clientList) {
                if (client.url.includes('community.html') && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) return clients.openWindow('community.html');
        })
    );
});
