var SliderWidget = (function(){


    var _insertValues = function($this) {

        var
            container = $this.closest('.filter__slider'),
            from = container.find('.filter__slider-input-from'),
            to = container.find('.filter__slider-input-to');

        var values = $this.slider('option', 'values');
            console.log(values);

        from.value = values[0];

        //from.val(values[0]);
        to.val(values[1]);

    }; // end sliderwidget.insertValues



    return {
        init: function(){
            $('.filter__slider-element').each(function(){
                var
                    $this = $(this),
                    min = parseInt($(this).data('min')),
                    max = parseInt($(this).data('max'));

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





/*********** Initialize  ***********/

$(document).ready(function() {

    if($('.filter__slider-element').length) {
        SliderWidget.init();
    }

}); //-> ready end