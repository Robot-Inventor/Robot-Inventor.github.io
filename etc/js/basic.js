$(function(){
    jQuery("header").load("/etc/html/header_menu.min.html"),
    jQuery("footer").load("/etc/html/footer.min.html"),
    jQuery("#last_modified").load("/etc/html/last_modified.min.html"),
    echo.init({
        throttle:"0"
    });
});
