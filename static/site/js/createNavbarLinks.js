(function($) {

    /*
     * Script that retrieves every <div> with the tag ´data-navigation´
     * and renders a small submenu. Useful only on CMS pages that have
     * Plugins with navigation properties such as ContainerPlugin and
     * BackgroundImageTextPlugin.
     *
     * Easily overriden.
     */

    if($(".site-content > *[data-navigation]").length > 0){
        $(".site-content > *[data-navigation]").each(function(){
            var title = $(this).attr("data-navigation");

            if(!$(this).attr("id")){
                var slug = $(this).find("*[id]").attr("id");
            }else{
                var slug = $(this).attr("id");
            }

            var anchor_string = "<li><a href='#" + slug +  "' data-title='" + title + "'>" + title + "</a></li>";

            // If it's an external link, overrides anchor_string
            if($(this).attr("data-link")){
                slug = $(this).attr("data-link");

                if($(this).attr("data-navigation-window")){
                    anchor_string = "<li><a href='" + slug +  "' target='" + $(this).attr("data-navigation-window") + "' data-title='" + title + "'>" + title + "</a></li>";
                }else{
                    anchor_string = "<li><a href='" + slug +  "' data-title='" + title + "'>" + title + "</a></li>";
                };
            }

            $(anchor_string).appendTo( ".main-menu" );
        });
    };

})(jQuery);
