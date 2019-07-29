$(function(){
    jQuery("header").load("/etc/html/header_menu.min.html"),
    jQuery("footer").load("/etc/html/footer.min.html"),
    echo.init({
        throttle:"0"
    });
});
