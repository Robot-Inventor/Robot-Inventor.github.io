document.open();
document.write("<script type='text/javascript' src='https://code.jquery.com/jquery-3.2.1.min.js'></script>");
document.write("<script type='text/javascript' src='/ORIZIN_Agent/js/jquery.lazyload.min.js'></script>");
document.close();
jQuery(window).on('load', function() {
    jQuery('#loader-bg').hide();
    jQuery('header').load('/ORIZIN_Agent/header_menu.html');
});
$( function() {
    $( 'img.lazy' ).lazyload( {
        effect: 'fadeIn',
	effect_speed: 3000,
	skip_invisible: true,
	placeholder: '/ORIZIN_Agent/icon/805.png',
    });
});
