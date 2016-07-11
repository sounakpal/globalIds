(function(window) {
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

        //triggering table clicks
        $('.table .sorting').on('click', function(){
            if($(this).hasClass('ascending')){
              $(this).removeClass('ascending').addClass('descending');
              //sorted descending
            }else if($(this).hasClass('descending')){
              $(this).removeClass('descending').addClass('ascending');
              //sorted ascending
            }else{
              $(this).siblings('.ascending').removeClass('ascending');
              $(this).siblings('.descending').removeClass('descending');
              $(this).addClass('ascending');
              //sorted ascending
            }
        });

        $('.table .textarea').on('focus', function(){
            var ele = $(this).closest('tr');
            ele.addClass('hovered');
        });

        $('.table .textarea').on('blur', function(){
            var ele = $(this).closest('tr');
            ele.removeClass('hovered');
        });

        $('.table .clear').on('click',function(){
            var ele = $(this).closest('td').find('textarea');
            ele.val('').focus();
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
    };



})(window);
