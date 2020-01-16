var userAgent = window.navigator.userAgent.toLowerCase();
if(userAgent.indexOf('msie') != -1 ||
    userAgent.indexOf('trident') != -1) {
        window.location.replace("/etc/html/do_not_use_ie.html");
}

jQuery(function(){
    jQuery("header").load("/etc/html/header_menu.html");
    echo.init({
        throttle:"0"
    });
});

setTimeout(function(){
    jQuery("footer").load("/etc/html/footer.min.html");
},5000);
setTimeout(function(){
    if (document.cookie.indexOf("cookieConsent") == -1) {
        //alert("このサイトでは、皆さんに最高の体験をお届けするためにcookieを使用しています。詳しくはメニューよりプライバシーポリシーをご覧ください。");
        jQuery(".cookie_info").fadeIn(300);
        jQuery(".agree_cookie").click(function() {
            jQuery(".cookie_info").fadeOut(300);
        });
        document.cookie = 'cookieConsent=true; max-age=2592000';
    }
},5000);

var swURL = '';

if(jQury('#basic_js').attr('data-service-worker') != undefined) {
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
