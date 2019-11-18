$(function(){
    jQuery("header").load("/etc/html/header_menu.html"),
    jQuery("footer").load("/etc/html/footer.min.html"),
    echo.init({
        throttle:"0"
    });
    $(".now_loading").fadeOut();
});
