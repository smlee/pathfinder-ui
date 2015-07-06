app.controller('AuthTabsController', function($scope, HistoryFactory, RequestFactory){

	$scope.selectedAuthIndex = 0;

	$scope.switchAuthTab = function(tabIndex) {
		$scope.selectedAuthIndex = tabIndex;
	};

});