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
                if (_self.doc.querySelector('.mailing-carousel')) {
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

    MAILING.prototype.switcher = function () {
        var _self = this;

        var switcher = {
            init: function () {
                console.log('hi')
                $(_self.doc).on('click', '[data-switch-mailing]', function () {
                    var parent = $(this).closest('.mailing__scope');
                    if (parent) {
                        switcher.switchBlocks(parent, parent.siblings('.mailing__form'));
                    } else {
                        switcher.switchBlocks(parent, parent.siblings('.mailing__scope'));
                    }
                });
            },
            switchBlocks: function (closing, opening) {
                closing.fadeOut(300, function () {
                    opening.fadeIn(300);
                });
            }
        };

        switcher.init();

        return switcher;
    };

    return MAILING;
})();

var MAILINGAPP = new MAILING();

$(document).ready(function () {

    MAILINGAPP.feedbackCarousel();
    MAILINGAPP.switcher();
});