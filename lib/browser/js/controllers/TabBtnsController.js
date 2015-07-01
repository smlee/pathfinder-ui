app.controller('TabBtnsController', function($scope, $state){

	//Put the state name of the tabs in the array below.
	$scope.tabs = ["tab1","tab2","tab3","tab4",2,3,4,5,6];

	$scope.tabSelect = function(tabStateName){
		$state.go(tabStateName);
	}
})