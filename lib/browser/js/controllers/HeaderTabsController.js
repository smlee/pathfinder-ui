app.controller('HeaderTabsController', function($scope, RequestFactory){

	$scope.selectedIndex = 0;

	$scope.switchHeaderTab = function(tabIndex) {
		$scope.selectedIndex = tabIndex;
	};

});