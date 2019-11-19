jQuery(function(){
    jQuery("header").load("/etc/html/header_menu.html");
    jQuery("footer").load("/etc/html/footer.min.html");
    echo.init({
        throttle:"0"
    });
    var e = document.getElementByTagName("main");
    e.style.display = "none";
});

$(window).on('load', function() {
    $("main").fadeIn();
});
