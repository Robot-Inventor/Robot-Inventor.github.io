var darkmodelib = document.createElement('script');
darkmodelib.src = 'https://cdn.jsdelivr.net/npm/darkmode-js@1.5.1/lib/darkmode-js.min.js';
documentlib.body.appendChild(darkmode);

$(function(){
    jQuery("header").load("/etc/html/header_menu.min.html");
    jQuery("footer").load("/etc/html/footer.min.html");
    echo.init({
        throttle:"0"
    });
    var options = {
        label: '🌓'
    }
    const darkmode = new Darkmode(options);
    window.setTimeout(darkmode.showWidget, 0);
});
