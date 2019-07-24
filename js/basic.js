var scripts = ['https://code.jquery.com/jquery-3.2.1.min.js', '/ORIZIN_Agent/js/jquery.lazyload.min.js'];
var len = scripts.length;
var i = 0;

(function appendScript() {
    var script = document.createElement('script');
    script.src = scripts[i];
    document.body.appendChild(script);

    if (i++ < len) {
        script.onload = appendScript;
    }
})();insertBefore( script, firstScript );

/*document.write('<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>');
document.write("<script src='/ORIZIN_Agent/js/jquery.lazyload.min.js'></script>");*/
jQuery(window).on('load', function() {
    jQuery('#loader-bg').hide();
});
$( function() {
    jQuery('header').load('/ORIZIN_Agent/header_menu.html');
    $( 'img.lazy' ).lazyload( {
        effect: 'fadeIn',
	effect_speed: 3000,
	skip_invisible: true,
	placeholder: '/ORIZIN_Agent/icon/805.png',
    });
});
