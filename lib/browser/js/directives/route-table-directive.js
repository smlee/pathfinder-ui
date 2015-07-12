app.directive('routeTable', function (DataFactory) {

    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'js/directives/route-table.html',
        link: function (scope) {
            DataFactory.dataPromise.then(function(data) {
                console.log("data", data);
                scope.table = data.routeTable;
                
            });
        }
    };

});