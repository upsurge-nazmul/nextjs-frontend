importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyAAwWmI0lkLmQYFylZBabcEowtfkazvcCs",
  authDomain: "upsurge-demo.firebaseapp.com",
  projectId: "upsurge-demo",
  storageBucket: "upsurge-demo.appspot.com",
  messagingSenderId: "812410598050",
  appId: "1:812410598050:web:d0c745420caed195279dfb",
  measurementId: "G-55GVLYMBPP",
};

firebase.initializeApp(firebaseConfig);

// Check if messaging is supported
if (firebase.messaging.isSupported()) {
  // Retrieve firebase messaging
  const messaging = firebase.messaging();

  messaging.onBackgroundMessage(function (payload) {
    const notificationTitle =
      payload.data?.title || payload.notification?.title;
    const notificationOptions = {
      body: payload.data?.body || payload.notification?.body,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
} else {
  console.warn("Firebase Messaging is not supported in this environment.");
}
