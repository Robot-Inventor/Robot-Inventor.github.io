jQuery(window).on('load', function() {
    jQuery('#loader-bg').hide();
});
$( function() {
    jQuery('header').load('/ORIZIN_Agent/etc/html/header_menu.html');
    jQuery('footer').load('/ORIZIN_Agent/etc/html/footer.html');
    echo.init ({
        throttle: '500'
    });
});
