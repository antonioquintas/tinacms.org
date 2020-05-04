(function($) {

    var $menu = $('.js-collapsedMenu'),
        $body = $('body'),
        $toggleMenu = $('.js-toggleMenu');


    // MOBILE MENU
    checkMobile();
    $(window).resize(checkMobile);

    $toggleMenu.on('click', function(e) {
        e.preventDefault();

        if($menu.hasClass('visible')){
            $menu.removeClass('visible').slideUp();
            $('body').animate({
                marginTop: 0
            });
        } else {
            var menuHeight = $menu.innerHeight();
            $menu.addClass('visible').slideDown();
            $('body').animate({
                marginTop: menuHeight
            });
        }
    });

    function checkMobile(){
        $('body').css('margin-top', 0);
        if($menu.length && $toggleMenu.css('display') !== 'none'){
            // Is mobile
            $menu.removeClass('visible').hide();
        } else {
            $menu.removeClass('visible').show();
        }
    }


    var $header = $('.js-header'),
        scrollOffset = $header.innerHeight(),
        $menuScroll = $('.js-menuScroll');

    // SMOOTH SCROLL
    $menuScroll.find('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        var target = this.hash;
        //window.location.hash = target;
        if (history.pushState) {
            // IE10, Firefox, Chrome, etc.
            window.history.pushState(null, null, target);
        } else {
            // IE9, IE8, etc
            window.location.hash = target;
        }

        // Update menu links status
        $menuScroll.find('li.active').removeClass("active");
        $(this).parent('li').addClass("active");

        // Scroll to element
        $('html, body').stop().animate({
            'scrollTop': $(target).offset().top - scrollOffset + 1  // 1 = scroll compensation
        }, 500, function () {
            if (history.pushState) {
                // IE10, Firefox, Chrome, etc.
                window.history.pushState(null, null, target);
            } else {
                // IE9, IE8, etc
                window.location.hash = target;
            };
            $(document).on("scroll", onScroll);
        });

        // Update menu when scroll to top
        if($(target).offset().top === 0){
            $menuScroll.find('li.active').removeClass("active");
        }

        // Close menu
        if($menu.length && $toggleMenu.css('display') !== 'none'){
            $menu.removeClass('visible').hide();
        }
    });

    // ON SCROLL EVENT
    $(document).on("scroll", onScroll);

    function onScroll(event){
        var scrollPos = $(document).scrollTop();

        // Update menu links status on scroll
        $menuScroll.find('li').each(function () {
            var refElement = $($(this).find('a').attr("href"));

            if(refElement.length){
                var elemTop = refElement.position().top - scrollOffset;
                if (elemTop <= scrollPos && elemTop + refElement.height() > scrollPos) {
                    $menuScroll.find('li.active').removeClass("active");
                    $(this).addClass("active");
                }
                else{
                    $(this).removeClass("active");
                }
            }
        });
    }

})(jQuery);