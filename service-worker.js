/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

self.addEventListener("push", (event) => {
  try {
    if (!event.data) {
      //   console.error("Push event triggered but no data found.");
      return;
    }

    const data = event.data.json();
    // console.log("Push received:", data);

    const options = {
      body: data?.head || "You have a new notification.",
      icon:
        data.icon ||
        "https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/Netaji_Subhas_University_of_Technology.svg/1200px-Netaji_Subhas_University_of_Technology.svg.png",
      badge:
        data.badge ||
        "https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/Netaji_Subhas_University_of_Technology.svg/1200px-Netaji_Subhas_University_of_Technology.svg.png",
      actions: data.actions || [],
      data: data.url || "/",
      requireInteraction: data.requireInteraction || false,
      timestamp: data.timestamp || Date.now(),
    };

    // Show the notification
    self.registration.showNotification(
      data.title || "New Notification",
      options
    );
  } catch (error) {
    // console.error("Error handling push event:", error);
  }
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        if (clientList.length > 0) {
          let client = clientList[0];
          for (let i = 0; i < clientList.length; i++) {
            if (clientList[i].focused) {
              client = clientList[i];
              break;
            }
          }
          return client.focus();
        }
        return clients.openWindow(event.notification.data);
      })
  );
});
