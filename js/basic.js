jQuery(window).on('load', function() {
    jQuery('#loader-bg').hide();
    jQuery('header').load('/ORIZIN_Agent/header_menu.html');
});
$( function() {
    $( 'img.lazy' ).lazyload( {
        effect: 'fadeIn',
	effect_speed: 1000,
    });
});
