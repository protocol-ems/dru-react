let cacheData = "ourProtocol-v1";

this.addEventListener("install", (e) => {
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
