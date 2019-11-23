jQuery(function(){
    jQuery("header").load("/etc/html/test_header_menu.html");
    jQuery("footer").load("/etc/html/footer.min.html");
    echo.init({
        throttle:"0"
    });
});
