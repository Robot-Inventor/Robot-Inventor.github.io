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
    setTimeout(function(){
        jQuery("footer").load("/etc/html/footer.html");
    },3000);
    setTimeout(function(){
        if (document.cookie.indexOf("cookieConsent") == -1) {
            alert("このサイトでは、皆さんに最高の体験をお届けするためにcookieを使用しています。詳しくはメニューよりプライバシーポリシーをご覧ください。");
            document.cookie = 'cookieConsent=true"; max-age=2592000';
        }
    },4000);
});
