app.directive('headersTab', function (RequestFactory) {

    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'js/directives/headersTab.html',
        link: function (scope) {

            scope.getHeaders = function() {
                return RequestFactory.getHeaders();
            };

            scope.addHeader = function() {
                RequestFactory.addHeader();
                
            };

            scope.setHeaders = function() {
                scope.switchHeaderTab(0);
            };

            scope.removeHeader = function(idx) {
                RequestFactory.removeHeader(idx);
            };



        }
    };

});