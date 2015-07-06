app.controller('TabBtnsController', function($scope, HistoryFactory, RequestFactory){

	//Put the state name of the tabs in the array below.
	$scope.tabs = [
					{name:"The first tab", directive:'tab1'},
					{name:"Request History", directive:'history'},
					{name:"The third tab", directive:'tab3'},
					{name:"The fourth tab", directive:'tab4'}
				];

	$scope.selectedIndex = 0;

	$scope.populatePriorReq = function(item) {
		console.log("TabsController scope", $scope);
		$scope.selectedIndex = 0;
		console.log("item", item);
		RequestFactory.populateData(item);
		
		// $scope.request = req;
		// console.log("$scope.request", $scope.request);

	};
	
});