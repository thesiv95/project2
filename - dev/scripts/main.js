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


/*********** Initialize  ***********/

$(document).ready(function() {

    if($('.products__rating').length) {
        RatingWidget.init();
    }

    if($('.filter__slider-element').length) {
        SliderWidget.init();
    }

    if($('.sort__select-elem').length) {
        
    }

}); //-> ready end