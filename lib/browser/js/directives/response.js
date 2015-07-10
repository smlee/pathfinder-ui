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
})