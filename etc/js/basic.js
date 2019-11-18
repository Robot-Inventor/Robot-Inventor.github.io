jQuery("header").load("/etc/html/header_menu.html");
jQuery(function(){
    jQuery("footer").load("/etc/html/footer.min.html");
    echo.init({
        throttle:"0"
    });
});
