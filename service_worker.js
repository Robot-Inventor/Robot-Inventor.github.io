importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js')


self.addEventListener('fetch', function(event) {
})

workbox.precaching.precacheAndRoute([
    {
        url: '/etc/js/basic.min.js',
        revision: '9af3880'
    },
    {
        url: 'https://cdn.jsdelivr.net/npm/lazysizes@5.2.0/lazysizes.min.js',
        revision: '0123456'
    },
    {
        url: 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',
        revision: '0123456'
    }
])
