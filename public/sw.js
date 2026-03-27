// public/sw.js

// 1. Immediate activation (Keep this)
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// 2. THE PUSH LISTENER (The Heart of the Full-Stack version)
// This listens for the message sent by web-push from your Server/Cron Job
self.addEventListener('push', (event) => {
  let data = { title: "To-do List", body: "Don't forget your tasks!" };

  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      // Fallback if the server sends plain text instead of JSON
      data = { title: "To-do List", body: event.data.text() };
    }
  }

  const options = {
    body: data.body,
    icon: "/logo192.png", // Make sure this file exists in your public folder!
    badge: "/logo192.png",
    vibrate: [200, 100, 200],
    tag: 'todo-reminder',
    renotify: true,
    data: { url: '/' }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// 3. Handle Notification Clicks (Keep this)
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // If the app is already open, just focus it
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      // If not open, open a new window
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});