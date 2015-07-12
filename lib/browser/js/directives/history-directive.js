app.directive('history', function (HistoryFactory) {

    HistoryFactory.loadHistory();

    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'js/directives/history.html',
        link: function (scope) {
            scope.getHistory = HistoryFactory.getHistory
            //scope.history = HistoryFactory.getHistory();
            //var history = scope.history;

            scope.saveList = [];

            scope.addToSaveList = function(req) {
            	// var copy = _.cloneDeep(req);
            	// 
            	// scope.saveList.push(copy);

            	var idx = scope.saveList.indexOf(req);

            	if (idx > -1) {
            		scope.saveList.splice(idx, 1);
            	} else {
            		scope.saveList.push(req);
            	}	
            }

            
            scope.saveToFile = function() {
            	var saveList = scope.saveList;

            	if (saveList.length === 0) {
            		saveList = HistoryFactory.getHistory();
            	}

            	saveList = angular.toJson(saveList, true);	// setting true option  prettifies the json
            	var blob = new Blob([saveList], { type: "application/json; charset=utf-8;" });	// create json array data
                console.dir(blob);
            	var downloadLink = angular.element('<a></a>');
                console.log("dllink", downloadLink);

                downloadLink.attr('href', window.URL.createObjectURL(blob));
                downloadLink.attr('download', 'history.json');
				downloadLink[0].click();
            }
            

            uploadFile = function(files) {

                var file = files[0];
        
                var fr = new FileReader();

                fr.readAsText(file);

                fr.onload = function() {
                    console.log("loaded history");
                   var loadedHistory = JSON.parse(fr.result);
                   HistoryFactory.concatHistory(loadedHistory);
                   scope.$apply();

                }
            }
            
        }
    };

});
