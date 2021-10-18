let cacheData = "ourProtocol-v1";

this.addEventListener("install", (e) => {
  // Using caches.delete here to remove the old data. I don't think this would be correct for a production build.
  caches.delete(cacheData);

  e.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        "/static/js/main.chunk.js",
        "/static/js/bundle.js",
        "/static/js/vendors~main.chunk.js",
        "/static/js/vendors~main.chunk.js.map",
        "/index.html",
        "/",
        "/dashboard",
        "/static/js/main.chunk.js.map",
        "/logo1.svg",
        "/offline-dashboard",
        "/static/media/test1.5cfec44b.gif",
        "/static/media/notes.8c01160c.svg",
      ]);
    })
  );
});

this.addEventListener("fetch", (e) => {
  if (!navigator.onLine) {
    e.respondWith(
      caches.match(e.request).then((res) => {
        if (res) {
          return res;
        }
        let requestUrl = e.request.clone();
        fetch(requestUrl);
      })
    );
  }
});
