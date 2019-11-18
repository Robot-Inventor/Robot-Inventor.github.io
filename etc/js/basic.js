$(function(){
    jQuery("header").load("/etc/html/header_menu.html"),
    jQuery("footer").load("/etc/html/footer.min.html"),
    echo.init({
        throttle:"0"
    });
    setTimeout($(".now_loading").fadeOut(2000), 3000);
});

window.addEventListener('load', function() {
    $(".now_loading").fadeOut(2000);
}
