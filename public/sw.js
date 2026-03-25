// public/sw.js
let reminderInterval = null;

// Keep these! They make the app update instantly
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('message', (event) => {
  if (event.data.type === 'START_REMINDER') {
    const minutes = event.data.interval;
    
    if (reminderInterval) clearInterval(reminderInterval);

    reminderInterval = setInterval(() => {
      self.registration.showNotification("To-do Reminder", {
        body: "Don't forget your tasks! Tap to check your list.",
        icon: "/logo192.png",
        badge: "/logo192.png",
        vibrate: [200, 100, 200],
        tag: 'todo-reminder',
        renotify: true,
        data: { url: '/' }
      });
    }, minutes * 60 * 1000);
  }

  if (event.data.type === 'STOP_REMINDER') {
    if (reminderInterval) {
      clearInterval(reminderInterval);
      reminderInterval = null;
    }
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) return clientList[0].focus();
      return clients.openWindow('/');
    })
  );
});