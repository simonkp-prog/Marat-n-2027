const CACHE = 'maraton-2027-v1';
const ASSETS = [
  '/Marat-n-2027/entrenamiento-maraton.html',
  '/Marat-n-2027/manifest.json',
  '/Marat-n-2027/icon-192.png',
  '/Marat-n-2027/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
