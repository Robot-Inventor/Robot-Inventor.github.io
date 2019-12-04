importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js')


self.addEventListener('fetch', function(e) {
})

workbox.precaching.precacheAndRoute([
    {
        url: '/etc/html/header_menu.min.html',
        revision: 'b5c9e67'
    },
    {
        url: '/etc/html/footer.min.html',
        revision: '5bba1cd'
    },
    {
        url: '/etc/css/main_style.min.css',
        revision: 'f351cd4'
    },
    {
        url: '/etc/js/basic.min.js',
        revision: '9af3880'
    },
    {
        url: '/etc/js/lazysizes.min.js'
        revision: '420214d'
    },
    {
        url: '/icon/header_image.svg',
        revision: 'ed13b9c'
    },
    {
        url: '/icon/back.svg'
        revision: 'b197ee7'
    },
    {
        url: '/icon/menu.svg',
        revision: 'b197ee7'
    },
    {
        url: '/icon/menu_line.svg',
        revision: 'b197ee7'
    }
])
