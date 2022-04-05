self.addEventListener("install",e=>{
   e.waitUntil(
       caches.open("static").then(cache =>{
           return cache.addAll(["./index.html", "./app.css", "./alerts.html", "./feedback.html", "./crops.html", "./details.html", "./images/jpeeg.webp", "./images/144.png"], "fonts/Gilroy-Light.otf");
       })
   );
});
self.addEventListener("fetch",e=>{
   e.respondWith(
       caches.match(e.request).then(response =>{
           return response || fetch(e.request);
       })
   );
});