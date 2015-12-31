app.controller('SubTabsController', function($scope, RequestFactory){

	$scope.selectedIndex = 0;

	$scope.switchSubTab = function(tabIndex) {
		$scope.selectedIndex = tabIndex;
	};

});