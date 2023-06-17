self.addEventListener('install',function(event){
    //console.log('[service worker] install',event)
});

self.addEventListener('activate',function(event){
    //console.log('[service worker] activate',event);
    return self.clients.claim();
});

self.addEventListener('fetch',function(event){
    //console.log('[service worker] fetch',event)
});

// notificationclick event triggers when we click on notifications
self.addEventListener('notificationclick',function(event){
    event.preventDefault();
    console.log('[service worker] notificationclick',event.notification.data)
    var notification = event.notification;
    var action = event.action;

    
  if (action === 'confirm') {
    console.log('Confirm was chosen');
    notification.close();
  } else {
    console.log(action);
    event.waitUntil(
      clients.matchAll()
        .then(function(clis) {
          var client = clis.find(function(c) {
            return c.visibilityState === 'visible';
          });

          if (client !== undefined) {
            client.navigate(notification.data.url);
            client.focus();
          } else {
            clients.openWindow(notification.data.url);
          }
          notification.close();
        })
    );
  }

});



self.addEventListener('notificationclose',function(event){
    event.preventDefault();
    console.log('[service worker] notificationclose',event)
});

self.addEventListener('push',function(event){
    event.preventDefault();
    var data = {title:"default title",content:"default content", openUrl:"/"};
    console.log('[service worker] push',event);

    if(event.data){
        data = JSON.parse(event.data.text());
    }
    console.log(data);

    var options = {
        body: data.content,
        icon: 'logo192.png',
        image: '/src/images/sf-boat.jpg',
        dir: 'ltr',
        lang: 'en-US', // BCP 47,
        vibrate: [100, 50, 200],
        badge: 'logo192.png',
        tag: 'confirm-notification',
        renotify: true,
        // actions: [
        //   { action: 'confirm', title: 'Okay', icon: 'logo192.png' },
        //   { action: 'cancel', title: 'Cancel', icon: 'logo192.png' }
        // ]
        data:{
            url:data.openUrl
        }
      };

      //witUntill / make sure, it will wait for SW to show this notification.
      //self.registration - register sw with browser and shows notification 
    event.waitUntil(
        self.registration.showNotification(data.title,options)
    );

});
