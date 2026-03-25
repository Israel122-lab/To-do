// public/sw.js
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// This listens for a "message" from your React app to start a timer
self.addEventListener('message', (event) => {
  if (event.data.type === 'START_REMINDER') {
    const minutes = event.data.interval;
    
    // Clear any existing timer
    if (self.reminderTimer) clearInterval(self.reminderTimer);

    self.reminderTimer = setInterval(() => {
      // We check if there are tasks to do
      // Note: Service Workers can't see React State directly, 
      // so we use a simple trick or just send the notification.
      self.registration.showNotification("To-do Reminder", {
        body: "You have pending tasks! Tap to open your list.",
        icon: "/logo192.png",
        badge: "/logo192.png", // Small icon for the Android status bar
        vibrate: [200, 100, 200],
        tag: 'todo-reminder', // Prevents multiple notification stacks
        renotify: true 
      });
    }, minutes * 60 * 1000);
  }
  
  if (event.data.type === 'STOP_REMINDER') {
    clearInterval(self.reminderTimer);
  }
});

// This listens for when the user CLICKS the notification
self.addEventListener('notificationclick', (event) => {
  event.notification.close(); // Close the notification immediately

  // This tells the browser to open the app or focus the tab if it's already open
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) {
        let client = clientList[0];
        for (let i = 0; i < clientList.length; i++) {
          if (clientList[i].focused) {
            client = clientList[i];
          }
        }
        return client.focus();
      }
      // If the app isn't open at all, launch it
      return clients.openWindow('/');
    })
  );
});