/* DedicatusIT OS — offline shell, network-first.
   Always fetches the latest files when online so updates show immediately;
   falls back to the cached copy only when offline. */
const CACHE = "dedicatusit-os-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png"
];

self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(() => {}));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  // Let Microsoft auth / Graph calls hit the network untouched.
  if (url.hostname.includes("microsoft") || url.hostname.includes("msauth") || url.hostname.includes("graph")) return;
  if (e.request.method !== "GET") return;

  // Network-first: fetch fresh, update cache, fall back to cache offline.
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(e.request).then(hit => hit || caches.match("./index.html")))
  );
});
