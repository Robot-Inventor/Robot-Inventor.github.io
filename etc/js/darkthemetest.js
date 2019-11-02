$(function(){
    var darkmode = document.createElement('script');
    darkmode.src = 'https://cdn.jsdelivr.net/npm/darkmode-js@1.5.1/lib/darkmode-js.min.js';
    document.body.appendChild(darkmode);
    jQuery("header").load("/etc/html/header_menu.min.html");
    jQuery("footer").load("/etc/html/footer.min.html");
    echo.init({
        throttle:"0"
    });
    new Darkmode().showWidget();
});
