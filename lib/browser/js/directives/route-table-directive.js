app.directive('routeTable', function (DataFactory) {

    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'js/directives/route-table.html',
        link: function (scope) {
            console.log("run directive");
            DataFactory.tablePromise.then(function(table) {
                console.log("table", table);
                scope.table = table;
                
            });
        }
    };

});