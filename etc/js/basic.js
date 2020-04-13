var userAgent = window.navigator.userAgent.toLowerCase();
if(userAgent.indexOf('msie') != -1 ||
    userAgent.indexOf('trident') != -1) {
        window.location.replace("/etc/html/do_not_use_ie.html");
}

function set_lazyload() {
    if ("loading" in HTMLImageElement.prototype && "loading" in HTMLIFrameElement.prototype) {
        lazy_elements = document.querySelectorAll("img.lazyload, iframe.lazyload");
        lazy_elements.forEach(function(e) {
            e.setAttribute("loading", "lazy");
            e.setAttribute("src", e.getAttribute("data-src"));
        });
    } else {
        var script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/lazysizes@5.2.0/lazysizes.min.js"
        document.body.appendChild(script);
    }
}

jQuery(function() {
    set_lazyload();
    const target = document;
    const observer = new MutationObserver(records => {
        set_lazyload();
    });
    observer.observe(target, {
        childList: true
    })
});

setTimeout(function(){
    if (document.cookie.indexOf("cookieConsent") == -1) {
        jQuery(".cookie_info").fadeIn(300);
        jQuery(".agree_cookie").click(function() {
            jQuery(".cookie_info").fadeOut(300);
            document.cookie = 'cookieConsent=true; max-age=2592000';
        });
    }
},5000);

var swURL = '';

if(jQuery('#basic_js').attr('data-service-worker') != undefined) {
    swURL = jQuery(this).attr('data-service-worker');
} else {
    swURL = '/service_worker.js';
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(swURL).then(function(registration) {
        console.log('ServiceWorker の登録に成功しました。スコープ: ', registration.scope);
    }).catch(function(err) {
        console.log('ServiceWorker の登録に失敗しました。', err);
    });
}
