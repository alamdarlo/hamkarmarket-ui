/* eslint-disable no-restricted-globals */

self.addEventListener('install', (event) => {
  console.log('[SW] Installing');

  // فعال‌سازی سریع نسخه جدید
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activating');

  event.waitUntil(
    (async () => {
      // پاک‌سازی cacheهای قدیمی اگر بعداً اضافه شد
      const keys = await caches.keys();
      await Promise.all(
        keys.map((key) => {
          if (!key.startsWith('pwa-')) {
            return caches.delete(key);
          }
        })
      );

      // کنترل فوری تمام کلاینت‌ها
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  // فعلاً passthrough
  // بعداً می‌تونی cache-first یا network-first بزنی
  // if (event.request.url.includes('/api/')) {
  //   // برای درخواست‌های API
  //   event.respondWith(
  //     fetch(event.request, {
  //       credentials: 'include'  // خیلی مهم!
  //     })
  //   );
  // }
});

self.addEventListener('push', (event) => {
  let data = {};

  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = { title: 'نوتیفیکیشن', body: event.data?.text() };
  }

  const options = {
    body: data.body || 'نوتیفیکیشن جدید',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-96.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2',
      url: data.url || '/',
    },
    requireInteraction: true,
  };

  event.waitUntil(
    self.registration.showNotification(
      data.title || 'نوتیفیکیشن',
      options
    )
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    (async () => {
      const allClients = await clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
      });

      for (const client of allClients) {
        if (client.url === event.notification.data.url && 'focus' in client) {
          return client.focus();
        }
      }

      if (clients.openWindow) {
        return clients.openWindow(event.notification.data.url);
      }
    })()
  );
});
