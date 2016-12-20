$doc = $(document);

$(function () {
    $doc.on('click', '[data-toggle]', function () {
        var target = $(this).attr('data-toggle');
        var bl = $('[data-toggle-target="' + target + '"]');

        bl.slideToggle(300);
        $(this).toggleClass('active');
        console.log(target);
        console.log(bl);
    });
});

var App = {};

App.photosUpload = function (className) {
    $(className).each(function () {
        var mask = {};
        var $this = $(this);

        mask.container = document.getElementsByClassName('new-popup-registration__mask-container')[0];
        mask.detele_iconsClass = '.icon-mask-delete';
        mask.input = $('#news-popup-registration__mask-input');
        mask.container_text = mask.container.getElementsByClassName('new-popup-registration__mask-container__text')[0];
        mask.added_photos = 0;

        $doc.on('click', mask.detele_iconsClass, function (e) {
            var el = $(this).closest('.new-popup-registration__mask-item__added-photo');
            el.css({width: 0, margin: 0});
            setTimeout(function () {
                el.remove();

                mask.textUpdate();
            }, 300);
        });

        if (mask.container) {
            mask.container.ondragover = function (e) {
                var container = document.getElementsByClassName('new-popup-registration__mask-container')[0];
                container.classList.add('dragfile-drag');
            };

            mask.container.ondragleave = function (e) {
                var container = document.getElementsByClassName('new-popup-registration__mask-container')[0];
                container.classList.remove('dragfile-drag');
            };
        }

        mask.textUpdate = function () {
            if(mask.countUpdate() > 0) {
                mask.container_text.classList.add('hidden')
            } else {
                mask.container_text.classList.remove('hidden')
            }
        };

        mask.countUpdate = function () {
            var array = mask.container.getElementsByClassName('new-popup-registration__mask-item__added-photo__wrapper');

            return array.length;
        };

        mask.input.on('change', function () {
            if (mask.container)
                mask.container.classList.remove('dragfile-drag');

            if (this.files && this.files[0] && window.FileReader) {
                console.log(this.files);
                _this = this;
                var the_files = this.files;
                Object.keys(the_files).map(function (objectKey, index) {
                    var value = the_files[objectKey];
                    var input = _this;
                    var reader = new FileReader();
                    var template = function (ev) {
                        return '' +
                            '<div data-key="' + objectKey + '" class="new-popup-registration__mask-item__added-photo" style="width: 0;">' +
                            '<div class="new-popup-registration__mask-item__added-photo__wrapper">' +
                            '<img alt="" src="' + ev.target.result + '"/>' +
                            '</div>' +
                            '<i class="icon-mask-delete"></i>' +
                            '<i class="icon-mask-crop"></i>' +
                            '</div>';
                    };
                    reader.onload = function (e) {
                        $('.new-popup-registration__mask-container-units')
                            .append(template(e));
                        setTimeout(function () {
                            $('.new-popup-registration__mask-item__added-photo').removeAttr('style');
                            input.removeAttribute("value");

                            mask.textUpdate();
                        }, 20);
                    };
                    reader.readAsDataURL(value);
                });
            }
        });
    });
};

App.photosUpload('.new-popup-registration__mask');