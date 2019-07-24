jQuery(window).on('load', function() {
    jQuery('#loader-bg').hide();
    jQuery('header').load('/ORIZIN_Agent/header_menu_test.html');
});
$( function() {
    $( 'img.lazy' ).lazyload( {
        effect: 'fadeIn',
	effect_speed: 3000,
	skip_invisible: true,
	placeholder: '/ORIZIN_Agent/icon/805.png',
    });
});
