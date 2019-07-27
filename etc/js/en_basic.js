$(function(){
    jQuery("header").load("/ORIZIN_Agent/etc/html/en_header_menu.min.html"),
    jQuery("footer").load("/ORIZIN_Agent/etc/html/footer.min.html"),
    echo.init({
        throttle:"0"
    });
});
