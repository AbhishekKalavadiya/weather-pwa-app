const CACHE_NAME = 'version-1'
const urlsToCahe = ['index.html', 'offline.html']

const self = this

//Install a SW
self.addEventListener('install', (event) => {
    event.waitUntill(
        caches.open(CACHE_NAME)
            .then((cache)=> {
                console.log('Opened Cache')

                return cache.addAll(urlsToCahe)
            })
    );
});

// Listen for requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request)
                    .catch(() => caches.match('offline.html'))
            })
    )
})

//activate the SW
self.addEventListener('activate', (event) => {
    const cacheWhiteList = []
    cacheWhiteList.push(CACHE_NAME)

    event.waitUntill(
        caches.keys()
            .then((cacheNames) => Promise.all(
                cacheNames.map((cacheName) => {
                    if(!cacheWhiteList.includes(cacheName)){
                        return caches.delete(cacheName)
                    }
                })
            ))
    )

})