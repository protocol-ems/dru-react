let cacheData = "ourProtocol-v1";

this.addEventListener("install", (e) => {
  // Using caches.delete here to remove the old data. I don't think this would be correct for a production build.
  caches.delete(cacheData);
  const files = [
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
    "/static/media/notes.8c01160c.svg",
    "/static/css/main.56437479.chunk.css",
    "/static/js/2.902b1c71.chunk.js",
    "/static/js/main.b504a0f8.chunk.js",
  ];

  e.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll(files);
    })
  );
});

this.addEventListener("fetch", (e) => {
  // e.respondWith(
  //   caches.match(e.request).then((res) => {
  //     if (res) {
  //       return res;
  //     } else {
  //       return fetch;
  //     }
  //   })
  // );
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
