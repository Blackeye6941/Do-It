const CACHE_NAME = "todo-cache-v1"
const cacheUrls = [
    "/",
    "/index.css",
    "/index.html",
    "/script.js",
    "/Do_It.png"
];

self.addEventListener(("install", (e) => {
    e.waitUntil(caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(cacheUrls);
    }))
}));

self.addEventListener(("fetch", (e) => {
    e.respondWith(caches.match(e.request).then((res) => {
        return res || fetch(e.request);
    }))
}));

self.addEventListener("activate", (e) => {
    e.waitUntil(caches.keys().then((cacheNames) => {
        return Promise.all( cacheNames.map((cache) => {
            if(cache !== "todo-cache-v1"){
                return caches.delete(cache);
            }
        }))
    }))
})