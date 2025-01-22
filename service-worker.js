// self.addEventListener('install', (event) => {
//     console.log('Service Worker installing.');
//     self.skipWaiting();
// });

// self.addEventListener('activate', (event) => {
//     console.log('Service Worker activating.');
// });

// self.addEventListener('fetch', (event) => {
//     console.log('Fetching:', event.request.url);
// });

// self.addEventListener('push', (event) => {
//     const data = event.data.json();
//     console.log('Push received:', data);

//     const options = {
//         body: data.body,
//         icon: 'icons/icon-192x192.png',
//         badge: 'icons/icon-192x192.png'
//     };

//     event.waitUntil(
//         self.registration.showNotification(data.title, options)
//     );
// });

// // Handle simulated push event
// self.addEventListener('message', (event) => {
//     console.log("evento", event);
//     if (event.data && event.data.type === 'simulate-push') {
//         console.log("doing it")
//         const data = event.data.data;
//         const options = {
//             body: data.body,
//             icon: data.icon,
//             badge: data.badge
//         };
//         self.registration.showNotification('tutke', { body: 'any', tag: Date.now() });

//         // self.registration.showNotification(data.title, options);
//     }
// });