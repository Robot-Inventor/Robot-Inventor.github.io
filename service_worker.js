importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js')


self.addEventListener('fetch', function(event) {
})

workbox.precaching.precacheAndRoute([
    {
        url: 'https://cdn.jsdelivr.net/npm/lazysizes@5.2.0/lazysizes.min.js',
        revision: '0'
    },
    {
        url: 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',
        revision: '0'
    },
    {
        url: '/icon/30.svg',
        revision: '0'
    },
    {
        url: '/icon/android-chrome-192x192.png',
        revision: '0'
    },
    {
        url: '/icon/favicon.ico',
        revision: '0'
    },
    {
        url: '/icon/site.webmanifest',
        revision: '0'
    },
    {
        url: 'https://apis.google.com/js/platform.js',
        revision: '0'
    },
    {
        url: 'https://www.google-analytics.com/analytics.js',
        revision: '0'
    },
    {
        url: 'https://platform.twitter.com/widgets.js',
        revision: '0'
    },
    {
        url: 'https://www.googletagmanager.com/gtag/js?id=UA-140830854-3',
        revision: '0'
    }
])
