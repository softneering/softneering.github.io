// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

var firebaseConfig = {
    apiKey: "AIzaSyBqKCowH3kvOBClc8ZpwF-ZwcuQXzdd8QI",
    authDomain: "ccapp-373211.firebaseapp.com",
    projectId: "ccapp-373211",
    storageBucket: "ccapp-373211.appspot.com",
    messagingSenderId: "47558031988",
    appId: "1:47558031988:web:6e83be97a736e8258e6f21",
    measurementId: "G-Y08MCK5150"
  };
  
  firebase.initializeApp(firebaseConfig);

  // Retrieve firebase messaging
  const messaging = firebase.messaging();
//   messaging.requestPermission()
//   .then((res)=>{
//     console.log(res)
//   })
//   .catch((err)=>{
//       console.log(err)
//   })

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
