app.directive('tab1', function (RequestFactory) {

    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'js/directives/tab1.html',
        link: function (scope) {
            scope.resolved = false;
            RequestFactory.responsePromise.then(function(response){
                console.log("resolved in tab controller")
                scope.resolved = true;
            })
        }
    };

});



app.directive('tab3', function () {

    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'js/directives/tab3.html',
        link: function (scope) {
            
        }
    };

});

app.directive('tab4', function () {

    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'js/directives/tab4.html',
        link: function (scope) {
            
        }
    };

});