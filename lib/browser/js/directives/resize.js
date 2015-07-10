/**
 * Created by Sang on 7/3/2015.
 */
app.directive('resizer', function ($document) {

    return function ($scope, $element, $attrs) {
        $element.on('mousedown', function (event) {
            event.preventDefault();
            $('.right-bar').removeClass('slide');
            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);
        });

        function mousemove(event) {

            if ($attrs.resizer == 'vertical') {
                // Handle vertical resizer
                var vw = $(window).width();
                var x = vw - event.pageX;

                if ($attrs.resizerMax && x / vw * 100 >= $attrs.resizerMax) {
                    x = parseInt($attrs.resizerMax / 100 * vw);
                    $('.right-bar').css({width: '60%'});
                    $('.slide-icon').html('<ng-md-icon icon="chevron_right" style="fill: #ddd" size="20"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg></ng-md-icon>');
                } else {
                    $('.slide-icon').html('<ng-md-icon icon="chevron_left" style="fill: #ddd" size="20"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg></ng-md-icon>');
                }

                $($attrs.resizerRight).css({
                    width: x + 'px'
                });
                $($attrs.resizerLeft).css({
                    right: (x + parseInt($attrs.resizerWidth)) + 'px'
                });

            }
        }

        function mouseup() {
            $('.right-bar').addClass('slide');
            $document.unbind('mousemove', mousemove);
            $document.unbind('mouseup', mouseup);
        }
    };
});

app.directive('shifter', function () {

    return {
        link: function (scope, element) {
            $('.slide-icon').on("click", function () {
                var maxWidth = $(window).width() * 10;
                var icon = element.children()[0];
                if ($(icon).attr('icon') === 'chevron_left') {
                    $('.right-bar').css({ width: maxWidth });
                    $('.slide-icon').html('<ng-md-icon icon="chevron_right" style="fill: #ddd" size="20"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg></ng-md-icon>');
                } else {
                    $('.right-bar').css({ width: '33.33%' });
                    $('.slide-icon').html('<ng-md-icon icon="chevron_left" style="fill: #ddd" size="20"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg></ng-md-icon>');
                }
            });

        }
    }
});