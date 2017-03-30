var MAILING = (function () {

    function MAILING() {
        var _self = this;

        _self.doc = document;
        _self.window = window;
    };

    MAILING.prototype.feedbackCarousel = function () {
        var _self = this;

        var carousel = {
            init: function () {
                if(_self.doc.querySelector('.mailing-carousel')) {
                    $('.mailing-carousel').owlCarousel({
                        items: 1,
                        responsive: true,
                        dots: true,
                        nav: true
                    })
                }
            }
        };

        carousel.init();

        return carousel;
    };

    return MAILING;
})();

var MAILINGAPP = new MAILING();

$(document).ready(function () {

    MAILINGAPP.feedbackCarousel();
});