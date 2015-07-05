app.directive('history', function (HistoryFactory) {

    HistoryFactory.loadHistory();

    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'js/directives/history.html',
        link: function (scope) {
        	console.log("run directive");
            scope.history = HistoryFactory.getHistory();
            scope.populateForm = function() {}

        }
    };

});
