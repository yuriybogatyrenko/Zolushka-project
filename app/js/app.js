$doc = $(document);

$(function () {
    $doc.on('click', '[data-toggle]', function () {
        var target = $(this).attr('data-toggle');
        var bl = $('[data-toggle-target="' + target + '"]');

        bl.slideToggle(300);
        $(this).toggleClass('active');
    });
});

var App = {};

App.photosUpload = function (className) {
    $(className).each(function () {
        var mask = {};
        var $this = $(this);

        mask.container = document.getElementsByClassName('new-popup-registration__mask-container')[0];
        mask.detele_iconsClass = '.icon-mask-delete';
        mask.crop_iconsClass = '.icon-mask-crop';
        mask.crop_closeClass = '.js-close-crop';
        mask.input = $('#news-popup-registration__mask-input');
        mask.container_text = mask.container.getElementsByClassName('new-popup-registration__mask-container__text')[0];
        mask.added_photos = 0;
        mask.continue_button = $(mask.container).closest('.new-popup-registration__mask').siblings('.new-popup-registration__buttons').find('.js-photo-upload-button');

        // crop vars
        mask.cropContainer = $('.new-popup-registration__crop-wrapper');
        mask.crop = $('.new-popup-registration__crop');

        $doc.on('click', mask.detele_iconsClass, function (e) {
            var el = $(this).closest('.new-popup-registration__mask-item__added-photo');
            el.css({width: 0, margin: 0});
            setTimeout(function () {
                el.remove();

                mask.conditionUpdate();
            }, 300);
        });

        mask.cropOpen = function () {
            mask.cropContainer.fadeIn(200);
        };

        mask.cropClose = function () {
            mask.cropContainer.fadeOut(200);
        };

        $doc.on('click', mask.crop_iconsClass, function () {
            mask.cropOpen();
        });

        $doc.on('click', mask.crop_closeClass, function () {
            mask.cropClose();
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

        mask.conditionUpdate = function () {
            if (mask.countUpdate() > 0) {
                mask.container_text.classList.add('hidden');
                mask.continue_button.removeAttr('disabled');
            } else {
                mask.container_text.classList.remove('hidden');
                mask.continue_button.attr('disabled', true);
            }
        };

        mask.countUpdate = function () {
            var array = mask.container.getElementsByClassName('new-popup-registration__mask-item__added-photo__wrapper');

            return array.length;
        };

        mask.showNotice = function (bl) {
            bl.closest('.new-popup-registration__step-container').addClass('show-mask-notice');
        };

        mask.hideNotice = function (bl) {
            bl.closest('.new-popup-registration__step-container').removeClass('show-mask-notice');
        };

        $doc.on('click', '.new-popup-registration__mask-container-units .icon-photo-mask-moderation', function () {
            mask.showNotice($(this));
        });

        $doc.on('click', '.js-close-notice', function () {
            mask.hideNotice($(this));
        });

        mask.input.on('change', function () {
            if (mask.container)
                mask.container.classList.remove('dragfile-drag');

            if (this.files && this.files[0] && window.FileReader) {
                // console.log(this.files);
                _this = this;
                var the_files = _this.files;
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
                            '<i class="icon-photo-mask-moderation"></i>' +
                            '</div>';
                    };

                    reader.onload = function (e) {
                        $('.new-popup-registration__mask-container-units')
                            .append(template(e));
                        setTimeout(function () {
                            $('.new-popup-registration__mask-item__added-photo').removeAttr('style');
                            input.removeAttribute("value");

                            mask.conditionUpdate();
                        }, 20);
                    };
                    reader.readAsDataURL(value);
                });
            }
        });
    });
};

App.scrollTo = function (el) {
    $(el).each(function () {
        var $this = $(this);

        $this.on('click', function () {
            var pos = $($this.attr('data-scrollto')).offset().top;
            $this.closest('.overlay').animate({scrollTop: pos}, 500);
        });
    });
};

App.multiselect = function (className) {
    var multiselect = {};
    multiselect.elements = document.querySelectorAll(className);
    multiselect.dropdowns = document.querySelectorAll('.js-multiselect__dropdown');
    multiselect.selectedValues = [];

    multiselect.init = function () {
        multiselect.bindings();
    };

    multiselect.bindings = function () {
        for (var i = 0; i < multiselect.elements.length; i++) {
            var select = multiselect.elements[i];

            multiselect.updateLabels(select);

            select.querySelector('.js-multiselect__current').addEventListener('click', function (e) {
                e.preventDefault();

                var selectEl = this.closest('.js-multiselect');

                if (selectEl.classList.contains('dropdown-open')) {
                    multiselect.hideDropdown(selectEl);
                } else {
                    multiselect.hideDropdown(multiselect.elements);
                    multiselect.showDropdown(selectEl);
                }

            });

            var inputs = select.querySelectorAll('input');

            for (var z = 0; z < inputs.length; z++) {
                inputs[z].addEventListener('change', function () {
                    var parentSelect = this.closest('.js-multiselect');
                    multiselect.updateLabels(parentSelect);
                });
            }
        }

        document.addEventListener('click', function (e) {
            if (!e.target.closest('.js-multiselect')) {
                multiselect.hideDropdown(multiselect.elements);
            }
        });
    };

    multiselect.updateLabels = function (selectBlock) {
        var inputs = selectBlock.querySelectorAll('input');
        var inputsText = [];
        var currentEl = selectBlock.querySelector('.js-multiselect__current');

        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i];
            if (input.checked) {
                inputsText.push(input.closest('.js-multiselect__label').innerText);
            }
        }

        currentEl.innerText = inputsText.join(', ');
    };

    multiselect.showDropdown = function (select) {
        select.classList.add('dropdown-open');
    };

    multiselect.hideDropdown = function (select) {
        if (Object.prototype.toString.call(select) == '[object NodeList]') {
            for (var i = 0; i < select.length; i++) {
                select[i].classList.remove('dropdown-open');
            }
        } else {
            select.classList.remove('dropdown-open');
        }
    };

    multiselect.init();
    return multiselect;
};

App.walletSuggestions = function (className) {
    var suggestions = {};

    suggestions.elements = document.querySelectorAll(className);

    suggestions.init = function () {
        for (var i = 0; i < suggestions.elements.length; i++) {
            suggestions.update(suggestions.elements[i]);
        }

        suggestions.bindings();
    };

    suggestions.bindings = function () {
        for (var i = 0; i < suggestions.elements.length; i++) {
            suggestions.update(suggestions.elements[i]);

            var inputs = suggestions.elements[i].querySelectorAll('input[type="radio"], input[type="checkbox"]');

            for (var z = 0; z < inputs.length; z++) {
                inputs[z].addEventListener('change', function () {
                    suggestions.update(this.closest(className));
                });
            }
        }
    };

    suggestions.update = function (block) {
        var blockEl = block;

        var inputs = blockEl.querySelectorAll('input[type="radio"], input[type="checkbox"]');

        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].checked === true) {
                inputs[i].closest('.buy-form__suggestions-item').classList.add('active');
            } else {
                inputs[i].closest('.buy-form__suggestions-item').classList.remove('active');
            }
        }
    };

    suggestions.init();

    return suggestions;
};

App.cardLifetime = function (className) {
    if (!document.querySelector(className))
        return;

    var cardLifetime = {};
    cardLifetime.parent = document.querySelector(className);
    cardLifetime.items = document.querySelectorAll('.cards-lifetime__item');

    cardLifetime.init = function () {
        cardLifetime.bindings();
    };

    cardLifetime.bindings = function () {
        for (var i = 0; i < cardLifetime.items.length; i++) {
            cardLifetime.items[i].addEventListener('mouseover', function () {
                cardLifetime.changeActive(this.closest(className), this);
            });
        }

        // setting default element active on mouse leave
        cardLifetime.parent.addEventListener('mouseleave', function () {
            cardLifetime.changeActive(this, this.querySelectorAll('.cards-lifetime__item')[1]);
        });
    };

    cardLifetime.changeActive = function (block, element) {
        var items = block.querySelectorAll('.cards-lifetime__item');

        for (var i = 0; i < items.length; i++) {
            if (!items[i].isSameNode(element)) {
                items[i].classList.remove('active');
                items[i].querySelector('.violet_btn').classList.add('semi-disabled')
            } else {
                items[i].classList.add('active');
                items[i].querySelector('.violet_btn').classList.remove('semi-disabled')
            }
        }
    };

    cardLifetime.init();

    return cardLifetime;
};

App.phoneCountry = function () {
    if (!document.querySelectorAll('[data-phone-country-code-call]').length > 0)
        return false;

    var settings = {
        container: document.querySelectorAll('[data-phone-code-container]'),
        caller: document.querySelectorAll('[data-phone-country-code-call]'),
        dropdown: document.querySelectorAll('[data-counties-codes-dropdown]')
    };

    var phoneCode = {};

    phoneCode.init = function () {
        for (var i = 0; i < settings.dropdown.length; i++) {
            var input = settings.dropdown[i].querySelector('.phone-countries__item.selected');
            phoneCode.updateInput(input, input.getAttribute('data-phone-code'));
        }

        phoneCode.bindings();
    };

    phoneCode.bindings = function () {
        for (var i = 0; i < settings.caller.length; i++) {
            settings.caller[i].addEventListener('click', function () {
                phoneCode.openDropdown(this);
            });
        }

        for (var i = 0; i < settings.dropdown.length; i++) {
            var dropdownItems = settings.dropdown[i].querySelectorAll('.phone-countries__item');

            for (var z = 0; z < dropdownItems.length; z++) {
                dropdownItems[z].addEventListener('click', function () {
                    phoneCode.closeDropdowns();

                    phoneCode.updateInput(this, this.getAttribute('data-phone-code'));
                });
            }
        }

        document.addEventListener('click', function (e) {
            if (e.target.classList.contains('phone-countries__dropdown')
                || e.target.closest('.phone-countries__dropdown')
                || e.target.classList.contains('new-popup-registration__phone-country')
                || e.target.closest('.new-popup-registration__phone-country')
            )
                return;

            phoneCode.closeDropdowns();
        });
    };

    phoneCode.openDropdown = function (block) {
        var container = block.closest('[data-phone-code-container]');

        container.querySelector('[data-phone-country-code-call]').classList.add('active');
        container.querySelector('[data-counties-codes-dropdown]').classList.add('active');
    };

    phoneCode.closeDropdowns = function () {
        var dropdowns = settings.dropdown;

        for (var i = 0; i < dropdowns.length; i++) {
            dropdowns[i].classList.remove('active');
            settings.caller[i].classList.remove('active');
        }
    };

    phoneCode.updateInput = function (block, value) {
        var container = block.closest('[data-phone-code-container]');
        var input = container.querySelector('[data-phone-country-code-input]').value = value;
    };

    phoneCode.init();

    return phoneCode;
};

App.bootstrap = function () {
    App.phoneCountry();

    App.cardLifetime('.cards-lifetime__grid');

    App.walletSuggestions('.buy-form__suggestions');

    App.multiselect('.js-multiselect');

    App.scrollTo('.js-scrollto-button');

    App.photosUpload('.new-popup-registration__mask');
};

App.bootstrap();