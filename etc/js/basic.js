var deleteLoadingBar = function(){
    jQuery(".now_loading").fadeOut();
}

setTimeout(deleteLoadingBar, 3000);


$(function(){
    jQuery("header").load("/etc/html/header_menu.html");
    jQuery("footer").load("/etc/html/footer.min.html");
    deleteLoadingBar();
    echo.init({
        throttle:"0"
    });
});
/*
window.addEventListener('load', function() {
    $(".now_loading").fadeOut(2000);
}
*/
