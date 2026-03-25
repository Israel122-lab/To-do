// public/sw.js
let timerId = null;

// 1. Immediate activation
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// 2. The Recursive Timer Function
// This is better than setInterval because it "re-registers" the task with the browser
function startBackgroundTimer(minutes) {
  if (timerId) clearTimeout(timerId);

  const ms = minutes * 60 * 1000;

  timerId = setTimeout(() => {
    // Show the notification
    self.registration.showNotification("To-do Reminder", {
      body: "Don't forget your tasks! Tap to check your list.",
      icon: "/logo192.png",
      badge: "/logo192.png",
      vibrate: [200, 100, 200],
      tag: 'todo-reminder', // Keeps notifications from stacking up
      renotify: true,
      data: { url: '/' }
    });

    // Loop: Start the next countdown
    startBackgroundTimer(minutes);
  }, ms);
}

// 3. Listen for messages from React
self.addEventListener('message', (event) => {
  if (event.data.type === 'START_REMINDER') {
    console.log(`Setting background timer for ${event.data.interval} minutes`);
    startBackgroundTimer(event.data.interval);
  }

  if (event.data.type === 'STOP_REMINDER') {
    console.log("Stopping background timer");
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  }
});

// 4. Handle Notification Clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  // Bring the user back to the app
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return clients.openWindow('/');
    })
  );
});