
(function ($) {
    $.fn.roundImage = function() {
        return this.each(function() {
            var image = $(this),
                imageWidth = image.width(),
                imageHeight = image.height(),
                imgSrc = image.attr('src'),
                radius = Math.min(imageWidth, imageHeight) / 2,
                uniqId = function() {
                    return Math.round(new Date().getTime() + (Math.random() * 100));
                },
                svgClipPathId = uniqId();
            image.replaceWith('<svg width="' + imageWidth + '" height="' + imageHeight + '"><clipPath id="' + svgClipPathId + '"><circle r="' + radius + '" cx="' + imageWidth/2 + '" cy="' + imageHeight/2 + '"/></clipPath><image clip-path="url(#' + svgClipPathId + ')" xlink:href="' + imgSrc + '" src="' + imgSrc + '" width="' + imageWidth + '" height="' + imageHeight + '"></image></svg>');
        });
    };
}(jQuery));