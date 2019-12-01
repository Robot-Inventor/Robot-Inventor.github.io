function core() {
    jQuery(".view_timer").each(function(index, target) {
        var startDate = jQuery(this).attr("data-start-date");
        var endDate = jQuery(this).attr("data-end-date");
        var nowDate = new Date();
        if (startDate) {
            startDate = new Date(startDate);
        } else {
            startDate = nowDate;
        }
        if (endDate) {
            endDate = new Date(endDate);
        }
        if (startDate <= nowDate && (!endDate || nowDate <= endDate)) {
            jQuery(this).show();
        } else {
            jQuery(this).hide();
    }
};

jQuery(window).on('load', function() {
      core();
      setInterval(core, 30000);
});
