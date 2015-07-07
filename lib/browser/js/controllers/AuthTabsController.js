app.controller('AuthTabsController', function($scope, RequestFactory){

	$scope.selectedAuthIndex = 0;

	$scope.switchAuthTab = function(tabIndex) {
		$scope.selectedAuthIndex = tabIndex;
	};

});