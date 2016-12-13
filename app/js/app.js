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

    $doc.on('click', '.new-popup-registration__mask-item__added-photo .icon-mask-delete', function () {
        var el = $(this).closest('.new-popup-registration__mask-item__added-photo');
        el.css({width: 0, margin: 0});
        setTimeout(function () {
            el.remove();
        }, 300);
    });

    var mask_container = document.getElementsByClassName('new-popup-registration__mask-container')[0];
    // console.log(mask_container)
    if (mask_container) {
        mask_container.ondragover = function (e) {
            var container = document.getElementsByClassName('new-popup-registration__mask-container')[0];
            container.classList.add('dragfile-drag');
            // console.log(container.classList)
        };

        mask_container.ondragleave = function (e) {
            var container = document.getElementsByClassName('new-popup-registration__mask-container')[0];
            container.classList.remove('dragfile-drag');

            // console.log(container.classList)
        };
    }

    $doc.on('change', '#news-popup-registration__mask-input', function () {
        if (mask_container)
            mask_container.classList.remove('dragfile-drag');

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
                    }, 20);
                };
                reader.readAsDataURL(value);
            });
        }
    });
});

var App = {};

App.multiselect = function (class_name) {
    $(class_name).each(function () {
        var multiselect = {};

        multiselect.el = $(this);

        multiselect.checkboxes = multiselect.el.find('input:checkbox');
        multiselect.current = multiselect.el.find('.multi-select-emitation__text');
        multiselect.dropdown = multiselect.el.find('.multi-select-emitation__dropdown');
        multiselect.values = [];

        multiselect.init = function () {
            multiselect.checkboxes.each(function () {
                var $this = $(this);
                if ($this.is(":checked")) {
                    multiselect.values.push($this.attr('title'));
                }
            });
            multiselect.update();
            multiselect.watch();
        };

        multiselect.watch = function () {
            var checkboxes = multiselect.checkboxes;

            checkboxes.on('change', function () {
                var $this = $(this);
                var title = $this.attr('title');

                var index = multiselect.values.indexOf(title);

                if (index < 0 && $this.is(":checked")) {
                    multiselect.values.push(title);
                } else if (index >= 0 && !$this.is(':checked')) {
                    multiselect.values.splice(index, 1);
                }

                multiselect.update();
            });
        };

        multiselect.update = function () {
            if (multiselect.values.length > 0) {
                multiselect.current.text(multiselect.values.join(', '));
                multiselect.current.addClass('not-empty');
            } else {
                multiselect.current.removeClass('not-empty');
                multiselect.current.html('&nbsp;');
            }
        };


        multiselect.current.bind('click', function (e) {
            multiselect.toggle();
        });

        multiselect.toggle = function () {
            multiselect.dropdown.toggle();
        };

        multiselect.close = function () {
            multiselect.dropdown.hide();
        };

        multiselect.open = function () {
            multiselect.dropdown.show();
        };

        $doc.on('click', function (e) {
            var el = $(e.target);

            if (
                !el.hasClass('multi-select-emitation__text')
                && el.closest(class_name).length == 0
            ) {
                multiselect.close();
            }

            // console.log(el.closest('.multi-select-emitation').length)
        });

        multiselect.init();
    });
};

App.multiselect('.multi-select-emulation');