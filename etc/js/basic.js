jQuery(function(){
    var appendContent = '<script async src="/etc/js/echo.min.js"></script>' + '<script async src="/etc/js/read_notice.min.js"></script>' + '<script async src="/etc/js/load_new_article.min.js"></script>' + '<script async src="/etc/js/view_timer.min.js"></script>'
    jQuery("body").append(appendContent);
    jQuery("header").load("/etc/html/header_menu.html");
    jQuery("footer").load("/etc/html/footer.min.html");
    echo.init({
        throttle:"0"
    });
});
