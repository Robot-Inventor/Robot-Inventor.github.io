setTimeout(deleteProgress, 3000);

var deleteProgress = function(){
    $(".now_loading").fadeOut(2000);
}

$(function(){
    jQuery("header").load("/etc/html/header_menu.html");
    jQuery("footer").load("/etc/html/footer.min.html");
    jQuery(".now_loading").fadeOut(2000);
    echo.init({
        throttle:"0"
    });
});
/*
window.addEventListener('load', function() {
    $(".now_loading").fadeOut(2000);
}
*/
