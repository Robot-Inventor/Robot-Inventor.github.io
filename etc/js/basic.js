$(function(){
    jQuery("header").load("/etc/html/header_menu.html"),
    jQuery("footer").load("/etc/html/footer.min.html"),
    echo.init({
        throttle:"0"
    });
});

window.onload = function() {
    $(".now_loading").fadeOut(2000);
}
