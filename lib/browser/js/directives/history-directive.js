app.directive('history', function (HistoryFactory) {

    HistoryFactory.loadHistory();

    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'js/directives/history.html',
        link: function (scope) {
            scope.history = HistoryFactory.getHistory();
            var history = scope.history;

            scope.saveToFile = function() {
            	history = angular.toJson(history, true);	// setting true option  prettifies the json
            	var blob = new Blob([history], { type: "application/json; charset=utf-8;" });	// create json array data

            	var downloadLink = angular.element('<a></a>');
            	console.log(window.URL.createObjectURL(blob));
                    downloadLink.attr('href', window.URL.createObjectURL(blob));
                    downloadLink.attr('download', 'history.json');
					downloadLink[0].click();
            }
            
        }
    };

});
