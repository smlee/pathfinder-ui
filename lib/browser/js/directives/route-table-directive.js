app.directive('routeTable', function (DataFactory) {

    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'js/directives/route-table.html',
        link: function (scope) {
            DataFactory.dataPromise.then(function(data) {

                scope.table = data.routeTable;
                
            });
        }
    };

});