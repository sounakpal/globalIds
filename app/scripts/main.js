(function(window,$) {
    'use strict';
    // body...
    window.addEventListener('load', function(e) {
        ui.allLoadFunctions();
    });

    var ui = window.ui || {};

    ui.allLoadFunctions = function() {
        ui.registerClickFunctions();
        ui.checkDataCount();
    }

    ui.registerClickFunctions = function() {

        $('#menu-icon,#leftSection').on('click', function() {
            $('#leftSection').toggleClass('active');
        });

        $('.bird-eye_projects .each-item').on('click', function() {
            $(this).toggleClass('active');
        });
    }
    ui.checkDataCount = function() {
        $('.bird-eye_projects .each-item').each(function() {
            if ($(this).data('complete-projects') === $(this).data('total-projects')) {
                $(this).addClass('complete');
            }
        });
    }
})(window, jQuery);
