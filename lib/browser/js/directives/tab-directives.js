app.directive('tab1', function () {

    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'js/directives/tab1.html',
        link: function (scope) {
            
        }
    };

});


app.directive('tab2', function (HistoryFactory) {

    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'js/directives/tab2.html',
        link: function (scope) {
            scope.requests = [];
            console.log("Scope, does it have the request object?", scope);
            HistoryFactory.addToHistory()
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