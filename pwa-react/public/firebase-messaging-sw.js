//firebase-messaging-sw
self.addEventListener("install", function (e) {
  console.log("fcm sw install..");
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("fcm sw activate..");
});

self.addEventListener("push", function (e) {
  console.log("push: ", e.data.json());
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: resultData.image,
    tag: resultData.tag,
    data: e.data.json().data["gcm.notification.data"]
    ,
    ...resultData,
  };
  console.log("push: ", { resultData, notificationTitle, notificationOptions });
  if (notificationOptions.tag === "true") {
    console.log("푸시알림 받겠삼");
    self.registration.showNotification(notificationTitle, notificationOptions);
  } else {
    console.log("푸시알림이 꺼져있삼");
  }
});

self.addEventListener("notificationclick", function (event) {
  console.log("notification click");
  console.log(event.notification.data);
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data));
});
