app.directive('response', function(RequestFactory){
    return {
        restrict: 'E',
        templateUrl: 'js/directives/response.html',
        scope: true,
        link: function(scope){

            scope.isJson = function() {
                if(scope.reqResponse && typeof scope.reqResponse.data === 'object'){
                    return true;
                }
                return false;
            } //Is the response data a JSON object?

        }//End of Link
    }
});

app.directive('prism', [function() {
    return {
        restrict: 'A',
        scope: {
            source: '@'
        },
        link: function(scope, element, attrs) {
            scope.$watch('source', function(v) {
                if(v) {
                    Prism.highlightElement(element.find("code")[0]);
                }
            });
        },
        template: "<code ng-bind='source'></code>"
    };
}]);