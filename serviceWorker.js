const staticP7 = "P7-V1"
const assets = [
    "/",
    "/index.html",
    "/assets/css/main.css",
    "/assets/css/font-raro.css",
    "/assets/css/all.min.css",
    "/assets/js/bridge.js",
    "/assets/js/main.js",
    "/assets/js/jquery.min.js",
    "/assets/js/util.js",
    "/assets/js/skel.min.js",
    "/assets/js/skel.min.js"
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
      caches.open(staticP7).then(cache => {
        cache.addAll(assets)
      })
    )
  })

  self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })