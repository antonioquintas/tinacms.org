(function($) {

    var commonPopupClass = 'mfp-fade-in';
    var commonBgClickClose = false;
    var commonCloseMarkup = '<button title="%title%" type="button" class="mfp-close"></button>';

    // $('.js-openPopup').on("click", function(e){
    //     e.preventDefault();
    // });

    // DEFAULT POPUP
    function clearHash(){
        var lastPos = $(window).scrollTop();
        window.location.hash = '';
        $(window).scrollTop(lastPos);
    }

    var defaultPopupOptions = {
        type: 'inline',
        closeMarkup: commonCloseMarkup,
        mainClass: commonPopupClass,
        closeOnBgClick: commonBgClickClose,
        callbacks: {
            open: function() {
                // Add a prefix 'm-' to avoids clashing with page scroll
                window.location.hash = "m-" + this.currItem.src;
                $('body').addClass('popup-opened default-popup');
            },
            close: function() {
                clearHash();
                $('body').removeClass('popup-opened default-popup');
            },
        },
    };

    $('.js-openPopup').magnificPopup(defaultPopupOptions);

    if(/^#m-/.test(window.location.hash)){
        // Tests if the hash STARTS with '#m-'
        // If true, retrieves id from hash (itemSrc) and opens modal window
        var hash = window.location.hash,
            itemSrc = hash.substr(hash.lastIndexOf("#")),
            optionsExtend = {
                items: { src: itemSrc }
            },
            thisOptions = $.extend({}, defaultPopupOptions, optionsExtend);

        $.magnificPopup.open(thisOptions);
    }


    // GALLERY POPUP
    $('.js-gallery').each(function() {
        $(this).magnificPopup({
            //items: items,
            type: 'image',
            delegate: 'li',
            closeMarkup: commonCloseMarkup,
            mainClass: commonPopupClass,
            closeOnBgClick: commonBgClickClose,
            gallery: {
                enabled: true,
                preload: [0,2],
                tCounter: ''
            },
            image: {
                markup: '<div class="mfp-close"></div>'+
                        '<div class="mfp-figure">'+
                            '<div class="mfp-img"></div>'+
                            '<div class="mfp-bottom-bar">'+
                                '<div class="mfp-title"></div>'+
                                '<div class="mfp-counter"></div>'+
                            '</div>'+
                        '</div>',
            },
            iframe: {
                markup: '<div class="mfp-close"></div>' +
                        '<div class="mfp-iframe-scaler">'+
                            '<iframe class="mfp-iframe" frameborder="0" wmode=transparent” allowfullscreen></iframe>'+
                            '<div class="mfp-bottom-bar">'+
                                '<div class="mfp-title"></div>'+
                                '<div class="mfp-counter"></div>'+
                            '</div>' +
                        '</div>',
                srcAction: 'iframe_src',
            },
            zoom: {
                enabled: true,
                duration: 300, // change the duration also in CSS
                opener: function(element) {
                    return element.find('img');
                }
            },
            callbacks: {
                buildControls: function() {
                    // re-appends controls inside the main container
                    this.arrowLeft.appendTo(this.contentContainer);
                    this.arrowRight.appendTo(this.contentContainer);
                },
                open: function() {
                    addSwipeTo(".mfp-gallery");
                    $('body').addClass('popup-opened gallery-popup');
                },
                close: function() {
                    $('body').removeClass('popup-opened gallery-popup');
                },
                beforeOpen: function() {
                    this.st.iframe.markup = this.st.iframe.markup.replace('mfp-iframe-scaler', 'mfp-iframe-scaler mfp-with-anim');
                    this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                    this.st.mainClass = this.st.el.attr('data-effect');
                }
            },
        });

        var magnificPopup = $.magnificPopup.instance;
        // Enable swiping
        // http://codepen.io/saintjon/pen/KwvvVr
        var addSwipeTo = function(selector) {
            $(selector).swipe("destroy");
            $(selector).swipe({
                //Generic swipe handler for all directions
                swipe:function(event, direction, distance, duration, fingerCount) {
                    //$(this).text("You swiped " + direction );
                    if(direction == "left") {
                        magnificPopup.next();
                    } else if (direction == "right") {
                        magnificPopup.prev();
                    }
                },
                //Default is 75px, set to 0 for demo so any distance triggers swipe
                threshold:0
            });
        };
    });


})(jQuery);