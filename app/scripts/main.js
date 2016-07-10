(function(window,$) {
    'use strict';
    // body...
    window.addEventListener('load', function(e) {
        ui.allLoadFunctions();
    });

    var ui = window.ui || {};

    ui.allLoadFunctions = function() {
        ui.registerClickFunctions();
        ui.checkStatusProject();
    };

    ui.registerClickFunctions = function() {

        $('#menu-icon,#leftSection').on('click', function() {
            $('#leftSection').toggleClass('active');
        });

        $('.bird-eye_projects .each-item').on('click', function() {
            $(this).toggleClass('active');
        });
    };
    ui.checkStatusProject = function() {
        $('.bird-eye_projects .each-item').each(function() {
          var complete = $(this).data('complete-projects'),
          total = $(this).data('total-projects'),
          ele = $(this).find('.status-bar')[0],
          percent = (complete/total * 100) +'%';
          
          if (complete === total) {
              $(this).addClass('complete');
          }

          ele.style.width = percent;
        });
    }
})(window, jQuery);
