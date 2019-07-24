jQuery(window).on('load', function() {
    jQuery('#loader-bg').hide();
});
$( function() {
    $( 'img.lazy' ).lazyload( {
        effect: 'fadeIn',
	effect_speed: 1000,
    });
});
