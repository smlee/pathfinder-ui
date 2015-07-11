app.directive('routeTable', function (DataFactory) {

    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'js/directives/route-table.html',
        link: function (scope) {
            DataFactory.tablePromise.then(function(table) {
                scope.table = table;
                
            });
        }
    };

});