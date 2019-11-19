jQuery(function(){
    jQuery("header").load("/etc/html/header_menu.html");
    jQuery("footer").load("/etc/html/footer.min.html");
    echo.init({
        throttle:"0"
    });
    var content = document.getElementByTagName("main");
    content.style.display = "none";
});

$(window).on('load', function() {
    $("main").fadeIn(3000);
});
