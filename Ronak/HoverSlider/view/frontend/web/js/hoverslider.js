require([
    'jquery',
], function($) {
    $(document).ready(function(){
        var timeInterval;
        $(".product-item").each(function() {
            var this_main = $(this);
            var slider_images = this_main.find(".product-images").attr("all-media");
            if (slider_images) {
                var slider_images = JSON.parse(slider_images);
                if(this_main.find(".product-item-info .show_dots").length == 0 && slider_images.length>1) {
                    var dot_html =  "<ul class='show_dots no-display'><li class='nav-dots'>";
                    slider_images.forEach(function(img,index) {
                        if (index == 0) {
                            dot_html+="<label for='img-"+index+"' index="+index+" class='nav-dot active nav-dot-"+index+"' id='img-dot-1' class='active'></label>"
                        } else {
                            dot_html+="<label for='img-"+index+"' index="+index+" class='nav-dot nav-dot-"+index+"' id='img-dot-1' class='active'></label>"
                        }
                    });
                    dot_html+="</li></ul>";
                    this_main.find(".product-item-info").prepend(dot_html);
                }
                $(this).find('.product-item-info').on('mouseenter', function () {
                    this_main.find(".show_dots").show();
                    var photo_this = $(this).find(".product-image-photo");
                    var i = 1;
                    photo_this.attr('original-image', photo_this.attr('src'));
                    timeInterval = setInterval(function () {
                        photo_this.attr('src', slider_images[i]);
                        this_main.find(".nav-dot").removeClass('active');
                        this_main.find(".nav-dot-"+i).addClass('active');
                        i++;
                        if (i >= slider_images.length) {
                            i = 0;
                        }
                    }, 1000);
                })
                $(this).find('.product-item-info').on('mouseleave', function () {
                    var photo_this = $(this).find(".product-image-photo");
                    this_main.find(".show_dots").hide();
                    this_main.find(".nav-dot").removeClass('active');
                    this_main.find(".nav-dot:first").addClass('active');
                    clearInterval(timeInterval);
                    if (photo_this.attr('original-image')) {
                        photo_this.attr('src', photo_this.attr('original-image'));
                    }
                })
            } else {
                console.log("Not available");
            }
        });
    })
});