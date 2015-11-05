var SliderWidget = (function(){


    var _insertValues = function($this) {

        var
            from = $('.filter__slider-input_from'),
            to = $('.filter__slider-input_to');

        var values = $this.slider('option', 'values');

        from.val(values[0]);
        to.val(values[1]);

    }; // end sliderwidget.insertValues



    return {
        init: function(){
            $('.filter__slider-element').each(function(){
                var
                    $this = $(this),
                    min = parseInt($this.data('min')),
                    max = parseInt($this.data('max'));

                $this.slider({
                    range: true,
                    min: min,
                    max: max,
                    values: [min, max],
                    slide: function() {
                        _insertValues($this);
                    },
                    create: function() {
                        _insertValues($this);
                    }
                });
            });
        } // end sliderwidget.return.init
    };  // end sliderwidget.return

}()); // end sliderwidget


var RatingWidget = (function(){

    var _starsShiningBright = function(ratingAmount) {
        var
            starsArray = [];

        for (var i = 0; i < 5; i++) {
            var
                starClassName = (i < ratingAmount) ? 'products__rating-stars-item products__rating-stars-item_filled' : 'products__rating-stars-item';

            var star = $('<li>', {
                class: starClassName
            });


            starsArray.push(star);

        }


        return starsArray;

    };


    var _markupGen = function(ratingAmount, elementToAppend) {
        var
            ul = $('<ul>', {
                class: 'products__rating-stars',
                html: _starsShiningBright(ratingAmount)
            });

        var
            ratingDisplay = $('<div>', {
                class: 'products__rating-amount',
                text: ratingAmount
            });

        elementToAppend.append([ul, ratingDisplay]);

    };

    return {
        init: function(){
            $('.products__rating').each(function(){
                var
                    $this = $(this),
                    ratingAmount = parseInt($(this).data('rating'));

                _markupGen(ratingAmount, $this);
            });
        }
    }

}()); // end ratingwidget


var ViewStateChange = (function(){

    var _previousClass = '';

    var _changeState = function($this){
        var
            item = $this.closest('.sort__view-item'),
            view = item.data('view'),
            listOfItems = $('#products-list'),
            modificationPrefix = 'products__list_',
            classOfViewState = modificationPrefix + view;

        if (_previousClass == '') {
            _previousClass = listOfItems.attr('class');
        }

        _changeActiveClass($this);
        listOfItems.attr('class', _previousClass + ' ' + classOfViewState);

    };


        var _changeActiveClass = function($this){
            $this.closest('.sort__view-item').addClass('active').siblings().removeClass('active');
        };


    return {
        init: function(){
            $('.sort__view-link').on('click', function(e){
                e.preventDefault();

                _changeState($(this));

            });
        }
    }

}()); // end viewstatechange



var Slideshow = (function(){

    var _changeSlide = function($this){
      var
          container = $this.closest('.products__slideshow'),
          path = $this.find('img').attr('src'),
          display = container.find('.products__slideshow-img');

        $this.closest('.products__slideshow-item').addClass('active').siblings().removeClass('active');

        display.fadeOut(function () {
            $(this).attr('src', path).fadeIn();
        });

    };



    return {
        init: function () {
            $('.products__slideshow-link').on('click', function(e){
                e.preventDefault();

                var
                    $this = $(this);
                _changeSlide($this);

            });
        }
    }

})();// end slideshow


var Accordion = (function(){


    var _openSection = function($this) {
        var
            container = $this.closest('.filter__item'),
            content = container.find('.filter__content'),
            otherContent = $this.closest('.filter').find('.filter__content');



        //if (!(container.hasClass('active'))) {
        //    otherContent.slideUp().closest('.filter__item').removeClass('active');
        //    container.addClass('active');
        //    content.stop(true, true).slideDown();
        //    otherContent.slideUp().closest('.filter__item').removeClass('active');
        //} else {
        //    otherContent.slideUp().closest('.filter__item').addClass('active');
        //    container.removeClass('active');
        //    content.stop(true, true).slideUp();
        //}

        if (!container.hasClass('active')) {

            container.addClass('active');
            content.stop(true, true).slideDown();
        } else {
            container.removeClass('active');
            content.stop(true, true).slideUp();
        }




    }

    return {
        init: function () {
            $('.filter__title-link').on('click', function(e){
                e.preventDefault();
                _openSection($(this));

            });
        }
    }

})();// end accordion


/*********** Initialize  ***********/

$(document).ready(function() {

    if($('.filter').length) {
        Accordion.init();
    }


    if($('.products__slideshow').length) {
        Slideshow.init();
    }

    if($('.products__rating').length) {
        RatingWidget.init();
    }

    ViewStateChange.init();

    if($('.filter__slider-element').length) {
        SliderWidget.init();
    }

    if($('.sort__select-elem').length) {
        $('.sort__select-elem').select2({
            minimumResultsForSearch: Infinity
        });
    }


    $('.filter__reset-cb').on('click', function(e){
        e.preventDefault();

        var
            $this = $(this),
            container = $this.closest('.filter__item'),
            checkboxes = container.find('input:checkbox');

        checkboxes.each(function(){
            $(this).removeProp('checked');
        });



    }); // end filter__reset-cb

    $('.filter__reset-rb').on('click', function(e){
        e.preventDefault();

        var
            $this = $(this),
            container = $this.closest('.filter__item'),
            radioButtons = container.find('input:radio');

        radioButtons.each(function(){
            $(this).removeProp('checked');
        });

    }); // end filter__reset-rb

    if ($('.attention-text').length) {$('.attention-text').columnize({ width: 500 })};

}); //-> ready end